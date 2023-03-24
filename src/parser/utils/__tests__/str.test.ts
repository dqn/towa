import { str } from "../str.js";

const parser = str("true");
type Output = ReturnType<typeof parser>;

describe('str("true")', () => {
  it("empty", () => {
    const input = [] as const;
    const output = parser(input);
    expect(output).toEqual<Output>({
      success: false,
    });
  });

  it("'true'", () => {
    const input = [..."true"];
    const output = parser(input);
    expect(output).toEqual<Output>({
      success: true,
      data: "true",
      rest: [],
    });
  });
});
