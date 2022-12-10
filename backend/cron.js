const { scrape } = require("./scape");
const nodeCron = require("node-cron");

// run your task at 8:00 am every day.
nodeCron.schedule("0 0 8 * * *", scrape);

// run your task at 12:00 am every day.
nodeCron.schedule("0 8 13 * * *", scrape);

// run your task at 16:00 pm every day.
nodeCron.schedule("0 0 16 * * *", scrape);
