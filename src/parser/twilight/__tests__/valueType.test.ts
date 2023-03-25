import { valueType } from "../valueType.js";

type Output = ReturnType<typeof valueType>;

describe("valueType", () => {
  it("empty", () => {
    const input = [] as const;
    const output = valueType(input);
    expect(output).toEqual<Output>({
      success: false,
    });
  });

  it("i32", () => {
    const input = [..."i32"] as const;
    const output = valueType(input);
    expect(output).toEqual<Output>({
      success: true,
      data: "i32",
      rest: [],
    });
  });
});
