import { cat } from "../combinators/cat.js";
import { rep } from "../combinators/rep.js";
import { char } from "../primitives/char.js";
import { ParserInput } from "../types/ParseInput.js";
import { ParserOutput } from "../types/ParserOutput.js";
import { map } from "../utils/map.js";
import { str } from "../utils/str.js";
import { whitespace } from "../utils/whitespace.js";
import { Export, _export } from "./export.js";
import { Func, func } from "./func.js";

export type Module = {
  funcs: Func[];
  exports: Export[];
};

export function module(input: ParserInput): ParserOutput<Module> {
  return map(
    cat([
      char("("),
      whitespace,
      str("module"),
      whitespace,
      rep(cat([func, whitespace])),
      rep(cat([_export, whitespace])),
      char(")"),
    ]),
    ([, , , , funcWishWses, exportWithWses]) => ({
      funcs: funcWishWses.map(([x]) => x),
      exports: exportWithWses.map(([x]) => x),
    }),
  )(input);
}
