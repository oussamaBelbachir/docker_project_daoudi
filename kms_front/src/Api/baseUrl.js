import axios from "axios";

const instance = axios.create({
    baseURL : "http://localhost:8000/",
});
// instance.defaults.headers.post['Content-Type'] = 'application/json';
// instance.defaults.headers.post['Content-Type'] = '*/*';
// instance.defaults.headers.post['Content-Type'] = 'multipart/form-data';
instance.defaults.headers.post['Accept'] = 'application/json';
instance.defaults.withCredentials = true;

// Set the 'Authorization' header for each request
// instance.interceptors.request.use(
//     (config) => {
//       config.headers.Authorization = `Bearer jdhviudhvi`;
//       return config;
//     },
//     (error) => {
//       return Promise.reject(error);
//     }
//   );

export default instance;

