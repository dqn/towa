import { cat } from "../combinators/cat";
import { char } from "../primitives/char";
import { Parser } from "../types/Parser";

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
