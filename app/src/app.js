import express from "express"
import cors from "cors"
import { bruteForceShield } from "./lib/middlewares/middlewares"
import routes from "./routes/routes"

const app = express()
app.disable('x-powered-by'); // Do not show server is running on Express

/** Avoid attacks through repeated request */
if (process.env.NODE_ENV !== "test") {
    app.use(bruteForceShield);
}

/** Activate cors */
app.use(cors());
/** Requests parser **/
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/** API versions */
app.use('/api', routes);

/*** 404 Response Handler ***/
app.use(function (req, res) {
    return res.status(404).json({
        message: `URL ${req.url} not found (404)`,
        statusCode: 404
    });
});

export default app