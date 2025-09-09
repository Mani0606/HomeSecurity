import React, { useEffect, useState } from "react";
import api from "../../API.mjs";

export default function Residents() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetch() {
      try {
        const response = await api.get("/resident/requestes");
        if (response.status === 200 && response.data?.guests) {
          setUsers(response.data.guests);
        } else {
          console.log("No guests found.");
        }
      } catch (error) {
        console.error("Error fetching guests:", error);
      }
    }
    fetch();
  }, [users]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      if (newStatus === "Approved") {
        console.log("here")
        const response = await api.put(`resident/approve/${id}`);
        if (response.status === 200) {
          setUsers((prevUsers) =>
            prevUsers.map((user) =>
              user._id === id ? { ...user, Status: newStatus } : user
            )
          );
        }
      } else if (newStatus === "Rejected") {
        const response = await api.put(`resident/rejected/${id}`);
        if (response.status === 200) {
          setUsers((prevUsers) =>
            prevUsers.map((user) =>
              user._id === id ? { ...user, Status: newStatus } : user
            )
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-[90%] min-h-screen mx-auto py-6">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-lime-500 border border-lime-700 rounded-md overflow-hidden">
          <thead>
            <tr className="bg-lime-700 text-white text-left">
              <th className="py-3 px-4 border-b">S.No</th>
              <th className="py-3 px-4 border-b">Name</th>
              <th className="py-3 px-4 border-b">Phone Number</th>
              <th className="py-3 px-4 border-b">Email</th>
              <th className="py-3 px-4 border-b">Flat</th>
              <th className="py-3 px-4 border-b">Status</th>
              <th className="py-3 px-4 border-b">Approve</th>
              <th className="py-3 px-4 border-b">Reject</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id} className="hover:bg-lime-400 transition">
                <td className="py-2 px-4 border-b">{index + 1}</td>
                <td className="py-2 px-4 border-b">{user.Guest_name}</td>
                <td className="py-2 px-4 border-b">{user.Guest_PhoneNumber}</td>
                <td className="py-2 px-4 border-b">{user.Guest_Email}</td>
                <td className="py-2 px-4 border-b">{user.Visiting_Flat}</td>
                <td className="py-2 px-4 border-b font-semibold">
                  <span
                    className={`px-2 py-1 rounded-full text-sm font-medium ${
                      user.Status === "Approved"
                        ? "text-green-700 bg-green-100"
                        : user.Status === "Rejected"
                        ? "text-red-700 bg-red-100"
                        : "text-yellow-700 bg-yellow-100"
                    }`}
                  >
                    {user.Status}
                  </span>
                </td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => handleStatusChange(user._id, "Approved")}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Approve
                  </button>
                </td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => handleStatusChange(user._id, "Rejected")}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
