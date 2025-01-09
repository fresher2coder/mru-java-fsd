package oops;

//Real-world Example: Calculator
class Calculator {
 int add(int a, int b) {
     return a + b;
 }

 double add(double a, double b) {
     return a + b;
 }
}

public class MethodOverloading {
 public static void main(String[] args) {
     Calculator calc = new Calculator();
     System.out.println(calc.add(5, 10));       // Integer addition
     System.out.println(calc.add(5.5, 10.5));   // Double addition
 }
}
