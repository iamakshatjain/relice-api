const express = require("express");
const router = express.Router();

const Reports = require("../models/report");

router.post("/post/report", (req, res) => {
    var data = req.query;
    console.log(data);
    console.log(data.image);
    console.log(typeof(data.image));
    //todo : upload the image here
    const image_url = "some url";
    Reports.create({
        image: image_url,
        age: data.age,
        location: data.location,
        gender: data.gender,
        hair_color: data.hair_color,
        user_id: data.user_id
    }, (err, createdReport) => {
        if (err) {
            res.send({ error: err });
            console.error(err);
            return;
        }
        console.log("Report created!");
        res.send(createdReport);
    });
});

module.exports = router;