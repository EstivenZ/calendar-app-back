/*
    Eventos de usuarios - Events
    host + /api/events
*/

const {Router}= require('express');
const router= Router();
const {check}= require('express-validator');
const { obtenerEvento, crearEvento, actualizarEvento, eliminarEvento} = require("../controllers/events");
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jws');
const {isDate}= require('../helpers/isDate')

//Todas las peticiones deben pasar por el JWT
router.use(validarJWT);

//Obtener eventos
router.get(
    '/',
    obtenerEvento);

//Crear un nuevo evento
router.post('/',
[
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('start', 'La fecha de inicio es obligatoria').custom(isDate),
    check('end', 'La fecha de finalización es obligatoria').custom(isDate),
    validarCampos
], 
crearEvento);

//Actualizar un evento
router.put('/:id', actualizarEvento);

//Eliminar un evento
router.delete('/:id', eliminarEvento);

module.exports= router;