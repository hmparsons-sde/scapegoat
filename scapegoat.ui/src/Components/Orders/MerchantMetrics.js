import React from 'react'

export default function MerchantMetrics({ merchantOrders, monthlyOrders }) {
console.warn('from metrics', merchantOrders);

const totalSalesNum = (orders) => {
  let salesArray = [];
  orders.forEach((order) => salesArray.push(order.totalCost));
  const reducer = (prevV, currentV) => prevV + currentV;
  const salesTotal = salesArray.reduce(reducer);
  return salesTotal
};

const avgPerItem = (orders) => {
  let salesArray = [];
  orders.forEach((order) => salesArray.push(order.totalCost));
  const reducer = (prevV, currentV) => prevV + currentV;
  const salesTotal = salesArray.reduce(reducer);
  const salesAvg = salesTotal / orders.length
  return salesAvg
}

  return (
    <div>
      <h2>Metrics</h2>
      <h4>Total Sales</h4>
      <p>{merchantOrders.length > 0 ? `$${totalSalesNum(merchantOrders)}` : 'no data to display'}</p>
      <h4>Total This Month</h4>
      <p>{monthlyOrders.length > 0 ? `$${totalSalesNum(monthlyOrders)}` : 'no data to display'}</p>
      <h4>Average Per Item</h4>
      <p>{merchantOrders.length > 0 ? `$${avgPerItem(merchantOrders)}` : 'no data to display'}</p>
    </div>
  )
}
