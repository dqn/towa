import { map } from "../map";
import { anyChar } from "../../primitives/anyChar";

const parser = map(anyChar, (s) => Number.parseInt(s, 10));
type Output = ReturnType<typeof parser>;

describe("map", () => {
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
      data: 5,
      rest: [],
    });
  });
});
