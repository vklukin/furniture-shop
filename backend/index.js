const express = require('express');
const app = express()
const PORT = process.env.PORT || 2000;

require("dotenv").config();
require('./routes/index')(app)

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));