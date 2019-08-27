import mongoose from "../../mongo/index";

const flushDB = async ( req, res ) => {
    await Promise.all([
        mongoose.connection.db.dropCollection('users'),
        mongoose.connection.db.dropCollection('projects'),
        mongoose.connection.db.dropCollection('records'),
        mongoose.connection.db.dropCollection('tasks')
    ])
    return res.status(200).json({
        ip: req.ip,
        status: "OK"
    })
}

export default flushDB