package exceptionHandling;

import java.util.Scanner;

public class FinallyDemo {

	int a = 10;
	public static void main(String[] args) {

		int dis, div;
		
		System.out.println("Enter Dividend and Divisor");
				
		try(Scanner scan = new Scanner(System.in)){
			div = scan.nextInt();
			dis = scan.nextInt();			
		}
		
		int a[] = {10, 20, 30};
		
		FinallyDemo obj = null;
		
		try {
			System.out.println("Quotient: " + div/dis);
			
			try{
				System.out.println("2nd element of a: " + a[dis]);
			}
			catch(ArrayIndexOutOfBoundsException aie) {
				System.err.println(aie.getMessage());
			}
			
			try {
				System.out.println(obj.a);
			}
			catch(NullPointerException np) {
				System.err.println(np.getMessage());
			}			
		}		
		
		catch(ArithmeticException ae) {
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
		
		finally {
			System.out.println("Finally Block");
		}	
		
		System.out.println("Have a happy day");
	}
}
