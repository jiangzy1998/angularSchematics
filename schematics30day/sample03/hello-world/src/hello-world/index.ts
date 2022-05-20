import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';


// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function helloWorld(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    // 新建一个文件，文件名为用户输入对 --name 的参数，如果没有输入则使用默认的“hello”，文件的内容为 world；
    tree.create(_options.name || "hello", "world");
    return tree;
  };
}
