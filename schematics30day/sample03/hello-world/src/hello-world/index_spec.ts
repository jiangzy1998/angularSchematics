import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import * as path from 'path';

const collectionPath = path.join(__dirname, '../collection.json');

describe('hello-world', () => {
  
  const expectResult = async (fileName?:string) => {
    const fullFileName = `/${fileName || 'hello'}`;
    const params = fileName ? { name:fileName } : {};
    const runner = new SchematicTestRunner('schematics', collectionPath);
    const tree = await runner.runSchematicAsync('hello-world', params, Tree.empty()).toPromise();
    expect(tree.files).toContain(fullFileName);
    expect(tree.readContent(fullFileName)).toEqual("world");
  }

  it("使用者没有给文件名，应该使用默认文件名\'hello\'", ()=>{
    expectResult();
  })
  it("使用者有给文件名，应该使用使用者输入的文件名", ()=>{
    expectResult("jiangzy");
  })
});
