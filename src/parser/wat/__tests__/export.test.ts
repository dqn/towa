import { _export } from "../export.js";

type Output = ReturnType<typeof _export>;

describe("export", () => {
  it("empty", () => {
    const input = [] as const;
    const output = _export(input);
    expect(output).toEqual<Output>({
      success: false,
    });
  });

  it("ok", () => {
    const input = [...'(export "add" (func $foo))'];
    const output = _export(input);
    expect(output).toEqual<Output>({
      success: true,
      data: {
        name: "add",
        target: "foo",
      },
      rest: [],
    });
  });
});
