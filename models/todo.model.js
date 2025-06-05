const { Sequelize, DataTypes } = require('sequelize');
const mongoose = require('mongoose');

function getSQLModel(sequelize) {
    return sequelize.define('Todo', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        completed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    });
}

const mongoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    completed: { type: Boolean, default: false }
});
const MongoTodo = mongoose.model('Todo', mongoSchema);

module.exports = { getSQLModel, MongoTodo }; 