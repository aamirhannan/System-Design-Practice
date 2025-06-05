const dotenv = require('dotenv')
const { Sequelize } = require('sequelize')



class DatabaseConnection {

    constructor() {
        this.databaseConnectionInstance = new Sequelize(process.env.DB_URL, {
            dialect: 'postgres',
            dialectOptions: {
                ssl: {
                    require: true,
                    rejectUnauthorized: false
                }
            },
            logging: false
        })
    }

    async sync() {
        await this.databaseConnectionInstance.authenticate()
        await this.databaseConnectionInstance.sync().then(() => {
            console.log('Database synced')
        }).catch((err) => {
            console.log('Failed to sync database', err)
        })
    }

    async close() {
        await this.databaseConnectionInstance.close().then(() => {
            console.log('Database closed')
        }).catch((err) => {
            console.log('Failed to close database', err)
        })
    }

}

let instance = null

function getDBConnectionInstance() {
    if (!instance) {
        instance = new DatabaseConnection()
    }
    return instance
}

module.exports = { getDBConnectionInstance, DatabaseConnection }


// const databaseConnection = new Sequelize(process.env.DB_URL, {
//     dialect: 'postgres',
//     dialectOptions: {
//         ssl: {
//             require: true,
//             rejectUnauthorized: false
//         }
//     },
//     logging: false
// })

// module.exports = databaseConnection

// databaseConnectionInstance.sync().then(() => {
//     console.log('Database synced')
// }).catch((err) => {
//     console.log('Failed to sync database', err)
// })