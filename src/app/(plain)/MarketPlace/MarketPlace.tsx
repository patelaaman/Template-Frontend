import React, { useState, useEffect } from 'react';
import { useAuthContext } from '@/context/useAuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { Building2, MapPin, Users, DollarSign, TrendingUp, PiggyBank , Trash2 } from 'lucide-react';
import ProfilePanel from '@/components/layout/ProfilePanel';
import { profilePanelLinksData1 } from '@/assets/data/layout';
import SimplebarReactClient from '@/components/wrappers/SimplebarReactClient';
import axios from 'axios';
import MarketplaceCard from './MarketplaceCard';
import TopHeader from '@/components/layout/TopHeader';
import { LIVE_URL } from '@/utils/api';
import { useLayoutContext } from '@/context/useLayoutContext';
import { useUnreadMessages } from '@/context/UnreadMessagesContext';
import { BsBell, BsChatLeftTextFill, BsCheckSquare, BsGear, BsPencilSquare, BsPeople, BsSlashCircle, BsThreeDots, BsVolumeUpFill } from 'react-icons/bs';
import { Dropdown, DropdownDivider, DropdownItem, DropdownMenu, DropdownToggle, Offcanvas, OffcanvasHeader, OffcanvasTitle } from 'react-bootstrap';
import { FaXmark } from 'react-icons/fa6';
import Messaging from '@/components/layout/Messaging';


// eslint-disable-next-line no-sparse-arrays
const categories = [
    'SaaS', 'Mobile App',"Shopify app",, 'E-commerce', "Marketplace",'Agency'
    , 
];

