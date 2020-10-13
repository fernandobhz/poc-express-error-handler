const express = require("express");
const app = express();
const port = 3000;

app.get("/time", (req, res, next) => res.send(new Date()));

app.use("/error", (req, res, next) => next(new Error("error")));


const pocHandlerError = (req, res, next) => next(new Error("error"));

const pocHandlerOk = (req, res, next) => res.send("ok");

const pocPrivateErrorHandler = (error, req, res, next) => {
  const { message, stack } = error;
  const msg = `PRIVATE ERROR HANDLER\n${message}\n+${stack}`;
  console.log(msg);
  res.send(msg);
};

app.use("/poc-error-global", pocHandlerError);
app.use("/poc-error-private", [pocHandlerError, pocPrivateErrorHandler]);
app.use("/poc-ok", [pocHandlerOk, pocPrivateErrorHandler]);

app.use((req, res, next) => {
    next(new Error("NOT FOUND"));
})

app.use((error, req, res, next) => {
  const { message, stack } = error;
  const msg = `GLOBAL ERROR HANDLER\n${message}\n+${stack}`;
  console.log(msg);
  res.send(msg);
});

app.listen(port, () => console.log(`App listen port ${port}`));
