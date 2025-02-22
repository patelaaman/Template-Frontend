import React, { lazy, Suspense, useEffect, useRef, useState } from 'react'
import avatar from '@/assets/images/avatar/default avatar.png'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Check, MessageCircleMore } from 'lucide-react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
const TopHeader = lazy(() => import('@/components/layout/TopHeader'))
import 'bootstrap/dist/css/bootstrap.min.css'
import ReportBlockModal from '@/components/cards/ReportBlockModal'
import GlightBox from '@/components/GlightBox'
import { useFetchData } from '@/hooks/useFetchData'
import type { ChildrenType } from '@/types/component'
import { RiUserUnfollowFill } from 'react-icons/ri'
import { Navigate } from 'react-router-dom'
import clsx from 'clsx'
import EditProfilePictureModal from '../components/cards/EditProfilePictureModal'
import { Button, Card, CardBody, CardFooter, CardHeader, CardTitle, Col, Dropdown, DropdownDivider, DropdownItem, DropdownMenu, DropdownToggle, Image, Offcanvas, OffcanvasHeader, OffcanvasTitle, Row } from 'react-bootstrap'
import { BsBell, BsBriefcase, BsChatLeftTextFill, BsCheckSquare, BsGear, BsGeoAlt, BsPatchCheckFill, BsPencilFill, BsPencilSquare, BsPeople, BsSlashCircle, BsThreeDots, BsVolumeUpFill } from 'react-icons/bs'
import { FaPlus, FaXmark } from 'react-icons/fa6'

// import { PROFILE_MENU_ITEMS } from '@/assets/data/menu-items'

import avatar7 from '@/assets/images/avatar/default avatar.png'
import background5 from '@/assets/images/bg/Profile-Bg.jpg'
import album1 from '@/assets/images/albums/01.jpg'
import album2 from '@/assets/images/albums/02.jpg'
import album3 from '@/assets/images/albums/03.jpg'
import album4 from '@/assets/images/albums/04.jpg'
import album5 from '@/assets/images/albums/05.jpg'
import { experienceData } from '@/assets/data/layout'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import FallbackLoading from '@/components/FallbackLoading'
import Preloader from '@/components/Preloader'
import axios from 'axios'
import { useAuthContext } from '@/context/useAuthContext'
import { FaTimes, FaUserCheck, FaUserPlus } from 'react-icons/fa'
import { toast, ToastContainer } from 'react-toastify'
import Loading from '@/components/Loading'
import Followers from '@/app/(social)/feed/(container)/home/components/Followers'
import { set } from 'react-hook-form'
import { LIVE_URL } from '@/utils/api'
import { UserProfile } from '@/app/(social)/feed/(container)/home/page'
import ImageZoom from '@/components/cards/ImageZoom'
import { useLayoutContext } from '@/context/useLayoutContext'
import Messaging from '@/components/layout/Messaging'
import { useUnreadMessages } from '@/context/UnreadMessagesContext'

const Experience = () => {
  return null
}

