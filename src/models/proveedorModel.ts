import { createPool } from 'mysql2/promise';

class ProveedorModel {
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

	async listar() {
		const proveedores = await this.db.query('SELECT * FROM proveedor');		
		return proveedores[0];
	}

	async buscarProveedor(id: string) {
		const encontrado: any = await this.db.query('SELECT * FROM proveedor WHERE Id = ?', [id]);		
		if (encontrado.length > 1)
			return encontrado[0][0];
		return null;
	}

	async buscarNumeroDocumento(numeroDocumento: string) {
		const encontrado: any = await this.db.query('SELECT * FROM proveedor WHERE NumeroDocumento = ?', [numeroDocumento]);		
		if (encontrado.length > 1)
			return encontrado[0][0];
		return null;
	}
	
	async crearProveedor(proveedor: object) {		
		const result = await this.db.query('INSERT INTO proveedor SET ?', [proveedor]);		
		return result;		
	}

	async actualizarProveedor(proveedor: object, id: string) {
		const result = (await this.db.query('UPDATE proveedor SET ? WHERE Id = ?', [proveedor, id]))[0].affectedRows;		
		return result;
	}	
	
	async eliminarProveedor(id: string) {
		const result = (await this.db.query('DELETE FROM proveedor WHERE Id = ?', [id]))[0].affectedRows;		
		return result;
	}
}

const proveedorModel: ProveedorModel = new ProveedorModel();
export default proveedorModel;