import { saveProjectData, findProjectsQuery, editProject } from "../lib/services/projects"
import { sendErrorResponse } from "../lib/utils/utils"

export const createProject = async ( req, res ) => {
    try {
        /** Create data object */
        const data = {...req.body}
        const project = await saveProjectData(req.user._id, data)
        return res.status(200).json({
            error: false,
            project
        })
    } catch (error) {
        sendErrorResponse(res, error)
    }
}

export const listProjects = async ( req, res ) => {
    try {
        const { data, totalMatches } = await findProjectsQuery({
            sortBy: req.sortBy,
            pagination: req.pagination,
            query: req.query,
            requestUser: req.user
        })

        return res.status(200).json({
            error: false,
            data,
            totalMatches
        })
    } catch (error) {
        sendErrorResponse(res, error)
    }
}


export const updateProject = async ( req, res ) => {
    try {
        const data = {...req.body}
        const projectId = req.params.id
        const savedProject = await editProject(projectId, req.user._id, data)
        return res.status(200).json({
            error: false,
            project: savedProject
        })
    } catch (error) {
        sendErrorResponse(res, error)
    }
}