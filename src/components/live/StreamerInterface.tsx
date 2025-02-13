import React, { useState, useRef } from "react";
import { Container, Button, Card, Form, Alert, Offcanvas, OffcanvasHeader, OffcanvasTitle, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, DropdownDivider } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import TwilioVideo from "twilio-video";
import makeApiRequest from "@/utils/apiServer";
import { useAuthContext } from "@/context/useAuthContext";
import { BsBell, BsChatLeftTextFill, BsCheckSquare, BsGear, BsPencilSquare, BsPeople, BsSlashCircle, BsThreeDots, BsVolumeUpFill } from "react-icons/bs";
import { FaXmark } from "react-icons/fa6";
import Messaging from "../layout/Messaging";
import { useLayoutContext } from "@/context/useLayoutContext";
import { useUnreadMessages } from "@/context/UnreadMessagesContext";

const StreamerInterface = () => {
  const [roomName, setRoomName] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const localVideoRef = useRef(null);
  const [room, setRoom] = useState<TwilioVideo.Room | null>(null);
  const { messagingOffcanvas, startOffcanvas } = useLayoutContext()
  const { unreadMessages } = useUnreadMessages()
  const count = unreadMessages.length;

  const startStreaming = async () => {
    if (!roomName.trim()) {
      setErrorMessage("Room ID cannot be empty.");
      return;
    }

    setErrorMessage("");
    setIsStreaming(true);

    const identity = user?.id || `guest-${Date.now()}`;

    try {
      // Fetch the token from the server
      const response = await makeApiRequest({
        method: "POST",
        url: "api/v1/live/token",
        data: { identity, roomName },
      });

      if (!response?.data?.token) {
        console.error("Invalid API response:", response);
        throw new Error("Failed to fetch token");
      }

      const token = response.data.token;
      console.log("Token fetched:", token);

      // Check camera and microphone access
      await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      console.log("Camera and microphone access verified");

      // Connect to Twilio room
      const connectedRoom = await TwilioVideo.connect(token, {
        name: roomName,
        audio: true,
        video: { width: 1280, height: 720 },
      });

      console.log("Successfully connected to Twilio room");

      // Attach the local video track to the DOM
      const localTrack = Array.from(connectedRoom.localParticipant.videoTracks.values())[0]?.track;
      if (localVideoRef.current && localTrack) {
        localTrack.attach(localVideoRef.current);
      }

      // Set the room state after connection
      setRoom(connectedRoom);

    } catch (error) {
      console.error("Error starting the stream:", error);
      setErrorMessage(`Failed to start streaming: ${error.message}`);
      setIsStreaming(false);
    }
  };

  const endStreaming = () => {
    if (room) {
      room.localParticipant.videoTracks.forEach((publication) => {
        publication.track.stop();
        publication.track.detach();
      });
      room.disconnect();
      setRoom(null);
    }
    setIsStreaming(false);
    setRoomName("");
  };

  const goToViewer = () => {
    navigate("/live");
  };

  return (
    <>
      <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
      <Card style={{ width: "100%", maxWidth: "500px", padding: "20px" }}>
        <Card.Body>
          <h2 className="text-center mb-4">Live Stream Setup</h2>
          {!isStreaming ? (
            <>
              {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Enter Room ID</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter a unique Room ID"
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                  />
                  <Form.Text className="text-muted">
                    Share this Room ID with viewers to join your live stream.
                  </Form.Text>
                </Form.Group>
                <Button variant="primary" onClick={startStreaming} className="w-100 mb-3">
                  Start Streaming
                </Button>
                <Button variant="secondary" onClick={goToViewer} className="w-100">
                  Switch to Viewer Interface
                </Button>
              </Form>
            </>
          ) : (
            <>
              <Alert variant="success">
                Streaming is live! Share the Room ID below with your viewers.
              </Alert>
              <p className="fw-bold text-center">Room ID: {roomName}</p>
              <div>
                <video ref={localVideoRef} autoPlay muted style={{ width: "100%", height: "auto", marginBottom: "10px" }}></video>
              </div>
              <Button variant="danger" onClick={endStreaming} className="w-100">
                End Stream
              </Button>
            </>
          )}
        </Card.Body>
      </Card>
      </Container>
      <div className="d-none d-lg-block">
        <a
          onClick={messagingOffcanvas.toggle}
          style={{marginRight : '26px'}}
          className="icon-md btn btn-primary position-fixed end-0 bottom-0 mb-5"
          role="button"
          aria-controls="offcanvasChat">
            {count > 0 && (
              <span className="badge bg-danger position-absolute top-0 start-100 translate-middle rounded-circle" style={{ padding: '0.5em', width: '1.5em', height: '1.5em', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {count}
              </span>
            )}
          <span>
            <BsChatLeftTextFill />
          </span>
        </a>
        <Offcanvas
          show={messagingOffcanvas.open}
          onHide={messagingOffcanvas.toggle}
          placement="end"
          className="offcanvas-end"
          data-bs-scroll="true"
          data-bs-backdrop="false"
          tabIndex={-1}
          id="offcanvasChat">
          <OffcanvasHeader className="d-flex justify-content-between">
            <OffcanvasTitle as="h5">Messaging</OffcanvasTitle>
            <div className="d-flex">
              <a role="button" className="btn btn-secondary-soft-hover py-1 px-2">
                <BsPencilSquare />
              </a>
              <Dropdown>
                <DropdownToggle

                  as="a"
                  className="content-none btn btn-secondary-soft-hover py-1 px-2"
                  id="chatAction"
                  data-bs-toggle="dropdown"
                  aria-expanded="false">
                  <BsThreeDots />
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-end" aria-labelledby="chatAction">
                  <li>
                    <DropdownItem>
                      <BsCheckSquare className="fa-fw pe-2" size={23} /> Mark all as read
                    </DropdownItem>
                  </li>
                  <li>
                    <DropdownItem>
                      <BsGear className="fa-fw pe-2" size={23} /> Chat setting
                    </DropdownItem>
                  </li>
                  <li>
                    <DropdownItem>
                      <BsBell className="fa-fw pe-2" size={23} /> Disable notifications
                    </DropdownItem>
                  </li>
                  <li>
                    <DropdownItem>
                      <BsVolumeUpFill className="fa-fw pe-2" size={23} /> Message sounds
                    </DropdownItem>
                  </li>
                  <li>
                    <DropdownItem>
                      <BsSlashCircle className="fa-fw pe-2" size={23} /> Block setting
                    </DropdownItem>
                  </li>
                  <li>
                    <DropdownDivider />
                  </li>
                  <li>
                    <DropdownItem>
                      <BsPeople className="fa-fw pe-2" size={23} /> Create a group chat
                    </DropdownItem>
                  </li>
                </DropdownMenu>
              </Dropdown>
              <a role="button" className="btn btn-secondary-soft-hover py-1 px-2" onClick={messagingOffcanvas.toggle}>
                <FaXmark />
              </a>
            </div>
          </OffcanvasHeader>
          <div className="offcanvas-body pt-0 custom-scrollbar">
            {/* <form className="rounded position-relative"> */}
              {/* <FormControl className="ps-5 bg-light" type="search" placeholder="Search..." aria-label="Search" />
              <button className="btn bg-transparent px-3 py-0 position-absolute top-50 start-0 translate-middle-y" type="button">
                <BsSearch className="fs-5" />
              </button> */}
            {/* </form> */}
            <Messaging />
          </div>
        </Offcanvas>
      </div>
    </>
  );
};

export default StreamerInterface;
