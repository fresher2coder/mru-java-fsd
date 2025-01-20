package oops;

//BankAccount class demonstrating encapsulation and access modifiers
class BankAccount {
 // Private fields for encapsulation
 private String accountHolderName;
 private String accountNumber;
 private double balance;

 // Protected field (accessible in subclasses)
 protected double minimumBalance = 500;

 // Default field (package-private)
 String bankBranch = "Default Branch";

 // Constructor to initialize the account
 public BankAccount(String accountHolderName, String accountNumber, double initialBalance) {
     this.accountHolderName = accountHolderName;
     this.accountNumber = accountNumber;
     this.balance = initialBalance;
 }

 // Public getter for account holder name
 public String getAccountHolderName() {
     return accountHolderName;
 }

 // Public method to get the account balance (read-only access)
 public double getBalance() {
     return balance;
 }

 // Public method to deposit money
 public void deposit(double amount) {
     if (amount > 0) {
         balance += amount;
         System.out.println("Deposited: " + amount + ", New Balance: " + balance);
     } else {
         System.out.println("Deposit amount must be positive.");
     }
 }

 // Public method to withdraw money with validation
 public void withdraw(double amount) {
     if (amount > 0 && (balance - amount) >= minimumBalance) {
         balance -= amount;
         System.out.println("Withdrawn: " + amount + ", Remaining Balance: " + balance);
     } else {
         System.out.println("Insufficient funds or minimum balance requirement not met.");
     }
 }

 // Protected method: Display account details (accessible to subclasses)
 protected void displayAccountDetails() {
     System.out.println("Account Holder: " + accountHolderName);
     System.out.println("Account Number: " + accountNumber);
     System.out.println("Balance: " + balance);
     System.out.println("Bank Branch: " + bankBranch);
 }
}

//SavingsAccount subclass demonstrates protected access
class SavingsAccount extends BankAccount {
 private double interestRate;

 public SavingsAccount(String accountHolderName, String accountNumber, double initialBalance, double interestRate) {
     super(accountHolderName, accountNumber, initialBalance);
     this.interestRate = interestRate;
 }

 // Public method to calculate interest
 public double calculateInterest() {
     return getBalance() * (interestRate / 100);
 }

 @Override
 protected void displayAccountDetails() {
     super.displayAccountDetails();
     System.out.println("Interest Rate: " + interestRate + "%");
 }
}

//Main class to test access modifiers and encapsulation
public class Encapsulation {
 public static void main(String[] args) {
     // Creating a BankAccount object
     BankAccount account = new BankAccount("John Doe", "1234567890", 10000);

     // Accessing public methods
     System.out.println("Account Holder: " + account.getAccountHolderName());
     System.out.println("Initial Balance: " + account.getBalance());

     // Performing deposit and withdrawal
     account.deposit(5000);
     account.withdraw(4000);

     // Creating a SavingsAccount object
     SavingsAccount savingsAccount = new SavingsAccount("Jane Doe", "9876543210", 20000, 5);
     savingsAccount.deposit(2000);
     System.out.println("Interest Earned: " + savingsAccount.calculateInterest());

     // Accessing protected method
     System.out.println("\nSavings Account Details:");
     savingsAccount.displayAccountDetails();
 }
}
