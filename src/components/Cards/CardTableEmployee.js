import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  BsFillTrashFill,
  BsFillPencilFill,
  BsPlusCircleFill,
  BsListNested,
  BsFillExclamationCircleFill,
} from "react-icons/bs";
import "../../assets/styles/tableItems.css";
import { ModalCitizenID } from "components/Modals/ModalCitizenID";
import usePrivateApi from "api/usePrivateApi";
import { ModalChildrenList } from "components/Modals/ModalChildrenList";
import { EmpDetailModal } from "components/Modals/EmpDetailModal";
import { Pagination } from "@mui/material";

export default function CardTableEmployee({ color, deleteRow, editRow }) {
  const privateApi = usePrivateApi();

  const [employees, setEmployees] = useState([]);
  const [modalCitizenId, setModalCitizenId] = useState(false);
  const [currentEmployeeAddId, setCurrentEmployeeAddId] = useState(0);

  const [modalChildrenId, setModalChildrenId] = useState(0);
  const [currentEmpDetail, setCurrentEmpDetail] = useState();

  const limit = 2;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [totalElement, setTotalElement] = useState(0);

  useEffect(() => {
    const params = {
      limit: limit,
      page: currentPage - 1,
    };
    const getEmployees = async () => {
      try {
        const response = await privateApi.getAllEmployees(params);
        setTotalPage(response.data.totalPages);
        setTotalElement(response.data.totalElements);
        setEmployees(response.data.content);
      } catch (error) {
        console.log(error);
      }
    };
    getEmployees();
  }, [currentPage]);

  // console.log(employees);

  const handleAddCitizenClick = (id) => {
    setCurrentEmployeeAddId(id);
    setModalCitizenId(true);
  };

  const handleAddCitizenSubmit = async (citizenId) => {
    const response = await privateApi.addCitizenIdForEmployee(
      currentEmployeeAddId,
      citizenId
    );
    setCurrentEmployeeAddId(0);
    setModalCitizenId(false);
  };

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
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div
              className="relative w-full px-4 max-w-full flex-grow flex-1"
              align="center"
            >
              <h3
                className={
                  "font-semibold text-lg " +
                  (color === "light" ? "text-blueGray-700" : "text-white")
                }
              >
                DANH SÁCH NHÂN VIÊN
              </h3>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Ảnh</th>
                  <th>Họ và tên</th>
                  <th>Ngày sinh</th>
                  <th>Giới tính</th>
                  <th>Quốc tịch</th>
                  <th>Địa chỉ tạm trú</th>
                  <th>Địa chỉ thường trú</th>
                  <th>Email</th>
                  <th>Số điện thoại</th>
                  <th>Công việc</th>
                  <th>Ca làm việc</th>
                  <th>Lương</th>
                  <th>Tác vụ</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee, idx) => {
                  return (
                    <tr key={idx}>
                      <td>{idx + 1}</td>
                      <td>
                        <img
                          className="min-w-140-px"
                          src={employee.image.imageUrl}
                        />
                      </td>
                      <td>{employee.fullName}</td>
                      <td>{employee.birthDay}</td>
                      <td>{employee.gender}</td>
                      <td>{employee.nationality}</td>
                      <td>{employee.addressTemporary}</td>
                      <td>{employee.addressPermanent}</td>
                      <td>{employee.email}</td>
                      <td>{employee.phoneNumber}</td>
                      <td>{employee.job.jobTitle}</td>
                      <td>
                        {employee.shift.shiftTitle}: {employee.shift.timeStart}{" "}
                        - {employee.shift.timeEnd}
                      </td>
                      <td>
                        {employee.salary.toLocaleString("it-IT", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </td>
                      <td style={{ textWrap: "nowrap" }}>
                        <button
                          className="flex items-center "
                          onClick={() => {
                            setModalChildrenId(employee.employeeId);
                          }}
                        ></button>
                        {!employee.citizenId && (
                          <button
                            className="flex items-center "
                            onClick={() =>
                              handleAddCitizenClick(employee.employeeId)
                            }
                          >
                            <BsPlusCircleFill />
                            <span className="text-center ml-1"> CCCD</span>
                          </button>
                        )}
                        <button
                          className="flex items-center "
                          onClick={() => {
                            setCurrentEmpDetail(employee);
                          }}
                        >
                          <BsFillExclamationCircleFill />
                          <span className="text-center ml-1"> Chi tiết</span>
                        </button>
                        {employee.job.jobTitle == "Chăm sóc trẻ" && (
                          <button
                            className="flex items-center "
                            onClick={() => {
                              setModalChildrenId(employee.employeeId);
                            }}
                          >
                            <BsListNested />
                            <span className="text-center ml-1">DS trẻ</span>
                          </button>
                        )}

                        <button className="flex items-center ">
                          <BsFillPencilFill />
                          <span className="text-center ml-1"> Sửa</span>
                        </button>
                        <button className="flex items-center ">
                          <BsFillTrashFill />
                          <span className="text-center ml-1"> Xóa</span>
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
      {modalCitizenId && currentEmployeeAddId && (
        <ModalCitizenID
          childId={currentEmployeeAddId}
          closeModal={() => {
            setModalCitizenId(false);
          }}
          onSubmit={handleAddCitizenSubmit}
        />
      )}
      {modalChildrenId != 0 && (
        <ModalChildrenList
          employeeId={modalChildrenId}
          closeModal={() => setModalChildrenId(0)}
        />
      )}
      {currentEmpDetail && (
        <EmpDetailModal
          employee={currentEmpDetail}
          onClose={() => setCurrentEmpDetail(null)}
        />
      )}
    </>
  );
}

CardTableEmployee.defaultProps = {
  color: "light",
};

CardTableEmployee.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
