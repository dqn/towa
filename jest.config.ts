import type { Config } from "jest";

const config: Config = {
  // roots: ["<rootDir>/src"],
  // testMatch: ["**/__tests__/**/*.ts"],
  transform: {
    "^.+\\.ts$": "@swc/jest",
  },
};

export default config;
