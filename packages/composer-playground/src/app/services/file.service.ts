import { Injectable } from '@angular/core';

import { ClientService } from '../services/client.service';

import { ModelFile, Script, AclFile, QueryFile } from 'composer-common';

@Injectable()
export class FileService {

    private files: any = [];

    private readMe: string;
    private modelFiles: ModelFile[];
    private scriptFiles: Script[];
    private aclFile: AclFile;
    private queryFile: QueryFile;

    constructor(private clientService: ClientService) {

    }

    // horrible hack for tests
    createModelFile(content, fileName) {
        return new ModelFile(this.getBusinessNetwork().getModelManager(), content, fileName);
    }

    // horrible hack for tests
    createAclFile(id, content) {
        return new AclFile(id, this.getBusinessNetwork().getModelManager(), content);
    }

    // horrible hack for tests
    createScriptFile(id, type, content) {
        return this.getBusinessNetwork().getScriptManager().createScript(id, type, content);
    }

    // horrible hack for tests
    createQueryFile(id, content) {
        return new QueryFile(id, this.getBusinessNetwork().getModelManager(), content);
    }

    updateFile(id: string, content: any, type: string): string {
        try {
            if (type === 'model') {
                let modelManager = this.getBusinessNetwork().getModelManager();
                let original: ModelFile = modelManager.getModelFile(id);
                let modelFile = this.createModelFile(content, original.getName());
                if (this.modelNamespaceCollides(modelFile.getNamespace(), id)) {
                    throw new Error(`The namespace collides with existing model namespace ${modelFile.getNamespace()}`);
                }
                if (id !== modelFile.getNamespace()) {
                    // Then we are changing namespace and must delete old reference
                    modelManager.addModelFile(modelFile);
                    modelManager.deleteModelFile(id);
                    this.namespaceChanged$.next(modelFile.getNamespace());
                } else {
                    modelManager.updateModelFile(modelFile);
                }
            } else if (type === 'script') {
                let script = this.createScriptFile(id, 'JS', content);
                this.getBusinessNetwork().getScriptManager().addScript(script);
            } else if (type === 'acl') {
                let aclFile = this.createAclFile(id, content);
                this.getBusinessNetwork().getAclManager().setAclFile(aclFile);
            } else if (type === 'query') {
                let query = this.createQueryFile(id, content);
                this.getBusinessNetwork().getQueryManager().setQueryFile(query);
            } else if (type === 'readme') {
                this.setBusinessNetworkReadme(content);
            }

            this.businessNetworkChanged$.next(true);
            return null;
        } catch (e) {
            this.businessNetworkChanged$.next(false);
            return e.toString();
        }
    }

}
