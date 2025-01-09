package oops;

//Base Class: Common order attributes and methods
class Order {
 private int orderId;
 private String customerName;
 private double orderAmount;

 public Order(int orderId, String customerName, double orderAmount) {
     this.orderId = orderId;
     this.customerName = customerName;
     this.orderAmount = orderAmount;
 }

 public int getOrderId() {
     return orderId;
 }

 public String getCustomerName() {
     return customerName;
 }

 public double getOrderAmount() {
     return orderAmount;
 }

 public double calculateTax() {
     return orderAmount * 0.05; // Default tax: 5%
 }

 public double calculateShipping() {
     return 50; // Flat shipping cost
 }

 public void displayOrderSummary() {
     System.out.println("Order ID: " + orderId + ", Customer: " + customerName);
     System.out.println("Order Amount: " + orderAmount);
     System.out.println("Tax: " + calculateTax());
     System.out.println("Shipping: " + calculateShipping());
     System.out.println("Total Amount: " + (orderAmount + calculateTax() + calculateShipping()));
 }
}

//Derived Class 1: Retail Order
class RetailOrder extends Order {
 private double retailDiscount;

 public RetailOrder(int orderId, String customerName, double orderAmount, double retailDiscount) {
     super(orderId, customerName, orderAmount);
     this.retailDiscount = retailDiscount;
 }

 @Override
 public double calculateTax() {
     return getOrderAmount() * 0.08; // Retail orders have 8% tax
 }

 public double calculateDiscount() {
     return getOrderAmount() * (retailDiscount / 100);
 }

 @Override
 public void displayOrderSummary() {
     super.displayOrderSummary();
     System.out.println("Retail Discount: " + calculateDiscount());
     System.out.println("Final Total: " + (getOrderAmount() + calculateTax() + calculateShipping() - calculateDiscount()));
 }
}

//Derived Class 2: Corporate Order
class CorporateOrder extends Order {
 private double corporateDiscount;
 private double corporateTaxRate;

 public CorporateOrder(int orderId, String customerName, double orderAmount, double corporateDiscount, double corporateTaxRate) {
     super(orderId, customerName, orderAmount);
     this.corporateDiscount = corporateDiscount;
     this.corporateTaxRate = corporateTaxRate;
 }

 @Override
 public double calculateTax() {
     return getOrderAmount() * (corporateTaxRate / 100); // Tax rate varies for corporate orders
 }

 public double calculateDiscount() {
     return getOrderAmount() * (corporateDiscount / 100);
 }

 @Override
 public void displayOrderSummary() {
     super.displayOrderSummary();
     System.out.println("Corporate Discount: " + calculateDiscount());
     System.out.println("Final Total: " + (getOrderAmount() + calculateTax() + calculateShipping() - calculateDiscount()));
 }
}

//Derived Class 3: International Order (Multi-level Inheritance)
class InternationalOrder extends CorporateOrder {
 private double customsDuty;

 public InternationalOrder(int orderId, String customerName, double orderAmount, double corporateDiscount,
                           double corporateTaxRate, double customsDuty) {
     super(orderId, customerName, orderAmount, corporateDiscount, corporateTaxRate);
     this.customsDuty = customsDuty;
 }

 public double calculateCustomsDuty() {
     return getOrderAmount() * (customsDuty / 100);
 }

 @Override
 public void displayOrderSummary() {
     super.displayOrderSummary();
     System.out.println("Customs Duty: " + calculateCustomsDuty());
     System.out.println("Final Total with Duty: " +
             (getOrderAmount() + calculateTax() + calculateShipping() + calculateCustomsDuty() - calculateDiscount()));
 }
}

//Main Class: Simulating the Order Processing System
public class OrderProcessingSystem {
 public static void main(String[] args) {
     // Retail Order
     RetailOrder retailOrder = new RetailOrder(101, "Alice", 5000, 10); // 10% discount
     System.out.println("Retail Order Summary:");
     retailOrder.displayOrderSummary();

     System.out.println("\n---------------------------------\n");

     // Corporate Order
     CorporateOrder corporateOrder = new CorporateOrder(102, "Acme Corp", 20000, 15, 12); // 15% discount, 12% tax rate
     System.out.println("Corporate Order Summary:");
     corporateOrder.displayOrderSummary();

     System.out.println("\n---------------------------------\n");

     // International Order
     InternationalOrder internationalOrder = new InternationalOrder(103, "Global Inc", 30000, 20, 15, 5); // 20% discount, 15% tax, 5% customs duty
     System.out.println("International Order Summary:");
     internationalOrder.displayOrderSummary();
 }
}
