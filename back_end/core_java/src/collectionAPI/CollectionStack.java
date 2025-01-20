package collectionAPI;

import java.util.*;

public class CollectionStack {

	public static void main(String[] args) {

		//LIFO
		
		Stack<String> fruit = new Stack<String>();
		
		System.out.println("Is my basket empty: " + fruit.isEmpty());
		
		//Pushing
		fruit.push("Apple");
		fruit.push("Banana");
		fruit.push("Orange");
		fruit.push("Strawberry");
		fruit.push("Grapes");
		fruit.push("Gauva");
		
		System.out.println("\nFruit Stack: " + fruit);
		
		//Poping
		System.out.println("\nPoped element:");
		System.out.println(fruit.pop());
		System.out.println(fruit.pop());
		
		//Peeking
		System.out.println("\nPeeked element:");
		System.out.println(fruit.peek());
		System.out.println(fruit.peek());
		
		System.out.println("\nIs my basket empty: " + fruit.isEmpty());
		
		//Fetching element at specific index
		System.out.println("\n3 element from the stack: " + fruit.elementAt(2));	
		
	}

}
