import { ModelManager, ModelFile, Script, AclFile, QueryFile, ModelUtil, Globalize, IllegalModelException } from 'composer-common';
export class EditorFile {
    private id;
    private displayID;
    private content;
    private type;

    constructor(id: string, displayID: string, content: string, type: string) {
        this.id = id;
        this.displayID = displayID;
        this.content = content;
        this.type = type;
    }

    isModel() {
      return this.type === 'model';
    }

    isScript() {
      return this.type === 'script';
    }

    isAcl() {
      return this.type === 'acl';
    }

    isQuery() {
      return this.type === 'query';
    }

    isReadMe() {
      return this.type === 'readme';
    }

    isPackage() {
      return this.type === 'package';
    }

    getId() {
        return this.id;
    }

    getContent() {
        return this.content;
    }

    getType() {
        return this.type;
    }

    getModelNamespace() {
        let modelManager = new ModelManager();
        let modelFile = new ModelFile(modelManager, this.content, null);
        return modelFile.getNamespace();
    }

    setId(id) {
        this.id = id;
    }

    setDisplayID(id) {
        this.displayID = id;
    }

    setContent(content) {
        this.content = content;
    }

    setType(type) {
        this.type = type;
    }

    validate(comparisonModelFiles: Array<ModelFile>) {
      switch (this.type) {
        case 'model':  this.validateModelFile(comparisonModelFiles);
                       break;
        case 'script': this.validateScriptFile(comparisonModelFiles);
                       break;
        case 'query':  this.validateQueryFile(comparisonModelFiles);
                       break;
        case 'acl':    this.validateAclFile(comparisonModelFiles);
                       break;
        default:       break;
      }
    }

    private validateModelFile(comparisonModelFiles: Array<ModelFile>) {
      let modelManager = new ModelManager();
      modelManager.addModelFiles(comparisonModelFiles, comparisonModelFiles.map((el) => el.getName()));
      let modelFile = new ModelFile(modelManager, this.content, null);
      modelFile.validate();
    }

    private validateScriptFile(comparisonModelFiles: Array<ModelFile>) {
      let mockModelManager = new ModelManager();
      mockModelManager.addModelFiles(comparisonModelFiles, comparisonModelFiles.map((el) => el.getName()));
      let mockscriptFile = new Script(mockModelManager, null, 'JS', this.content);
    }

    private validateAclFile(comparisonModelFiles: Array<ModelFile>) {
      let mockModelManager = new ModelManager();
      mockModelManager.addModelFiles(comparisonModelFiles, comparisonModelFiles.map((el) => el.getName()));
      let aclFile = new AclFile(null, mockModelManager, this.content);
      aclFile.validate();
    }

    private validateQueryFile(comparisonModelFiles: Array<ModelFile>) {
      let mockModelManager = new ModelManager();
      mockModelManager.addModelFiles(comparisonModelFiles, comparisonModelFiles.map((el) => el.getName()));
      let queryFile = new QueryFile(null, mockModelManager, this.content);
      queryFile.validate();
    }
}
