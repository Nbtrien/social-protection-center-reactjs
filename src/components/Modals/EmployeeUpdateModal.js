import React, { useEffect, useMemo, useState } from "react";
import JoditEditor from "jodit-react";
import usePrivateApi from "api/usePrivateApi";
import privateFormDataApi from "api/privateFormDataApi";
import { reunicode, birthDateValid } from "constant/Regrex";
import moment from "moment";
import { BsPlusCircle } from "react-icons/bs";
import { regexPhoneNumber } from "constant/Regrex";
import { regexEmail } from "constant/Regrex";

export const EmployeeUpdateModal = ({ onClose, onSubmit, employee }) => {
  const [emp, setEmp] = useState(employee);
  const privateApi = usePrivateApi();
  const privateFDataApi = privateFormDataApi();
  const [image, setImage] = useState();
  const [cccdInp, setCccdInp] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [shifts, setShifts] = useState([]);
  const [citizenId, setCitizenId] = useState(
    employee?.citizenId || {
      citizenIdentNumber: "",
      issueDate: "",
      expireDate: "",
      issuePlace: "",
    }
  );

  const [formErrors, setFormErrors] = useState({
    firstName: "",
    lastName: "",
    birthDay: "",
    nationality: "",
    addressPermanent: "",
    email: "",
    phoneNumber: "",
    fromDate: "",
    salary: "",
  });

  const [formCitizErrors, setFormCitizErrors] = useState({
    citizenIdentNumber: "",
    issueDate: "",
    expireDate: "",
    issuePlace: "",
  });

  function isValid(str) {
    return reunicode.test(str);
  }

  const validateBDay = (dob1) => {
    if (!dob1) {
      return false;
    }
    var today = new Date();
    var birthDate = new Date(dob1);
    if (birthDate > today) return false;

    var age_now = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age_now--;
    }
    if (age_now < 18) {
      return false;
    }
    return true;
  };

  const validateForm = () => {
    let result = true;

    if (!isValid(emp.firstName)) {
      var fNameErr = "Vui lòng điền đúng định dạng";
      result = false;
    } else {
      var fNameErr = "";
    }

    if (emp.lastName.trim() === "") {
      var lNameErr = "Vui lòng điền đúng định dạng";
      result = false;
    } else {
      var lNameErr = "";
    }
    if (!validateBDay(emp.birthDay)) {
      var bDayErr = "Vui lòng chọn ngày sinh hợp lệ";
      result = false;
    } else {
      var bDayErr = "";
    }
    if (emp.addressPermanent.trim() === "") {
      var lAddressErr = "Vui lòng điền trường này";
      result = false;
    } else {
      var lAddressErr = "";
    }
    if (emp.nationality.trim() === "") {
      var lNationErr = "Vui lòng điền trường này";
      result = false;
    } else {
      var lNationErr = "";
    }

    if (!emp.phoneNumber.match(regexPhoneNumber)) {
      var phonesErr = "Vui lòng điền số điện thoại hợp lệ";
      result = false;
    } else {
      var phonesErr = "";
    }

    if (!emp.email.toLowerCase().match(regexEmail)) {
      var emailErr = "Vui lòng điền email hợp lệ";
      result = false;
    } else {
      var emailErr = "";
    }
    if (!emp.fromDate) {
      var fDateErr = "Vui lòng chọn ngày làm việc";
      result = false;
    } else {
      var fDateErr = "";
    }
    if (!emp.salary) {
      var salaryErr = "Vui lòng điền trường này";
      result = false;
    } else if (emp.salary < 0) {
      var salaryErr = "Vui lòng điền lương hợp lệ";
      result = false;
    } else {
      var salaryErr = "";
    }

    setFormErrors({
      firstName: fNameErr,
      lastName: lNameErr,
      birthDay: bDayErr,
      addressPermanent: lAddressErr,
      nationality: lNationErr,
      email: emailErr,
      phoneNumber: phonesErr,
      salary: salaryErr,
      fromDate: fDateErr,
    });
    return result;
  };
  const validateCitizenForm = () => {
    let result = true;

    const today = new Date();

    if (!(citizenId.citizenIdentNumber.length == 12)) {
      var IdentNumErr = "Vui lòng điền đúng định dạng";
      result = false;
    } else {
      var IdentNumErr = "";
    }

    var isDate = new Date(citizenId.issueDate);
    var exDate = new Date(citizenId.expireDate);
    if (!citizenId.issueDate) {
      var isDateErr = "Vui lòng chọn ngày hợp lệ";
      result = false;
    } else {
      var isDateErr = "";
    }
    if (!citizenId.expireDate) {
      var exDateErr = "Vui lòng chọn ngày hợp lệ";
      result = false;
    } else {
      var exDateErr = "";
    }

    if (citizenId.issuePlace.trim() === "") {
      var issuePlaceErr = "Vui lòng điền trường này";
      result = false;
    } else {
      var issuePlaceErr = "";
    }

    setFormCitizErrors({
      citizenIdentNumber: IdentNumErr,
      issueDate: isDateErr,
      expireDate: exDateErr,
      issuePlace: issuePlaceErr,
    });
    return result;
  };
  useEffect(() => {
    const getJobs = async () => {
      const response = await privateApi.getAllJobs();
      setJobs(response.data);
    };
    getJobs();
  }, []);

  useEffect(() => {
    const getShifts = async () => {
      const response = await privateApi.getAllShifts();
      setShifts(response.data);
    };
    getShifts();
  }, []);

  const handleChange = (e) => {
    setEmp({
      ...emp,
      [e.target.name]: e.target.value,
    });
  };
  const handleImageChoose = (e) => {
    setImage(e.target.files[0]);
  };
  const handleJobChange = (e) => {
    const job = { jobId: e.target.value };
    setEmp({
      ...emp,
      job: job,
    });
  };

  const handleShiftChange = (e) => {
    const shift = { shiftId: e.target.value };
    setEmp({
      ...emp,
      shift: shift,
    });
  };

  const handleCitizenChange = (e) => {
    setCitizenId({
      ...citizenId,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }
    const data = new FormData();
    if (emp.citizenId) {
      if (!validateCitizenForm()) {
        return;
      }
      let newIsDate = new Date(citizenId.issueDate);
      let dateIsMDY = `${newIsDate.getDate()}-${
        newIsDate.getMonth() + 1
      }-${newIsDate.getFullYear()}`;

      citizenId.issueDate = dateIsMDY;

      let newExDate = new Date(citizenId.expireDate);
      let dateExMDY = `${newExDate.getDate()}-${
        newExDate.getMonth() + 1
      }-${newExDate.getFullYear()}`;
      citizenId.expireDate = dateExMDY;

      emp.citizenId = citizenId;
    }
    let newDate = new Date(emp.birthDay);
    let dateMDY = `${newDate.getDate()}-${
      newDate.getMonth() + 1
    }-${newDate.getFullYear()}`;
    emp.birthDay = dateMDY;

    let newDateIn = new Date(emp.fromDate);
    let dateInMDY = `${newDateIn.getDate()}-${
      newDateIn.getMonth() + 1
    }-${newDateIn.getFullYear()}`;
    emp.fromDate = dateInMDY;

    if (emp.toDate) {
      let newToD = new Date(emp.toDate);
      let toDateMDY = `${newToD.getDate()}-${
        newToD.getMonth() + 1
      }-${newToD.getFullYear()}`;
      emp.toDate = toDateMDY;
    }
    data.append(
      "employee",
      new Blob(
        [
          JSON.stringify({
            employeeId: emp.employeeId,
            firstName: emp.firstName,
            lastName: emp.lastName,
            gender: emp.gender,
            nationality: emp.nationality,
            addressPermanent: emp.addressPermanent,
            addressTemporary: emp.addressTemporary,
            birthDay: emp.birthDay,
            fromDate: emp.fromDate,
            toDate: emp.toDate,
            phoneNumber: emp.phoneNumber,
            email: emp.email,
            job: emp.job,
            citizenId: emp.citizenId,
            shift: emp.shift,
            image: emp.image,
            salary: emp.salary,
          }),
        ],
        {
          type: "application/json",
        }
      )
    );
    if (image) data.append("image", image);

    const response = await privateFDataApi.updateEmployee(data);
    console.log(response);
    if (response.status == 200) {
      alert("Đã sửa thành công!");
      onSubmit();
      onClose();
    } else {
      alert("Sửa không thành công!");
      onClose();
    }

    // if (emp.toDate) {
    //   if (confirm("Xác nhận nhân viên đã nghỉ việc")) {
    //     const response = await privateFDataApi.updateEmployee(data);
    //     console.log(response);
    //     if (response.status == 200) {
    //       alert("Đã sửa thành công!");
    //       onSubmit();
    //       onClose();
    //     } else {
    //       alert("Sửa không thành công!");
    //       onClose();
    //     }
    //   } else {
    //     onClose();
    //   }
    // } else {
    //   const response = await privateFDataApi.updateEmployee(data);
    //   console.log(response);
    //   if (response.status == 200) {
    //     alert("Đã sửa thành công!");
    //     onSubmit();
    //     onClose();
    //   } else {
    //     alert("Sửa không thành công!");
    //     onClose();
    //   }
    // }
  };

  return (
    <>
      <div
        className="modal-container"
        onClick={(e) => {
          if (e.target.className === "modal-container") onClose();
        }}
        style={{ zIndex: "100", paddingTop: "15px" }}
      >
        <div
          className="modal w-6 pt4"
          style={{ height: "100%", width: "50em", paddingTop: "20px" }}
        >
          <h1 className="font-semibold text-xl text-center ">
            Sửa thông tin nhân viên
          </h1>
          <form>
            <div className="form-group">
              <input
                type="text"
                name="firstName"
                placeholder="Tên*"
                value={emp.firstName}
                onChange={handleChange}
              />
              <span className="text-sm text-red-500 text-bold">
                {formErrors.firstName && <i>* {formErrors.firstName}</i>}
              </span>
            </div>
            <div className="form-group">
              <input
                type="text"
                name="lastName"
                placeholder="Họ và tên đệm*"
                value={emp.lastName}
                onChange={handleChange}
              />
              <span className="text-sm text-red-500 text-bold">
                {formErrors.lastName && <i>* {formErrors.lastName}</i>}
              </span>
            </div>
            <div className="form-group">
              <div className="flex justify-between fl-inputs">
                <div>
                  <input
                    name="birthDay"
                    value={emp.birthDay}
                    placeholder="Ngày sinh*"
                    type="text"
                    onFocus={(e) => (e.target.type = "date")}
                    onBlur={(e) => (e.target.type = "text")}
                    onChange={handleChange}
                  />
                  <span className="text-sm text-red-500 text-bold">
                    {formErrors.birthDay && <i>* {formErrors.birthDay}</i>}
                  </span>
                </div>
                <div>
                  <select
                    id="gender"
                    name="gender"
                    value={emp.gender}
                    onChange={handleChange}
                  >
                    <option value="nam" selected>
                      Nam/Male
                    </option>
                    <option value="nữ">Nữ/Female</option>
                    <option value="khác">Khác/Other</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="form-group">
              <input
                name="addressPermanent"
                placeholder="Địa chỉ thường trú*"
                value={emp.addressPermanent}
                onChange={handleChange}
              />
              <span className="text-sm text-red-500 text-bold">
                {formErrors.addressPermanent && (
                  <i>* {formErrors.addressPermanent}</i>
                )}
              </span>
            </div>
            <div className="form-group">
              <input
                name="addressTemporary"
                placeholder="Địa chỉ tạm trú"
                value={emp.addressTemporary}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <input
                name="email"
                placeholder="Email*"
                value={emp.email}
                onChange={handleChange}
              />
              <span className="text-sm text-red-500 text-bold">
                {formErrors.email && <i>* {formErrors.email}</i>}
              </span>
            </div>
            <div className="form-group">
              <input
                name="phoneNumber"
                placeholder="Số điện thoại*"
                value={emp.phoneNumber}
                onChange={handleChange}
              />
              <span className="text-sm text-red-500 text-bold">
                {formErrors.phoneNumber && <i>* {formErrors.phoneNumber}</i>}
              </span>
            </div>
            <div className="form-group">
              <input
                name="nationality"
                placeholder="Quốc tịch*"
                value={emp.nationality}
                onChange={handleChange}
              />
              <span className="text-sm text-red-500 text-bold">
                {formErrors.nationality && <i>* {formErrors.nationality}</i>}
              </span>
            </div>
            <div className="form-group">
              <div className="flex justify-between fl-inputs">
                <div>
                  <input
                    name="fromDate"
                    value={emp.fromDate}
                    placeholder="Ngày bắt đầu*"
                    type="text"
                    onFocus={(e) => (e.target.type = "date")}
                    onBlur={(e) => (e.target.type = "text")}
                    onChange={handleChange}
                  />
                </div>
                <span style={{ display: "flex", alignItems: "center" }}>-</span>
                <div>
                  <input
                    name="toDate"
                    value={emp.toDate}
                    placeholder="Ngày nghỉ việc*"
                    type="text"
                    onFocus={(e) => (e.target.type = "date")}
                    onBlur={(e) => (e.target.type = "text")}
                    onChange={handleChange}
                  />
                  {/* <span className="text-sm text-red-500 text-bold">
                    {formErrors.dateIn && <i>* {formErrors.dateIn}</i>}
                  </span> */}
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="flex justify-between fl-inputs">
                <select
                  name="job"
                  value={emp.job.jobId}
                  onChange={handleJobChange}
                >
                  <option value={-1}>Chọn công việc (*)</option>
                  {jobs.map((job, index) => (
                    <option key={index} value={job.jobId}>
                      {job.jobTitle}
                    </option>
                  ))}
                </select>
                <select
                  name="shift"
                  value={emp.shift.shiftId}
                  onChange={handleShiftChange}
                >
                  <option value={-1}>Chọn ca làm việc (*)</option>
                  {shifts.map((shift, index) => (
                    <option key={index} value={shift.shiftId}>
                      {shift.shiftTitle}
                      {": "}
                      {shift.timeStart}
                      {" - "}
                      {shift.timeEnd}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-group">
              <input
                name="salary"
                placeholder="Lương*"
                value={emp.salary}
                onChange={handleChange}
              />
              <span className="text-sm text-red-500 text-bold">
                {formErrors.salary && <i>* {formErrors.salary}</i>}
              </span>
            </div>
            <div className="form-group">
              <input type="file" id="image" onChange={handleImageChoose} />
            </div>
            <div className="mb-2">
              {emp.citizenId && (
                <button
                  className="flex items-center text-red-500 "
                  onClick={(e) => {
                    e.preventDefault();
                    setCccdInp(!cccdInp);
                  }}
                >
                  <BsPlusCircle />
                  <span className="text-center ml-1"> Sửa thông tin CCCD</span>
                </button>
              )}
              {cccdInp && (
                <div className="mt-3">
                  <div className="form-group">
                    <input
                      placeholder="Số căn cước công dân"
                      type="number"
                      inputMode="numeric"
                      maxLength={12}
                      minLength={12}
                      name="citizenIdentNumber"
                      value={citizenId.citizenIdentNumber}
                      onChange={handleCitizenChange}
                    />
                    <span className="text-sm text-red-500 text-bold">
                      {formCitizErrors.citizenIdentNumber && (
                        <i>* {formCitizErrors.citizenIdentNumber}</i>
                      )}
                    </span>
                  </div>
                  <div className="form-group">
                    <input
                      placeholder="Ngày, tháng, năm cấp"
                      name="issueDate"
                      type="text"
                      onFocus={(e) => (e.target.type = "date")}
                      onBlur={(e) => (e.target.type = "text")}
                      value={citizenId.issueDate}
                      onChange={handleCitizenChange}
                    />
                    <span className="text-sm text-red-500 text-bold">
                      {formCitizErrors.issueDate && (
                        <i>* {formCitizErrors.issueDate}</i>
                      )}
                    </span>
                  </div>
                  <div className="form-group">
                    <input
                      placeholder="Ngày, tháng, năm hết hạn"
                      type="text"
                      name="expireDate"
                      onFocus={(e) => (e.target.type = "date")}
                      onBlur={(e) => (e.target.type = "text")}
                      value={citizenId.expireDate}
                      onChange={handleCitizenChange}
                    />
                    <span className="text-sm text-red-500 text-bold">
                      {formCitizErrors.expireDate && (
                        <i>* {formCitizErrors.expireDate}</i>
                      )}
                    </span>
                  </div>
                  <div className="form-group">
                    <input
                      placeholder="Nơi cấp"
                      name="issuePlace"
                      type="text"
                      value={citizenId.issuePlace}
                      onChange={handleCitizenChange}
                    />
                    <span className="text-sm text-red-500 text-bold">
                      {formCitizErrors.issuePlace && (
                        <i>* {formCitizErrors.issuePlace}</i>
                      )}
                    </span>
                  </div>
                </div>
              )}
            </div>

            <button type="submit" className="btn" onClick={handleSubmit}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
