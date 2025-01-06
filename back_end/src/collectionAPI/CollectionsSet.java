package collectionAPI;

import java.util.*;

public class CollectionsSet {

	public static void main(String[] args) {

		HashSet<Integer> set1 = new HashSet<Integer>();
		
		set1.add(10);
		set1.add(50);
		set1.add(20);
		set1.add(70);
		set1.add(30);
		set1.add(40);
		set1.add(40);
		set1.add(30);
		set1.add(10);
		
		System.out.println("HashSet: " + set1);
		
		LinkedHashSet<Integer> set2 = new LinkedHashSet<Integer>();
		
		set2.add(10);
		set2.add(50);
		set2.add(20);
		set2.add(70);
		set2.add(30);
		set2.add(40);
		set2.add(40);
		set2.add(30);
		set2.add(10);
		
		System.out.println("LinkedHashSet: " + set2);
		
		TreeSet<Integer> set3 = new TreeSet<Integer>();
		
		set3.add(10);
		set3.add(50);
		set3.add(20);
		set3.add(70);
		set3.add(30);
		set3.add(40);
		set3.add(40);
		set3.add(30);
		set3.add(10);
		
		System.out.println("TreeSet: " + set3);
	}
}
