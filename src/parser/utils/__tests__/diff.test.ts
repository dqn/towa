import { char } from "../../primitives/char";
import { anyChar } from "../../primitives/anyChar";
import { diff } from "../diff";

const parser = diff(anyChar, char("0"));
type Output = ReturnType<typeof parser>;

describe("diff", () => {
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

  it("'0'", () => {
    const input = [..."0"];
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
});
