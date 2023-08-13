/* eslint-env node */
/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
const port = process.env.PORT ?? 4444;
module.exports = {
  server: {
    command: `PORT=${port} ts-node --project ./e2e/tsconfig.json -r tsconfig-paths/register --transpile-only --files ./bin/run_server.ts`,
    port: port,
    launchTimeout: 30000,
  },
  launch: {
    headless: "new",
  },
  browserContext: "incognito",
};
