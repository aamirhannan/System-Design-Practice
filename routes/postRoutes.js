const express = require('express')
const Post = require('../models/post.model')
const { createPost, getAllPosts, getPostById, updatePost, deletePost } = require('../controller/postController')

const router = express.Router()

router.post('/create', createPost)

router.get('/', getAllPosts)

router.get('/:id', getPostById)

router.put('/:id', updatePost)

router.delete('/:id', deletePost)


module.exports = router

