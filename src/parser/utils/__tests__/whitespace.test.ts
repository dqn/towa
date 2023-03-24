import { whitespace } from "../whitespace";

const parser = whitespace;
type Output = ReturnType<typeof parser>;

describe("whitespace", () => {
  it("empty", () => {
    const input: string[] = [];
    const output = parser(input);
    expect(output).toStrictEqual<Output>({
      success: true,
      data: null,
      rest: [],
    });
  });

  it("'abc'", () => {
    const input = [..."abc"];
    const output = parser(input);
    expect(output).toStrictEqual<Output>({
      success: true,
      data: null,
      rest: [..."abc"],
    });
  });

  it("'\\t\\n\\r hoge'", () => {
    const input = [..."\t\n\r hoge"];
    const output = parser(input);
    expect(output).toStrictEqual<Output>({
      success: true,
      data: null,
      rest: [..."hoge"],
    });
  });
});
