import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "../../assets/styles/tableItems.css";
import "../../assets/styles/tableFinanceCard.css";
import { Pagination } from "@mui/material";
import usePrivateApi from "api/usePrivateApi";
import { BsFillExclamationCircleFill } from "react-icons/bs";
import { ModalAdoption } from "components/Modals/ModalAdoption";
import { AdoptionStatus } from "constant/Status";

export default function CardTableAdoption({ color }) {
  const privateApi = usePrivateApi();

  const [adoptions, setAdoptions] = useState([]);
  const [currentAdoptionEdit, setCurrentAdoptionEdit] = useState(null);
  const [isDataChange, setIsDataChange] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(AdoptionStatus.Waiting);
  const [adoptStatusList, setAdoptStatusList] = useState([]);
  const limit = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    const getAdoptionStatus = async () => {
      const response = await privateApi.getAllAdoptionStatus();
      setAdoptStatusList(response.data);
    };
    getAdoptionStatus();
  }, []);

  console.log(selectedStatus);

  useEffect(() => {
    const getAdoptionsByStatus = async () => {
      try {
        const params = {
          limit: limit,
          page: currentPage - 1,
        };
        const response = await privateApi.getAdoptionsByStatus(
          selectedStatus,
          params
        );
        // setAdoptions(response.data);
        setAdoptions(response.data.content);
        setTotalPage(response.data.totalPages);

        // setCurrentAdoptionEdit(response.data.content[0]);
      } catch (err) {
        console.log(err);
      }
    };
    getAdoptionsByStatus();
  }, [isDataChange, selectedStatus, currentPage]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };
  return (
    <>
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
          (color === "light" ? "bg-white" : "bg-lightBlue-900 text-white")
        }
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0 card-header">
          <div className="flex flex-wrap items-center">
            <div
              className="relative w-full px-1 margin-top: 10 max-w-full flex-grow flex-1"
              align="center"
            >
              <h1
                className={
                  "font-semibold text-lg " +
                  (color === "light" ? "text-blueGray-700" : "text-white")
                }
              >
                ĐƠN ĐĂNG KÝ NHẬN NUÔIdsfsdf
              </h1>
              {/* <h2>Đơn đang chờ xác nhận</h2> */}
              <h2>
                {selectedStatus == AdoptionStatus.Waiting &&
                  "Đơn đang chờ xác nhận"}
                {selectedStatus == AdoptionStatus.Accept && "Đơn đã xác nhận"}
                {selectedStatus == AdoptionStatus.Decline && "Đơn đã hủy bỏ"}
                {selectedStatus == AdoptionStatus.Complete &&
                  "Đơn đã hoàn thành"}
              </h2>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          <div className="table-main flex-1">
            <table className="max-w-full table table-finance">
              <thead>
                <tr>
                  <th>STT</th>
                  <th className="expand4">Người nhận nuôi</th>
                  <th className="expand4">Trẻ được nhận nuôi</th>
                  <th className="expand4">Ngày đăng ký</th>
                  <th className="expand4">
                    <select
                      value={selectedStatus}
                      onChange={(e) => {
                        setCurrentPage(1);
                        setSelectedStatus(e.target.value);
                      }}
                    >
                      {adoptStatusList.map((state, index) => {
                        return (
                          <option
                            key={index}
                            value={state.status}
                            selected={state.status == selectedStatus}
                          >
                            {state.status}
                          </option>
                        );
                      })}
                    </select>
                  </th>
                  <th>Tác vụ</th>
                </tr>
              </thead>
              <tbody>
                {adoptions.map((adoption, idx) => {
                  return (
                    <tr key={idx}>
                      <td>{idx + 1}</td>
                      <td className="expand4">
                        {adoption.adopters.map((adopter, index) => {
                          let htmlGen = "";
                          if (adopter.gender == "Nam") {
                            htmlGen =
                              htmlGen +
                              "<span>Ông: " +
                              adopter.fullName +
                              "</span>";
                          } else if (adopter.gender == "Nữ") {
                            htmlGen =
                              htmlGen +
                              "<span>Bà: " +
                              adopter.fullName +
                              "</span>";
                          }
                          return (
                            <div
                              key={index}
                              id="textmt"
                              dangerouslySetInnerHTML={{
                                __html: htmlGen,
                              }}
                            />
                          );
                        })}
                      </td>
                      <td className="expand4">
                        {/* {adoption?.adopters[1]?.fullName} */}
                        {adoption.adoptedChild.fullName}
                      </td>
                      <td className="expand4">{adoption?.registerDate}</td>
                      <td>{adoption.status.status}</td>
                      <td style={{ textWrap: "nowrap" }}>
                        <button
                          className="flex items-center "
                          onClick={() => {
                            setCurrentAdoptionEdit(adoption);
                          }}
                        >
                          <BsFillExclamationCircleFill />
                          <span className="text-center ml-1"> Chi tiết</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div
            className="mb-3 mt-5"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Pagination
              count={totalPage}
              page={currentPage}
              onChange={handlePageChange}
            />
          </div>
        </div>
      </div>
      {currentAdoptionEdit && (
        <ModalAdoption
          closeModal={() => {
            setCurrentAdoptionEdit(null);
          }}
          adoption={currentAdoptionEdit}
          onSubmit={() => {
            setIsDataChange(!isDataChange);
            setCurrentAdoptionEdit(null);
          }}
        />
      )}
    </>
  );
}

CardTableAdoption.defaultProps = {
  color: "light",
};

CardTableAdoption.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
