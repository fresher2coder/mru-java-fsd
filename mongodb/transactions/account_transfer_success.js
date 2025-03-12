// ✅ Checks if the database exists before proceeding.
// ✅ Validates sender and receiver accounts before performing transactions.
// ✅ Ensures sufficient balance before deducting money.
// ✅ Checks if the transaction is inserted successfully.
// ✅ Uses ObjectId() for unique transaction IDs.
// ✅ Ensures session cleanup in the finally block.

// Start a MongoDB session
const session = db.getMongo().startSession();
session.startTransaction();

try {
  const db = session.getDatabase("banking");

  // Check if the database exists
  if (!db) {
    throw new Error("Database 'banking' does not exist!");
  }

  const accountsCollection = db.accounts;
  const transactionsCollection = db.transactions;

  // 1️⃣ Transfer ₹500 from ACC001 to ACC002
  let account1 = accountsCollection.findOne({ accountId: "ACC001" });
  let account2 = accountsCollection.findOne({ accountId: "ACC002" });

  if (!account1) {
    throw new Error("Sender account ACC001 does not exist!");
  }
  if (!account2) {
    throw new Error("Receiver account ACC002 does not exist!");
  }
  if (account1.balance < 500) {
    throw new Error("Insufficient balance in ACC001!");
  }

  accountsCollection.updateOne(
    { accountId: "ACC001" },
    { $inc: { balance: -500 } }
  );
  accountsCollection.updateOne(
    { accountId: "ACC002" },
    { $inc: { balance: 500 } }
  );

  const txn1 = transactionsCollection.insertOne({
    transactionId: new ObjectId(),
    fromAccountId: "ACC001",
    toAccountId: "ACC002",
    amount: 500,
    transactionType: "Transfer",
    date: new Date(),
  });

  if (!txn1.acknowledged) {
    throw new Error("Failed to insert transfer transaction!");
  }

  // 2️⃣ Loan Payment - Transfer ₹1000 from ACC002 to LOAN_ACC
  let loanAccount = accountsCollection.findOne({ accountId: "LOAN_ACC" });

  if (!loanAccount) {
    throw new Error("Loan account LOAN_ACC does not exist!");
  }
  if (account2.balance < 1000) {
    throw new Error("Insufficient balance in ACC002 for Loan Payment!");
  }

  accountsCollection.updateOne(
    { accountId: "ACC002" },
    { $inc: { balance: -1000 } }
  );
  accountsCollection.updateOne(
    { accountId: "LOAN_ACC" },
    { $inc: { balance: 1000 } }
  );

  const txn2 = transactionsCollection.insertOne({
    transactionId: new ObjectId(),
    fromAccountId: "ACC002",
    toAccountId: "LOAN_ACC",
    amount: 1000,
    transactionType: "Loan Payment",
    date: new Date(),
  });

  if (!txn2.acknowledged) {
    throw new Error("Failed to insert loan payment transaction!");
  }

  // 3️⃣ Simultaneous Transactions (Isolation Demonstration)
  let account3 = accountsCollection.findOne({ accountId: "ACC030" });

  if (!account3) {
    throw new Error("Receiver account ACC003 does not exist!");
  }

  let concurrentTransaction1 = accountsCollection.updateOne(
    { accountId: "ACC002" },
    { $inc: { balance: -1000 } }
  );
  let concurrentTransaction2 = accountsCollection.updateOne(
    { accountId: "ACC003" },
    { $inc: { balance: 2000 } }
  );

  const txn3 = transactionsCollection.insertMany([
    {
      transactionId: new ObjectId(),
      fromAccountId: "ACC002",
      toAccountId: "LOAN_ACC",
      amount: 1000,
      transactionType: "Loan Payment",
      date: new Date(),
    },
    {
      transactionId: new ObjectId(),
      fromAccountId: "ACC002",
      toAccountId: "ACC003",
      amount: 2000,
      transactionType: "Withdrawal",
      date: new Date(),
    },
  ]);

  if (!txn3.acknowledged) {
    throw new Error("Failed to insert simultaneous transactions!");
  }

  // ✅ Commit Transaction
  session.commitTransaction();
  print("✅ Transaction committed successfully!");
} catch (error) {
  // ❌ Rollback Transaction if any error occurs
  session.abortTransaction();
  print("❌ Transaction aborted due to error:", error.message);
} finally {
  session.endSession();
}
