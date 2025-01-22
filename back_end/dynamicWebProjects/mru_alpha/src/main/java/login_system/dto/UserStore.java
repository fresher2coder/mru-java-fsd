package login_system.dto;

import java.util.*;

public class UserStore {
	private static final Map<String, Student> userStore = new HashMap<>(); // Keyed by username

	public static boolean registerStudent(Student student) {
		if (!userStore.containsKey(student.getUsername())) {
			userStore.put(student.getUsername(), student);
			return true;
		}
		return false; // Username already exists
	}

	public static Student validateUser(String username, String password) {
		Student student = userStore.get(username);
		if (student != null && student.getPassword().equals(password)) {
			return student;
		}
		return null; // Invalid username or password
	}

	public static Student getStudent(String username) {
		return userStore.get(username);		
	}
}
