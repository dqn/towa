import { func } from "../func.js";

type Output = ReturnType<typeof func>;

const code = `
(func $add (param $lhs i32) (param $rhs i32) (result i32)
  local.get $lhs
  local.get $rhs
  i32.add)
`.trim();

describe("func", () => {
  it("empty", () => {
    const input = [] as const;
    const output = func(input);
    expect(output).toEqual<Output>({
      success: false,
    });
  });

  it("ok", () => {
    const input = [...code] as const;
    const output = func(input);
    expect(output).toEqual<Output>({
      success: true,
      data: {
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
      rest: [],
    });
  });
});
