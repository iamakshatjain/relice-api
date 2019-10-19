//setting up required packages
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
dotenv.config();
// console.log(process.env.DATABASEURL);
mongoose.connect(process.env.DATABASEURL, {useNewUrlParser: true, useUnifiedTopology: true });
app.set("view engine", "ejs");
app.use(express.static(__dirname + "public"));

//importing routes 
const complaintRoutes = require("./routes/complaint_routes.js");
const processingRoutes = require("./routes/processing_routes.js");
const reportRoutes = require("./routes/report_routes.js");

app.get("/", (req, res) => {
    res.send("Working fine sir");
});

app.use("/api", complaintRoutes);
app.use("/api",processingRoutes);
app.use("/api",reportRoutes);

app.listen(process.env.PORT || 3000, process.env.IP, () => {
    console.log("I am at your service sir...");
});


