package login_system.dto;

import java.util.HashMap;
import java.util.Map;

public class VehicleStore {
	private static final Map<String, Vehicle> vehicleStore = new HashMap<>(); // Keyed by username

	public static boolean registerStudent(Vehicle vehicle) {
		if (!vehicleStore.containsKey(vehicle.getUsername())) {
			vehicleStore.put(vehicle.getUsername(), vehicle);
			return true;
		}
		return false; // Username already exists
	}

	public static Vehicle validateUser(String username, String password) {
		Vehicle vehicle = vehicleStore.get(username);
		if (vehicle != null && vehicle.getPassword().equals(password)) {
			return vehicle;
		}
		return null; // Invalid username or password
	}

	public static Vehicle getStudent(String username) {
		return vehicleStore.get(username);
	}
}
