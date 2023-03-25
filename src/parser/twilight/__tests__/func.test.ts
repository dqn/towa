import { func } from "../func.js";

type Output = ReturnType<typeof func>;

describe("func", () => {
  it("empty", () => {
    const input = [] as const;
    const output = func(input);
    expect(output).toEqual<Output>({
      success: false,
    });
  });

  it("ok", () => {
    const code = `
export function foo(bar: i32, baz: i32): i32 {
  const hoge: i32 = 42;
  const fuga: i32 = 43;
  return hoge + fuga;
}
`.trim();
    const input = [...code] as const;
    const output = func(input);
    expect(output).toEqual<Output>({
      success: true,
      data: {
        export: true,
        name: "foo",
        params: [
          {
            name: "bar",
            type: "i32",
          },
          {
            name: "baz",
            type: "i32",
          },
        ],
        returnType: "i32",
        statements: [
          {
            kind: "declaration",
            name: "hoge",
            type: "i32",
            value: 42,
          },
          {
            kind: "declaration",
            name: "fuga",
            type: "i32",
            value: 43,
          },
          {
            kind: "return",
            expr: {
              type: "add",
              lhs: {
                type: "variable",
                name: "hoge",
              },
              rhs: {
                type: "variable",
                name: "fuga",
              },
            },
          },
        ],
      },
      rest: [],
    });
  });
});
