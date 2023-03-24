import { char } from "../../primitives/char.js";
import { rep } from "../rep.js";

describe("rep", () => {
  describe('rep(char("a"))', () => {
    const parser = rep(char("a"));
    type Output = ReturnType<typeof parser>;

    it("empty", () => {
      const input: string[] = [];
      const output = parser(input);
      expect(output).toStrictEqual<Output>({
        success: true,
        data: [],
        rest: [],
      });
    });

    it("'a'", () => {
      const input = [..."a"];
      const output = parser(input);
      expect(output).toStrictEqual<Output>({
        success: true,
        data: ["a"],
        rest: [],
      });
    });

    it("'aa'", () => {
      const input = [..."aa"];
      const output = parser(input);
      expect(output).toStrictEqual<Output>({
        success: true,
        data: ["a", "a"],
        rest: [],
      });
    });

    it("'aab'", () => {
      const input = [..."aab"];
      const output = parser(input);
      expect(output).toStrictEqual<Output>({
        success: true,
        data: ["a", "a"],
        rest: [..."b"],
      });
    });
  });

  describe('rep(char("a"), 1)', () => {
    const parser = rep(char("a"), 1);
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
        data: ["a"],
        rest: [],
      });
    });

    it("'aa'", () => {
      const input = [..."aa"];
      const output = parser(input);
      expect(output).toStrictEqual<Output>({
        success: true,
        data: ["a", "a"],
        rest: [],
      });
    });

    it("'aab'", () => {
      const input = [..."aab"];
      const output = parser(input);
      expect(output).toStrictEqual<Output>({
        success: true,
        data: ["a", "a"],
        rest: [..."b"],
      });
    });
  });

  describe('rep(char("a"), 1, 2)', () => {
    const parser = rep(char("a"), 1, 2);
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
        data: ["a"],
        rest: [],
      });
    });

    it("'aa'", () => {
      const input = [..."aa"];
      const output = parser(input);
      expect(output).toStrictEqual<Output>({
        success: true,
        data: ["a", "a"],
        rest: [],
      });
    });

    it("'aaa'", () => {
      const input = [..."aaa"];
      const output = parser(input);
      expect(output).toStrictEqual<Output>({
        success: true,
        data: ["a", "a"],
        rest: [..."a"],
      });
    });
  });
});
