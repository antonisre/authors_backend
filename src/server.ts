import express, { Request, Response, Application, Error} from 'express';
import envData from './config/env';
import routes from './routes';
import { errorResponse } from './utils/responseHandler';
import { StatusCodes } from 'http-status-codes';
import cors from 'cors';

const app: Application = express();

app.use(cors({ credentials: true, origin: true }));
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use("/", routes);
app.use((err, req, res, next) => {
    if (err) {
        let paramsIn = "body";
        if (Object.keys(req.body).length == 0) paramsIn = "query"
        errorResponse(res, { statusCode: StatusCodes.BAD_REQUEST, message: err.details.get(paramsIn).details[0].message });
    } 
})

app.use((req: Request, res: Response) => {
    errorResponse(res, { statusCode: StatusCodes.NOT_FOUND, message: 'Route Not Found' });
});

app.listen(envData.PORT, () => { console.log(`App listening on port ${ envData.PORT }`)});

export default app;