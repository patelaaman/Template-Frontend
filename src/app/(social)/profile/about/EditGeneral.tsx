import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, Form, Row, Col, ButtonGroup } from 'react-bootstrap';
import { 
  FaUser, FaBuilding, FaGlobe, FaBriefcase, FaLightbulb, 
  FaUsers, FaSearch, FaHandshake, FaChartLine, FaUserTie,
  FaHistory, FaBullseye
} from 'react-icons/fa';
import { useAuthContext } from '@/context/useAuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LIVE_URL } from '@/utils/api';

const EditGeneral = () => {

const {id} = useParams()


  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await fetch(`${LIVE_URL}api/v1/general/get/${id}`);
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            const data = await response.json();
            setFormData(data);
        } catch (error) {
            console.error("Error fetching data:", error);
            toast.error("Failed to load details.");
        }
    };
    
    if (id) fetchData();
}, [id]);



  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    currentRole: '',
    companyName: '',
    location: '',
    businessType: '',
    areasOfExpertise: '',
    joiningReason: '',
    contentPreferences: [],
    collaborationInterest: '',
    businessStage: '',
    hasPartnerships: '',
    hasEntrepreneurialExperience: '',
    primaryGoals: ''
  });

  const [step, setStep] = useState(0);

  const sections = [
    { title: "Basic Information", icon: <FaUser /> },
    { title: "Business Details", icon: <FaBriefcase /> },
    { title: "Goals & Preferences", icon: <FaBullseye /> },
    { title: "Experience & Interests", icon: <FaLightbulb /> }
  ];

  const countries = [
    "United States", "United Kingdom", "Canada", "Australia", "Germany", 
    "France", "Spain", "Italy", "Japan", "China", "India", "Brazil", 
    // Add more countries as needed
  ];

  const handleInputChange = (name, value) => {
    if (name === 'contentPreferences') {
      let updatedPreferences = [...formData.contentPreferences];
      if (updatedPreferences.includes(value)) {
        updatedPreferences = updatedPreferences.filter(item => item !== value);
      } else {
        updatedPreferences.push(value);
      }
      setFormData(prev => ({
        ...prev,
        [name]: updatedPreferences
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };




  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
    
      if (!user?.id) {
        toast.error("User ID is missing. Please log in again.");
        return;
      }
    
      toast.success("Form submitted successfully!");
    
      try {
        const response1 = await fetch(`${LIVE_URL}api/v1/general/update/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...formData }),
        });
    
        if (!response1.ok) {
          throw new Error("Failed to submit business buyer data");
        }
    
      } catch (error) {
        console.error("Error in first request:", error);
        toast.error("An error occurred while submitting the form.");
      }
    };
  





  const handleSkip = () => navigate('/');

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <Card className="mb-4 shadow-sm">
            <Card.Header className="bg-white">
              <h5 className="mb-0">
                <FaUser className="me-2" />
                Basic Information
              </h5>
            </Card.Header>
            <Card.Body>
              <Form>
                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>
                      <FaUserTie className="me-2" />
                      What is your current role?
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.currentRole}
                      onChange={(e) => handleInputChange("currentRole", e.target.value)}
                      placeholder="e.g. Aspiring Entrepreneur, Investor"
                      required
                    />
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>
                      <FaBuilding className="me-2" />
                      Company Name (if applicable)
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => handleInputChange("companyName", e.target.value)}
                      placeholder="Enter company name or N/A"
                    />
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>
                      <FaGlobe className="me-2" />
                      Location
                    </Form.Label>
                    <Form.Select
                      value={formData.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                      required
                    >
                      <option value="">Select your country</option>
                      {countries.map((country, index) => (
                        <option key={index} value={country}>{country}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        );

      case 1:
        return (
          <Card className="mb-4 shadow-sm">
            <Card.Header className="bg-white">
              <h5 className="mb-0">
                <FaBriefcase className="me-2" />
                Business Details
              </h5>
            </Card.Header>
            <Card.Body>
              <Form>
                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>
                      <FaBriefcase className="me-2" />
                      What type of business do you operate?
                    </Form.Label>
                    <Form.Select
                      value={formData.businessType}
                      onChange={(e) => handleInputChange("businessType", e.target.value)}
                      required
                    >
                      <option value="">Select business type</option>
                      <option value="SaaS">SaaS</option>
                      <option value="Content">Content</option>
                      <option value="Marketplace">Marketplace</option>
                      <option value="Agency">Agency</option>
                      <option value="Mobile App">Mobile App</option>
                      <option value="Shopify App">Shopify App</option>
                      <option value="Main Street">Main Street</option>
                      <option value="Ecommerce">Ecommerce</option>
                      <option value="Other">Other</option>
                    </Form.Select>
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>
                      <FaLightbulb className="me-2" />
                      Areas of Expertise
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={formData.areasOfExpertise}
                      onChange={(e) => handleInputChange("areasOfExpertise", e.target.value)}
                      placeholder="Describe your business or industry expertise"
                      required
                    />
                  </Form.Group>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        );

      case 2:
        return (
          <Card className="mb-4 shadow-sm">
            <Card.Header className="bg-white">
              <h5 className="mb-0">
                <FaBullseye className="me-2" />
                Goals & Preferences
              </h5>
            </Card.Header>
            <Card.Body>
              <Form>
                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>
                      <FaSearch className="me-2" />
                      Why are you joining Businessroom?
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={formData.joiningReason}
                      onChange={(e) => handleInputChange("joiningReason", e.target.value)}
                      placeholder="Describe your goals for using the platform"
                      required
                    />
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>
                      <FaSearch className="me-2" />
                      What type of content would you like to explore?
                    </Form.Label>
                    <div>
                      {['Business ideas', 'Market trends', 'Networking opportunities'].map((option) => (
                        <Form.Check
                          key={option}
                          type="checkbox"
                          label={option}
                          checked={formData.contentPreferences.includes(option)}
                          onChange={() => handleInputChange("contentPreferences", option)}
                          className="mb-2"
                        />
                      ))}
                    </div>
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>
                      <FaHandshake className="me-2" />
                      Are you looking to collaborate on business projects?
                    </Form.Label>
                    <Form.Select
                      value={formData.collaborationInterest}
                      onChange={(e) => handleInputChange("collaborationInterest", e.target.value)}
                      required
                    >
                      <option value="">Select an option</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                      <option value="Maybe">Maybe</option>
                    </Form.Select>
                  </Form.Group>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        );

      case 3:
        return (
          <Card className="mb-4 shadow-sm">
            <Card.Header className="bg-white">
              <h5 className="mb-0">
                <FaLightbulb className="me-2" />
                Experience & Interests
              </h5>
            </Card.Header>
            <Card.Body>
              <Form>
                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>
                      <FaChartLine className="me-2" />
                      What stage is your business at?
                    </Form.Label>
                    <Form.Select
                      value={formData.businessStage}
                      onChange={(e) => handleInputChange("businessStage", e.target.value)}
                      required
                    >
                      <option value="">Select stage</option>
                      <option value="Idea stage">Idea stage</option>
                      <option value="Startup">Startup</option>
                      <option value="Growth">Growth</option>
                      <option value="Established">Established</option>
                    </Form.Select>
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>
                      <FaUsers className="me-2" />
                      Do you currently have any business partnerships?
                    </Form.Label>
                    <Form.Select
                      value={formData.hasPartnerships}
                      onChange={(e) => handleInputChange("hasPartnerships", e.target.value)}
                      required
                    >
                      <option value="">Select an option</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </Form.Select>
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>
                      <FaHistory className="me-2" />
                      Do you have any previous entrepreneurial experience?
                    </Form.Label>
                    <Form.Select
                      value={formData.hasEntrepreneurialExperience}
                      onChange={(e) => handleInputChange("hasEntrepreneurialExperience", e.target.value)}
                      required
                    >
                      <option value="">Select an option</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </Form.Select>
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>
                      <FaBullseye className="me-2" />
                      What's your primary goal on Businessroom?
                    </Form.Label>
                    <Form.Select
                      value={formData.primaryGoals}
                      onChange={(e) => handleInputChange("primaryGoals", e.target.value)}
                      required
                    >
                      <option value="">Select your main goal</option>
                      <option value="Find investors">Find investors</option>
                      <option value="Discover new business">Discover new business</option>
                      <option value="Network">Network</option>
                      <option value="Learn">Learn</option>
                    </Form.Select>
                  </Form.Group>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4 text-center">Complete Your Profile</h2>
      
      <div className="mb-4">
        <div className="d-flex justify-content-center align-items-center bg-white rounded-3 p-3 shadow-sm">
          {sections.map((section, index) => (
            <div
              key={index}
              onClick={() => setStep(index)}
              className={`flex-grow-1 text-center py-3 px-3 rounded-3 mx-2 tab-item ${
                step === index
                  ? 'bg-primary text-white'
                  : step > index
                  ? 'bg-light text-primary cursor-pointer'
                  : 'text-muted'
              }`}
              style={{ 
                cursor: index <= step ? 'pointer' : 'pointer',
                transition: 'all 0.3s ease',
                minWidth: '200px'
              }}
            >
              <div className="d-flex flex-column align-items-center justify-content-center">
                {section.icon}
                <span className="mt-2 fw-semibold">{section.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {renderStep()}

      <div className="d-flex justify-content-between mt-4">
        <div>
          <button
            className="btn btn-secondary me-2"
            onClick={() => navigate("/settings/account")}
          >
            Back
          </button>
          <button
            className="btn btn-outline-danger"
            onClick={handleSkip}
          >
            Skip
          </button>
        </div>
        
        <div>
          <ButtonGroup>
            {step > 0 && (
              <button
                className="btn btn-secondary"
                onClick={() => setStep(step - 1)}
              >
                Previous
              </button>
            )}
            
            {step < sections.length - 1 ? (
              <button
                className="btn btn-primary"
                onClick={() => setStep(step + 1)}
              >
                Next
              </button>
            ) : (
              <button
                className="btn btn-success"
                onClick={handleSubmit}
              >
                Submit
              </button>
            )}
          </ButtonGroup>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default EditGeneral;