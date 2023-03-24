import { opt } from "../opt.js";
import { char } from "../../primitives/char.js";

const parser = opt(char("a"));
type Output = ReturnType<typeof parser>;

describe("opt", () => {
  it("empty", () => {
    const input: string[] = [];
    const output = parser(input);
    expect(output).toStrictEqual<Output>({
      success: true,
      data: { status: "none" },
      rest: [],
    });
  });

  it('Input "a"', () => {
    const input = [..."a"];
    const output = parser(input);
    expect(output).toStrictEqual<Output>({
      success: true,
      data: { status: "some", value: "a" },
      rest: [],
    });
  });

  it('Input "aa"', () => {
    const input = [..."aa"];
    const output = parser(input);
    expect(output).toStrictEqual<Output>({
      success: true,
      data: { status: "some", value: "a" },
      rest: [..."a"],
    });
  });

  it('Input "b"', () => {
    const input = [..."b"];
    const output = parser(input);
    expect(output).toStrictEqual<Output>({
      success: true,
      data: { status: "none" },
      rest: [..."b"],
    });
  });
});
