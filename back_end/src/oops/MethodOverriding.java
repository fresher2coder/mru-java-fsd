package oops;

//Base Class: Notification
class Notification {
 private String recipient;

 public Notification(String recipient) {
     this.recipient = recipient;
 }

 public String getRecipient() {
     return recipient;
 }

 public void sendNotification() {
     System.out.println("Sending generic notification to " + recipient);
 }
}

//Derived Class 1: Email Notification
class EmailNotification extends Notification {
 private String emailSubject;

 public EmailNotification(String recipient, String emailSubject) {
     super(recipient);
     this.emailSubject = emailSubject;
 }

 @Override
 public void sendNotification() {
     System.out.println("Sending Email to " + getRecipient());
     System.out.println("Subject: " + emailSubject);
     System.out.println("Body: Your email notification content.");
 }
}

//Derived Class 2: SMS Notification
class SMSNotification extends Notification {
 private String phoneNumber;

 public SMSNotification(String recipient, String phoneNumber) {
     super(recipient);
     this.phoneNumber = phoneNumber;
 }

 @Override
 public void sendNotification() {
     System.out.println("Sending SMS to " + phoneNumber);
     System.out.println("Message: Hello " + getRecipient() + ", this is your SMS notification.");
 }
}

//Derived Class 3: Push Notification
class PushNotification extends Notification {
 private String deviceToken;

 public PushNotification(String recipient, String deviceToken) {
     super(recipient);
     this.deviceToken = deviceToken;
 }

 @Override
 public void sendNotification() {
     System.out.println("Sending Push Notification to device token: " + deviceToken);
     System.out.println("Notification: Hi " + getRecipient() + ", you have a new push notification.");
 }
}

//Main Class: Notification Manager
public class MethodOverriding {
 public static void main(String[] args) {
     // Polymorphism: Storing different notification types in a single array
     Notification[] notifications = {
             new EmailNotification("Alice", "Welcome to our service!"),
             new SMSNotification("Bob", "123-456-7890"),
             new PushNotification("Charlie", "device_token_xyz")
     };

     // Sending all notifications
     for (Notification notification : notifications) {
         notification.sendNotification();
         System.out.println("--------------------------------");
     }
 }
}

