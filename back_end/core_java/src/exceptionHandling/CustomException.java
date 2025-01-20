package exceptionHandling;

import java.util.Scanner;

public class CustomException {

	public static void main(String[] args) throws InsufficientException {
		
		double amount, balance = 1500.34;

		try(Scanner scan = new Scanner(System.in)){
			
			System.out.println("Enter the amount to be withdrawn:");
			amount = scan.nextDouble();			
		}
		
		try {
			if(amount>balance)
				throw new InsufficientException("Transaction Declined.\nInsufficient Fund.");
		}
		catch(InsufficientException ie) {
			System.err.println(ie.getMessage());
			System.out.println("Available Balance: " + balance);
		}
	}

}


