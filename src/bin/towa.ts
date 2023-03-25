#! /usr/bin/env node

import { readFileSync, writeFileSync } from "fs";
import { generate, parse } from "../index.js";

async function main(): Promise<void> {
  const path = process.argv[2];

  if (path === undefined) {
    console.log("Usage\n  $ npx towa path/to/file.wat");
    return;
  }

  const wat = readFileSync(path, "utf-8");
  const result = parse([...wat]);

  if (!result.success) {
    console.error("failed to parse");
    return;
  }

  const buf = generate(result.data);
  writeFileSync(path.replace(/\.wat$/, ".wasm"), buf);
}

main();
