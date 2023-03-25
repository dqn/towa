import { statement } from "../statement.js";

type Output = ReturnType<typeof statement>;

describe("statement", () => {
  it("empty", () => {
    const input = [] as const;
    const output = statement(input);
    expect(output).toEqual<Output>({
      success: false,
    });
  });

  it("local.get", () => {
    const input = [..."local.get $foobar"];
    const output = statement(input);
    expect(output).toEqual<Output>({
      success: true,
      data: {
        type: "local.get",
        ref: "variable",
        variable: "foobar",
      },
      rest: [],
    });
  });

  it("i32.add", () => {
    const input = [..."i32.add"];
    const output = statement(input);
    expect(output).toEqual<Output>({
      success: true,
      data: {
        type: "i32.add",
      },
      rest: [],
    });
  });

  it("i32.sub", () => {
    const input = [..."i32.sub"];
    const output = statement(input);
    expect(output).toEqual<Output>({
      success: true,
      data: {
        type: "i32.sub",
      },
      rest: [],
    });
  });

  it("i32.const", () => {
    const input = [..."i32.const 10"];
    const output = statement(input);
    expect(output).toEqual<Output>({
      success: true,
      data: {
        type: "i32.const",
        literal: 10,
      },
      rest: [],
    });
  });
});
