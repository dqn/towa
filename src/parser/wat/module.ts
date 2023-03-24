import { cat } from "../combinators/cat";
import { char } from "../primitives/char";
import { ParserInput } from "../types/ParseInput";
import { ParserOutput } from "../types/ParserOutput";
import { map } from "../utils/map";
import { opt } from "../utils/opt";
import { str } from "../utils/str";
import { whitespace } from "../utils/whitespace";
import { Export, _export } from "./export";
import { Func, func } from "./func";

export type Module = {
  func: null | Func;
  export: null | Export;
};

export function module(input: ParserInput): ParserOutput<Module> {
  return map(
    cat([
      char("("),
      str("module"),
      whitespace,
      opt(cat([func, whitespace])),
      opt(cat([_export, whitespace])),
      char(")"),
    ]),
    ([, , , optFunc, optExport]) => ({
      func: optFunc.status === "some" ? optFunc.value[0] : null,
      export: optExport.status === "some" ? optExport.value[0] : null,
    }),
  )(input);
}
