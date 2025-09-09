import React, { useEffect, useState } from "react";
import api from "../../API.mjs";

export default function Owners() {
  const [apartment, setApartment] = useState(null);

  useEffect(() => {
    async function fetchApartment() {
      try {
        const response = await api.get("/owner/requests");
        if (response.status === 200 && response.data?.aparts) {
          setApartment(response.data.aparts);
          setApartment({
            ...response.data.aparts,
            Owner_name: response.data.owner.Owner_name,
          });
        }
      } catch (error) {
        console.error("Error fetching apartment request:", error);
      }
    }

    fetchApartment();
  }, []);

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-lime-200 shadow-lg rounded-lg p-8 border border-lime-300">
          <h2 className="text-4xl font-bold text-lime-600 mb-6 text-center">
            Apartment Details
          </h2>

          {!apartment ? (
            <p className="text-center text-gray-500 text-lg">
              No request found.
            </p>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-lime-50 rounded-lg shadow-sm">
                  <p className="text-gray-600 text-sm">Apartment Name</p>
                  <p className="text-xl font-semibold text-lime-800">
                    {apartment.Aparment_name}
                  </p>
                </div>

                <div className="p-4 bg-lime-50 rounded-lg shadow-sm">
                  <p className="text-gray-600 text-sm">Owner Name</p>
                  <p className="text-xl font-semibold text-lime-800">
                    {apartment. Owner_name}
                  </p>
                </div>

                <div className="p-4 bg-lime-50 rounded-lg shadow-sm">
                  <p className="text-gray-600 text-sm">Buildings</p>
                  <p className="text-xl font-semibold text-lime-800">
                    {apartment.No_of_Buildings}
                  </p>
                </div>

                <div className="p-4 bg-lime-50 rounded-lg shadow-sm">
                  <p className="text-gray-600 text-sm">Floors</p>
                  <p className="text-xl font-semibold text-lime-800">
                    {apartment.No_of_floors}
                  </p>
                </div>

                <div className="p-4 bg-lime-50 rounded-lg shadow-sm">
                  <p className="text-gray-600 text-sm">Flats</p>
                  <p className="text-xl font-semibold text-lime-800">
                    {apartment.No_of_flats}
                  </p>
                </div>
              </div>

              <div className="flex justify-center gap-4 mt-8 flex-wrap">
                <button className="bg-lime-500 hover:bg-lime-600 text-white font-semibold px-6 py-2 rounded-md shadow-md transition">
                  Update
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
