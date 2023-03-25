import { program } from "../../../parser/twilight/program.js";
import { generate } from "../generate.js";

describe("generate", () => {
  it("ok", () => {
    const code = `
export function add(a: i32, b: i32): i32 {
  return a + b;
}

export function sub(a: i32, b: i32): i32 {
  return a - b;
}

export function complex(a: i32, b: i32): i32 {
  const foo: i32 = 42;
  const bar: i32 = 43;
  return a + b - (bar - foo);
}
`;
    const result = program([...code]);

    if (!result.success) {
      throw new Error("failed to parse");
    }

    const output = generate(result.data);
    expect(output).toBe(`(module
  (func $add (param $a i32) (param $b i32) (result i32)
    local.get $a
    local.get $b
    i32.add)
  (func $sub (param $a i32) (param $b i32) (result i32)
    local.get $a
    local.get $b
    i32.sub)
  (func $complex (param $a i32) (param $b i32) (result i32) (local $foo i32) (local $bar i32)
    local.get $a
    local.get $b
    i32.add
    local.get $bar
    local.get $foo
    i32.sub
    i32.sub)
  (export "add" (func $add))
  (export "sub" (func $sub))
  (export "complex" (func $complex))
)
`);
  });
});
