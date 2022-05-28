import { strings } from '@angular-devkit/core';
import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import * as path from 'path';

const collectionPath = path.join(__dirname, '../collection.json');

describe('hello-world', () => {
  const expectResult = async (fileName:string) => {
    const runner = new SchematicTestRunner('schematics', collectionPath);
    const tree = await runner.runSchematicAsync('hello-world', { name:fileName }, Tree.empty()).toPromise();

    const dasherizeName = strings.dasherize(fileName);
    const fullFileName = `/hello-${dasherizeName}.component.ts`;
    expect(tree.files).toContain(fullFileName);

    const fileContent = tree.readContent(fullFileName);
    expect(fileContent).toMatch(/hello-jiangzy/);
    expect(fileContent).toMatch(/HelloJiangzyComponent/);
  }

  it('成功生成文档名为"/hello-jiangzy.component.ts"', ()=>{
    expectResult("jiangzy");
  })
 
});
