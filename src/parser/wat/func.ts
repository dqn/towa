import { cat } from "../combinators/cat.js";
import { rep } from "../combinators/rep.js";
import { char } from "../primitives/char.js";
import { ParserInput } from "../types/ParseInput.js";
import { ParserOutput } from "../types/ParserOutput.js";
import { map } from "../utils/map.js";
import { str } from "../utils/str.js";
import { whitespace } from "../utils/whitespace.js";
import { Param, param } from "./param.js";
import { Result, result } from "./result.js";
import { Statement, statement } from "./statement.js";
import { variable } from "./variable.js";

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
