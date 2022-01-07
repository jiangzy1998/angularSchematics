import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import { Schema as Workspaceoptions } from "@schematics/angular/workspace/schema";
import * as path from 'path';

const collectionPath = path.join(__dirname, '../collection.json');


describe("component", ()=>{

  // 选项 --name
  const name = 'apple';
  const runner = new SchematicTestRunner("schematics", collectionPath);

  // 模拟 ng new 创建angular项目，主要对 workspace 和 application 进行配置

  // angular 项目对配置
  const workspaceoptions:Workspaceoptions = {
    name:'wokspace',
    newProjectRoot:"projects",
    version:"6.0.0",
  };
})

describe('angular-schematics-tutorial', () => {
  it('works', async () => {
    const runner = new SchematicTestRunner('schematics', collectionPath);
    const tree = await runner
      .runSchematicAsync('angular-schematics-tutorial', {}, Tree.empty())
      .toPromise();

    expect(tree.files).toEqual([]);
  });
});
