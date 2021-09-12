import { Application } from 'express';
import express, { Request, Response } from 'express';
import envData from './config/env';
import routes from './routes';
import { errorResponse } from './utils/responseHandler';
import { StatusCodes } from 'http-status-codes';


const app: Application = express();

app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use("/", routes);

app.use((req: Request, res: Response) => {
    errorResponse(res, { statusCode: StatusCodes.NOT_FOUND, message: 'Route Not Found' });
});

app.listen(envData.PORT, () => { console.log(`App listening on port ${ envData.PORT }`)});



export default app;