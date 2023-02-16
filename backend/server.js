const express = require("express");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 2000;
require("./routes/index")(app);

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));