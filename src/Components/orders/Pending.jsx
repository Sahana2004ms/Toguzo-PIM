import React, { useState } from 'react';
import Product from "../../assets/Images/OrdersPage/Product.svg";
import Arrow from "../../assets/Images/Orders/Arrow.svg";
import CancelIcon from "../../assets/Images/OrdersPage/CancelIcon.svg"

const orders = [
  {
    orderId: '#125465',
    product: {
      name: 'Winter jacket-OC1486',
      category: 'Womens Fashion',
      image: Product,
    },
    orderType: 'Single Buy',
    orderDate: '10 Mar 2024',
    productId: '#125465',
    qty: 50,
    payment: 'Pre-Paid',
  },
  {
    orderId: '#125466',
    product: {
      name: 'Winter jacket-OC1486',
      category: 'Womens Fashion',
      image: Product,
    },
    orderType: 'Group Buy',
    orderDate: '11 Mar 2024',
    productId: '#125466',
    qty: 50,
    payment: 'Pre-Paid',
  },
  {
    orderId: '#125467',
    product: {
      name: 'Winter jacket-OC1486',
      category: 'Womens Fashion',
      image: Product,
    },
    orderType: 'Group Buy',
    orderDate: '11 Mar 2024',
    productId: '#125467',
    qty: 50,
    payment: 'COD',
  },
];

