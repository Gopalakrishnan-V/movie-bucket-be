const express = require("express");
const { configureApp } = require("./startup");

// App Configuration
const app = express();
configureApp(app);
app.use("/api/v1", require("./routes"));

const PORT = process.env.PORT || 9000;
app.listen(PORT);
