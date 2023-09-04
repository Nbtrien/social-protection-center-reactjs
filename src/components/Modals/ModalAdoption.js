import React, { useState } from "react";
import apiMethod from "api/apiMethod";

import "../../assets/styles/modal.css";
import { AdoptionStatus } from "../../constant/Status";
import { useEffect } from "react";
import usePrivateApi from "api/usePrivateApi";
import { AcceptAdoptionModal } from "./AcceptAdoptionModal";

export const ModalAdoption = ({ closeModal, adoption, onSubmit }) => {
  const privateApi = usePrivateApi();
  const [status, setStatus] = useState(null);
  const [isConfirmModal, setIsConfirmModal] = useState(false);
  useEffect(async () => {
    if (status != null) {
      const params = { status: status };
      const response = await privateApi.updateAdoptionStatus(
        adoption.adoptionId,
        params
      );
      if (response.status == 200) {
        onSubmit();
      }
    }
  }, [status]);

  const handleAcceptAdoption = async (childId) => {
    console.log("id: " + childId);
    const response = await privateApi.updateAdoptionChild(
      adoption.adoptionId,
      childId
    );
    if (response.status == 204) {
      alert("Xác nhận thành công!");
    } else {
      alert("Xác nhận thất bại!");
    }
    onSubmit();
  };

  const handleCompleteAdoption = async () => {
    const response = await privateApi.completeAdoption(adoption.adoptionId);
    if (response.status == 204) {
      alert("Xác nhận thành công!");
    } else {
      alert("Xác nhận thất bại!");
    }
    onSubmit();
  };

  let htmlGen = "";

  return (
    <div
      className="modal-container"
      onClick={(e) => {
        if (e.target.className === "modal-container") closeModal();
      }}
    >
      <div
        className="modal-adoption"
        style={{
          height: "700px",
          width: "auto",
          maxWidth: "1024px",
          padding: "1rem",
        }}
      >
        <h1 className="text-2xl mb-2 font-semibold leading-normal modal-title">
          {adoption.status.status == AdoptionStatus.Waiting && (
            <>Đơn đăng ký đang chờ xác nhận</>
          )}
          {adoption.status.status == AdoptionStatus.Decline && (
            <>Đơn đăng ký đã hủy bỏ</>
          )}
          {adoption.status.status == AdoptionStatus.Accept && (
            <>Đơn đăng ký đã xác nhận</>
          )}
        </h1>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "15px",
          }}
        >
          <h2 className="text-lg mb-2 font-semibold leading-normal">
            1. Ngày đăng ký : {adoption.registerDate}
          </h2>
          {adoption.status.status == AdoptionStatus.Waiting && (
            <div className="adop-btn-container">
              <button
                className="confirm-btn accept-btn"
                onClick={() => {
                  setIsConfirmModal(true);
                }}
              >
                Xác nhận
              </button>
              <button
                className="confirm-btn decline-btn"
                onClick={() => {
                  setStatus(AdoptionStatus.Decline);
                }}
              >
                Từ chối
              </button>
            </div>
          )}

          {adoption.status.status == AdoptionStatus.Accept && (
            <div className="adop-btn-container" style={{ marginLeft: "30px" }}>
              <button
                className="confirm-btn accept-btn"
                onClick={handleCompleteAdoption}
              >
                Xác nhận hoàn thành nhận nuôi
              </button>
              <button
                className="confirm-btn decline-btn"
                onClick={() => {
                  setStatus(AdoptionStatus.Decline);
                }}
              >
                Hủy bỏ
              </button>
            </div>
          )}
        </div>
        <div>
          <h2 className="text-lg mb-2 font-semibold leading-normal whitespace-nowrap {">
            2. Thông tin về người nhận nuôi
          </h2>
          <div className="adopter-container">
            <table className="">
              <tr>
                <th></th>
                {adoption.adopters[0] &&
                adoption.adopters[0].gender == "Nam" ? (
                  <th>
                    <h2 className="text-md mb-2 font-semibold leading-normal whitespace-nowrap {">
                      Ông
                    </h2>
                  </th>
                ) : (
                  <th>
                    <h2 className="text-md mb-2 font-semibold leading-normal whitespace-nowrap {">
                      Bà
                    </h2>
                  </th>
                )}
                {adoption.adopters[1] &&
                  (adoption.adopters[1].gender == "Nam" ? (
                    <th>
                      <h2 className="text-md mb-2 font-semibold leading-normal whitespace-nowrap {">
                        Ông
                      </h2>
                    </th>
                  ) : (
                    <th>
                      <h2 className="text-md mb-2 font-semibold leading-normal whitespace-nowrap {">
                        Bà
                      </h2>
                    </th>
                  ))}
              </tr>
              <tr>
                <th>Họ và tên:</th>
                {adoption.adopters[0] && (
                  <td>{adoption.adopters[0].fullName}</td>
                )}
                {adoption.adopters[1] && (
                  <td>{adoption.adopters[1].fullName}</td>
                )}
              </tr>
              <tr>
                <th>Ngày sinh:</th>
                {adoption.adopters[0] && (
                  <td>{adoption.adopters[0].birthday}</td>
                )}
                {adoption.adopters[1] && (
                  <td>{adoption.adopters[1].birthday}</td>
                )}
              </tr>

              <tr>
                <th>Quốc tịch:</th>
                {adoption.adopters[0] && <td>{adoption.adopters[0].nation}</td>}
                {adoption.adopters[1] && <td>{adoption.adopters[1].nation}</td>}
              </tr>

              <tr>
                <th>Dân tộc:</th>
                {adoption.adopters[0] && (
                  <td>{adoption.adopters[0].nationality}</td>
                )}
                {adoption.adopters[1] && (
                  <td>{adoption.adopters[1].nationality}</td>
                )}
              </tr>
              <tr>
                <th>Dịa chỉ thường trú:</th>
                {adoption.adopters[0] && (
                  <td>{adoption.adopters[0].addressPermanent}</td>
                )}
                {adoption.adopters[1] && (
                  <td>{adoption.adopters[1].addressPermanent}</td>
                )}
              </tr>
              <tr>
                <th>Dịa chỉ tạm trú:</th>
                {adoption.adopters[0] && (
                  <td>{adoption.adopters[0].addressTemporary}</td>
                )}
                {adoption.adopters[1] && (
                  <td>{adoption.adopters[1].addressTemporary}</td>
                )}
              </tr>
              <tr>
                <th>Số điện thoại:</th>
                {adoption.adopters[0] && (
                  <td>{adoption.adopters[0].phoneNumber}</td>
                )}
                {adoption.adopters[1] && (
                  <td>{adoption.adopters[1].phoneNumber}</td>
                )}
              </tr>
              <tr>
                <th>Email:</th>
                {adoption.adopters[0] && <td>{adoption.adopters[0].email}</td>}
                {adoption.adopters[1] && <td>{adoption.adopters[1].email}</td>}
              </tr>
              <tr>
                <th>Nghề nghiệp:</th>
                {adoption.adopters[0] && (
                  <td>{adoption.adopters[0].occupation}</td>
                )}
                {adoption.adopters[1] && (
                  <td>{adoption.adopters[1].occupation}</td>
                )}
              </tr>
              <tr>
                <th>Thu nhập:</th>
                {adoption.adopters[0] && (
                  <td>
                    {adoption.adopters[0].income.toLocaleString("it-IT", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </td>
                )}
                {adoption.adopters[1] && (
                  <td>
                    {adoption.adopters[1].income.toLocaleString("it-IT", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </td>
                )}
              </tr>
              <tr>
                <th>Tình trạng hôn nhân:</th>
                {adoption.adopters[0] && (
                  <td>{adoption.adopters[0].relationship}</td>
                )}
                {adoption.adopters[1] && (
                  <td>{adoption.adopters[1].relationship}</td>
                )}
              </tr>
              <tr>
                <th>Số CCCD:</th>
                {adoption.adopters[0] && (
                  <td>
                    {
                      adoption.adopters[0].citizenIdentification
                        .citizenIdentNumber
                    }
                  </td>
                )}
                {adoption.adopters[1] && (
                  <td>
                    {
                      adoption.adopters[1].citizenIdentification
                        .citizenIdentNumber
                    }
                  </td>
                )}
              </tr>
            </table>
          </div>
        </div>

        <div className="adopted-child-section">
          <h2 className="text-lg mb-2 font-semibold leading-normal whitespace-nowrap {">
            3. Thông tin về người được nhận nuôi
          </h2>
          <div className="adopted-child-container">
            <div className="adop-child-prop-container">
              <div>Họ tên:</div>

              <div>Giới tính:</div>
              <div>Ngày sinh:</div>
              <div>Quốc tịch:</div>
              <div>Số CCCD:</div>
            </div>
            <div className="adop-child-value-container">
              <div>{adoption.adoptedChild.fullName}</div>
              <div>{adoption.adoptedChild.gender}</div>
              <div>{adoption.adoptedChild.birthday}</div>
              <div>{adoption.adoptedChild.nationality}</div>
              <div>{adoption.adoptedChild.citizenIdentNumber}</div>
            </div>
          </div>
        </div>
        <div className="reason-container">
          <h2 className="text-lg mb-2 font-semibold leading-normal whitespace-nowrap {">
            4. Lý do nhận nuôi
          </h2>
          <div style={{ paddingLeft: "20px" }}>{adoption.reason}</div>
        </div>

        {/* <div className="access">
          <div className="block-inf">
            <h3 className="inf-title">Trạng thái: </h3>
            <p className="inf-desc">
              {adoption?.status.status == "Xác nhận" ? (
                <p
                  className="inf-desc"
                  style={{
                    display: "inline",
                    backgroundColor: "rgba(0, 128, 0, 0.75)",
                    color: "white",
                  }}
                >
                  Đã xác nhận
                </p>
              ) : adoption?.status.status == "Đã hủy" ? (
                <p
                  className="inf-desc"
                  style={{
                    display: "inline",
                    backgroundColor: "rgba(255, 0, 0, 0.75)",
                    color: "white",
                  }}
                >
                  Từ chối
                </p>
              ) : adoption?.status.status == "Đã hoàn thành" ? (
                <p
                  className="inf-desc"
                  style={{
                    display: "inline",
                    backgroundColor: "rgba(0, 0, 255, 0.75)",
                    color: "white",
                  }}
                >
                  Hoàn thành nhận nuôi
                </p>
              ) : (
                <p
                  className="inf-desc"
                  style={{
                    display: "inline",
                    backgroundColor: "rgba(0, 0, 0, 0.75)",
                    color: "white",
                  }}
                >
                  Chờ xác nhận
                </p>
              )}
            </p>
          </div>
        </div> */}
        {/* <div className="adoption-btn my-4">
          {adoption?.status == 0 ? (
            <>
              <button
                className="access-btn"
                onClick={(e) => handleSubmit(e, "1")}
              >
                Xác nhận
              </button>
              <button
                className="reject-btn"
                onClick={(e) => handleSubmit(e, "2")}
              >
                Từ chối
              </button>
            </>
          ) : adoption?.status == 1 ? (
            <button className="done-btn" onClick={(e) => handleSubmit(e, "3")}>
              Hoàn thành nhận nuôi
            </button>
          ) : (
            <></>
          )}
        </div> */}
      </div>
      {isConfirmModal && (
        <AcceptAdoptionModal
          adoptedChild={adoption.adoptedChild}
          onClose={() => {
            setIsConfirmModal(false);
          }}
          onDecline={() => {
            setStatus(AdoptionStatus.Decline);
          }}
          onAccept={(childId) => {
            handleAcceptAdoption(childId);
          }}
        />
      )}
    </div>
  );
};
