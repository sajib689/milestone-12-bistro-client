import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination } from "swiper/modules";
import slid1 from "../assets/home/slide1.jpg";
import slid2 from "../assets/home/slide2.jpg";
import slid3 from "../assets/home/slide3.jpg";
import slid4 from "../assets/home/slide4.jpg";
import slid5 from "../assets/home/slide5.jpg";
import SectionTitle from "../Components/SectionTitle";
const Category = () => {
  return (
    <div className="mt-24 mb-24">
        <SectionTitle heading={"ORDER ONLINE"} subHeading={"---From 11:00am to 10:00pm---"}/>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src={slid1} alt="" />
          <h1 className="text-white -mt-16 text-4xl text-center">Soup</h1>
        </SwiperSlide>

        <SwiperSlide>
          <img src={slid2} alt="" />
          <h1 className="text-white -mt-16 text-4xl text-center">Soup</h1>
        </SwiperSlide>

        <SwiperSlide>
          <img src={slid3} alt="" />
          <h1 className="text-white -mt-16 text-4xl text-center">Soup</h1>
        </SwiperSlide>

        <SwiperSlide>
          <img src={slid4} alt="" />
          <h1 className="text-white -mt-16 text-4xl text-center">Soup</h1>
        </SwiperSlide>

        <SwiperSlide>
          <img src={slid5} alt="" />
          <h1 className="text-white -mt-16 text-4xl text-center">Soup</h1>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Category;
