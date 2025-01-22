import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import Header from "@/components/ui/Header";

const Footer = () => {
  return (
    <div className="flex flex-col items-start px-20 py-12 space-y-4 w-full">
      <Header className="text-4xl p-0" >Liên hệ </Header>
      <div className="w-full pl-2 flex flex-col gap-3 ">
        <a
          href="tel:0775525679"
          className="flex items-center text-xl text-gray-600 hover:text-blue-500 hover:translate-x-3 transition-transform"
        >
          <FontAwesomeIcon
            icon={faPhone}
            className="mr-2 text-gray-600 hover:text-blue-500 transition-colors"
          />
          077 552 5679
        </a>

        <a
          href="mailto:depocafe.tpgroup@gmail.com"
          className="flex items-center text-xl text-gray-600 hover:text-blue-500 hover:translate-x-3 transition-transform"
        >
          <FontAwesomeIcon
            icon={faMessage}
            className="mr-2 text-gray-600 hover:text-green-500 transition-colors"
          />
          depocafe.tpgroup@gmail.com
        </a>

        <a
          href="https://www.facebook.com/depocaphe"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-xl text-gray-600 hover:text-blue-500 hover:translate-x-3 transition-transform"
        >
          <FontAwesomeIcon icon={faFacebook} className="mr-2" />
          https://www.facebook.com/depocaphe
        </a>

        <a
          href="https://www.instagram.com/depocafehue/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-xl text-gray-600 hover:text-blue-500 hover:translate-x-3 transition-transform"
        >
          <FontAwesomeIcon
            icon={faInstagram}
            className="mr-2 text-gray-600 hover:text-purple-500 transition-colors"
          />
          https://www.instagram.com/depocafehue
        </a>
      </div>
      <p className="mt-20 text-xl text-gray-500 w-full text-center ">
        Template by mr. web designer | all rights reserved | Custom by Nguyễn
        Nhật Thành Thật.
      </p>
    </div>
  );
};

export default Footer;
