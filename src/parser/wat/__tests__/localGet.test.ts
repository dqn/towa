import { localGet } from "../localGet";

type Output = ReturnType<typeof localGet>;

describe("localGet", () => {
  it("empty", () => {
    const input = [] as const;
    const output = localGet(input);
    expect(output).toEqual<Output>({
      success: false,
    });
  });

  it("ok", () => {
    const input = [..."local.get $foo"];
    const output = localGet(input);
    expect(output).toEqual<Output>({
      success: true,
      data: {
        type: "local.get",
        variable: "foo",
      },
      rest: [],
    });
  });
});
