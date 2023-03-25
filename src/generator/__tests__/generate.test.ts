import { generate } from "../generate.js";

describe("func", () => {
  it("ok", async () => {
    const buf = generate({
      func: {
        name: "add",
        params: [
          {
            name: "lhs",
            type: "i32",
          },
          {
            name: "rhs",
            type: "i32",
          },
        ],
        results: [
          {
            type: "i32",
          },
        ],
        locals: [],
        statements: [
          {
            type: "local.get",
            ref: "variable",
            variable: "lhs",
          },
          {
            type: "local.get",
            ref: "variable",
            variable: "rhs",
          },
          {
            type: "i32.add",
          },
        ],
      },
      export: {
        name: "add",
        target: "add",
      },
    });
    const wasmModule = await WebAssembly.instantiate(buf);
    const { add } = wasmModule.instance.exports;
    const actual = (add as any)(1, 2);
    expect(actual).toBe(3);
  });

  it("with index access", async () => {
    const buf = generate({
      func: {
        name: "add",
        params: [
          {
            name: null,
            type: "i32",
          },
          {
            name: null,
            type: "i32",
          },
        ],
        results: [
          {
            type: "i32",
          },
        ],
        locals: [],
        statements: [
          {
            type: "local.get",
            ref: "index",
            index: 0,
          },
          {
            type: "local.get",
            ref: "index",
            index: 1,
          },
          {
            type: "i32.add",
          },
        ],
      },
      export: {
        name: "add",
        target: "add",
      },
    });
    const wasmModule = await WebAssembly.instantiate(buf);
    const { add } = wasmModule.instance.exports;
    const actual = (add as any)(2, 3);
    expect(actual).toBe(5);
  });
});
