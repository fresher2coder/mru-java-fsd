package classwork;

import java.util.*;

public class ArrayListDemo {
	
	public static void main(String[] args) {
				
		
		/*
		 * initialization
		 * iteration		
		 * type conversion
		 * in-built methods
		 * sorting  
		 */
		//10
		ArrayList list1 = new ArrayList(20);
		list1.add(10);
		list1.add(25.5f);
		list1.add("Java");
		list1.add(true);
		list1.add(new Student());
		
		list1.trimToSize();
				
		System.out.println(list1);
		System.out.println(list1.size());
		
		ArrayList<String> list2 = new ArrayList<>(List.of("Apple", "Banana", "Citrus"));
		System.out.println(list2);
		
		for(String fruit: list2) {
			System.out.println(fruit);
		}
		
		//classname::method name
		list2.forEach(System.out::println);
		
		Iterator iter = list2.iterator();
		
		while(iter.hasNext()) {
			System.out.println(iter.next());
		}
		
		/*
		 *Arraylist to array
		 *array to arraylist
		 *arraylist to linkedlist
		 *
		 *to string
		 */
		
		String[] fruits= list2.toArray(new String[0]);
		System.out.println(Arrays.toString(fruits));
		
		ArrayList<String> list3 = new ArrayList<>(Arrays.asList(fruits));
		System.out.println(list3);
		
		LinkedList<String> list4= new LinkedList<>(list3);
		System.out.println(list4);
		
		ArrayList<String> names = new ArrayList<>(List.of("tw", "o", "three", "four"));
		System.out.println(names);
		
		names.sort(Comparator.comparingInt(String::length));
		System.out.println(names);
		
		Collections.sort(names);
		System.out.println(names);
		
		ArrayList<Integer> nums = new ArrayList<Integer>(List.of(10, 47, 94, 35, 15, 2));
		
		nums.sort(Comparator.comparingInt(n -> -n));
		System.out.println(nums);
	}

}

class Student{}










