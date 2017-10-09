import { Injectable } from '@angular/core';
import { EditorFile } from './editor-file';
import { ModelFile, Script, AclFile, QueryFile, ModelManager } from 'composer-common';

@Injectable()
export class FileService {
    private readMe: EditorFile = null;
    private packageJson: EditorFile = null;
    private modelFiles: Map<string, EditorFile> = new Map<string, EditorFile>();
    private scriptFiles: Map<string, EditorFile> = new Map<string, EditorFile>();
    private aclFile: EditorFile = null;
    private queryFile: EditorFile = null;

    private modelManager = new ModelManager();

    // horrible hack for tests
    createModelFile(content, fileName) {
        return new ModelFile(this.modelManager, content, fileName);
    }

    getFile(id: string, type: string): EditorFile {
        let file: EditorFile;
        switch (type) {
          // Deal with the addition of a model file.
          case 'model':
              file = this.modelFiles.get(id);
              break;
          // Deal with the addition of a script file.
          case 'script':
              file = this.scriptFiles.get(id);
              break;
          // Deal with the addition of a query file.
          case 'query':
              file = this.queryFile;
              break;
          // Deal with the addition of an acl file.
          case 'acl':
              file = this.aclFile;
              break;
          // Deal with the addition of a readme file.
          case 'readme':
              file = this.readMe;
              break;
          case 'package':
              file = this.packageJson;
              break;
          default:
              throw new Error('Type passed must be one of readme, acl, query, script, model or packageJson');
        }
        return file;
    }

    getReadMe(): EditorFile {
        return this.readMe;
    }

    getModelFiles(): Array<EditorFile> {
        let files = [];
        this.modelFiles.forEach((editorFile: EditorFile, id: string) => {
            files.push(editorFile);
        });
        return files;
    }

    getScriptFiles(): Array<EditorFile> {
        let files = [];
        this.scriptFiles.forEach((editorFile: EditorFile, id: string) => {
            files.push(editorFile);
        });
        return files;
    }

    getAclFile(): EditorFile {
        return this.aclFile;
    }

    getQueryFile(): EditorFile {
        return this.queryFile;
    }

    getPackageFile(): EditorFile {
        return this.packageJson;
    }

    getFiles(includePackageJson = false): Array<EditorFile> {
        let files = [];
        if (this.getReadMe() !== null) {
            files.push(this.getReadMe());
        }
        files = files.concat(this.getModelFiles());
        files = files.concat(this.getScriptFiles());
        if (this.getAclFile() !== null) {
            files.push(this.getAclFile());
        }
        if (this.getQueryFile() !== null) {
            files.push(this.getQueryFile());
        }
        if (includePackageJson && this.getPackageFile() !== null) {
          files.push(this.getPackageFile());
        }
        return files;
    }

    // Handle the addition of a new file.
    addFile(id: string, displayID: string, content: string, type: string) {
        let file = new EditorFile(id, displayID, content, type);
        switch (type) {
            // Deal with the addition of a model file.
            case 'model':
                if (this.modelFiles.has(id)) {
                    throw new Error('FileService already contains model file with ID: ' + id);
                } else {
                    this.modelFiles.set(id, file);
                }
                break;
            // Deal with the addition of a script file.
            case 'script':
                if (this.scriptFiles.has(id)) {
                    throw new Error('FileService already contains script file with ID: ' + id);
                } else {
                    this.scriptFiles.set(id, file);
                }
                break;
            // Deal with the addition of a query file.
            case 'query':
                if (this.getQueryFile() !== null) {
                    throw new Error('FileService already contains a query file');
                } else {
                    this.queryFile = file;
                }
                break;
            // Deal with the addition of an acl file.
            case 'acl':
                if (this.getAclFile() !== null) {
                    throw new Error('FileService already contains an acl file');
                } else {
                    this.aclFile = file;
                }
                break;
            // Deal with the addition of a readme file.
            case 'readme':
                if (this.getReadMe() !== null) {
                    throw new Error('FileService already contains a readme file');
                } else {
                    this.readMe = file;
                }
                break;
            case 'package':
                if (this.getPackageFile() !== null) {
                    throw new Error('FileService already contains a package.json file');
                } else {
                    this.packageJson = file;
                }
                break;
            default:
                throw new Error('Attempted addition of unknown file type: ' + type);
        }
    }

