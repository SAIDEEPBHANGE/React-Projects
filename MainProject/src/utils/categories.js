export const categories = {
  Income: ["Salary", "Freelance", "Business", "Investment", "Bonus", "Gift", "Other"],
  Expense: ["Food", "Shopping", "Travel", "Rent", "Bills", "Entertainment",
    "Healthcare", "Education", "Transportation", "Other"],
};

export const money = (amount) => new Intl.NumberFormat("en-IN", {
  style: "currency", currency: "INR", minimumFractionDigits: 2,
}).format(amount);
