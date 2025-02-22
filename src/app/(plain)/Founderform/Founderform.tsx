// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Form, Card, Row, Col, InputGroup, Button, ButtonGroup } from "react-bootstrap";
// import { FaRegLightbulb, FaGlobe, FaCity, FaClock, FaIndustry, FaBalanceScale, FaExchangeAlt, FaTasks, FaExclamationTriangle, FaHandsHelping, FaInfoCircle } from "react-icons/fa";
// import { FaBullseye, FaDollarSign, FaFlagCheckered, FaHandshake, FaPeopleArrows, FaRoad, FaUserTie } from "react-icons/fa6";
// import { useContext } from 'react';
// import { useAuthContext } from '@/context/useAuthContext';
// import {ToastContainer , toast} from "react-toastify"
// import 'react-toastify/dist/ReactToastify.css';
// import { LIVE_URL } from "@/utils/api";
// const Founderforms = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     businessName: "",
//     businessLocationCountry: "",
//     businessLocationCity: "",
//     businessIdea: "",
//     businessStage: "",
//     industrySector: "",
//     businessDuration: "",
//     problemSolving: "",
//     traction: "",
//     investorType: "",
//     fundingAmount: "",
//     useOfFunds: "",
//     investmentType: "",
//     businessValuation: "",
//     equityInExchange: "",
//     exitPlans: "",
//     partnerType: "",
//     partnerSkills: "",
//     partnerInvolvement: "",
//     partnerEquityCompensation: "",
//     partnershipStructure: "",
//     businessChallenges: "",
//     keyPriorities: "",
//     supportNeeded: "",
//     businessPlanStatus: "",
//     milestones: "",
//     longTermGoals: "",
//     additionalInfo: "",
//   });

//   const [currentSection, setCurrentSection] = useState(0);
// const{user} = useAuthContext()

//   const sections = [
//     "Business Information",
//     "Investor Preferences",
//     "Business Partner Preferences",
//     "Business Needs & Goals",
//     "Additional Information",
//   ];

//   const handleInputChange = (name, value) => {
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//       UserId : user?.id
//     }));
//   };

// const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
  
//     if (!user?.id) {
//       toast.error("User ID is missing. Please log in again.");
//       return;
//     }
  
//     toast.success("Form submitted successfully!");
  
//     try {
//       const response1 = await fetch(`http://13.216.146.100/api/v1/entrepreneur/create`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ ...formData }),
//       });
  
//       if (!response1.ok) {
//         throw new Error("Failed to submit business buyer data");
//       }
  
//       try {
//         const response2 = await fetch(`http://13.216.146.100/api/v1/subrole/create`, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             UserId: user?.id,
//             SubRole: "Founder"
//           }),
//         });
  
//         if (!response2.ok) {
//           throw new Error("Failed to submit subrole data");
//         }
  
//         navigate('/');
//       } catch (error) {
//         console.error("Error in second request:", error);
//         toast.error("An error occurred while submitting the subrole data.");
//       }
  
//     } catch (error) {
//       console.error("Error in first request:", error);
//       toast.error("An error occurred while submitting the form.");
//     }
//   };

//   const handleSkip = () => {
//     navigate("/");
//   };

//   const renderSection = () => {
//     switch (currentSection) {
//       case 0:
//         return (
//           <Card className="mb-4 shadow-sm">
//           <Card.Header style={{ backgroundColor: '', color: 'white' }}>
//   <h5 className="fs-4">
//     <FaRegLightbulb className="me-2 " />
//     Business Information
//   </h5>
// </Card.Header>

//             <Card.Body>
//               <ToastContainer></ToastContainer>
//               <Form>
//                 <Row className="mb-3">
//                   <Form.Group as={Col} controlId="businessName">
//                     <Form.Label className="fs-6" > {/* Increased font size */}
//                       What is the name of your business?
//                     </Form.Label>
//                     <Form.Control
//                       type="text"
//                       placeholder="Enter your business name"
//                       value={formData.businessName}
//                       onChange={(e) => handleInputChange("businessName", e.target.value)}
//                       required
//                       style={{ backgroundColor: 'transparent', border: '1px solid #ccc' }}
//                     />
//                   </Form.Group>
//                 </Row>
//                 <Row className="mb-3">
//   <Form.Group as={Col} controlId="businessLocationCountry">
//     <Form.Label className="fs-6"> {/* Increased font size */}
//       <FaGlobe className="me-2" />
//       Where is your business located?
//     </Form.Label>
//     <Form.Select
//       style={{ backgroundColor: 'transparent', border: '1px solid #ccc' }}
//       value={formData.businessLocationCountry}
//       onChange={(e) => handleInputChange("businessLocationCountry", e.target.value)}
//       required
//     >
//       <option value="">Select Country</option>
//       <option value="USA">USA</option>
//       <option value="Canada">Canada</option>
//       <option value="UK">UK</option>
//       <option value="India">India</option>
//       <option value="Other">Other</option>
//     </Form.Select>
//   </Form.Group>

//   <Form.Group as={Col} controlId="businessLocationCity">
//     <Form.Label className="fs-6"> {/* Increased font size */}
//       <FaCity className="me-2" />
//       City
//     </Form.Label>
//     <Form.Control
//       type="text"
//       placeholder="Enter city"
//       value={formData.businessLocationCity}
//       onChange={(e) => {
//         const input = e.target.value;
//         if (/^[A-Za-z\s]*$/.test(input)) {
//           handleInputChange("businessLocationCity", input);
//         }
//       }}
//     />
//   </Form.Group>
// </Row>