export const ConnectionRequest = () => {
  const { user } = useAuthContext()
  const [allFollowers, setAllFollowers] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [loadingStates, setLoadingStates] = useState<{ [key: string]: 'accepted' | 'rejected' | null }>({})

  useEffect(() => {
    fetchConnections()
  }, [user])

  const fetchConnections = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${LIVE_URL}api/v1/connection/get-connection-request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user?.id }),
      })

      if (!response.ok) throw new Error('Failed to fetch connection requests.')
      const data = await response.json()
      setAllFollowers(data)
    } catch (error) {
      console.error('Error fetching connection requests:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleStatusUpdate = async (userId: string, status: 'accepted' | 'rejected') => {
    // Optimistically update UI by removing the user before API call
    setAllFollowers((prev) => prev.filter((follower) => follower?.requesterDetails?.id !== userId))

    setLoadingStates((prev) => ({ ...prev, [userId]: status }))

    try {
      const response = await fetch(`${LIVE_URL}api/v1/connection/update-connection-status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user?.id,
          connectionId: userId,
          status,
        }),
      })

      if (!response.ok) throw new Error(`Failed to ${status} the connection request.`)
      toast.success(`Connection request ${status} successfully.`)
    } catch (error) {
      console.error(`Error while updating connection status:`, error)
      toast.error(`Error while trying to ${status} the connection request.`)

      // Revert UI changes if request fails
      fetchConnections()
    } finally {
      setLoadingStates((prev) => ({ ...prev, [userId]: null }))
    }
  }

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center bg-light" style={{ height: '100vh' }}>
        <div className="spinner-border text-primary" role="status" style={{ width: '4rem', height: '4rem', borderWidth: '6px' }}>
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="bg-light text-dark d-flex align-items-center">
        <CardTitle className="mb-0 fw-semibold fs-5">Total Request Received: {allFollowers.length}</CardTitle>
      </CardHeader>
      {allFollowers.length === 0 ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '60vh' }}>
          <div className="text-center">
            <p className="mb-0 text-muted fw-semibold" style={{ fontSize: '1.25rem', opacity: '0.8' }}>
              No follower requests found
            </p>
            <p className="small text-muted">It looks like you have no new follower requests at the moment.</p>
          </div>
        </div>
      ) : (
        <CardBody className="p-0">
          {allFollowers.map((follower, idx) => (
            <div key={idx} className={`p-3 d-flex align-items-center bg-white ${idx !== allFollowers.length - 1 ? 'border-bottom' : ''}`}>
              {/* Profile Image */}
              <div className="avatar me-3">
                <span role="button">
                  <img
                    className="avatar-img rounded-circle border"
                    src={follower.profilePictureUploadUrl || avatar7}
                    alt={`${follower?.requesterDetails?.firstName} ${follower?.requesterDetails?.lastName}`}
                    style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                  />
                </span>
              </div>

              {/* User Info */}
              <div className="flex-grow-1">
                <h6 className="mb-1">
                  <Link className="text-dark fw-semibold text-decoration-none" to="">
                    {follower?.requesterDetails?.firstName} {follower?.requesterDetails?.lastName}
                  </Link>
                </h6>
                <p className="small text-muted mb-0">{follower?.requesterDetails?.userRole}</p>
              </div>

              {/* Buttons */}
              <div className="ms-auto d-flex">
                <Button
                  onClick={() => handleStatusUpdate(follower?.requesterDetails?.id, 'rejected')}
                  variant="outline-danger"
                  size="sm"
                  className="me-2"
                  disabled={loadingStates[follower?.requesterDetails?.id] === 'rejected'}
                  style={{ minWidth: '120px', fontSize: '15px' }}>
                  {loadingStates[follower?.requesterDetails?.id] === 'rejected' ? <Loading size={15} loading={true} /> : 'Decline'}
                </Button>
                <Button
                  onClick={() => handleStatusUpdate(follower?.requesterDetails?.id, 'accepted')}
                  variant="success"
                  size="sm"
                  className="text-white"
                  disabled={loadingStates[follower?.requesterDetails?.id] === 'accepted'}
                  style={{ minWidth: '120px' }}>
                  {loadingStates[follower?.requesterDetails?.id] === 'accepted' ? <Loading size={15} loading={true} /> : 'Approve'}
                </Button>
              </div>
            </div>
          ))}
        </CardBody>
      )}
    </Card>
  )
}

export const ProfileLayout = ({ children }: ChildrenType) => {
  const { pathname } = useLocation()
  const [modalOpen, setModalOpen] = useState(false)
  const { user } = useAuthContext()
  const [loading, setLoading] = useState(false)
  const [skeletonLoading, setSkeletonLoading] = useState(true)
  const [profile, setProfile] = useState<UserProfile>({})
  const [sent, setSent] = useState(false)
  const { id } = useParams()
  const skeletonBaseColor = '#b0b0b0'
  const skeletonHighlightColor = '#d6d6d6'
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)
  const [msg, setMsg] = useState('')
  const [coverModal, setCoverModal] = useState<boolean>(false)
  const [count, setCount] = useState(0)
  const hasMount = useRef(false)
  const { unreadMessages } = useUnreadMessages()
  const countM = unreadMessages.length;
  const { messagingOffcanvas, startOffcanvas } = useLayoutContext()
  useEffect(() => {
    if (profile?.coverImgUrl || profile?.personalDetails) {
      return
    }
    fetchUser()
  }, [profile?.personalDetails])

  useEffect(() => {
    if (!skeletonLoading && !msg && count === 0) {
      if (id !== user?.id) {
        recordProfileVisit()
        setCount(1)
      }
      return
    }
  }, [user?.id, msg, count, skeletonLoading])

  console.log('---This is the status---', profile.connectionsStatus)
  // useEffect(() => {
  //   if(hasMount.current)  {window.location.reload()}
  //   hasMount.current = true
  // },[id])

  const recordProfileVisit = async () => {
    setCount(1)
    try {
      const response = await fetch(`${LIVE_URL}api/v1/auth/recored-visit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          visitorId: user?.id,
          visitedId: id,
        }),
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const data = await response.json()
      setMsg(data?.message)
    } catch (error) {
      console.error('Error recording profile visit:', error)
    } finally {
      setSkeletonLoading(false)
    }
  }

  const formatDate = (dateString: Date) => {
    const date = new Date(dateString)
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    }
    return date.toLocaleString('en-GB', options).replace(',', ' at')
  }

  const fetchUser = async () => {
    try {
      setSkeletonLoading(true)
      const response = await fetch(`${LIVE_URL}api/v1/auth/get-user-Profile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user?.id,
          profileId: id,
        }),
      })

      if (!response.ok) {
        //  navigate('/not-found')
        throw new Error('Network response was not ok')
      }
      if (response.status === 404) {
        // navigate('/not-found')
      }
      const data = await response.json()
      setSkeletonLoading(false)
      setProfile(data?.data)
    } catch (error) {
      console.error('Error fetching user profile:', error)
    } finally {
      setSkeletonLoading(false)
    }
  }

  const UserRequest = async () => {
    setLoading(true)
    const apiUrl = `${LIVE_URL}api/v1/connection/send-connection-request`
    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          requesterId: user?.id,
          receiverId: id,
        }),
      })

      if (!res.ok) {
        throw new Error(`Failed to send connection request.`)
      }

      setSent(true) // Toggle sent status
      toast.success(`Connection request sent successfully.`)
      // fetchUser()
    } catch (error) {
      console.error(`Error while sending connection request:`, error)
      setSent(false)
      toast.error(`Failed to send connection request.`)
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = async () => {
    setLoading(true)
    const apiUrl = `${LIVE_URL}api/v1/connection/unsend-connection-request`

    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          requesterId: user?.id,
          receiverId: id,
        }),
      })

      if (!res.ok) {
        throw new Error(`Failed to unsend connection request.`)
      }

      setSent(false)
      toast.info(`Connection request unsent successfully.`)
      fetchUser()
    } catch (error) {
      console.error(`Error while unsending connection request:`, error)
      toast.error(`Failed to unsend connection request.`)
    } finally {
      setLoading(false)
    }
  }

  const handleUnblock = async () => {
    try {
      setSkeletonLoading(true);

      const response = await fetch(`${LIVE_URL}api/v1/post/unblock-user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user?.id,
          blockedUser: id,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to unblock user');
      }

      toast.success("User unblocked successfully");
      window.location.reload()

    } catch (error: any) {
      console.error('Error unblocking user:', error);
      toast.error(error.message || 'Something went wrong');
    } finally {
      setSkeletonLoading(false);
    }
  };


  const PROFILE_MENU_ITEMS = [
    {
      key: 'profile-feed',
      label: 'Feed',
      url: `/profile/feed/${id}`,
      parentKey: 'pages-profile',
    },
    {
      key: 'profile-about',
      label: 'Business Profile',
      url: `/profile/about/${id}`,
      parentKey: 'pages-profile',
    },
    {
      key: 'profile-connections',
      label: 'Connections',
      url: `/profile/connections/${id}`,
      badge: {
        text: profile.connectionsCount,
        // text: profile.connectionsCount,
        variant: 'success',
      },
      parentKey: 'pages-profile',
    },
    // {
    //   key: 'profile-media',
    //   label: 'Media',
    //   url: `/profile/media/${id}`,
    //   parentKey: 'pages-profile',
    // },
    // {
    //   key: 'profile-videos',
    //   label: 'Videos',
    //   url: `/profile/videos/${id}`,
    //   parentKey: 'pages-profile',
    // },
    {
      key: 'profile-events',
      label: 'Events',
      url: `/profile/events/${id}`,
      parentKey: 'pages-profile',
    },
    {
      key: 'profile-activity',
      label: 'Activity',
      url: `/profile/activity/${id}`,
      parentKey: 'pages-profile',
    },
  ]

  const handleProfileUpdate = () => {
    console.log('Profile updated');
    setShowModal(false);
  };

  const handleCoverUpdate = () => {
    console.log('Cover updated');
    setCoverModal(false);
  };

  return (
    <>
      <div style={{}}>
        <ToastContainer />
        <Suspense fallback={<Preloader />}>
          <TopHeader />
        </Suspense>

        <main className="bg-pink px-3 px-md-5" style={{ marginRight: '2%', backgroundColor: 'white' }}>
          <EditProfilePictureModal
            show={showModal}
            onHide={() => setShowModal(false)}
            onPhotoUpdate={handleProfileUpdate}
            src={profile.profileImgUrl ? profile.profileImgUrl : avatar7}
            profile={profile}
          />
          <EditProfilePictureModal
            show={coverModal}
            onHide={() => setCoverModal(false)}
            onPhotoUpdate={handleCoverUpdate}
            src={profile.coverImgUrl ? profile.coverImgUrl : background5}
            forCover={true}
            profile={profile}
          />
          <Row className="g-4">
            {/* Main Profile Section */}
            <Col md={12} lg={9} className="vstack gap-4" style={{ paddingRight: '50px', paddingLeft: '30px' }}>
              <Card style={{}}>
                {/* Profile Cover Image */}
                <div className="position-relative rounded-top">
                  {skeletonLoading ? (
                    <Skeleton width="100%" height="20px" baseColor={skeletonBaseColor} highlightColor={skeletonHighlightColor} />
                  ) : (
                    <div
                      style={{
                        width: '100%',
                        height: '250px',
                        borderTopLeftRadius: '8px',
                        borderTopRightRadius: '8px',
                        overflow: 'hidden',
                        position: 'relative',
                      }}
                      onClick={() => {
                        if (user?.id === id) setCoverModal(true)
                      }}>
                      <Image
                        src={profile?.coverImgUrl ? profile?.coverImgUrl : background5}
                        alt="Profile"
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          objectFit: 'cover', // Ensures the image covers the div without stretching
                          transform: `scale(${(profile?.personalDetails?.zoom || 50) / 50}) rotate(${(profile?.personalDetails?.rotate || 50) - 50}deg)`,
                        }}
                      />
                    </div>
                  )}
                </div>

                <CardBody className="py-0">
                  {/* Profile Info Section */}
                  <div className="d-sm-flex align-items-start text-center text-sm-start">
                    {/* Profile Picture */}
                    <div style={{ marginTop: '40px' }}>
                      <div
                        className="avatar avatar-xxl mt-n5 mb-3"
                        onClick={() => {
                          if (user?.id === id) setShowModal(true);
                        }}
                        style={{ cursor: 'pointer' }}
                      >
                        {skeletonLoading ? (
                          <Skeleton circle width={120} height={120} baseColor={skeletonBaseColor} highlightColor={skeletonHighlightColor} />
                        ) : (
                          <ImageZoom
                            src={profile.profileImgUrl || avatar7}
                            width={'120px'}
                            height={'120px'}
                            zoom={profile?.personalDetails?.zoomProfile}
                            rotate={profile?.personalDetails?.rotateProfile}
                          />
                        )}
                      </div>
                    </div>
                    {/* Name and Bio */}
                    <div className="ms-sm-4 mt-sm-3">
                      <h1 className="mb-0 h5 d-flex align-items-center">
                        {profile?.personalDetails?.firstName ? (
                          profile.personalDetails.firstName
                        ) : (
                          <Skeleton width={90} baseColor={skeletonBaseColor} highlightColor={skeletonHighlightColor} />
                        )}
                        &nbsp;
                        {profile?.personalDetails?.lastName ? (
                          profile.personalDetails.lastName
                        ) : (
                          <Skeleton width={60} baseColor={skeletonBaseColor} highlightColor={skeletonHighlightColor} />
                        )}
                        &nbsp;
                        <BsPatchCheckFill className="text-success small" />
                      </h1>
                      {/* <p>
                        {!skeletonLoading ? (
                          `${profile.connectionsCount} connections`
                        ) : (
                          <Skeleton width={80} baseColor={skeletonBaseColor} highlightColor={skeletonHighlightColor} />
                        )}
                      </p> */}
                      <ul className="list-unstyled">
                        <li>
                          <BsBriefcase className="me-1" />
                          {profile?.personalDetails?.occupation
                            ? profile?.personalDetails?.occupation.replace(/^entrepreneur$/i, 'Entrepreneur')
                            : user.userRole.replace(/^entrepreneur$/i, 'Entrepreneur')}
                        </li>
                        <li>
                          <BsGeoAlt className="me-1" />
                          {profile?.personalDetails?.permanentAddress?.city ? profile?.personalDetails?.permanentAddress?.city : user.country}{' '}
                          {profile?.personalDetails?.permanentAddress?.state}
                        </li>
                      </ul>
                    </div>
                    <div className="d-flex mt-3 justify-content-center ms-sm-auto">
                      {user?.id === id ? (
                        <>
                          <Button variant="primary" className="me-2" type="button">
                            Get Verified
                          </Button>
                          <Button variant="danger-soft" className="me-2" type="button" onClick={() => navigate('/settings/account')}>
                            <BsPencilFill size={19} className="pe-1" />
                          </Button>
                        </>
                      ) : !profile.connectionsStatus ? (
                        <>
                          {
                            <Button
                              variant={sent ? 'success-soft' : 'success-soft'}
                              className="me-2"
                              type="button"
                              onClick={() => {
                                UserRequest(profile?.personalDetails?.id)
                                setSent(true)
                              }}
                              disabled={loading || sent}>
                              {loading ? (
                                <Loading size={15} loading={true} />
                              ) : sent && profile.connectionsStatus != 'Blocked' ? (
                                <>
                                  <FaUserCheck size={19} className="pe-1" /> Request Sent
                                </>
                              ) : (
                                !skeletonLoading && (
                                  <>
                                    <FaUserPlus size={19} className="pe-1" /> Send Connection Request
                                  </>
                                )
                              )}
                            </Button>
                          }
                        </>
                      ) : (
                        <>
                          <Button
                            variant={
                              profile.connectionsStatus === 'pending'
                                ? 'warning-soft'
                                : profile.connectionsStatus === 'accepted'
                                  ? 'success-soft'
                                  : profile.connectionsStatus === 'rejected' || profile.connectionsStatus === 'Blocked'
                                    ? 'danger-soft'
                                    : 'secondary-soft'
                            }
                            className="me-2"
                            type="button"
                          >
                            {profile.connectionsStatus === 'accepted' ? (
                              <>
                                <MessageCircleMore className="me-2 text-dark-green" /> Send Message
                              </>
                            ) : (
                              (profile.connectionsStatus === 'Blocked' && profile.unblockOption !== true) ? "You are blocked from viewing this profile" : profile.connectionsStatus
                            )}
                          </Button>
                          {(profile.connectionsStatus === 'Blocked' && profile.unblockOption === true) && <Button onClick={handleUnblock}>
                            Unblock
                          </Button>}
                        </>

                      )}
                      {user?.id !== id && profile.connectionsStatus !== 'Blocked' && (
                        <div>
                          <button
                            className="btn btn-light border px-4 py-2 fw-semibold text-secondary"
                            onClick={() => setModalOpen(true)}>
                            More
                          </button>
                          {modalOpen && user?.id && id && <ReportBlockModal show={modalOpen} handleClose={() => setModalOpen(false)} userId={user.id} targetId={id} />}
                        </div>
                      )}
                    </div>
                  </div>
                  <ul className="list-inline mb-0 text-center text-sm-start mt-3 mt-sm-0">
                    <li className="list-inline-item">
                      {/* <BsBriefcase className="me-1" /> {profile?.personalDetails?.occupation ? profile?.personalDetails?.occupation.replace(/^entrepreneur$/i, 'Entrepreneur') : user.userRole.replace(/^entrepreneur$/i, 'Entrepreneur')} */}
                    </li>
                    <li className="list-inline-item">
                      {/* <BsGeoAlt className="me-1" />{' '}
                      {profile?.personalDetails?.permanentAddress?.city ? profile?.personalDetails?.permanentAddress?.city : user.country}{' '}
                      {profile?.personalDetails?.permanentAddress?.state} */}
                    </li>
                    {/* <li className="list-inline-item">
                      <BsCalendar2Plus className="me-1" /> Joined on :  {formatDate(user.createdAt)}
                      {profile?.personalDetails?.createdAt &&
                        formatDate(profile.personalDetails?.createdAt)}
                    </li> */}
                  </ul>
                  {/* <button>Hello</button> */}
                </CardBody>
                {profile.connectionsStatus !== 'Blocked' && (<CardFooter className="card-footer mt-3 pt-2 pb-0">
                  <ul className="nav nav-bottom-line align-items-center justify-content-center justify-content-md-start mb-0 border-0">
                    {PROFILE_MENU_ITEMS.map((item, idx) => (
                      <li className="nav-item" key={idx}>
                        <Link className={clsx('nav-link', { active: pathname === item.url })} to={item.url ?? ''}>
                          {item.label} {item.badge && <span className="badge bg-success bg-opacity-10 text-success small">{item.badge.text}</span>}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </CardFooter>)}
              </Card>
              {profile.connectionsStatus !== 'Blocked' && (<div className="w-100" style={{}}>
                <Suspense fallback={<FallbackLoading />}>{children}</Suspense>
              </div>)}
            </Col>

            {/* Sidebar Section */}
            <Col md={12} lg={3}>
              <Row>
                <Col md={6} lg={12}>
                  <Followers />
                </Col>
                <Col md={6} lg={12}>
                  <Experience />
                </Col>
              </Row>
            </Col>
          </Row>
        </main>
      </div>
      <div className="d-none d-lg-block">
        <a
          onClick={messagingOffcanvas.toggle}
          style={{ marginRight: '76px', width: '85px', height: '45px', backgroundColor: '#0c59bd' }}
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
            <BsChatLeftTextFill /> Chat
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
  )
}
export default ProfileLayout
