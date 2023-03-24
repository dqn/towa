import { module } from "../module";

type Output = ReturnType<typeof module>;

const code = `
(module
  (func $add (param $lhs i32) (param $rhs i32) (result i32)
    local.get $lhs
    local.get $rhs
    i32.add)
  (export "add" (func $add))
)
`.trim();

describe("func", () => {
  it("empty", () => {
    const input = [] as const;
    const output = module(input);
    expect(output).toEqual<Output>({
      success: false,
    });
  });

  it("ok", () => {
    const input = [...code] as const;
    const output = module(input);
    expect(output).toEqual<Output>({
      success: true,
      data: {
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
          result: {
            type: "i32",
          },
          statements: [
            {
              type: "local.get",
              variable: "lhs",
            },
            {
              type: "local.get",
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
      },
      rest: [],
    });
  });
});
