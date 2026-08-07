import express from "express";

import { envCustom } from "./utils/envCustom";
import { fileUploadRouter } from "./router";

const app = express();

const port = envCustom.PORT;

app.use(express.json());

app.use(fileUploadRouter);

app.listen(port, () => {
  console.log(`The file upload service is listenign at port:${port}`);
});