const Pending = ({ selectedOrderType, selectedDate }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const handleCancelClick = (orderId) => {
    setSelectedOrderId(orderId);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedOrderId(null);
  };

  const handleConfirmCancel = () => {
    // Implement your cancel order logic here
    console.log(`Order ${selectedOrderId} canceled.`);
    handleCloseModal();
  };

  const filteredOrders = orders.filter(order => {
    const matchesOrderType = selectedOrderType && selectedOrderType !== 'All' ? order.orderType === selectedOrderType : true;
    const matchesDate = selectedDate ? order.orderDate === selectedDate : true; // Simple date matching; modify as needed
    return matchesOrderType && matchesDate;
  });

  return (
    <div>
      <div style={{ maxHeight: '400px', overflowY: 'scroll', scrollbarWidth: "none", msOverflowStyle: "none" }}>
        <div style={{ display: "flex", marginTop: 12, alignItems: "center" }}>
          <p style={{ fontFamily: "Nunito-Medium", fontSize: 16, paddingRight: 20 }}>Filters</p>
          <div style={{ width: "23%", height: 40, border: "1px solid #CBCDCD", borderRadius: 8, fontSize: 14, alignItems: "center", display: "flex", color: "#7C7E7E", fontFamily: "Nunito-Medium", justifyContent: "space-between", paddingLeft: 14, paddingRight: 14 }}>
            Expected Delivery Date
            <img src={Arrow} alt="Arrow" />
          </div>
          <div style={{ marginLeft: 20, width: "15%", height: 40, border: "1px solid #CBCDCD", borderRadius: 8, fontSize: 14, alignItems: "center", display: "flex", color: "#7C7E7E", fontFamily: "Nunito-Medium", justifyContent: "space-between", paddingLeft: 14, paddingRight: 14 }}>
            Created Date
            <img src={Arrow} alt="Arrow" />
          </div>
          <div style={{ marginLeft: 20, width: "15%", height: 40, border: "1px solid #CBCDCD", borderRadius: 8, fontSize: 14, alignItems: "center", display: "flex", color: "#7C7E7E", fontFamily: "Nunito-Medium", justifyContent: "space-between", paddingLeft: 14, paddingRight: 14 }}>
            Category
            <img src={Arrow} alt="Arrow" />
          </div>
        </div>

        <div style={{ backgroundColor: "#F2F3F3", marginTop: 20, display: "flex", fontFamily: "Nunito-SemiBold", fontSize: 14, borderRadius: 8, height: 45 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "10%" }}>Order ID</div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "29%" }}>Order</div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "12%" }}>Order Type</div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "11%" }}>Product ID</div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "8%" }}>Qty</div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "10%" }}>Payment</div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "15%" }}>Action</div>
        </div>

        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <div key={order.orderId} style={{ display: "flex", backgroundColor: "white", marginTop: 12 }}>
              <div style={{ display: "flex", height: 82, alignItems: "center", justifyContent: "center", width: "10%", fontFamily: "Nunito-Medium", fontSize: 14, color: "#1849A9", textDecoration: "underline" }}>{order.orderId}</div>
              <div style={{ display: "flex", height: 82, alignItems: "center", width: "29%", fontFamily: "Nunito-Medium", fontSize: 12 }}>
                <div style={{ height: 60, width: "25%", backgroundColor: "#F2F3F3", margin: 12 }}>
                  <img src={order.product.image} alt={order.product.name} />
                </div>
                <div style={{ marginLeft: 12 }}>
                  <p style={{ fontFamily: "Nunito-Medium", fontSize: 14 }}>{order.product.name}</p>
                  <p style={{ fontFamily: "Nunito-Medium", fontSize: 14 }}>{order.product.category}</p>
                </div>
              </div>
              <div style={{ display: "flex", height: 82, alignItems: "center", justifyContent: "center", width: "12%", fontFamily: "Nunito-Medium" }}>
                <p style={{
                  backgroundColor: order.orderType === 'Single Buy' ? '#FFEFE6' : '#EDF7F6',
                  color: order.orderType === 'Single Buy' ? '#FB6514' : '#3D8F84',
                  borderRadius: 16,
                  width: 80,
                  justifyContent: "center",
                  display: "flex",
                  fontSize: 14,
                }}>
                  {order.orderType}
                </p>
              </div>
              <div style={{ display: "flex", height: 82, alignItems: "center", justifyContent: "center", width: "10%", fontFamily: "Nunito-Medium", fontSize: 14, color: "#1849A9", textDecoration: "underline" }}>{order.productId}</div>
              <div style={{ display: "flex", height: 82, alignItems: "center", justifyContent: "center", width: "8%", fontFamily: "Nunito-Medium", fontSize: 14 }}>{order.qty}</div>
              <div style={{ display: "flex", height: 82, alignItems: "center", justifyContent: "center", width: "10%", fontFamily: "Nunito-Medium", fontSize: 14 }}>{order.payment}</div>
              <div style={{ display: "flex", height: 82, alignItems: "center", justifyContent: "center", width: "15%", fontFamily: "Nunito-Medium", fontSize: 14, justifyContent: "space-between" }}>
                <button onClick={() => handleCancelClick(order.orderId)} style={{ color: "red", border: "1px solid red", marginRight: 20, marginLeft: 10, outline: "none" }}>Cancel</button>
                <button style={{ color: "white", backgroundColor: "#347B72", outline: "none" }}>Accept</button>
              </div>
            </div>
          ))
        ) : (
          <div style={{ textAlign: 'center', marginTop: 20 }}>No orders found.</div>
        )}
      </div>

      {/* Confirmation Modal */}
      {modalOpen && (
        <div style={modalOverlayStyle}>
          <div style={modalStyle}>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <img src={CancelIcon} alt="Cancel Icon" />
            </div>
            <p style={{ fontFamily: "Nunito-SemiBold", fontSize: 16, textAlign: "center", marginBottom: 8 }}>
              Cancel Order
            </p>
            <p style={{ textAlign: "center", fontFamily: "Nunito-Medium", color: "#7C7E7E", fontSize: 14 }}>
              Are you sure you want to cancel this order?
            </p>
            <button onClick={handleConfirmCancel} style={{ height: 43, backgroundColor: "#D92C20", color: "white", width: "100%", fontFamily: "Nunito-SemiBold", fontSize: 14, outline: "none" }}>Yes, Cancel</button>
            <button onClick={handleCloseModal} style={{ height: 43, width: "100%", marginTop: 12, border: "1px solid #CBCDCD", fontFamily: "Nunito-SemiBold", fontSize: 14, outline: "none" }}>No, Don't Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

// Modal styles
const modalOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const modalStyle = {
  backgroundColor: 'white',
  padding: 20,
  borderRadius: 8,
  height: 240,
  width: "23%"
};

export default Pending;
