const fs = require("fs");
const path = require("path");

function generateReport(expenses, frequency) {
    if (!Array.isArray(expenses) || expenses.length === 0) {
        console.log("No expenses to generate the report.");
        return;
    }

    const now = new Date();
    const reportName = `${frequency}-report-${now.toISOString().split("T")[0]}.json`;

    const reportDir = path.join(__dirname, 'reports');
    if (!fs.existsSync(reportDir)) {
        fs.mkdirSync(reportDir, { recursive: true });
    }


    const groupedExpenses = expenses.reduce((acc, exp) => {
        const expenseDate = new Date(exp.date);

        
        const key = frequency === "weekly"
            ? `Week-${Math.ceil(expenseDate.getDate() / 7)}`
            : `${expenseDate.getFullYear()}-${expenseDate.getMonth() + 1}`;
        
        acc[key] = acc[key] || [];
        acc[key].push(exp);
        return acc;
    }, {});

    const filePath = path.join(reportDir, reportName);
    fs.writeFileSync(filePath, JSON.stringify(groupedExpenses, null, 2));

    console.log(`Report generated: ${filePath}`);
}

module.exports = { generateReport };
