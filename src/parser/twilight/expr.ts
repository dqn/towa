import { cat } from "../combinators/cat.js";
import { or } from "../combinators/or.js";
import { rep } from "../combinators/rep.js";
import { char } from "../primitives/char.js";
import { ParserInput } from "../types/ParseInput.js";
import { ParserOutput } from "../types/ParserOutput.js";
import { map } from "../utils/map.js";
import { whitespace } from "../utils/whitespace.js";
import { factor } from "./factor.js";

export type Expr =
  | {
      type: "variable";
      name: string;
    }
  | {
      type: "add";
      lhs: Expr;
      rhs: Expr;
    }
  | {
      type: "sub";
      lhs: Expr;
      rhs: Expr;
    };

export function expr(input: ParserInput): ParserOutput<Expr> {
  return map(
    cat([
      factor,
      rep(cat([whitespace, or([char("+"), char("-")]), whitespace, factor])),
    ]),
    ([f1, rest]) => {
      let ast = f1;

      for (const [, op, , f2] of rest) {
        ast = {
          type: op === "+" ? "add" : "sub",
          lhs: { ...ast },
          rhs: f2,
        };
      }

      return ast;
    },
  )(input);
}
