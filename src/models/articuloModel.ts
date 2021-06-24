import { createPool } from 'mysql2/promise';

class ArticuloModel {
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
			multipleStatements: false
			*/
		});
	}

	async listar() {//Devuelve todas las filas de la tabla producto		
		const productos = await this.db.query('SELECT p.Id, p.CodigoProducto, p.Descripcion, pp.RazonSocial, p.StockActual, p.PrecioVenta FROM articulo_proveedor p INNER JOIN proveedor pp ON p.IdProveedor = pp.Id');
		//devuelve tabla mas propiedades. Solo debemos devolver tabla. Posicion 0 del array devuelto.
		return productos[0];
	}

	async listarProveedor() {//Devuelve todas las filas de la tabla producto		
		const productos = await this.db.query('SELECT Id As IdProveedor, RazonSocial FROM proveedor');
		//devuelve tabla mas propiedades. Solo debemos devolver tabla. Posicion 0 del array devuelto.
		return productos[0];
	}
	
	async buscarId(id: string) {
		const encontrado: any = await this.db.query('SELECT * FROM articulo_proveedor WHERE Id = ?', [id]);
		//Ojo la consulta devuelve una tabla de una fila. (Array de array) Hay que desempaquetar y obtener la unica fila al enviar
		if (encontrado.length > 1)
			return encontrado[0][0];
		return null;
	}

	async buscarProveedor(razonSocial: string) {		
		const encontrado: any = await this.db.query('SELECT Id FROM proveedor WHERE RazonSocial = ?', [razonSocial]);
		//Ojo la consulta devuelve una tabla de una fila. (Array de array) Hay que desempaquetar y obtener la unica fila al enviar
				
		if (encontrado.length > 1)
			return encontrado[0][0];
		return null;
	}

	async buscarCodigoArticulo(codigoProducto: string) {
		const encontrado: any = await this.db.query('SELECT * FROM producto WHERE CodigoProducto = ?', [codigoProducto]);		
		
		if (encontrado.length > 1)
			return encontrado[0][0];
		return null;
	}

	//CRUD
	async crear(articulo: object) {
		const result = await this.db.query('INSERT INTO articulo_proveedor SET ?', [articulo]);		
		return result;
	}

	async actualizar(articulo: object, id: string) {
		const result = (await this.db.query('UPDATE articulo_proveedor SET ? WHERE Id = ?', [articulo, id]))[0].affectedRows;		
		return result;
	}
		
	async eliminar(id: string) {
		const product = (await this.db.query('DELETE FROM articulo_proveedor WHERE Id = ?', [id]))[0].affectedRows;		
		return product;
	}
	
}

const articuloModel: ArticuloModel = new ArticuloModel();
export default articuloModel;