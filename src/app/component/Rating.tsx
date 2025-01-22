"use client";
import React from "react";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Header from "@/components/ui/Header";
import { IComment } from "@/lib/models/comment";

const Rating = ({ reviews }: { reviews: IComment[] }) => {
  const reviewList = reviews;
  const [emblaRef] = useEmblaCarousel({ loop: false }, [Autoplay()]);
  return (
    <div className="w-full pb-24 h-fit-content flex flex-col items-center bg-white">
      <Header>Đánh giá</Header>

      <div className="embla select-none" ref={emblaRef}>
        <div className="embla__container">
          {reviewList.map((review, index) => (
            <div key={index} className="embla__slide p-10">
              <img
                src="/img/no_avatar.jpg"
                alt={review.username}
                className="size-20  rounded-full"
              />

              <h1 className="text-4xl pt-5  font-bold text-gray-900 mb-5">
                {review.username}
              </h1>
              <div className="flex space-x-1 my-3">
                {Array(5)
                  .fill(0)
                  .map((_, starIndex) => (
                    <FontAwesomeIcon
                      key={starIndex}
                      icon={faStar}
                      className={
                        starIndex < review.ratingIndex
                          ? "text-yellow-400"
                          : "text-gray-400"
                      }
                    />
                  ))}
              </div>
              <p className="text-xl p-5 text-gray-600 text-left">
                {review.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Rating;
