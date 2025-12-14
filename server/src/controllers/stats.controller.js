const StatsService = require('../services/stats.service');

exports.getDashboardStats = async (req, res) => {
  try {
    // Controller gọi Service: "Ê, lấy cho tao số liệu báo cáo"
    const stats = await StatsService.getDashboardStats();
    
    // Sau đó trả kết quả về cho Client
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};