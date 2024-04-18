const express = require("express");
const app = express();
const bookRoute = express.Router();
let Book = require("../model/Book");
// CREATE
bookRoute.route("/add-book").post(async (req, res, next) => {
  await Book.create(req.body)
    .then((result) => {
      res.json({
        data: result,
        message: "Data successfully added!",
        status: 200,
      });
    })
    .catch((err) => {
      return next(err);
    });
});
// GET ALL
bookRoute.route("/").get(async (req, res, next) => {
  await Book.find()
    .then((result) => {
      res.json({
        data: result,
        message: "All items successfully fetched.",
        status: 200,
      });
    })
    .catch((err) => {
      return next(err);
    });
});
// GET SIGNLE
bookRoute.route("/read-book/:id").get(async (req, res, next) => {
  await Book.findById(req.params.id)
    .then((result) => {
      res.json({
        data: result,
        message: "Data successfully fetched.",
        status: 200,
      });
    })
    .catch((err) => {
      return next(err);
    });
});
// UPDATE
bookRoute.route("/update-book/:id").put(async (req, res, next) => {
  await Book.findByIdAndUpdate(req.params.id, {
    $set: req.body,
  })
    .then((result) => {
      res.json({
        data: result,
        msg: "Data successfully updated.",
      });
    })
    .catch((err) => {
      console.log(err);
    });
});
// DELETE
bookRoute.route("/delete-book/:id").delete(async (req, res, next) => {
  await Book.findByIdAndRemove(req.params.id)
    .then(() => {
      res.json({
        msg: "Data successfully updated.",
      });
    })
    .catch((err) => {
      console.log(err);
    });
});
module.exports = bookRoute;