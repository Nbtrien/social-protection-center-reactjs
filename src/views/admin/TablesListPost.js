import React from "react";
// Add account
import { useState, useEffect } from "react";
// components
import "../../assets/styles/tableAccountCard.css";
import { Link, useNavigate } from "react-router-dom";
import CardTablePost from "components/Cards/CardTablePosts";
import usePrivateApi from "api/usePrivateApi";
import { Modal } from "components/Modals/ModalPostsList";
import { CardTableArticle } from "components/Cards/CardTableArticle";
// import { Modal } from "components/Modals/ModalPostsList";

export default function TablesListPost() {
  const [modalOpen, setModalOpen] = useState(false);
  const api = usePrivateApi();

  const [rowToEdit, setRowToEdit] = useState(null);

  const privateApi = usePrivateApi();
  const [articles, setArticles] = useState([]);

  const getArticles = async () => {
    const response = await privateApi.getAllArticles();
    setArticles(response.data);
  };
  useEffect(() => {
    getArticles();
  }, []);

  const handleDeleteRow = async (targetIndex) => {
    if (confirm("Xác nhận xóa!") == true) {
      const res = await api.deleteListPost(targetIndex);
      getArticles();
    }
  };

  const handleEditRow = (idx) => {
    setRowToEdit(idx);
    setModalOpen(true);
  };

  const handleSubmit = (newRow) => {
    rowToEdit === null
      ? setRows([...rows, newRow])
      : setRows(
          rows.map((currRow, idx) => {
            if (idx !== rowToEdit) return currRow;

            return newRow;
          })
        );
  };
  console.log(articles[2]);
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full px-4">
          <div className="tableStyle">
            {/* <CardTablePost
              articles={articles}
              rows={rows}
              deleteRow={handleDeleteRow}
              editRow={handleEditRow}
            /> */}
            <CardTableArticle />
            <Link to="/admin/add-page">
              <button className="btn">Thêm</button>
            </Link>
            {modalOpen && (
              <Modal
                closeModal={() => {
                  setModalOpen(false);
                  setRowToEdit(null);
                }}
                onSubmit={handleSubmit}
                defaultValue={rowToEdit !== null && articles[rowToEdit]}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
