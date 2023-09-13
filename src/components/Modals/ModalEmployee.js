import React, { useEffect, useMemo, useState } from "react";
import usePrivateApi from "api/usePrivateApi";
import privateFormDataApi from "api/privateFormDataApi";
import { reunicode, regexEmail, regexPhoneNumber } from "constant/Regrex";
// import { useForm } from "react-hook-form";
export const ModalEmployee = ({ closeModal, onSubmit, defaultValue }) => {
  const privateApi = usePrivateApi();
  function isValid(str) {
    return reunicode.test(str);
  }
  const privateFDataApi = privateFormDataApi();
  const [jobs, setJobs] = useState([]);
  const [shifts, setShifts] = useState([]);
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    birthDay: "",
    gender: "",
    nationality: "",
    addressTemporary: "",
    addressPermanent: "",
    email: "",
    phoneNumber: "",
    fromDate: "",
    salary: "",
    job: {
      jobId: null,
    },
    shift: {
      shiftId: null,
    },
  });

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
    image: "",
  });

  const [image, setImage] = useState();

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

  const [errors, setErrors] = useState("");
  // const validateForm = () => {
  //   if (
  //     formState.firstName &&
  //     formState.lastName &&
  //     formState.birthDay &&
  //     formState.gender &&
  //     formState.addressPermanent &&
  //     formState.addressTemporary &&
  //     formState.salary &&
  //     formState.phoneNumber &&
  //     formState.nationality
  //   ) {
  //     if (formState.salary < 1000000) {
  //       setErrors("Lương nhân viên phải lớn hơn 1.000.000 VND");
  //     }
  //     if (formState.salary > 50000000) {
  //       setErrors("Lương nhân viên phải nhỏ hơn 50.000.000 VND");
  //     }
  //     setErrors("");
  //     return true;
  //   } else {
  //     setErrors("Vui lòng điền đầy đủ thông tin");
  //     return false;
  //   }
  // };

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

    if (!isValid(formState.firstName)) {
      var fNameErr = "Vui lòng điền đúng định dạng";
      result = false;
    } else {
      var fNameErr = "";
    }

    if (formState.lastName.trim() === "") {
      var lNameErr = "Vui lòng điền đúng định dạng";
      result = false;
    } else {
      var lNameErr = "";
    }
    if (!validateBDay(formState.birthDay)) {
      var bDayErr = "Vui lòng chọn ngày sinh hợp lệ";
      result = false;
    } else {
      var bDayErr = "";
    }

    if (formState.addressPermanent.trim() === "") {
      var lAddressErr = "Vui lòng điền trường này";
      result = false;
    } else {
      var lAddressErr = "";
    }

    if (formState.nationality.trim() === "") {
      var lNationErr = "Vui lòng điền trường này";
      result = false;
    } else {
      var lNationErr = "";
    }

    if (!formState.phoneNumber.match(regexPhoneNumber)) {
      var phonesErr = "Vui lòng điền số điện thoại hợp lệ";
      result = false;
    } else {
      var phonesErr = "";
    }

    if (!formState.email.toLowerCase().match(regexEmail)) {
      var emailErr = "Vui lòng điền email hợp lệ";
      result = false;
    } else {
      var emailErr = "";
    }

    if (!formState.fromDate) {
      var fDateErr = "Vui lòng chọn ngày làm việc";
      result = false;
    } else {
      var fDateErr = "";
    }

    if (!formState.salary) {
      var salaryErr = "Vui lòng điền trường này";
      result = false;
    } else if (formState.salary < 0) {
      var salaryErr = "Vui lòng điền lương hợp lệ";
      result = false;
    } else {
      var salaryErr = "";
    }

    if (!formState.job.jobId) {
      var jobErr = "Vui lòng chọn công việc";
      result = false;
    } else {
      var jobErr = "";
    }

    if (!formState.shift.shiftId) {
      var shiftErr = "Vui lòng chọn ca làm việc";
      result = false;
    } else {
      var shiftErr = "";
    }

    if (!image) {
      var imageErr = "Vui lòng chọn ảnh";
      result = false;
    } else {
      var imageErr = "";
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
      job: jobErr,
      shift: shiftErr,
      image: imageErr,
    });
    return result;
  };

  const handleChange = (e) => {
    // validate input salary
    let { value, min, max } = e.target;
    value = Math.max(Number(min), Math.min(Number(max)), Number.value);
    // this.setFormState({value})
    setFormState({
      ...formState,
      [e.target.number]: e.target.value,
      [e.target.name]: e.target.value,
    });
  };

  const handleJobChange = (e) => {
    const job = formState.job;
    job.jobId = e.target.value;
    setFormState({
      ...formState,
      job: job,
    });
  };

  const handleShiftChange = (e) => {
    const shift = formState.shift;
    shift.shiftId = e.target.value;
    setFormState({
      ...formState,
      shift: shift,
    });
  };

  const handleImageChoose = async (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      var newDate = new Date(formState.birthDay);
      let dateMDY = `${newDate.getDate()}-${
        newDate.getMonth() + 1
      }-${newDate.getFullYear()}`;

      formState.birthDay = dateMDY;

      var newFromDate = new Date(formState.fromDate);
      let dateFrMDY = `${newFromDate.getDate()}-${
        newFromDate.getMonth() + 1
      }-${newFromDate.getFullYear()}`;
      formState.fromDate = dateFrMDY;
      console.log(formState);

      const data = new FormData();
      data.append(
        "employee",
        new Blob(
          [
            JSON.stringify({
              firstName: formState.firstName,
              lastName: formState.lastName,
              gender: formState.gender,
              nationality: formState.nationality,
              addressPermanent: formState.addressPermanent,
              addressTemporary: formState.addressTemporary,
              birthDay: formState.birthDay,
              fromDate: formState.fromDate,
              email: formState.email,
              phoneNumber: formState.phoneNumber,
              job: formState.job,
              shift: formState.shift,
              salary: formState.salary,
            }),
          ],
          {
            type: "application/json",
          }
        )
      );
      data.append("image", image);

      const response = await privateFDataApi.addEmployee(data);
      closeModal();
      if (response.status == 200) {
        alert("Đã thêm thành công");
      } else {
        alert("Thất bại");
      }
      onSubmit();
    }
  };

  return (
    <div
      className="modal-container"
      onClick={(e) => {
        if (e.target.className === "modal-container") closeModal();
      }}
      style={{ zIndex: "100", paddingTop: "15px" }}
    >
      <div className="modal w-6" style={{ height: "100%", width: "50em" }}>
        <h1 className="font-semibold text-xl text-center ">
          Nhập thông tin nhân viên
        </h1>
        <h6 className="font-semibold italic text-center mb-5 text-blue-500">
          (*) Bắt buộc phải nhập
        </h6>
        {/* <br /> */}
        <form>
          <div className="form-group">
            <input
              type="text"
              name="firstName"
              placeholder="Tên (*)"
              value={formState.firstName}
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
              placeholder="Họ và tên đệm (*)"
              value={formState.lastName}
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
                  value={formState.birthDay}
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
                  value={formState.gender}
                  onChange={handleChange}
                >
                  <option value="select" disabled>
                    Giới tính (*)
                  </option>
                  <option value="nam">Nam/Male</option>
                  <option value="nữ">Nữ/Female</option>
                  <option value="khác">Khác/Other</option>
                </select>
                <span className="text-sm text-red-500 text-bold"></span>
              </div>
            </div>
          </div>

          <div className="form-group">
            <input
              name="addressPermanent"
              placeholder="Địa chỉ thường trú (*)"
              value={formState.addressPermanent}
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
              value={formState.addressTemporary}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input
              name="phoneNumber"
              placeholder="Số điện thoại (*)"
              value={formState.phoneNumber}
              onChange={handleChange}
            />
            <span className="text-sm text-red-500 text-bold">
              {formErrors.phoneNumber && <i>* {formErrors.phoneNumber}</i>}
            </span>
          </div>
          <div className="form-group">
            <input
              name="email"
              placeholder="Địa chỉ email (*)"
              value={formState.email}
              onChange={handleChange}
            />
            <span className="text-sm text-red-500 text-bold">
              {formErrors.email && <i>* {formErrors.email}</i>}
            </span>
          </div>
          <div className="form-group">
            <input
              name="nationality"
              placeholder="Quốc tịch (*)"
              value={formState.nationality}
              onChange={handleChange}
            />
            <span className="text-sm text-red-500 text-bold">
              {formErrors.nationality && <i>* {formErrors.nationality}</i>}
            </span>
          </div>
          <div className="form-group">
            <input
              name="fromDate"
              value={formState.fromDate}
              placeholder="Ngày bắt đầu làm việc (*)"
              type="text"
              onFocus={(e) => (e.target.type = "date")}
              onBlur={(e) => (e.target.type = "text")}
              onChange={handleChange}
            />
            <span className="text-sm text-red-500 text-bold">
              {formErrors.fromDate && <i>* {formErrors.fromDate}</i>}
            </span>
          </div>
          <div className="form-group">
            <div className="flex justify-between fl-inputs">
              <div>
                <select
                  name="job"
                  value={formState.job.jobId}
                  onChange={handleJobChange}
                  defaultValue={0}
                >
                  <option value={0} disabled>
                    Chọn công việc (*)
                  </option>
                  {jobs.map((job, index) => (
                    <option key={index} value={job.jobId}>
                      {job.jobTitle}
                    </option>
                  ))}
                </select>
                <span className="text-sm text-red-500 text-bold">
                  {formErrors.job && <i>* {formErrors.job}</i>}
                </span>
              </div>
              <div>
                <select
                  name="shift"
                  value={formState.shift.shiftId}
                  onChange={handleShiftChange}
                  defaultValue={0}
                >
                  <option value={0} disabled>
                    Chọn ca làm việc (*)
                  </option>
                  {shifts.map((shift, index) => (
                    <option key={index} value={shift.shiftId}>
                      {shift.shiftTitle}: {shift.timeStart} - {shift.timeEnd}
                    </option>
                  ))}
                </select>
                <span className="text-sm text-red-500 text-bold">
                  {formErrors.shift && <i>* {formErrors.shift}</i>}
                </span>
              </div>
            </div>
          </div>
          <div className="form-group">
            <input
              name="salary"
              type="number"
              placeholder="Lương (*)"
              value={formState.salary}
              onChange={handleChange}
              min="1000000"
              max="50000000"
            />
            <span className="text-sm text-red-500 text-bold">
              {formErrors.salary && <i>* {formErrors.salary}</i>}
            </span>
          </div>
          <div className="form-group">
            <input type="file" id="image" onChange={handleImageChoose} />
            <span className="text-sm text-red-500 text-bold">
              {formErrors.image && <i>* {formErrors.image}</i>}
            </span>
          </div>
          {errors && <div className="error">{errors}</div>}
          <button type="submit" className="btn" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
