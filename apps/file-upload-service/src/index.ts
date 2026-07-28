import express from "express";

import { fielUploadRouter } from "./router";
import { envCustom } from "./utils/envCustom";

const app = express();

const port = envCustom.PORT;

app.use(express.json());

app.use(fielUploadRouter);

app.listen(port, () => {
  console.log(`The file upload service is listenign at port:${port}`);
});
