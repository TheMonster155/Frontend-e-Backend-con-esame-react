const express = require("express");

const comments = express.Router();
const CommentsModel = require("../models/CommentsModels");
const Bookmodel = require("../models/Bookmodel");
const Usersmodel = require("../models/Usersmodel");

comments.get("/comments", async (req, res, next) => {
  try {
    const allComments = await CommentsModel.find().populate("user book");
    if (allComments.length === 0) {
      return res.status(404).send({
        statusCode: 404,
        message: "Nessun utente trovato",
      });
    }

    res.status(200).send({
      statusCode: 200,
      message: "Comment found successfully",
      comments,
    });
  } catch (error) {
    next(error);
  }
});

comments.post("/comments/create", async (req, res, next) => {
  const { rate, comment } = req.body;
  try {
    const user = await Usersmodel.findOne({ _id: req.body.user });
    const book = await Bookmodel.findOne({ id: req.body.book });

    const newComments = new CommentsModel({
      comment,
      rate,
      user: user._id,
      book: book._id,
    });

    const savedComment = await newComments.save();
    await Bookmodel.updateOne(
      { _id: book._id },
      { $push: { comments: savedComment } }
    );
    res.status(201).send({
      statusCode: 201,
      message: "Comment  successfully  create",
    });
  } catch (error) {
    next(error);
  }
});

comments.patch("/comments/update/:commentsId", async (req, res, next) => {
  const { commentId } = req.params;

  if (!commentId) {
    return res.status(404).send({
      statusCode: 404,
      message: "Comment not fuond",
    });
  }

  try {
    const commentExist = await CommentsModel.findById(commentId);

    if (!commentExist) {
      return res.status(404).send({
        statusCode: 404,
        message: "Comment not fuond",
      });
    }

    res.status(200).send({
      statusCode: 200,
      message: "Book updated successfully",
      book: updatedBook,
    });

    const updateCommentData = req.body;
    const option = { new: true };
    const result = await CommentsModel.findByIdAndUpdate(
      commentid,
      updateCommentData,
      option
    );
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Error updating book",
    });
  }
});

comments.delete("/comments/delete/:commentId", async (req, res, next) => {
  const { commentId } = req.params;

  try {
    const deleteComment = await CommentsModel.findByIdAndDelete(commentId);

    if (!deleteComment) {
      return res.status(404).send({
        statusCode: 404,
        message: "Book not found",
      });
    }

    res.status(200).send({
      statusCode: 200,
      message: "Comment deleted successfully",
      book: deleteComment,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = comments;
