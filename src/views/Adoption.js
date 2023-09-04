import React, { useState } from "react";
import "../assets/styles/FormAdoption.css";
// components
import Navbar from "components/Navbars/AuthNavbar.js";
import Footer from "components/Footers/Footer.js";
import apiMethod from "api/apiMethod";
import isEmpty from "validator/lib/isEmpty";
import isNumeric from "validator/lib/isNumeric";
import isEmail from "validator/lib/isEmail";
import isMobilePhone from "validator/lib/isMobilePhone";
import isLength from "validator/lib/isLength";

import "assets/styles/FormAdoption.css";
import { AdoptionForm } from "components/forms/AdoptionForm";

export default function Adoption() {
  return (
    <>
      <Navbar transparent />
      <main>
        <div className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen-75">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                "url('https://luattienphong.vn/wp-content/uploads/2018/02/thu-tuc-nhan-con-nuoi-tai-cac-lang-tre-mo-coi-1c.jpg')",
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-75 bg-black"
            ></span>
          </div>
          <div className="container relative mx-auto">
            <div className="items-center flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                <div className="pr-12">
                  <h1 className="text-white font-semibold text-5xl">
                    Nhận nuôi trẻ mồ côi
                  </h1>
                  <p className="mt-4 text-lg text-blueGray-200">
                    "Với một đứa trẻ, thế giới không giới hạn trong một bữa ăn,
                    mà thế giới cần có hào quang của tình thương"
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
            style={{ transform: "translateZ(0)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-blueGray-200 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </div>
        <section className="pb-20 bg-blueGray-200 -mt-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap"></div>
            <br /> <br />
            <AdoptionForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
