import React, { useState } from "react";
import "./styles.css";
import { images } from "./carouselData";

function Carousel() {
  const [currImg, setCurrImg] = useState(0);

  return (
    <div className="carousel">
      <div
        className="carouselInner"
        style={{
          backgroundImage: `url(${images[currImg].img})`,
        }}
      >
        <div
          className="left"
          onClick={() => {
            currImg > 0 && setCurrImg(currImg - 1);
          }}
        ></div>
        <div className="center"></div>
        <div
          className="right"
          onClick={() => {
            currImg < images.length - 1 && setCurrImg(currImg + 1);
          }}
        ></div>
      </div>
    </div>
  );
}

export default Carousel;
