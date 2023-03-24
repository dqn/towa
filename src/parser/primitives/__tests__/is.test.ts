import { is } from "../is";

describe("is", () => {
  describe("is((c) => c === 'a')", () => {
    const parser = is((c): c is "a" => c === "a");
    type Output = ReturnType<typeof parser>;

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

    it("'A'", () => {
      const input = [..."A"];
      const output = parser(input);
      expect(output).toStrictEqual<Output>({
        success: false,
      });
    });
  });

  describe("is((c) => c === '0' || c === '1')", () => {
    const parser = is((c): c is "0" | "1" => c === "0" || c === "1");
    type Output = ReturnType<typeof parser>;

    it("empty", () => {
      const input: string[] = [];
      const output = parser(input);
      expect(output).toStrictEqual<Output>({
        success: false,
      });
    });

    it("'0'", () => {
      const input = [..."0"];
      const output = parser(input);
      expect(output).toStrictEqual<Output>({
        success: true,
        data: "0",
        rest: [],
      });
    });

    it("'1'", () => {
      const input = [..."1"];
      const output = parser(input);
      expect(output).toStrictEqual<Output>({
        success: true,
        data: "1",
        rest: [],
      });
    });

    it("'A'", () => {
      const input = [..."A"];
      const output = parser(input);
      expect(output).toStrictEqual<Output>({
        success: false,
      });
    });
  });
});
