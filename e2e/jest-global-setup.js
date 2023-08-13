/* eslint-env node */
const port = process.env.PORT ?? 4444;
module.exports = async function globalSetup() {
  global.TARGET_PAGE_URL = `http://localhost:${port}`;
};
