const User = require('../models/user.model')
const Post = require('../models/post.model')

const { v4: uuidv4 } = require('uuid')
const { getDBConnectionInstance } = require('../db')



// this will be a transaction, where a post will be created and it will also be inserted in user table
const createPost = async (req, res) => {
    const { title, createdBy } = req.body
    if (!title || !createdBy) {
        return res.status(400).send('Title and createdBy are required')
    }

    // const postID = uuidv4()
    const dbConnection = getDBConnectionInstance()
    const t = await dbConnection.databaseConnectionInstance.transaction()
    try {
        const post = await Post.create({
            title,
            createdBy
        }, {
            transaction: t
        })

        await User.update(
            {
                posts: dbConnection.databaseConnectionInstance.literal(
                    `array_append("posts", '${post.postID}'::uuid)`
                )
            },
            {
                where: { email: createdBy },
                transaction: t
            }
        )


        await t.commit()
        res.status(201).send({
            message: 'Post created successfully',
            post
        })
    } catch (error) {
        await t.rollback()
        console.error('Post creation error:', error)
        res.status(500).send({
            message: 'Post creation failed',
            error
        })
    }
}

const getAllPosts = async (req, res) => {
    const posts = await Post.findAll()
    res.status(200).send({
        message: 'Posts fetched successfully',
        posts
    })
}

const getPostById = async (req, res) => {
    const { id } = req.params
    const post = await Post.findOne({ where: { id } })
    if (!post) {
        return res.status(404).send({
            message: 'Post not found'
        })
    }
    res.status(200).send({
        message: 'Post fetched successfully',
        post
    })
}

const updatePost = async (req, res) => {
    const { id } = req.param;
    try {
        const { title } = req.body

        if (!title) {
            return res.status(400).send({
                message: 'Title is required'
            })
        }

        const post = await Post.update({ title }, { where: { id } })

        res.status(200).send({
            message: 'Post updated successfully',
            post
        })

    } catch (error) {
        res.status(500).send({
            message: 'Post update failed',
            error
        })
    }
}

const deletePost = async (req, res) => {
    const { id } = req.params
    const post = await Post.findOne({ where: { id } })
    if (!post) {
        return res.status(404).send({
            message: 'Post not found'
        })
    }
    await post.destroy()
    res.status(200).send({
        message: 'Post deleted successfully'
    })
}


module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost
}