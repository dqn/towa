import { factor } from "../factor.js";

type Output = ReturnType<typeof factor>;

describe("factor", () => {
  it("empty", () => {
    const input = [] as const;
    const output = factor(input);
    expect(output).toEqual<Output>({
      success: false,
    });
  });

  it("variable", () => {
    const input = [..."foo"] as const;
    const output = factor(input);
    expect(output).toEqual<Output>({
      success: true,
      data: {
        type: "variable",
        name: "foo",
      },
      rest: [],
    });
  });

  it("with parentheses", () => {
    const input = [..."(foo)"] as const;
    const output = factor(input);
    expect(output).toEqual<Output>({
      success: true,
      data: {
        type: "variable",
        name: "foo",
      },
      rest: [],
    });
  });

  it("nested parentheses", () => {
    const input = [..."(((foo)))"] as const;
    const output = factor(input);
    expect(output).toEqual<Output>({
      success: true,
      data: {
        type: "variable",
        name: "foo",
      },
      rest: [],
    });
  });
});
