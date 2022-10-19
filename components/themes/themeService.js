const Theme = require("./themeDal");

const createTheme = async (data) => {
  const theme = new Theme(data);
  const _theme = await theme.save();
  return _theme;
};

const findOneById = async (id) => {
  const theme = await Theme.findById(id);
  return theme;
};

const updateThemeById = async (id, data) => {
  const theme = await Theme.updateOne({ _id: id }, data);
  return theme;
};

const themeService = {
  createTheme,
  findOneById,
  updateThemeById,
};

module.exports = themeService;
