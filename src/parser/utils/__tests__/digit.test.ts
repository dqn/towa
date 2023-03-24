import { digit } from "../digit.js";

const parser = digit;
type Output = ReturnType<typeof digit>;

describe("digit", () => {
  it("empty", () => {
    const input: string[] = [];
    const output = parser(input);
    expect(output).toStrictEqual<Output>({
      success: false,
    });
  });

  it("'5'", () => {
    const input = [..."5"];
    const output = parser(input);
    expect(output).toStrictEqual<Output>({
      success: true,
      data: "5",
      rest: [],
    });
  });

  it("'a'", () => {
    const input = [..."a"];
    const output = parser(input);
    expect(output).toStrictEqual<Output>({
      success: false,
    });
  });
});
