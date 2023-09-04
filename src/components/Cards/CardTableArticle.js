import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  BsFillTrashFill,
  BsFillPencilFill,
  BsFillEyeFill,
  BsChevronUp,
  BsChevronDown,
} from "react-icons/bs";
import { Link } from "react-router-dom";
import "../../assets/styles/tableItems.css";
import usePrivateApi from "api/usePrivateApi";
import { Pagination } from "@mui/material";

export const CardTableArticle = ({ color }) => {
  const privateApi = usePrivateApi();
  const [articles, setArticles] = useState([]);
  const limit = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [isDataChange, setIsDataChange] = useState(false);

  const [sort, setSort] = useState({
    sortBy: "postDate",
    sortDirec: "DESC",
  });

  useEffect(() => {
    const getArticles = async () => {
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
      const response = await privateApi.getAllArticles(params);
      setTotalPage(response.data.totalPages);
      setArticles(response.data.content);
    };
    getArticles();
  }, [isDataChange, currentPage, sort]);

  const handleDelete = async (id) => {
    if (confirm("Xác nhận xóa!") == true) {
      const response = await privateApi.deleteListPost(id);
      if (response.status == 200) {
        alert("Thành công");
        setIsDataChange(!isDataChange);
      }
    }
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
        <div className="rounded mb-0 py-3 border-1">
          <div className="flex flex-wrap">
            <div
              className="relative w-full px-1 margin-top: 10 max-w-full flex-grow flex-1"
              align="center"
            >
              <h3
                className={
                  "font-semibold text-lg " +
                  (color === "light" ? "text-blueGray-700" : "text-white")
                }
              >
                DANH SÁCH BÀI VIẾT
              </h3>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          <div className="table-wrapper">
            <table style={{ display: "table" }} className="table">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Tiêu đề bài viết</th>
                  {/* <th>Ngày đăng</th> */}
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
                        Ngày đăng
                      </div>
                      <span style={{ fontSize: "13px" }}>
                        <button
                          style={{ display: "block" }}
                          onClick={() => {
                            setSort({
                              sortBy: "postDate",
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
                              sortBy: "postDate",
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
                  <th>Danh mục</th>
                  <th>Tác vụ</th>
                </tr>
              </thead>
              <tbody>
                {articles.map((post, idx) => {
                  return (
                    <tr key={idx}>
                      <td> {idx + 1} </td>
                      <td>{post.title}</td>
                      <td>{post.postDate}</td>
                      <td>{post.category.name}</td>
                      <td>
                        <div
                          style={{
                            textWrap: "nowrap",
                            display: "flex",
                            alignItems: "center",
                            gap: "0.25rem",
                          }}
                        >
                          <BsFillEyeFill />
                          <Link
                            to={`../thong-tin/${post.category.categoryUrl}/${post.articleUrl}/${post.articleId}`}
                            target="_blank"
                          >
                            Xem bài viết
                          </Link>
                        </div>
                        <button className="flex items-center ">
                          <BsFillPencilFill />
                          <span className="text-center ml-1"> Sửa</span>
                        </button>
                        <button
                          className="flex items-center "
                          onClick={() => handleDelete(post.articleId)}
                        >
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
    </>
  );
};

CardTableArticle.defaultProps = {
  color: "light",
};

CardTableArticle.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
