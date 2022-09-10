exports.error = [
  async (req, res) => {
    try {
      return res.status(400).json({
        success: false,
        message:
          "Use /api/v1 for API. Read the documentation at https://github.com/rendisagala/ReachMe",
      });
    } catch (error) {
      return res.status(500).json({ message: error.message, success: false });
    }
  },
];