    // Handle the update of a file.
    updateFile(id: string, content: string, type: string) {
        let fileToUpdate;
        switch (type) {
            // Deal with the update of a model file.
            case 'model':
                if (!this.modelFiles.has(id)) {
                  throw new Error('File does not exist of type ' + type + ' and id ' + id);
                }
                fileToUpdate = this.modelFiles.get(id);
                fileToUpdate.setContent(content);
                break;
            // Deal with the update of a script file.
            case 'script':
                if (!this.scriptFiles.has(id)) {
                  throw new Error('File does not exist of type ' + type + ' and id ' + id);
                }
                fileToUpdate = this.scriptFiles.get(id);
                fileToUpdate.setContent(content);
                break;
            // Deal with the update of a query file.
            case 'query':
                if (this.queryFile === null) {
                  throw new Error('Query file does not exist in file service');
                }
                this.queryFile.setContent(content);
                break;
            // Deal with the update of an acl file.
            case 'acl':
                if (this.aclFile === null) {
                  throw new Error('Acl file does not exist in file service');
                }
                this.aclFile.setContent(content);
                break;
            // Deal with the update of a readme file.
            case 'readme':
                if (this.readMe === null) {
                  throw new Error('ReadMe file does not exist in file service');
                }
                this.readMe.setContent(content);
                break;
            case 'package':
                if (this.packageJson === null) {
                  throw new Error('PackageJson file does not exist in file service');
                }
                this.packageJson.setContent(content);
                break;
            default:
                throw new Error('Attempted update of unknown file type: ' + type);
        }
    }

    // Handle the deletion of a file.
    deleteFile(id: string, type: string) {
        switch (type) {
            // Deal with the deletion of a model file.
            case 'model':
                this.modelFiles.delete(id);
                break;
            // Deal with the deletion of a script file.
            case 'script':
                this.scriptFiles.delete(id);
                break;
            // Deal with the deletion of a query file.
            case 'query':
                this.queryFile = null;
                break;
            // Deal with the deletion of an acl file.
            case 'acl':
                this.aclFile = null;
                break;
            // Deal with the deletion of a readme file.
            case 'readme':
                this.readMe = null;
                break;
            // Deal with the deletion of a package file.
            case 'package':
                this.packageJson = null;
                break;
            default:
                throw new Error('Attempted deletion of file unknown type: ' + type);
        }
    }

    deleteAllFiles() {
      this.modelFiles.clear();
      this.scriptFiles.clear();
      this.queryFile = null;
      this.aclFile = null;
      this.readMe = null;
    }

    replaceFile(oldId: string, newId: string, content: string, type: string): EditorFile {
        switch (type) {
            case 'model':
                if (!this.modelFiles.has(oldId)) {
                  throw new Error('There is no existing file of type ' + type + ' with the id ' + oldId);
                }
                if (this.modelFiles.has(newId)) {
                  throw new Error('There is an existing file of type ' + type + ' with the id ' + oldId);
                }
                let modelFile;
                try {
                  modelFile = this.createModelFile(this.getFile(oldId, 'model').getContent(), newId);
                  this.deleteFile(oldId, 'model');
                  this.addFile(modelFile.getNamespace(), modelFile.getName(), modelFile.getDefinitions(), 'model');
                  return this.getFile(modelFile.getNamespace(), 'model');
                } catch (err) {
                  try {
                    modelFile = this.createModelFile(content, newId); // current contents must be invalid so use old ones so we can have namespace
                    let actualContent = this.getFile(oldId, 'model').getContent();
                    this.deleteFile(oldId, 'model');
                    this.addFile(modelFile.getNamespace(), modelFile.getName(), actualContent, 'model');
                    return this.getFile(modelFile.getNamespace(), 'model');
                  } catch (err) {
                    throw new Error(err);
                  }
                }
            case 'script':
                if (!this.scriptFiles.has(oldId)) {
                  throw new Error('There is no existing file of type ' + type + ' with the id ' + oldId);
                }
                if (this.scriptFiles.has(newId)) {
                  throw new Error('There is an existing file of type ' + type + ' with the id ' + oldId);
                }
                this.addFile(newId, newId, this.getFile(oldId, 'script').getContent(), 'script');
                this.deleteFile(oldId, 'script');
                return this.getFile(newId, 'script');
            default:
                throw new Error('Attempted replace of ununsupported file type: ' + type);
        }
    }

    // Validate a file.
    validateFile(id: string, type: string, comparisonModelFiles: Array<ModelFile>): string {
        try {
            switch (type) {
                case 'model':
                      this.modelFiles.get(id).validate(comparisonModelFiles);
                      break;
                case 'script':
                      this.scriptFiles.get(id).validate(comparisonModelFiles);
                      break;
                case 'acl':
                      this.aclFile.validate(comparisonModelFiles);
                      break;
                case 'query':
                      this.queryFile.validate(comparisonModelFiles);
                      break;
                default:
                      throw new Error('Attempted validation of unknown file of type: ' + type);
            }
            return null;
        } catch (e) {
            return e;
        }
    }
}
