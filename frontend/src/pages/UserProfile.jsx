import React, { useEffect, useState, useRef } from 'react';
import { Button, Form, Container, Row, Col, Image, Badge, Modal } from 'react-bootstrap';
import { FaTimes } from 'react-icons/fa';
import { GET, POST } from '../api';
import { toast } from "react-hot-toast";
import ResetPassword from '../components/ResetPassword';


const UserProfile = () => {
  const [firstName, setFirstName] = useState('');
  const [userName, setUserName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [email, setEmail] = useState('');
  const [topics, setTopics] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await GET('/api/user/userprofile/get');
        // Assuming response contains the user profile data
        console.log('User Profile:', response.data);

        if (response.data.success === false) {
          console.log('Error:', response.data.message);
          return;
        }

        const { username, firstName, lastName, age, phoneNo, email, topics } = response.data.user;
        setUserName(username);
        setFirstName(firstName);
        setLastName(lastName);
        setAge(age);
        setPhoneNo(phoneNo);
        setEmail(email);
        setTopics(topics);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserProfile();
  }, []); // Add empty dependency array to run effect only once

  const handleAddTopic = () => {
    if (inputValue.trim() !== '') {
      setTopics([...topics, inputValue.trim()]);
      setInputValue('');
      inputRef.current.focus(); // Keep the cursor in the text field
    }
  };

  const handleRemoveTopic = (index) => {
    const newTopics = topics.filter((_, i) => i !== index);
    setTopics(newTopics);
  };

  const handleUpdateProfile = async () => {
    // Print all text field values in the console

    const updatedData = {
      username: userName,
      firstName,
      lastName,
      age,
      phoneNo,
      email,
      topics,
    };

    const response = await POST('/api/user/userprofile/update', updatedData);
    console.log('Response:', response);
    toast.success("Profile updated successfully");
  };

  const [showModal, setShowModal] = useState(false); 

  const handleChangePassword = async (e) => {
    e.preventDefault();
    // Handle password change logic here (e.g., send email)
    toast.success("Password change link sent!");
    setShowModal(false); // Close the modal after submission
  };


  return (
    <>
      <style>{`
        .container {
          box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
        }

        .form-control {
          border-radius: 5px;
        }

        button {
          border-radius: 50px;
          padding: 10px 40px;
          background-color: #007bff;
          color: white;
        }

        button:hover {
          background-color: #0056b3;
        }
      `}</style>

      <div className="text-center mb-4">
        <Image
          src="https://1.bp.blogspot.com/-4XH4gYWBqkc/X_fjW3OyqKI/AAAAAAAAFaY/Tg3RZ4lICOIwmliLKBcGkVSkpk0hdH-wwCLcBGAsYHQ/s1200/News.jpg"
          roundedCircle
          alt="Profile"
          style={{ width: '150px', height: '150px', objectFit: 'cover' }}
        />
      </div>

      <Container>
        <Form>
          <Form.Group controlId="formFirstName">
            <Form.Label>User Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter User name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </Form.Group>

          <Row>
            <Col>
              <Form.Group controlId="formFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formAge">
                <Form.Label>Age</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>


          <Row>
            <Col>
              <Form.Group controlId="formLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Form.Group>
            </Col>

            <Col>
              <Form.Group controlId="formPhone">
                <Form.Label>Phone No.</Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="Enter phone number"
                  value={phoneNo}
                  onChange={(e) => setPhoneNo(e.target.value)}
                />
              </Form.Group>

            </Col>
          </Row>


          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              readOnly
            />
          </Form.Group>

          <Form.Group controlId="formTopics" className="mt-3">
            <Form.Label>Topics</Form.Label>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Form.Control
                type="text"
                placeholder="Enter topics of interest"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                ref={inputRef}
                style={{ flex: 1 }}
              />
              <Button variant="primary" onClick={handleAddTopic} style={{ marginLeft: '10px' }}>
                Add
              </Button>
            </div>
            <div className="mt-2">
              {topics?.map((topic, index) => (
                <Badge key={index} pill variant="secondary" style={{ marginRight: '5px', marginBottom: '5px' }}>
                  {topic} <FaTimes onClick={() => handleRemoveTopic(index)} style={{ cursor: 'pointer' }} />
                </Badge>
              ))}
            </div>
          </Form.Group>

          
          <div className="text-center mt-4">
            <Button variant="success" onClick={handleUpdateProfile}>Update Profile</Button>
          </div>


          <div className="text-center mt-4">
            <Button variant="primary" onClick={() => setShowModal(true)}>Change Password</Button>
          </div>


          <Modal show={showModal} onHide={() => setShowModal(false)} centered>
              <ResetPassword />
          </Modal>

          {/* <Modal show={showModal} onHide={() => setShowModal(false)} centered>
            <Modal.Header closeButton>
              <Modal.Title>Forgot Password</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '20px',
                  backgroundColor: '#f9f9f9',
                  borderRadius: '10px',
                }}
              >
                <form
                  style={{
                    width: '100%',
                    maxWidth: '400px',
                    padding: '20px',
                    backgroundColor: '#fff',
                    borderRadius: '8px',
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                  }}
                  onSubmit={handleChangePassword}
                >
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      marginBottom: '20px',
                    }}
                  >
                    <label
                      htmlFor="email"
                      style={{
                        marginBottom: '8px',
                        fontSize: '1rem',
                        color: '#333',
                      }}
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Enter your email"
                      required
                      style={{
                        padding: '10px',
                        border: '1px solid #ddd',
                        borderRadius: '5px',
                        fontSize: '1rem',
                        transition: 'border-color 0.3s ease',
                      }}
                    />
                  </div>
                  <button
                    type="submit"
                    style={{
                      width: '100%',
                      padding: '12px',
                      backgroundColor: '#007bff',
                      border: 'none',
                      color: 'white',
                      fontSize: '1rem',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      transition: 'background-color 0.3s ease',
                    }}
                    onMouseOver={(e) => (e.target.style.backgroundColor = '#0056b3')}
                    onMouseOut={(e) => (e.target.style.backgroundColor = '#007bff')}
                  >
                    Send Email
                  </button>
                </form>
                <p
                  style={{
                    marginTop: '20px',
                    textAlign: 'center',
                    fontSize: '0.9rem',
                    color: '#666',
                  }}
                >
                  Don't have an account?
                  <a
                    href="#"
                    style={{
                      color: '#007bff',
                      textDecoration: 'none',
                      marginLeft: '5px',
                      transition: 'color 0.3s ease',
                    }}
                    onMouseOver={(e) => (e.target.style.color = '#0056b3')}
                    onMouseOut={(e) => (e.target.style.color = '#007bff')}
                  >
                    Sign up now
                  </a>
                </p>
              </div>
            </Modal.Body>
          </Modal> */}




        </Form>
      </Container>
    </>
  );
};

export default UserProfile;
