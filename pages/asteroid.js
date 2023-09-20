import Navbar from "@/components/navbar";
import { useState } from "react";
import stars from "../public/stars.jpg";
import axios from "axios";

export default function Asteroid() {
  const [asteroidList, setAsteroidList] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  async function getAsteroid() {
    try {
      const response = await axios.get(
        `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=ifAHb64rK915Dh2PmimBXrjt9dfmgRlsavYJSEbY`
      );
      const { near_earth_objects } = response.data;
      let arr = [];
      let newarr = [];
      let numsarr = [];
      Object.keys(near_earth_objects).forEach((key) => {
        near_earth_objects[key].forEach((i) => {
          arr.push(i);
        });
      });
      arr.forEach((i) => {
        newarr.push(
          `Asteroid ${i.name} on ${i.close_approach_data[0].close_approach_date} and the closest approach will be: ${i.close_approach_data[0].miss_distance.astronomical} IAU`
        );
      });
      setAsteroidList(newarr);
    } catch (error) {
      console.log(error);
    }
  }

  const handleStartChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndChange = (f) => {
    setEndDate(f.target.value);
  };

  return (
    <>
      <div
        style={{
          margin: 0,
          padding: 0,
          backgroundImage: `url(${stars.src})`,
          backgroundSize: "100% 100%",
          width: "100%",
          position: "relative",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          minHeight: "100vh",
        }}
      >
        <div className="h-screen bg-contain overflow-x-hidden">
          <Navbar />
          <div className="flex flex-col w-screen ">
            <div className="flex  justify-center">
              <div className="flex flex-col items-center">
                <input
                  className="xl:px-5 h-20 rounded-3xl mx-1 text-xl xl:mx-5 xl:text-5xl"
                  type="date"
                  onChange={handleStartChange}
                ></input>
                <h1 className="text-white mt-8 font-Orbitron lg:text-5xl">
                  {" "}
                  Start Date{" "}
                </h1>
              </div>
              <div className="flex flex-col items-center">
                <input
                  className="xl:px-5 h-20 rounded-3xl mx-1 text-xl xl:mx-5 xl:text-5xl"
                  type="date"
                  onChange={handleEndChange}
                ></input>
                <h1 className="text-white mt-8 font-Orbitron lg:text-5xl">
                  {" "}
                  End Date{" "}
                </h1>
              </div>
            </div>
            <div className="flex justify-center mt-8">
              {startDate !== "" && endDate !== "" ? (
                <button
                  onClick={getAsteroid}
                  className="h-20 hover:scale-105 text-white mx-1 xl:mx-5 border-2 border-white bg-opacity-30 backdrop-blur-md backdrop-opacity-60 font-semibold bg-black text-white rounded-3xl text-xl xl:text-3xl px-5 py-2"
                >
                  Get Asteroid Data
                </button>
              ) : (
                <></>
              )}
            </div>
            <div className="flex flex-col self-center mb-10">
              {asteroidList.map(function (i, index) {
                return (
                  <li
                    className="text-white text-2xl font-semibold  mt-5"
                    key={index}
                  >
                    {i}
                  </li>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
