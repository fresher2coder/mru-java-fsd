package collectionAPI;

import java.util.*;

public class CollectionDeque {

	public static void main(String[] args) {

		Deque<Character> ch1 = new LinkedList<Character>();
		
		//adding
		ch1.add('d');
		ch1.addFirst('c');
		ch1.addLast('e');
		
		System.out.println("ch1: " + ch1);
		
		Deque<Character> ch2 = new LinkedList<Character>();
		
		ch2.add('x');
		ch2.addFirst('v');
		ch2.addLast('y');
		
		System.out.println("ch2: " + ch2);
		
		ch1.addAll(ch2);
		System.out.println("\nch1: " + ch1);

		//Accessing
		System.out.println("\nch1 first element: " + ch1.getFirst());
		System.out.println("ch1 last element: " + ch1.getLast());
		
		System.out.println("\nch1 peekfirst element: " + ch1.peekFirst());
		System.out.println("ch1 peeklast element: " + ch1.peekLast());
		
		//Deleting
		System.out.println("\nch1 removefirst element: " + ch1.removeFirst());
		System.out.println("ch1 removelast element: " + ch1.removeLast());
		
		//Iterating forward
		//Iterating using Iterator
		Iterator iter = ch1.iterator();
		
		System.out.println("\nDeque Elements:");		
		while(iter.hasNext()) {
			System.out.println(iter.next());
		}
		
		//Iterating in reverse
		
		iter = ch1.descendingIterator();
		
		System.out.println("\nList Elements in reverse:");		
		while(iter.hasNext()) {
			System.out.println(iter.next());
		}	
	}

}
