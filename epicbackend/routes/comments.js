const express = require("express");

const comments = express.Router();
const CommentsModel = require("../models/CommentsModels");
const Bookmodel = require("../models/Bookmodel");
const Usersmodel = require("../models/Usersmodel");

comments.get("/comments/book/:bookId", async (req, res, next) => {
  try {
    const { bookId } = req.params;
    const bookComment = await CommentsModel.find({
      book: bookId,
    }).populate("user");
    if (bookComment.length === 0) {
      return res.status(404).send({
        statusCode: 404,
        message: "Comment not found",
      });
    }
    res.status(200).send({
      statusCode: 200,
      message: "Comment found successfully",
      comments: bookComment,
    });
  } catch (error) {
    next(error);
  }
});

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
      comments: allComments,
    });
  } catch (error) {
    next(error);
  }
});
comments.post("/comments/create", async (req, res, next) => {
  const { rate, comment, user, book } = req.body;
  console.log("Request Body:", req.body);

  if (!user) {
    return res.status(400).send({
      statusCode: 400,
      message: "User ID is required.",
    });
  }

  if (!book) {
    return res.status(400).send({
      statusCode: 400,
      message: "Book ID is required.",
    });
  }

  try {
    const newComment = new CommentsModel({ rate, comment, user, book });
    const savedComment = await newComment.save();

    res.status(201).send({
      statusCode: 201,
      message: "Comment created successfully.",
      comment: savedComment,
    });
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).send({
      statusCode: 500,
      message: "Error creating comment.",
    });
  }
});

comments.patch("/comments/update/:commentsId", async (req, res, next) => {
  const { commentsId } = req.params;

  if (!commentsId) {
    return res.status(404).send({
      statusCode: 404,
      message: "Comment not found",
    });
  }

  try {
    const commentExist = await CommentsModel.findById(commentsId);

    if (!commentExist) {
      return res.status(404).send({
        statusCode: 404,
        message: "Comment not found",
      });
    }

    const updateCommentData = req.body;
    const option = { new: true };

    const result = await CommentsModel.findByIdAndUpdate(
      commentsId,
      updateCommentData,
      option
    );

    if (result) {
      res.status(200).send({
        statusCode: 200,
        message: "Comment updated successfully",
        comment: result,
      });
    } else {
      res.status(404).send({
        statusCode: 404,
        message: "Comment not found",
      });
    }
  } catch (error) {
    console.error("Error updating comment:", error);
    res.status(500).send({
      statusCode: 500,
      message: "Error updating comment",
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
