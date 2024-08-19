import React, { useState } from 'react';
import Cancel from "../../assets/Images/Orders/Cancel.svg";
import Product from "../../assets/Images/OrdersPage/Product.svg";

const orders = [
  {
    slNo: '001',
    orderId: '#125464',
    product: {
      name: 'Winter jacket-OC1485',
      category: 'Womens Fashion',
      image: Product,
    },
    orderType: 'Group Buy',
    orderDate: '10 Mar 2024',
    productId: '#125464',
    qty: 50,
    payment: '₹ 18,428',
    status: 'Pending',
  },
  {
    slNo: '002',
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
    payment: '₹ 18,428',
    status: 'Shipped',
  },
  {
    slNo: '003',
    orderId: '#125466',
    product: {
      name: 'Winter jacket-OC1487',
      category: 'Womens Fashion',
      image: Product,
    },
    orderType: 'Group Buy',
    orderDate: '11 Mar 2024',
    productId: '#125466',
    qty: 50,
    payment: '₹ 18,428',
    status: 'In Transit',
  },
  // Add more orders as needed
];

const data = [
  { Slno: '001',CustomerName: 'John Doe', Qty: 28,Address:"No, 25, 2nd Cross Barani Nagar, Singanallur Taluk Kovai, Tamil Nadu 635489 Contact Number: 6481626544"},
  { Slno: '002',CustomerName: 'John Doe', Qty: 28,Address:"No, 25, 2nd Cross Barani Nagar, Singanallur Taluk Kovai, Tamil Nadu 635489 Contact Number: 6481626544"}
];


const getStatusStyles = (status) => {
  switch (status) {
    case 'Pending':
      return {
        backgroundColor: '#FFF1F3',
        color: '#F63D68',
      };
    case 'Shipped':
      return {
        backgroundColor: '#F2F3F3',
        color: '#212121',
      };
    case 'In Transit':
      return {
        backgroundColor: '#FEF4E6',
        color: '#F79009',
      };  
    case 'Delivered':
      return {
        backgroundColor: '#E8FDF3',
        color: '#12B76A',
      };
    default:
      return {
        backgroundColor: 'white',
        color: 'black',
      };
  }
};

