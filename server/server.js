import express from "express";
import path from "path";
import devBundle from "./devBundle";
import template from "../template";
const CURRENT_WORKING_DIR = process.cwd();
const app = express();

devBundle.compile(app);

app.use("/dist", express.static(path.join(CURRENT_WORKING_DIR, "dist")));
app.get("/", (req, res) => {
  res.send(template());
});
let port = process.env.PORT || 3000;
app.listen(port, function onStart(err) {
  if (err) console.log(err);
  console.info("Server start on port %s", port);
});
