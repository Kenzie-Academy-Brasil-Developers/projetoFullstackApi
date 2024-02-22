import "express-async-errors";
import "reflect-metadata";
import express, { Application } from "express";
import swaggerUiExpress from "swagger-ui-express";
import swaggerDocument from "./swagger.json";
import { clientRouter } from "./routes/client.route";
import { contactRouter } from "./routes/contact.route";
import { loginRouter } from "./routes/login.route";

import cors from "cors";
import { errorHandle } from "./errors/error";

const app: Application = express();

app.use(express.json());

app.use(cors());

app.use(
  "/api-documentation",
  swaggerUiExpress.serve,
  swaggerUiExpress.setup(swaggerDocument)
);

app.use("/client", clientRouter);

app.use("/login", loginRouter);

app.use("/contact", contactRouter);

app.use(errorHandle);

export default app;
