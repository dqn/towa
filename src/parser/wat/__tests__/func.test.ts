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
(func $add (param $lhs i32) (param $rhs i32) (result i32)
  local.get $lhs
  local.get $rhs
  i32.add)
`.trim();

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
      rest: [],
    });
  });

  it("with no variable names", () => {
    const code = `
(func $add (param i32) (param i32) (result i32)
  local.get 0
  local.get 1
  i32.add)
`.trim();

    const input = [...code] as const;
    const output = func(input);
    expect(output).toEqual<Output>({
      success: true,
      data: {
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
      rest: [],
    });
  });

  it("with no results", () => {
    const code = `
(func $add (param i32))
`.trim();

    const input = [...code] as const;
    const output = func(input);
    expect(output).toEqual<Output>({
      success: true,
      data: {
        name: "add",
        params: [
          {
            name: null,
            type: "i32",
          },
        ],
        results: [],
        locals: [],
        statements: [],
      },
      rest: [],
    });
  });

  it("with locals", () => {
    const code = `
(func $add (param i32) (local i32) (local i32))
`.trim();

    const input = [...code] as const;
    const output = func(input);
    expect(output).toEqual<Output>({
      success: true,
      data: {
        name: "add",
        params: [
          {
            name: null,
            type: "i32",
          },
        ],
        results: [],
        locals: [
          {
            name: null,
            type: "i32",
          },
          {
            name: null,
            type: "i32",
          },
        ],
        statements: [],
      },
      rest: [],
    });
  });
});
