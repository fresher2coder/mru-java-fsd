// ✅ Checks if the database exists before proceeding.
// ✅ Validates if the sender account exists before checking the balance.
// ✅ Ensures sufficient balance before deducting money.
// ✅ Verifies that the withdrawal and transaction log are successful.
// ✅ Uses ObjectId() for unique transaction IDs.
// ✅ Ensures session cleanup in the finally block.

// Start a MongoDB session
const session = db.getMongo().startSession();
session.startTransaction();

try {
  const db = session.getDatabase("bankDB");

  // ✅ Check if the database exists
  if (!db) {
    throw new Error("Database 'bankDB' does not exist!");
  }

  const accountsCollection = db.accounts;
  const transactionsCollection = db.transactions;

  // ✅ Validate Sender Account (ACC001)
  let sender = accountsCollection.findOne({ accountId: "ACC001" });

  if (!sender) {
    throw new Error("Account 'ACC001' does not exist!");
  }

  // ✅ Check Sufficient Balance
  if (sender.balance < 5000) {
    throw new Error("Insufficient funds in ACC001!");
  }

  // 🔹 Deduct ₹5000 from ACC001
  let deductResult = accountsCollection.updateOne(
    { accountId: "ACC001" },
    { $inc: { balance: -5000 } }
  );

  if (deductResult.modifiedCount === 0) {
    throw new Error("Failed to deduct ₹5000 from ACC001!");
  }

  // 🔹 Log Withdrawal Transaction
  let txnResult = transactionsCollection.insertOne({
    transactionId: new ObjectId(),
    fromAccountId: "ACC001",
    amount: 5000,
    transactionType: "Withdrawal",
    date: new Date(),
    status: "Success",
  });

  if (!txnResult.acknowledged) {
    throw new Error("Failed to insert Withdrawal transaction!");
  }

  // ✅ Commit Transaction
  session.commitTransaction();
  print("✅ Withdrawal Successful!");
} catch (error) {
  // ❌ Rollback Transaction in case of failure
  session.abortTransaction();
  print("❌ Withdrawal Failed: " + error.message);
} finally {
  // ✅ Ensure session is closed
  session.endSession();
}
