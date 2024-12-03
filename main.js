const express = require("express");
const bodyParser = require("body-parser");
const { router: expenseRoutes, expenses } = require("./routes/expenseRoutes");
const cron = require("node-cron");
const { generateReport } = require("./utils/reportGenerator");

const app = express();

app.use(bodyParser.json());
app.use("/expenses", expenseRoutes);

const PORT = 3000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

cron.schedule("0 0 * * 1", () => {
    generateReport(expenses, "weekly");
});

cron.schedule("0 0 1 * *", () => {
    generateReport(expenses, "monthly");
});
