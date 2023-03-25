import { int } from "../int.js";

type Output = ReturnType<typeof int>;

describe("int", () => {
  it("empty", () => {
    const input = [] as const;
    const output = int(input);
    expect(output).toEqual<Output>({
      success: false,
    });
  });

  it("1-digit", () => {
    const input = [..."1"] as const;
    const output = int(input);
    expect(output).toEqual<Output>({
      success: true,
      data: 1,
      rest: [],
    });
  });

  it("2-digit", () => {
    const input = [..."42"];
    const output = int(input);
    expect(output).toEqual<Output>({
      success: true,
      data: 42,
      rest: [],
    });
  });
});
