import { parse, generate } from "../index.js";

const wat = `
(module
  (func $add (param $lhs i32) (param $rhs i32) (result i32)
    local.get $lhs
    local.get $rhs
    i32.add)
  (func $sub (param i32) (param i32) (result i32)
    local.get 0
    local.get 1
    i32.sub)
  (export "add" (func $add))
  (export "sub" (func $sub))
)
`.trim();

describe("compile", () => {
  it("ok", async () => {
    const result = parse([...wat]);

    if (!result.success) {
      throw new Error("failed to parse");
    }

    const buf = generate(result.data);

    const wasmModule = await WebAssembly.instantiate(buf);
    const { add, sub } = wasmModule.instance.exports;
    type Add = (a: number, b: number) => number;
    type Sub = (a: number, b: number) => number;

    expect((add as Add)(1, 2)).toBe(3);
    expect((sub as Sub)(7, 2)).toBe(5);
  });
});
