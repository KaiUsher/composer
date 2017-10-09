/* tslint:disable:no-unused-variable */
/* tslint:disable:no-unused-expression */
/* tslint:disable:no-var-requires */
/* tslint:disable:max-classes-per-file */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Directive, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EditorFileComponent } from './editor-file.component';
import { ClientService } from '../../services/client.service';

import * as sinon from 'sinon';
import * as chai from 'chai';
import { FileService } from '../../services/file.service';

let should = chai.should();

@Directive({
    selector: 'codemirror'
})

class MockCodeMirrorDirective {
    @Input()
    public config;
}

@Directive({
    selector: 'perfect-scrollbar'
})

class MockPerfectScrollBarDirective {
}

@Directive({
    selector: '[debounce]'
})

class MockDebounceDirective {
    @Input() delay;
}

describe('EditorFileComponent', () => {

    let component: EditorFileComponent;
    let fixture: ComponentFixture<EditorFileComponent>;
    let mockClientService = sinon.createStubInstance(ClientService);
    let mockFileService = sinon.createStubInstance(FileService);

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [EditorFileComponent, MockCodeMirrorDirective, MockPerfectScrollBarDirective, MockDebounceDirective],
            providers: [
                {provide: ClientService, useValue: mockClientService},
                {provide: FileService, useValue: mockFileService}]
        });
        fixture = TestBed.createComponent(EditorFileComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        component.should.be.ok;
    });

    it('should setup the mark down code config', () => {
        let mockCm = {
            foldCode: sinon.stub(),
            getCursor: sinon.stub().returns('myCursor')
        };
        component['mdCodeConfig'].extraKeys['Ctrl-Q'](mockCm);
        mockCm.getCursor.should.have.been.called;
        mockCm.foldCode.should.have.been.calledWith('myCursor');
    });

    it('should setup the code config', () => {
        let mockCm = {
            foldCode: sinon.stub(),
            getCursor: sinon.stub().returns('myCursor')
        };
        component['codeConfig'].extraKeys['Ctrl-Q'](mockCm);
        mockCm.getCursor.should.have.been.called;
        mockCm.foldCode.should.have.been.calledWith('myCursor');
    });

    it('should set _editorFile', () => {
        let loadFileStub = sinon.stub(component, 'loadFile');
        component.editorFile = 'myFile';
        loadFileStub.should.have.been.called;
        component['_editorFile'].should.equal('myFile');
    });

    it('should not set _editorFile', () => {
        let loadFileStub = sinon.stub(component, 'loadFile');
        component.editorFile = null;
        loadFileStub.should.not.have.been.called;
        should.not.exist(component['_editorFile']);
    });

    describe('set previewReadmeActive', () => {

        it('should set the preview boolean to true', () => {
            component['_previewReadmeActive'] = false;
            component.previewReadmeActive = true;
            component['_previewReadmeActive'].should.be.true;
        });

        it('should set the preview boolean to false', () => {
            component['_previewReadmeActive'] = true;
            component.previewReadmeActive = false;
            component['_previewReadmeActive'].should.be.false;
        });
    });

    describe('loadFile', () => {

        beforeEach(() => {
            component['_editorFile'] = {
                id: 'myId',
                isModel: sinon.stub().returns(false),
                isScript: sinon.stub().returns(false),
                isAcl: sinon.stub().returns(false),
                isQuery: sinon.stub().returns(false),
                isPackage: sinon.stub().returns(false),
                isReadMe: sinon.stub().returns(false)
            };
        });

        it('should load a model file', () => {
            component['_editorFile'].isModel.returns(true);
            mockFileService.getFile.returns({
                getContent: sinon.stub().returns('my model')
            });
            mockFileService.validateFile.returns(null);
            component.loadFile();
            component['editorContent'].should.equal('my model');
            component['editorType'].should.equal('code');
            should.not.exist(component['currentError']);
        });

        it('should load a model file but not find it', () => {
            component['_editorFile'].isModel.returns(true);
            mockFileService.getFile.returns(null);
            component.loadFile();
            should.not.exist(component['editorContent']);
        });

        it('should load a script file', () => {
            component['_editorFile'].isScript.returns(true);
            mockFileService.getFile.returns({
                getContent: sinon.stub().returns('my script')
            });
            mockFileService.validateFile.returns(null);
            component.loadFile();
            component['editorContent'].should.equal('my script');
            component['editorType'].should.equal('code');
            should.not.exist(component['currentError']);
        });

        it('should load a script file but not find it', () => {
            component['_editorFile'].isScript.returns(true);
            mockFileService.getFile.returns(null);
            mockFileService.validateFile.returns(null);
            component.loadFile();
            should.not.exist(component['editorContent']);
        });

        it('should load a acl file', () => {
            component['_editorFile'].isAcl.returns(true);
            mockFileService.getFile.returns({
                getContent: sinon.stub().returns('my acl')
            });
            mockFileService.validateFile.returns(null);
            component.loadFile();
            component['editorContent'].should.equal('my acl');
            component['editorType'].should.equal('code');
            should.not.exist(component['currentError']);
        });

        it('should load acl file but not find it', () => {
            component['_editorFile'].isAcl.returns(true);
            mockFileService.getFile.returns(null);
            component.loadFile();
            should.not.exist(component['editorContent']);
        });

        it('should load a package file', () => {
            component['_editorFile'].isPackage.returns(true);
            mockClientService.getMetaData.returns({getPackageJson: sinon.stub().returns(`{\n  "name": "my network"\n}`)});
            component.loadFile();
            component['editorContent'].should.deep.equal('"{\\n  \\"name\\": \\"my network\\"\\n}"');
            component['editorType'].should.equal('code');
            should.not.exist(component['currentError']);
        });

        it('should load a readme file', () => {
            component['_editorFile'].isReadMe.returns(true);
            mockFileService.getFile.returns({
                getContent: sinon.stub().returns(`readme`)
            });
            component['_previewReadmeActive'] = false;
            component.loadFile();
            component['editorContent'].should.deep.equal(`readme`);
            component['previewContent'].should.deep.equal(`<p>readme</p>\n`);
            component['editorType'].should.equal('readme');
        });

        it('should load readme file but not find it', () => {
            component['_editorFile'].isReadMe.returns(true);
            mockFileService.getFile.returns(null);
            component['_previewReadmeActive'] = false;
            component.loadFile();
            should.not.exist(component['editorContent']);
        });

        it('should load a query file', () => {
            component['_editorFile'].isQuery.returns(true);
            mockFileService.getFile.returns({
                getContent: sinon.stub().returns('my query')
            });
            mockFileService.validateFile.returns(null);
            component.loadFile();
            component['editorContent'].should.equal('my query');
            component['editorType'].should.equal('code');
            should.not.exist(component['currentError']);
        });

        it('should load a query file but not find it', () => {
            component['_editorFile'].isQuery.returns(true);
            mockFileService.getFile.returns(null);
            component.loadFile();
            should.not.exist(component['editorContent']);
        });

        it('should load no files', () => {
            component.loadFile();
            should.not.exist(component['editorContent']);
        });
    });

    describe('setCurrentCode', () => {

        beforeEach(() => {
            component['_editorFile'] = {
                id: 'myId',
                isModel: sinon.stub().returns(false),
                isScript: sinon.stub().returns(false),
                isAcl: sinon.stub().returns(false),
                isQuery: sinon.stub().returns(false),
                isPackage: sinon.stub().returns(false),
                isReadMe: sinon.stub().returns(false)
            };
            mockClientService.businessNetworkChanged$ = {
                next: sinon.stub()
            };
        });

        it('should set model file', () => {
            component['_editorFile'].isModel.returns(true);
            component['editorContent'] = 'my model';
            component.setCurrentCode();
            mockFileService.updateFile.should.have.been.calledWith('myId', 'my model', 'model');
            should.not.exist(component['currentError']);
        });

        it('should set script file', () => {
            component['_editorFile'].isScript.returns(true);
            component['editorContent'] = 'my script';
            component.setCurrentCode();
            mockFileService.updateFile.should.have.been.calledWith('myId', 'my script', 'script');
            should.not.exist(component['currentError']);
        });

        it('should set acl file', () => {
            component['_editorFile'].isAcl.returns(true);
            component['editorContent'] = 'my acl';
            component.setCurrentCode();
            mockFileService.updateFile.should.have.been.calledWith('myId', 'my acl', 'acl');
            should.not.exist(component['currentError']);
        });

        it('should set query file', () => {
            component['_editorFile'].isQuery.returns(true);
            component['editorContent'] = 'my query';
            component.setCurrentCode();
            mockFileService.updateFile.should.have.been.calledWith('myId', 'my query', 'query');
            should.not.exist(component['currentError']);
        });

        it('should set package file', () => {
            component['_editorFile'].isPackage.returns(true);
            component['editorContent'] = '{"name": "my network"}';
            mockClientService.businessNetworkChanged$ = {
                next: sinon.stub()
            };
            component.setCurrentCode();
            mockClientService.setBusinessNetworkPackageJson.should.have.been.calledWith({name: 'my network'});
            mockClientService.businessNetworkChanged$.next.should.have.been.calledWith(true);
            should.not.exist(component['currentError']);
        });

        it('should set the readme file', () => {
            component['_editorFile'].isReadMe.returns(true);
            component['editorContent'] = 'my readme';
            component.setCurrentCode();
            mockFileService.updateFile.should.have.been.calledWith('myId', 'my readme', 'readme');
        });

        it('should compile the readme file', () => {
            component['_editorFile'].isReadMe.returns(true);
            component['_previewReadmeActive'] = true;
            component['editorContent'] = 'my readme';
            component.setCurrentCode();
            component['previewContent'].should.equal(`<p>my readme</p>\n`);
        });

        it('should throw error if unknown file type', (() => {
            component.setCurrentCode();
            component['currentError'].should.equal('Error: unknown file type');
            mockClientService.businessNetworkChanged$.next.should.have.been.calledWith(false);
        }));

        it('should set current error on error', () => {
            mockFileService.updateFile.throws(new Error('some error'));
            component['_editorFile'].isAcl.returns(true);
            component['editorContent'] = 'my acl';
            component.setCurrentCode();
            mockFileService.updateFile.should.have.been.calledWith('myId', 'my acl', 'acl');
            component['currentError'].should.equal('Error: some error');
        });

        it('should set handle on error', () => {
            mockClientService.setBusinessNetworkPackageJson.reset();
            component['_editorFile'].isPackage.returns(true);
            component['editorContent'] = '{"name": "my network"';
            mockClientService.businessNetworkChanged$ = {
                next: sinon.stub()
            };
            component.setCurrentCode();
            mockClientService.setBusinessNetworkPackageJson.should.not.have.been.called;
            mockClientService.businessNetworkChanged$.next.should.have.been.calledWith(false);
            component['currentError'].should.equal('SyntaxError: Unexpected end of JSON input');
        });
    });

    describe('onCodeChanged', () => {
        let mockSetCurrentCode;

        beforeEach(() => {
            mockSetCurrentCode = sinon.stub(component, 'setCurrentCode');
            component['editorContent'] = 'my code';
        });

        it('should update the code', () => {
            component.onCodeChanged();
            mockSetCurrentCode.should.have.been.called;
            component['previousCode'].should.equal('my code');
        });

        it('should not update if changing file', () => {
            mockSetCurrentCode.reset();
            component['changingCurrentFile'] = true;
            component.onCodeChanged();
            mockSetCurrentCode.should.not.have.been.called;
        });

        it('should not update if code hasn\'t changed', () => {
            mockSetCurrentCode.reset();
            component['previousCode'] = 'my code';
            component.onCodeChanged();
            mockSetCurrentCode.should.not.have.been.called;
        });

        it('should compile the readme on preview', () => {
            mockSetCurrentCode.reset();
            component['_previewReadmeActive'] = true;
            component.onCodeChanged();
            mockSetCurrentCode.should.have.been.called;
        });
    });
});
