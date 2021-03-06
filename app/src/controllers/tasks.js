import { saveTaskData, queryTasksToDb, editTaskData, checkTaskBelongsToUser, deleteTask, getOpenClockTask } from "../lib/services/tasks"
import { setNewTaskRecord, closeTaskRecord, listRecords } from "../lib/services/records"
import { sendErrorResponse } from "../lib/utils/utils"
import { appendFileSync } from "fs";

export const createTask = async ( req, res ) => {
    try {
        const data = {...req.body}
        const task = await saveTaskData(req.user._id, data)
        return res.status(200).json({
            error: false,
            task
        })
    } catch (error) {
        sendErrorResponse(res, error)
    }
}

export const listTasks = async ( req, res ) => {
    try {
        const options = {
            sortBy: req.sortBy,
            pagination: req.pagination,
            query: req.query,
            requestUser: req.user
        }

        const { data, totalMatches } = await queryTasksToDb(options)
        return res.status(200).json({
            error: false,
            tasks: data,
            totalMatches
        })
    } catch (error) {
        sendErrorResponse(res, error)
    }
}

export const updateTask = async ( req, res ) => {
    try {
        const data = { ...req.body }
        const taskId = req.params.id
        const updatedTask = await editTaskData(taskId, req.user._id, data)
        return res.status(200).json({
            error: false,
            task: updatedTask
        })
    } catch (error) {
        sendErrorResponse(res, error)
    }
}

/** Actions related to time tracking for tasks */
export const createRecord = async ( req, res ) => {
    try {
        const data = { ...req.body }
        const taskId = data.task
        await checkTaskBelongsToUser(taskId, req.user._id)
        const record = await setNewTaskRecord({ ...data, creator: req.user._id })
        return res.status(200).json({
            error: false,
            record
        })
    } catch (error) {
        sendErrorResponse(res, error)
    }
}

/** Stop counter: close open record [Only for reporting using a clock] */
export const closeRecord = async ( req, res ) => {
    try {
        const taskId = req.params.taskId
        await checkTaskBelongsToUser(taskId, req.user._id)
        const record = await closeTaskRecord(taskId)
        return res.status(200).json({
            error: false,
            record
        })
    } catch (error) {
        sendErrorResponse(res, error)
    }
}

/** Listar registros/reportes de tiempo por tarea */
export const listRecordsByTask = async ( req, res ) => {
    try {
        const taskId = req.params.taskId
        await checkTaskBelongsToUser(taskId, req.user._id)
        const { data, totalMatches } = await listRecords({
            sortBy: req.sortBy,
            pagination: req.pagination,
            task: taskId
        })

        return res.status(200).json({
            error: false,
            records: data,
            totalMatches
        })
    } catch (error) {
        sendErrorResponse(res, error)
    }
}

/** Delete a task and related records */
export const deleteTaskById = async ( req, res ) => {
    try {
        const taskId = req.params.id
        await checkTaskBelongsToUser(taskId, req.user._id)
        const [ deleted ] = await deleteTask(taskId)
        return res.status(200).json({
            error: false,
            task: deleted
        })
    } catch (error) {
        sendErrorResponse(res, error)
    }
}

/** Get opened task clocks (if they exists) */
export const getOpenTasksByUser = async ( req, res ) => {
    try {
        const userId = req.user._id
        const records = await getOpenClockTask(userId)
        return res.status(200).json({
            error: false,
            records
        })
    } catch (error) {
        sendErrorResponse(res, error)
    }
}