//Defines the port the server should run on
export const PORT = process.env.PORT || 3001;

//Defines default options for database if not defined by environment variables
export const dbOptions = {
  host     : "localhost",
  user     : "root",
  password : "root",
  port     : "3306",
  database : "dramaRama"
};

//Startup commands for a database
export const databaseCommands={
  createVideosTable: 'CREATE TABLE videos (name LONGTEXT NOT NULL, youtubeId VARCHAR(45) NOT NULL, creatorId VARCHAR(45) NOT NULL,rating INT NOT NULL DEFAULT 0,PRIMARY KEY (youtubeId))',
  createUsersTable : 'CREATE TABLE users (userName VARCHAR(45) NOT NULL, id VARCHAR(45) NOT NULL, description LONGTEXT NULL, PRIMARY KEY (id))'
};
