import React from "react";
import contact from "../assets/contact.jpg";
import Title from "../components/Title";
import { Link } from "react-router-dom";

const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 border-t mt-25">
        <Title text1={"CINTACT"} text2={"US"} />
      </div>
      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        <img className="w-full md:max-w-[480px]" src={contact} alt="" />
        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-xl text-gray-600">Our Store</p>
          <p className=" text-gray-500">
            22 Gabon Street, Addis ababa, Ethiopia.
          </p>
          <p className=" text-gray-500">
            Tel: +251900032198 Email: Jedid@gmail.com
          </p>
          <p className="font-semibold text-xl text-gray-600">
            Careers at Jedid
          </p>

          <p className=" text-gray-500">
            Learn more about our teams and job openings.
          </p>
          <Link
            to="/about"
            className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500"
          >
            About Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Contact;
