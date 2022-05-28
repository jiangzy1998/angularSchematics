import { strings } from '@angular-devkit/core'; // 引入 strings， 所有对字符串处理函数都在里面
import { apply, mergeWith, move, Rule, SchematicContext, SchematicsException, template, Tree, url } from '@angular-devkit/schematics';
import { parseName } from '@schematics/angular/utility/parse-name';
import { buildDefaultPath } from "@schematics/angular/utility/workspace";

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function helloWorld(_options: any): Rule {
  return (_tree: Tree, _context: SchematicContext) => {
    const workspaceConfigBuffer = _tree.read('angular.json');
    if(!workspaceConfigBuffer){
      throw new SchematicsException("Not an Angular CLI workspace");
    }

    const workspaceConfig = JSON.parse(workspaceConfigBuffer.toString());
    const projectName = _options.project || workspaceConfig.defaultProject;

    const project = workspaceConfig.projects[projectName];
    const defaultProjectPath = buildDefaultPath(project);
    const parsePath = parseName(defaultProjectPath, _options.name);
    const { name, path } = parsePath;

    const sourceTemplates = url('./files');
    const sourceParametrizedTemplates = apply(sourceTemplates, [
      template({
        ..._options, // 使用者所輸入的參數
        ...strings,  // 将这些函数添加到规则里，模版语法才能正确运作
        name
      }),
      move(path) // 将生产出来的档案移动到目录下
    ]);
    return mergeWith(sourceParametrizedTemplates);
  };
}