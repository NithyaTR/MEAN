const express = require('express');
const Post = require("../models/post");
const router = express.Router();

router.get('/api/posts', (req, res) => {
    Post.find().then(documents => {
        res.status(200).json({
          message: "Posts fetched successfully!",
          posts: documents
        });
      });
});

router.get('/api/posts/:id', (req, res) => {
  Post.findById(req.params.id).then(document => {
    if (document) {
      res.status(200).json({
        message: "Post fetched successfully!",
        posts: document
      });
    } else {
      res.status(400).json({message: "Post not found"});
    }
    });
});

router.post('/api/posts', (req, res) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
      });
      post.save().then(createdPost => {
        res.status(201).json({
          message: "Post added successfully",
          postId: createdPost._id
        });
      });
});

router.delete("/api/posts/:id", (req, res, next) => {
    Post.deleteOne({ _id: req.params.id }).then(result => {
      console.log(result);
      res.status(200).json({ message: "Post deleted!" });
    });
  });

router.put("/api/posts/:id", (req,res, next) => {
  const post = {
    title: req.body.title,
    content: req.body.content
  };
  Post.updateOne({_id: req.params.id}, post).then(result => {
    res.status(200).json({message: "Update successful"});
  })
});

module.exports = app;
