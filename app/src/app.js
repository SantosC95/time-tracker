import express from "express"
import cors from "cors"
import swaggerUI from "swagger-ui-express"
import swaggerDocs from "./docs/docs.json"
import { bruteForceShield } from "./lib/middlewares/middlewares"
import routes from "./routes/routes"

const app = express()
app.disable('x-powered-by'); // Do not show server is running on Express

/** Avoid attacks through repeated request */
app.use(bruteForceShield);
/** Activate cors */
app.use(cors());
/** Requests parser **/
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/** API versions */
app.use('/api', routes);

/** Register swagger UI */
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

/*** 404 Response Handler ***/
app.use(function (req, res) {
    return res.status(404).json({
        message: `URL ${req.url} not found (404)`,
        statusCode: 404
    });
});

export default app