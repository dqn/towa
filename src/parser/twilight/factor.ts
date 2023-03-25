import { cat } from "../combinators/cat.js";
import { or } from "../combinators/or.js";
import { char } from "../primitives/char.js";
import { ParserInput } from "../types/ParseInput.js";
import { ParserOutput } from "../types/ParserOutput.js";
import { map } from "../utils/map.js";
import { whitespace } from "../utils/whitespace.js";
import { Expr, expr } from "./expr.js";
import { identifier } from "./identifier.js";

export function factor(input: ParserInput): ParserOutput<Expr> {
  return map(
    or<string | Expr>([
      identifier,
      map(
        cat([whitespace, char("("), whitespace, expr, whitespace, char(")")]),
        ([, , , n]) => n,
      ),
    ]),
    (x): Expr => (typeof x === "string" ? { type: "variable", name: x } : x),
  )(input);
}
