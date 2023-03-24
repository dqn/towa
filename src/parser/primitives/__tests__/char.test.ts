import { char } from "../char.js";

const parser = char("a");
type Output = ReturnType<typeof parser>;

describe("char", () => {
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

  it("multiple chars", () => {
    const input = [..."foo"];
    const output = parser(input);
    expect(output).toStrictEqual<Output>({
      success: false,
    });
  });
});
