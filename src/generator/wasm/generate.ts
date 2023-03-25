import { Module } from "../../parser/wat/module.js";

const i32Type = 0x7f;

export function generate(ast: Module): Buffer {
  const binary: number[] = [];

  binary.push(0x00, 0x61, 0x73, 0x6d); // WASM_BINARY_MAGIC
  binary.push(0x01, 0x00, 0x00, 0x00); // WASM_BINARY_VERSION

  if (ast.funcs.length !== 0) {
    // section "Type" (1)
    binary.push(0x01); // section code
    binary.push(0x00); // section size (guess)
    const indexToFixupSection = binary.length - 1; // FIXUP section size
    binary.push(ast.funcs.length); // num type

    for (const func of ast.funcs) {
      binary.push(0x60); // func
      binary.push(func.params.length); // num params

      for (const param of func.params) {
        switch (param.type) {
          case "i32": {
            binary.push(i32Type);
            break;
          }
          default: {
            param.type satisfies never;
          }
        }
      }

      binary.push(func.results.length); // num results

      for (const result of func.results) {
        switch (result.type) {
          case "i32": {
            binary.push(i32Type);
            break;
          }
          default: {
            result.type satisfies never;
          }
        }
      }
    }

    binary[indexToFixupSection] = binary.length - indexToFixupSection - 1;

    // section "Function" (3)
    binary.push(0x03); // section code
    binary.push(0x00); // section size (guess)
    const indexToFixupFunction = binary.length - 1;
    binary.push(ast.funcs.length); // num functions

    for (let index = 0; index < ast.funcs.length; ++index) {
      binary.push(index); // function n signature index
    }

    binary[indexToFixupFunction] = binary.length - indexToFixupFunction - 1;
  }

  if (ast.exports.length !== 0) {
    // section "Export" (7)
    binary.push(0x07); // section code
    binary.push(0x00); // section size (guess)
    const indexToFixup = binary.length - 1;

    binary.push(ast.exports.length); // num exports

    for (const _export of ast.exports) {
      binary.push(_export.name.length); // string length

      // export name
      for (const char of [..._export.name]) {
        binary.push(char.charCodeAt(0));
      }

      binary.push(0x00); // export kind

      const index = ast.funcs.findIndex((f) => f.name === _export.target);
      binary.push(index); // export func index
    }

    binary[indexToFixup] = binary.length - indexToFixup - 1;
  }

  if (ast.funcs.length !== 0) {
    // section "Code" (10)
    binary.push(0x0a); // section code
    binary.push(0x00); // section size (guess)
    const indexToFixupCode = binary.length - 1;
    binary.push(ast.funcs.length); // num functions

    for (const func of ast.funcs) {
      // function body 0
      binary.push(0x00); // func body size (guess)
      const indexToFixupFunctionBody = binary.length - 1;
      binary.push(Math.min(func.locals.length, 1)); // local decl count

      if (func.locals.length > 0) {
        binary.push(func.locals.length); // local type count

        for (const local of func.locals) {
          switch (local.type) {
            case "i32": {
              binary.push(i32Type);
            }
          }
          binary.push();
        }
      }

      for (const statement of func.statements) {
        switch (statement.type) {
          case "local.get": {
            binary.push(0x20); // local.get

            if (statement.ref === "variable") {
              const index = [...func.params, ...func.locals].findIndex(
                (p) => p.name === statement.variable,
              );
              binary.push(index); // local index
            } else {
              binary.push(statement.index); // local index
            }
            break;
          }
          case "i32.const": {
            binary.push(0x41); // i32.const
            binary.push(statement.literal); // i32 literal
            break;
          }
          case "i32.add": {
            binary.push(0x6a); // i32.add
            break;
          }
          case "i32.sub": {
            binary.push(0x6b); // i32.add
            break;
          }
          default: {
            statement satisfies never;
          }
        }
      }

      binary.push(0x0b); // end
      binary[indexToFixupFunctionBody] =
        binary.length - indexToFixupFunctionBody - 1;
    }

    binary[indexToFixupCode] = binary.length - indexToFixupCode - 1;
  }

  return Buffer.from(binary);
}
