import { string } from "../string.js";

type Output = ReturnType<typeof string>;

describe("string", () => {
  it("empty", () => {
    const input = [] as const;
    const output = string(input);
    expect(output).toEqual<Output>({
      success: false,
    });
  });

  it("non-quoted string", () => {
    const input = [..."foobar"] as const;
    const output = string(input);
    expect(output).toEqual<Output>({
      success: false,
    });
  });

  it("'foobar'", () => {
    const input = [...'"foobar"'];
    const output = string(input);
    expect(output).toEqual<Output>({
      success: true,
      data: "foobar",
      rest: [],
    });
  });
});
