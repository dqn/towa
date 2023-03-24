import { i32Add } from "../i32Add.js";

type Output = ReturnType<typeof i32Add>;

describe("i32Add", () => {
  it("empty", () => {
    const input = [] as const;
    const output = i32Add(input);
    expect(output).toEqual<Output>({
      success: false,
    });
  });

  it("ok", () => {
    const input = [..."i32.add"];
    const output = i32Add(input);
    expect(output).toEqual<Output>({
      success: true,
      data: {
        type: "i32.add",
      },
      rest: [],
    });
  });
});
