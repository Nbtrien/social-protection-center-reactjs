import { useState } from "react";
import { useEffect } from "react";
import {
  Card,
  CardBody,
  Form,
  Input,
  Label,
  Button,
  Container,
} from "reactstrap";
import JoditEditor from "jodit-react";
import { useRef } from "react";
import "../../assets/styles/FormEditor.css";
import apiMethod from "api/apiMethod";
import PrivateFormDataApi from "api/privateFormDataApi";
import Validation from "./Validate";
import { Link } from "react-router-dom";
// import { Alert } from "reactstrap";

const Articles = (color) => {
  // Khai báo
  const editor = useRef("");
  const imgRef = useRef("");
  const cateRef = useRef("");
  const privateFDataApi = PrivateFormDataApi();
  const [categories, setCategories] = useState([]);
  const [post, setPost] = useState({
    title: "",
    content: "",
    articleUrl: "",
    category: {
      categoryId: "",
    },
  });
  const [image, setImage] = useState(null);
  const config = {
    readonly: false,
    placeholder: "Nhập nội dung bài viết",
  };

  const [errors, setErrors] = useState({});
  // restAPI
  useEffect(() => {
    const getCategories = async () => {
      const response = await apiMethod.getCategories();
      setCategories(response);
    };
    getCategories();
  }, []);

  // Handle function
  const handleInputChange = (e) => {
    // setPost({ ...post, title: e.target.value });

    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const [isPostSuccessful, setIsPostSuccessful] = useState(false);

  // const handleFileChange = (e) => {
  //   setImage(e.target.files[0]);
  // };

  const handleCategoryChange = (e) => {
    const category = post.category;
    category.categoryId = e.target.value;
    setPost({
      ...post,
      category: category,
    });
  };

  const handleContentChange = (content) => {
    post.content = content;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(Validation(post));
    // if (Object.keys(Validation(post)).length === 0) {
    //   console.log(Validation(post));
    // }

    if (Object.keys(Validation(post)).length === 0) {
      setIsPostSuccessful(true);
      // call API
      const data = new FormData();
      // await fetch("http://localhost:8080/social-protection-api/articles")
      data.append(
        "article",
        new Blob(
          [
            JSON.stringify({
              title: post.title,
              content: post.content,
              articleUrl: post.articleUrl,
              category: post.category,
            }),
          ],
          {
            type: "application/json",
          }
        )
      );
      data.append("image", image);
      console.log(image);
      const response = await privateFDataApi.addArticle(data);
      console.log(response);

      // Reset the form
      setPost({
        title: "",
        content: "",
        articleUrl: "",
        category: {
          categoryId: null,
        },
      });
      setImage(null);
      editor.current.valueOf = "";
      imgRef.current.valueOf = "";
      cateRef.current.valueOf = -1;
    }
  };

  // Validate file ảnh
  const isValidImage = (file) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    const maxFileSize = 5 * 1024 * 1024; // 5 MB

    if (!allowedTypes.includes(file.type)) {
      return false;
    }

    if (file.size > maxFileSize) {
      return false;
    }

    return true;
  };

  const [imageError, setImageError] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile && !isValidImage(selectedFile)) {
      setImageError(
        "File ảnh không hợp lệ. Vui lòng chọn file JPEG, PNG hoặc GIF, và kích thước không quá 5MB."
      );
    } else {
      setImageError("");
      setImage(selectedFile);
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
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3
                className={
                  "font-semibold text-lg " +
                  (color === "light" ? "text-blueGray-700" : "text-white")
                }
              >
                Thêm bài viết của bạn
              </h3>
            </div>
          </div>
        </div>
      </div>
      <div className="wrapper">
        <Card className="shadow-sm border-0 mt-2">
          <CardBody className="p-8">
            <Form onSubmit={handleSubmit}>
              <div className="form-group">
                <Label htmlFor="title" id="title-lable">
                  Tiêu đề <p className="validata-star">(*)</p>
                </Label>
                <input
                  type="text"
                  name="title"
                  placeholder="Nhập tiêu đề"
                  value={post.title}
                  onChange={handleInputChange}
                />
                {errors.title && <p style={{ color: "red" }}>{errors.title}</p>}
              </div>
              <div className="form-group">
                <Label htmlFor="title" id="title-lable">
                  Danh mục bài viết <p className="validata-star">(*)</p>
                </Label>
                <select
                  value={post.category?.categoryId}
                  onChange={handleCategoryChange}
                  ref={cateRef}
                >
                  <option defaultValue={-1}>Chọn danh mục</option>
                  {categories.map((category, index) => (
                    <option value={category.categoryId} key={index}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p style={{ color: "red" }}>{errors.category}</p>
                )}
              </div>

              <div className="form-group">
                <Label htmlFor="title" id="title-lable">
                  Đường dẫn
                </Label>
                <input
                  type="text"
                  name="articleUrl"
                  placeholder="Nhập đường dẫn"
                  value={post.articleUrl}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <Label htmlFor="title" id="title-lable">
                  Chọn ảnh <p className="validata-star">(*)</p>
                </Label>
                <input
                  ref={imgRef}
                  id="image"
                  accept="image/*"
                  type="file"
                  onChange={handleFileChange}
                />
                {imageError && <p style={{ color: "red" }}>{imageError}</p>}
              </div>
              <div className="form-group">
                <Label htmlFor="title" id="title-lable">
                  Nội dung<p className="validata-star">(*)</p>
                </Label>
                <JoditEditor
                  id="editor"
                  ref={editor}
                  value={post.content}
                  config={config}
                  onChange={(newContent) => {
                    handleContentChange(newContent);
                  }}
                />
                {errors.content && (
                  <p style={{ color: "red" }}>{errors.content}</p>
                )}
              </div>

              <Container className="text-center">
                <Button
                  id="submit"
                  className="rounded-0"
                  color="primary"
                  onClick={handleSubmit}
                >
                  Đăng bài
                </Button>
                <Button id="reset" className="rounded-0 ms-2" color="danger">
                  Reset
                </Button>
              </Container>

              {isPostSuccessful && (
                <div className="notification success">
                  Bài viết đã được đăng thành công!
                  <Link to="/admin/website" className="back-link">
                    Quay lại danh sách bài viết
                  </Link>
                </div>
              )}
            </Form>
          </CardBody>
        </Card>
      </div>
    </>
  );
};
export default Articles;
