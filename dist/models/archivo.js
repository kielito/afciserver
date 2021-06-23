"use strict";
var mysqlModel = require('mysql-model');
const schema = mysqlModel.extend({
    titulo: String,
    nombreOriginal: String,
    descripcion: String,
    archivoPath: String
});
;
/*
export default mysqlModel.models<IPhoto>('Archivo', schema);*/ 
//# sourceMappingURL=archivo.js.map