const express = require("express");
const healthRouter = require("./routes/health");

const app = express();
const port = process.env.PORT || 3000;

app.get("/hello", (req, res) => {
  res.json({ message: "world" });
});

app.use(healthRouter);

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}

module.exports = app;
