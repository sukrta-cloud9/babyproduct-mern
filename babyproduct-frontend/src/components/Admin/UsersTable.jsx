import React, { useEffect, useState } from "react";

export default function UsersTable() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  const toggleUserStatus = async (id, currentStatus) => {
    await fetch(`http://localhost:5000/users/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: !currentStatus }),
    });

    setUsers(users.map(u => (u.id === id ? { ...u, active: !currentStatus } : u)));
  };

  return (
    <div>
      <h4 className="mb-3">All Users</h4>

      <table className="table table-bordered">
        <thead className="table-danger">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Block / Unblock</th>
          </tr>
        </thead>

        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.active ? "Active" : "Blocked"}</td>
              <td>
                <button
                  className={`btn ${user.active ? "btn-danger" : "btn-success"}`}
                  onClick={() => toggleUserStatus(user.id, user.active)}
                >
                  {user.active ? "Block" : "Unblock"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
