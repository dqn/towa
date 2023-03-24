import { char } from "../../primitives/char";
import { not } from "../not";

const parser = not(char("a"));
type Output = ReturnType<typeof parser>;

describe("not", () => {
  it("empty", () => {
    const input: string[] = [];
    const output = parser(input);
    expect(output).toStrictEqual<Output>({
      success: true,
      data: null,
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

  it("'A'", () => {
    const input = [..."A"];
    const output = parser(input);
    expect(output).toStrictEqual<Output>({
      success: true,
      data: null,
      rest: [..."A"],
    });
  });

  it("'foo'", () => {
    const input = [..."foo"];
    const output = parser(input);
    expect(output).toStrictEqual<Output>({
      success: true,
      data: null,
      rest: [..."foo"],
    });
  });
});
