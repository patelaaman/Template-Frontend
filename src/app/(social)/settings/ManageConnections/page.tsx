import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ConnectionRequest } from "@/layouts/ProfileLayout";
import MyConnections from "@/assets/data/clone/MyConnections";
import ConnectionsStatus from "@/assets/data/clone/ConnectionsStatus";
import SuggestedConnections from "@/assets/data/clone/SuggestedConnections";
import { FaUserFriends, FaUserCheck, FaUserPlus, FaUsers } from "react-icons/fa";
import PageMetaData from "@/components/PageMetaData";
import { useSearchParams } from "react-router-dom";

const ManageConnections = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [step, setStep] = useState(0);

  useEffect(() => {
    let index = searchParams.get("t") || "0";
    let parsedIndex = parseInt(index, 10);
    if (isNaN(parsedIndex)) parsedIndex = 0;
    setStep(parsedIndex % 4);
  }, [searchParams]);

  const sections = [
    { title: "My Connections", icon: <FaUserPlus className="icon" style={{ color: "#007bff" }} />, component: <MyConnections /> },
    { title: "Request Sent", icon: <FaUserCheck className="icon" style={{ color: "#28a745" }} />, component: <ConnectionsStatus /> },
    { title: "Request Received", icon: <FaUserFriends className="icon" style={{ color: "#ffc107" }} />, component: <ConnectionRequest /> },
    { title: "Connect 'n' Grow", icon: <FaUsers className="icon" style={{ color: "#17a2b8" }} />, component: <SuggestedConnections /> },
  ];

  const setCurrentSection = (index) => {
    setStep(index);
    setSearchParams({ t: index });
  };

  return (
    <div className="container-fluid px-0">
      <PageMetaData title="Manage Connections" />
      <div className="card p-4 shadow-sm rounded">
        <div className="tabs-container">
          {sections.map((section, index) => (
            <button
              key={index}
              type="button"
              className={`tab-btn ${step === index ? "active" : ""}`}
              onClick={() => setCurrentSection(index)}
            >
              <div className="icon">{section.icon}</div>
              <span className="title">{section.title}</span>
            </button>
          ))}
        </div>
        <div className="content-container p-4">{sections[step].component}</div>
      </div>
      <style>
        {`
          .card {
            background: white;
            border-radius: 12px;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
            width: 90%;
            margin: auto;
            font-family: 'Arial', sans-serif;
          }
          
          .tab-btn {
            background: white;
            border: 2px solid #d6d6d6;
            border-radius: 12px;
            color: black;
            width: 180px;
            height: 80px;
            font-size: 15px;
            font-weight: 500;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
            cursor: pointer;
            margin: 10px;
            font-family: 'Arial', sans-serif;
          }

          .tab-btn.active {
            border: 2px solid #007bff;
            color: #007bff;
            
          }

          .icon {
            font-size: 24px;
            margin-bottom: 5px;
          }

          .title {
            font-size: 14px;
          }

          .tabs-container {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: center;
            padding: 10px;
            background: white;
            border-radius: 12px;
            width: 100%;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
            gap: 5px;
          }

          .content-container {
            padding: 20px;
            background: white;
            border-radius: 12px;
            width: 100%;
            max-width: 900px;
            margin: 0 auto;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
          }
        `}
      </style>
    </div>
  );
};

export default ManageConnections;
