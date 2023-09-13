import React, { useState } from "react";
// components
import Navbar from "components/Navbars/AuthNavbar.js";
import Footer from "components/Footers/Footer.js";
import apiMethod from "api/apiMethod";
import isEmpty from "validator/lib/isEmpty";
import isNumeric from "validator/lib/isNumeric";
import isEmail from "validator/lib/isEmail";
import isMobilePhone from "validator/lib/isMobilePhone";
import isLength from "validator/lib/isLength";

import "../../assets/styles/FormAdoption.css";
import { useEffect } from "react";
import axios from "axios";
import usePrivateApi from "api/usePrivateApi";

export const AdoptionForm = () => {
  const privateApi = usePrivateApi();
  const [adopter, setAdopter] = useState(0);
  const [status, setStatus] = useState(0);
  const [reason, setReason] = useState("abc");
  const [nationalities, setNationalities] = useState([]);
  const [formData, setFormData] = useState({});

  const [isSuccess, setIsSuccess] = useState(false);
  const [husband, setHusband] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    nationality: "",
    addressPermanent: "",
    addressTemporary: "",
    birthday: "",
    phoneNumber: "",
    email: "",
    nation: "",
    occupation: "",
    income: "",
    spouse: "",
    relationship: "",
    citizenIdentNumber: "",
    issueDate: "",
    issuePlace: "",
    expireDate: "",
  });

  // const [husband, setHusband] = useState({
  //   firstName: "Trien",
  //   lastName: "Nguyen",
  //   gender: "",
  //   nationality: "kinh",
  //   addressPermanent: "235, Phường Phúc Xá, Quận Ba Đình, Thành phố Hà Nội",
  //   addressTemporary: "235, Phường Phúc Xá, Quận Ba Đình, Thành phố Hà Nội",
  //   birthday: "",
  //   phoneNumber: "0346695213",
  //   email: "trien@gmail.com",
  //   nation: "Viet Nam",
  //   occupation: "kinh doanh",
  //   income: "50000",
  //   spouse: "",
  //   relationship: "",
  //   citizenIdentNumber: "369852147896",
  //   issueDate: "",
  //   issuePlace: "Cục Cảnh sát quản lý hành chính về trật tự xã hội.",
  //   expireDate: "",
  // });

  // const [wife, setWife] = useState({
  //   firstName: "Thi",
  //   lastName: "Nguyen",
  //   gender: "",
  //   nationality: "kinh",
  //   addressPermanent: "235, Phường Phúc Xá, Quận Ba Đình, Thành phố Hà Nội",
  //   addressTemporary: "235, Phường Phúc Xá, Quận Ba Đình, Thành phố Hà Nội",
  //   birthday: "",
  //   phoneNumber: "0346695213",
  //   email: "thi@gmail.com",
  //   nation: "Viet Nam",
  //   occupation: "kinh doanh",
  //   income: "50000",
  //   spouse: "",
  //   relationship: "",
  //   citizenIdentNumber: "369852147896",
  //   issueDate: "",
  //   issuePlace: "Cục Cảnh sát quản lý hành chính về trật tự xã hội.",
  //   expireDate: "",
  // });

  const [wife, setWife] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    nationality: "",
    addressPermanent: "",
    addressTemporary: "",
    birthday: "",
    phoneNumber: "",
    email: "",
    nation: "",
    occupation: "",
    income: "",
    spouse: "",
    relationship: "",
    citizenIdentNumber: "",
    issueDate: "",
    issuePlace: "",
    expireDate: "",
  });

  const [child, setChild] = useState({
    fullName: "",
    gender: "",
    birthday: "",
    nationality: "",
    citizenIdentNumber: "",
  });

  // const [child, setChild] = useState({
  //   fullName: "nguyen van a",
  //   gender: "Nam",
  //   birthday: "",
  //   nationality: "Viet Nam",
  //   citizenIdentNumber: "123456789102",
  // });

  useEffect(() => {
    const getCity = async () => {
      axios
        .get(
          "http://api.nosomovo.xyz/ethnic/getalllist?_gl=1*15diqen*_ga*MTAwOTg1MzU1Ny4xNjkzMjc2OTAx*_ga_XW6CMNCYH8*MTY5MzI3NjkwMC4xLjEuMTY5MzI3NjkwNS4wLjAuMA.."
        )
        .then((res) => {
          const data = res.data;
          setNationalities(data);
        })
        .catch((error) => console.log(error));
    };
    getCity();
  }, []);

  const [errors, setErrors] = useState({});
  const [husbandErrors, setHusbandErros] = useState({});
  const [wifeErrors, setWifeErros] = useState({});
  const [childErros, setChildErros] = useState({});
  const [reasonError, setReasonErro] = useState();

  const validateHusbandForm = () => {
    const msg = {};
    if (isEmpty(husband.lastName ?? "", { ignore_whitespace: true })) {
      msg.lastName = "*Vui lòng nhập họ!";
    }
    if (isEmpty(husband.firstName ?? "", { ignore_whitespace: true })) {
      msg.firstName = "*Vui lòng nhập tên!";
    }
    if (isEmpty(husband.nationality ?? "")) {
      msg.nationality = "*Vui lòng chọn dân tộc!";
    }
    if (isEmpty(husband.addressPermanent ?? "", { ignore_whitespace: true })) {
      msg.addressPermanent = "*Vui lòng nhập địa chỉ!";
    }
    if (isEmpty(husband.addressTemporary ?? "", { ignore_whitespace: true })) {
      msg.addressTemporary = "*Vui lòng nhập địa chỉ!";
    }
    if (isEmpty(husband.birthday ?? "", { ignore_whitespace: true })) {
      msg.birthday = "*Vui lòng nhập ngày sinh!";
    }
    if (isEmpty(husband.phoneNumber ?? "", { ignore_whitespace: true })) {
      msg.phoneNumber = "*Vui lòng nhập số điện thoại!";
    } else if (!isNumeric(husband.phoneNumber)) {
      msg.phoneNumber = "Vui lòng nhập số!";
    } else if (!isMobilePhone(husband.phoneNumber, "vi-VN")) {
      msg.phoneNumber = "*Số điện thoại ko đúng định dạng!";
    }
    if (isEmpty(husband.email ?? "", { ignore_whitespace: true })) {
      msg.email = "*Vui lòng nhập email!";
    } else if (!isEmail(husband.email)) {
      msg.email = "*Email không đúng đinh dạng!";
    }
    if (isEmpty(husband.nation ?? "", { ignore_whitespace: true })) {
      msg.nation = "*Vui lòng nhập quốc tịch!";
    }
    if (isEmpty(husband.occupation ?? "", { ignore_whitespace: true })) {
      msg.occupation = "*Vui lòng nhập nghề nghiệp!";
    }
    if (isEmpty(husband.income ?? "", { ignore_whitespace: true })) {
      msg.income = "*Vui lòng nhập thu nhập!";
    } else if (!isNumeric(husband.income)) {
      msg.income = "*Vui lòng nhập số!";
    }
    if (
      isEmpty(husband.citizenIdentNumber ?? "", { ignore_whitespace: true })
    ) {
      msg.citizenIdentNumber = "*Vui lòng nhập căn cước!";
    } else if (!isNumeric(husband.citizenIdentNumber)) {
      msg.citizenIdentNumber = "*Vui lòng nhập số!";
    } else if (
      !isLength(husband.citizenIdentNumber, { min: 12, max: undefined })
    ) {
      msg.citizenIdentNumber = "*Căn cước không đúng định dạng!";
    }
    if (isEmpty(husband.issuePlace ?? "", { ignore_whitespace: true })) {
      msg.issuePlace = "*Vui lòng nhập nơi cấp!";
    }
    if (isEmpty(husband.issueDate ?? "", { ignore_whitespace: true })) {
      msg.issueDate = "*Vui lòng nhập ngày cấp!";
    }
    if (isEmpty(husband.expireDate ?? "", { ignore_whitespace: true })) {
      msg.expireDate = "*Vui lòng nhập hạn!";
    }
    setHusbandErros(msg);
    if (Object.keys(msg).length > 0) return false;
    return true;
  };

  const validateWifeForm = () => {
    const msg = {};
    if (isEmpty(wife.lastName ?? "", { ignore_whitespace: true })) {
      msg.lastName = "*Vui lòng nhập họ!";
    }
    if (isEmpty(wife.firstName ?? "", { ignore_whitespace: true })) {
      msg.firstName = "*Vui lòng nhập tên!";
    }
    if (isEmpty(wife.nationality ?? "")) {
      msg.nationality = "*Vui lòng chọn dân tộc!";
    }
    if (isEmpty(wife.addressPermanent ?? "", { ignore_whitespace: true })) {
      msg.addressPermanent = "*Vui lòng nhập địa chỉ!";
    }
    if (isEmpty(wife.addressTemporary ?? "", { ignore_whitespace: true })) {
      msg.addressTemporary = "*Vui lòng nhập địa chỉ!";
    }
    if (isEmpty(wife.birthday ?? "", { ignore_whitespace: true })) {
      msg.birthday = "*Vui lòng nhập ngày sinh!";
    }
    if (isEmpty(wife.phoneNumber ?? "", { ignore_whitespace: true })) {
      msg.phoneNumber = "*Vui lòng nhập số điện thoại!";
    } else if (!isNumeric(wife.phoneNumber)) {
      msg.phoneNumber = "Vui lòng nhập số!";
    } else if (!isMobilePhone(wife.phoneNumber, "vi-VN")) {
      msg.phoneNumber = "*Số điện thoại ko đúng định dạng!";
    }
    if (isEmpty(wife.email ?? "", { ignore_whitespace: true })) {
      msg.email = "*Vui lòng nhập email!";
    } else if (!isEmail(wife.email)) {
      msg.email = "*Email không đúng đinh dạng!";
    }
    if (isEmpty(wife.nation ?? "", { ignore_whitespace: true })) {
      msg.nation = "*Vui lòng nhập quốc tịch!";
    }
    if (isEmpty(wife.occupation ?? "", { ignore_whitespace: true })) {
      msg.occupation = "*Vui lòng nhập nghề nghiệp!";
    }
    if (isEmpty(wife.income ?? "", { ignore_whitespace: true })) {
      msg.income = "*Vui lòng nhập thu nhập!";
    } else if (!isNumeric(wife.income)) {
      msg.income = "*Vui lòng nhập số!";
    }
    if (isEmpty(wife.citizenIdentNumber ?? "", { ignore_whitespace: true })) {
      msg.citizenIdentNumber = "*Vui lòng nhập căn cước!";
    } else if (!isNumeric(wife.citizenIdentNumber)) {
      msg.citizenIdentNumber = "*Vui lòng nhập số!";
    } else if (
      !isLength(wife.citizenIdentNumber, { min: 12, max: undefined })
    ) {
      msg.citizenIdentNumber = "*Căn cước không đúng định dạng!";
    }
    if (isEmpty(wife.issuePlace ?? "", { ignore_whitespace: true })) {
      msg.issuePlace = "*Vui lòng nhập nơi cấp!";
    }
    if (isEmpty(wife.issueDate ?? "", { ignore_whitespace: true })) {
      msg.issueDate = "*Vui lòng nhập ngày cấp!";
    }
    if (isEmpty(wife.expireDate ?? "", { ignore_whitespace: true })) {
      msg.expireDate = "*Vui lòng nhập hạn!";
    }
    setWifeErros(msg);
    if (Object.keys(msg).length > 0) return false;
    return true;
  };

  const validateChildForm = () => {
    const msg = {};
    if (isEmpty(child.fullName ?? "", { ignore_whitespace: true })) {
      msg.fullName = "*Vui lòng nhập họ và tên!";
    }
    if (isEmpty(child.birthday ?? "", { ignore_whitespace: true })) {
      msg.birthday = "*Vui lòng nhập ngày sinh!";
    }
    if (isEmpty(child.gender ?? "")) {
      msg.gender = "Vui lòng chọn giới tính!";
    }
    if (isEmpty(child.nationality ?? "", { ignore_whitespace: true })) {
      msg.nationality = "*Vui lòng nhập quốc tịch!";
    }
    if (isEmpty(child.citizenIdentNumber ?? "", { ignore_whitespace: true })) {
    } else if (!isNumeric(child.citizenIdentNumber)) {
      msg.citizenIdentNumber = "*Vui lòng nhập số!";
    } else if (
      !isLength(child.citizenIdentNumber, { min: 12, max: undefined })
    ) {
      msg.citizenIdentNumber = "*Căn cước không đúng định dạng!";
    }
    setChildErros(msg);
    if (Object.keys(msg).length > 0) return false;
    return true;
  };

  const validateHusbandEmpty = () => {
    let isHusbandEmpty = true;
    Object.values(husband).map((val) => {
      if (!isEmpty(val ?? "", { ignore_whitespace: true })) {
        isHusbandEmpty = false;
      }
    });

    return isHusbandEmpty;
  };

  const validateWfifeEmpty = () => {
    let isWifeEmpty = true;

    Object.values(wife).map((val) => {
      if (!isEmpty(val ?? "", { ignore_whitespace: true })) {
        isWifeEmpty = false;
      }
    });
    return isWifeEmpty;
  };

  const validateForm = () => {
    setHusbandErros({});
    setWifeErros({});
    setReasonErro("");
    if (validateHusbandEmpty() && validateWfifeEmpty()) {
      alert("Vui lòng nhập thông tin");
      return false;
    } else {
      let result = true;
      if (!validateHusbandEmpty()) {
        if (!validateHusbandForm()) {
          result = false;
        } else {
          formData.husband = husband;
          formData.husband.gender = "Nam";
        }
      }
      if (!validateWfifeEmpty()) {
        if (!validateWifeForm()) {
          result = false;
        } else {
          formData.wife = wife;
          formData.wife.gender = "Nữ";
        }
      }
      if (!validateChildForm()) {
        result = false;
      }
      if (isEmpty(reason ?? "", { ignore_whitespace: true })) {
        setReasonErro("*Vui lòng nhập lý do");
        result = false;
      }
      return result;
    }
  };

  const handleChildChange = (e) => {
    setChild({
      ...child,
      [e.target.name]: e.target.value,
    });
  };

  const handleHusbandChange = (e) => {
    setHusband({
      ...husband,
      [e.target.name]: e.target.value,
    });
  };

  const handleWifeChange = (e) => {
    setWife({
      ...wife,
      [e.target.name]: e.target.value,
    });
  };

  const setAdopterData = (husb, wif) => {
    const adopters = [];
    if (husb) {
      const husbDate = new Date(husb.birthday);
      const newHusbDate = `${husbDate.getDate()}-${
        husbDate.getMonth() + 1
      }-${husbDate.getFullYear()}`;
      husb.birthday = newHusbDate;

      const husbIssueDate = new Date(husb.issueDate);
      const newHusbIssueDate = `${husbIssueDate.getDate()}-${
        husbIssueDate.getMonth() + 1
      }-${husbIssueDate.getFullYear()}`;
      husb.issueDate = newHusbIssueDate;

      const husbExpireDate = new Date(husb.expireDate);
      const newHusbExpireDate = `${husbExpireDate.getDate()}-${
        husbExpireDate.getMonth() + 1
      }-${husbExpireDate.getFullYear()}`;
      husb.expireDate = newHusbExpireDate;
      const fullName = `${husb.lastName} ${husb.firstName}`;
      husb.fullName = fullName;

      husb.citizenIdentification = {
        citizenIdentNumber: husb.citizenIdentNumber,
        issueDate: husb.issueDate,
        issuePlace: husb.issuePlace,
        expireDate: husb.expireDate,
      };

      adopters.push(husb);
    }
    if (wif) {
      const wifDate = new Date(wif.birthday);
      const newWifbDate = `${wifDate.getDate()}-${
        wifDate.getMonth() + 1
      }-${wifDate.getFullYear()}`;
      wif.birthday = newWifbDate;

      const wifIssueDate = new Date(wif.issueDate);
      const newWifIssueDate = `${wifIssueDate.getDate()}-${
        wifIssueDate.getMonth() + 1
      }-${wifIssueDate.getFullYear()}`;
      wif.issueDate = newWifIssueDate;

      const wifExpireDate = new Date(wif.expireDate);
      const newWifExpireDate = `${wifExpireDate.getDate()}-${
        wifExpireDate.getMonth() + 1
      }-${wifExpireDate.getFullYear()}`;
      wif.expireDate = newWifExpireDate;
      const fullName = `${wif.lastName} ${wif.firstName}`;
      wif.fullName = fullName;
      wif.citizenIdentification = {
        citizenIdentNumber: wif.citizenIdentNumber,
        issueDate: wif.issueDate,
        issuePlace: wif.issuePlace,
        expireDate: wif.expireDate,
      };

      adopters.push(wif);
    }
    return adopters;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;
    let adopters;
    if (formData?.husband && formData?.wife) {
      formData.husband.spouse = "Chồng";
      formData.wife.spouse = "Vợ";
      adopters = setAdopterData(formData.husband, formData.wife);
    } else {
      if (formData?.husband) {
        adopters = setAdopterData(formData.husband);
      }

      if (formData?.wife) {
        adopters = setAdopterData(formData.wife);
      }
    }
    console.log(adopters);
    const currentDate = new Date();
    const currentDateValue = `${currentDate.getDate()}-${
      currentDate.getMonth() + 1
    }-${currentDate.getFullYear()}`;

    const childDate = new Date(child.birthday);
    const newChildDate = `${childDate.getDate()}-${
      childDate.getMonth() + 1
    }-${childDate.getFullYear()}`;
    child.birthday = newChildDate;

    const adoption = {
      reason: reason,
      adopters: adopters,
      adoptedChild: child,
      registerDate: currentDateValue,
    };

    console.log(adoption);
    try {
      const response = await apiMethod.postAdoption(adoption);
      if (response.status == 200) {
        console.log(response);
        setIsSuccess(true);
      } else {
        alert("Đã có lỗi xảy ra!");
      }
    } catch (error) {
      alert("Đã có lỗi xảy ra!");
    }
  };

  return (
    <>
      <div className="formbold-main-wrapper">
        {!isSuccess ? (
          <div className="formbold-form-wrapper">
            <form action="#">
              <div className="formbold-steps">
                <h1>Nhập thông tin đăng ký nhận nuôi</h1>
              </div>
              <h2 className="text-xl mb-2 font-semibold leading-normal">
                1. Phần khai về người nhận nuôi
              </h2>
              <div className="form-container">
                <div className="husband-container">
                  <h2 className="text-xl mb-2 font-semibold leading-normal text-center">
                    Ông
                  </h2>
                  <div className={"active"}>
                    <div>
                      <input
                        type="text"
                        name="lastName"
                        placeholder="Nhập họ (*)"
                        id="lastname"
                        className="formbold-form-input"
                        value={husband?.lastName}
                        onChange={handleHusbandChange}
                      />
                      <span className="err-message">
                        {husbandErrors.lastName}
                      </span>
                    </div>
                    <div>
                      <input
                        type="text"
                        name="firstName"
                        placeholder="Nhập tên (*)"
                        id="firstname"
                        className="formbold-form-input"
                        value={husband?.firstName}
                        onChange={handleHusbandChange}
                      />
                      <span className="err-message">
                        {husbandErrors.firstName}
                      </span>
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Chọn ngày sinh (*)"
                        onFocus={(e) => (e.target.type = "date")}
                        onBlur={(e) => (e.target.type = "text")}
                        name="birthday"
                        id="birthday"
                        className="formbold-form-input"
                        value={husband?.birthday}
                        onChange={handleHusbandChange}
                      />
                      <span className="err-message">
                        {husbandErrors.birthday}
                      </span>
                    </div>

                    <div className="formbold-input-flex">
                      <div>
                        <input
                          type="text"
                          name="nation"
                          placeholder="Nhập quốc tịch (*)"
                          id="nation"
                          className="formbold-form-input"
                          value={husband?.nation}
                          onChange={handleHusbandChange}
                        />
                        <span className="err-message">
                          {husbandErrors.nation}
                        </span>
                      </div>
                      <div>
                        <select
                          id="nationality"
                          name="nationality"
                          className="formbold-form-input"
                          value={husband?.nationality}
                          onChange={handleHusbandChange}
                        >
                          <option value="" disabled>
                            Chọn dân tộc (*)
                          </option>
                          {nationalities.map((nati, index) => {
                            if (index != 0) {
                              return (
                                <option key={index} value={nati.name}>
                                  {nati.name}
                                </option>
                              );
                            }
                          })}
                        </select>
                        <span className="err-message">
                          {husbandErrors.nationality}
                        </span>
                      </div>
                    </div>

                    <div>
                      <input
                        type="text"
                        name="addressPermanent"
                        id="addressPermanent"
                        placeholder="Nhập địa chỉ thường trú (*)"
                        className="formbold-form-input"
                        value={husband?.addressPermanent}
                        onChange={handleHusbandChange}
                      />
                      <span className="err-message">
                        {husbandErrors.addressPermanent}
                      </span>
                    </div>

                    <div>
                      <input
                        type="text"
                        name="addressTemporary"
                        id="addressTemporary"
                        placeholder="Nhập địa chỉ tạm trú (*)"
                        className="formbold-form-input"
                        value={husband?.addressTemporary}
                        onChange={handleHusbandChange}
                      />
                      <span className="err-message">
                        {husbandErrors.addressTemporary}
                      </span>
                    </div>
                  </div>

                  <div>
                    <input
                      type="text"
                      name="phoneNumber"
                      placeholder="Nhập số điện thoại (*)"
                      id="phonenumber"
                      className="formbold-form-input"
                      value={husband?.phoneNumber}
                      onChange={handleHusbandChange}
                    />
                    <span className="err-message">
                      {husbandErrors.phoneNumber}
                    </span>
                  </div>

                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Nhập email (*)"
                      id="email"
                      className="formbold-form-input"
                      value={husband?.email}
                      onChange={handleHusbandChange}
                    />
                    <span className="err-message">{husbandErrors.email}</span>
                  </div>

                  <div>
                    <input
                      type="text"
                      name="occupation"
                      placeholder="Nhập nghề nghiệp (*)"
                      id="occupation"
                      className="formbold-form-input"
                      value={husband?.occupation}
                      onChange={handleHusbandChange}
                    />
                    <span className="err-message">
                      {husbandErrors.occupation}
                    </span>
                  </div>
                  <div>
                    <input
                      type="text"
                      name="income"
                      placeholder="Mức thu nhập/tháng (*)"
                      id="income"
                      className="formbold-form-input"
                      value={husband?.income}
                      onChange={handleHusbandChange}
                    />
                    <span className="err-message">{husbandErrors.income}</span>
                  </div>
                  <div>
                    <input
                      type="text"
                      name="relationship"
                      placeholder="Tình trạng hôn nhân (*) [1]"
                      id="relationship"
                      className="formbold-form-input"
                      value={husband?.relationship}
                      onChange={handleHusbandChange}
                    />
                    <span className="err-message">
                      {husbandErrors.relationship}
                    </span>
                  </div>
                  <div>
                    <input
                      type="text"
                      name="citizenIdentNumber"
                      placeholder="Nhập Số CCCD (*)"
                      id="citizenIdentNumber"
                      className="formbold-form-input"
                      value={husband?.citizenIdentNumber}
                      onChange={handleHusbandChange}
                    />
                    <span className="err-message">
                      {husbandErrors.citizenIdentNumber}
                    </span>
                  </div>
                  <div className="formbold-input-flex">
                    <div style={{ width: "50%" }}>
                      <input
                        type="text"
                        placeholder="Chọn ngày cấp (*)"
                        onFocus={(e) => (e.target.type = "date")}
                        onBlur={(e) => (e.target.type = "text")}
                        name="issueDate"
                        id="issueDate"
                        className="formbold-form-input"
                        value={husband?.issueDate}
                        onChange={handleHusbandChange}
                      />
                      <span className="err-message">
                        {husbandErrors.issueDate}
                      </span>
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Chọn ngày hạn (*)"
                        onFocus={(e) => (e.target.type = "date")}
                        onBlur={(e) => (e.target.type = "text")}
                        name="expireDate"
                        id="expireDate"
                        className="formbold-form-input"
                        value={husband?.expireDate}
                        onChange={handleHusbandChange}
                      />
                      <span className="err-message">
                        {husbandErrors.expireDate}
                      </span>
                    </div>
                  </div>
                  <div>
                    <input
                      type="text"
                      name="issuePlace"
                      id="issuePlace"
                      placeholder="Nhập địa chỉ cấp (*)"
                      className="formbold-form-input"
                      value={husband?.issuePlace}
                      onChange={handleHusbandChange}
                    />
                    <span className="err-message">
                      {husbandErrors.issuePlace}
                    </span>
                  </div>
                </div>
                <div className="wife-container">
                  <h2 className="text-xl mb-2 font-semibold leading-normal text-center">
                    Bà
                  </h2>
                  <div className={"active"}>
                    <div>
                      <input
                        type="text"
                        name="lastName"
                        placeholder="Nhập họ (*)"
                        id="lastname"
                        className="formbold-form-input"
                        value={wife?.lastName}
                        onChange={handleWifeChange}
                      />
                      <span className="err-message">{wifeErrors.lastName}</span>
                    </div>
                    <div>
                      <input
                        type="text"
                        name="firstName"
                        placeholder="Nhập tên (*)"
                        id="firstname"
                        className="formbold-form-input"
                        value={wife?.firstName}
                        onChange={handleWifeChange}
                      />
                      <span className="err-message">
                        {wifeErrors.firstName}
                      </span>
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Chọn ngày sinh (*)"
                        onFocus={(e) => (e.target.type = "date")}
                        onBlur={(e) => (e.target.type = "text")}
                        name="birthday"
                        id="birthday"
                        className="formbold-form-input"
                        value={wife?.birthday}
                        onChange={handleWifeChange}
                      />
                      <span className="err-message">{wifeErrors.birthday}</span>
                    </div>
                    <div className="formbold-input-flex">
                      <div>
                        <input
                          type="text"
                          name="nation"
                          placeholder="Nhập quốc tịch (*)"
                          id="nation"
                          className="formbold-form-input"
                          value={wife?.nation}
                          onChange={handleWifeChange}
                        />
                        <span className="err-message">{wifeErrors.nation}</span>
                      </div>
                      <div>
                        <select
                          id="nationality"
                          name="nationality"
                          className="formbold-form-input"
                          value={wife?.nationality}
                          onChange={handleWifeChange}
                        >
                          <option value="" disabled>
                            Chọn dân tộc (*)
                          </option>
                          {nationalities.map((nati, index) => {
                            if (index != 0) {
                              return (
                                <option key={index} value={nati.name}>
                                  {nati.name}
                                </option>
                              );
                            }
                          })}
                        </select>
                        <span className="err-message">
                          {wifeErrors.nationality}
                        </span>
                      </div>
                    </div>
                    <div>
                      <input
                        type="text"
                        name="addressPermanent"
                        id="addressPermanent"
                        placeholder="Nhập địa chỉ thường trú (*)"
                        className="formbold-form-input"
                        value={wife?.addressPermanent}
                        onChange={handleWifeChange}
                      />
                      <span className="err-message">
                        {wifeErrors.addressPermanent}
                      </span>
                    </div>

                    <div>
                      <input
                        type="text"
                        name="addressTemporary"
                        id="addressTemporary"
                        placeholder="Nhập địa chỉ tạm trú (*)"
                        className="formbold-form-input"
                        value={wife?.addressTemporary}
                        onChange={handleWifeChange}
                      />
                      <span className="err-message">
                        {wifeErrors.addressTemporary}
                      </span>
                    </div>
                  </div>

                  <div>
                    <input
                      type="text"
                      name="phoneNumber"
                      placeholder="Nhập số điện thoại (*)"
                      id="phonenumber"
                      className="formbold-form-input"
                      value={wife?.phoneNumber}
                      onChange={handleWifeChange}
                    />
                    <span className="err-message">
                      {wifeErrors.phoneNumber}
                    </span>
                  </div>

                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Nhập email (*)"
                      id="email"
                      className="formbold-form-input"
                      value={wife?.email}
                      onChange={handleWifeChange}
                    />
                    <span className="err-message">{wifeErrors.email}</span>
                  </div>

                  <div>
                    <input
                      type="text"
                      name="occupation"
                      placeholder="Nhập nghề nghiệp (*)"
                      id="occupation"
                      className="formbold-form-input"
                      value={wife?.occupation}
                      onChange={handleWifeChange}
                    />
                    <span className="err-message">{wifeErrors.occupation}</span>
                  </div>

                  <div>
                    <input
                      type="text"
                      name="income"
                      placeholder="Mức thu nhập/tháng (*)"
                      id="income"
                      className="formbold-form-input"
                      value={wife?.income}
                      onChange={handleWifeChange}
                    />
                    <span className="err-message">{wifeErrors.income}</span>
                  </div>
                  <div>
                    <input
                      type="text"
                      name="relationship"
                      placeholder="Tình trạng hôn nhân (*) [1]"
                      id="relationship"
                      className="formbold-form-input"
                      value={wife?.relationship}
                      onChange={handleWifeChange}
                    />
                    <span className="err-message">
                      {wifeErrors.relationship}
                    </span>
                  </div>
                  <div>
                    <input
                      type="text"
                      name="citizenIdentNumber"
                      placeholder="Nhập Số CCCD (*)"
                      id="citizenIdentNumber"
                      className="formbold-form-input"
                      value={wife?.citizenIdentNumber}
                      onChange={handleWifeChange}
                    />
                    <span className="err-message">
                      {wifeErrors.citizenIdentNumber}
                    </span>
                  </div>

                  <div className="formbold-input-flex">
                    <div>
                      <input
                        type="text"
                        placeholder="Chọn ngày cấp (*)"
                        onFocus={(e) => (e.target.type = "date")}
                        onBlur={(e) => (e.target.type = "text")}
                        name="issueDate"
                        id="issueDate"
                        className="formbold-form-input"
                        value={wife?.issueDate}
                        onChange={handleWifeChange}
                      />
                      <span className="err-message">
                        {wifeErrors.issueDate}
                      </span>
                    </div>

                    <div>
                      <input
                        type="text"
                        placeholder="Chọn ngày hết hạn (*)"
                        onFocus={(e) => (e.target.type = "date")}
                        onBlur={(e) => (e.target.type = "text")}
                        name="expireDate"
                        id="expireDate"
                        className="formbold-form-input"
                        value={wife?.expireDate}
                        onChange={handleWifeChange}
                      />
                      <span className="err-message">
                        {wifeErrors.expireDate}
                      </span>
                    </div>
                  </div>
                  <div>
                    <input
                      type="text"
                      name="issuePlace"
                      id="issuePlace"
                      placeholder="Nhập địa chỉ cấp (*)"
                      className="formbold-form-input"
                      value={wife?.issuePlace}
                      onChange={handleWifeChange}
                    />
                    <span className="err-message">{wifeErrors.issuePlace}</span>
                  </div>
                </div>
              </div>
              <h2 className="text-xl mb-2 font-semibold leading-normal">
                2. Phần khai về người được nhận làm con nuôi [2]
              </h2>
              <div className="child-container">
                <div className={"active"}>
                  <div>
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Nhập họ và tên (*)"
                      id="lastname"
                      className="formbold-form-input"
                      value={child?.fullName}
                      onChange={handleChildChange}
                    />
                    <span className="err-message">{childErros.fullName}</span>
                  </div>

                  <div className="formbold-input-flex">
                    <div>
                      <input
                        type="text"
                        placeholder="Chọn ngày sinh (*)"
                        onFocus={(e) => (e.target.type = "date")}
                        onBlur={(e) => (e.target.type = "text")}
                        name="birthday"
                        id="birthday"
                        className="formbold-form-input"
                        value={child?.birthday}
                        onChange={handleChildChange}
                      />
                      <span className="err-message">{childErros.birthday}</span>
                    </div>
                    <div>
                      <select
                        type="text"
                        name="gender"
                        id="gender"
                        placeholder="Flat 4, 24 Castle Street, Perth, PH1 3JY"
                        className="formbold-form-input"
                        value={child?.gender}
                        onChange={handleChildChange}
                      >
                        <option value="">Chọn giới tính (*)</option>
                        <option value="nam">Nam</option>
                        <option value="nữ">Nữ</option>
                        <option value="khác">Khác</option>
                      </select>
                      <span className="err-message">{childErros.gender}</span>
                    </div>
                  </div>
                  <div>
                    <input
                      type="text"
                      name="nationality"
                      placeholder="Nhập quốc tịch (*)"
                      id="nation"
                      className="formbold-form-input"
                      value={child?.nationality}
                      onChange={handleChildChange}
                    />
                    <span className="err-message">
                      {childErros.nationality}
                    </span>
                  </div>
                  <div>
                    <input
                      type="number"
                      name="citizenIdentNumber"
                      placeholder="Nhập Số CCCD (*)"
                      id="citizenIdentNumber"
                      className="formbold-form-input"
                      value={child?.citizenIdentNumber}
                      onChange={handleChildChange}
                    />
                  </div>
                </div>
              </div>
              <h2 className="text-xl mb-2 font-semibold leading-normal">
                3. Lý do nhận con nuôi
              </h2>
              <div>
                <textarea
                  rows="4"
                  type="text"
                  name="reason"
                  placeholder="Nhập lý do đăng ký nhận nuôi..."
                  id="reason"
                  className="formbold-form-input"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                />
                <span className="err-message">{reasonError}</span>
              </div>
              <button className="formbold-btn" onClick={handleSubmit}>
                XÁC NHẬN
              </button>
            </form>
            <div style={{ marginTop: "50px" }}>
              <h2 className="text-xl mb-2 font-semibold leading-normal">
                Ghi chú:
              </h2>
              <h3 className="text-md mb-2 font-semibold leading-normal italic">
                [1] Khai rõ đây là lần kết hôn thứ mấy của người nhận con nuôi,
                tình trạng con cái. Ví dụ: Đã kết hôn lần thứ nhất, không có con
              </h3>
              <h3 className="text-md mb-2 font-semibold leading-normal italic">
                [2] Vui lòng nhập chính xác thông tin phần này. Đây là thông tin
                để chúng tôi xác định trẻ.
              </h3>
            </div>
          </div>
        ) : (
          <>
            <div className="formbold-steps noti">
              <h1>Đăng ký thành công!</h1>
              <h1>
                Đơn đăng ký của bạn sẽ được chúng tôi kiểm tra và xác nhận trong
                thời gian sớm nhất.
              </h1>
            </div>
          </>
        )}
      </div>
    </>
  );
};
