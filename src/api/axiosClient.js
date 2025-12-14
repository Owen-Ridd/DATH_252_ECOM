import axios from 'axios';

const axiosClient = axios.create({
  // Thay 5000 bằng cổng server thực tế của bạn (5001 hoặc 8000 nếu bạn đã đổi)
  baseURL: 'http://localhost:5001/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Lấy token từ lúc đăng nhập
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Gửi kèm theo chuẩn Bearer
  }
  return config;
});

export default axiosClient;