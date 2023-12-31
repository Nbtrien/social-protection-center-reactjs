import useAxiosPrivate from "./useAxiosPrivate";
import axiosFormData from "./axiosFormData";

const PrivateFormDataApi = () => {
  const axiosPrivate = useAxiosPrivate(axiosFormData);
  const privateFDataApi = {
    addChild: (params) => {
      const url = "children";
      return axiosPrivate.post(url, params);
    },
    update: (params) => {
      const url = "children";
      return axiosPrivate.put(url, params);
    },
    addEmployee: (params) => {
      const url = "employees";
      return axiosPrivate.post(url, params);
    },
    addArticle: (params) => {
      const url = "articles";
      return axiosPrivate.post(url, params);
    },
    updateEmployee: (params) => {
      const url = "employees";
      return axiosPrivate.put(url, params);
    },
  };

  return privateFDataApi;
};

export default PrivateFormDataApi;
