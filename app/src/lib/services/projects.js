import Project from "../../mongo/models/projects"
import Task from "../../mongo/models/tasks"
import { ProjectCreationError, ProjectNotFoundError, NotAllowedActionError, ProjectAssociationError } from "../errors/error"
import __ from "lodash"
import __Promise__ from "bluebird"

export const saveProjectData = async ( userId, data ) => {
    if (!data.users.some(u => u === userId)) {
        data.users.push(userId)  
    }
    data.creator = userId
    let project = new Project(data)
    const data_error = project.validateSync();
    if (data_error) {
        throw new ProjectCreationError(null, data_error.errors)
    }
    return project.save()
}

export const findProjectsQuery = async ( options )  => {
    const { 
        sortBy, 
        pagination, 
        query, 
        requestUser: user
    } = options

    let q = { }
    if (query.search) {
        q.$text = {
            $search: query.search
        }
    }

    if (query.users === "me") {
        q.creator = user._id
    }

    if (query.state === "active") {
        q.active = true
    }

    if (query.state === "inactive") {
        q.active = false
    }

    const [ data, totalMatches ] = await Promise.all([
        Project.find(q)
            .populate('creator', 'name lastname email phone img_key')
            .skip(pagination.from)
            .limit(pagination.size)
            .select('-__v')
            .collation({
                locale: 'en_US',
                strength: 1,
                caseLevel: true
            })
            .sort(sortBy || '-createdAt'),

        Project.find(q)
            .countDocuments()
    ])

    // let projects = []
    // projects = await __Promise__.map(data, d => d.getUsersAssociated(user._id))

    const projects = await __Promise__.map(data, async ( d ) => {
        return {
            ...d.toObject(),
            users: await d.getUsersAssociated(user._id),
            ... await d.getTimes()
        }
    })
    
    return {
        data: projects,
        totalMatches
    }
}

export const editProject = async ( projectId, userId, data ) => {
    const project = await Project.findById(projectId)
    if (!project) {
        throw new ProjectNotFoundError()
    }

    if (!project.creator.equals(userId)) {
        throw new NotAllowedActionError()
    }

    __.merge(project, data)
    if (data.users && Array.isArray(data.users)) {
        if (!data.users.some(u => project.creator.equals(u))) {
            data.users.push(project.creator)  
        }
        project.users = data.users;
    }

    const data_error = project.validateSync();
    if (data_error) {
        throw new ProjectCreationError(null, data_error.errors)
    }

    if (!project.active) {
        await Task.updateMany({ projectId: project.id }, { active: false })
    }

    return project.save()
}

export const getProjectAssociated = async ( userId, filter = [] ) => {
    let projects = await Project.find({ users: userId })
        .select('_id')
        .lean()

    if (filter.length !== 0) {
        projects = projects.filter(p => filter.some(f => p._id.equals(f)))
    }

    return projects.map(p => p._id)
}

export const userBelongsToProject = async ( userId, projectId ) => {
    const project = await Project.findOne({ users: userId, _id: projectId })
    if (!project) {
        throw new ProjectAssociationError()
    }
}