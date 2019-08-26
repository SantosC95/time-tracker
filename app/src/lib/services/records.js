import Record from "../../mongo/models/records"
import Task from "../../mongo/models/tasks"
import { RecordCreationError } from "../errors/error"
import moment from "moment"
import __Promise__ from "bluebird"

/** Create a new time record */
export const setNewTaskRecord = async ( data ) => {
    if (data.trackingMode === "CLOCK") {
        delete data.time
        await closeOtherPendingRecords(data.task)
        /** Search if a record is pending for this task */
        const pending = await Record.findOne({
            task: data.task,
            trackingMode: "CLOCK",
            end: null
        })
    
        if (!pending) {
            await Task.update({ _id: data.task }, { state: "WORKING" })
            return saveRecordInDb(data)
        }
        return pending
    }

    return saveRecordInDb(data)
}

/** Close a task's record */
export const closeTaskRecord = async ( taskId, updateTaskState = true ) => {
    const record = await Record.findOne({
        task: taskId,
        trackingMode: "CLOCK",
        end: null
    })

    if (record) {
        if (updateTaskState) {
            await Task.update({ _id: taskId }, { state: "PENDING" })
        }
        record.end = moment().toDate()
        record.time = moment().diff(moment(record.start), "seconds")
        return record.save()
    }

    return null
}

export const listRecords = async ( options ) => {
    const { 
        sortBy, 
        pagination, 
        task
    } = options

    const [ data, totalMatches ] = await __Promise__.all([
        Record.find({ task })
            .select('-__v')
            .skip(pagination.from)
            .limit(pagination.size)
            .sort(sortBy || '-createdAt'),

        Record.countDocuments({ task })
    ])

    return {
        data,
        totalMatches
    }
}


/** Close other pending records from other tasks */
const closeOtherPendingRecords = async ( taskId ) => {
    /** Look for task owner/creator */
    const task = await Task.findById(taskId)
        .select('creator')
        .lean()

    const pendingRecords = await Record.find({
        creator: task.creator,
        task: { $ne: taskId },
        trackingMode: "CLOCK",
        end: null
    })

    return __Promise__.map(pendingRecords, ( record ) => {
        record.end = moment().toDate()
        record.time = moment().diff(moment(record.start), "seconds")
        return __Promise__.all([
            record.save(),
            Task.update({ _id: record.task }, { state: "PENDING" })
        ])
    })
}

/** Save in DB record data */
const saveRecordInDb = ( data ) => {
    const record = new Record(data)
    const data_error = record.validateSync();
    if (data_error) {
        throw new RecordCreationError(null, data_error.errors)
    }
    return record.save()
} 