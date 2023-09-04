export const EmpDetailModal = ({ onClose, employee }) => {
  return (
    <div
      className="modal-container"
      onClick={(e) => {
        if (e.target.className === "modal-container") onClose();
      }}
      style={{ zIndex: "100", paddingTop: "15px" }}
    >
      <div
        className="modal max-w-580-px p-4"
        style={{
          height: "700px",
          width: "auto",
          maxWidth: "1024px",
          padding: "1rem",
        }}
      >
        <h1 className="font-semibold text-xl text-center ">
          Thông tin nhân viên
        </h1>
        <br />
        <div className="block w-full overflow-x-auto">
          <div className="table-wrapper">
            <div className="detal-wr-img">
              <img src={employee.image.imageUrl} />
            </div>
            <br />
            <div className="dt-war">
              <div className="child-det-wr">
                <div className="detal-wrapper font-semibold">
                  <div>Thông tin chi tiết nhân viên: </div>
                </div>
                <div className="detal-wrapper">
                  <div className="proper">Họ và tên </div>
                  <div className="value">{employee.fullName}</div>
                </div>
                <div className="detal-wrapper">
                  <div className="proper">Giới tính </div>
                  <div className="value">{employee.gender}</div>
                </div>
                <div className="detal-wrapper">
                  <div className="proper">Ngày sinh </div>
                  <div className="value">{employee.birthDay}</div>
                </div>
                <div className="detal-wrapper">
                  <div className="proper">Địa chỉ thường trú</div>
                  <div className="value">{employee?.addressPermanent}</div>
                </div>
                <div className="detal-wrapper">
                  <div className="proper">Địa chỉ tạm trú</div>
                  <div className="value">{employee?.addressTemporary}</div>
                </div>
                <div className="detal-wrapper">
                  <div className="proper">Địa chỉ Email: </div>
                  <div className="value">{employee?.email}</div>
                </div>
                <div className="detal-wrapper">
                  <div className="proper">Số điện thoại: </div>
                  <div className="value">{employee?.phoneNumber}</div>
                </div>
                <div className="detal-wrapper">
                  <div className="proper">Công việc: </div>
                  <div className="value">{employee?.job.jobTitle}</div>
                </div>
                <div className="detal-wrapper">
                  <div className="proper">Ngày bắt đầu: </div>
                  <div className="value">{employee?.fromDate}</div>
                </div>
                <div className="detal-wrapper">
                  <div className="proper">Ca làm việc: </div>
                  <div className="value">
                    {employee.shift.shiftTitle}: {employee.shift.timeStart} -{" "}
                    {employee.shift.timeEnd}
                  </div>
                </div>
                <div className="detal-wrapper">
                  <div className="proper">Lương: </div>
                  <div className="value">
                    {employee.salary.toLocaleString("it-IT", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </div>
                </div>
              </div>
            </div>
            {employee.citizenId && (
              <div className="wr-cccd mt-4">
                <div className="detal-wrapper font-semibold">
                  <div>Thông tin CCCD: </div>
                </div>
                <div className="detal-wrapper">
                  <div className="proper">Số CCCD: </div>
                  <div className="value">
                    {employee?.citizenId?.citizenIdentNumber}
                  </div>
                </div>
                <div className="detal-wrapper">
                  <div className="proper">Ngày cấp: </div>
                  <div className="value">{employee?.citizenId?.issueDate}</div>
                </div>
                <div className="detal-wrapper">
                  <div className="proper">Nơi cấp: </div>
                  <div className="value">{employee?.citizenId?.issuePlace}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
