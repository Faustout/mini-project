/** @format */
"use client";
import Link from "next/link";
import { HiArrowSmallLeft, HiArrowSmallRight } from "react-icons/hi2";
import { Zoom } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

function SliderHome() {
  const images = [
    "https://secureparking.co.id/wp-content/uploads/2023/02/KAMPOENG-TEMPO-DOELOE-6.jpg",
    "https://cdn1-production-images-kly.akamaized.net/PB55QWEB-G-nkKeKWmuCdFkXdEk=/1200x675/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/3258049/original/067742200_1601878665-hanny-naibaho-aWXVxy8BSzc-unsplash.jpg",
    "https://www.azernews.az/media/2023/12/29/jrofejrep15.jpg",
    "https://static.thehoneycombers.com/wp-content/uploads/sites/4/2016/07/sunny.jpg",
    "https://cdn.antaranews.com/cache/1200x800/2019/03/05/IMG-20190305-WA0038.jpg",
    "https://cdn.antaranews.com/cache/1200x800/2020/03/16/shutterstock_234158740.jpg",
  ];

  const zoomInProperties = {
    scale: 1,
    duration: 5000,
    transitionDuration: 300,
    Infinity: true,

    prevArrow: (
      <div className=" top-40 md:top-72">
        <HiArrowSmallLeft className="h-8 w-[24px] text-black cursor-pointer" />
      </div>
    ),
    nextArrow: (
      <div className=" top-40 md:top-72">
        <HiArrowSmallRight className="h-8 w-[24px] text-black cursor-pointer" />
      </div>
    ),
  };
  return (
    <>
      <div className="w-full flex flex-col items-center gap-4 p-2">
        <div className="max-w-[1200px] shadow-md shadow-black p-1">
          <Zoom {...zoomInProperties}>
            {images.map((i, key) => (
              <div className="flex justify-center w-full">
                <img className="w-full h-[500px] rounded" src={i} alt="" />
              </div>
            ))}
          </Zoom>
        </div>
        <div className="flex justify-between w-full p-8 items-center border-b-2 border-gray-300">
          <Link
            href={"/"}
            className="max-w-[150px] text-center rounded w-full bg-white shadow-md hover:text-white hover:bg-[#edeef3] p-1"
          >
            <div className="text-lg font-semibold">Food</div>
          </Link>
          <Link
            href={"/"}
            className="max-w-[150px] text-center rounded w-full bg-white hover:bg-[#edeef3] shadow-md hover:text-white p-1"
          >
            <div className="text-lg font-semibold">Music</div>
          </Link>
          <Link
            href={"/"}
            className="max-w-[150px] text-center rounded w-full bg-white hover:bg-[#edeef3] shadow-md hover:text-white p-1"
          >
            <div className="text-lg font-semibold">Night Life</div>
          </Link>
          <Link
            href={"/"}
            className="max-w-[150px] text-center rounded w-full bg-white hover:bg-[#edeef3] shadow-md hover:text-white p-1"
          >
            <div className="text-lg font-semibold">Art Work Shop</div>
          </Link>
          <Link
            href={"/"}
            className="max-w-[150px] text-center rounded w-full bg-white hover:bg-[#edeef3] shadow-md hover:text-white p-1"
          >
            <div className="text-lg font-semibold">Bioskop</div>
          </Link>
          <Link
            href={"/"}
            className="max-w-[150px] text-center rounded w-full bg-white hover:bg-[#edeef3] shadow-md hover:text-white p-1"
          >
            <div className="text-lg font-semibold">Maraton</div>
          </Link>
        </div>
      </div>
    </>
  );
}
export default SliderHome;
