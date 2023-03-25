import { cat } from "../combinators/cat.js";
import { char } from "../primitives/char.js";
import { ParserInput } from "../types/ParseInput.js";
import { ParserOutput } from "../types/ParserOutput.js";
import { map } from "../utils/map.js";
import { str } from "../utils/str.js";
import { whitespace } from "../utils/whitespace.js";
import { Expr, expr } from "./expr.js";

export type Return = {
  kind: "return";
  expr: Expr;
};

export function _return(input: ParserInput): ParserOutput<Return> {
  return map(
    cat([str("return"), whitespace, expr, whitespace, char(";")]),
    ([, , expr]): Return => ({ kind: "return", expr }),
  )(input);
}
