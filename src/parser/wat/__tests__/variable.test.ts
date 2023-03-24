import { variable } from "../variable.js";

type Output = ReturnType<typeof variable>;

describe("variable", () => {
  it("empty", () => {
    const input = [] as const;
    const output = variable(input);
    expect(output).toEqual<Output>({
      success: false,
    });
  });

  it("no $", () => {
    const input = [..."foobar"] as const;
    const output = variable(input);
    expect(output).toEqual<Output>({
      success: false,
    });
  });

  it("$foobar", () => {
    const input = [..."$foobar"];
    const output = variable(input);
    expect(output).toEqual<Output>({
      success: true,
      data: "foobar",
      rest: [],
    });
  });
});
