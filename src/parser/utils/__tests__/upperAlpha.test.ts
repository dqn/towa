import { upperAlpha } from "../upperAlpha.js";

const parser = upperAlpha;
type Output = ReturnType<typeof upperAlpha>;

describe("upperAlpha", () => {
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
      success: false,
    });
  });

  it("'A'", () => {
    const input = [..."A"];
    const output = parser(input);
    expect(output).toStrictEqual<Output>({
      success: true,
      data: "A",
      rest: [],
    });
  });
});
