package oops;

//Real-world Example: Car
class Car {
 String brand;
 int year;

 Car(String brand, int year) {
     this.brand = brand;
     this.year = year;
 }

 void displayInfo() {
     System.out.println("Brand: " + brand + ", Year: " + year);
 }
}

public class ClassObjectConstructor {
 public static void main(String[] args) {
     Car car1 = new Car("Toyota", 2020);
     Car car2 = new Car("Honda", 2019);

     car1.displayInfo();
     car2.displayInfo();
 }
}

