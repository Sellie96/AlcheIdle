"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldDirectiveCollection = void 0;
const metadata_list_by_name_collection_1 = require("./metadata-list-by-name.collection");
class FieldDirectiveCollection extends metadata_list_by_name_collection_1.MetadataListByNameCollection {
    constructor() {
        super(...arguments);
        this.sdls = new Set();
        this.fieldNames = new Set();
    }
    add(value) {
        var _a;
        if (this.sdls.has(value.sdl) && this.fieldNames.has(value.fieldName)) {
            return;
        }
        super.add(value, value.fieldName);
        this.sdls.add(value.sdl);
        this.fieldNames.add(value.fieldName);
        (_a = this.globalArray) === null || _a === void 0 ? void 0 : _a.push(value);
    }
}
exports.FieldDirectiveCollection = FieldDirectiveCollection;
