package collectionAPI;

import java.util.*;

public class CollectionArray {

public static void main(String[] args) {		
		
		ArrayList array = new ArrayList();
		
		array.add(10.25);
		array.add(10.69f);
		array.add(10);
		array.add('d');
		array.add("Java");
		
		System.out.println("Array: " + array);
		
		//Iterating using Iterator
		Iterator iter = array.iterator();
		
		System.out.println("\nArray Elements:");		
		while(iter.hasNext()) {
			System.out.println(iter.next());
		}
				
		//Declaration
		ArrayList<Integer> intArray1 = new ArrayList();
		ArrayList<Integer> intArray2 = new ArrayList();
		
		//Adding
		for(int i=10; i<100; i+=10)
			intArray1.add(i);
				
		intArray1.add(2, 25);
		
		for(int i=19; i<100; i+=19)
			intArray2.add(i);
		
		intArray1.addAll(intArray2);
		
		System.out.println("\nArray1: " + intArray1);
		System.out.println("Array2: " + intArray2);
		
		//Accessing
		System.out.println("\n4th element in Array2: " + intArray2.get(3));
		
		//Updating
		intArray2.set(3, 74);
		System.out.println("\n4th element in Array2: " + intArray2.get(3));
		
		//Searching
		System.out.println("\n100 is present in Array1: " + intArray1.contains(100));
		System.out.println("index of 100: " + intArray1.indexOf(100));
		
		//Deleting
		System.out.println(intArray1.remove(2));
		
		//for-each
		System.out.println("\nArray1 elements:");
		for(int value:intArray1) {
			System.out.println(value);
		}			
	}	
}
