import { cat } from "../combinators/cat.js";
import { rep } from "../combinators/rep.js";
import { char } from "../primitives/char.js";
import { ParserInput } from "../types/ParseInput.js";
import { ParserOutput } from "../types/ParserOutput.js";
import { map } from "../utils/map.js";
import { str } from "../utils/str.js";
import { whitespace } from "../utils/whitespace.js";
import { Local, local } from "./local.js";
import { Param, param } from "./param.js";
import { Result, result } from "./result.js";
import { Statement, statement } from "./statement.js";
import { variable } from "./variable.js";

export type Func = {
  name: string;
  params: Param[];
  results: Result[];
  locals: Local[];
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
      rep(cat([result, whitespace])),
      rep(cat([local, whitespace])),
      rep(cat([statement, whitespace])),
      char(")"),
    ]),
    ([
      ,
      ,
      ,
      name,
      ,
      paramsWithWs,
      resultWithWses,
      localWithWses,
      statementsWithWs,
    ]) => ({
      name,
      params: paramsWithWs.map(([p]) => p),
      results: resultWithWses.map(([x]) => x),
      locals: localWithWses.map(([x]) => x),
      statements: statementsWithWs.map(([s]) => s),
    }),
  )(input);
}
