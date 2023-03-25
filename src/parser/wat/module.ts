import { cat } from "../combinators/cat.js";
import { char } from "../primitives/char.js";
import { ParserInput } from "../types/ParseInput.js";
import { ParserOutput } from "../types/ParserOutput.js";
import { map } from "../utils/map.js";
import { opt } from "../utils/opt.js";
import { str } from "../utils/str.js";
import { whitespace } from "../utils/whitespace.js";
import { Export, _export } from "./export.js";
import { Func, func } from "./func.js";

export type Module = {
  func: null | Func;
  export: null | Export;
};

export function module(input: ParserInput): ParserOutput<Module> {
  return map(
    cat([
      char("("),
      whitespace,
      str("module"),
      whitespace,
      opt(cat([func, whitespace])),
      opt(cat([_export, whitespace])),
      char(")"),
    ]),
    ([, , , , optFunc, optExport]) => ({
      func: optFunc.status === "some" ? optFunc.value[0] : null,
      export: optExport.status === "some" ? optExport.value[0] : null,
    }),
  )(input);
}
