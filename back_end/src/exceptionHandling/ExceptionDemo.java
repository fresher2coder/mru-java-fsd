package exceptionHandling;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.util.Scanner;

// Custom Exception Class
class InsufficientException extends Exception {
    public InsufficientException(String message) {
        super(message);
    }
}

public class ExceptionDemo {

    int a = 10;

    public static void main(String[] args) {

        int div = 0, dis = 0;
        double amount = 0, balance = 154000.25;

        System.out.println("Enter Dividend and Divisor");

        // Try-with-resources for safe handling of Scanner
        try (Scanner scan = new Scanner(System.in)) {
            div = scan.nextInt();
            dis = scan.nextInt();

            System.out.println("Enter the amount to be withdrawn:");
            amount = scan.nextDouble();
        } catch (Exception e) {
            System.err.println("Invalid input: " + e.getMessage());
            return; // Exit the program if input is invalid
        }

        int[] a = {10, 20, 30};
        ExceptionDemo obj = null;

        try {
            // ArithmeticException
            System.out.println("Quotient: " + div / dis);

            // Nested try for ArrayIndexOutOfBoundsException
            try {
                System.out.println("2nd element of a: " + a[dis]);
            } catch (ArrayIndexOutOfBoundsException aie) {
                System.err.println("Array index out of bounds: " + aie.getMessage());
            }

            // NullPointerException
            try {
                System.out.println(obj.a);
            } catch (NullPointerException np) {
                System.err.println("Null pointer exception: " + np.getMessage());
            }

            // Checked Exception (FileNotFoundException)
            try {
                File file = new File("abc.text");
                FileInputStream fp = new FileInputStream(file);
                fp.close();
            } catch (FileNotFoundException fe) {
                System.err.println("File not found: " + fe.getMessage());
            } catch (Exception fe) {
                System.err.println("Error while handling file: " + fe.getMessage());
            }

            // Custom Exception
            if (amount > balance) {
                throw new InsufficientException("Balance is insufficient");
            }

            System.out.println(amount + " is withdrawn");

        } catch (ArithmeticException ae) {
            System.err.println("Arithmetic error: " + ae.getMessage());
        } catch (InsufficientException ie) {
            System.err.println("Custom exception: " + ie.getMessage());
        } catch (RuntimeException re) {
            System.err.println("Runtime exception: " + re.getMessage());
        } catch (Exception e) {
            System.err.println("General exception: " + e.getMessage());
        } catch (Throwable th) {
            System.err.println("Throwable caught: " + th.getMessage());
        } finally {
            System.out.println("Finally block executed.");
            System.out.println("2nd element of a: " + a[1]);
        }

        System.out.println("Have a happy day");
    }
}
