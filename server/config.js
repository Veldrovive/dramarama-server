//Defines the port the server should run on
export const PORT = process.env.PORT || 3001;

//Defines default options for database if not defined by environment variables
export const dbOptions = {
  host     : "localhost",
  user     : "root",
  password : "root",
  port     : "3306"
}