import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';


// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function helloWorld(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    return tree;
  };
}
/**
 * 1、helloWorld（）是原理图入口函数，是一个规则工厂（RuleFactory），返回一个创建规则（Rule）的高阶函数及其参数，是使用此原理图输入的配置
 * 2、Rule：定义一个函数，接受一个Tree进行转换，返回新的Tree
 * 3、Tree：虚拟文件系统，就是文件，包含已经存在的文件（base）和需要应用到文件的变更（staging）两部分。变化过程中，只是把需要修改的内容添加到了 staging ，并没有改变base。
 * 4、SchematicContext 原理图上下文，每个原理图都在自己的上下文中运行。
 */

