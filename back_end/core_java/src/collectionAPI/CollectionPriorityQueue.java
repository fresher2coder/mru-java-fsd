package collectionAPI;

import java.util.*;

public class CollectionPriorityQueue {

	public static void main(String[] args) {

		PriorityQueue<Integer> minQ = new PriorityQueue<Integer>();
		
		//adding
		minQ.add(15);
		minQ.add(5);
		minQ.add(24);
		minQ.add(19);
		minQ.add(6);
		minQ.add(27);
		minQ.add(13);
		
		//peeking
		System.out.println("High Priority Element");
		System.out.println(minQ.peek());
		
		//Remove
		System.out.println("\nPop out High Priority Element");
		for(int i=0; i<3; i++)
			System.out.println(minQ.poll());
		
		System.out.println("\nHigh Priority Element");
		System.out.println(minQ.peek());
	}
}
