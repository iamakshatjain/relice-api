const express = require("express");
const router = express.Router();

const Complaints = require("../models/complaint");

router.get("/get/complaints", (req,res) => {
    const data = req.body;
    Complaints.find({}, (err, complaints) => {
        if(err){
            console.log(err);
            res.send({});
            return;
        }
        res.send(complaints);
    });
});

router.post("/post/complaints", async (req, res) => {
    let data = req.query;
    // todo : upload the image first and then generate the url
    const image_url = "";
    console.log(data);

    Complaints.create({
        image : image_url,
        face_id : "",
        victim_name: data.victim_name,
        age: data.age,
        location: data.location,
        gender: data.gender,
        height: data.height,
        complainant_name: data.complainant_name,
        contact: data.contact,
        skin_color: data.skin_color,
        hair_color: data.hair_color,
    }, async(err, complaint) => {
        if (err) {
            console.log(err);
            //make sourabh wait for reply from api
            res.send(-1);
            return;
        }

        //todo : take url from natani
        const response = await axios.get({
            url: "https://reliceai.azurewebsites.net",
            params : {
                dbItemId: image_url
            }
        });

        complaint.face_id = response.face_id;
        await complaint.save();
        res.send({
            complaint_id : complaint._id,
            matched_id : response.matched_id
        });
    });
});

module.exports = router;