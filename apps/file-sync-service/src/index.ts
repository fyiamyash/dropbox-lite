import express from "express";
import { syncServiceRouter } from "./router/syncRouter";
import { envCustom } from "./utils/envCustom";

const app = express();

const port = envCustom.syncPort;

// app.get("/sync", (req, res) => {
//   res.send("heklllo from the sync service");
// });

app.use(syncServiceRouter);

app.listen(port, () => {
  console.log(`File sync Service is running on ${port}`);
});
