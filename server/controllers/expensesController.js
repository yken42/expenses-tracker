import Expense from "../models/expenseModel.js";

// **************** CREATE  ****************
export const createExpense = async (req, res) => {
  const { name, amount, category, type } = req.body;

  // console.log("REQ.USER", req.user);
  if (!req.user || !req.user.id)
    return res
      .status(401)
      .json({ message: "Unauthorized, no user id provided" });
  try {
    if (!name || !amount || !category || !type) {
      res.status(401).json({ message: "all fields are required" });
    }
    const newExpense = new Expense({
      name,
      amount,
      category,
      type,
      user: req.user.id,
    });
    await newExpense.save();
    return res.status(201).json({ newExpense });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "something went wrong", error: error.message });
  }
};

// **************** GET ALL EXPENSES ****************
export const getAllExpenses = async (req, res) => {
  const userId = req.params.id;
  try {
    const expenses = await Expense.find({ user: userId });
    console.log(expenses)
    return res.status(201).json({ message: "success", data: expenses });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

// **************** DELETE ****************
export const deleteExpense = async (req, res) => {
  const expenseId = req.params.id;
  try {
    const deletedExpense = await Expense.findByIdAndDelete(expenseId);
    // console.log(expenseId);
    if (!deletedExpense)
      return res.status(404).json({ message: "id not found" });
    return res.status(201).json({ message: "delete successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong ", error: error.message });
  }
};

// **************** UPDATE ****************
export const updateExpense = async (req, res) => {
  const { id } = req.params;
  const { name, amount, category, type } = req.body;
  const userId = req.user?.id;

  try {
    const expense = await Expense.findById(id);
    if (!expense) return res.status(404).json({ message: "Expense not found" });
    if (expense.user.toString() !== userId)
      return res
        .status(403)
        .json({ message: "Unauthorized to update this expense" });
    if (name) expense.name = name;
    if (amount) expense.amount = amount;
    if (category) expense.category = category;
    if (type) expense.type = type;
    await expense.save();

    return res
      .status(201)
      .json({ message: "expense updated successfully", expense });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};
