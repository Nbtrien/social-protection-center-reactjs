import usePrivateApi from "api/usePrivateApi";
import BouncingLoader from "components/BoucingLoader";
import { useEffect } from "react";
import { useState } from "react";

export const AcceptAdoptionModal = ({
  adoptedChild,
  onClose,
  onDecline,
  onAccept,
}) => {
  const privateApi = usePrivateApi();
  const [children, setChildren] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getChildren = async () => {
      const response = await privateApi.getChildrenByAdoptChild(adoptedChild);
      setChildren(response.data);
      setIsLoading(false);
    };
    getChildren();
  }, [adoptedChild]);
  return (
    <div
      className="modal-container"
      //   onClick={(e) => {
      //     if (e.target.className === "modal-container") onClose();
      //   }}
      style={{ zIndex: "100", paddingTop: "15px" }}
    >
      <div
        className="modal"
        style={{ height: "auto", width: "auto", padding: "25px" }}
      >
        {isLoading ? (
          <BouncingLoader />
        ) : children.length == 0 ? (
          <>
            <h1 className="font-semibold text-xl text-center ">
              Không tìm thấy trẻ phù hợp, Không thể xác nhận đơn!
            </h1>
            <div
              style={{
                marginTop: "15px",
                display: "flex",
                justifyContent: "end",
                gap: "20px",
              }}
            >
              <button
                className="confirm-btn accept-btn"
                onClick={() => {
                  onClose();
                }}
              >
                Quay lại
              </button>
              <button
                className="confirm-btn decline-btn"
                onClick={() => {
                  onDecline();
                }}
              >
                Từ chối đơn
              </button>
            </div>
          </>
        ) : (
          <>
            <h1 className="font-semibold text-xl text-center ">
              Danh sách trẻ phù hợp
            </h1>
            <div className="block w-full overflow-x-auto">
              <div className="table-wrapper">
                <table className="table" style={{ border: "1px solid #ccc" }}>
                  <thead>
                    <tr>
                      <th>STT</th>
                      <th>Họ và tên</th>
                      <th>Giới tính</th>
                      <th>Ngày sinh</th>
                      <th>Quốc tịch</th>
                      <th>Ngày tiếp nhận</th>
                      <th>Trạng thái</th>
                      <th>Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {children.map((child, index) => {
                      return (
                        <tr key={index} style={{}}>
                          <td>{index + 1}</td>
                          <td>{child.fullName}</td>
                          <td>{child.gender}</td>
                          <td>{child.birthDay}</td>
                          <td>{child.nationality}</td>
                          <td>{child.dateIn}</td>
                          <td>{child.childrenStatus.status}</td>
                          <td>
                            <button
                              className="confirm-btn decline-btn"
                              onClick={() => {
                                onAccept(child.childId);
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
            <div
              style={{
                marginTop: "15px",
                display: "flex",
                justifyContent: "end",
                gap: "20px",
              }}
            >
              <button
                className="confirm-btn accept-btn"
                onClick={() => {
                  onClose();
                }}
              >
                Quay lại
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
