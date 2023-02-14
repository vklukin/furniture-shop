const cors = require('cors')
const bodyParser = require("body-parser");

module.exports = function (app) {
    app.use(cors({credentials: true, origin: 'http://localhost:3000'}))
    app.use(bodyParser.json())

    
}