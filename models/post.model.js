const { DataTypes } = require('sequelize')
const { getDBConnectionInstance } = require('../db')

const dbConnection = getDBConnectionInstance()

const Post = dbConnection.databaseConnectionInstance.define('Post', {
    postID: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdBy: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'posts',
    timestamps: true,
    underscored: true
})

module.exports = Post
