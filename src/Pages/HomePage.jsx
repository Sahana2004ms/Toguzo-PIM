import React, { useState, useRef, useEffect } from 'react';
import "../Pages/HomePage.css";
import "../App.css";
import "../Fonts.css";
import Logo from "../assets/Images/Orders/Logo.svg";
import UserLogo from "../assets/Images/Orders/UserLogo.svg";
import Home from "../assets/Images/Orders/Home.svg";
import Order from "../assets/Images/Orders/Order.svg";
import Inventory from "../assets/Images/Orders/Inventory.svg";
import Products from "../assets/Images/Orders/Products.svg";
import Return from "../assets/Images/Orders/Return.svg";
import Analytics from "../assets/Images/Orders/Analytics.svg";
import Payment from "../assets/Images/Orders/Payment.svg";
import CustomerReview from "../assets/Images/Orders/CustomerReview.svg";
import Advertisement from "../assets/Images/Orders/Advertisement.svg";
import HelpCenter from "../assets/Images/Orders/HelpCenter.svg";
import LogOut from "../assets/Images/Orders/LogOut.svg";
import Setting from "../assets/Images/Orders/Setting.svg";
import Notification from "../assets/Images/Orders/Notification.svg";
import QA from "../assets/Images/Orders/QA.svg";
import Arrow from "../assets/Images/Orders/Arrow.svg";
import ProfilePopup from '../Components/Profile'; 
import HomeContent from '../Components/HomeContent';
import Orders from "../Components/Orders";
import HelpCenter2 from "../assets/Images/Orders/HelpCenter2.svg";
import ChatLine from "../assets/Images/Orders/ChatLine.svg";

const menuItems = [
  { href: "/home", icon: Home, label: "Home", heading: "Home" },
  { href: "/orders", icon: Order, label: "Orders", heading: "Orders" },
  { href: "/inventory", icon: Inventory, label: "Inventory", heading: "Inventory" },
  { href: "/products", icon: Products, label: "Products", heading: "Products" },
  { href: "/return", icon: Return, label: "Return/RTO", heading: "Return" },
  { href: "/analytics", icon: Analytics, label: "Analytics", heading: "Analytics" },
  { href: "/payments", icon: Payment, label: "Payment", heading: "Payment" },
  { href: "/customer-review", icon: CustomerReview, label: "Customer Review", heading: "Customer Review" },
  { href: "/advertisement", icon: Advertisement, label: "Advertisement", heading: "Advertisement" },
  { href: "/help-center", icon: HelpCenter, label: "Help Center", heading: "Help Center" },
];

const HomePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentHeading, setCurrentHeading] = useState('Home');
  const [contentComponent, setContentComponent] = useState(<HomeContent />); // Default to HomeContent
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // For QA dropdown
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(prevState => !prevState);
  };

  const handleMenuClick = (heading) => {
    setCurrentHeading(heading);
    setIsOpen(false);
    if (heading === 'Orders') {
      setContentComponent(<Orders />);
    } else {
      setContentComponent(<HomeContent />);
    }
  };

  const handleClick = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      {/* Fixed Sidebar */}
      <div className='Sidebar'>
        <div className='HeadingContainer'>
          <div className='Heading'>
            <img src={Logo} alt='Logo' style={{ width: '45%', height: 'auto' }} />
          </div>
          <div className='SideHeading'>
            <img src={UserLogo} alt='UserLogo' style={{ width: '15%' }} />
            <div style={{ width: 73, height: 20, color: "white", marginLeft: 8, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontFamily: "Nunito-SemiBold", fontWeight: 600, fontStyle: "normal", fontSize: 14 }}>
              Rogr fashion
            </div>
          </div>
        </div>

        <div className='MenuItems'>
          {menuItems.map((item) => (
            <div className='Elements' key={item.label} onClick={() => handleMenuClick(item.heading)}>
              <a href="#" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'white', fontSize: 14 }}>
                <img src={item.icon} alt={item.label} style={{ marginLeft: 8 }} />
                <p style={{ marginLeft: 8 }}>{item.label}</p>
              </a>
            </div>
          ))}
        </div>

        <div className='SettingsLogoutContainer' style={{ position: "absolute", bottom: 24, left: 0, right: 0 }}>
          <div className='SettingsContainer' style={{ height: 35, alignItems: "center", display: 'flex', paddingLeft: 19, marginBottom: 5 }}>
            <a href="/settings" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'white' }}>
              <img src={Setting} alt="Settings" />
              <p style={{ marginLeft: 8, fontSize: 14 }}>Settings</p>
            </a>
          </div>

          <div className='LogoutContainer' style={{ height: 35, alignItems: "center", display: 'flex', paddingLeft: 19 }}>
            <a href="/LogOut" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'white' }}>
              <img src={LogOut} alt="LogOut" />
              <p style={{ marginLeft: 8, fontSize: 14 }}>Log Out</p>
            </a>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{ marginLeft: 224, width: "100%", backgroundColor: "#F2F3F3" }}>
        <div className='Headingt' style={{ height: 50, width: "100%", display: "flex", backgroundColor: "white", justifyContent: "space-between", alignItems: "center" }}>
          <p style={{ color: "Black", fontSize: 18, paddingLeft: 30, fontFamily: "Nunito-SemiBold" }}>{currentHeading}</p>
          <div style={{ alignItems: 'center', justifyContent: "center", display: 'flex' }}>
            <img src={Notification} alt='Notification' />
            <img src={QA} onClick={handleDropdownToggle} alt='QA' style={{ marginLeft: 6 }} />
            {isDropdownOpen && (
              <div ref={dropdownRef} className="dropdown" style={{
                position: "absolute",
                top: 50,
                right: 210,
                width: "15%",
                border: "1px solid #CBCDCD",
                borderRadius: 8,
                backgroundColor: "white",
                zIndex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}>
                <div style={{ padding: 9, cursor: 'pointer', display: "flex" }}>
                  <img src={ChatLine} alt="ChatLine" />
                  <div style={{ fontFamily: "Nunito-SemiBold", color: "black", fontSize: 14, marginLeft: 8 }}> Chat with us</div>
                </div>
                <div style={{ padding: 9, cursor: 'pointer', display: "flex" }}>
                  <img src={HelpCenter2} alt="HelpCenter2" />
                  <div style={{ fontFamily: "Nunito-SemiBold", color: "black", fontSize: 14, marginLeft: 8 }}> Help Center</div>
                </div>
              </div>
            )}
            <div style={{ display: 'flex', borderLeft: '1px solid #DDD', marginLeft: 6, marginRight: 16, height: 35 }} />
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", paddingRight: 30 }} onClick={handleClick}>
              <div className="avatar-container"></div>
              <p style={{ fontFamily: "Nunito-SemiBold", fontSize: 16, color: "black", marginRight: 6 }}>Mahesh</p>
              <img src={Arrow} alt="Arrow" style={{ marginLeft: 8, marginRight: 6 }} />
            </div>
            <ProfilePopup isOpen={isOpen} onClose={handleClose} />
          </div>
        </div>
        {contentComponent}
      </div>
    </div>
  );
}

export default HomePage;
