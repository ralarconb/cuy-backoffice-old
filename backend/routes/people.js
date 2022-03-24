const router = require("express").Router();
let Person = require("../models/person.model");

router.route("/").get((req, res) => {
  Person.find()
    .then((people) => res.json(people))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const familyname = req.body.familyname;
  const forename = req.body.forename;
  const dic = req.body.dic;
  const din = req.body.din;
  const newPerson = new Person({
    familyname: familyname,
    forename: forename,
    dic: dic,
    din: din,
  });

  newPerson
    .save()
    .then(() => res.json("Person added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Person.findById(req.params.id)
    .then((person) => res.json(person))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Person.findByIdAndDelete(req.params.id)
    .then(() => res.json("Person deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Person.findById(req.params.id)
    .then((person) => {
      person.familyname = req.body.familyname;
      person.forename = req.body.forename;
      person.dic = Number(req.body.dic);
      person.din = req.body.din;

      person
        .save()
        .then(() => res.json("Person updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
