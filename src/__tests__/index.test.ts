import { parse, generate } from "../index.js";

const wat = `
(module
  (func $add (param $lhs i32) (param $rhs i32) (result i32)
    local.get $lhs
    local.get $rhs
    i32.add)
  (export "add" (func $add))
)
`.trim();

describe("compile", () => {
  it("ok", async () => {
    const result = parse([...wat]);

    if (!result.success) {
      return;
    }

    const buf = generate(result.data);

    const wasmModule = await WebAssembly.instantiate(buf);
    const { add } = wasmModule.instance.exports;
    type Add = (a: number, b: number) => number;
    const actual = (add as Add)(1, 2);

    expect(actual).toBe(3);
  });
});
