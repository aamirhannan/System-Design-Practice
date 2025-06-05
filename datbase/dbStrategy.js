const DatabasePattern = require('./dbStrategySchema')
const dotenv = require('dotenv')
const { Sequelize } = require('sequelize')
const mongoose = require('mongoose')
dotenv.config()

let postgresInstance = null

class SQLDBConnection extends DatabasePattern {
    constructor() {
        super()
        if (postgresInstance) {
            return postgresInstance
        }
        this.databaseConnectionInstance = new Sequelize(process.env.DB_URL, {
            pool: {
                max: 5,
                min: 0,
                idle: 10000,
                acquire: 10000
            },
            dialect: 'postgres',
            dialectOptions: {
                ssl: {
                    require: true,
                    rejectUnauthorized: false
                }
            },
            logging: false
        })
        postgresInstance = this
    }

    async connect(retries = 3) {
        for (let i = 0; i < retries; i++) {
            try {
                await this.databaseConnectionInstance.authenticate()
                await this.databaseConnectionInstance.sync()
                console.log('Postgres Database connected')
                return
            } catch (err) {
                console.log('Failed to connect to database', err)
            }
        }
        throw new Error('Failed to connect to database')
    }

    async close() {
        await this.databaseConnectionInstance.close().then(() => {
            console.log('Postgres Database closed')
        }).catch((err) => {
            console.log('Failed to close database', err)
        })
    }

    async healthCheck() {
        await this.databaseConnectionInstance.connection.db.admin().ping().then(() => {
            console.log('Postgres Database is healthy')
        }).catch((err) => {
            console.log('Postgres Database is not healthy', err)
        })
    }
}

let mongoInstance = null
class NoSQLDBConnection extends DatabasePattern {
    constructor() {
        super()
        if (mongoInstance) {
            return mongoInstance
        }
        this.databaseConnectionInstance = mongoose
        mongoInstance = this
    }

    async connect(retries = 3) {

        for (let i = 0; i < retries; i++) {
            try {
                await this.databaseConnectionInstance.connect(process.env.MONGO_URI)
                console.log('MongoDB Database connected')
                return
            } catch (err) {
                console.log('Failed to connect to database', err)
            }
        }
        throw new Error('Failed to connect to database')
    }

    async close() {
        await this.databaseConnectionInstance.close().then(() => {
            console.log('MongoDB Database closed')
        }).catch((err) => {
            console.log('Failed to close database', err)
        })
    }
    async healthCheck() {
        try {
            await this.databaseConnectionInstance.connection.db.admin().ping()
            return { status: 'healthy', timestamp: new Date() }
        } catch (err) {
            return { status: 'unhealthy', error: err.message }
        }
    }
}

module.exports = {
    SQLDBConnection,
    NoSQLDBConnection
} 
