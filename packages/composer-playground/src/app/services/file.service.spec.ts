import { TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';

import * as sinon from 'sinon';
import * as chai from 'chai';

let should = chai.should();

import { EditorFile } from './editor-file';
import { FileService } from './file.service';
import { ModelFile, ModelManager, Script, AclFile, QueryFile } from 'composer-common';

describe('FileService', () => {

    let sandbox;
    let fileService: FileService;

    beforeEach(() => {

        fileService = new FileService();

        sandbox = sinon.sandbox.create();

        TestBed.configureTestingModule({
            providers: [FileService]
        });
    });

    describe('getFile', () => {

        it('should return model files when provided with the model file type', fakeAsync(inject([FileService], (service: FileService) => {
            let file = new EditorFile('1', '1', 'this is the model', 'model');
            let file2 = new EditorFile('2', '2', 'this is the 2 model', 'model');
            let testModels = new Map<string, EditorFile>();

            testModels.set('1', file);
            testModels.set('2', file2);

            fileService['modelFiles'] = testModels;

            let testFile = fileService.getFile('1', 'model');

            testFile.getId().should.equal('1');
            testFile.getContent().should.equal('this is the model');
            testFile.getType().should.equal('model');

        })));

        it('should return script files when provided with the script file type', fakeAsync(inject([FileService], (service: FileService) => {
            let file = new EditorFile('1', '1', 'this is the script', 'script');
            let file2 = new EditorFile('2', '2', 'this is the 2 script', 'script');
            let testScripts = new Map<string, EditorFile>();

            testScripts.set('1', file);
            testScripts.set('2', file2);

            fileService['scriptFiles'] = testScripts;

            let testFile = fileService.getFile('1', 'script');

            testFile.getId().should.equal('1');
            testFile.getContent().should.equal('this is the script');
            testFile.getType().should.equal('script');

        })));

        it('should return the query file when provided with the query file type', fakeAsync(inject([FileService], (service: FileService) => {
            let file = new EditorFile('1', '1', 'this is the query', 'query');

            fileService['queryFile'] = file;

            let testFile = fileService.getFile('1', 'query');

            testFile.getId().should.equal('1');
            testFile.getContent().should.equal('this is the query');
            testFile.getType().should.equal('query');

        })));

        it('should return the acl file when provided with the acl file type', fakeAsync(inject([FileService], (service: FileService) => {
            let file = new EditorFile('1', '1', 'this is the acl', 'acl');

            fileService['aclFile'] = file;

            let testFile = fileService.getFile('1', 'acl');

            testFile.getId().should.equal('1');
            testFile.getContent().should.equal('this is the acl');
            testFile.getType().should.equal('acl');

        })));

        it('should return the readme file when provided with the readme file type', fakeAsync(inject([FileService], (service: FileService) => {
            let file = new EditorFile('1', '1', 'this is the readme', 'readme');

            fileService['readMe'] = file;

            let testFile = fileService.getFile('1', 'readme');

            testFile.getId().should.equal('1');
            testFile.getContent().should.equal('this is the readme');
            testFile.getType().should.equal('readme');

        })));

        it('should return the packageJson file when provided with the package file type', fakeAsync(inject([FileService], (service: FileService) => {
            let file = new EditorFile('1', '1', 'this is the packageJson', 'package');

            fileService['packageJson'] = file;

            let testFile = fileService.getFile('1', 'package');

            testFile.getId().should.equal('1');
            testFile.getContent().should.equal('this is the packageJson');
            testFile.getType().should.equal('package');

        })));

        it('should throw an error if none of the above cases are matched', fakeAsync(inject([FileService], (service: FileService) => {
            let id = '1';
            let type = 'octopus';

            (() => {
                fileService.getFile(id, type);
            }).should.throw(/Type passed must be one of readme, acl, query, script, model or packageJson/);

        })));
    });

    describe('getReadMe', () => {
        it('should return the readme file', fakeAsync(inject([FileService], (service: FileService) => {
            let file = new EditorFile('1', '1', 'this is the readme', 'readme');

            fileService['readMe'] = file;

            let testReadMeFile = fileService.getReadMe();

            testReadMeFile.getId().should.equal('1');
            testReadMeFile.getContent().should.equal('this is the readme');
            testReadMeFile.getType().should.equal('readme');
        })));
    });

    describe('getModelFiles', () => {
        it('should return all of the model files', fakeAsync(inject([FileService], (service: FileService) => {
            let file = new EditorFile('1', '1', 'this is the model', 'model');
            let file2 = new EditorFile('2', '2', 'this is the model 2', 'model');
            let testModels = new Map<string, EditorFile>();

            testModels.set('1', file);
            testModels.set('2', file2);

            fileService['modelFiles'] = testModels;

            let testModelsArray = fileService.getModelFiles();

            testModelsArray[0].getId().should.equal('1');
            testModelsArray[0].getContent().should.equal('this is the model');
            testModelsArray[0].getType().should.equal('model');

            testModelsArray[1].getId().should.equal('2');
            testModelsArray[1].getContent().should.equal('this is the model 2');
            testModelsArray[1].getType().should.equal('model');
        })));
    });

    describe('getScriptFiles', () => {
        it('should return all of the script files', fakeAsync(inject([FileService], (service: FileService) => {
            let file = new EditorFile('1', '1', 'this is the script', 'script');
            let file2 = new EditorFile('2', '2', 'this is the script 2', 'script');
            let testScripts = new Map<string, EditorFile>();

            testScripts.set('1', file);
            testScripts.set('2', file2);

            fileService['scriptFiles'] = testScripts;

            let testScriptsArray = fileService.getScriptFiles();

            testScriptsArray[0].getId().should.equal('1');
            testScriptsArray[0].getContent().should.equal('this is the script');
            testScriptsArray[0].getType().should.equal('script');

            testScriptsArray[1].getId().should.equal('2');
            testScriptsArray[1].getContent().should.equal('this is the script 2');
            testScriptsArray[1].getType().should.equal('script');
        })));
    });

    describe('getAclFile', () => {
        it('should return the acl file', fakeAsync(inject([FileService], (service: FileService) => {
            let file = new EditorFile('1', '1', 'this is the acl', 'acl');

            fileService['aclFile'] = file;

            let testAclFile = fileService.getAclFile();

            testAclFile.getId().should.equal('1');
            testAclFile.getContent().should.equal('this is the acl');
            testAclFile.getType().should.equal('acl');
        })));
    });

    describe('getQueryFile', () => {
        it('should return the query file', fakeAsync(inject([FileService], (service: FileService) => {
            let file = new EditorFile('1', '1', 'this is the query', 'query');

            fileService['queryFile'] = file;

            let testQueryFile = fileService.getQueryFile();

            testQueryFile.getId().should.equal('1');
            testQueryFile.getContent().should.equal('this is the query');
            testQueryFile.getType().should.equal('query');
        })));
    });

    describe('getPackageFile', () => {
        it('should return the package file', fakeAsync(inject([FileService], (service: FileService) => {
            let file = new EditorFile('1', '1', 'this is the package', 'package');

            fileService['packageJson'] = file;

            let testPackageFile = fileService.getPackageFile();

            testPackageFile.getId().should.equal('1');
            testPackageFile.getContent().should.equal('this is the package');
            testPackageFile.getType().should.equal('package');
        })));
    });

    describe('getFiles', () => {

        it('should return an empty array if no files stored in the file service', fakeAsync(inject([FileService], (service: FileService) => {
            let testArray = fileService.getFiles();

        })));

        it('should return the readme if only readme stored in the file service', fakeAsync(inject([FileService], (service: FileService) => {
            let file = new EditorFile('1', '1', 'this is the readme', 'readme');

            fileService['readMe'] = file;

            let testArray = fileService.getFiles();

            testArray[0].getId().should.equal('1');
            testArray[0].getContent().should.equal('this is the readme');
            testArray[0].getType().should.equal('readme');
        })));

        it('should return readme + model files if they are only items stored in the file service', fakeAsync(inject([FileService], (service: FileService) => {
            let file = new EditorFile('1', '1', 'this is the readme', 'readme');
            let file2 = new EditorFile('1', '1', 'this is the model', 'model');

            let testModels = new Map<string, EditorFile>();
            testModels.set('1', file2);

            fileService['readMe'] = file;
            fileService['modelFiles'] = testModels;

            let testArray = fileService.getFiles();

            testArray[0].getId().should.equal('1');
            testArray[0].getContent().should.equal('this is the readme');
            testArray[0].getType().should.equal('readme');

            testArray[1].getId().should.equal('1');
            testArray[1].getContent().should.equal('this is the model');
            testArray[1].getType().should.equal('model');
        })));

        it('should return readme + model + script files if they are only items stored in the file service', fakeAsync(inject([FileService], (service: FileService) => {
            let file = new EditorFile('1', '1', 'this is the readme', 'readme');
            let file2 = new EditorFile('1', '1', 'this is the model', 'model');
            let file3 = new EditorFile('1', '1', 'this is the script', 'script');

            let testModels = new Map<string, EditorFile>();
            let testScripts = new Map<string, EditorFile>();

            testModels.set('1', file2);
            testScripts.set('1', file3);

            fileService['readMe'] = file;
            fileService['modelFiles'] = testModels;
            fileService['scriptFiles'] = testScripts;

            let testArray = fileService.getFiles();

            testArray[0].getId().should.equal('1');
            testArray[0].getContent().should.equal('this is the readme');
            testArray[0].getType().should.equal('readme');

            testArray[1].getId().should.equal('1');
            testArray[1].getContent().should.equal('this is the model');
            testArray[1].getType().should.equal('model');

            testArray[2].getId().should.equal('1');
            testArray[2].getContent().should.equal('this is the script');
            testArray[2].getType().should.equal('script');
        })));

        it('should return readme + model + script + acl files if they are only items stored in the file service', fakeAsync(inject([FileService], (service: FileService) => {
            let file = new EditorFile('1', '1', 'this is the readme', 'readme');
            let file2 = new EditorFile('1', '1', 'this is the model', 'model');
            let file3 = new EditorFile('1', '1', 'this is the script', 'script');
            let file4 = new EditorFile('1', '1', 'this is the acl', 'acl');

            let testModels = new Map<string, EditorFile>();
            let testScripts = new Map<string, EditorFile>();

            testModels.set('1', file2);
            testScripts.set('1', file3);

            fileService['readMe'] = file;
            fileService['modelFiles'] = testModels;
            fileService['scriptFiles'] = testScripts;
            fileService['aclFile'] = file4;

            let testArray = fileService.getFiles();

            testArray[0].getId().should.equal('1');
            testArray[0].getContent().should.equal('this is the readme');
            testArray[0].getType().should.equal('readme');

            testArray[1].getId().should.equal('1');
            testArray[1].getContent().should.equal('this is the model');
            testArray[1].getType().should.equal('model');

            testArray[2].getId().should.equal('1');
            testArray[2].getContent().should.equal('this is the script');
            testArray[2].getType().should.equal('script');

            testArray[3].getId().should.equal('1');
            testArray[3].getContent().should.equal('this is the acl');
            testArray[3].getType().should.equal('acl');
        })));

        it('should return readme + model + script + acl + query files if they are only items stored in the file service', fakeAsync(inject([FileService], (service: FileService) => {
            let file = new EditorFile('1', '1', 'this is the readme', 'readme');
            let file2 = new EditorFile('1', '1', 'this is the model', 'model');
            let file3 = new EditorFile('1', '1', 'this is the script', 'script');
            let file4 = new EditorFile('1', '1', 'this is the acl', 'acl');
            let file5 = new EditorFile('1', '1', 'this is the query', 'query');

            let testModels = new Map<string, EditorFile>();
            let testScripts = new Map<string, EditorFile>();

            testModels.set('1', file2);
            testScripts.set('1', file3);

            fileService['readMe'] = file;
            fileService['modelFiles'] = testModels;
            fileService['scriptFiles'] = testScripts;
            fileService['aclFile'] = file4;
            fileService['queryFile'] = file5;

            let testArray = fileService.getFiles();

            testArray[0].getId().should.equal('1');
            testArray[0].getContent().should.equal('this is the readme');
            testArray[0].getType().should.equal('readme');

            testArray[1].getId().should.equal('1');
            testArray[1].getContent().should.equal('this is the model');
            testArray[1].getType().should.equal('model');

            testArray[2].getId().should.equal('1');
            testArray[2].getContent().should.equal('this is the script');
            testArray[2].getType().should.equal('script');

            testArray[3].getId().should.equal('1');
            testArray[3].getContent().should.equal('this is the acl');
            testArray[3].getType().should.equal('acl');

            testArray[4].getId().should.equal('1');
            testArray[4].getContent().should.equal('this is the query');
            testArray[4].getType().should.equal('query');
        })));

        it('should return readme + model + script + acl + query + pacakage files if they are only items stored in the file service', fakeAsync(inject([FileService], (service: FileService) => {
            let file = new EditorFile('1', '1', 'this is the readme', 'readme');
            let file2 = new EditorFile('1', '1', 'this is the model', 'model');
            let file3 = new EditorFile('1', '1', 'this is the script', 'script');
            let file4 = new EditorFile('1', '1', 'this is the acl', 'acl');
            let file5 = new EditorFile('1', '1', 'this is the query', 'query');
            let file6 = new EditorFile('1', '1', 'this is the package', 'package');

            let testModels = new Map<string, EditorFile>();
            let testScripts = new Map<string, EditorFile>();

            testModels.set('1', file2);
            testScripts.set('1', file3);

            fileService['readMe'] = file;
            fileService['modelFiles'] = testModels;
            fileService['scriptFiles'] = testScripts;
            fileService['aclFile'] = file4;
            fileService['queryFile'] = file5;
            fileService['packageJson'] = file6;

            fileService['includePackageJson'] = true;
            let includePackageJson = true;

            let testArray = fileService.getFiles(includePackageJson);

            testArray[0].getId().should.equal('1');
            testArray[0].getContent().should.equal('this is the readme');
            testArray[0].getType().should.equal('readme');

            testArray[1].getId().should.equal('1');
            testArray[1].getContent().should.equal('this is the model');
            testArray[1].getType().should.equal('model');

            testArray[2].getId().should.equal('1');
            testArray[2].getContent().should.equal('this is the script');
            testArray[2].getType().should.equal('script');

            testArray[3].getId().should.equal('1');
            testArray[3].getContent().should.equal('this is the acl');
            testArray[3].getType().should.equal('acl');

            testArray[4].getId().should.equal('1');
            testArray[4].getContent().should.equal('this is the query');
            testArray[4].getType().should.equal('query');

            testArray[5].getId().should.equal('1');
            testArray[5].getContent().should.equal('this is the package');
            testArray[5].getType().should.equal('package');
        })));
    });

    describe('addFile', () => {
        it('should add a new model file if one with the same ID does not exist', fakeAsync(inject([FileService], (service: FileService) => {

            let id = '1';
            let displayID = '1';
            let content = 'this is the model';
            let type = 'model';

            fileService.addFile(id, displayID, content, type);

            let testModels = fileService.getModelFiles();

            testModels[0].getId().should.equal('1');
            testModels[0].getContent().should.equal('this is the model');
            testModels[0].getType().should.equal('model');
        })));

        it('should throw an error when trying to add a model file with existing ID', fakeAsync(inject([FileService], (service: FileService) => {
            let file = new EditorFile('1', '1', 'this is the model', 'model');
            let testModels = new Map<string, EditorFile>();

            testModels.set('1', file);

            fileService['modelFiles'] = testModels;

            let id = '1';
            let displayID = '1';
            let content = 'this is the model';
            let type = 'model';

            (() => {
                fileService.addFile(id, displayID, content, type);
            }).should.throw(/FileService already contains model file with ID: 1/);
        })));

        it('should add a new script file if one with the same ID does not exist', fakeAsync(inject([FileService], (service: FileService) => {
            let id = '1';
            let displayID = '1';
            let content = 'this is the script';
            let type = 'script';

            fileService.addFile(id, displayID, content, type);

            let testScripts = fileService.getScriptFiles();

            testScripts[0].getId().should.equal('1');
            testScripts[0].getContent().should.equal('this is the script');
            testScripts[0].getType().should.equal('script');
        })));

        it('should throw an error when trying to add a script file with existing ID', fakeAsync(inject([FileService], (service: FileService) => {
            let file = new EditorFile('1', '1', 'this is the script', 'script');
            let testScripts = new Map<string, EditorFile>();

            testScripts.set('1', file);

            fileService['scriptFiles'] = testScripts;

            let id = '1';
            let displayID = '1';
            let content = 'this is the script';
            let type = 'script';

            (() => {
                fileService.addFile(id, displayID, content, type);
            }).should.throw(/FileService already contains script file with ID: 1/);
        })));

        it('should add a new query file if one with the same ID does not exist', fakeAsync(inject([FileService], (service: FileService) => {
            let id = '1';
            let displayID = '1';
            let content = 'this is the query';
            let type = 'query';

            fileService.addFile(id, displayID, content, type);

            let testQuery = fileService.getQueryFile();

            testQuery.getId().should.equal('1');
            testQuery.getContent().should.equal('this is the query');
            testQuery.getType().should.equal('query');
        })));

        it('should throw an error when trying to add a query file with existing ID', fakeAsync(inject([FileService], (service: FileService) => {
            let file = new EditorFile('1', '1', 'this is the query', 'query');

            fileService['queryFile'] = file;

            let id = '1';
            let displayID = '1';
            let content = 'this is the query';
            let type = 'query';

            (() => {
                fileService.addFile(id, displayID, content, type);
            }).should.throw(/FileService already contains a query file/);
        })));

        it('should add a new acl file if one with the same ID does not exist', fakeAsync(inject([FileService], (service: FileService) => {
            let id = '1';
            let displayID = '1';
            let content = 'this is the acl';
            let type = 'acl';

            fileService.addFile(id, displayID, content, type);

            let testAcl = fileService.getAclFile();

            testAcl.getId().should.equal('1');
            testAcl.getContent().should.equal('this is the acl');
            testAcl.getType().should.equal('acl');
        })));

        it('should throw an error when trying to add an acl file with existing ID', fakeAsync(inject([FileService], (service: FileService) => {
            let file = new EditorFile('1', '1', 'this is the acl', 'acl');

            fileService['aclFile'] = file;

            let id = '1';
            let displayID = '1';
            let content = 'this is the acl';
            let type = 'acl';

            (() => {
                fileService.addFile(id, displayID, content, type);
            }).should.throw(/FileService already contains an acl file/);
        })));

        it('should add a new readme if one with the same ID does not exist', fakeAsync(inject([FileService], (service: FileService) => {
            let id = '1';
            let displayID = '1';
            let content = 'this is the readme';
            let type = 'readme';

            fileService.addFile(id, displayID, content, type);

            let testReadMe = fileService.getReadMe();

            testReadMe.getId().should.equal('1');
            testReadMe.getContent().should.equal('this is the readme');
            testReadMe.getType().should.equal('readme');
        })));

        it('should throw an error when trying to add a readme file with existing ID', fakeAsync(inject([FileService], (service: FileService) => {
            let file = new EditorFile('1', '1', 'this is the readme', 'readme');

            fileService['readMe'] = file;

            let id = '1';
            let displayID = '1';
            let content = 'this is the readme';
            let type = 'readme';

            (() => {
                fileService.addFile(id, displayID, content, type);
            }).should.throw(/FileService already contains a readme file/);
        })));

        it('should add a new package if one with the same ID does not exist', fakeAsync(inject([FileService], (service: FileService) => {
            let id = '1';
            let displayID = '1';
            let content = 'this is the package';
            let type = 'package';

            fileService.addFile(id, displayID, content, type);

            let testPackage = fileService.getPackageFile();

            testPackage.getId().should.equal('1');
            testPackage.getContent().should.equal('this is the package');
            testPackage.getType().should.equal('package');
        })));

        it('should throw an error when trying to add a package file with existing ID', fakeAsync(inject([FileService], (service: FileService) => {
            let file = new EditorFile('1', '1', 'this is the package', 'package');

            fileService['packageJson'] = file;

            let id = '1';
            let displayID = '1';
            let content = 'this is the package';
            let type = 'package';

            (() => {
                fileService.addFile(id, displayID, content, type);
            }).should.throw(/FileService already contains a package.json file/);
        })));

        it('should default to throwing an error', fakeAsync(inject([FileService], (service: FileService) => {
            let id = '1';
            let displayID = '1';
            let content = 'this is the octopus';
            let type = 'octopus';

            (() => {
                fileService.addFile(id, displayID, content, type);
            }).should.throw(/Attempted addition of unknown file type: octopus/);
        })));
    });

    describe('updateFile', () => {
        it('should update the correct model file', fakeAsync(inject([FileService], (service: FileService) => {
            let file = new EditorFile('1', '1', 'this is the model', 'model');
            let testModels = new Map<string, EditorFile>();

            let id = '1';
            let content = 'this is the NEW model';
            let type = 'model';

            testModels.set('1', file);

            fileService['modelFiles'] = testModels;

            fileService.updateFile(id, content, type);

            let testFile = fileService.getFile('1', 'model');

            testFile.getId().should.equal('1');
            testFile.getContent().should.equal('this is the NEW model');
            testFile.getType().should.equal('model');
        })));

        it('should throw an error if there is no model file with the given ID', fakeAsync(inject([FileService], (service: FileService) => {
            let id = '1';
            let content = 'this is the NEW model';
            let type = 'model';

            (() => {
                fileService.updateFile(id, content, type);
            }).should.throw(/File does not exist of type model and id 1/);
        })));

        it('should update the correct script file', fakeAsync(inject([FileService], (service: FileService) => {
            let file = new EditorFile('1', '1', 'this is the script', 'script');
            let testScripts = new Map<string, EditorFile>();

            let id = '1';
            let content = 'this is the NEW script';
            let type = 'script';

            testScripts.set('1', file);

            fileService['scriptFiles'] = testScripts;

            fileService.updateFile(id, content, type);

            let testFile = fileService.getFile('1', 'script');

            testFile.getId().should.equal('1');
            testFile.getContent().should.equal('this is the NEW script');
            testFile.getType().should.equal('script');
        })));

        it('should throw an error if there is no script file with the given ID', fakeAsync(inject([FileService], (service: FileService) => {
            let id = '1';
            let content = 'this is the NEW script';
            let type = 'script';

            (() => {
                fileService.updateFile(id, content, type);
            }).should.throw(/File does not exist of type script and id 1/);
        })));

        it('should update the correct query file', fakeAsync(inject([FileService], (service: FileService) => {
            let file = new EditorFile('1', '1', 'this is the query', 'query');

            let id = '1';
            let content = 'this is the NEW query';
            let type = 'query';

            fileService['queryFile'] = file;

            fileService.updateFile(id, content, type);

            let testFile = fileService.getFile('1', 'query');

            testFile.getId().should.equal('1');
            testFile.getContent().should.equal('this is the NEW query');
            testFile.getType().should.equal('query');
        })));

        it('should throw an error if there is no query file with the given ID', fakeAsync(inject([FileService], (service: FileService) => {
            let id = '1';
            let content = 'this is the NEW query';
            let type = 'query';

            (() => {
                fileService.updateFile(id, content, type);
            }).should.throw(/Query file does not exist in file service/);
        })));

        it('should update the correct acl file', fakeAsync(inject([FileService], (service: FileService) => {
            let file = new EditorFile('1', '1', 'this is the acl', 'acl');

            let id = '1';
            let content = 'this is the NEW acl';
            let type = 'acl';

            fileService['aclFile'] = file;

            fileService.updateFile(id, content, type);

            let testFile = fileService.getFile('1', 'acl');

            testFile.getId().should.equal('1');
            testFile.getContent().should.equal('this is the NEW acl');
            testFile.getType().should.equal('acl');
        })));

        it('should throw an error if there is no acl file with the given ID', fakeAsync(inject([FileService], (service: FileService) => {
            let id = '1';
            let content = 'this is the NEW acl';
            let type = 'acl';

            (() => {
                fileService.updateFile(id, content, type);
            }).should.throw(/Acl file does not exist in file service/);
        })));

        it('should update the correct readme file', fakeAsync(inject([FileService], (service: FileService) => {
            let file = new EditorFile('1', '1', 'this is the readme', 'readme');

            let id = '1';
            let content = 'this is the NEW readme';
            let type = 'readme';

            fileService['readMe'] = file;

            fileService.updateFile(id, content, type);

            let testFile = fileService.getFile('1', 'readme');

            testFile.getId().should.equal('1');
            testFile.getContent().should.equal('this is the NEW readme');
            testFile.getType().should.equal('readme');
        })));

        it('should throw an error if there is no readme file with the given ID', fakeAsync(inject([FileService], (service: FileService) => {
            let id = '1';
            let content = 'this is the NEW readme';
            let type = 'readme';

            (() => {
                fileService.updateFile(id, content, type);
            }).should.throw(/ReadMe file does not exist in file service/);
        })));

        it('should update the correct packageJson file', fakeAsync(inject([FileService], (service: FileService) => {
            let file = new EditorFile('1', '1', 'this is the packageJson', 'package');

            let id = '1';
            let content = 'this is the NEW packageJson';
            let type = 'package';

            fileService['packageJson'] = file;

            fileService.updateFile(id, content, type);

            let testFile = fileService.getFile('1', 'package');

            testFile.getId().should.equal('1');
            testFile.getContent().should.equal('this is the NEW packageJson');
            testFile.getType().should.equal('package');
        })));

        it('should throw an error if there is no packageJson file with the given ID', fakeAsync(inject([FileService], (service: FileService) => {
            let id = '1';
            let content = 'this is the NEW packageJson';
            let type = 'package';

            (() => {
                fileService.updateFile(id, content, type);
            }).should.throw(/PackageJson file does not exist in file service/);
        })));

        it('should default to throwing an error', fakeAsync(inject([FileService], (service: FileService) => {
            let id = '1';
            let content = 'this is the octopus';
            let type = 'octopus';

            (() => {
                fileService.updateFile(id, content, type);
            }).should.throw(/Attempted update of unknown file type: octopus/);

        })));
    });

    describe('deleteFile', () => {
        it('should delete the correct model file', fakeAsync(inject([FileService], (service: FileService) => {
            let file = new EditorFile('1', '1', 'this is the model', 'model');
            let testModels = new Map<string, EditorFile>();

            testModels.set('1', file);

            fileService['modelFiles'] = testModels;

            let id = '1';
            let type = 'model';

            fileService.deleteFile(id, type);

            should.not.exist(testModels.get('1'));
        })));

        it('should delete the correct script file', fakeAsync(inject([FileService], (service: FileService) => {
            let file = new EditorFile('1', '1', 'this is the script', 'script');
            let testScripts = new Map<string, EditorFile>();

            testScripts.set('1', file);

            fileService['scriptFiles'] = testScripts;

            let id = '1';
            let type = 'script';

            fileService.deleteFile(id, type);

            should.not.exist(testScripts.get('1'));
        })));

        it('should delete the correct query file', fakeAsync(inject([FileService], (service: FileService) => {
            let file = new EditorFile('1', '1', 'this is the query', 'query');

            let id = '1';
            let type = 'query';

            fileService['queryFile'] = file;

            fileService.deleteFile(id, type);

            let testQuery = fileService.getQueryFile();
            should.not.exist(testQuery);
        })));

        it('should delete the correct acl file', fakeAsync(inject([FileService], (service: FileService) => {
            let file = new EditorFile('1', '1', 'this is the acl', 'acl');

            let id = '1';
            let type = 'acl';

            fileService['aclFile'] = file;

            fileService.deleteFile(id, type);

            let testAcl = fileService.getAclFile();
            should.not.exist(testAcl);
        })));

        it('should delete the correct readme file', fakeAsync(inject([FileService], (service: FileService) => {
            let file = new EditorFile('1', '1', 'this is the readme', 'readme');

            let id = '1';
            let type = 'readme';

            fileService['readMe'] = file;

            fileService.deleteFile(id, type);

            let testReadMe = fileService.getReadMe();
            should.not.exist(testReadMe);
        })));

        it('should delete the correct package file', fakeAsync(inject([FileService], (service: FileService) => {
            let file = new EditorFile('1', '1', 'this is the package', 'package');

            let id = '1';
            let type = 'package';

            fileService['packageJson'] = file;

            fileService.deleteFile(id, type);

            let testPackage = fileService.getPackageFile();
            should.not.exist(testPackage);
        })));

        it('should default to throwing an error', fakeAsync(inject([FileService], (service: FileService) => {
            let id = '1';
            let type = 'octopus';

            (() => {
                fileService.deleteFile(id, type);
            }).should.throw(/Attempted deletion of file unknown type: octopus/);

        })));
    });

    describe('deleteAllFiles', () => {
        it('should delete all files', fakeAsync(inject([FileService], (service: FileService) => {
            let file = new EditorFile('1', '1', 'this is the readme', 'readme');
            let file2 = new EditorFile('1', '1', 'this is the model', 'model');
            let file3 = new EditorFile('1', '1', 'this is the script', 'script');
            let file4 = new EditorFile('1', '1', 'this is the acl', 'acl');
            let file5 = new EditorFile('1', '1', 'this is the query', 'query');

            let testModels = new Map<string, EditorFile>();
            let testScripts = new Map<string, EditorFile>();

            testModels.set('1', file2);
            testScripts.set('1', file3);

            fileService['readMe'] = file;
            fileService['modelFiles'] = testModels;
            fileService['scriptFiles'] = testScripts;
            fileService['aclFile'] = file4;
            fileService['queryFile'] = file5;

            fileService.deleteAllFiles();

            let testReadMe = fileService.getReadMe();
            let testAcl = fileService.getAclFile();
            let testQuery = fileService.getQueryFile();

            should.not.exist(testReadMe);
            should.not.exist(testModels.get('1'));
            should.not.exist(testScripts.get('1'));
            should.not.exist(testAcl);
            should.not.exist(testQuery);

        })));
    });

    describe('replaceFile', () => {
        it('should throw an error if there in no model file with the given "file to replace" ID', fakeAsync(inject([FileService], (service: FileService) => {
            let oldId = '1';
            let newId = '2';
            let content = 'this is the replacement model file';
            let type = 'model';

            (() => {
                fileService.replaceFile(oldId, newId, content, type);
            }).should.throw(/There is no existing file of type model with the id 1/);
        })));

        it('should throw an error if there is an existing model file with the given replacement file ID', fakeAsync(inject([FileService], (service: FileService) => {
            let oldId = '2';
            let newId = '3';
            let content = 'this is the replacement model file';
            let type = 'model';

            let file = new EditorFile('2', '2', 'this is the model', 'model');
            let file2 = new EditorFile('3', '3', 'this is the other model', 'model');
            let testModels = new Map<string, EditorFile>();
            testModels.set('2', file);
            testModels.set('3', file2);

            fileService['modelFiles'] = testModels;

            (() => {
                fileService.replaceFile(oldId, newId, content, type);
            }).should.throw(/There is an existing file of type model with the id 2/);
        })));

        it('should throw an error if there in no script file with the given "file to replace" ID', fakeAsync(inject([FileService], (service: FileService) => {
            let oldId = '1';
            let newId = '2';
            let content = 'this is the replacement script file';
            let type = 'script';

            (() => {
                fileService.replaceFile(oldId, newId, content, type);
            }).should.throw(/There is no existing file of type script with the id 1/);
        })));

        it('should throw an error if there is an existing script file with the given replacement file ID', fakeAsync(inject([FileService], (service: FileService) => {
            let oldId = '2';
            let newId = '3';
            let content = 'this is the replacement script file';
            let type = 'script';

            let file = new EditorFile('2', '2', 'this is the script', 'script');
            let file2 = new EditorFile('3', '3', 'this is the other script', 'script');
            let testScripts = new Map<string, EditorFile>();
            testScripts.set('2', file);
            testScripts.set('3', file2);

            fileService['scriptFiles'] = testScripts;

            (() => {
                fileService.replaceFile(oldId, newId, content, type);
            }).should.throw(/There is an existing file of type script with the id 2/);
        })));

        it('should default to throw an error', fakeAsync(inject([FileService], (service: FileService) => {
            let oldId = '1';
            let newId = '2';
            let content = 'this is the replacement octopus';
            let type = 'octopus';

            (() => {
                fileService.replaceFile(oldId, newId, content, type);
            }).should.throw(/Attempted replace of ununsupported file type: octopus/);
        })));

        it('should correctly replace a model file', fakeAsync(inject([FileService], (service: FileService) => {
            let oldId = '1';
            let newId = '2';
            let content = 'this is the replacement model file';
            let type = 'model';

            let modelFileMock = sinon.createStubInstance(ModelFile);
            modelFileMock.getNamespace.returns('model-ns');
            modelFileMock.getName.returns('model-name');
            sinon.stub(fileService, 'createModelFile').returns(modelFileMock);

            let file = new EditorFile('1', '1', 'this is the model', 'model');
            let testModels = new Map<string, EditorFile>();
            testModels.set('1', file);

            fileService['modelFiles'] = testModels;

            let replacedFile = fileService.replaceFile(oldId, newId, content, type);
        })));

        it('should correctly replace a model file', fakeAsync(inject([FileService], (service: FileService) => {
            let oldId = '1';
            let newId = '2';
            let content = 'this is the replacement model file';
            let type = 'model';

            let modelFileMock = sinon.createStubInstance(ModelFile);
            modelFileMock.getNamespace.returns('model-ns');
            modelFileMock.getName.returns('model-name');
            let createmodelMock = sinon.stub(fileService, 'createModelFile');
            createmodelMock.onCall(0).throws();
            createmodelMock.onCall(1).returns(modelFileMock);

            let file = new EditorFile('1', '1', 'this is the model', 'model');
            let testModels = new Map<string, EditorFile>();
            testModels.set('1', file);

            fileService['modelFiles'] = testModels;

            let replacedFile = fileService.replaceFile(oldId, newId, content, type);
        })));

        it('should correctly replace a model file', fakeAsync(inject([FileService], (service: FileService) => {
            let oldId = '1';
            let newId = '2';
            let content = 'this is the replacement model file';
            let type = 'model';

            let modelFileMock = sinon.createStubInstance(ModelFile);
            modelFileMock.getNamespace.returns('model-ns');
            modelFileMock.getName.returns('model-name');
            let createmodelMock = sinon.stub(fileService, 'createModelFile');
            createmodelMock.onCall(0).throws();
            createmodelMock.onCall(1).throws();
            createmodelMock.onCall(2).returns(modelFileMock);

            let file = new EditorFile('1', '1', 'this is the model', 'model');
            let testModels = new Map<string, EditorFile>();
            testModels.set('1', file);

            fileService['modelFiles'] = testModels;

            (() => {
                fileService.replaceFile(oldId, newId, content, type);
            }).should.throw();
        })));

        it('should correctly replace a script file', fakeAsync(inject([FileService], (service: FileService) => {
            let oldId = '1';
            let newId = '2';
            let content = 'this is the replacement script file';
            let type = 'script';

            let file = new EditorFile('1', '1', 'this is the script', 'script');
            let testScripts = new Map<string, EditorFile>();
            testScripts.set('1', file);

            fileService['scriptFiles'] = testScripts;

            let replacedFile = fileService.replaceFile(oldId, newId, content, type);

            replacedFile.getId().should.equal('2');
            replacedFile.getContent().should.equal('this is the script');
            replacedFile.getType().should.equal('script');
        })));
    });

    describe('validateFile', () => {
        it('should validate a given model file', fakeAsync(inject([FileService], (service: FileService) => {
            let id = '1';
            let type = 'model';

            let testModels = new Map<string, EditorFile>();
            let testScripts = new Map<string, EditorFile>();

            let mockModelFile = sinon.createStubInstance(EditorFile);
            mockModelFile.validate.returns(null);

            // cases to throw if validation slips in to incorrect case.

            let mockScriptFile = sinon.createStubInstance(EditorFile);
            mockScriptFile.validate.throws('should not be called');

            let mockAclFile = sinon.createStubInstance(EditorFile);
            mockAclFile.validate.throws('should not be called');

            let mockQueryFile = sinon.createStubInstance(EditorFile);
            mockScriptFile.validate.throws('should not be called');

            testModels.set('1', mockModelFile);
            testScripts.set('1', mockScriptFile);

            fileService['modelFiles'] = testModels;
            fileService['scriptFiles'] = testScripts;
            fileService['aclFile'] = mockAclFile;
            fileService['queryFile'] = mockQueryFile;

            should.not.exist(fileService.validateFile(id, type, []));
        })));

        it('should validate a given script file', fakeAsync(inject([FileService], (service: FileService) => {
            let id = '1';
            let type = 'script';

            let testScripts = new Map<string, EditorFile>();
            let testModels = new Map<string, EditorFile>();

            let mockScriptFile = sinon.createStubInstance(EditorFile);
            mockScriptFile.validate.returns(null);

            // cases to throw if validation slips in to incorrect case.

            let mockModelFile = sinon.createStubInstance(EditorFile);
            mockModelFile.validate.throws('should not be called');
            console.log('MODEL');

            let mockAclFile = sinon.createStubInstance(EditorFile);
            mockAclFile.validate.throws('should not be called');
            console.log('ACL');

            let mockQueryFile = sinon.createStubInstance(EditorFile);
            mockQueryFile.validate.throws('should not be called');
            console.log('QUERY');

            testScripts.set('1', mockScriptFile);
            testModels.set('1', mockModelFile);

            fileService['modelFiles'] = testModels;
            fileService['scriptFiles'] = testScripts;
            fileService['aclFile'] = mockAclFile;
            fileService['queryFile'] = mockQueryFile;

            should.not.exist(fileService.validateFile(id, type, []));
        })));

        it('should validate a given acl file', fakeAsync(inject([FileService], (service: FileService) => {
            let id = '1';
            let type = 'acl';

            let testScripts = new Map<string, EditorFile>();
            let testModels = new Map<string, EditorFile>();

            let mockAclFile = sinon.createStubInstance(EditorFile);
            mockAclFile.validate.returns(null);

            // cases to throw if validation slips in to incorrect case.

            let mockScriptFile = sinon.createStubInstance(EditorFile);
            mockScriptFile.validate.throws('should not be called');

            let mockModelFile = sinon.createStubInstance(EditorFile);
            mockModelFile.validate.throws('should not be called');

            let mockQueryFile = sinon.createStubInstance(EditorFile);
            mockScriptFile.validate.throws('should not be called');

            testModels.set('1', mockModelFile);
            testScripts.set('1', mockScriptFile);

            fileService['modelFiles'] = testModels;
            fileService['scriptFiles'] = testScripts;
            fileService['aclFile'] = mockAclFile;
            fileService['queryFile'] = mockQueryFile;

            should.not.exist(fileService.validateFile(id, type, []));
        })));

        it('should validate a given query file', fakeAsync(inject([FileService], (service: FileService) => {
            let id = '1';
            let type = 'query';

            let testScripts = new Map<string, EditorFile>();
            let testModels = new Map<string, EditorFile>();

            let mockQueryFile = sinon.createStubInstance(EditorFile);
            mockQueryFile.validate.returns(null);

            // cases to throw if validation slips in to incorrect case.

            let mockScriptFile = sinon.createStubInstance(EditorFile);
            mockScriptFile.validate.throws('should not be called');

            let mockAclFile = sinon.createStubInstance(EditorFile);
            mockAclFile.validate.throws('should not be called');

            let mockModelFile = sinon.createStubInstance(EditorFile);
            mockModelFile.validate.throws('should not be called');

            testModels.set('1', mockModelFile);
            testScripts.set('1', mockScriptFile);

            fileService['modelFiles'] = testModels;
            fileService['scriptFiles'] = testScripts;
            fileService['aclFile'] = mockAclFile;
            fileService['queryFile'] = mockQueryFile;

            should.not.exist(fileService.validateFile(id, type, []));
        })));

        it('should throw an error when no match with provided file type', fakeAsync(inject([FileService], (service: FileService) => {
            let id = '1';
            let type = 'octopus';
            let comparisonModelFiles = [];

            let result = fileService.validateFile(id, type, comparisonModelFiles);
            result.toString().should.contain('Attempted validation of unknown file of type: octopus');
        })));
    });

});
