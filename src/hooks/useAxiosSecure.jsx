import axios from 'axios';

const axiosSecure = axios.create({
  baseURL: 'http://localhost:5000',
});
const useAxiosSecure = () => {
  // Add a request interceptor
  axiosSecure.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem('access-token');

      config.headers.authorization = `Bearer ${token}`;
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  axiosSecure.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // const status = error.response.status
      // if (status === 401 || status === 403) {
      // }
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
