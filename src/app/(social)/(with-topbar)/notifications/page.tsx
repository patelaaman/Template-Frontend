import { useEffect, useState } from 'react';
import { useAuthContext } from '@/context/useAuthContext';
import PageMetaData from '@/components/PageMetaData';
import LoadMoreButton from './components/LoadMoreButton';
import avatar7 from '@/assets/images/avatar/default avatar.png'
import clsx from 'clsx';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Container,
  Dropdown,
  DropdownDivider,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Image,
  Offcanvas,
  OffcanvasHeader,
  OffcanvasTitle,
  Row,
} from 'react-bootstrap';
import {
  BsBell,
  BsBellSlash,
  BsChatLeftTextFill,
  BsCheckLg,
  BsCheckSquare,
  BsGear,
  BsPencilSquare,
  BsPeople,
  BsSlashCircle,
  BsThreeDots,
  BsTrash,
  BsVolumeMute,
  BsVolumeUpFill,
} from 'react-icons/bs';
import { timeSince } from '@/utils/date';
import { Link } from 'react-router-dom';
import Loading from '@/components/Loading';
import { LIVE_URL } from '@/utils/api';
import { useLayoutContext } from '@/context/useLayoutContext';
import { FaXmark } from 'react-icons/fa6';
import Messaging from '../messaging/page';
import { useUnreadMessages } from '@/context/UnreadMessagesContext';

const Notifications = () => {
  const { user } = useAuthContext();
  const [allNotifications, setAllNotifications] = useState([]);
  const { messagingOffcanvas, startOffcanvas } = useLayoutContext()
  const { unreadMessages } = useUnreadMessages()
  const count = unreadMessages.length;

  // Fetch notifications
  const fetchNotifications = async () => {
    try {
      const response = await fetch(
        `${LIVE_URL}api/v1/notifications/fetch`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ userId: user?.id }),
        }
      );

      const data = await response.json();
      if (data?.notifications) {
        setAllNotifications(data.notifications);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  useEffect(() => {
    if (user?.id) fetchNotifications();
  }, [user?.id]);

  // Mark a single notification as read
  const handleOnRead = async (notificationId:string) => {
    try {
      await fetch(`${LIVE_URL}api/v1/socket-notifications/mark-read`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notificationId }),
      });
      fetchNotifications();
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  // Mark all notifications as read
  const handleReadAll = async () => {
    try {
      const response = await fetch(
        `${LIVE_URL}api/v1/socket-notifications/mark-all-read`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: user?.id }),
        }
      );
      const data = await response.json();
      if (data?.success) {
        console.log('All notifications marked as read successfully.');
        fetchNotifications();
      } else {
        console.error('Failed to mark all notifications as read:', data.message);
      }
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  return (
    <>
      <PageMetaData title="Notifications" />
      <main style={{height : '100vh',backgroundColor : 'white'}}>
        <Container>
          <Row className="g-4" >
            <Col lg={8} className="mx-auto" style={{marginTop : '100px'}}>
              <Card>
                <CardHeader className="py-3 border-0 d-flex align-items-center justify-content-between">
                  <h1 className="h5 mb-0">Notifications</h1>
                  <Dropdown>
                    <DropdownToggle
                      as="a"
                      className="text-secondary btn btn-secondary-soft-hover py-1 px-2"
                    >
                      <BsThreeDots />
                    </DropdownToggle>
                    <DropdownMenu className="dropdown-menu-end">
                      <DropdownItem onClick={handleReadAll}>
                        <BsCheckLg size={22} className="fa-fw pe-2" />
                        Mark all read
                      </DropdownItem>
                      <DropdownItem>
                        <BsBellSlash size={22} className="fa-fw pe-2" />
                        Push notifications
                      </DropdownItem>
                      <DropdownItem>
                        <BsBell size={22} className="fa-fw pe-2" />
                        Email notifications
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </CardHeader>
                <CardBody className="p-2">
                  <ul className="list-unstyled">
                    {allNotifications.length > 0 ? (
                      allNotifications.map((notification) => (
                        <Link to={notification.navigation} key={notification.id}>
                          <div
                            onClick={() => handleOnRead(notification.id)}
                            className={clsx(
                              'rounded d-sm-flex border-0 mb-1 p-3 position-relative cursor-pointer',
                              { 'badge-unread': !notification.isRead }
                            )}
                          >
                            <div className="avatar text-center">
                            <Image
                              className="avatar-img rounded-circle"
                              src={notification?.mediaUrl ? notification?.mediaUrl : avatar7}
                              alt="Avatar"
                            />
                            </div>
                            <div className="mx-sm-3 my-2 my-sm-0">
                              <p className="small mb-2 text-secondary">
                                {notification.message}
                              </p>
                              {notification.type === 'isFriendRequest' && (
                                <div className="d-flex">
                                  <Button variant="primary" size="sm" className="py-1 me-2">
                                    Accept
                                  </Button>
                                  <Button variant="danger-soft" size="sm" className="py-1">
                                    Delete
                                  </Button>
                                </div>
                              )}
                            </div>
                            <div className="d-flex ms-auto">
                              <p className="small me-5 text-nowrap">
                                {timeSince(new Date(notification.createdAt))}
                              </p>
                              <Dropdown className="position-absolute end-0 top-0 mt-3 me-3">
                                <DropdownToggle
                                  as="a"
                                  className="text-secondary btn position-relative py-0 px-2"
                                >
                                  <BsThreeDots />
                                </DropdownToggle>
                                <DropdownMenu className="dropdown-menu-end">
                                  <DropdownItem>
                                    <BsTrash size={22} className="fa-fw pe-2" />
                                    Delete
                                  </DropdownItem>
                                  <DropdownItem>
                                    <BsBellSlash size={22} className="fa-fw pe-2" />
                                    Turn off
                                  </DropdownItem>
                                  <DropdownItem>
                                    <BsVolumeMute size={22} className="fa-fw pe-2" />
                                    Mute
                                  </DropdownItem>
                                </DropdownMenu>
                              </Dropdown>
                            </div>
                          </div>
                        </Link>
                      ))
                    ) : (
                      <Loading loading={true} size={50} />
                    )}
                  </ul>
                </CardBody>
                <CardFooter className="text-center">
                  <p>No more notification</p>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Container>
      </main>
      <div className="d-none d-lg-block">
      <a
          onClick={messagingOffcanvas.toggle}
          style={{ marginRight: '76px', width: '85px', height: '45px' }}
          className="icon-md btn btn-primary position-fixed end-0 bottom-0 mb-5"
          role="button"
          aria-controls="offcanvasChat"
          >
        {count > 0 && (
          <span className="badge bg-danger position-absolute top-0 start-100 translate-middle rounded-circle" style={{ padding: '0.5em', width: '1.5em', height: '1.5em', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {count}
          </span>
        )}
            <span>
              <BsChatLeftTextFill/> Chat
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

export default Notifications;
