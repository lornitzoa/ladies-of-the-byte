const express = require("express");
const router = express.Router();
const Plans = require("../models/planModel.js");

router.get("/", (req, res) => {
  Plans.find({}, (err, foundPlan) => {
    res.json(foundPlan);
  });
});

router.delete("/:id", (req, res) => {
  Plans.findByIdAndRemove(req.params.id, (err, deletedPlan) => {
    res.json(deletedPlan);
  });
});

router.post("/", (req, res) => {
  Plans.create(req.body, (err, createdPlan) => {
    console.log("err", err);

    res.json(createdPlan);
  });
});

router.put("/:id", (req, res) => {
  console.log(req.body);
  Plans.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updatedPlan) => {
      res.json(updatedPlan);
    }
  );
});

router.post("/:id", (req, res) => {
  console.log(req.body);
  Plans.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updatedPlan) => {
      res.json(updatedPlan);
    }
  );
});

module.exports = router;
