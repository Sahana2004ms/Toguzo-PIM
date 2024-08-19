import "../Pages/HomePage.css";
import React, { useState, useEffect } from 'react';
import Cancel from "../assets/Images/Orders/Cancel.svg";
import CameraIcon from "../assets/Images/Orders/CameraIcon.svg";
import PhoneIcon from "../assets/Images/Orders/PhoneIcon.svg";
import Verified from "../assets/Images/Orders/Verified.svg";
import MailIcon from "../assets/Images/Orders/MailIcon.svg";

const ProfilePopup = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEdited, setIsEdited] = useState(false); // State to track if any field has been edited
  const [phoneError, setPhoneError] = useState(''); // State for phone number validation error
  const [emailError, setEmailError] = useState(''); // State for email validation error

  // Function to generate initials from the username
  const getInitials = (username) => {
    const nameParts = username.trim().split(/\s+/);
    let initials = '';
    for (let part of nameParts) {
      if (part) {
        initials += part[0].toUpperCase();
      }
      if (initials.length === 2) {
        break;
      }
    }
    return initials;
  };

  // Validate phone number
  const validatePhoneNumber = (number) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(number);
  };

  // Validate email address
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle phone number change
  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  // Handle email change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // Validate phone number on blur
  const handlePhoneBlur = () => {
    if (phone && !validatePhoneNumber(phone)) {
      setPhoneError('Number not valid');
    } else {
      setPhoneError('');
    }
  };

  // Validate email address on blur
  const handleEmailBlur = () => {
    if (email && !validateEmail(email)) {
      setEmailError('Email not valid');
    } else {
      setEmailError('');
    }
  };

  // Validate fields before saving changes
  const handleSaveChanges = () => {
    const isPhoneValid = validatePhoneNumber(phone);
    const isEmailValid = validateEmail(email);

    if (isPhoneValid && isEmailValid) {
      setPhoneError('');
      setEmailError('');
      // Proceed with save logic
      console.log('Changes saved');
      onClose(); // Assuming you want to close the popup after saving
    } else {
      if (!isPhoneValid) setPhoneError('Number not valid');
      if (!isEmailValid) setEmailError('Email not valid');
    }
  };

  // Check if any fields have been edited
  useEffect(() => {
    if (username || phone || email) {
      setIsEdited(true);
    } else {
      setIsEdited(false);
    }
  }, [username, phone, email]);

  return (
    <>
      {isOpen && (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(99, 103, 103, 0.60)', zIndex: 999,}}
          onClick={onClose}
        ></div>
      )}
      <div className={`popup ${isOpen ? 'open' : ''}`}>
        <div style={{ height: 50, backgroundColor: "white", display: "flex", alignItems: "center", justifyContent: "space-between", borderRadius: 8 }}>
          <p style={{ fontSize: 18, paddingLeft: 24, fontFamily: "Nunito-Bold" }}>Profile</p>
          <img src={Cancel} alt='Cancel' onClick={onClose} style={{ paddingRight: 16 }} />
        </div>
        <div style={{ height: 598, backgroundColor: "white", marginTop: 20, borderRadius: 8, padding: 20 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ height: 120, width: 120, backgroundColor: "#B2DDFF", borderRadius: 100, marginBottom: 50, textAlign: "center" }}>
              <p style={{ fontFamily: "Nunito-Bold", fontSize: 36, color: "#026AA2" }}>
                {getInitials(username) || 'M'}
              </p>
              <img src={CameraIcon} style={{ display: 'flex', position: "relative", left: 80, bottom: 40 }} />
            </div>
          </div>
          <div>
            <label className='Label'>Name</label>
          </div>
          <input
            className='Input'
            type="text"
            placeholder="Mahesh"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <div>
            <div className="label-container" style={{ display: 'flex', alignItems: 'center', marginTop: 24, justifyContent: "space-between", marginBottom: 6 }}>
              <label className="label">Phone number</label>
              <label style={{ width: 73, height: 20, backgroundColor: "#E8FDF3", fontSize: 12, display: "flex", marginRight: 5, alignItems: "center", color: "#12B76A", paddingLeft: 6, borderRadius: 16 }}>
                <img src={Verified} style={{ marginRight: 4 }} />Verified
              </label>
            </div>
            <div className="input-container">
              <img src={PhoneIcon} alt="Phone Icon" className="phone-icon" />
              <input
                className='InputP'
                type="text"
                placeholder="9356767168"
                value={phone}
                onChange={handlePhoneChange}
                onBlur={handlePhoneBlur}
                disabled={!isEditingPhone}
                style={{ 
                  marginLeft: 3,
                  borderColor: phoneError ? 'red' : '#ccc', // Conditional border color
                  borderWidth: 1,
                  borderRadius: 4,
                }}
              />
              <button className="edit-button" onClick={() => setIsEditingPhone(!isEditingPhone)}>
                Edit
              </button>
            </div>
            {phoneError && <p style={{ fontSize: 14, color: '#F04438', fontFamily: "Nunito-Medium", marginTop: 6, padding: 0 }}>{phoneError}</p>}
          </div>

          <div>
            <div className="label-container" style={{ display: 'flex', alignItems: 'center', marginTop: 24, justifyContent: "space-between", marginBottom: 6 }}>
              <label className="label">Email</label>
              <label style={{ width: 73, height: 20, backgroundColor: "#E8FDF3", fontSize: 12, display: "flex", marginRight: 5, alignItems: "center", color: "#12B76A", paddingLeft: 6, borderRadius: 16 }}>
                <img src={Verified} style={{ marginRight: 4 }} />Verified
              </label>
            </div>
            <div className="input-container">
              <img src={MailIcon} alt="Mail Icon" className="phone-icon" />
              <input
                className='InputP'
                type="text"
                placeholder="Mahesh@gmail.com"
                value={email}
                onChange={handleEmailChange}
                onBlur={handleEmailBlur}
                disabled={!isEditingEmail}
                style={{ 
                  marginLeft: 4,
                  borderColor: emailError ? 'red' : '#ccc', // Conditional border color
                  borderWidth: 1,
                  borderRadius: 4,
                }}
              />
              <button className="edit-button" onClick={() => setIsEditingEmail(!isEditingEmail)}>
                Edit
              </button>
            </div>
            {emailError && <p style={{ fontSize: 14, color: '#F04438', fontFamily: "Nunito-Medium", marginTop: 6, padding: 0 }}>{emailError}</p>}
          </div>

          <button
            onClick={handleSaveChanges}
            style={{
              backgroundColor: isEdited ? "#347B72" : "#F2F3F3",
              width: "100%",
              color: isEdited ? "white" : "#B1B4B4",
              marginTop: 35,
              fontFamily: "Nunito-SemiBold",
              fontSize: 18,
              outline: "none",
              cursor: isEdited ? "pointer" : "not-allowed",
            }}
            disabled={!isEdited}
          >
            Save Changes
          </button>
        </div>
      </div>
    </>
  );
};

export default ProfilePopup;
