const asyncHandler = require("express-async-handler");

const getArticles = asyncHandler(async (req, res) =>{
    res.status(200).json({ message: "Articles" });
});

const createArticle = asyncHandler(async (req, res) =>{
    res.status(201).json({ message: "Create an article" });
});

const getArticle = asyncHandler(async (req, res) =>{
    res.status(200).json({ message: "Single article" });
});

const updateArticle = asyncHandler(async (req, res) =>{
    res.status(200).json({ message: "Update article" });
});

const deleteArticle = asyncHandler(async (req, res) =>{
    res.status(200).json({ message: "Delete article" });
});

module.exports = { getArticles, createArticle, getArticle, updateArticle, deleteArticle };