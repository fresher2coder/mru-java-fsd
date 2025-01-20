package oops;

//Interface for common order operations
interface ProductOrder {
 void processOrder();  // Method to process the order
 double calculateCost(); // Method to calculate the total cost
 void generateInvoice(); // Method to generate an invoice
}

//Abstract class for common order functionality
abstract class AbstractOrder implements ProductOrder {
 protected String orderId;
 protected String customerName;

 public AbstractOrder(String orderId, String customerName) {
     this.orderId = orderId;
     this.customerName = customerName;
 }

 @Override
 public void generateInvoice() {
     System.out.println("Generating invoice for Order ID: " + orderId);
     System.out.println("Customer: " + customerName);
     System.out.println("Total Cost: $" + calculateCost());
     System.out.println("Invoice generated successfully.\n");
 }

 // Abstract methods to be implemented by specific order types
 @Override
 public abstract void processOrder();

 @Override
 public abstract double calculateCost();
}

//Concrete class for Physical Product Order
class PhysicalProductOrder extends AbstractOrder {
 private double productCost;
 private double shippingCost;

 public PhysicalProductOrder(String orderId, String customerName, double productCost, double shippingCost) {
     super(orderId, customerName);
     this.productCost = productCost;
     this.shippingCost = shippingCost;
 }

 @Override
 public void processOrder() {
     System.out.println("Processing physical product order for Order ID: " + orderId);
     System.out.println("Product cost: $" + productCost);
     System.out.println("Shipping cost: $" + shippingCost);
     System.out.println("Order processed successfully.\n");
 }

 @Override
 public double calculateCost() {
     return productCost + shippingCost;
 }
}

//Concrete class for Digital Product Order
class DigitalProductOrder extends AbstractOrder {
 private double productCost;

 public DigitalProductOrder(String orderId, String customerName, double productCost) {
     super(orderId, customerName);
     this.productCost = productCost;
 }

 @Override
 public void processOrder() {
     System.out.println("Processing digital product order for Order ID: " + orderId);
     System.out.println("Product cost: $" + productCost);
     System.out.println("No shipping required for digital products.");
     System.out.println("Order processed successfully.\n");
 }

 @Override
 public double calculateCost() {
     return productCost;
 }
}

//Concrete class for Service Order
class ServiceOrder extends AbstractOrder {
 private double serviceCost;
 private int hoursWorked;

 public ServiceOrder(String orderId, String customerName, double serviceCost, int hoursWorked) {
     super(orderId, customerName);
     this.serviceCost = serviceCost;
     this.hoursWorked = hoursWorked;
 }

 @Override
 public void processOrder() {
     System.out.println("Processing service order for Order ID: " + orderId);
     System.out.println("Service cost per hour: $" + serviceCost);
     System.out.println("Hours worked: " + hoursWorked);
     System.out.println("Order processed successfully.\n");
 }

 @Override
 public double calculateCost() {
     return serviceCost * hoursWorked;
 }
}

//Main class to test the Order Management System
public class Abstraction {
 public static void main(String[] args) {
     // Creating different types of orders
     ProductOrder physicalOrder = new PhysicalProductOrder("PH123", "Alice", 100, 20);
     ProductOrder digitalOrder = new DigitalProductOrder("DG456", "Bob", 50);
     ProductOrder serviceOrder = new ServiceOrder("SV789", "Charlie", 30, 5);

     // Processing and generating invoices for orders
     System.out.println("Processing Orders:");
     physicalOrder.processOrder();
     digitalOrder.processOrder();
     serviceOrder.processOrder();

     System.out.println("Generating Invoices:");
     physicalOrder.generateInvoice();
     digitalOrder.generateInvoice();
     serviceOrder.generateInvoice();
 }
}

