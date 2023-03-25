import { _return } from "../return.js";

type Output = ReturnType<typeof _return>;

describe("_return", () => {
  it("empty", () => {
    const input = [] as const;
    const output = _return(input);
    expect(output).toEqual<Output>({
      success: false,
    });
  });

  it("ok", () => {
    const input = [..."return foo + bar;"] as const;
    const output = _return(input);
    expect(output).toEqual<Output>({
      success: true,
      data: {
        kind: "return",
        expr: {
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
      },
      rest: [],
    });
  });
});
