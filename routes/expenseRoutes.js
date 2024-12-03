const express = require("express");
const router = express.Router();

let expenses = [];

const categories = ['Food', 'Family', 'Social', 'Work', 'Entertainment', 'Other'];

router.post("/", (req, res) => {
    const { category, amount, date } = req.body;

    if (!categories.includes(category)) {
        return res.status(400).json({ status: "error", message: "Invalid category" });
    }
    if (amount <= 0) {
        return res.status(400).json({ status: "error", message: "Amount must be a positive number" });
    }
    if (!date) {
        return res.status(400).json({ status: "error", message: "Date is required" });
    }

    const expense = {
        id: expenses.length + 1,
        category,
        amount,
        date: new Date(date)
    };

    expenses.push(expense);
    res.json({ status: "success", data: expense });
});


router.get("/", (req, res) => {
    const { category, startdate, enddate } = req.query;
    let filteredExpenses = expenses;

    if (category) {
        filteredExpenses = filteredExpenses.filter(exp => exp.category === category);
    }

    if (startdate || enddate) {
        const start = startdate ? new Date(startdate) : new Date("2000-01-01");
        const end = enddate ? new Date(enddate) : new Date();
        filteredExpenses = filteredExpenses.filter(exp => exp.date >= start && exp.date <= end);
    }

    res.json({ status: "success", data: filteredExpenses });
});

router.get("/analysis", (req, res) => {
    const analysis = categories.map(category => {
        const total = expenses
            .filter(exp => exp.category === category)
            .reduce((acc, exp) => acc + exp.amount, 0);

        return { category, total };
    });

    res.json({ status: "success", data: analysis });
});

module.exports = { router, expenses };