//                 <Row className="mb-3">
//                   <Form.Group controlId="businessIdea">
//                     <Form.Label className="fs-6"> {/* Increased font size */}
//                       <FaRegLightbulb className="me-2" />
//                       What is your business idea about?
//                     </Form.Label>
//                     <Form.Control
//                       as="textarea"
//                       rows={3}
//                       placeholder="Describe your business idea"
//                       value={formData.businessIdea}
//                       onChange={(e) => handleInputChange("businessIdea", e.target.value)}
//                       required
//                     />
//                   </Form.Group>
//                 </Row>
//                 <Row className="mb-3">
//                   <Form.Group as={Col} controlId="businessStage">
//                     <Form.Label className="fs-6"> {/* Increased font size */}
//                       What stage is your business currently at?
//                     </Form.Label>
//                     <Form.Select
//                     style={{ backgroundColor: 'transparent', border: '1px solid #ccc' }}
//                       value={formData.businessStage}
//                       onChange={(e) => handleInputChange("businessStage", e.target.value)}
//                       required
//                     >
//                       <option value="">Select</option>
//                       <option value="Idea/Concept">Idea/Concept</option>
//                       <option value="Prototype">Prototype</option>
//                       <option value="Pre-revenue">Pre-revenue</option>
//                       <option value="Revenue-generating">Revenue-generating</option>
//                       <option value="Growth">Growth</option>
//                       <option value="Scaling">Scaling</option>
//                     </Form.Select>
//                   </Form.Group>
//                   <Form.Group as={Col} controlId="industrySector">
//                     <Form.Label className="fs-6"> {/* Increased font size */}
//                       <FaIndustry className="me-2" />
//                       What is the industry/sector of your business?
//                     </Form.Label>
//                     <Form.Select
//                     style={{ backgroundColor: 'transparent', border: '1px solid #ccc' }}
//                       value={formData.industrySector}
//                       onChange={(e) => handleInputChange("industrySector", e.target.value)}
//                       required
//                     >
//                       <option value="">Select</option>
//                       <option value="SaaS">SaaS</option>
//                       <option value="Content">Content</option>
//                       <option value="Marketplace">Marketplace</option>
//                       <option value="Agency">Agency</option>
//                       <option value="Mobile App">Mobile App</option>
//                       <option value="Shopify App">Shopify App</option>
//                       <option value="Main Street">Main Street</option>
//                       <option value="Ecommerce">Ecommerce</option>
//                       <option value="Other">Other</option>
//                     </Form.Select>
//                   </Form.Group>
//                 </Row>
//                 <Row className="mb-3">
//                   <Form.Group as={Col} controlId="businessDuration">
//                     <Form.Label className="fs-6"> {/* Increased font size */}
//                       <FaClock className="me-2" />
//                       How long has your business been operating?
//                     </Form.Label>
//                     <Form.Select
//                     style={{ backgroundColor: 'transparent', border: '1px solid #ccc' }}
//                       value={formData.businessDuration}
//                       onChange={(e) => handleInputChange("businessDuration", e.target.value)}
//                       required
//                     >
//                       <option value="">Select</option>
//                       <option value="Less than 6 months">Less than 6 months</option>
//                       <option value="6-12 months">6-12 months</option>
//                       <option value="1-2 years">1-2 years</option>
//                       <option value="2+ years">2+ years</option>
//                     </Form.Select>
//                   </Form.Group>
//                 </Row>
//                 <Row className="mb-3">
//                   <Form.Group controlId="problemSolving">
//                     <Form.Label className="fs-6"> {/* Increased font size */}
//                       What problem does your business solve, and who is your target audience?
//                     </Form.Label>
//                     <Form.Control
//                       as="textarea"
//                       rows={3}
//                       placeholder="Describe the problem and target audience"
//                       value={formData.problemSolving}
//                       onChange={(e) => handleInputChange("problemSolving", e.target.value)}
//                       required
//                     />
//                   </Form.Group>
//                 </Row>
//                 <Row className="mb-3">
//                   <Form.Group controlId="traction">
//                     <Form.Label className="fs-6"> {/* Increased font size */}
//                       Do you have any traction?
//                     </Form.Label>
//                     <Form.Select
//                     style={{ backgroundColor: 'transparent', border: '1px solid #ccc' }}
//                       value={formData.traction}
//                       onChange={(e) => handleInputChange("traction", e.target.value)}
//                       required
//                     >
//                       <option value="">Select</option>
//                       <option value="Yes">Yes</option>
//                       <option value="No">No</option>
//                     </Form.Select>
//                   </Form.Group>
//                 </Row>
//               </Form>
//             </Card.Body>
//           </Card>
//         );
//       case 1:
//             return (
//       <Card className="mb-4 shadow-sm">
//            <Card.Header style={{ backgroundColor: '', color: 'white' }}>
//   <h5 className="fs-4">
//     <FaRegLightbulb className="me-2 " />
//     Investor Preferences
//   </h5>
// </Card.Header>
//         <Card.Body>
//           <Form>
//             <Row className="mb-3">
//               <Form.Group as={Col} controlId="investorType">
//                 <Form.Label className="fs-6"> {/* Increased font size */}
//                   <FaRegLightbulb className="me-2" />
//                   What type of investor are you looking for?
//                 </Form.Label>
//                 <Form.Select
//                 style={{ backgroundColor: 'transparent', border: '1px solid #ccc' }}
//                   value={formData.investorType}
//                   onChange={(e) => handleInputChange("investorType", e.target.value)}
//                   required
//                 >
//                   <option value="">Select</option>
//                   <option value="Micro Investor">Micro Investor</option>
//                   <option value="Angel Investor">Angel Investor</option>
//                   <option value="Venture Capital">Venture Capital</option>
//                   <option value="Strategic Investor">Strategic Investor</option>
//                   <option value="Other">Other</option>
//                 </Form.Select>
//               </Form.Group>
//             </Row>
//             <Row className="mb-3">
//               <Form.Group as={Col} controlId="fundingAmount">
//                 <Form.Label className="fs-6"> {/* Increased font size */}
//                   <FaGlobe className="me-2" />
//                   What is the amount of funding you are seeking?
//                 </Form.Label>
//                 <Form.Select
//                 style={{ backgroundColor: 'transparent', border: '1px solid #ccc' }}
//                   value={formData.fundingAmount}
//                   onChange={(e) => handleInputChange("fundingAmount", e.target.value)}
//                   required
//                 >
//                   <option value="">Select</option>
//                   <option value="Under $50k">Under $50k</option>
//                   <option value="$50k - $200k">$50k - $200k</option>
//                   <option value="$200k - $500k">$200k - $500k</option>
//                   <option value="$500k - $1M">$500k - $1M</option>
//                   <option value="Over $1M">Over $1M</option>
//                 </Form.Select>
//               </Form.Group>
//             </Row>
//             <Row className="mb-3">
//               <Form.Group controlId="useOfFunds">
//                 <Form.Label className="fs-6"> {/* Increased font size */}
//                   <FaCity className="me-2" />
//                   What is the intended use of the investment funds?
//                 </Form.Label>
//                 <Form.Select
//                 style={{ backgroundColor: 'transparent', border: '1px solid #ccc' }}
//                   value={formData.useOfFunds}
//                   onChange={(e) => handleInputChange("useOfFunds", e.target.value)}
//                   required
//                 >
//                   <option value="">Select</option>
//                   <option value="Product Development">Product Development</option>
//                   <option value="Marketing & Sales">Marketing & Sales</option>
//                   <option value="Hiring">Hiring</option>
//                   <option value="Scaling Operations">Scaling Operations</option>
//                   <option value="Technology Infrastructure">Technology Infrastructure</option>
//                   <option value="Other">Other</option>
//                 </Form.Select>
//               </Form.Group>
//             </Row>
//             <Row className="mb-3">
//               <Form.Group as={Col} controlId="investmentType">
//                 <Form.Label className="fs-6"> {/* Increased font size */}
//                   <FaClock className="me-2" />
//                   What type of investment are you open to?
//                 </Form.Label>
//                 <Form.Select
//                 style={{ backgroundColor: 'transparent', border: '1px solid #ccc' }}
//                   value={formData.investmentType}
//                   onChange={(e) => handleInputChange("investmentType", e.target.value)}
//                   required
//                 >
//                   <option value="">Select</option>
//                   <option value="Equity">Equity</option>
//                   <option value="Convertible Notes">Convertible Notes</option>
//                   <option value="SAFE Notes">SAFE Notes</option>
//                   <option value="Debt">Debt</option>
//                   <option value="Other">Other</option>
//                 </Form.Select>
//               </Form.Group>
//             </Row>
//             <Row className="mb-3">
//               <Form.Group as={Col} controlId="businessValuation">
//                 <Form.Label className="fs-6"> {/* Increased font size */}
//                   <FaIndustry className="me-2" />
//                   What is the current valuation of your business (if applicable)?
//                 </Form.Label>
//                 <InputGroup>
//                   <InputGroup.Text>$</InputGroup.Text>
//                   <Form.Control
//                     type="text"
//                     placeholder="Enter valuation"
//                     value={formData.businessValuation}
//                     onChange={(e) =>
//                       handleInputChange("businessValuation", e.target.value)
//                     }
//                   />
//                 </InputGroup>
//               </Form.Group>
//             </Row>
//             <Row className="mb-3">
//               <Form.Group as={Col} controlId="equityInExchange">
//                 <Form.Label className="fs-6"> {/* Increased font size */}
//                   <FaRegLightbulb className="me-2" />
//                   Are you open to giving equity in exchange for investment?
//                 </Form.Label>
//                 <Form.Select
//                 style={{ backgroundColor: 'transparent', border: '1px solid #ccc' }}
//                   value={formData.equityInExchange}
//                   onChange={(e) =>
//                     handleInputChange("equityInExchange", e.target.value)
//                   }
//                   required
//                 >
//                   <option value="">Select</option>
//                   <option value="Yes">Yes</option>
//                   <option value="No">No</option>
//                   <option value="Negotiable">Negotiable</option>
//                 </Form.Select>
//               </Form.Group>
//             </Row>
//             <Row className="mb-3">
//               <Form.Group controlId="exitPlans">
//                 <Form.Label className="fs-6"> {/* Increased font size */}
//                   <FaClock className="me-2" />
//                   What are your exit plans or expected timeline for exit?
//                 </Form.Label>
//                 <Form.Control
//                   as="textarea"
//                   rows={3}
//                   placeholder="Describe your exit plans"
//                   value={formData.exitPlans}
//                   onChange={(e) =>
//                     handleInputChange("exitPlans", e.target.value)
//                   }
//                   required
//                 />
//               </Form.Group>
//             </Row>
//           </Form>
//         </Card.Body>
//       </Card>
//           );
//       case 2:
//     return (
//       <Card className="mb-4 shadow-sm">
//         <Card.Header style={{ backgroundColor: '', color: 'white' }}>
//   <h5 className="fs-4">
//     <FaRegLightbulb className="me-2 " />
//       Business Partner Preferences
//   </h5>
// </Card.Header>
          

