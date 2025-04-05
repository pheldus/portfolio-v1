const express = require("express");
const path = require("path");
const app = express();
const routes = require("./routes/routes");
if(process.env.NODE_ENV == "production"){
    require("./production")(app);
}
app.set("view engine","ejs");

app.use("/libs", express.static(path.join(__dirname, "node_modules")))
app.use("/static",express.static(path.join(__dirname, "public")));

app.use(routes)

const port = process.env.PORT || 3000;


app.listen(port);