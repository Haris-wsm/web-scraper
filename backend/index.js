require("dotenv").config();
const PostgressDatabase = require("./database");
PostgressDatabase.connect();

// Cron jobs
require("./cron");

const app = require("./app");
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`app is listen on port ${PORT}`));