//         <Card.Body>
//           <Form>
//             {/* Partner Type */}
//             <Row className="mb-3">
//               <Form.Group as={Col} controlId="partnerType">
//                 <Form.Label className="fs-6"> {/* Consistent font size */}
//                   <FaUserTie className="me-2" />
//                   What type of business partners are you looking for?
//                 </Form.Label>
//                 <Form.Select
//                 style={{ backgroundColor: 'transparent', border: '1px solid #ccc' }}
//                   value={formData.partnerType}
//                   onChange={(e) => handleInputChange("partnerType", e.target.value)}
//                   required
//                 >
//                   <option value="">Select</option>
//                   <option value="Co-founder">Co-founder</option>
//                   <option value="Strategic Partner">Strategic Partner</option>
//                   <option value="Technical Co-founder">Technical Co-founder</option>
//                   <option value="Sales/Marketing Expert">Sales/Marketing Expert</option>
//                   <option value="Operations Expert">Operations Expert</option>
//                   <option value="Mentor">Mentor</option>
//                   <option value="Advisor">Advisor</option>
//                 </Form.Select>
//               </Form.Group>
//             </Row>

//             {/* Partner Skills */}
//             <Row className="mb-3">
//               <Form.Group as={Col} controlId="partnerSkills">
//                 <Form.Label className="fs-6"> {/* Consistent font size */}
//                   <FaPeopleArrows className="me-2" />
//                   What specific expertise or skills are you seeking in a business partner?
//                 </Form.Label>
//                 <Form.Control
//                   as="textarea"
//                   value={formData.partnerSkills}
//                   onChange={(e) => handleInputChange("partnerSkills", e.target.value)}
//                   rows={3}
//                   placeholder="Describe the skills or expertise needed"
//                   required
//                 />
//               </Form.Group>
//             </Row>

