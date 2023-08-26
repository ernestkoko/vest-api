const params = require('strong-params');
import bodyParser from 'body-parser';
import express, { NextFunction, Request, Response } from 'express';
import { NOT_FOUND_STATUS_CODE, NOT_FOUND_STATUS_MESSAGE } from './config/constants';
// import { Logger } from './lib/logger';
import { middlewares } from './app/middleware/errorHandler';
import { routes as apiRoutes } from './routes/index';
import { BadRequestException } from './lib/custom-errors';
const app = express();
// const logger = new Logger();

app.use(bodyParser.json({ limit: '50mb', type: 'application/json' }));
app.use(params.expressMiddleware());
// app.use(logger.getRequestLogger());

app.use('', apiRoutes);
app.get('/health', (req, res) => res.json({ status: true, message: 'Health OK!' }));

// app.use(logger.getRequestErrorLogger());

app.use((err:Error, req: Request, res: Response, next: NextFunction) => {
  let code: number;
  let message: string;
  if(err instanceof BadRequestException){
    code = 400;
    message = err.message;
  }
  else {
    code = 500;
    message = err.message ?? "Internal server errror.";
  }
  return res.status(code).send({
    statusCode: code,
    message
  });
});
app.use(middlewares.handleRequestError);
export { app };