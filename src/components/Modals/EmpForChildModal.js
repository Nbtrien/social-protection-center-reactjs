import usePrivateApi from "api/usePrivateApi";
import { useEffect, useState } from "react";

export const EmpForChildModal = ({ children, onClose, onSubmit }) => {
  const privateApi = usePrivateApi();
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const getEmployees = async () => {
      const response = await privateApi.getEmployeeForChild(children.childId);
      setEmployees(response.data);
    };
    getEmployees();
  }, []);

  const handleAcceptClick = async (empId) => {
    const response = await privateApi.addEmployeeForChild(
      children.childId,
      empId
    );
    if (response.status == 204) {
      alert("Thành công");
      onClose();
      onSubmit();
    }
  };

  return (
    <div
      className="modal-container"
      onClick={(e) => {
        if (e.target.className === "modal-container") onClose();
      }}
      style={{ zIndex: "100", paddingTop: "15px" }}
    >
      <div
        className="modal"
        style={{ height: "auto", width: "auto", paddingTop: "20px" }}
      >
        <h1 className="font-semibold text-xl text-center ">
          Danh sách nhân viên phù hợp
        </h1>
        <br />
        <div className="block w-full overflow-x-auto">
          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Họ và tên</th>
                  <th>Giới tính</th>
                  <th>Ca làm việc</th>
                  <th>Tác vụ</th>
                </tr>
              </thead>
              <tbody>
                {employees?.map((emp, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{emp.fullName}</td>
                      <td>{emp.gender}</td>
                      <td>
                        {emp.shift.shiftTitle}: {emp.shift.timeStart} -{" "}
                        {emp.shift.timeEnd}
                      </td>
                      <td>
                        <button
                          className="confirm-btn decline-btn"
                          onClick={() => {
                            handleAcceptClick(emp.employeeId);
                          }}
                        >
                          Xác nhận
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
