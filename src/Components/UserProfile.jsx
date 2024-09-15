import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form"; // You can add validation for the form if needed

// Custom styles for Modal (You can style it as per your requirement)
Modal.setAppElement("#root");

export const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false); // State for enabling edit mode
  const [showPasswordModal, setShowPasswordModal] = useState(false); // State for showing/hiding the password change modal

  const [name, setName] = useState(""); // State for name
  const [email, setEmail] = useState(""); // State for email
  const [password, setPassword] = useState(""); // State for password (this will not be displayed in plain text)

  // Autofill data from localStorage when the component loads
  useEffect(() => {
    setName(localStorage.getItem("username") || "");
    setEmail(localStorage.getItem("useremail") || "");
    setPassword(localStorage.getItem("userpassword") || "");
  }, []);

  // Enable/Disable Edit Mode
  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  // Handle form submission (Update Profile)
  const handleSubmit = (e) => {
    e.preventDefault();
    // Store the updated data in localStorage (or you can send to API)
    localStorage.setItem("username", name);
    localStorage.setItem("useremail", email);
    localStorage.setItem("userpassword", password); // Only update if password is changed
    setIsEditing(false); // Disable edit mode after saving
  };

  // Handle Password Change Modal
  const openPasswordModal = () => {
    setShowPasswordModal(true);
  };

  const closePasswordModal = () => {
    setShowPasswordModal(false);
  };

  // Handle Password Change Form Submission
  const handlePasswordChange = (e) => {
    e.preventDefault();
    // Here, you would typically handle password update logic
    alert("Password updated successfully!");
    closePasswordModal(); // Close the modal after updating the password
  };

  return (
    <div className="flex flex-col items-center mt-12">
      <h1 className="text-2xl mb-5">Account Details</h1>
      <form
        onSubmit={handleSubmit}
        className="w-72 p-4 border border-gray-300 rounded-lg"
      >
        <div className="flex justify-end">
          <button
            type="button"
            className="bg-red-600 text-white rounded-lg px-4 py-1"
            onClick={handleEdit}
          >
            {isEditing ? "Cancel" : "Edit"}
          </button>
        </div>
        <div className="mt-4">
          <label>Profile Picture</label>
          <input type="file" className="w-full" disabled={!isEditing} />
        </div>
        <div className="mt-4">
          <label>Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            disabled={!isEditing}
          />
        </div>
        <div className="mt-4">
          <label>Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            disabled={!isEditing}
          />
        </div>
        <div className="mt-4">
          <label>Password</label>
          <input
            type="password"
            value="**********"
            className="w-full p-2 border border-gray-300 rounded-lg cursor-pointer"
            disabled={!isEditing}
            onClick={openPasswordModal} // Opens the modal for changing password
          />
        </div>
        {isEditing && (
          <button
            type="submit"
            className="w-full bg-red-600 text-white p-2 mt-5 rounded-lg"
          >
            Save
          </button>
        )}
      </form>

      {/* Password Change Modal */}
      <Modal
        isOpen={showPasswordModal}
        onRequestClose={closePasswordModal}
        contentLabel="Change Password Modal"
        className="flex items-center justify-center p-4"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
          <h2 className="text-xl font-semibold mb-4">Change Password</h2>
          <form onSubmit={handlePasswordChange}>
            <div className="mt-4">
              <label className="block text-sm font-medium">
                Current Password
              </label>
              <input
                type="password"
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium">New Password</label>
              <input
                type="password"
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-red-600 text-white p-2 mt-5 rounded-lg"
            >
              Save
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default UserProfile;
