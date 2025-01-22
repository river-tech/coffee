import Image from "next/image";
import Link from "next/link";
import Menu from "./component/Menu";
import Rating from "./component/Rating";
import BookingForm from "./component/BookingForm";
import { ToastContainer } from "react-toastify";
import Footer from "./component/Footer";
import Navbar from "./Navbar";
import RatingForm from "./component/RatingForm";
import axios from "axios";
import { menu, reviews } from "./fakedb";
 


export default async function Home() {
  const ListReviews = reviews
  const ListMenu = menu

  //fetch reviews
  try {
    const res = await axios.get('https://httpbin.org/get',{
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if(res) {
      // reviews = res.data;
    }
  } catch (error) {
    console.log(error);
  }

  //fetch menu
  try {
    const res = await axios.get('https://httpbin.org/get',{
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if(res) {
      // menu = res.data;
    }
  } catch (error) {
    console.log(error);
  }

  return (
    <div>
      <Navbar />
      <div id="home" className="relative">
        <Image
          src="/img/depo_background.jpg"
          alt="Background Image"
          width={1920}
          height={500}
          className="object-cover w-full h-[800px]"
        />
        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center text-white gap-3">
          <Image
            src="/img/location_icon_svg.svg"
            alt="Location Icon"
            width={50}
            height={50}
          />
          <Link
            href="https://maps.app.goo.gl/59aUYEbaus1YSbAN8"
            target="_blank"
            className="text-5xl font-bold"
          >
            Lầu 2 Chợ Đông Ba, 02 Trần Hưng Đạo, Huế
          </Link>
        </div>
      </div>

      <section className="px-0" id="menu">
        <Menu menu={ListMenu} />
      </section>

      <section className="px-0" id="review">
        <Rating reviews={ListReviews} />
      </section>

      <section className="px-0" id="book">
        <BookingForm  />
      </section>

      <section className="px-0" id="footer">
        <Footer />
      </section>

      <ToastContainer className="toast" />
    </div>
  );
}
