import Tasks from "../../mongo/models/tasks"
import Records from "../../mongo/models/records"
import { TaskCreationError, TaskNotFoundError, NotAllowedActionError } from "../errors/error"
import { getProjectAssociated, userBelongsToProject } from "./projects"
import { closeTaskRecord } from "./records"
import __ from "lodash"
import __Promise__ from "bluebird"

export const saveTaskData = async ( userId, data ) => {
    data.creator = userId
    /** Si se asigna projectID a la tarea */
    if (data.projectId) {
        await userBelongsToProject(userId, data.projectId)
    }
    let task = new Tasks(data)
    const data_error = task.validateSync();
    if (data_error) {
        throw new TaskCreationError(null, data_error.errors)
    }
    return task.save()
}

export const queryTasksToDb = async ( options ) => {
    const { 
        sortBy, 
        pagination, 
        query, 
        requestUser: user
    } = options

    let q = { active: true }

    if (query.search) {
        q.$text = {
            $search: query.search
        }
    }

    if (query.projects) {
        q.projectId = {
            $in: await getProjectAssociated(
                user._id, 
                query.projects.split("|")
            )
        }
    } else {
        q.$or = [
            { creator: user._id },
            {
                projectId: {
                    $in: await getProjectAssociated(user._id)
                }
            }
        ]
    }

    const [ data, totalMatches ] = await Promise.all([
        Tasks.find(q)
            .skip(pagination.from)
            .limit(pagination.size)
            .populate('projectId', 'name description')
            .populate('creator', 'name lastname img_key')
            .select('-__v')
            .collation({
                locale: 'en_US',
                strength: 1,
                caseLevel: true
            })
            .sort(sortBy || '-createdAt'),

        Tasks.find(q)
            .countDocuments()
    ])

    return {
        data: await __Promise__.map(data, async ( task ) => {
            return {
                ...task.toObject(),
                loggedTime: await task.getTimes()
            }
        }),
        totalMatches
    }
} 

export const editTaskData = async ( taskId, userId, data ) => {
    const task = await Tasks.findById(taskId)
    if (!task) {
        throw new TaskNotFoundError()
    }

    if (!task.creator.equals(userId)) {
        throw new NotAllowedActionError()
    }

    /** Si se asigna projectID a la tarea */
    if (data.projectId) {
        await userBelongsToProject(userId, data.projectId)
    }

    if (data.state === "FINISHED") {
        await closeTaskRecord(task._id, false)
    }

    __.merge(task, data)
    const data_error = task.validateSync();
    if (data_error) {
        throw new TaskCreationError(null, data_error.errors)
    }

    return task.save()
}

export const checkTaskBelongsToUser = async ( taskId, userId ) => {
    const task = await Tasks.findOne({
        _id: taskId,
        creator: userId
    })

    if (!task) {
        throw new NotAllowedActionError()
    }
}

export const deleteTask = async ( taskId ) => {
    const task = await Tasks.findById(taskId)
    if (!task) {
        throw new TaskNotFoundError()
    }

    return __Promise__.all([
        task.remove(),
        Records.deleteMany({ task: taskId })
    ])
}

export const getOpenClockTask = async ( userId ) => {
    const records = await Records.find({ 
        creator: userId,
        trackingMode: "CLOCK",
        end: null 
    })
    .populate('task', 'name state')

    return records
}