//             {/* Partner Involvement */}
//             <Row className="mb-3">
//               <Form.Group as={Col} controlId="partnerInvolvement">
//                 <Form.Label className="fs-6"> {/* Consistent font size */}
//                   <FaBalanceScale className="me-2" />
//                   What is the desired level of involvement from a business partner?
//                 </Form.Label>
//                 <Form.Select
//                 style={{ backgroundColor: 'transparent', border: '1px solid #ccc' }}
//                   value={formData.partnerInvolvement}
//                   onChange={(e) => handleInputChange("partnerInvolvement", e.target.value)}
//                   required
//                 >
//                   <option value="">Select</option>
//                   <option value="Full-time">Full-time</option>
//                   <option value="Part-time">Part-time</option>
//                   <option value="Advisory">Advisory</option>
//                   <option value="Other">Other</option>
//                 </Form.Select>
//               </Form.Group>
//             </Row>

//             {/* Equity/Compensation */}
//             <Row className="mb-3">
//               <Form.Group as={Col} controlId="partnerEquityCompensation">
//                 <Form.Label className="fs-6"> {/* Consistent font size */}
//                   <FaExchangeAlt className="me-2" />
//                   Are you open to partners who are willing to work in exchange for equity or other non-cash compensation?
//                 </Form.Label>
//                 <Form.Select
//                 style={{ backgroundColor: 'transparent', border: '1px solid #ccc' }}
//                   value={formData.partnerEquityCompensation}
//                   onChange={(e) => handleInputChange("partnerEquityCompensation", e.target.value)}
//                   required
//                 >
//                   <option value="">Select</option>
//                   <option value="Yes">Yes</option>
//                   <option value="No">No</option>
//                   <option value="Negotiable">Negotiable</option>
//                 </Form.Select>
//               </Form.Group>
//             </Row>

//             {/* Partnership Structure */}
//             <Row className="mb-3">
//               <Form.Group as={Col} controlId="partnershipStructure">
//                 <Form.Label className="fs-6"> {/* Consistent font size */}
//                   <FaHandshake className="me-2" />
//                   What type of partnership structure are you looking for?
//                 </Form.Label>
//                 <Form.Select
//                 style={{ backgroundColor: 'transparent', border: '1px solid #ccc' }}
//                   value={formData.partnershipStructure}
//                   onChange={(e) => handleInputChange("partnershipStructure", e.target.value)}
//                   required
//                 >
//                   <option value="">Select</option>
//                   <option value="Co-founder">Co-founder</option>
//                   <option value="Equity-ed Partnership">Equity-based Partnership</option>
//                   <option value="Joint Venture">Joint Venture</option>
//                   <option value="Advisory Role">Advisory Role</option>
//                   <option value="Other">Other</option>
//                 </Form.Select>
//               </Form.Group>
//             </Row>
//           </Form>
//         </Card.Body>
//       </Card>
//     );
//       case 3:
//       return (
//         <Card className="mb-4 shadow-sm">
//          <Card.Header style={{ backgroundColor: '', color: 'white' }}>
//   <h5 className="fs-4">
//     <FaRegLightbulb className="me-2 " />
//     Business Needs & Goals
//   </h5>
// </Card.Header>

            
//           <Card.Body>
//             <Form>
//               {/* Business Challenges */}
//               <Row className="mb-3">
//                 <Form.Group as={Col} controlId="businessChallenges">
//                   <Form.Label className="fs-6">
//                     <FaExclamationTriangle className="me-2" style={{ color: "#757885" }} />
//                     What are the biggest challenges your business is currently facing?
//                   </Form.Label>
//                   <Form.Control
//                     as="textarea"
//                     value={formData.businessChallenges}
//                     onChange={(e) => handleInputChange("businessChallenges", e.target.value)}
//                     rows={3}
//                     placeholder="Describe the key challenges"
//                     required
//                   />
//                 </Form.Group>
//               </Row>
  
//               {/* Key Priorities */}
//               <Row className="mb-3">
//                 <Form.Group as={Col} controlId="keyPriorities">
//                   <Form.Label className="fs-6">
//                     <FaTasks className="me-2" style={{ color: "#0398fc" }} />
//                     What are your key priorities over the next 6-12 months?
//                   </Form.Label>
//                   <Form.Control
//                     as="textarea"
//                     value={formData.keyPriorities}
//                     onChange={(e) => handleInputChange("keyPriorities", e.target.value)}
//                     rows={3}
//                     placeholder="Outline your short-term priorities"
//                     required
//                   />
//                 </Form.Group>
//               </Row>
  
//               {/* Support Needed */}
//               <Row className="mb-3">
//                 <Form.Group as={Col} controlId="supportNeeded">
//                   <Form.Label className="fs-6">
//                     <FaHandsHelping className="me-2" style={{ color: "#0398fc" }} />
//                     What specific support are you looking for from an investor or business partner?
//                   </Form.Label>
//                   <Form.Control
//                     as="textarea"
//                     value={formData.supportNeeded}
//                     onChange={(e) => handleInputChange("supportNeeded", e.target.value)}
//                     rows={3}
//                     placeholder="Specify the type of support needed"
//                     required
//                   />
//                 </Form.Group>
//               </Row>
  
//               {/* Business Plan */}
//               <Row className="mb-3">
//                 <Form.Group as={Col} controlId="businessPlanStatus">
//                   <Form.Label className="fs-6">
//                     <FaRoad className="me-2" style={{ color: "#0398fc" }} />
//                     Do you have a clear business plan or roadmap for growth?
//                   </Form.Label>
//                   <Form.Select
//                   style={{ backgroundColor: 'transparent', border: '1px solid #ccc' }}
//                     value={formData.businessPlanStatus}
//                     onChange={(e) => handleInputChange("businessPlanStatus", e.target.value)}
//                     required
//                   >
//                     <option value="">Select</option>
//                     <option value="Yes">Yes</option>
//                     <option value="No">No</option>
//                     <option value="In progress">In progress</option>
//                   </Form.Select>
//                 </Form.Group>
//               </Row>
  
