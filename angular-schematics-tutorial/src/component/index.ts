import { apply, applyTemplates, mergeWith, move, Rule, SchematicContext, SchematicsException, Tree, url } from '@angular-devkit/schematics';
import { buildDefaultPath } from "@schematics/angular/utility/workspace";
import { parseName } from '@schematics/angular/utility/parse-name';
import { strings } from '@angular-devkit/core';


// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function genComponent(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    // 获取到在 angular cli 工作区下的 路径和要生成的组件 前缀name
    const { name, path } = getParsePath(tree, _options);
    // 读取模版文件
    const sourceTemplate = url("./files");
    // 应用模版文件
    const sourceParametrizedTemplates = apply(sourceTemplate, [
      applyTemplates({
        ..._options,
        ...strings,
        name
      }),
      move(path)
    ]);
    // 将传入的值（option）与模版文件合并（传入替代模版变量值）
    return mergeWith(sourceParametrizedTemplates)(tree, _context);
  };
}

function getParsePath(tree:Tree, options:any):any{
  // 读取 angular.json 文件并存为buffer
  const workspaceConfigBuffer = tree.read('angular.json');
  
  // 判断是不是在一个 angular-cli 工作区
  if(!workspaceConfigBuffer){
    throw new SchematicsException("不在angular cli工作区,请在angular项目中执行!");
  }
  // 读取并整理angular配置
  const workspaceConfig = JSON.parse(workspaceConfigBuffer.toString());
  console.log(workspaceConfig);
  // 有传入 project 属性或者是默认 project
  const projectName = options.project || workspaceConfig.defaultProject;
  console.log(projectName);
  // 获取project 定义
  const project = workspaceConfig.projects[projectName];
  console.log(project);
  // 获取默认project路径
  const defaultProjectPath = buildDefaultPath(project);
  // parseName()可以把
  const parsePath = parseName(defaultProjectPath, options.name);

  return parsePath;
}
