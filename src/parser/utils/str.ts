import { cat } from "../combinators/cat.js";
import { char } from "../primitives/char.js";
import { Parser } from "../types/Parser.js";

export function str<T extends string>(s: T): Parser<T> {
  return (input) => {
    const p = cat([...s].map(char));
    const r = p(input);

    if (!r.success) {
      return r;
    }

    return {
      success: true,
      data: s,
      rest: r.rest,
    };
  };
}