//               {/* Milestones */}
//               <Row className="mb-3">
//                 <Form.Group as={Col} controlId="milestones">
//                   <Form.Label className="fs-6">
//                     <FaFlagCheckered className="me-2" style={{ color: "#0398fc" }} />
//                     What milestones do you plan to achieve in the next 6 months?
//                   </Form.Label>
//                   <Form.Control
//                     as="textarea"
//                     value={formData.milestones}
//                     onChange={(e) => handleInputChange("milestones", e.target.value)}
//                     rows={3}
//                     placeholder="List your planned milestones"
//                     required
//                   />
//                 </Form.Group>
//               </Row>
//             </Form>
//           </Card.Body>
//         </Card>
//       );
//       case 4:
//     return (
//       <Card className="mb-4 shadow-sm">
//        <Card.Header style={{ backgroundColor: '', color: 'white' }}>
//   <h5 className="fs-4">
//     <FaRegLightbulb className="me-2 " />
//    Additional Information
//   </h5>
// </Card.Header>

//         <Card.Body>
//           <Form>
//             {/* Long-Term Goals */}
//             <Row className="mb-3">
//               <Form.Group as={Col} controlId="longTermGoals">
//                 <Form.Label className="fs-6">
//                   <FaBullseye className="me-2" style={{ color: "" }} />
//                   What are your long-term goals for the business?
//                 </Form.Label>
//                 <Form.Control
//                   as="textarea"
//                   value={formData.longTermGoals}
//                   onChange={(e) => handleInputChange("longTermGoals", e.target.value)}
//                   rows={4}
//                   placeholder="Describe your vision for the future"
//                   required
//                 />
//               </Form.Group>
//             </Row>

//             {/* Additional Information */}
//             <Row className="mb-3">
//               <Form.Group as={Col} controlId="additionalInfo">
//                 <Form.Label className="">
//                   <FaInfoCircle className="me-2" style={{ color: "" }} />
//                   Is there anything else a potential investor or partner should know about you or your business?
//                 </Form.Label>
//                 <Form.Control
//                   as="textarea"
//                   value={formData.additionalInfo}
//                   onChange={(e) => handleInputChange("additionalInfo", e.target.value)}
//                   rows={4}
//                   placeholder="Provide any additional information"
//                   required
//                 />
//               </Form.Group>
//             </Row>
//           </Form>
//         </Card.Body>
//       </Card>
//     );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div>
//       {/* Styled Tabs */}
//       <h2 className="text-start mb-4" style={{ marginRight: '20px' }}>Entrepreneur (Exploring Business Ideas - Industry Connections)</h2>

//       <div className="d-flex justify-content-center mb-4">
//         {sections.map((title, index) => (
//           <button
//             key={index}
//             type="button"
//             style={{
//               backgroundColor: currentSection === index ? '#03c6fc' : 'transparent',
//               color: 'black',
//               borderColor: '#03c6fc',
//             }}
//             className={`btn mx-2 ${currentSection === index ? '' : 'btn-outline'}`}
//             onClick={() => setCurrentSection(index)}
//           >
//             {title}
//           </button>
//         ))}
//       </div>
  
//       <form onSubmit={handleSubmit}>
//         {renderSection()}
  
//         {/* Navigation Buttons */}
        
//         <div className="d-flex justify-content-between mt-4">
        
//           <div >
//           <ButtonGroup>
//             <Button
//              onClick={() => {
//               navigate("settings/account")
//              }}
//             >
//               Back
//             </Button>

         
//             <Button
//               variant="btn btn-danger"
//               type="button"
//               onClick={handleSkip}
//             >
//               Skip
//             </Button>
//             </ButtonGroup>
         
//           </div>
          
//           <div style={{marginLeft:"-90%"}}>
//             <ButtonGroup >
//               <Button
//                 variant="secondary"
//                 type="button"
//                 disabled={currentSection === 0}
//                 onClick={() => setCurrentSection((prev) => prev - 1)}
//               >
//                 Previous
//               </Button>
//               {currentSection < sections.length - 1 && (
//                 <Button
//                   variant="primary"
//                   type="button"
//                   onClick={() => setCurrentSection((prev) => prev + 1)}
//                 >
//                   Next
//                 </Button>
//               )}
//               {currentSection === sections.length - 1 && (
//                 <Button variant="success" type="submit">
//                   Submit
//                 </Button>
//               )}
//             </ButtonGroup>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
    
// };

// export default Founderforms;


//......................................................................................//




import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Form, Row, Col, InputGroup } from 'react-bootstrap';
import { 
  FaRegLightbulb, FaGlobe, FaCity, FaClock, FaIndustry, 
  FaBalanceScale, FaExchangeAlt, FaTasks, FaExclamationTriangle, 
  FaHandsHelping, FaInfoCircle, FaBullseye, FaDollarSign, 
  FaFlagCheckered, FaHandshake, FaPeopleArrows, FaRoad, FaUserTie,
  FaChartLine, FaMedal
} from 'react-icons/fa';
import { useAuthContext } from '@/context/useAuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Lightbulb, TrendingUp, Users } from 'lucide-react';
import { LIVE_URL } from '@/utils/api';

