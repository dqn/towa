import { lowerAlpha } from "../lowerAlpha.js";

const parser = lowerAlpha;
type Output = ReturnType<typeof lowerAlpha>;

describe("lowerAlpha", () => {
  it("empty", () => {
    const input: string[] = [];
    const output = parser(input);
    expect(output).toStrictEqual<Output>({
      success: false,
    });
  });

  it("'a'", () => {
    const input = [..."a"];
    const output = parser(input);
    expect(output).toStrictEqual<Output>({
      success: true,
      data: "a",
      rest: [],
    });
  });

  it("'A'", () => {
    const input = [..."A"];
    const output = parser(input);
    expect(output).toStrictEqual<Output>({
      success: false,
    });
  });
});
