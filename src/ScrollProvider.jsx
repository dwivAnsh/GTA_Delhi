import { useRef, useEffect } from "react";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";

const ScrollProvider = ({ children }) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const scroll = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
    });

    // cleanup on unmount
    return () => {
      scroll.destroy();
    };
  }, []);

  return (
    <div data-scroll-container ref={scrollRef}>
      {children}
    </div>
  );
};

export default ScrollProvider;
