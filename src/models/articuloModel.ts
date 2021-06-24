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
		const productos = await this.db.query('SELECT p.CodigoProducto, p.Descripcion, pp.Id, pp.StockMinimo, pp.StockActual, p.PrecioVenta, pv.RazonSocial FROM producto p INNER JOIN producto_proveedor pp ON p.Id = pp.IdProducto INNER JOIN proveedor pv ON pp.IdProveedor = pv.Id');
		//devuelve tabla mas propiedades. Solo debemos devolver tabla. Posicion 0 del array devuelto.
		return productos[0];
	}

	async listarProveedor() {//Devuelve todas las filas de la tabla producto		
		const productos = await this.db.query('SELECT Id As IdProveedor, RazonSocial AS Proveedor FROM proveedor');
		//devuelve tabla mas propiedades. Solo debemos devolver tabla. Posicion 0 del array devuelto.
		return productos[0];
	}

	//Devuelve un objeto cuya fila en la tabla productos coincide con id.
	//Si no la encuentra devuelve null
	async buscarId(id: string) {
		const encontrado: any = await this.db.query('SELECT * FROM producto WHERE Id = ?', [id]);
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

	//Devuelve un objeto cuya fila en la tabla producto coincide con CodigoProducto.
	//Si no la encuentra devuelve null
	async buscarCodigoProducto(codigoProducto: string) {
		const encontrado: any = await this.db.query('SELECT * FROM producto WHERE CodigoProducto = ?', [codigoProducto]);
		//Ojo la consulta devuelve una tabla de una fila. (Array de array) Hay que desempaquetar y obtener la unica fila al enviar
		
		if (encontrado.length > 1)
			return encontrado[0][0];
		return null;
	}

    //Devuelve un objeto cuya fila en la tabla producto coincide con Descripcion.
	//Si no la encuentra devuelve null
	async buscarDescripcion(descripcion: string) {
		const encontrado: any = await this.db.query('SELECT * FROM producto WHERE Descripcion = ?', [descripcion]);
		//Ojo la consulta devuelve una tabla de una fila. (Array de array) Hay que desempaquetar y obtener la unica fila al enviar
		if (encontrado.length > 1)
			return encontrado[0][0];
		return null;
	}

	//Devuelve un objeto cuya fila en la tabla producto_proveedor coincide con Id.
	//Si no la encuentra devuelve null
	async buscarIdProductoProveedor(id: string) {
		const encontrado: any = await this.db.query('SELECT * FROM producto_proveedor WHERE Id = ?', [id]);
		//Ojo la consulta devuelve una tabla de una fila. (Array de array) Hay que desempaquetar y obtener la unica fila al enviar		
		if (encontrado.length > 1)
			return encontrado[0][0];
		return null;
	}	
	
	//Devuelve un objeto cuya fila en la tabla producto_proveedor coincide con IdProducto AND IdProveedor.
	//Si no la encuentra devuelve null
	async buscarProductoProveedor(idProducto: string, IdProveedor: string) {
		const encontrado: any = await this.db.query('SELECT * FROM producto_proveedor WHERE IdProducto = ? AND IdProveedor = ?', [idProducto, IdProveedor]);
		//Ojo la consulta devuelve una tabla de una fila. (Array de array) Hay que desempaquetar y obtener la unica fila al enviar		
		if (encontrado.length > 1)
			return encontrado[0][0];
		return null;
	}	

	//Devuelve 1 si logro crear un nuevo producto de la tabla producto.
	//async crear(producto: object) {
	async crear(CodigoProducto: string, Descripcion: string) {
		//try{ AGREGAR!!		
		const result = (await this.db.query('INSERT INTO producto (CodigoProducto, Descripcion) VALUES (?, ?)', [CodigoProducto, Descripcion]))[0].insertId;
		console.log(result);// ultimo id insertado
		return result;
		//} catch{} AGREGAR!!
	}

	async crearProductoProveedor(IdProducto: string, IdProveedor: string, StockMinimo: string, StockActual: string, PrecioVenta: string) {		
		const result = (await this.db.query('INSERT INTO producto_proveedor (IdProducto, IdProveedor, StockMinimo, StockActual, PrecioVenta) VALUES (?, ?, ?, ?, ?)', [IdProducto, IdProveedor, StockMinimo, StockActual, PrecioVenta]))[0].affectArrow;		
		return result;		
	}

	//Devuelve 1 si logro actualizar el producto indicado por id
	async actualizar(producto: object, id: string) {
		const result = (await this.db.query('UPDATE producto SET ? WHERE Id = ?', [producto, id]))[0].affectedRows;
		console.log(result);
		return result;
	}
	
	async actualizarProductos(producto: object, id: string) {
		const result = (await this.db.query('UPDATE producto SET ? WHERE CodigoProducto = ?', [producto, id]))[0].affectedRows;		
		return result;
	}

	async actualizarProductoProveedor(productoProveedor: object, id: string) {
		const result = (await this.db.query('UPDATE producto_proveedor SET ? WHERE Id = ?', [productoProveedor, id]))[0].affectedRows;
		console.log(result);
		return result;
	}

	async actualizarPrecios(producto: string, id: string, id_proveedor: string) {
		const result = (await this.db.query('UPDATE producto_proveedor INNER JOIN producto ON producto_proveedor.IdProducto = producto.Id SET PrecioVenta = ? WHERE producto.CodigoProducto = ? AND producto_proveedor.IdProveedor = ?', [producto, id, id_proveedor]))[0];		
		console.log(result);
		return result;
	}

	//Devuelve 1 si logro eliminar el producto indicado por id
	async eliminar(id: string) {
		const product = (await this.db.query('DELETE FROM producto WHERE Id = ?', [id]))[0].affectedRows;		
		return product;
	}

	async eliminarProductoProveedor(id: string) {
		const product = (await this.db.query('DELETE FROM producto_proveedor WHERE Id = ?', [id]))[0].affectedRows;		
		return product;
	}
	
}

const articuloModel: ArticuloModel = new ArticuloModel();
export default articuloModel;