package collectionAPI;

import java.util.*;

public class CollectionsMap {

	public static void main(String[] args) {
		
		HashMap<Integer, String> dict = new HashMap<Integer, String>();
		
		dict.put(1, "One");
		dict.put(2, "Two");
		dict.put(3, "Three");
		dict.put(4, "Four");
		dict.put(5, "Five");
		
		System.out.println(dict);
		
		System.out.println("Keys: " + dict.keySet());
		System.out.println("Values: " + dict.values());
		
		//Iteration
		
		for(int key: dict.keySet()) {
			System.out.println(dict.get(key));
		}
		
		LinkedHashMap<Integer, String> dict1 = new LinkedHashMap<Integer, String>();
		
		dict1.put(1, "One");
		dict1.put(3, "Three");
		dict1.put(4, "Four");
		dict1.put(2, "Two");		
		dict1.put(5, "Five");	
		
		System.out.println(dict1);
		
		TreeMap<Integer, String> dict2 = new TreeMap<Integer, String>();
		
		dict2.put(3, "Three");
		dict2.put(4, "Four");
		dict2.put(1, "One");
		dict2.put(5, "Five");
		dict2.put(2, "Two");			
		
		System.out.println(dict2);
	}

}
