import React from 'react';
import Product from "../../assets/Images/OrdersPage/Product.svg";

const orders = [
  {
    orderId: '#125464',
    product: {
      name: 'Winter jacket-OC1485',
      category: 'Womens Fashion',
      image: Product,
    },
    orderType: 'Group Buy',
    productId: '#125464',
    qty: 50,
    DispatchedOn: '10 Mar 2024',
    DeliveryBy: 'Delivery',
    status: 'Delivered',
  },
  {
    orderId: '#125465',
    product: {
      name: 'Winter jacket-OC1485',
      category: 'Womens Fashion',
      image: Product,
    },
    orderType: 'Group Buy',
    productId: '#125465',
    qty: 50,
    DispatchedOn: '10 Mar 2024',
    DeliveryBy: 'Delivery',
    status: 'Picked Up',
  },
  {
    orderId: '#125466',
    product: {
      name: 'Winter jacket-OC1485',
      category: 'Womens Fashion',
      image: Product,
    },
    orderType: 'Group Buy',
    productId: '#125466',
    qty: 50,
    DispatchedOn: '10 Mar 2024',
    DeliveryBy: 'Delivery',
    status: 'In Transit',
  },
];

const getStatusStyles = (status) => {
  switch (status) {
    case 'Delivered':
      return {
        backgroundColor: '#E8FDF3',
        color: '#12B76A',
      };
    case 'Picked Up':
    case 'In Transit':
      return {
        backgroundColor: '#FEF4E6',
        color: '#F79009',
      };
    default:
      return {
        backgroundColor: 'white',
        color: 'black',
      };
  }
};

const Shipped = ({ selectedOrderType, selectedStatus }) => {
  // Filter orders based on selected order type and status
  const filteredOrders = orders.filter(order => {
    const matchesOrderType = selectedOrderType && selectedOrderType !== 'All' ? order.orderType === selectedOrderType : true;
    const matchesStatus = selectedStatus && selectedStatus !== 'All' ? order.status === selectedStatus : true;
    return matchesOrderType && matchesStatus;
  });

  return (
    <div className='Allorders' style={{ maxHeight: '400px', overflowY: 'scroll', scrollbarWidth: "none", msOverflowStyle: "none" }}>
      <div style={{ backgroundColor: "#F2F3F3", marginTop: 20, display: "flex", fontFamily: "Nunito-SemiBold", fontSize: 14, borderRadius: 8, height: 45 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "9%" }}>Order ID</div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "29%" }}>Order</div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "13%" }}>Order Type</div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "10%" }}>Product ID</div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "8%" }}>Qty</div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "15%" }}>Dispatched On</div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "10%" }}>Delivery By</div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "10%" }}>Status</div>
      </div>

      {filteredOrders.length > 0 ? (
        filteredOrders.map((order) => {
          const statusStyles = getStatusStyles(order.status);
          return (
            <div key={order.orderId} style={{ display: "flex", backgroundColor: "white", marginTop: 12 }}>
              <div style={{ display: "flex", height: 82, alignItems: "center", justifyContent: "center", width: "9%", fontFamily: "Nunito-Medium", fontSize: 14, color: "#1849A9", textDecoration: "underline" }}>{order.orderId}</div>
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
              <div style={{ display: "flex", height: 82, alignItems: "center", justifyContent: "center", width: "10%", fontFamily: "Nunito-Medium", fontSize: 14, color: "#1849A9", textDecoration: "underline" }}>{order.productId}</div>
              <div style={{ display: "flex", height: 82, alignItems: "center", justifyContent: "center", width: "8%", fontFamily: "Nunito-Medium", fontSize: 14 }}>{order.qty}</div>
              <div style={{ display: "flex", height: 82, alignItems: "center", justifyContent: "center", width: "15%", fontFamily: "Nunito-Medium", fontSize: 14 }}>{order.DispatchedOn}</div>
              <div style={{ display: "flex", height: 82, alignItems: "center", justifyContent: "center", width: "10%", fontFamily: "Nunito-Medium", fontSize: 14 }}>{order.DeliveryBy}</div>
              <div style={{ display: "flex", height: 82, alignItems: "center", justifyContent: "center", width: "10%", fontFamily: "Nunito-Medium", fontSize: 14 }}>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: statusStyles.backgroundColor,
                  color: statusStyles.color,
                  borderRadius: 16,
                  width: 80,
                  justifyContent: "center",
                }}>
                  {order.status === 'In Transit' && (
                    <div style={{
                      width: 5,
                      height: 5,
                      backgroundColor: '#F79009',
                      borderRadius: '50%',
                      marginRight: 5,
                    }} />
                  )}
                  <span style={{ fontSize: 14 }}>{order.status}</span>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div style={{ textAlign: 'center', marginTop: 20 }}>No orders found.</div>
      )}
    </div>
  );
};

export default Shipped;
