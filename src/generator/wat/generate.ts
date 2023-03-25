import { Expr } from "../../parser/twilight/expr.js";
import { Program } from "../../parser/twilight/program.js";

export function generate(program: Program): string {
  const exports: string[] = [];
  let wat = "(module\n";

  for (const func of program.funcs) {
    if (func.export) {
      exports.push(func.name);
    }

    const params = func.params.map(
      (param) => `(param $${param.name} ${param.type})`,
    );
    const result = `(result ${func.returnType})`;
    const locals = func.statements.flatMap((stat) => {
      if (stat.kind === "return") {
        return [];
      }

      return `(local $${stat.name} ${stat.type})`;
    });
    wat += `  (func $${func.name} ${[...params, result, ...locals].join(" ")}`;

    const calcExpr = (expr: Expr) => {
      if (expr.type === "add") {
        calcExpr(expr.lhs);
        calcExpr(expr.rhs);

        wat += "\n    i32.add";
        return;
      }

      if (expr.type === "sub") {
        calcExpr(expr.lhs);
        calcExpr(expr.rhs);

        wat += "\n    i32.sub";
        return;
      }

      wat += `\n    local.get $${expr.name}`;
    };

    for (const statement of func.statements) {
      switch (statement.kind) {
        case "declaration": {
          break;
        }
        case "return": {
          calcExpr(statement.expr);
          break;
        }
        default: {
          statement satisfies never;
        }
      }
    }
    wat += ")\n";
  }

  for (const _export of exports) {
    wat += `  (export "${_export}" (func $${_export}))\n`;
  }

  wat += ")\n";

  return wat;
}
