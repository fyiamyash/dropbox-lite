import express from "express";
import { envCustom } from "./utils/envCustom";
import { appRouter } from "./router";

const port = envCustom.Port;

const app = express();

app.use(express.json());
app.use(appRouter);

app.listen(port, () => {
  console.log(`This app is listening on Port: ${port}`);
});
