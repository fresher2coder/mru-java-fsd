package collectionAPI;

import java.util.*;

public class CollectionList {

	public static void main(String[] args) {
		
		
		LinkedList list = new LinkedList();
		
		list.add(10);
		list.add(10.25);
		list.add(10.69f);
		list.add('d');
		list.add("Java");
		
		System.out.println("List: " + list);
		
		//Iterating using Iterator
		Iterator iter = list.iterator();
		
		System.out.println("\nList Elements:");		
		while(iter.hasNext()) {
			System.out.println(iter.next());
		}
				
		//Declaration
		LinkedList<Integer> intList1 = new LinkedList();
		LinkedList<Integer> intList2 = new LinkedList();
		
		//Adding
		for(int i=10; i<100; i+=10)
			intList1.add(i);
				
		intList1.add(2, 25);
		
		for(int i=19; i<100; i+=19)
			intList2.add(i);
		
		intList1.addAll(intList2);
		
		intList1.addFirst(5);
		intList1.addLast(200);
		
		System.out.println("\nList1: " + intList1);
		System.out.println("List2: " + intList2);
		
		//Accessing
		System.out.println("\n4th element in List2: " + intList2.get(3));
		
		//Updating
		intList2.set(3, 74);
		System.out.println("\n4th element in List2: " + intList2.get(3));
		
		//Searching
		System.out.println("\n100 is present in List1: " + intList1.contains(100));
		System.out.println("index of 100: " + intList1.indexOf(100));
		
		//Deleting
		System.out.println("Last element removed: " + intList1.removeLast());
		System.out.println("First element removed: " + intList1.removeFirst());
		System.out.println(intList1.remove(2));
		
		//for-each
		System.out.println("\nList1 elements:");
		for(int value:intList1) {
			System.out.println(value);
		}	
		
		//Iterating in reverse		
		iter = intList1.descendingIterator();
		
		System.out.println("\nList Elements in reverse:");		
		while(iter.hasNext()) {
			System.out.println(iter.next());
		}		
	}
}
