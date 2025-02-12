import React from 'react'
import { currentYear, developedBy, developedByLink } from '@/context/constants'
import type { ProfilePanelLink } from '@/types/data'
import { Button, Card, CardBody, CardFooter, Image } from 'react-bootstrap'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import avatar7 from '@/assets/images/avatar/default avatar.png'
import bgBannerImg from '@/assets/images/bg/Profile-Bg.jpg'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from '@/context/useAuthContext'
import { useEffect, useState } from 'react'
import { Diamond, Gem, Globe, Map, MapPin } from 'lucide-react'
import { useLayoutContext } from '@/context/useLayoutContext'
import { set } from 'react-hook-form'
import { LIVE_URL } from '@/utils/api'
import { UserProfile } from '@/app/(social)/feed/(container)/home/page'
import ImageZoom from '../cards/ImageZoom'

type ProfilePanelProps = {
  links: ProfilePanelLink[]
}

const ProfilePanel = ({ links }: ProfilePanelProps) => {
  const { user } = useAuthContext()
  const [profile, setProfile] = useState<UserProfile>({});
  const { theme } = useLayoutContext()
  const navigate = useNavigate()
  const [skeletonLoading, setSkeletonLoading] = useState(true)
  const isDarkMode = theme === 'dark'
  // console.log('----theme----', theme)
  const skeletonBaseColor = '#e3e3e3'; 
  const skeletonHighlightColor = '#f2f2f2';

  //console.log("user", user);
  useEffect(() => {
    const fetchUser = async () => {
      setSkeletonLoading(true)
      try {
        const response = await fetch(`${LIVE_URL}api/v1/auth/get-user-Profile`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: user?.id,
          }),
        })

        if (!response.ok) {
          throw new Error('Network response was not ok')
        }

        const data = await response.json()
        // console.log('data', data)
        setSkeletonLoading(false)
        setProfile(data.data)
      } catch (error) {
        console.error('Error fetching user profile:', error)
      }finally{
        setSkeletonLoading(false)
      }
    }
    if (profile.profileImgUrl) {
      return
    }
    fetchUser()
  }, [])

  // const formatDate = (dateString) => {
  //   const date = new Date(dateString)
  //   const options = {
  //     year: 'numeric',
  //     month: 'short',
  //     day: 'numeric',
  //     hour: '2-digit',
  //     minute: '2-digit',
  //     second: '2-digit',
  //     hour12: true,
  //   }
  //   return date.toLocaleString('en-GB', options).replace(',', ' at')
  // }

  return (
    <>
  <Card className="overflow-hidden">
    {/* Profile Cover Image */}
    <div className="h-90px position-relative">
      {!skeletonLoading ? (
        <div
          className="h-100 rounded-top"
          style={{
            position: "relative",
            overflow: "hidden",
            backgroundPosition: "center",
          }}
        >
          <Image
            src={profile?.coverImgUrl || bgBannerImg}
            alt="Profile Cover"
            style={{
              width: "100%",
              objectFit: "cover",
            }}
          />
        </div>
      ) : (
        <Skeleton height={50} baseColor={skeletonBaseColor} highlightColor={skeletonHighlightColor} />
      )}
    </div>

    {/* Card Body with Proper Spacing */}
    <CardBody className="pt-0 position-relative" style={{ paddingTop: "" }}>
      <div className="text-center">
        {/* Profile Image - Absolutely Centered but with Correct Spacing */}
        <Link to={`/profile/feed/${user?.id}`}>
          <div
            className="avatar avatar-lg"
            style={{
              width: "100px",
              height: "100px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "auto", // Center inside parent
              position: "relative", // No absolute positioning to avoid overlap
              marginTop: "-50px", // Moves it above the name
            }}
          >
            {skeletonLoading ? (
              <Skeleton height={90} width={90} baseColor={skeletonBaseColor} highlightColor={skeletonHighlightColor} style={{ borderRadius: "50%" }} />
            ) : (
              <ImageZoom
                src={profile.profileImgUrl || avatar7}
                width="90px"
                height="90px"
                zoom={profile.personalDetails.zoomProfile}
                rotate={profile.personalDetails.rotateProfile}
              />
            )}
          </div>
        </Link>

        {/* Profile Name & Details - Now Properly Positioned Below the Profile Pic */}
        <div style={{ marginTop: "10px" }}> 
          <h5 className="mb-2 fw-semibold">
            <Link to={`/profile/feed/${user?.id}`} className={`${isDarkMode ? "text-light" : "text-dark"} text-decoration-none`}>
              {profile.personalDetails?.firstName || user?.firstName} {profile.personalDetails?.lastName || user?.lastName}
            </Link>
          </h5>

          <p className={`fs-6 mx-1 mb-0 ${isDarkMode ? "text-light" : "text-dark"}`}>{user?.userRole}</p>
          <div className={`d-flex align-items-center justify-content-center gap-2 pb-3 ${isDarkMode ? "text-light" : "text-dark"} mb-2`}>
            <span className={`fs-6 ${isDarkMode ? "text-light" : "text-dark"}`}>{user?.country}</span>
          </div>
        </div>
      </div>

      <hr />

      {/* Navigation Links */}
      <ul className="nav nav-link-secondary flex-column fw-bold gap-2">
        {links.map((item, idx) => (
          <li key={item.name + idx} className="nav-item">
            <Link className="nav-link d-flex justify-content-center align-items-center" to={item.link}>
              {item.image && <item.image size={20} />}
              <span className="text-center" style={{ marginLeft: "8px" }}>{item.name || "Arun Jain"}</span>
            </Link>
          </li>
        ))}
      </ul>
    </CardBody>

    {/* Subscribe Section */}
    <CardFooter className="text-center">
      <div style={{ width: "100%", height: "140px" }}>
        <p className="btn btn-sm btn-link" style={{ fontSize: "17px", color: "black", fontWeight: "bold" }}>
          <span>Subscribe to Premium</span>
        </p>
        <p>Subscribe to unlock new features</p>

        <Button
          className="w-100"
          style={{
            backgroundColor: "#1ea1f3",
            color: "white",
            padding: "6px",
            marginBottom: "5px",
          }}
          onClick={() => navigate("/feed/groups")}
        >
          <Gem size={16} /> <span style={{ paddingLeft: "5px" }}>Subscribe</span>
        </Button>
      </div>
    </CardFooter>
  </Card>

  {/* Footer Links */}
  <ul className="nav small mt-4 justify-content-center lh-1">
    <li className="nav-item">
      <Link className="nav-link" to="/profile/about">
        About
      </Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link" to="/settings/account">
        Settings
      </Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link" target="_blank" rel="noreferrer" to={developedByLink}>
        Support
      </Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link" target="_blank" rel="noreferrer" to="">
        Docs
      </Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link" to="/help">
        Help
      </Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link" to="/privacy-terms">
        Privacy & Terms
      </Link>
    </li>
  </ul>

  <p className="small text-center mt-1">
    ©{currentYear}
    <a className="text-reset" target="_blank" rel="noreferrer" href={developedByLink}>
      {developedBy}
    </a>
  </p>
</>

  )
}

export default ProfilePanel
