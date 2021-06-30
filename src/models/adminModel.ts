import { createPool } from 'mysql2/promise';

class AdminModel {
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

	async listarpedidos() {
		const articulo = await this.db.query('SELECT * FROM pedidos');		
		return articulo[0];
	}

	async listarproductos() {
		const articulo = await this.db.query('SELECT * FROM variedades');		
		return articulo[0];
	}

	async buscarProducto(nombre: string) {
		const encontrado: any = await this.db.query('SELECT * FROM variedades WHERE nombre = ?', [nombre]);		
		if (encontrado.length > 1)
			return encontrado[0][0];
		return null;
	}

	//CRUD

	async crear(variedad: object) {		
		const result = (await this.db.query('INSERT INTO variedades SET ?', [variedad]))[0].affectedRows;		
		return result;	
	}

	async actualizar(variedad: object, id: string) {		
		const result = (await this.db.query('UPDATE variedades SET ? WHERE id = ?', [variedad, id]))[0].affectedRows;		
		return result;
	}

	
	async eliminar(id: string) {
		const result = (await this.db.query('DELETE FROM variedades WHERE id = ?', [id]))[0].affectedRows;		
		return result;
	}
	
}

const adminModel: AdminModel = new AdminModel();
export default adminModel;