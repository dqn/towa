import { identifier } from "../identifier.js";

type Output = ReturnType<typeof identifier>;

describe("variable", () => {
  it("empty", () => {
    const input = [] as const;
    const output = identifier(input);
    expect(output).toEqual<Output>({
      success: false,
    });
  });

  it("foobar", () => {
    const input = [..."foobar"];
    const output = identifier(input);
    expect(output).toEqual<Output>({
      success: true,
      data: "foobar",
      rest: [],
    });
  });
});
