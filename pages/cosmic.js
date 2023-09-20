import Navbar from "@/components/navbar";
import { useState } from "react";
import Image from "next/image";
import stars from "../public/stars.jpg";
const axios = require("axios");
export default function Cosmic() {
  const [imgurl, setImgurl] = useState("");
  const [title, setTitle] = useState("");
  const [explain, setExplain] = useState("");
  const [date, setDate] = useState("");
  const apiKey = "HGgzNs8K2j8VrmMgNshhbbf4w1QYkKTUng0oBA5v";
  async function giveDOB() {
    try {
      const response = await axios.get(
        `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&start_date=${date}&end_date=${date}`
      );
      console.log(response.data);
      setImgurl(response.data[0].hdurl);
      setExplain(response.data[0].explanation);
      setTitle(response.data[0].title);
    } catch (error) {
      console.log(error);
    }
  }

  const handleChange = (e) => {
    setDate(e.target.value);
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
        <div className=" ">
          <Navbar />
          <div
            className="flex flex-col w-screen h-full justify-center items-center"
            style={{ overflowY: "auto", height: "calc(100vh - 64px)" }}
          >
            <div className="flex justify-center mt-5">
              <input
                className="xl:px-5 h-20 rounded-3xl mx-1 text-xl xl:mx-5 xl:text-5xl"
                type="date"
                onChange={handleChange}
              ></input>
              <button
                onClick={giveDOB}
                className="h-20 hover:scale-105 bg-slate-100 text-gray mx-1 xl:mx-5 border-2 font-semibold border-black rounded-3xl text-xl xl:text-3xl px-5 py-2"
              >
                Submit Date
              </button>
            </div>
            <div className="flex bg-black rounded-3xl border-4 mt-10 self-center border-white xl:w-[1000px] xl:h-[500px] w-[500px] h-[400px] overflow-hidden">
              {" "}
              {/* Adjusted dimensions */}
              <div className="flex p-5">
                <Image
                  className="rounded-3xl"
                  width={600} // Adjusted width of the image
                  height={300} // Adjusted height of the image
                  src={imgurl}
                ></Image>
              </div>
              <div className="flex items-center flex-col w-[400px]">
                <h1 className="text-5xl font-semibold font-Orbitron text-white">
                  {" "}
                  {/* Adjusted text size */}
                  {title}
                </h1>
                <h2 className="font-Lato text-white text-lg">
                  {/* Adjusted text size */}
                  {explain}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
