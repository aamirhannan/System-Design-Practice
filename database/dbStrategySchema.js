class DatabasePattern {
    constructor() {
        this.databaseConnectionInstance = null
    }

    async connect() {
        throw new Error('connect method must be implemented')
    }

    async close() {
        throw new Error('close method must be implemented')
    }

    async healthCheck() {
        throw new Error('healthCheck method must be implemented')
    }
}

module.exports = DatabasePattern