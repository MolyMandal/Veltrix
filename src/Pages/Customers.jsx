import React from "react";
import "./Customers.css";

function Customers() {
  const customers = [
    {
      id: 1,
      name: "Rahul Sharma",
      email: "rahul@gmail.com",
      orders: 12,
      status: "Active",
    },
    {
      id: 2,
      name: "Priya Das",
      email: "priya@gmail.com",
      orders: 8,
      status: "Active",
    },
    {
      id: 3,
      name: "Amit Roy",
      email: "amit@gmail.com",
      orders: 2,
      status: "Inactive",
    },
  ];

  const getClass = (status) => {
    return status === "Active" ? "active" : "inactive";
  };

  return (
    <div className="customers-page">
      <div className="page-head">
        <h1>Customers</h1>
        <p>Manage customer relationships</p>
      </div>

      <div className="table-box">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Orders</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {customers.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.orders}</td>
                <td>
                  <span className={`status ${getClass(item.status)}`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Customers;