
import { lazy, Suspense } from 'react'
import { settingPanelLinksData } from '@/assets/data/layout'
import SettingPanel from '@/components/layout/SettingPanel'
import { useLayoutContext } from '@/context/useLayoutContext'
import useViewPort from '@/hooks/useViewPort'
const TopHeader = lazy(() => import("@/components/layout/TopHeader"))
import type { ChildrenType } from '@/types/component'
import { Col, Container, Dropdown, DropdownDivider, DropdownItem, DropdownMenu, DropdownToggle, Offcanvas, OffcanvasBody, OffcanvasHeader, OffcanvasTitle, Row } from 'react-bootstrap'
import { FaSlidersH } from 'react-icons/fa'
import FallbackLoading from '@/components/FallbackLoading'
import Preloader from '@/components/Preloader'
import { BsBell, BsChatLeftTextFill, BsCheckSquare, BsGear, BsPencilSquare, BsPeople, BsSlashCircle, BsThreeDots, BsVolumeUpFill } from 'react-icons/bs'
import { FaXmark } from 'react-icons/fa6'
import Messaging from '@/components/layout/Messaging'
import { useUnreadMessages } from '@/context/UnreadMessagesContext'

const SettingLayout = ({ children }: ChildrenType) => {
  const { width } = useViewPort()
  const { messagingOffcanvas, startOffcanvas } = useLayoutContext()
  const { unreadMessages } = useUnreadMessages()
  const count = unreadMessages.length;
  return (
    <>
    <div style={{marginLeft:"4.5%", width:"94.5%",backgroundColor : 'white' }}>
      <Suspense fallback={<FallbackLoading />}>
        <TopHeader />
      </Suspense>
      <main style={{backgroundColor : 'white'}}>
        
          <Row>
            <Col lg={3}>
              <div className="d-flex align-items-center mb-4 d-lg-none" >
                <button
                  onClick={startOffcanvas.toggle}
                  className="border-0 bg-transparent"
                  type="button"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasNavbar"
                  aria-controls="offcanvasNavbar">
                  <span className="btn btn-primary">
                    <FaSlidersH />
                  </span>
                  <span className="h6 mb-0 fw-bold d-lg-none ms-2">Settings</span>
                </button>
              </div>
              <nav className="navbar navbar-light navbar-expand-lg mx-0">
                {width >= 992 ? (
                  <div className="p-0">
                    <SettingPanel links={settingPanelLinksData} />
                  </div>
                ) : (
                  <Offcanvas show={startOffcanvas.open} onHide={startOffcanvas.toggle} placement="start" tabIndex={-1} id="offcanvasNavbar">
                    <OffcanvasHeader closeButton />
                    <OffcanvasBody className="p-0">
                      <div>
                        <SettingPanel links={settingPanelLinksData} />
                      </div>
                    </OffcanvasBody>
                  </Offcanvas>
                )}
              </nav>
            </Col>
            <Col lg={6} className="vstack gap-4">
              <div className="tab-content py-0 mb-0" style={{marginRight:"60px"}}>
                <Suspense fallback={<Preloader/>}>
                  {children}
                </Suspense>
              </div>
            </Col>
          </Row>
        
      </main>
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
    </div>
    
    </>
  )
}
export default SettingLayout
