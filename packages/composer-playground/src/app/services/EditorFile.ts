class EditorFile {

    private id;
    private content;
    private type;

    constructor(id, content, type) {

        this.id = id;
        this.content = content;
        this.type = type;

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

    setId(id) {
        this.id = id;
        console.log('ID SET AS: ', id);
    }

    setContent(content) {
        this.content = content;
        console.log('CONTENT SET AS: ', content);
    }

    setType(type) {
        this.type = type;
        console.log('TYPE SET AS: ', type);
    }

}

module.exports = EditorFile;