const AllOrders = ({ selectedOrderType, selectedDate }) => {
  const [isSingleBuyModalOpen, setIsSingleBuyModalOpen] = useState(false);
  const [isGroupBuyModalOpen, setIsGroupBuyModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filteredOrders = orders.filter(order => {
    const matchesOrderType = selectedOrderType && selectedOrderType !== 'All' ? order.orderType === selectedOrderType : true;
    const matchesDate = selectedDate ? order.orderDate === selectedDate : true; // Simple date matching; modify as needed
    return matchesOrderType && matchesDate;
  });

  const handleClick = (order) => {
    setSelectedOrder(order);
    if (order.orderType === 'Single Buy') {
      setIsSingleBuyModalOpen(true);
    } else if (order.orderType === 'Group Buy') {
      setIsGroupBuyModalOpen(true);
    }
  };
  const handleClose = () => {
    setIsSingleBuyModalOpen(false);
    setIsGroupBuyModalOpen(false);
    setSelectedOrder(null);
  };

  const handleBackgroundClick = (e) => {
    if (e.target.classList.contains('modal-background')) {
      handleClose();
    }
  };


  return (
    <div className='Allorders' style={{ maxHeight: '400px', overflowY: 'scroll', scrollbarWidth: "none", msOverflowStyle: "none" }}>
      <div style={{ backgroundColor: "#F2F3F3", marginTop: 20, display: "flex", fontFamily: "Nunito-SemiBold", fontSize: 14, borderRadius: 8, height: 45 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "8%" }}>Sl. No.</div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "11%" }}>Order ID</div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "29%" }}>Order</div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "13%" }}>Order Type</div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "15%" }}>Order Date</div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "10%" }}>Product ID</div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "8%" }}>Qty</div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "10%" }}>Payment</div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "10%" }}>Status</div>
      </div>

      {filteredOrders.map(order => {
        const statusStyles = getStatusStyles(order.status);
        return (
          <div key={order.orderId} style={{ display: "flex", backgroundColor: "white", marginTop: 12 }}>
            <div style={{ display: "flex", height: 82, alignItems: "center", justifyContent: "center", width: "8%", fontFamily: "Nunito-Medium", fontSize: 14 }}>{order.slNo}</div>
            <div style={{ display: "flex", height: 82, alignItems: "center", justifyContent: "center", width: "11%", fontFamily: "Nunito-Medium", fontSize: 14, color: "#1849A9", textDecoration: "underline" }} onClick={() => handleClick(order)} >{order.orderId}</div>
            <div style={{ display: "flex", height: 82, alignItems: "center", width: "29%", fontFamily: "Nunito-Medium", fontSize: 12 }}>
              <div style={{ height: 60, width: "25%", backgroundColor: "#F2F3F3", margin: 12 }}>
                <img src={order.product.image} alt={order.product.name} />
              </div>
              <div style={{ marginLeft: 12 }}>
                <p style={{ fontFamily: "Nunito-Medium", fontSize: 14 }}>{order.product.name}</p>
                <p style={{ fontFamily: "Nunito-Medium", fontSize: 14 }}>{order.product.category}</p>
              </div>
            </div>
            <div style={{ display: "flex", height: 82, alignItems: "center", justifyContent: "center", width: "13%", fontFamily: "Nunito-Medium" }}>
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
            <div style={{ display: "flex", height: 82, alignItems: "center", justifyContent: "center", width: "15%", fontFamily: "Nunito-Medium", fontSize: 14 }}>{order.orderDate}</div>
            <div style={{ display: "flex", height: 82, alignItems: "center", justifyContent: "center", width: "10%", fontFamily: "Nunito-Medium", fontSize: 14, color: "#1849A9", textDecoration: "underline" }}>{order.productId}</div>
            <div style={{ display: "flex", height: 82, alignItems: "center", justifyContent: "center", width: "8%", fontFamily: "Nunito-Medium", fontSize: 14 }}>{order.qty}</div>
            <div style={{ display: "flex", height: 82, alignItems: "center", justifyContent: "center", width: "10%", fontFamily: "Nunito-Medium", fontSize: 14 }}>{order.payment}</div>
            <div style={{ display: "flex", height: 82, alignItems: "center", justifyContent: "center", width: "10%", fontFamily: "Nunito-Medium", fontSize: 14 }}>
              <p style={{
                backgroundColor: statusStyles.backgroundColor,
                color: statusStyles.color,
                borderRadius: 16,
                width: 80,
                justifyContent: "center",
                display: "flex"
              }}>
                {order.status}
              </p>
            </div>
          </div>
        );
      })}

      {/* Modal Background */}
      {(isSingleBuyModalOpen || isGroupBuyModalOpen) && (
        <div
          className="modal-background"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(99, 103, 103, 0.60)',
            zIndex: 999,
          }}
          onClick={handleBackgroundClick}
        />
      )}

      {/* Modal for Single Buy Orders */}
      {isSingleBuyModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: '40%',
          height: '100%',
          backgroundColor: '#F2F3F3',
          zIndex: 1000,
          padding: 20,
        }}>
          <div style={{ height: 50, backgroundColor: "white", display: "flex", alignItems: "center", justifyContent: "space-between", borderRadius: 8 }}>
            <p style={{ fontSize: 18, paddingLeft: 24, fontFamily: "Nunito-Bold" }}>Order Details</p>
            <img src={Cancel} alt='Cancel' onClick={handleClose} style={{ paddingRight: 16 }} />
          </div>
          {selectedOrder && (
            <div style={{ height: 500, backgroundColor: "white", marginTop: 20, borderRadius: 8, padding: 16 }}>
              <div style={{ fontFamily: "Nunito-SemiBold", fontSize: 16, height: 46, alignItems: "center", display: "flex", }}> Order ID : {selectedOrder.orderId}</div>
              <div style={{ fontFamily: "Nunito-SemiBold", fontSize: 16, marginTop: 15 }}>Product Details :</div>
              <div style={{display:"flex",marginTop: 16, fontFamily: "Nunito-SemiBold", fontSize: 14,}}>
                <div style={{marginRight:4}}>Product ID :</div>
              <div style={{color:"#1849A9",textDecoration:"underline" }}> {selectedOrder.productId} </div>
              </div>
              
              <div style={{ display: "flex", height: 82, alignItems: "center", width: "100%", fontFamily: "Nunito-Medium", fontSize: 12 }}>
                <div style={{ marginTop: 16 }}>
                  <img src={selectedOrder.product.image} alt={selectedOrder.product.name} />
                </div>
                <div style={{ marginLeft: 12, alignItems: "center" }}>
                  <p style={{ fontFamily: "Nunito-Medium", fontSize: 14, marginBottom: 8, padding: 0 }}>{selectedOrder.product.name}</p>
                  <p style={{ fontFamily: "Nunito-Medium", fontSize: 14, margin: 0, padding: 0 }}>{selectedOrder.product.category}</p>
                </div>
              </div>

              <div style={{ fontFamily: "Nunito-SemiBold", fontSize: 16, marginTop: 20 }}>Customer Details :</div>
              <div style={{ display: "flex", fontSize: 14, margin: 0, padding: 0 }}>
                <p style={{ fontFamily: "Nunito-SemiBold", marginRight: 4 }}>Name : </p>
                <p style={{ fontFamily: "Nunito-Medium" }}> Mahesh</p>
              </div>
              <div style={{ fontFamily: "Nunito-SemiBold", fontSize: 16 }}>Shipping Address :</div>
              <div style={{ width: 199, height: 60, fontFamily: "Nunito-Medium", fontSize: 14, marginTop: 8 }}>No, 25, 2nd Cross Barani Nagar, Singanallur Taluk Kovai, Tamil Nadu - 635489</div>
              <div style={{ display: "flex", fontSize: 14, margin: 0, padding: 0 }}>
                <p style={{ fontFamily: "Nunito-SemiBold", marginRight: 4 }}>Contact Number : </p>
                <p style={{ fontFamily: "Nunito-Medium" }}>7259813046</p>
              </div>
              <div style={{ fontFamily: "Nunito-SemiBold", fontSize: 16 }}>Date & Time of Order : 12 Mar 2024, 11:11 AM</div>
              <div style={{ fontFamily: "Nunito-SemiBold", fontSize: 16, marginTop: 16 }}>Payment Method : Pre-Paid (UPI)</div>
            </div>
          )}
        </div>
      )}



      {isGroupBuyModalOpen && (
  <div style={{
    position: 'fixed',
    top: 0,
    right: 0,
    width: '40%',
    height: '100%',
    backgroundColor: '#F2F3F3',
    zIndex: 1000,
    padding: 20,
  }}>
    <div style={{ height: 50, backgroundColor: "white", display: "flex", alignItems: "center", justifyContent: "space-between", borderRadius: 8 }}>
      <p style={{ fontSize: 18, paddingLeft: 24, fontFamily: "Nunito-Bold" }}>Group Order Details</p>
      <img src={Cancel} alt='Cancel' onClick={handleClose} style={{ paddingRight: 16 }} />
    </div>
    
    {selectedOrder && (
      <div style={{ height: 520, overflowY: 'auto', backgroundColor: "white", marginTop: 20, borderRadius: 8, padding: 16, scrollbarWidth: 'none',msOverflowStyle:"none" }}>
        <div style={{ fontFamily: "Nunito-SemiBold", fontSize: 16, height: 46, alignItems: "center", display: "flex" }}> Order ID : {selectedOrder.orderId}</div>
        <div style={{ fontFamily: "Nunito-SemiBold", fontSize: 16, marginTop: 20 }}>Product Details :</div>
        <div style={{display:"flex",marginTop: 16, fontFamily: "Nunito-SemiBold", fontSize: 14,}}>
                <div style={{marginRight:4}}>Product ID :</div>
              <div style={{color:"#1849A9",textDecoration:"underline" }}> {selectedOrder.productId} </div>
              </div>
        <div style={{ display: "flex", height: 82, alignItems: "center", width: "100%", fontFamily: "Nunito-Medium", fontSize: 12 }}>
          <div style={{ marginTop: 16 }}>
            <img src={selectedOrder.product.image} alt={selectedOrder.product.name} />
          </div>
          <div style={{ marginLeft: 12, alignItems: "center" }}>
            <p style={{ fontFamily: "Nunito-Medium", fontSize: 14, marginBottom: 8, padding: 0 }}>{selectedOrder.product.name}</p>
            <p style={{ fontFamily: "Nunito-Medium", fontSize: 14, margin: 0, padding: 0 }}>{selectedOrder.product.category}</p>
          </div>
        </div>
        <div style={{ fontFamily: "Nunito-SemiBold", fontSize: 16, marginTop: 20 }}>Group Details :</div>
        <div style={{ display: "flex", fontSize: 14, marginTop: 16 }}>
          <p style={{ fontFamily: "Nunito-SemiBold", marginRight: 4, margin: 0, padding: 0 }}>Group MOQ : </p>
          <p style={{ fontFamily: "Nunito-Medium", margin: 0, padding: 0 }}>50 Units</p>
        </div>
        <div style={{ display: "flex", fontSize: 14, marginTop: 8 }}>
          <p style={{ fontFamily: "Nunito-SemiBold", marginRight: 4, margin: 0, padding: 0 }}>Group Initiated on :</p>
          <p style={{ fontFamily: "Nunito-Medium", margin: 0, padding: 0 }}>12 Mar 2024, 11:11 AM</p>
        </div>
        <div style={{ display: "flex", fontSize: 14, marginTop: 8 }}>
          <p style={{ fontFamily: "Nunito-SemiBold", marginRight: 4, margin: 0, padding: 0 }}>Group Duration :</p>
          <p style={{ fontFamily: "Nunito-Medium", margin: 0, padding: 0 }}>23 Hrs (35% faster fill rate compared to other groups)</p>
        </div>
        <div style={{ fontFamily: "Nunito-SemiBold", fontSize: 16, marginTop: 16 }}>Payment Method : Pre-Paid</div>

        <div style={{ marginTop: 20 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
  <thead>
    <tr style={{ height: 40, backgroundColor: "#F2F3F3", borderRadius:4, fontFamily: "Nunito-SemiBold", fontSize: 16 }}>
      <th style={{ width: '15%',  textAlign: 'left', padding: '8px' }}>Sl. No.</th>
      <th style={{ width: '30%', textAlign: 'left', padding: '8px' }}>Customer Name</th>
      <th style={{ width: '15%',  textAlign: 'center', padding: '8px' }}>Qty</th>
      <th style={{ width: '40%',  textAlign: 'left', padding: '8px' }}>Address</th>
    </tr>
  </thead>
  <tbody>
    {data.map((user) => (
      <tr key={user.Slno} style={{fontFamily: "Nunito-Medium", fontSize: 14}}>
        <td style={{ width: "15%", borderBottom: '1px solid #ccc', padding: '8px', textAlign: 'left' }}>{user.Slno}</td>
        <td style={{ width: "30%", borderBottom: '1px solid #ccc', padding: '8px', textAlign: 'left' }}>{user.CustomerName}</td>
        <td style={{ width: "15%", borderBottom: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>{user.Qty}</td>
        <td style={{ width: "40%", borderBottom: '1px solid #ccc', padding: '8px', textAlign: 'left' }}>{user.Address}</td>
      </tr>
    ))}
  </tbody>
</table>
        </div>
      </div>
    )}
  </div>
)}

    </div>
  );
};

export default AllOrders;
