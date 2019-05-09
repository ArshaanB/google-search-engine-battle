const express = require("express");
const router = express.Router();

const Term = require("../models/term");

router.get("", (req, res, next) => {
  Term.find({}).then(term => {
    res.status(200).json({
      message: "Success on Server",
      terms: term
    });
  }).catch(err => {
    res.status(500).json({
      message: "Failed on Server"
    })
  });
});

router.post("", (req, res, next) => {
  console.log(req.body);
  const term = new Term({
    title: req.body.title,
    volume: req.body.volume,
    imageURL: req.body.imageURL
  });
  term.save().then(myPost => {
    res.status(200).json({
      message: "Save to DB successful."
    })
  }).catch(err => {
    res.status(500).json({
      message: "Save to DB failed."
    })
  });
});

module.exports = router;
