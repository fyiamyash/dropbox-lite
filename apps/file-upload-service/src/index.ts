import express from "express";
import { envCustom } from "./utils/envCustom";
import { fileUploadController } from "./controller";

const app = express();

const port = envCustom.PORT;

app.use(express.json());

app.use(fileUploadController);

app.listen(port, () => {
  console.log(`The file upload service is listenign at port:${port}`);
});
