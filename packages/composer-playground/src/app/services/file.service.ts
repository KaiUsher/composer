import { Injectable } from '@angular/core';

import { EditorFile } from '../services/EditorFile.ts';

import { ModelFile, Script, AclFile, QueryFile } from 'composer-common';

@Injectable()
export class FileService {

    private readMe: Map<string, EditorFile> = new Map<string, EditorFile>(); ;
    private modelFiles: Map<string, EditorFile> = new Map<string, EditorFile>();
    private scriptFiles: Map<string, EditorFile> = new Map<string, EditorFile>();
    private aclFile: Map<string, EditorFile> = new Map<string, EditorFile>();
    private queryFile: Map<string, EditorFile> = new Map<string, EditorFile>();

    constructor() {

    }

    // Handle the addition of a new file.
    addFile(id: string, content: string, type: string) {
        let file = new EditorFile(id, content, type);
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
                console.log('FILE ', file);
                if (this.scriptFiles.has(id)) {
                    throw new Error('FileService already contains script file with ID: ' + id);
                } else {
                    this.scriptFiles.set(id, file);
                }
                break;
            // Deal with the addition of a query file.
            case 'query':
                if (this.queryFile.has(id)) {
                    throw new Error('FileService already contains query file with ID: ' + id);
                } else {
                    this.queryFile.set(id, file);
                }
                break;
            // Deal with the addition of an acl file.
            case 'acl':
                if (this.aclFile.has(id)) {
                    throw new Error('FileService already contains acl file with ID: ' + id);
                } else {
                    this.aclFile.set(id, file);
                }
                break;
            // Deal with the addition of a readme file.
            case 'readme':
                if (this.readMe.has(id)) {
                    throw new Error('FileService already contains readme file with ID: ' + id);
                } else {
                    this.readMe.set(id, file);
                }
                break;
            // Default to a script file addition. TODO -- make this better?
            default:
                if (this.scriptFiles.has(id)) {
                    throw new Error('FileService already contains script file with ID: ' + id);
                } else {
                    this.scriptFiles.set(id, file);
                }
                break;
        }
    }

    // Handle the update of a file.
    updateFile(id: string, content: string, type: string) {
        let fileToUpdate;
        switch (type) {
            // Deal with the update of a model file.
            case 'model':
                fileToUpdate = this.modelFiles.get(id);
                fileToUpdate.setContent(content);
                break;
            // Deal with the update of a script file.
            case 'script':
                fileToUpdate = this.scriptFiles.get(id);
                console.log('UPDATING FILE: ', fileToUpdate);
                fileToUpdate.setContent(content);
                break;
            // Deal with the update of a query file.
            case 'query':
                fileToUpdate = this.queryFile.get(id);
                fileToUpdate.setContent(content);
                break;
            // Deal with the update of an acl file.
            case 'acl':
                fileToUpdate = this.aclFile.get(id);
                fileToUpdate.setContent(content);
                break;
            // Deal with the update of a readme file.
            case 'readme':
                fileToUpdate = this.readMe.get(id);
                fileToUpdate.setContent(content);
                break;
            // Default to updating a model file. TODO -- make this better?
            default:
                fileToUpdate = this.modelFiles.get(id);
                fileToUpdate.setContent(content);
                break;
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
                this.queryFile.delete(id);
                break;
            // Deal with the deletion of an acl file.
            case 'acl':
                this.aclFile.delete(id);
                break;
            // Deal with the deletion of a readme file.
            case 'readme':
                this.readMe.delete(id);
                break;
            // Default to breaking. TODO -- make this better?
            default:
                break;
        }
    }

    // Validate a file.
    validateFile(id: string, content: string, type: string) {
        let fileToValidate;
        switch (type) {
            // Deal with the validation of a model file.
            case 'model':
                fileToValidate = this.modelFiles.get(id);
                break;
            // Deal with the validation of a script file.
            case 'script':
                fileToValidate = this.scriptFiles.get(id);
                break;
            // Deal with the validation of a query file.
            case 'query':
                fileToValidate = this.queryFile.get(id);
                break;
            // Deal with the validation of an acl file.
            case 'acl':
                fileToValidate = this.aclFile.get(id);
                break;
            // Deal with the validation of a readme file.
            case 'readme':
                fileToValidate = this.readMe.get(id);
                break;
            // Default to validating NOTHING!! TODO -- make this better?
            default:
                break;
        }
    }
}
