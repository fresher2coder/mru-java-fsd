package login_system.dto;

public class Student {
    private String username;
    private String password;
    private String name;
    private String email;
    private String dob;
    private String gender;
    private String course;
    private String address;

    public Student(String username, String password, String name, String email, String dob, String gender, String course, String address) {
        this.username = username;
        this.password = password;
        this.name = name;
        this.email = email;
        this.dob = dob;
        this.gender = gender;
        this.course = course;
        this.address = address;
    }

    // Getters
    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getDob() {
        return dob;
    }

    public String getGender() {
        return gender;
    }

    public String getCourse() {
        return course;
    }

    public String getAddress() {
        return address;
    }
}
