const { SQLDBConnection, NoSQLDBConnection } = require('./dbStrategy')

class DatabaseFactory {
    static getDatabaseConnection(type) {
        switch (type) {
            case "POSTGRES":
                return new SQLDBConnection()
            case "MONGO":
                return new NoSQLDBConnection()
            default:
                throw new Error('Invalid database type')
        }
    }
}

module.exports = DatabaseFactory