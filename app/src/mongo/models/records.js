import mongoose from "../index"
const Schema = mongoose.Schema
import moment from "moment"

let RecordSchema = new Schema({
    task: {
        type: Schema.Types.ObjectId,
        ref: "Task",
        required: true
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    trackingMode: {
        enum: {
            values: [ "CLOCK", "MANUAL" ],
            message: "Invalid tracking mode for task record"
        },
        type: String,
        required: true
    },
    start: {
        type: Date,
        required: function () {
            return this.trackingMode === "CLOCK"
        },
        default: function () {
            if (this.trackingMode === "CLOCK") {
                return moment().toDate()
            }
        }
    },
    end: {
        type: Date
    },
    time: {
        type: Number,
        required: [
            function () {
                return this.trackingMode === "MANUAL"
            },
            "Please provide a valid time"
        ]
    }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    }
})

RecordSchema.virtual('currentTime').get(function () {
    if (!this.end && this.trackingMode === "CLOCK") {
        return moment(this.end).diff(moment(this.start), "seconds")
    }
});

RecordSchema.virtual('active').get(function () {
    if (this.trackingMode === "CLOCK" && !this.end) {
        return true
    }
    return false
});

const __Model__ = mongoose.model('Record', RecordSchema, 'records'); 
export default __Model__