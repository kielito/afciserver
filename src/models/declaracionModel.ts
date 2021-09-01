import { createPool } from 'mysql2/promise';
import  bcryptjs from 'bcryptjs';

class DeclaracionModel {
	private db: any;
	constructor() {
		this.config();
	}

	async config() {
		this.db = await createPool({
			host: 'us-cdbr-east-04.cleardb.com',
			user: 'b603cf410ef897',
			password: 'd43c3a4c',
			database: 'heroku_8d9dee01461c848',			
			connectionLimit: 10,
			multipleStatements: false			
			/*	
			host: 'localhost',
			user: 'root',
			password: '',
			database: 'c32prod_geoaf',
			connectionLimit: 10,
			multipleStatements: false	
			*/
		});
	}
	
	async altaDecJurada(fecha_alta: string, sellos_pedidos: number, fecha_firma_ddjj: string, tipo_dec_jurada:string, pcia_ddjj: string, usuario_dni_usuario: number) {		
		const result = (await this.db.query('INSERT INTO dec_jurada (fecha_alta, sellos_pedidos, fecha_firma_ddjj, tipo_dec_jurada, pcia_ddjj, usuario_dni_usuario) VALUES (?, ?, ?, ?, ?, ?)', [fecha_alta, sellos_pedidos, fecha_firma_ddjj, tipo_dec_jurada, pcia_ddjj, usuario_dni_usuario]))[0].insertId;		
		return result;		
	}	

	async altaSolicitante(dni_solicitante: number, dec_jurada_id_dec_jurada_ind: number, nombre_solicitante: string, apellido_solicitante: string, nacionalidad_solicitante: string, cuit_solicitante: number, renaf_solicitante: string, nacimiento_solicitante: string, direccion_solicitante: string, localidad_solicitante: string, provincia_solicitante: string, tel_solicitante: number, email_solicitante: string, latitud_solicitante:string, longitud_solicitante: string, codigo_postal_solicitante: string, tipo_dec_jurada: string) {
		const result = (await this.db.query('INSERT INTO solicitante (dni_solicitante, dec_jurada_id_dec_jurada_ind, nombre_solicitante, apellido_solicitante, nacionalidad_solicitante, cuit_solicitante, renaf_solicitante, nacimiento_solicitante, direccion_solicitante, localidad_solicitante, provincia_solicitante, tel_solicitante, email_solicitante, latitud_solicitante, longitud_solicitante, codigo_postal_solicitante, tipo_dec_jurada) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [dni_solicitante, dec_jurada_id_dec_jurada_ind, nombre_solicitante, apellido_solicitante, nacionalidad_solicitante, cuit_solicitante, renaf_solicitante, nacimiento_solicitante, direccion_solicitante, localidad_solicitante, provincia_solicitante, tel_solicitante, email_solicitante, latitud_solicitante, longitud_solicitante, codigo_postal_solicitante, tipo_dec_jurada]))[0].affectedRows;		
		return result;
	}

	async altaProduccion(dec_jurada_id_dec_jurada_ind: number, decide_produccion: string, decide_comercializacion: string, administra_recursos: string, tipo_vegetal: string, tipo_animal: string, describe_principal: string, tipo_dec_jurada: string) {
		const result = (await this.db.query('INSERT INTO produccion (dec_jurada_id_dec_jurada_ind, decide_produccion, decide_comercializacion, administra_recursos, tipo_vegetal, tipo_animal, describe_principal, tipo_dec_jurada) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [dec_jurada_id_dec_jurada_ind, decide_produccion, decide_comercializacion, administra_recursos, tipo_vegetal, tipo_animal, describe_principal, tipo_dec_jurada]))[0].affectedRows;		
		return result;
	}

	async altaPuntoVenta(dec_jurada_id_dec_jurada_ind: number, descripcion_pv: string, direccion_pv: string, localidad_pv: string, latitud_pv: string, longitud_pv: string, tipo_dec_jurada: string) {
		const result = (await this.db.query('INSERT INTO puntos_venta (dec_jurada_id_dec_jurada_ind, descripcion_pv, direccion_pv, localidad_pv, latitud_pv, longitud_pv, tipo_dec_jurada) VALUES (?, ?, ?, ?, ?, ?, ?)', [dec_jurada_id_dec_jurada_ind, descripcion_pv, direccion_pv, localidad_pv, latitud_pv, longitud_pv, tipo_dec_jurada]))[0].affectedRows;		
		return result;
	}

	
	/*
	*/

}

const declaracionModel: DeclaracionModel = new DeclaracionModel();
export default declaracionModel;