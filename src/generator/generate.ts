import { Module } from "../parser/wat/module.js";

const i32Type = 0x7f;

export function generate(ast: Module): Buffer {
  const binary: number[] = [];

  binary.push(0x00, 0x61, 0x73, 0x6d); // WASM_BINARY_MAGIC
  binary.push(0x01, 0x00, 0x00, 0x00); // WASM_BINARY_VERSION

  if (ast.func !== null) {
    // section "Type" (1)
    binary.push(0x01); // section code
    binary.push(0x00); // section size (guess)
    const indexToFixupSection = binary.length - 1; // FIXUP section size
    binary.push(0x01); // num type

    // func type 0
    binary.push(0x60); // func
    binary.push(ast.func.params.length); // num params

    for (const param of ast.func.params) {
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

    binary.push(ast.func.results.length); // num results

    for (const result of ast.func.results) {
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

    binary[indexToFixupSection] = binary.length - indexToFixupSection - 1;

    // section "Function" (3)
    binary.push(0x03); // section code
    binary.push(0x00); // section size (guess)
    const indexToFixupFunction = binary.length - 1;
    binary.push(0x01); // num functions
    binary.push(0x00); // function 0 signature index
    binary[indexToFixupFunction] = binary.length - indexToFixupFunction - 1;
  }

  if (ast.export !== null) {
    // section "Export" (7)
    binary.push(0x07); // section code
    binary.push(0x00); // section size (guess)
    const indexToFixup = binary.length - 1;
    binary.push(0x01); // num exports
    binary.push(ast.export.name.length); // string length

    // export name
    for (const char of [...ast.export.name]) {
      binary.push(char.charCodeAt(0));
    }

    binary.push(0x00); // export kind
    binary.push(0x00); // export func index
    binary[indexToFixup] = binary.length - indexToFixup - 1;
  }

  if (ast.func !== null) {
    // section "Code" (10)
    binary.push(0x0a); // section code
    binary.push(0x00); // section size (guess)
    const indexToFixupCode = binary.length - 1;
    binary.push(0x01); // num functions

    // function body 0
    binary.push(0x00); // func body size (guess)
    const indexToFixupFunctionBody = binary.length - 1;
    binary.push(Math.min(ast.func.locals.length, 1)); // local decl count

    if (ast.func.locals.length > 0) {
      binary.push(ast.func.locals.length); // local type count

      for (const local of ast.func.locals) {
        switch (local.type) {
          case "i32": {
            binary.push(i32Type);
          }
        }
        binary.push();
      }
    }

    for (const statement of ast.func.statements) {
      switch (statement.type) {
        case "local.get": {
          binary.push(0x20); // local.get

          if (statement.ref === "variable") {
            const index = [...ast.func.params, ...ast.func.locals].findIndex(
              (p) => p.name === statement.variable,
            );
            binary.push(index); // local index
          } else {
            binary.push(statement.index); // local index
          }
          break;
        }
        case "i32.add": {
          binary.push(0x6a); // i32.add
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
    binary[indexToFixupCode] = binary.length - indexToFixupCode - 1;
  }

  return Buffer.from(binary);
}
