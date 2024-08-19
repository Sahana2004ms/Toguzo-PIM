import React, { useState, useRef, useEffect } from 'react';
import Magnifier from "../assets/Images/OrdersPage/Magnifer.svg";
import Arrow from "../assets/Images/Orders/Arrow.svg";
import "../Fonts.css";  // Ensure this includes your custom fonts and the styles above
import AllOrders from "../Components/orders/AllOrders";
import Pending from "../Components/orders/Pending";
import ReadyToShip from "../Components/orders/ReadyToShip";
import Shipped from "../Components/orders/Shipped";
import Cancelled from "../Components/orders/Cancelled";
import "../Components/Orders.css"

const Orders = () => {
  const [activeSection, setActiveSection] = useState('AllOrders');
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false);
  const [selectedOrderType, setSelectedOrderType] = useState('All');
  const [selectedDate, setSelectedDate] = useState(null);

  const statusDropdownRef = useRef(null);
  const dateDropdownRef = useRef(null);

  const handleStatusDropdownToggle = () => {
    setIsStatusDropdownOpen(prevState => !prevState);
    setIsDateDropdownOpen(false);
  };

  const handleDateDropdownToggle = () => {
    setIsDateDropdownOpen(prevState => !prevState);
    setIsStatusDropdownOpen(false);
  };

  const handleStatusSelection = (type) => {
    setSelectedOrderType(type);
    setIsStatusDropdownOpen(false);
  };

  const handleDateSelection = (date) => {
    setSelectedDate(date);
    setIsDateDropdownOpen(false);
  };

  const handleClickOutside = (event) => {
    if (statusDropdownRef.current && !statusDropdownRef.current.contains(event.target)) {
      setIsStatusDropdownOpen(false);
    }
    if (dateDropdownRef.current && !dateDropdownRef.current.contains(event.target)) {
      setIsDateDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const renderContent = () => {
    switch (activeSection) {
      case 'AllOrders':
        return <AllOrders selectedOrderType={selectedOrderType} selectedDate={selectedDate} />;
      case 'Pending':
        return <Pending selectedOrderType={selectedOrderType} selectedDate={selectedDate} />;
      case 'ReadyToShip':
        return <ReadyToShip selectedOrderType={selectedOrderType} selectedDate={selectedDate} />;
      case 'Shipped':
        return <Shipped selectedOrderType={selectedOrderType} selectedDate={selectedDate} />;
      case 'Cancelled':
        return <Cancelled selectedOrderType={selectedOrderType} selectedDate={selectedDate} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <div style={{ position: "relative", display: "flex", marginTop: 15, margin: 20, height: 70, backgroundColor: "white", alignItems: "center", borderRadius: 8 }}>
        <input
          style={{ marginRight: 20, width: "52%", height: 37, marginLeft: 20, border: "1px solid #CBCDCD", borderRadius: 8, paddingLeft: 40, marginTop: 2, outline: "none" }}
          className="order-input"
          type="text"
          placeholder="Order ID or Name"
        />
        <img
          src={Magnifier}
          alt="Magnifier"
          style={{
            position: "absolute",
            left: 30,
            top: "50%",
            transform: "translateY(-50%)",
            pointerEvents: "none",
          }}
        />

        {/* Change Order Status Dropdown */}
        <div
          ref={statusDropdownRef}
          style={{ width: "20%", height: 40, border: "1px solid #CBCDCD", borderRadius: 8, fontSize: 14, alignItems: "center", display: "flex", color: "#7C7E7E", fontFamily: "Nunito-Medium", justifyContent: "space-between", paddingLeft: 14, paddingRight: 14, outline: "none", cursor: 'pointer' }}
          onClick={handleStatusDropdownToggle}
        >
          {selectedOrderType === 'All' ? 'Change Order Status' : selectedOrderType}
          <img src={Arrow} alt="Arrow" />
        </div>

        {/* Status Dropdown Options */}
        {isStatusDropdownOpen && (
          <div ref={statusDropdownRef} style={{
            position: "absolute",
            top: 60,
            right: 170,
            width: "23%",
            border: "1px solid #CBCDCD",
            borderRadius: 8,
            backgroundColor: "white",
            zIndex: 1
          }}>
            <div onClick={() => handleStatusSelection('All')} className="option">
              <div style={{ fontFamily: "Nunito-Medium", fontSize: 14, marginLeft: 9 }}>All</div>
            </div>
            <div onClick={() => handleStatusSelection('Single Buy')} className="option">
              <div style={{ fontFamily: "Nunito-Medium", fontSize: 14, marginLeft: 8 }}>Single Buy</div>
            </div>
            <div onClick={() => handleStatusSelection('Group Buy')} className="option">
              <div style={{ fontFamily: "Nunito-Medium", fontSize: 14, marginLeft: 8 }}>Group Buy</div>
            </div>
          </div>
        )}

        {/* Order Date Dropdown */}
        <div 
          ref={dateDropdownRef}
          style={{ marginLeft: 20, width: "10%", height: 40, border: "1px solid #CBCDCD", borderRadius: 8, fontSize: 14, alignItems: "center", display: "flex", color: "#7C7E7E", fontFamily: "Nunito-Medium", justifyContent: "space-between", paddingLeft: 14, paddingRight: 14 }}
          onClick={handleDateDropdownToggle}>
          Order Date
          <img src={Arrow} alt="Arrow" />
        </div>

        {/* Date Dropdown Options */}
        {isDateDropdownOpen && (
          <div ref={dateDropdownRef}  style={{
            position: "absolute",
            top: 60,
            right: 20,
            width: "13%",
            border: "1px solid #CBCDCD",
            borderRadius: 8,
            backgroundColor: "white",
            zIndex: 1
          }}>
            {['Today', 'Yesterday', 'This Week','Last 7 days','Last week', 'This Month','Last 30 days','Last Month','Custom range'].map(date => (
              <div 
                key={date} 
                className="option"
                style={{ padding: 10, cursor: 'pointer', display: "flex" }} 
                onClick={() => handleDateSelection(date)}
              >
                {date}
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ margin: 20, backgroundColor: "white", padding: 20, borderRadius: 8 }}>
        <div style={{ fontFamily: "Nunito-SemiBold", fontSize: 14, display: "flex" }}>
          {['AllOrders', 'Pending', 'ReadyToShip', 'Shipped', 'Cancelled'].map(section => (
            <div key={section} style={{ margin: 12, cursor: 'pointer', color: activeSection === section ? '#347B72' : '#000', position: 'relative' }} onClick={() => setActiveSection(section)}>
              {section.replace(/([A-Z])/g, ' $1')}
              {activeSection === section && (
                <div style={{
                  position: 'absolute',
                  bottom: -13,
                  left: 0,
                  right: 0,
                  height: 1.2,
                  backgroundColor: '#347B72'
                }} />
              )}
            </div>
          ))}
        </div>
        <div style={{ height: 1, backgroundColor: "#E5E6E6", width: "100%" }}></div>

        {/* Render content based on activeSection */}
        {renderContent()}
      </div>
    </div>
  );
};

export default Orders;
