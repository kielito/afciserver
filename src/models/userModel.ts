import { createPool } from 'mysql2/promise';
import  bcryptjs from 'bcryptjs';

class UserModel {
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

	async listar() {
		const usuarios = await this.db.query('SELECT * FROM usuario');		
		return usuarios[0];
	}
	
	async buscarId(dni_usuario: string) {
		const encontrado: any = await this.db.query('SELECT * FROM usuario WHERE dni_usuario = ?', [dni_usuario]);		
		if (encontrado.length > 1)
			return encontrado[0][0];
		return null;
	}
	
	async buscarNombre(nombre_usuario: string) {
		const encontrado: any = await this.db.query('SELECT * FROM usuario WHERE nombre_usuario = ?', [nombre_usuario]);		
		if (encontrado.length > 1)
			return encontrado[0][0];
		return null;
	}
	/*
	async buscarUsuario(usuario: string, email: string) {
		const encontrado: any = await this.db.query('SELECT * FROM usuario WHERE Usuario = ? AND Email = ?', [usuario,email]);		
		if (encontrado.length > 1)
			return encontrado[0][0];
		return null;
	}
	*/
	
	async crear(usuario: object) {		
		const result = (await this.db.query('INSERT INTO usuario SET ?', [usuario]))[0].affectedRows;		
		return result;		
	}
	
	async actualizar(usuario: object, dni_usuario: string) {
		const result = (await this.db.query('UPDATE usuario SET ? WHERE dni_usuario = ?', [usuario, dni_usuario]))[0].affectedRows;		
		return result;
	}
	
	async eliminar(dni_usuario: string) {
		const user = (await this.db.query('DELETE FROM usuario WHERE dni_usuario = ?', [dni_usuario]))[0].affectedRows;
		
		return user;
	}
	
	//Encriptar Clave
	encriptarPassword = async(pwd_usuario: string): Promise<string> => {
        const salt = await bcryptjs.genSalt(10);
        return await bcryptjs.hash(pwd_usuario, salt);
    }

	//Compara la Clave ingresada vs la registrada
	validarPassword = async function (pwd_usuario: string, passwordhash: string): Promise<boolean> {		
        return await bcryptjs.compare(pwd_usuario, passwordhash);
    }
}

const userModel: UserModel = new UserModel();
export default userModel;