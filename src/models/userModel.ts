import { createPool } from 'mysql2/promise';
import  bcryptjs from 'bcryptjs';

class UserModel {
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
		const usuarios = await this.db.query('SELECT * FROM usuario');		
		return usuarios[0];
	}
	
	async buscarId(id: string) {
		const encontrado: any = await this.db.query('SELECT * FROM usuario WHERE Activado = "1" AND Id = ?', [id]);		
		if (encontrado.length > 1)
			return encontrado[0][0];
		return null;
	}
	
	async buscarNombre(nombre: string) {
		const encontrado: any = await this.db.query('SELECT * FROM usuario WHERE Usuario = ?', [nombre]);		
		if (encontrado.length > 1)
			return encontrado[0][0];
		return null;
	}

	async buscarUsuario(usuario: string, email: string) {
		const encontrado: any = await this.db.query('SELECT * FROM usuario WHERE Activado = "1" AND Usuario = ? AND Email = ?', [usuario,email]);		
		if (encontrado.length > 1)
			return encontrado[0][0];
		return null;
	}

	
	async crear(usuario: object) {		
		const result = (await this.db.query('INSERT INTO usuario SET ?', [usuario]))[0].insertId;		
		return result;		
	}

	
	async actualizar(usuario: object, id: string) {
		const result = (await this.db.query('UPDATE usuario SET ? WHERE Id = ?', [usuario, id]))[0].affectedRows;		
		return result;
	}

	
	async eliminar(id: string) {
		const user = (await this.db.query('DELETE FROM usuario WHERE Id = ?', [id]))[0].affectedRows;
		console.log(user);
		return user;
	}

	async habilitar(id: string) {		
		const result = (await this.db.query('UPDATE usuario SET Activado = "1" WHERE Activado = "0" AND Id = ?', [id]))[0].affectedRows;		
		return result;
	}


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


	//Encriptar Clave
	encriptarPassword = async(password: string): Promise<string> => {
        const salt = await bcryptjs.genSalt(10);
        return await bcryptjs.hash(password, salt);
    }

	//Compara la Clave ingresada vs la registrada
	validarPassword = async function (password: string, passwordhash: string): Promise<boolean> {		
        return await bcryptjs.compare(password, passwordhash);
    }
}

const userModel: UserModel = new UserModel();
export default userModel;