import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  BsFillTrashFill,
  BsFillPencilFill,
  BsPlusCircleFill,
  BsListNested,
  BsFillExclamationCircleFill,
  BsChevronUp,
  BsChevronDown,
  BsFillCaretDownSquareFill,
  BsFillPersonXFill,
} from "react-icons/bs";
import "../../assets/styles/tableItems.css";
import { ModalCitizenID } from "components/Modals/ModalCitizenID";
import usePrivateApi from "api/usePrivateApi";
import { ModalChildrenList } from "components/Modals/ModalChildrenList";
import { EmpDetailModal } from "components/Modals/EmpDetailModal";
import { Pagination } from "@mui/material";
import { EmployeeUpdateModal } from "components/Modals/EmployeeUpdateModal";

export default function CardTableEmployee({ color, deleteRow, editRow }) {
  const privateApi = usePrivateApi();

  const [employees, setEmployees] = useState([]);
  const [modalCitizenId, setModalCitizenId] = useState(false);
  const [currentEmployeeAddId, setCurrentEmployeeAddId] = useState(0);

  const [modalChildrenId, setModalChildrenId] = useState(0);
  const [currentEmpDetail, setCurrentEmpDetail] = useState();
  const [currentEmpUpdate, setCurrentEmpUpdate] = useState(null);

  const [jobSelectFilter, setJobSelectFilter] = useState(false);
  const [jobFilter, setJobFilter] = useState(null);
  const [statusFilter, setStatusFilter] = useState(0);

  const limit = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [totalElement, setTotalElement] = useState(0);
  const [isDataChange, setIsDataChange] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [sort, setSort] = useState({
    sortBy: "fromDate",
    sortDirec: "DESC",
  });

  useEffect(() => {
    const params = {
      limit: limit,
      page: currentPage - 1,
    };
    if (sort.sortBy) {
      params.sortBy = sort.sortBy;
    }
    if (sort.sortDirec) {
      params.sortDirec = sort.sortDirec;
    }
    const getEmployees = async () => {
      try {
        console.log(statusFilter);
        if (statusFilter == 0) {
          const response = await privateApi.getWorkingEmployees(params);
          setTotalPage(response.data.totalPages);
          setTotalElement(response.data.totalElements);
          setEmployees(response.data.content);
        } else {
          const response = await privateApi.getEmployeeQuits(params);
          setTotalPage(response.data.totalPages);
          setTotalElement(response.data.totalElements);
          setEmployees(response.data.content);
        }
        // const response = await privateApi.getAllEmployees(params);

        // setCurrentEmpUpdate(response.data.content[0]);
      } catch (error) {
        console.log(error);
      }
    };

    const getEmployeesByJob = async () => {
      if (statusFilter == 0) {
        const response = await privateApi.getWorkingEmployeesByJob(
          jobFilter,
          params
        );
        setTotalPage(response.data.totalPages);
        setTotalElement(response.data.totalElements);
        setEmployees(response.data.content);
      } else {
        const response = await privateApi.getEmployeeQuitsByJob(
          jobFilter,
          params
        );
        setTotalPage(response.data.totalPages);
        setTotalElement(response.data.totalElements);
        setEmployees(response.data.content);
      }
      // const response = await privateApi.getEmployeesByJob(jobFilter, params);
      // setTotalPage(response.data.totalPages);
      // setTotalElement(response.data.totalElements);
      // setEmployees(response.data.content);
    };

    if (jobFilter) {
      getEmployeesByJob();
    } else {
      getEmployees();
    }
  }, [currentPage, isDataChange, sort, jobFilter, statusFilter]);

  useEffect(() => {
    const getJobs = async () => {
      const response = await privateApi.getAllJobs();
      setJobs(response.data);
      console.log("get job");
    };
    if (jobSelectFilter & (jobs.length == 0)) {
      getJobs();
    }
  }, [jobSelectFilter]);

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
    alert("Thêm thành công!");
    setCurrentEmployeeAddId(0);
    setModalCitizenId(false);
    setIsDataChange(!isDataChange);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleJobFilterChange = (e) => {
    if (e.target.value == 0) {
      setJobFilter(null);
      setJobSelectFilter(false);
    } else {
      setJobFilter(e.target.value);
    }
    setCurrentPage(1);
  };

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const handleDeleteEmp = async (emp) => {
    let mess = "";
    if (emp.job.jobTitle == "Chăm sóc trẻ") {
      mess = "Đây là nhân viên quản lý trẻ, Bạn xác nhận đã nghỉ việc?";
    } else {
      mess = "Xác nhận nhân viên " + emp.fullName + " đã nghỉ việc";
    }

    if (confirm(mess)) {
      const cDate = new Date();
      const dateExMDY = `${cDate.getDate()}-${
        cDate.getMonth() + 1
      }-${cDate.getFullYear()}`;
      emp.toDate = dateExMDY;
      // alert(emp.toDate);
      const response = await privateApi.updateEmployee(emp.employeeId, emp);
      console.log(response);
      if (response.status == 200) {
        alert("Thành công");
        setIsDataChange(!isDataChange);
      } else {
        alert("Thất bại");
      }
    } else {
      alert(emp.toDate);
    }
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
            <div>
              <div className="relative flex w-full flex-wrap items-stretch">
                <span className="z-10 h-full leading-snug font-normal absolute text-center text-black absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                  <i className="fas fa-search"></i>
                </span>
                <input
                  // onChange={handleSearch}
                  type="text"
                  placeholder="Tìm theo tên..."
                  className="px-3 py-3 bg-teal-200 text-black relative rounded text-sm outline-none focus:outline-none w-full pl-10"
                />
              </div>
            </div>
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
            <div>
              <select
                name="statusFilter"
                defaultValue={0}
                value={statusFilter}
                onChange={handleStatusFilterChange}
              >
                <option value="0">Đang làm việc</option>
                <option value="1">Đã nghỉ việc</option>
              </select>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          <div className="table-wrapper">
            {statusFilter == 0 ? (
              <table className="table">
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Ảnh</th>
                    <th>Họ và tên</th>
                    <th>Ngày sinh</th>
                    <th>Giới tính</th>
                    <th>Quốc tịch</th>
                    <th>Địa chỉ thường trú</th>
                    <th>Email</th>
                    <th>Số điện thoại</th>
                    <th>
                      <div className="flex">
                        <div
                          className="mr-2"
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          Ngày nhận việc
                        </div>
                        <span style={{ fontSize: "13px" }}>
                          <button
                            style={{ display: "block" }}
                            onClick={() => {
                              setSort({
                                sortBy: "fromDate",
                                sortDirec: "ASC",
                              });
                              setCurrentPage(1);
                            }}
                          >
                            <BsChevronUp />
                          </button>
                          <button
                            onClick={() => {
                              setSort({
                                sortBy: "fromDate",
                                sortDirec: "DESC",
                              });
                              setCurrentPage(1);
                            }}
                          >
                            <BsChevronDown />
                          </button>
                        </span>
                      </div>
                    </th>
                    {/* <th>Công việc</th> */}
                    <th>
                      <span className="mr-2">Công việc</span>
                      <button
                        onClick={() => {
                          setJobSelectFilter(true);
                        }}
                      >
                        <BsFillCaretDownSquareFill />
                      </button>
                      {jobSelectFilter && (
                        <>
                          <div className="form-group">
                            <select
                              onChange={handleJobFilterChange}
                              defaultValue={0}
                            >
                              <option value="0">Tất cả</option>
                              {jobs.map((job, index) => {
                                return (
                                  <option key={index} value={job.jobId}>
                                    {job.jobTitle}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                        </>
                      )}
                    </th>
                    <th>Ca làm việc</th>
                    <th>
                      {" "}
                      <div className="flex">
                        <div
                          className="mr-2"
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          Lương
                        </div>
                        <span style={{ fontSize: "13px" }}>
                          <button
                            style={{ display: "block" }}
                            onClick={() => {
                              setSort({
                                sortBy: "salary",
                                sortDirec: "ASC",
                              });
                              setCurrentPage(1);
                            }}
                          >
                            <BsChevronUp />
                          </button>
                          <button
                            onClick={() => {
                              setSort({
                                sortBy: "salary",
                                sortDirec: "DESC",
                              });
                              setCurrentPage(1);
                            }}
                          >
                            <BsChevronDown />
                          </button>
                        </span>
                      </div>
                    </th>
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
                        {/* <td>{employee.addressTemporary}</td> */}
                        <td>{employee.addressPermanent}</td>
                        <td>{employee.email}</td>
                        <td>{employee.phoneNumber}</td>
                        <td>{employee.fromDate}</td>
                        <td>{employee.job.jobTitle}</td>
                        <td>
                          {employee.shift.shiftTitle}:{" "}
                          {employee.shift.timeStart} - {employee.shift.timeEnd}
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
                              setCurrentEmpUpdate(employee);
                            }}
                          >
                            <BsFillPencilFill />
                            <span className="text-center ml-1"> Sửa</span>
                          </button>
                          <button
                            className="flex items-center "
                            onClick={() => {
                              // setCurrentEmpUpdate(employee);
                              handleDeleteEmp(employee);
                            }}
                          >
                            <BsFillPersonXFill />
                            <span className="text-center ml-1"> Nghỉ việc</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <table className="table">
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Ảnh</th>
                    <th>Họ và tên</th>
                    <th>Ngày sinh</th>
                    <th>Giới tính</th>
                    <th>Quốc tịch</th>
                    <th>Địa chỉ thường trú</th>
                    <th>Email</th>
                    <th>Số điện thoại</th>
                    <th>
                      <div className="flex">
                        <div
                          className="mr-2"
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          Ngày nhận việc
                        </div>
                        <span style={{ fontSize: "13px" }}>
                          <button
                            style={{ display: "block" }}
                            onClick={() => {
                              setSort({
                                sortBy: "fromDate",
                                sortDirec: "ASC",
                              });
                              setCurrentPage(1);
                            }}
                          >
                            <BsChevronUp />
                          </button>
                          <button
                            onClick={() => {
                              setSort({
                                sortBy: "fromDate",
                                sortDirec: "DESC",
                              });
                              setCurrentPage(1);
                            }}
                          >
                            <BsChevronDown />
                          </button>
                        </span>
                      </div>
                    </th>
                    <th>
                      <div className="flex">
                        <div
                          className="mr-2"
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          Ngày nghỉ việc
                        </div>
                        <span style={{ fontSize: "13px" }}>
                          <button
                            style={{ display: "block" }}
                            onClick={() => {
                              setSort({
                                sortBy: "fromDate",
                                sortDirec: "ASC",
                              });
                              setCurrentPage(1);
                            }}
                          >
                            <BsChevronUp />
                          </button>
                          <button
                            onClick={() => {
                              setSort({
                                sortBy: "fromDate",
                                sortDirec: "DESC",
                              });
                              setCurrentPage(1);
                            }}
                          >
                            <BsChevronDown />
                          </button>
                        </span>
                      </div>
                    </th>
                    <th>
                      <span className="mr-2">Công việc</span>
                      <button
                        onClick={() => {
                          setJobSelectFilter(true);
                        }}
                      >
                        <BsFillCaretDownSquareFill />
                      </button>
                      {jobSelectFilter && (
                        <>
                          <div className="form-group">
                            <select
                              onChange={handleJobFilterChange}
                              defaultValue={0}
                            >
                              <option value="0">Tất cả</option>
                              {jobs.map((job, index) => {
                                return (
                                  <option key={index} value={job.jobId}>
                                    {job.jobTitle}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                        </>
                      )}
                    </th>
                    <th>Ca làm việc</th>
                    <th>
                      <div className="flex">
                        <div
                          className="mr-2"
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          Lương
                        </div>
                        <span style={{ fontSize: "13px" }}>
                          <button
                            style={{ display: "block" }}
                            onClick={() => {
                              setSort({
                                sortBy: "salary",
                                sortDirec: "ASC",
                              });
                              setCurrentPage(1);
                            }}
                          >
                            <BsChevronUp />
                          </button>
                          <button
                            onClick={() => {
                              setSort({
                                sortBy: "salary",
                                sortDirec: "DESC",
                              });
                              setCurrentPage(1);
                            }}
                          >
                            <BsChevronDown />
                          </button>
                        </span>
                      </div>
                    </th>
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
                        <td>{employee.addressPermanent}</td>
                        <td>{employee.email}</td>
                        <td>{employee.phoneNumber}</td>
                        <td>{employee.fromDate}</td>
                        <td>{employee.toDate}</td>
                        <td>{employee.job.jobTitle}</td>
                        <td>
                          {employee.shift.shiftTitle}:{" "}
                          {employee.shift.timeStart} - {employee.shift.timeEnd}
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
                              setCurrentEmpDetail(employee);
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
            )}
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
      {currentEmpUpdate && (
        <EmployeeUpdateModal
          employee={currentEmpUpdate}
          onSubmit={() => setIsDataChange(!isDataChange)}
          onClose={() => setCurrentEmpUpdate(null)}
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
