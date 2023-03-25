import { generate } from "../generate.js";

describe("func", () => {
  it("ok", async () => {
    const buf = generate({
      funcs: [
        {
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
      ],
      exports: [
        {
          name: "add",
          target: "add",
        },
      ],
    });
    const wasmModule = await WebAssembly.instantiate(buf);
    const { add } = wasmModule.instance.exports;
    const actual = (add as any)(1, 2);
    expect(actual).toBe(3);
  });

  it("const", async () => {
    const buf = generate({
      funcs: [
        {
          name: "add10",
          params: [
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
              type: "i32.const",
              literal: 10,
            },
            {
              type: "local.get",
              ref: "index",
              index: 0,
            },
            {
              type: "i32.add",
            },
          ],
        },
      ],
      exports: [
        {
          name: "add",
          target: "add10",
        },
      ],
    });
    const wasmModule = await WebAssembly.instantiate(buf);
    const { add } = wasmModule.instance.exports;
    const actual = (add as any)(2);
    expect(actual).toBe(12);
  });
});
