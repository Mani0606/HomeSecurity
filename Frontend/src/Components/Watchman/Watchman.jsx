import React, { useEffect, useState } from "react";
import api from "../../API.mjs";

export default function Watchman() {
  const [guests, setGuests] = useState([]);

  useEffect(() => {
    async function fetchGuests() {
      try {
        const response = await api.get("/watch/requests");
        if (response.status === 200 && response.data?.guest) {
          setGuests(response.data.guest);
        }
      } catch (error) {
        console.error("Error fetching guests:", error);
      }
    }

    fetchGuests();
  }, []);

  return (
    <div className="min-h-screen  py-10 px-4">
      <div className="max-w-6xl mx-auto bg-lime-200 shadow-md rounded-lg p-6">
        <h2 className="text-3xl font-bold text-center text-lime-600 mb-6">
          Guest Entry Requests
        </h2>

        {guests.length === 0 ? (
          <p className="text-center text-gray-500">No guest records found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-lime-100 text-lime-800 text-sm uppercase">
                <tr>
                  <th className="px-4 py-3 text-left border-b">Guest Name</th>
                  <th className="px-4 py-3 text-left border-b">Phone</th>
                  <th className="px-4 py-3 text-left border-b">Email</th>
                  <th className="px-4 py-3 text-left border-b">Flat</th>
                  <th className="px-4 py-3 text-left border-b">Status</th>
                  <th className="px-4 py-3 text-left border-b">Verified</th>
                </tr>
              </thead>
              <tbody>
                {guests.map((guest) => (
                  <tr
                    key={guest._id}
                    className="hover:bg-lime-50 transition duration-150"
                  >
                    <td className="px-4 py-3 border-b">{guest.Guest_name}</td>
                    <td className="px-4 py-3 border-b">{guest.Guest_PhoneNumber}</td>
                    <td className="px-4 py-3 border-b">{guest.Guest_Email}</td>
                    <td className="px-4 py-3 border-b">{guest.Visiting_Flat}</td>
                    <td className="px-4 py-3 border-b">
                      <span
                        className={`inline-block px-2 py-1 text-xs rounded-full font-semibold ${
                          guest.Status === "Approved"
                            ? "bg-green-100 text-green-800"
                            : guest.Status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {guest.Status}
                      </span>
                    </td>
                    <td className="px-4 py-3 border-b">
                      <span
                        className={`inline-block px-2 py-1 text-xs rounded-full font-semibold ${
                          guest.Verified === "Approved"
                            ? "bg-green-100 text-green-800"
                            : guest.Verified === "Rejected"
                            ? "bg-red-100 text-red-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {guest.Verified}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
