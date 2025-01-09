package oops;

//Real-world Example: User Details
class User {
 public String name;       // Accessible everywhere
 private String password;  // Accessible only within the class

 public User(String name, String password) {
     this.name = name;
     this.password = password;
 }

 public void displayName() {
     System.out.println("Name: " + name);
 }

 private void displayPassword() {
     System.out.println("Password: " + password);
 }
}

public class AccessModifiers {
 public static void main(String[] args) {
     User user = new User("Alice", "secure123");
     user.displayName();
     // user.displayPassword(); // Error: private method
 }
}
