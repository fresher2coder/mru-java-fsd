package collectionAPI;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;


public class CollectionComparator {

	public static void main(String[] args) {

		Student dk = new Student("Dinesh", 32);
		Student dd = new Student("Divya", 29);
		Student ddd = new Student("Darwin", 1);
		
		ArrayList<Student> students = new ArrayList<Student>();
		
		students.add(dk);
		students.add(dd);
		students.add(ddd);
		
		//Based on age
		Collections.sort(students);
		
		System.out.println(students);
		
		Comparator<Student> obj = ((Student s1, Student s2)->{
			
			return s1.name.compareTo(s2.name);
		});
		
		//Based on name
		Collections.sort(students, obj);
		
		System.out.println(students);		
	}
}

class Student implements Comparable<Student> {

	String name;
	int age;
	
	public Student(String name, int age) {
		
		this.name = name;
		this.age = age;
	}
	
	@Override
	public String toString() {
		
		return name + " " + age;
	}

	@Override
	public int compareTo(Student obj) {
		
		Student o = (Student)obj;
		
		if(this.age == o.age)
			return 0;
		
		else if(this.age>o.age)
			return this.age-o.age;
		
		else
			return this.age-o.age;		
		
	}	
}
