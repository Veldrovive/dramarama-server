import express from 'express';
import * as config from './config'
const app = express();

app.get("/:id", (req, res) => {
  const params = req.params;
  res.send(`You said id: ${params.id}`);
});

const listener = app.listen(config.PORT, () => {
  console.log(`Find at: http://localhost:${listener.address().port}`);
});