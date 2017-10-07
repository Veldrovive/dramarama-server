import mysql from 'mysql';
import * as config from './config';

const pool = mysql.createPool({
  host     : process.env.RDS_HOSTNAME || config.dbOptions.host,
  user     : process.env.RDS_USERNAME || config.dbOptions.user,
  password : process.env.RDS_PASSWORD || config.dbOptions.password,
  port     : process.env.RDS_PORT     || config.dbOptions.port,
  database : process.env.RDS_DB_NAME  || config.dbOptions.database
});

const createRes = (boolSuccess, data, error, errorCode) => {
  if(typeof boolSuccess === 'undefined') boolSuccess = false;
  if(typeof data === 'undefined') data = {};
  if(typeof errorCode === 'undefined') errorCode = 500;
  if(typeof error === 'undefined'){
    error = '';
    errorCode = 200;
  }
  return {
    success: boolSuccess,
    res: data,
    err: {error: error, code: errorCode},
  }
};

export function connect(){
  return new Promise((resolve, reject) => {
    //tests database connection
    pool.getConnection((err, conn) => {
      if(err){
        console.error('Failed to connect to database: '+err.stack);
        conn.release();
        reject(err.stack);
      }

      console.log("Established connection to database");
      //Only start the server if the connection is successful
      onConnect();
      conn.release();
      resolve(true);
    });
  })
}

function onConnect(){
  pool.getConnection((err, conn) => {
    //Gets all tables in the database
    conn.query("SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE='BASE TABLE'", (err, res) => {
      if(err){
        console.error("Error getting table names");
      }else{
        let tableArray = [];
        //Search for tables in the defined schema.
        res.forEach((table) => {
          if(table.TABLE_SCHEMA === config.dbOptions.database){
            tableArray.push(table.TABLE_NAME);
          }
        });
        //If tables are not found, create them
        if(tableArray.indexOf('videos') === -1){
          conn.query(config.databaseCommands.createVideosTable, (err, res) => {
            if(err){
              console.error("Could not create table: ",err)
            }
          })
        }
        if(tableArray.indexOf('users') === -1){
          conn.query(config.databaseCommands.createUsersTable, (err, res) => {
            if(err){
              console.error("Could not create table: ",err)
            }
          })
        }
      }
      conn.release();
    })
  })
}

export function getTables(){
  return new Promise(resolve => {
    pool.getConnection((err, conn) => {
      conn.query("SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE='BASE TABLE'", (err, res) => {
        if(err){
          console.error("Error getting table names");
        }else{
          let tableArray = [];
          //Search for tables in the defined schema.
          res.forEach((table) => {
            if(table.TABLE_SCHEMA === config.dbOptions.database){
              tableArray.push(table.TABLE_NAME);
            }
          });
          resolve(tableArray);
        }
        conn.release();
      })
    })
  })
}