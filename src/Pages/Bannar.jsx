import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import slide1 from "../assets/home/01.jpg";
import slide2 from "../assets/home/02.jpg";
import slide3 from "../assets/home/03.png";
import slide4 from "../assets/home/04.jpg";
import slide5 from "../assets/home/05.png";
const Bannar = () => {
  return (
    <>
      <Carousel>
        <div className="h-[85vh]">
          <img src={slide1} />
        </div>
        <div className="h-[85vh]">
          <img src={slide2} />
        </div>
        <div className="h-[85vh]">
          <img src={slide3} />
        </div>
        <div className="h-[85vh]">
          <img src={slide4} />
        </div>
        <div className="h-[85vh]">
          <img src={slide5} />
        </div>
      </Carousel>
    </>
  );
};

export default Bannar;
