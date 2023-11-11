'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Skeleton from '@/app/ui/skeleton'

export default function Page() {
  const apiUrl = 'https://data.sfgov.org/resource/rqzj-sfat.json'
  const [foodTrucks, setFoodTrucks] = useState<FoodTruck[]>([])
  // const [isClient, setIsClient] = useState(false)

  // Initial Data
  const [filterValue, setFilterValue] = useState<string>('all')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // setIsClient(true)
    axios
      .get<FoodTruck[]>(apiUrl)
      .then((response) => {
        setFoodTrucks(response.data)
        setIsLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
        setIsLoading(true)
      })
  }, [])

  // Handle filter change
  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterValue(event.target.value)
  }

  // Filter food trucks based on the selected option
  const filteredTrucks =
    filterValue === 'mexican'
      ? foodTrucks.filter((truck) =>
          truck.fooditems?.toLowerCase().includes('tacos')
        )
      : filterValue === 'chinese'
      ? foodTrucks.filter((truck) =>
          truck.fooditems?.toLowerCase().includes('chinese')
        )
      : filterValue === 'italian'
      ? foodTrucks.filter((truck) =>
          truck.fooditems?.toLowerCase().includes('italian')
        )
      : foodTrucks

  return (
    <div className="w-full h-full text-center p-10">
      <div className="flex border-fresh-textColor justify-center"></div>
      <div className="w-full h-full text-center p-10">
        <div className="mt-5 mb-10">
          <h2 className="font-bold text-xl mb-5 text-textColor">
            Select truckee by country
          </h2>
          <select
            id="filterSelect"
            className="block w-full rounded py-2 px-3"
            value={filterValue}
            onChange={handleFilterChange}
          >
            <option value="all">All</option>
            <option value="chinese">Chinese</option>
            <option value="mexican">Mexican</option>
            <option value="italian">Italian</option>
          </select>
        </div>
        <div className="food-truck-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {isLoading
            ? Array(9)
                .fill(undefined)
                .map((index) => (
                  <div
                    className="food-truck-card p-6 rounded shadow-lg"
                    key={index}
                  >
                    <Skeleton />
                  </div>
                ))
            : filteredTrucks.map((truck) => (
                <div
                  className="food-truck-card p-6 bg-fresh-cardColor border border-t-[10px]  border-fresh-textColor rounded shadow-md"
                  key={truck.objectid}
                >
                  <h2 className="capitalize text-2xl font-semibold text-textColor mb-8">
                    {truck.applicant}
                  </h2>
                  <div className="text-left text-sm mt-2 text-gray">
                    <p className="mb-1">Facility Type: {truck.facilitytype}</p>
                    <p className="mb-1">
                      Location: {truck.locationdescription}
                    </p>
                    <p className="mb-1">Address: {truck.address}</p>
                    <p className="mb-1">Permit: {truck.permit}</p>
                    <p className="mb-1">Status: {truck.status}</p>
                    <p>Food Items: {truck.fooditems}</p>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  )
}
