package exceptionHandling;

import java.util.Scanner;

public class MultipleCatch {

	public static void main(String[] args) {

		int dis, div;
		
		Scanner scan = new Scanner(System.in);
		
		System.out.println("Enter Dividend and Divisor");
		
		div = scan.nextInt();
		dis = scan.nextInt();
		
		scan.close();
		
		try {
			System.out.println("Quotient: " + div/dis);			
		}		
		
		catch(ArithmeticException ae) {
			//System.out.println("Divisor cant be zero");
			System.err.println(ae.getMessage());
		}
		
		catch(RuntimeException re) {
			System.err.println(re.getMessage());
		}
		
		catch(Exception e) {
			System.err.println(e.getMessage());
		}
		
		catch(Throwable th) {
			System.err.println(th.getMessage());
		}
		
		System.out.println("Have a happy day");
	}

}
