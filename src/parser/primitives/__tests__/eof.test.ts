import { eof } from "../eof.js";

type Output = ReturnType<typeof eof>;

describe("eof", () => {
  it("eof", () => {
    const input: string[] = [];
    const output = eof(input);
    expect(output).toStrictEqual<Output>({
      success: true,
      data: null,
      rest: [],
    });
  });

  it("1 char", () => {
    const input = [..."a"];
    const output = eof(input);
    expect(output).toStrictEqual<Output>({
      success: false,
    });
  });
});
