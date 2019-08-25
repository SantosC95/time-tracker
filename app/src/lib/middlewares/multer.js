// Middleware for request parsing
import multer from 'multer'
import { join } from "path"

const storage = multer.diskStorage({
	destination: (req, file, cb) => cb(null, join(__dirname, '../../tmp')),
	filename:  (req, file, cb) => cb(null, file.originalname)
})

module.exports = multer({ storage });
