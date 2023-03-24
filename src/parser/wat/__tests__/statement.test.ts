import { statement } from "../statement";

type Output = ReturnType<typeof statement>;

describe("statement", () => {
  it("empty", () => {
    const input = [] as const;
    const output = statement(input);
    expect(output).toEqual<Output>({
      success: false,
    });
  });

  it("local.get", () => {
    const input = [..."local.get $foobar"];
    const output = statement(input);
    expect(output).toEqual<Output>({
      success: true,
      data: {
        type: "local.get",
        variable: "foobar",
      },
      rest: [],
    });
  });

  it("i32.add", () => {
    const input = [..."i32.add"];
    const output = statement(input);
    expect(output).toEqual<Output>({
      success: true,
      data: {
        type: "i32.add",
      },
      rest: [],
    });
  });
});
