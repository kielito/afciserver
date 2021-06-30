import { createPool } from 'mysql2/promise';

class ComentarioModel {
	private db: any;
	constructor() {
		this.config();
	}

	async config() {
		this.db = await createPool({
			host: 'us-cdbr-east-03.cleardb.com',
			user: 'b0e0fd43ed8818',
			password: '2b1f9d39',
			database: 'heroku_4505cc56058eb11',			
			connectionLimit: 10,
			multipleStatements: false
			/*
			host: 'localhost',
			user: 'root',
			password: '',
			database: 'heroku_4505cc56058eb11',
			connectionLimit: 10,
			multipleStatements: false	*/		
		});
	}

	async listar() {
		const usuarios = await this.db.query('SELECT * FROM comentario');		
        //const productos = await this.db.query('SELECT p.CodigoProducto, p.Descripcion, pp.Id, pp.StockMinimo, pp.StockActual, p.PrecioVenta, pv.RazonSocial FROM producto p INNER JOIN producto_proveedor pp ON p.Id = pp.IdProducto INNER JOIN proveedor pv ON pp.IdProveedor = pv.Id');
		return usuarios[0];
	}
	
	async buscarId(id: string) {
		const encontrado: any = await this.db.query('SELECT * FROM comentario WHERE Id = ?', [id]);
		if (encontrado.length > 1)
			return encontrado[0][0];
		return null;
	}

	async crear(comentario: object) {		
		const result = await this.db.query('INSERT INTO comentario SET ?', [comentario]);		
		return result;		
	}
	
	async actualizar(comentario: object, id: string) {
		const result = (await this.db.query('UPDATE comentario SET ? WHERE Id = ?', [comentario, id]))[0].affectedRows;		
		return result;
	}	

    async eliminar(id: string) {
		const result = (await this.db.query('DELETE FROM comentario WHERE Id = ?', [id]))[0].affectedRows;		
		return result;
	}

    // Archivos
	async crearArchivo(archivo: object) {		
		const result = (await this.db.query('INSERT INTO archivo SET ?', [archivo]))[0].insertId;
		return result;		
	}

	async budcarArchivos() {		
		const result = await this.db.query('SELECT * FROM archivo');
		return result[0];		
	}

	async budcarArchivo(id: string) {		
		const result = (await this.db.query('SELECT * FROM archivo WHERE Id = ?', [id]));
		return result[0][0];;		
	}

	async eliminarArchivo(id: string) {
		const result = (await this.db.query('DELETE FROM archivo WHERE Id = ?', [id]))[0].affectedRows;		
		return result;
	}	
}

const comentarioModel: ComentarioModel = new ComentarioModel();
export default comentarioModel;