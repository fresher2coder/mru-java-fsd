// ✅ Checks if the database exists before proceeding.
// ✅ Validates if the customer exists before deducting money.
// ✅ Ensures sufficient balance before proceeding.
// ✅ Checks if the loan account exists before transferring funds.
// ✅ Verifies if the transaction is inserted successfully.
// ✅ Uses ObjectId() for unique transaction IDs.
// ✅ Ensures session cleanup in the finally block.

// Start a MongoDB session
const session = db.getMongo().startSession();
session.startTransaction();

try {
  const db = session.getDatabase("banking");

  // ✅ Check if the database exists
  if (!db) {
    throw new Error("Database 'banking' does not exist!");
  }

  const customersCollection = db.customers;
  const accountsCollection = db.accounts;
  const transactionsCollection = db.transactions;

  // ✅ Validate Customer (Priya Verma - CUST002)
  let customer = customersCollection.findOne({ customerId: "CUST002" });
  if (!customer) {
    throw new Error("Customer 'CUST002' does not exist!");
  }

  // ✅ Check Sufficient Balance
  if (customer.balance < 1000) {
    throw new Error("Insufficient balance in CUST002's account!");
  }

  // ✅ Validate Loan Account
  let loanAccount = accountsCollection.findOne({ accountId: "LOAN_ACC" });
  if (!loanAccount) {
    throw new Error("Loan Account 'LOAN_ACC' does not exist!");
  }

  // 🔹 Deduct ₹1000 from Priya Verma (CUST002)
  let deductResult = customersCollection.updateOne(
    { customerId: "CUST002" },
    { $inc: { balance: -1000 } }
  );
  if (deductResult.modifiedCount === 0) {
    throw new Error("Failed to deduct amount from CUST002!");
  }

  // 🔹 Add ₹1000 to Loan Account
  let creditResult = accountsCollection.updateOne(
    { accountId: "LOAN_ACC" },
    { $inc: { balance: 1000 } }
  );
  if (creditResult.modifiedCount === 0) {
    throw new Error("Failed to credit amount to Loan Account!");
  }

  // 🔹 Log Loan Payment Transaction
  const txnResult = transactionsCollection.insertOne({
    transactionId: new ObjectId(),
    fromCustomerId: "CUST002",
    toAccountId: "LOAN_ACC",
    amount: 1000,
    transactionType: "Loan Payment",
    date: new Date(),
    status: "Success",
  });

  if (!txnResult.acknowledged) {
    throw new Error("Failed to insert Loan Payment transaction!");
  }

  // ✅ Commit Transaction
  session.commitTransaction();
  print("✅ Loan Payment Successful!");
} catch (error) {
  // ❌ Rollback Transaction in case of failure
  session.abortTransaction();
  print("❌ Loan Payment Failed: " + error.message);
} finally {
  // ✅ Ensure session is closed
  session.endSession();
}
