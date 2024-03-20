const express = require('express');
const bodyParser = require('body-parser');
const path = require('path')

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "build")))
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build/index.html"))
})

const router = require('./routes');
app.use('/api', router);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
