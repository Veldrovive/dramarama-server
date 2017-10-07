import express from 'express';
import * as config from './config';
import * as database from './database';
const app = express();

app.get("/test/:id", (req, res) => {
  const params = req.params;
  res.send(`You said id: ${params.id}`);
});

app.get("/tables", async (req, res) => {
  const tables = await database.getTables();
  res.send(tables);
})

const listener = app.listen(config.PORT, () => {
  console.log(`Find at: http://localhost:${listener.address().port}`);
});

//If connection test fails, shut down express server
database.connect()
  .then(() => {
    console.log("Startup Successful");
  })
  .catch(err => {
    console.log("Database error");
    listener.close();
  });