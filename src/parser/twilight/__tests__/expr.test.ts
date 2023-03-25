import { expr } from "../expr.js";

type Output = ReturnType<typeof expr>;

describe("expr", () => {
  it("empty", () => {
    const input = [] as const;
    const output = expr(input);
    expect(output).toEqual<Output>({
      success: false,
    });
  });

  it("variable", () => {
    const input = [..."foo"] as const;
    const output = expr(input);
    expect(output).toEqual<Output>({
      success: true,
      data: {
        type: "variable",
        name: "foo",
      },
      rest: [],
    });
  });

  it("add", () => {
    const input = [..."foo + bar"];
    const output = expr(input);
    expect(output).toEqual<Output>({
      success: true,
      data: {
        type: "add",
        lhs: {
          type: "variable",
          name: "foo",
        },
        rhs: {
          type: "variable",
          name: "bar",
        },
      },
      rest: [],
    });
  });

  it("sub", () => {
    const input = [..."foo - bar"];
    const output = expr(input);
    expect(output).toEqual<Output>({
      success: true,
      data: {
        type: "sub",
        lhs: {
          type: "variable",
          name: "foo",
        },
        rhs: {
          type: "variable",
          name: "bar",
        },
      },
      rest: [],
    });
  });

  it("complex", () => {
    const input = [..."foo + bar - (hoge + fuga)"];
    const output = expr(input);
    expect(output).toEqual<Output>({
      success: true,
      data: {
        type: "sub",
        lhs: {
          type: "add",
          lhs: {
            type: "variable",
            name: "foo",
          },
          rhs: {
            type: "variable",
            name: "bar",
          },
        },
        rhs: {
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
      rest: [],
    });
  });
});
