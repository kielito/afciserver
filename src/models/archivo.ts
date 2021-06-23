var mysqlModel = require('mysql-model'); 

const schema = mysqlModel.extend({
    titulo: String,
    nombreOriginal: String,
    descripcion: String,
    archivoPath: String
});

interface IPhoto extends Document {
    titulo: string,
    nombreOriginal: string,
    descripcion: string,
    archivoPath: string
};
/*
export default mysqlModel.models<IPhoto>('Archivo', schema);*/