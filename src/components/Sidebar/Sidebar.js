/*eslint-disable*/
import React, { useRef } from "react";
import { Link } from "react-router-dom";

import NotificationDropdown from "components/Dropdowns/NotificationDropdown.js";
import UserDropdown from "components/Dropdowns/UserDropdown.js";

import FinanceDropdown from "components/Dropdowns/FinanceDropdown.js";

import "../../assets/styles/sidebar.css";

import useAuth from "hooks/useAuth";
import NavItem from "./NavItem";

export default function Sidebar() {
  const [collapseShow, setCollapseShow] = React.useState("hidden");
  const { auth } = useAuth();

  return (
    <>
      <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          {/* Toggler */}
          <button
            className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
            type="button"
            onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
          >
            <i className="fas fa-bars"></i>
          </button>
          {/* Brand */}
          <Link
            className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
            to="/"
          >
            Social Protection Center
          </Link>
          {/* User */}
          <ul className="md:hidden items-center flex flex-wrap list-none">
            <li className="inline-block relative">
              <NotificationDropdown />
            </li>
            <li className="inline-block relative">
              <UserDropdown />
            </li>
          </ul>
          {/* Collapse */}
          <div
            className={
              "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
              collapseShow
            }
          >
            {/* Collapse header */}
            <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <Link
                    className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                    to="/"
                  >
                    Social Protection Center
                  </Link>
                </div>
                <div className="w-6/12 flex justify-end">
                  <button
                    type="button"
                    className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                    onClick={() => setCollapseShow("hidden")}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
            </div>
            {/* Form */}
            <form className="mt-6 mb-4 md:hidden">
              <div className="mb-3 pt-0">
                <input
                  type="text"
                  placeholder="Search"
                  className="border-0 px-3 py-2 h-12 border border-solid  border-blueGray-500 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal"
                />
              </div>
            </form>
            <hr className="my-4 md:min-w-full" />

            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
              <NavItem name="Thống kê" icon="fa-tv" url="/admin/dashboard" />
              <NavItem
                name="Quản lý trẻ em"
                icon="fa-child"
                url="/admin/child"
              />
              <NavItem
                name="Quản lý nhân viên"
                icon="fa-user-circle"
                url="/admin/employee"
              />
              {/* {auth.roles == "SUPER_ADMIN" ? (
                <NavItem
                  name="Quản lý tài khoản"
                  icon="fa-tools"
                  url="/admin/accounts"
                />
              ) : (
                <></>
              )} */}
              <NavItem
                name="Quản lý tài trợ"
                icon="fa-solid fa-money-bill"
                url="/admin/donations"
              />
              <NavItem
                name="Quản lý bài viết"
                icon="fa-solid fa-newspaper"
                url="/admin/website"
              />
              <NavItem
                name="Quản lý nhận nuôi"
                icon="fa-solid fa-house-user"
                url="/admin/adoption"
              />
              <li
                className={
                  "items-center text-xs uppercase py-3 font-bold block cursor-pointer dropdown " +
                  (window.location.href.indexOf("/admin/finance") !== -1
                    ? "text-lightBlue-500 hover:text-lightBlue-600"
                    : "text-blueGray-700 hover:text-blueGray-500")
                }
              >
                <input type="checkbox" id="dropdown" />
                <label
                  htmlFor="dropdown"
                  className="dropdown-btn cursor-pointer"
                >
                  <i
                    className={
                      "fas fa-coins mr-2 text-sm " +
                      (window.location.href.indexOf("/admin/finance") !== -1
                        ? "opacity-75"
                        : "text-blueGray-300")
                    }
                  ></i>{" "}
                  <span>
                    Quản lý tài chính
                    <i className="fa fa-chevron-down pl-4"></i>
                  </span>
                </label>
                <span className="dropdown-content pl-3" role="menu">
                  <FinanceDropdown />
                </span>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
