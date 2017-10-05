import express from 'express';
import * as config from './config';
import mysql from 'mysql';
const app = express();

const connection = mysql.createConnection({
  host     : process.env.RDS_HOSTNAME || config.dbOptions.host,
  user     : process.env.RDS_USERNAME || config.dbOptions.user,
  password : process.env.RDS_PASSWORD || config.dbOptions.password,
  port     : process.env.RDS_PORT || config.dbOptions.port
});

connection.connect((err) => {
  if(err){
    console.error('Failed to connect to database: '+err.stack);
    return;
  }

  console.log("Established connection to database");
  //Only start the server if the connection is successful
  const listener = app.listen(config.PORT, () => {
    console.log(`Find at: http://localhost:${listener.address().port}`);
  });
});

app.get("/:id", (req, res) => {
  const params = req.params;
  res.send(`You said id: ${params.id}`);
});