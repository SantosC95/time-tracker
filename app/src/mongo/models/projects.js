import mongoose from "../index"
import User from "./user"
import Task from "./tasks"
import Record from "./records"
import __ from "lodash"
const Schema = mongoose.Schema

let ProjectSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please provide a project name'],
        trim: true
    },
    description: {
        type: String,
        trim: true,
        default: ""
    },
    users: [{ type: Schema.Types.ObjectId, ref: "User" }],
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    active: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    }
})

ProjectSchema.methods = {
    async getUsersAssociated ( userRequest ) {
        let users = []
        const isAssociated = this.users.some(u => u.equals(userRequest))
        if (isAssociated) {
            users = await User.find({ _id: { $in: this.users }})
                .select('name lastname email phone img_key')
        }
        return users
    },
    async getTimes () {
        const tasks = await Task.find({ projectId: this._id })
            .select('estimate')
            .lean()

        const totalEstimate = __.sumBy(tasks, "estimate")
        const records = await Record.find({
            task: {
                $in: tasks.map(t => t._id)
            }
        })

        const totalSpent = __.sumBy(records, "time")
        return {
            totalEstimate,
            totalSpent
        }
    }
}

ProjectSchema.index({ name: "text", description: "text" })

const __Model__ = mongoose.model('Project', ProjectSchema, 'projects'); 
export default __Model__