import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import { Schema as Workspaceoptions } from "@schematics/angular/workspace/schema";
import { Schema as ApplicationOptions, Style } from "@schematics/angular/application/schema";
import * as path from 'path';
import { strings } from '@angular-devkit/core';

const collectionPath = path.join(__dirname, '../collection.json');


describe("component", ()=>{

  // 选项 --name
  const name = 'apple';
  const runner = new SchematicTestRunner("schematics", collectionPath);

  // 模拟 ng new 创建angular项目，主要对 workspace 和 application 进行配置

  // angular 项目对配置
  const workspaceoptions:Workspaceoptions = {
    name:'wokspace',              // 不重要的名字,可以随意取，不影响测试结果
    newProjectRoot:"projects",    // 项目app的根目录，可以随意取，但是验证会用到
    version:"6.0.0",              // 版本号，随意，不影响
    
  };

  const appOptions:ApplicationOptions = {
    name:'component',
    inlineStyle:false,
    inlineTemplate:false,
    routing:false,
    style:Style.Css,
    skipTests:false,
    skipPackageJson:false
  }

  let appTree:UnitTestTree;

  beforeEach(async ()=>{
    appTree = await runner.runExternalSchematicAsync(
      "@schematics/angular",
      "workspace",
      workspaceoptions
    ).toPromise();

    appTree = await runner.runExternalSchematicAsync(
      "@schematics/angular",
      "application",
      appOptions,
      appTree
    ).toPromise();
  })

  it("works", async ()=>{
    const tree = await runner.runSchematicAsync("component", { name }, appTree).toPromise();

    const dasherizeName = strings.dasherize(name);


    const expectFiles = [
      `/projects/component/src/app/${dasherizeName}/${dasherizeName}.component.ts`,
      `/projects/component/src/app/${dasherizeName}/${dasherizeName}.component.html`,
      `/projects/component/src/app/${dasherizeName}/${dasherizeName}.component.scss`,
      `/projects/component/src/app/${dasherizeName}/${dasherizeName}.component.spec.ts`,
    ]

    for(const v of tree.files){
      for(let i = 0;i<expectFiles.length;i++){
        const e = expectFiles[i];
        if(v.toString() === e){
          expectFiles.splice(i, 1);
        }
      }
    }

    // 如果预期生成的文件都有生成，那么预期的应该是 0 = 0
    expect(0).toEqual(expectFiles.length);
  })
})
