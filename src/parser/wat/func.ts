import { cat } from "../combinators/cat";
import { rep } from "../combinators/rep";
import { char } from "../primitives/char";
import { ParserInput } from "../types/ParseInput";
import { ParserOutput } from "../types/ParserOutput";
import { map } from "../utils/map";
import { str } from "../utils/str";
import { whitespace } from "../utils/whitespace";
import { Param, param } from "./param";
import { Result, result } from "./result";
import { Statement, statement } from "./statement";
import { variable } from "./variable";

export type Func = {
  name: string;
  params: Param[];
  result: Result;
  statements: Statement[];
};

export function func(input: ParserInput): ParserOutput<Func> {
  return map(
    cat([
      char("("),
      str("func"),
      whitespace,
      variable,
      whitespace,
      rep(cat([param, whitespace])),
      result,
      whitespace,
      rep(cat([statement, whitespace])),
      char(")"),
    ]),
    ([, , , name, , paramsWithWs, result, , statementsWithWs]) => ({
      name,
      params: paramsWithWs.map(([p]) => p),
      result,
      statements: statementsWithWs.map(([s]) => s),
    }),
  )(input);
}
