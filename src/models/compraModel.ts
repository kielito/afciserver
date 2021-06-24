import { createPool } from 'mysql2/promise';

class CompraModel {
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
		const compras = await this.db.query('SELECT * FROM pedidos');		
		return compras[0];
	}

	async listarPrecio(id: string) {
		const precio = await this.db.query('SELECT precio FROM variedades where id = ?', [id]);		
		if (precio.length > 1)
			return precio[0][0];
		return null;
	}
	
	async crearCompra(compra: object) {		
		const result = (await this.db.query('INSERT INTO pedidos SET ?', [compra]))[0].insertId;		
		return result;		
	}

	async crearCompraArticulo(compra: object) {		
		const result = (await this.db.query('INSERT INTO pedidos_articulos SET ?', [compra]))[0].affectArrow;
		
		return result;		
	}
	
}

const compraModel: CompraModel = new CompraModel();
export default compraModel;