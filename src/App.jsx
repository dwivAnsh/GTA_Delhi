import React, { useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import ScrollProvider from "./ScrollProvider";

const App = () => {
  const [showContent, setShowContent] = useState(false);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.to(".vi-mask-group", {
      rotate: 50,
      duration: 2,
      ease: "Power4.easeInOut",
      transformOrigin: "50% 50%",
    }).to(".vi-mask-group", {
      scale: 10,
      duration: 2,
      delay: -1.8,
      ease: "Expo.easeInOut",
      transformOrigin: "50% 50%",
      opacity: 0,
      onUpdate: () => {
        if (tl.progress() >= 0.9) {
          const svg = document.querySelector(".svg");
          if (svg) svg.remove();
          setShowContent(true);
          tl.kill();
        }
      },
    });
  });

  useGSAP(() => {
    if (!showContent) return;

    gsap.to(".main", {
      scale: 1,
      rotate: 0,
      duration: 2,
      delay: -1,
      ease: "Expo.easeInOut",
    });

    gsap.to(".sky", {
      scale: 1.2,
      rotate: 0,
      duration: 2,
      delay: -0.8,
      ease: "Expo.easeInOut",
    });

    gsap.to(".bg", {
      scale: 1.1,
      rotate: 0,
      duration: 2,
      delay: -0.8,
      ease: "Expo.easeInOut",
    });

    gsap.to(".character", {
      scale: 0.8,
      bottom: "-55%",
      x: "-50%",
      rotate: 0,
      duration: 2,
      delay: -0.8,
      ease: "Expo.easeInOut",
    });

    gsap.to(".text", {
      scale: 1,
      rotate: 0,
      duration: 2,
      delay: -0.8,
      ease: "Expo.easeInOut",
    });

    const main = document.querySelector(".main");
    main?.addEventListener("mousemove", (e) => {
      const xMove = (e.clientX / window.innerWidth - 0.5) * 40; // -20 to 20
      gsap.to(".main .text", {
        x: `${xMove * 0.4}%`,
      });

      gsap.to(".sky", {
        x: `${xMove * 0.4}%`,
      });

      gsap.to(".bg", {
        x: xMove * 1.7,
      });
    });
  }, [showContent]);

  useEffect(() => {
    if (!showContent) return;

    const imgs = document.querySelectorAll("img");
    imgs.forEach((img) => {
      img.setAttribute("draggable", "false");
      img.addEventListener("contextmenu", (e) => e.preventDefault());
      img.style.userSelect = "none";
      document.body.style.userSelect = "none";
    });
  }, [showContent]);

  return (
    <>
      {/* SVG loader */}
      <div className="svg flex items-center justify-center fixed top-0 left-0 z-[100] w-full h-screen overflow-hidden bg-[#000]">
        <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
          <defs>
            <mask id="viMask">
              <rect width="100%" height="100%" fill="black" />
              <g className="vi-mask-group">
                <text
                  x="50%"
                  y="50%"
                  fontSize="250"
                  textAnchor="middle"
                  fill="white"
                  dominantBaseline="middle"
                  fontFamily="Arial Black"
                >
                  VI
                </text>
              </g>
            </mask>
          </defs>
          <image
            href="./bg.png"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
            mask="url(#viMask)"
          />
        </svg>
      </div>

      {/* Main Content */}
      {showContent && (
        <ScrollProvider>
          <div className="main w-full rotate-[10deg] scale-[1.7]">
            <div className="landing w-full h-screen bg-black relative overflow-hidden">
              <div className="navbar absolute top-5 left-5 w-[94%] z-[11]">
                <div className="logo flex gap-5 items-center">
                  <div className="lines flex flex-col gap-1">
                    <div className="line w-12 h-1.5 bg-white"></div>
                    <div className="line w-7 h-1.5 bg-white"></div>
                    <div className="line w-5 h-1.5 bg-white"></div>
                  </div>
                  <div className="text-[2.3vw] text-white -translate-y-1">
                    Rockstar
                  </div>
                </div>
              </div>
              <div className="imagesdiv relative w-full h-screen">
                <img
                  className="sky absolute scale-[1.7] rotate-[20deg] top-0 left-0 w-full h-full object-cover"
                  src="./sky.png"
                  alt=""
                />
                <img
                  className="bg scale-[2.1] rotate-[5deg] absolute top-0 left-0 w-full h-full object-cover"
                  src="./bg.png"
                  alt=""
                />
                <div className="text text-white w-full flex flex-col gap-[2vw] scale-[1.7] rotate-[-10deg]">
                  <h1 className="text-9xl absolute left-[42%] -translate-x-1/2">
                    grand
                  </h1>
                  <h1 className="text-9xl absolute left-[68%] top-30 -translate-x-1/2">
                    theft
                  </h1>
                  <h1 className="text-9xl absolute left-[35%] top-60 -translate-x-1/2">
                    auto
                  </h1>
                </div>
                <img
                  className="character absolute -bottom-[100%] left-1/2 scale-[3] rotate-[-7deg] -translate-x-1/2"
                  src="./girlbg.png"
                  alt=""
                />
              </div>
              <div className="btmbar absolute bottom-0 flex items-center left-0 w-full h-[15%] z-[11] bg-gradient-to-t from-black to-transparent">
                <div className="flex gap-2 absolute items-center text-white bottom-2">
                  <i class="text-2xl ri-arrow-down-line"></i>
                  <h3 className="font-[Montserrat] text-xl">Scroll Down</h3>
                </div>
                <img
                  className="absolute h-[3vw] left-1/2 bottom-1/2 -translate-x-1/2 translate-y-6/5"
                  src="./ps5.png"
                  alt=""
                />
              </div>
            </div>
            <div className="second relative w-full h-screen bg-black px-10 flex items-center justify-center overflow-hidden">
              <div className="cntnr w-full h-[80%] flex text-white">
                <div className="limg w-1/2 h-full relative">
                  <img
                    className="absolute scale-[0.7] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                    src="./imag.png"
                    alt=""
                  />
                </div>
                <div className="rimg absolute left-3/3 top-2/7 -translate-x-1/2 -translate-y-1/2 w-full">
                  <h1 className="text-8xl">Still Running,</h1>
                  <h1 className="text-8xl">Not Hunting</h1>
                  <p className="absolute top-60 font-[Montserrat] w-[40%]">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Rerum alias nam ipsam. Sed, id. Soluta saepe autem placeat
                    cumque possimus, ullam ad ducimus.
                  </p>
                  <p className="absolute top-85 font-[Montserrat] w-[40%]">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Minima alias id non quae!
                  </p>
                  <button className="bg-yellow-300 text-black h-12 w-[12vw] text-2xl rounded-xs absolute top-110">
                    Download Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </ScrollProvider>
      )}
    </>
  );
};

export default App;
