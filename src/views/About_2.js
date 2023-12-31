import React from "react";
import { Link } from "react-router-dom";

// components

import Navbar from "../components/Navbars/AuthNavbar.js";
import Footer from "../components/Footers/Footer.js";

export default function About_2() {
  return (
    <>
      <Navbar transparent />
      <main>
      <section className="relative py-20 -mt-50">
          <div
            className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 h-20"
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
                className="text-white fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>

          <div className="container mx-auto px-4">
            <div className="items-center flex flex-wrap">
              <div className="w-full md:w-4/12 ml-auto mr-auto px-4">
                <img
                  alt="..."
                  className="max-w-full rounded-lg shadow-lg"
                  src={require("../assets/img/tre_em1.jpg").default}
                />
              </div>
              <div className="w-full md:w-5/12 ml-auto px-4 -mt-50">
                <div className="md:pr-12">
                  {/* <div className="text-lightBlue-600 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-lightBlue-300">
                    <i className="fas fa-rocket text-xl"></i>
                  </div> */}
                  <h3 className="text-3xl font-semibold">Tầm nhìn</h3>
                  <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
                  Tất cả trẻ em đều cần có gia đình, lớn lên trong tình yêu thương, sự tôn trọng và an toàn
                  </p>
                  <h3 className="text-3xl font-semibold">Sứ mệnh</h3>
                  <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
                  Chúng tôi mang lại gia đình thay thế cho trẻ mồ côi, bị bỏ rơi và có hoàn cảnh đặc biệt khó khăn, giúp trẻ xây dựng tương lai tự lập, có ích và đóng góp vào sự phát triển của cộng đồng xung quanh trẻ.
                  </p>
                </div>
              </div>
            </div>
          </div>
        
        </section>
        <section className="pt-20 pb-48">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center text-center mb-24">
              <div className="w-full lg:w-6/12 px-4">
                <h2 className="text-4xl font-semibold">
                GIÁ TRỊ CỐT LÕI
                </h2>
              </div>
              </div>
            <div className="flex flex-wrap">
              <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
                <div className="px-6">
                  <img
                    alt="..."
                    src={require("../assets/img/tre_em1.jpg").default}
                    className="shadow-lg rounded mx-auto max-w-250-px"
                  />
                  <div className="pt-6 text-center">
                    <h5 className="text-xl font-bold">SỰ CAN ĐẢM</h5>
                    
                    
                  </div>
                </div>
              </div>
              <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
                <div className="px-6">
                  <img
                    alt="..."
                    src={require("../assets/img/tre_em1.jpg").default}
                    className="shadow-lg rounded mx-auto max-w-250-px"
                  />
                  <div className="pt-6 text-center">
                    <h5 className="text-xl font-bold">SỰ TIN TƯỞNG</h5>
                    
                  </div>
                </div>
              </div>
              <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
                <div className="px-6">
                  <img
                    alt="..."
                    src={require("../assets/img/tre_em1.jpg").default}
                    className="shadow-lg rounded mx-auto max-w-250-px"
                  />
                  <div className="pt-6 text-center">
                    <h5 className="text-xl font-bold">SỰ MINH BẠCH</h5>
                    
                    
                  </div>
                </div>
              </div>
              <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
                <div className="px-6">
                  <img
                    alt="..."
                    src={require("../assets/img/tre_em1.jpg").default}
                    className="shadow-lg rounded mx-auto max-w-250-px"
                  />
                  <div className="pt-6 text-center">
                    <h5 className="text-xl font-bold">SỰ CAM KẾT</h5>
                  
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <section className="pt-5 pb-40">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center text-center mb-4">
              <div className="w-full lg:w-6/12 px-4">
                <h2 className="text-3xl font-semibold">Giá trị cốt lõi</h2>
                <div className="justify-items-center mr-3 ml-3">
                <p className="text-xl">Sự can đảm</p>
                <p className="text-xl">Sự tin tưởng</p>
                <p className="text-xl">Sự minh bạch</p>
                <p className="text-xl">Sự cam kết</p>
</div>
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="w-full md:w-/12 lg:w-7/12 lg:mb-0 mb-12 px-4">
                <div className="">
                  <img
                    alt=""
                    src={require("../assets/img/tre_em1.jpg").default}
                    className="shadow-lg rounded "
                  />
                </div>
              </div>
            </div>
            </div>
        </section> */}

      </main>
      <Footer />
    </>
  );
}
