enum DatabaseType {
	MONGO = 'mongo',
	MYSQL = 'mysql',
	POSTGRES = 'postgres',
	SQLITE = 'sqlite',
	MARIADB = 'mariadb',
	MSSQL = 'mssql',
	SQLITE3 = 'sqlite3',
}

enum NodeEnv {
	DEVELOPMENT = 'development',
	PRODUCTION = 'production',
}

enum ShopStatus {
	ACTIVE = 'active',
	INACTIVE = 'inactive',
}

enum ApiKeyPermission {
	READ = 'read',
	WRITE = 'write',
	DELETE = 'delete',
}

enum Header {
	API_KEY = 'x-api-key',
}

export { DatabaseType, NodeEnv, ShopStatus, ApiKeyPermission, Header }