const MarketPlace = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  // console.log("user" , user)
  const [myBusinessData, setMyBusinessData] = useState([]);
  const [allBusinessData, setAllBusinessData] = useState([]);
  const [Wishlists, setWishlists] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeTab, setActiveTab] = useState('exploreMore');
  const [loading, setLoading] = useState(true);
  const isMyBusiness = activeTab === 'myBusiness';
  const isMyWishlist = activeTab === 'myWishlist'

  const { messagingOffcanvas, startOffcanvas } = useLayoutContext()
    const { unreadMessages } = useUnreadMessages()
    const count = unreadMessages.length;

    useEffect(() => {
    console.log('Use Effect Called');

    






    const fetchMyBusiness = async () => {
      // console.log(user?.id)
      if (user?.id) {
        try {
          const response = await fetch(`${LIVE_URL}api/v1/businessseller/detail/${user?.id}`);
          const data = await response.json();
          
          setMyBusinessData(Array.isArray(data) ? data : [data]);
        } catch (error) {
          console.error("Error fetching my business data:", error);
          setMyBusinessData([]);
        }
      }
    };
    // console.log("my business data" , myBusinessData.length)

    const fetchAllBusiness = async () => {
      try {
        const response = await fetch(`${LIVE_URL}api/v1/businessseller/getall`);
        const result = await response.json();
        if (result.success && Array.isArray(result.data)) {
          const validBusinesses = result.data.filter(business => 
            business.businessName !== null && business.businessType !== null
          );
          setAllBusinessData(validBusinesses);
        } else {
          setAllBusinessData([]);
        }
      } catch (error) {
        setAllBusinessData([]);
      }
    };


 const fetchWishlist = async() => {
  const response = await fetch(`${LIVE_URL}api/v1/wishlists/getall/${user?.id}`)
  const result = await response.json();
  setWishlists(result)
  console.log("-------WISHLISTS-------" , Wishlists)
  console.log(result)
 }


    const fetchData = async () => {
      setLoading(true);
     
        await Promise.all([fetchAllBusiness(),fetchMyBusiness() , fetchWishlist()]);
        console.log('---all  Business---',allBusinessData);
        console.log('---all My business---',myBusinessData)
      setLoading(false);
    };

    fetchData();
  }, [activeTab, user.id]);

  const getCurrentData = () => {
    if (isMyBusiness) {
      if (!myBusinessData.length || !myBusinessData[0]?.data) {
        return []; // Return empty array if no data is available
      }
      return myBusinessData[0].data;
    }
  
    if (isMyWishlist) {
      return Wishlists?.data?.flatMap(item => item.Wishlistdata) || [];
    }
  
    return selectedCategory === 'All' 
      ? allBusinessData 
      : allBusinessData.filter(business => business.industry === selectedCategory);
  };
  

  const formatCurrency = (value) => value ? (value.startsWith('$') ? value : `$${value}`) : 'N/A';

  const tabStyle = (isActive) => ({
    padding: '12px 24px',
    cursor: 'pointer',
    borderBottom: isActive ? '3px solid #0d6efd' : '3px solid transparent',
    color: isActive ? '#0d6efd' : '#6c757d',
    marginRight: '24px',
    transition: 'all 0.3s ease',
    fontSize: '1rem',
    fontWeight: isActive ? '600' : '500',
    backgroundColor: 'transparent',
    border: 'none',
  });

  const MetricBox = ({ icon: Icon, label, value }) => (
    <div style={{ 
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      padding: '0.75rem 1rem',
      backgroundColor: '#f8f9fa',
      borderRadius: '8px',
      flex: 1 
    }}>
      <Icon style={{ width: '1.25rem', height: '1.25rem', color: '#0d6efd' }} />
      <div>
        <div style={{ fontSize: '0.75rem', color: '#6c757d' }}>{label}</div>
        <div style={{ fontSize: '1rem', fontWeight: '600', color: '#212529' }}>{value}</div>
      </div>
    </div>
  );
  // console.log('My Business Data:', myBusinessData);
  // console.log('All Business Data:', allBusinessData);
  
  return (
    <>
       <div style={{backgroundColor : "#f8f9fa"}}>
<TopHeader></TopHeader>


    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' , marginTop: "50px",  width:"94.5%", marginLeft:"43px"}}>
     
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3" style={{ 
            backgroundColor: '#f8f9fa', 
            padding: '2rem',
            borderRight: '1px solid #dee2e6',
            minHeight: '100vh'
          }}>
    
          <SimplebarReactClient className="offcanvas-start" style={{marginBottom : "20px", backgroundColor: "#f8f9fa"}}>
          <ProfilePanel links={profilePanelLinksData1} />
          </SimplebarReactClient>              
        </div>
        <div className="col-md-9" style={{ padding: '2rem' }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              marginBottom: '2rem' 
            }}>
              <h1 style={{ fontSize: '1.75rem', fontWeight: '600', margin: 0 }}>Acquireroom </h1>
              <button 
                className="btn btn-primary"
                style={{
                  padding: '0.75rem 1.5rem',
                  borderRadius: '8px',
                  fontWeight: '500'
                }}
                onClick={() => navigate('/business-seller')}
              >
                List Your Business
              </button>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <label style={{ marginBottom: '0.5rem', display: 'block' }}>Sort By Category</label>
              <select 
                className="form-select"
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
                style={{
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: '1px solid #dee2e6',
                  backgroundColor: 'white'
                }}
              >
                <option value="All">All Categories</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div style={{ 
              display: 'flex',
              borderBottom: '1px solid #dee2e6',
              marginBottom: '2rem'
            }}>
              <button
                style={tabStyle(activeTab === 'exploreMore')}
                onClick={() => setActiveTab('exploreMore')}
              >
                Explore More
              </button>

              <button
                style={tabStyle(activeTab === 'myBusiness')}
                onClick={() => setActiveTab('myBusiness')}
              >
                My Listing
              </button> 

              <button
                style={tabStyle(activeTab === 'myWishlist')}
                onClick={() => setActiveTab('myWishlist')}
              >
                WishList
              </button>

             
            </div>

            {loading ? (
              <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '200px' 
              }}>
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <div className="row g-4">
                {getCurrentData().map((business) => {
                  return <MarketplaceCard business={business} key={business.id} isMyBusiness={isMyBusiness}   isMyWishlist={isMyWishlist}/>
                })}
                {getCurrentData().length === 0     && (
                  <div style={{ 
                    textAlign: 'center',
                    padding: '3rem',
                    backgroundColor: 'white',
                    borderRadius: '12px',
                    width: '100%'
                  }}>
                    <h4 style={{ color: '#6c757d', margin: 0 }}>
                      {isMyBusiness 
                        ? "You haven't registered any businesses yet" 
                        : "No businesses available to explore"}
                    </h4>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .hover-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .hover-bg-light:hover {
          background-color: #f8f9fa;
        }
      `}</style>
    </div>
      </div>
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
                  <BsThreeDots/>
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

export default MarketPlace ;
