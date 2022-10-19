const themeService = require("./themeService.js");

const createTheme = async () => {
  const theme = await themeService.createTheme({});
  return theme;
};

const findOneById = async (id) => {
  const theme = await themeService.findOneById(id);
  return theme;
};

const updateThemeById = async (id, data) => {
  const theme = await themeService.updateThemeById(id, data);
  return theme;
};

const themeController = {
  createTheme,
  findOneById,
  updateThemeById,
};

module.exports = themeController;
