import React from 'react'

export default function MerchantMetrics({ merchantOrders }) {
console.warn('from metrics', merchantOrders);

const totalSalesNum = () => {
  let salesArray = [];
  merchantOrders.forEach((order) => salesArray.push(order.totalCost));
  const reducer = (prevV, currentV) => prevV + currentV;
  const salesTotal = salesArray.reduce(reducer);
  const salesAvg = salesTotal / merchantOrders.length;
  return salesAvg
};

  return (
    <div>
      <h2>Metrics</h2>
      <h4>Total Sales</h4>
      <p>{merchantOrders.length > 0 ? totalSalesNum() : null}</p>
      <h4>Total This Month</h4>
      <h4>Average Per Item</h4>
    </div>
  )
}
