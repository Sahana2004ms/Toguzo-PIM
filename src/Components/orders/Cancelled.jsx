import React from 'react';
import Product from "../../assets/Images/OrdersPage/Product.svg";

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

const Cancelled = ({ selectedOrderType, selectedPayment }) => {
  // Filter orders based on selected order type and payment method
  const filteredOrders = orders.filter(order => {
    const matchesOrderType = selectedOrderType && selectedOrderType !== 'All' ? order.orderType === selectedOrderType : true;
    const matchesPayment = selectedPayment && selectedPayment !== 'All' ? order.payment === selectedPayment : true;
    return matchesOrderType && matchesPayment;
  });

  return (
    <div>
      <div style={{ maxHeight: '400px', overflowY: 'scroll', scrollbarWidth: "none", msOverflowStyle: "none" }}>
        <div style={{ backgroundColor: "#F2F3F3", marginTop: 20, display: "flex", fontFamily: "Nunito-SemiBold", fontSize: 14, borderRadius: 8, height: 45 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "13%" }}>Order ID</div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "29%" }}>Order</div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "15%" }}>Order Type</div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "13%" }}>Product ID</div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "10%" }}>Qty</div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "13%" }}>Payment</div>
        </div>

        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <div key={order.orderId} style={{ display: "flex", backgroundColor: "white", marginTop: 12 }}>
              <div style={{ display: "flex", height: 82, alignItems: "center", justifyContent: "center", width: "13%", fontFamily: "Nunito-Medium", fontSize: 14, color: "#1849A9", textDecoration: "underline" }}>{order.orderId}</div>
              <div style={{ display: "flex", height: 82, alignItems: "center", width: "29%", fontFamily: "Nunito-Medium", fontSize: 12 }}>
                <div style={{ height: 60, width: "25%", backgroundColor: "#F2F3F3", margin: 12 }}>
                  <img src={order.product.image} alt={order.product.name} />
                </div>
                <div style={{ marginLeft: 12 }}>
                  <p style={{ fontFamily: "Nunito-Medium", fontSize: 14 }}>{order.product.name}</p>
                  <p style={{ fontFamily: "Nunito-Medium", fontSize: 14 }}>{order.product.category}</p>
                </div>
              </div>
              <div style={{ display: "flex", height: 82, alignItems: "center", justifyContent: "center", width: "15%", fontFamily: "Nunito-Medium" }}>
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
              <div style={{ display: "flex", height: 82, alignItems: "center", justifyContent: "center", width: "13%", fontFamily: "Nunito-Medium", fontSize: 14, color: "#1849A9", textDecoration: "underline" }}>{order.productId}</div>
              <div style={{ display: "flex", height: 82, alignItems: "center", justifyContent: "center", width: "10%", fontFamily: "Nunito-Medium", fontSize: 14 }}>{order.qty}</div>
              <div style={{ display: "flex", height: 82, alignItems: "center", justifyContent: "center", width: "13%", fontFamily: "Nunito-Medium", fontSize: 14 }}>{order.payment}</div>
            </div>
          ))
        ) : (
          <div style={{ textAlign: 'center', marginTop: 20 }}>No orders found.</div>
        )}
      </div>
    </div>
  );
};

export default Cancelled;
