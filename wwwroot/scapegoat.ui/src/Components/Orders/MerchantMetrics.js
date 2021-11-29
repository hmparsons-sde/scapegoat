import React from 'react';
import styled from 'styled-components';

const FlexyDiv = styled.div`
display: flex;
flex-direction: row;
flex-wrap: wrap;
justify-content: center;
padding: 2rem;
`;

const MetricDiv = styled.div`
border: 1px solid black;
border-radius: 15px;
margin: 2rem;
padding: 2rem;
`;

export default function MerchantMetrics({ merchantOrders, monthlyOrders }) {

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
    <FlexyDiv>
      <MetricDiv>
        <h4>Total Sales</h4>
        <h4>{merchantOrders.length > 0 ? `$${totalSalesNum(merchantOrders)}` : 'no data to display'}</h4>
      </MetricDiv>
      <MetricDiv>
        <h4>Total This Month</h4>
        <h4>{monthlyOrders.length > 0 ? `$${totalSalesNum(monthlyOrders)}` : 'no data to display'}</h4>
      </MetricDiv>
        <MetricDiv>
        <h4>Average Per Item</h4>
        <h4>{merchantOrders.length > 0 ? `$${avgPerItem(merchantOrders)}` : 'no data to display'}</h4>
      </MetricDiv>
    </FlexyDiv>
  )
}
