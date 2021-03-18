/*
    Rutas de usuarios - Auth
    host + /api/auth
*/
const {Router}= require('express');
const {check}= require('express-validator');
const router= Router();
const {crearUsuario, loginUsuario, revalidarToken}= require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jws');

router.post(
    '/new',
    [//middlewares
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe tener 5 caracteres').isLength({min:5}),
        validarCampos
    ],
    crearUsuario); 

router.post(
    '/', 
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe tener 5 caracteres').isLength({min:5}),
        validarCampos
    ],
    loginUsuario); 

router.get('/renew', validarJWT, revalidarToken); 

module.exports= router;