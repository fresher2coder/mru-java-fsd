import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Modal from "react-modal";
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import ProfileEditModal from "../components/ProfileEditModal";

// Set Modal root
Modal.setAppElement("#root");

// Styled Components
const Container = styled.div`
  max-width: 600px;
  margin: auto;
  padding: 20px;
  border-radius: 10px;
  background-color: #f8f9fa;
`;

const Card = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
  transition: transform 0.2s ease-in-out;
  border-left: 5px solid #007bff;

  &:hover {
    transform: translateY(-3px);
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  font-size: 1.2rem;
  color: #333;
`;

const EditButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #007bff;
  font-size: 1rem;

  &:hover {
    color: #0056b3;
  }
`;

const DeleteButton = styled.button`
  background-color: red;
  color: white;
  border: none;
  padding: 10px;
  width: 100%;
  cursor: pointer;
  margin-top: 10px;
  border-radius: 5px;
  font-size: 1rem;
  transition: 0.3s;

  &:hover {
    background-color: darkred;
  }
`;

const Profile = () => {
  const { state } = useAuth();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editSection, setEditSection] = useState(null);
  const [formData, setFormData] = useState(null);
  const [tempData, setTempData] = useState({});
  const [loading, setLoading] = useState(true);

  const username = state.user?.username; // Get logged-in username

  // Fetch user details
  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!username) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:3000/users?username=${username}`
        );

        const user = response.data[0];
        if (user) {
          setFormData(user);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [username]);

  if (loading) return <p>Loading...</p>;
  if (!formData) return <p>No user data found.</p>;

  // Open modal
  const openModal = (section) => {
    setEditSection(section);
    setTempData(formData[section] || {});
    setModalIsOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setModalIsOpen(false);
  };

  // Handle input change
  const handleChange = (e) => {
    setTempData({ ...tempData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = { ...formData, [editSection]: tempData };
    setFormData(updatedData);
    closeModal();

    try {
      await axios.put(
        `http://localhost:3000/users/${formData.id}`,
        updatedData,
        { headers: { "Content-Type": "application/json" } }
      );
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  // Handle delete account
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/users/${formData.id}`);
      alert("Account deleted successfully.");
    } catch (error) {
      console.error("Error deleting user account:", error);
    }
  };

  return (
    <Container>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Profile</h2>

      <Card>
        <CardHeader>
          Personal Info
          <EditButton onClick={() => openModal("personal")}>
            <FaEdit />
          </EditButton>
        </CardHeader>
        <p>
          <strong>Name:</strong> {formData.personal.name}
        </p>
        <p>
          <strong>Email:</strong> {formData.personal.email}
        </p>
        <p>
          <strong>Phone:</strong> {formData.personal.phone}
        </p>
        <p>
          <strong>DOB:</strong> {formData.personal.dob}
        </p>
        <p>
          <strong>Gender:</strong> {formData.personal.gender}
        </p>
      </Card>

      <Card>
        <CardHeader>
          Address (Permanent)
          <EditButton onClick={() => openModal("permanent")}>
            <FaEdit />
          </EditButton>
        </CardHeader>
        <p>
          {formData.permanent.street}, {formData.permanent.city},{" "}
          {formData.permanent.state}, {formData.permanent.country} -{" "}
          {formData.permanent.pin}
        </p>
      </Card>

      <Card>
        <CardHeader>
          Address (Current)
          <EditButton onClick={() => openModal("current")}>
            <FaEdit />
          </EditButton>
        </CardHeader>
        <p>
          {formData.current.street}, {formData.current.city},{" "}
          {formData.current.state}, {formData.current.country} -{" "}
          {formData.current.pin}
        </p>
      </Card>

      <Card>
        <CardHeader>
          Languages
          <EditButton onClick={() => openModal("languages")}>
            <FaEdit />
          </EditButton>
        </CardHeader>
        {formData.languages.map((lang, index) => (
          <p key={index}>
            {lang.name} (Read: {lang.read ? "Yes" : "No"}, Write:{" "}
            {lang.write ? "Yes" : "No"}, Speak: {lang.speak ? "Yes" : "No"})
          </p>
        ))}
      </Card>

      <DeleteButton onClick={handleDelete}>
        <FaTrash /> Delete Account
      </DeleteButton>

      {/* Profile Edit Modal */}
      <ProfileEditModal
        isOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        closeModal={closeModal}
        section={editSection}
        tempData={tempData}
        setTempData={setTempData}
        handleSubmit={handleSubmit}
      />
    </Container>
  );
};

export default Profile;
