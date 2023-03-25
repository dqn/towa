import { i32Sub } from "../i32Sub.js";

type Output = ReturnType<typeof i32Sub>;

describe("i32Sub", () => {
  it("empty", () => {
    const input = [] as const;
    const output = i32Sub(input);
    expect(output).toEqual<Output>({
      success: false,
    });
  });

  it("ok", () => {
    const input = [..."i32.sub"];
    const output = i32Sub(input);
    expect(output).toEqual<Output>({
      success: true,
      data: {
        type: "i32.sub",
      },
      rest: [],
    });
  });
});
