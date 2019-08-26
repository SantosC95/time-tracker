import mongoose from "../index"
const Schema = mongoose.Schema
import moment from "moment"
import Record from "./records"
import __ from "lodash"

let Taskschema = new Schema({
    name: {
        type: String,
        trim: true,
        default: `Task ${moment().toDate()}`
    },
    description: {
        type: String,
        trim: true,
        default: ""
    },
    // Seconds
    estimate: {
        type: Number,
        default: 0
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    active: {
        type: Boolean,
        default: true
    },
    state: {
        enum: {
            values: [ "FINISHED", "PENDING", "WORKING" ],
            message: "Invalid state value for task"
        },
        type: String,
        default: "PENDING",
        required: true
    },
    projectId: {
        type: Schema.Types.ObjectId,
        ref: "Project"
    }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    }
})

Taskschema.methods = {
    async getTimes () {
        const records = await Record.find({ task: this._id })
        return __.sumBy(records, "time")
    }
}

Taskschema.index({ name: "text", description: "text" })

const __Model__ = mongoose.model('Task', Taskschema, 'tasks'); 
export default __Model__