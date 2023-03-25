import { i32Const } from "../i32Const.js";

type Output = ReturnType<typeof i32Const>;

describe("i32Const", () => {
  it("empty", () => {
    const input = [] as const;
    const output = i32Const(input);
    expect(output).toEqual<Output>({
      success: false,
    });
  });

  it("ok", () => {
    const input = [..."i32.const 10"];
    const output = i32Const(input);
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
