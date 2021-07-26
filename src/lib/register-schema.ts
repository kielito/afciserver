import { body, oneOf } from 'express-validator';

const schema = [
    /*
    body('nombre')
        .isLength({ min: 3, max: 20})
        .withMessage('Debe contener minimo 3 caracteres y maximo 20!')
        .matches(/^([a-zA-Z]{2,}\s[a-zA-Z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)/)
        .withMessage('Debe ser alfabético'),
    body('apellido')
        .isLength({ min: 3, max: 20})
        .withMessage('Debe contener minimo 3 caracteres y maximo 20!')
        .matches(/^[A-Za-z/g]+$/g)
        .withMessage('Debe ser alfabético'),
    */
    body('password')
        .isLength({ min: 6, max: 20})
        .withMessage('Debe contener minimo 6 caracteres y maximo 20!')
        .matches(/^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])[a-zA-Z0-9]{6,20}$/)
        .withMessage('Debe ser alfanumerica, admite mayusculas y un mínimo de 6 caracteres, no permite caracteres especiales'),
    body('repassword')
        .custom((value, { req }) => value === req.body.password)
        .withMessage('Los password deben ser iguales'),        
    body('email')
        .isEmail()
        .withMessage('No es un Email válido!')
        .isLength({ min: 3, max: 30})
        .withMessage('Debe ser mayor a 3 y menos a 30 caracteres!'),   
    oneOf([
        body('perfil').equals('Usuario'),
        body('perfil').equals('Admin'),
          ], 'Perfil no existe'),
];

export { schema as registerSchema };