const FounderForm = () => {




  const containerStyle = {
    backgroundColor: '#f8f9fa',
    border: '1px solid #dee2e6',
    borderRadius: '12px',
    padding: '24px',
    width: '100%',
    maxWidth: '100vw', // Full-screen width
    margin: '-47px auto 10px ', // Top, Right, Bottom, Left
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  };
  

  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '20px',
    borderBottom: '1px solid #dee2e6',
    paddingBottom: '16px'
    
  };

  const titleStyle = {
    fontSize: '24px',
    fontWeight: '600',
    color: '#2c3e50',
    margin: 0
  };

  const descriptionStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    color: '#6c757d',
    fontSize: '16px',
    marginBottom: '20px'
  };

  const iconContainerStyle = {
    display: 'flex',
    gap: '24px',
    marginTop: '20px'
  };

  const iconBoxStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 16px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    color: '#495057'
  };














  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    businessName: "",
    businessLocationCountry: "",
    businessLocationCity: "",
    businessIdea: "",
    businessStage: "",
    industrySector: "",
    businessDuration: "",
    problemSolving: "",
    traction: "",
    investorType: "",
    fundingAmount: "",
    useOfFunds: "",
    investmentType: "",
    businessValuation: "",
    equityInExchange: "",
    exitPlans: "",
    partnerType: "",
    partnerSkills: "",
    partnerInvolvement: "",
    partnerEquityCompensation: "",
    partnershipStructure: "",
    businessChallenges: "",
    keyPriorities: "",
    supportNeeded: "",
    businessPlanStatus: "",
    milestones: "",
    longTermGoals: "",
    additionalInfo: "",
  });

  const [step, setStep] = useState(1);

  const tabs = [
    { 
      icon: <FaUserTie size={24} />,
      title: "Business Information",
      step: 1 
    },
    { 
      icon: <FaChartLine size={24} />,
      title: "Investor Preferences",
      step: 2 
    },
    { 
      icon: <FaHandshake size={24} />,
      title: "Partner Preferences",
      step: 3 
    },
    { 
      icon: <FaMedal size={24} />,
      title: "Business Needs & Goals",
      step: 4 
    },
    { 
      icon: <FaBullseye size={24} />,
      title: "Additional Information",
      step: 5 
    }
  ];

  const handleInputChange = (name: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!user?.id) {
      toast.error("User ID is missing. Please log in again.");
      return;
    }
  
    try {
      const response1 = await fetch(`${LIVE_URL}api/v1/entrepreneur/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData }),
      });
  
      if (!response1.ok) {
        throw new Error("Failed to submit entrepreneur data");
      }
  
      try {
        const response2 = await fetch(`${LIVE_URL}api/v1/subrole/create`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            UserId: user.id,
            SubRole: "Founder"
          }),
        });
  
        if (!response2.ok) {
          throw new Error("Failed to submit subrole data");
        }
  
        toast.success("Form submitted successfully!");
        navigate('/');
      } catch (error) {
        console.error("Error in second request:", error);
        toast.error("An error occurred while submitting the subrole data.");
      }
  
    } catch (error) {
      console.error("Error in first request:", error);
      toast.error("An error occurred while submitting the form.");
    }
  };

  const handleSkip = () => navigate('/');
  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);
  const handleTabClick = (tabStep: number) => setStep(tabStep);

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Card className="mb-4 shadow-sm">
            <Card.Header className="bg-white">
              <h5 className="mb-0">
                <FaUserTie className="me-2" />
                Business Information
              </h5>
            </Card.Header>
            <Card.Body>
              <Form>
                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>
                      <FaRegLightbulb className="me-2" />
                      What is the name of your business?
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.businessName}
                      onChange={(e) => handleInputChange("businessName", e.target.value)}
                      placeholder="Enter your business name"
                      required
                    />
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>
                      <FaGlobe className="me-2" />
                      Where is your business located?
                    </Form.Label>
                    <Form.Select
                      value={formData.businessLocationCountry}
                      onChange={(e) => handleInputChange("businessLocationCountry", e.target.value)}
                      required
                    >
                      <option value="">Select Country</option>
                      <option value="USA">USA</option>
                      <option value="Canada">Canada</option>
                      <option value="UK">UK</option>
                      <option value="India">India</option>
                      <option value="Other">Other</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label>
                      <FaCity className="me-2" />
                      City
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.businessLocationCity}
                      onChange={(e) => handleInputChange("businessLocationCity", e.target.value)}
                      placeholder="Enter city"
                    />
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>
                      <FaRegLightbulb className="me-2" />
                      What is your business idea about?
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={formData.businessIdea}
                      onChange={(e) => handleInputChange("businessIdea", e.target.value)}
                      placeholder="Describe your business idea"
                      required
                    />
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>
                      <FaIndustry className="me-2" />
                      What stage is your business currently at?
                    </Form.Label>
                    <Form.Select
                      value={formData.businessStage}
                      onChange={(e) => handleInputChange("businessStage", e.target.value)}
                      required
                    >
                      <option value="">Select stage</option>
                      <option value="Idea/Concept">Idea/Concept</option>
                      <option value="Prototype">Prototype</option>
                      <option value="Pre-revenue">Pre-revenue</option>
                      <option value="Revenue-generating">Revenue-generating</option>
                      <option value="Growth">Growth</option>
                      <option value="Scaling">Scaling</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label>
                      <FaIndustry className="me-2" />
                      Industry/Sector
                    </Form.Label>
                    <Form.Select
                      value={formData.industrySector}
                      onChange={(e) => handleInputChange("industrySector", e.target.value)}
                      required
                    >
                      <option value="">Select industry</option>
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
                      <FaClock className="me-2" />
                      How long has your business been operating?
                    </Form.Label>
                    <Form.Select
                      value={formData.businessDuration}
                      onChange={(e) => handleInputChange("businessDuration", e.target.value)}
                      required
                    >
                      <option value="">Select duration</option>
                      <option value="Less than 6 months">Less than 6 months</option>
                      <option value="6-12 months">6-12 months</option>
                      <option value="1-2 years">1-2 years</option>
                      <option value="2+ years">2+ years</option>
                    </Form.Select>
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>
                      <FaTasks className="me-2" />
                      What problem does your business solve?
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={formData.problemSolving}
                      onChange={(e) => handleInputChange("problemSolving", e.target.value)}
                      placeholder="Describe the problem and target audience"
                      required
                    />
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>
                      <FaChartLine className="me-2" />
                      Do you have any traction?
                    </Form.Label>
                    <Form.Select
                      value={formData.traction}
                      onChange={(e) => handleInputChange("traction", e.target.value)}
                      required
                    >
                      <option value="">Select</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </Form.Select>
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
                <FaChartLine className="me-2" />
                Investor Preferences
              </h5>
            </Card.Header>
            <Card.Body>
              <Form>
                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>
                      <FaUserTie className="me-2" />
                      What type of investor are you looking for?
                    </Form.Label>
                    <Form.Select
                      value={formData.investorType}
                      onChange={(e) => handleInputChange("investorType", e.target.value)}
                      required
                    >
                      <option value="">Select investor type</option>
                      <option value="Micro Investor">Micro Investor</option>
                      <option value="Angel Investor">Angel Investor</option>
                      <option value="Venture Capital">Venture Capital</option>
                      <option value="Strategic Investor">Strategic Investor</option>
                      <option value="Other">Other</option>
                    </Form.Select>
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>
                      <FaDollarSign className="me-2" />
                      What is the amount of funding you are seeking?
                    </Form.Label>
                    <Form.Select
                      value={formData.fundingAmount}
                      onChange={(e) => handleInputChange("fundingAmount", e.target.value)}
                      required
                    >
                      <option value="">Select amount</option>
                      <option value="Under $50k">Under $50k</option>
                      <option value="$50k - $200k">$50k - $200k</option>
                      <option value="$200k - $500k">$200k - $500k</option>
                      <option value="$500k - $1M">$500k - $1M</option>
                      <option value="Over $1M">Over $1M</option>
                    </Form.Select>
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>
                      <FaRoad className="me-2" />
                      What is the intended use of the investment funds?
                    </Form.Label>
                    <Form.Select
                      value={formData.useOfFunds}
                      onChange={(e) => handleInputChange("useOfFunds", e.target.value)}
                      required
                    >
                      <option value="">Select use of funds</option>
                      <option value="Product Development">Product Development</option>
                      <option value="Marketing & Sales">Marketing & Sales</option>
                      <option value="Hiring">Hiring</option>
                      <option value="Scaling Operations">Scaling Operations</option>
                      <option value="Technology Infrastructure">Technology Infrastructure</option>
                      <option value="Other">Other</option>
                    </Form.Select>
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>
                      <FaExchangeAlt className="me-2" />
                      What type of investment are you open to?
                    </Form.Label>
                    <Form.Select
                      value={formData.investmentType}
                      onChange={(e) => handleInputChange("investmentType", e.target.value)}
                      required
                    >
                      <option value="">Select investment type</option>
                      <option value="Equity">Equity</option>
                      <option value="Convertible Notes">Convertible Notes</option>
                      <option value="SAFE Notes">SAFE Notes</option>
                      <option value="Debt">Debt</option>
                      <option value="Other">Other</option>
                    </Form.Select>
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>
                      <FaDollarSign className="me-2" />
                      Current business valuation (if applicable)
                    </Form.Label>
                    <InputGroup>
                      <InputGroup.Text>$</InputGroup.Text>
                      <Form.Control
                        type="text"
                        value={formData.businessValuation}
                        onChange={(e) => handleInputChange("businessValuation", e.target.value)}
                        placeholder="Enter valuation"
                      />
                    </InputGroup>
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>
                      <FaBalanceScale className="me-2" />
                      Are you open to giving equity in exchange for investment?
                    </Form.Label>
                    <Form.Select
                      value={formData.equityInExchange}
                      onChange={(e) => handleInputChange("equityInExchange", e.target.value)}
                      required
                    >
                      <option value="">Select option</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                      <option value="Negotiable">Negotiable</option>
                    </Form.Select>
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>
                      <FaFlagCheckered className="me-2" />
                      What are your exit plans or expected timeline for exit?
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={formData.exitPlans}
                      onChange={(e) => handleInputChange("exitPlans", e.target.value)}
                      placeholder="Describe your exit plans"
                      required
                    />
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
                <FaHandshake className="me-2" />
                Partner Preferences
              </h5>
            </Card.Header>
            <Card.Body>
              <Form>
                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>
                      <FaUserTie className="me-2" />
                      What type of business partners are you looking for?
                    </Form.Label>
                    <Form.Select
                      value={formData.partnerType}
                      onChange={(e) => handleInputChange("partnerType", e.target.value)}
                      required
                    >
                      <option value="">Select partner type</option>
                      <option value="Co-founder">Co-founder</option>
                      <option value="Strategic Partner">Strategic Partner</option>
                      <option value="Technical Co-founder">Technical Co-founder</option>
                      <option value="Sales/Marketing Expert">Sales/Marketing Expert</option>
                      <option value="Operations Expert">Operations Expert</option>
                      <option value="Mentor">Mentor</option>
                      <option value="Advisor">Advisor</option>
                    </Form.Select>
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>
                      <FaPeopleArrows className="me-2" />
                      What specific expertise or skills are you seeking?
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={formData.partnerSkills}
                      onChange={(e) => handleInputChange("partnerSkills", e.target.value)}
                      placeholder="Describe the skills or expertise needed"
                      required
                    />
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>
                      <FaBalanceScale className="me-2" />
                      What is the desired level of involvement?
                    </Form.Label>
                    <Form.Select
                      value={formData.partnerInvolvement}
                      onChange={(e) => handleInputChange("partnerInvolvement", e.target.value)}
                      required
                    >
                      <option value="">Select involvement level</option>
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Advisory">Advisory</option>
                      <option value="Other">Other</option>
                    </Form.Select>
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>
                      <FaExchangeAlt className="me-2" />
                      Are you open to equity-based compensation?
                    </Form.Label>
                    <Form.Select
                      value={formData.partnerEquityCompensation}
                      onChange={(e) => handleInputChange("partnerEquityCompensation", e.target.value)}
                      required
                    >
                      <option value="">Select option</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                      <option value="Negotiable">Negotiable</option>
                    </Form.Select>
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>
                      <FaHandshake className="me-2" />
                      What type of partnership structure are you looking for?
                    </Form.Label>
                    <Form.Select
                      value={formData.partnershipStructure}
                      onChange={(e) => handleInputChange("partnershipStructure", e.target.value)}
                      required
                    >
                      <option value="">Select structure</option>
                      <option value="Co-founder">Co-founder</option>
                      <option value="Equity-based Partnership">Equity-based Partnership</option>
                      <option value="Joint Venture">Joint Venture</option>
                      <option value="Advisory Role">Advisory Role</option>
                      <option value="Other">Other</option>
                    </Form.Select>
                  </Form.Group>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        );

      case 4:
        return (
          <Card className="mb-4 shadow-sm">
            <Card.Header className="bg-white">
              <h5 className="mb-0">
                <FaMedal className="me-2" />
                Business Needs & Goals
              </h5>
            </Card.Header>
            <Card.Body>
              <Form>
                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>
                      <FaExclamationTriangle className="me-2" />
                      What are the biggest challenges your business is facing?
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={formData.businessChallenges}
                      onChange={(e) => handleInputChange("businessChallenges", e.target.value)}
                      placeholder="Describe the key challenges"
                      required
                    />
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>
                      <FaTasks className="me-2" />
                      What are your key priorities for the next 6-12 months?
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={formData.keyPriorities}
                      onChange={(e) => handleInputChange("keyPriorities", e.target.value)}
                      placeholder="Outline your priorities"
                      required
                    />
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>
                      <FaHandsHelping className="me-2" />
                      What specific support are you looking for?
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={formData.supportNeeded}
                      onChange={(e) => handleInputChange("supportNeeded", e.target.value)}
                      placeholder="Specify the type of support needed"
                      required
                    />
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>
                      <FaRoad className="me-2" />
                      Do you have a clear business plan or roadmap?
                    </Form.Label>
                    <Form.Select
                      value={formData.businessPlanStatus}
                      onChange={(e) => handleInputChange("businessPlanStatus", e.target.value)}
                      required
                    >
                      <option value="">Select status</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                      <option value="In progress">In progress</option>
                    </Form.Select>
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>
                      <FaFlagCheckered className="me-2" />
                      What milestones do you plan to achieve in the next 6 months?
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={formData.milestones}
                      onChange={(e) => handleInputChange("milestones", e.target.value)}
                      placeholder="List your planned milestones"
                      required
                    />
                  </Form.Group>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        );

      case 5:
        return (
          <Card className="mb-4 shadow-sm">
            <Card.Header className="bg-white">
              <h5 className="mb-0">
                <FaBullseye className="me-2" />
                Additional Information
              </h5>
            </Card.Header>
            <Card.Body>
              <Form>
                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>
                      <FaBullseye className="me-2" />
                      What are your long-term goals for the business?
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      value={formData.longTermGoals}
                      onChange={(e) => handleInputChange("longTermGoals", e.target.value)}
                      placeholder="Describe your vision for the future"
                      required
                    />
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>
                      <FaInfoCircle className="me-2" />
                      Is there anything else you'd like to share?
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      value={formData.additionalInfo}
                      onChange={(e) => handleInputChange("additionalInfo", e.target.value)}
                      placeholder="Provide any additional information"
                    />
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
    <div >
      <div style={containerStyle}  >
      <div style={headerStyle}>
        <Users 
          size={32} 
          color="#0d6efd"
          style={{ strokeWidth: 1.5 }}
        />
        <h2 style={titleStyle}>Founder Profile</h2>
      </div>
      
      <div style={descriptionStyle}>
        <Lightbulb 
          size={20} 
          color="#6c757d"
          style={{ strokeWidth: 1.5 }}
        />
        <p style={{ margin: 0 }}>
          Connect with industry experts and get guidance for your business ideas
        </p>
      </div>

      <div style={iconContainerStyle}>
        {/* <div style={iconBoxStyle}>
          <TrendingUp 
            size={18} 
            color="#0d6efd"
            style={{ strokeWidth: 1.5 }}
          />
          <span>Growth Strategy</span>
        </div> */}
        {/* <div style={iconBoxStyle}>
          <Users 
            size={18} 
            color="#0d6efd"
            style={{ strokeWidth: 1.5 }}
          />
          <span>Mentorship</span>
        </div>
        <div style={iconBoxStyle}>
          <Lightbulb 
            size={18} 
            color="#0d6efd"
            style={{ strokeWidth: 1.5 }}
          />
          <span>Innovation</span>
        </div> */}
      </div>
    </div>
      <div className="mb-4">
        <div className="d-flex justify-content-between align-items-center bg-white rounded-3 p-3 shadow-sm">
          {tabs.map((tab) => (
            <div
              key={tab.step}
              onClick={() => handleTabClick(tab.step)}
              className={`flex-grow-1 text-center py-3 px-4 rounded-3 mx-2 tab-item ${
                step === tab.step
                  ? "bg-white text-primary p-4 border border-primary rounded-3 shadow"
                  : step > tab.step
                  ? 'bg-white text-blue p-4 border border-light rounded-3 shadow'
                  : 'bg-white text-blue p-4 border border-light rounded-3 shadow'
              }`}
              style={{ 
                cursor: tab.step <= step ? 'pointer' : 'pointer',
                transition: 'all 0.3s ease',
                minWidth: '180px',
                height:"120px",
              
              }}
            >
              <div className="d-flex flex-column align-items-center justify-content-center">
                {tab.icon}
                <span className="mt-2 fw-semibold">{tab.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {renderStep()}

      <div className="d-flex justify-content-between mt-4 p-3  border rounded-2" style={{backgroundColor:"#f8f9fa"}}>
        {step > 1 && (
          <button
            className="btn btn-secondary"
            onClick={prevStep}
          >
            Previous
          </button>
        )}
        
        <div className="ms-auto">
          <button
            className="btn btn-outline-secondary me-2"
            onClick={handleSkip}
          >
            Skip
          </button>
          
          {step < 5 ? (
            <button
              className="btn btn-primary"
              onClick={nextStep}
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
        </div>
      </div>
    </div>
  );
};

export default FounderForm;