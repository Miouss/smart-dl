/* eslint-disable @typescript-eslint/no-var-requires */
const express = require("express");

const appExpress = express();

appExpress.listen(8000, () => {
    console.log("server is running...");
});