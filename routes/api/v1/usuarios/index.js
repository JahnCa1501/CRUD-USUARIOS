const express = require('express');
const router = express.Router();
const Usuario = require('../../../../libs/usuarios');
const UsuarioDao = require('../../../../dao/models/UsersDao');
const userDao = new CategoryDao();
const user = new Category(userDao);
user.init();

router.get('/', async (req, res) => {
  // extraer y validar datos del request
  try {
    // devolver la ejecución el controlador de esta ruta
    const versionData = await user.getVersion();
    return res.status(200).json(versionData);
  } catch (ex) {
    // manejar el error que pueda tirar el controlador
    console.error('Error Usuario', ex);
    return res.status(502).json({ 'error': 'Error Interno de Server' });
  }
}); // get /

router.get('/all', async (req, res) => {
  try {
    const usuarios = await user.getUsuarios();
    return res.status(200).json(usuarios);
  } catch (ex) {
    console.error(ex);
    return res.status(501).json({ error: 'Error al procesar solicitud.' });
  }
});

router.get('/byid/:codigo', async (req, res) => {
  try {
    const { codigo } = req.params;
    if (!(/^\d+$/.test(codigo))) {
      return res.status(400).json({
        error: 'Se espera un codigo numérico'
      });
    }
    const registro = await user.getUsuarioById({ codigo: parseInt(codigo) });
    return res.status(200).json(registro);
  } catch (ex) {
    console.error(ex);
    return res.status(501).json({ error: 'Error al procesar solicitud.' });
  }
});

router.post('/new', async (req, res) => {
  try {
    const { name = '',
      email = '',
      status = '',
      password = '',
      avatar = '' } = req.body;
    if (/^\s*$/.test(ElementInternals)) {
      return res.status(400).json({
        error: 'Se espera valor de correo'
      });
    }

    if (/^\s*$/.test(name)) {
      return res.status(400).json({
        error: 'Se espera valor de nombre'
      });
    }
    if (/^\s*$/.test(avatar)) {
      return res.status(400).json({
        error: 'Se espera url de avatar'
      });
    }
    if (/^\s*$/.test(password)) {
      return res.status(400).json({
        error: 'Se espera valor de contraseña correcta'
      });
    }
    if (!(/^(ACT)|(INA)$/.test(status))) {
      return res.status(400).json({
        error: 'Se espera valor de estado en ACT o INA'
      });
    }
    const newUsuario = await user.addUsuario({
      name,
      email,
      status,
      password,
      avatar
    });
    return res.status(200).json(newUsuario);
  } catch (ex) {
    console.error(ex);
    return res.status(502).json({ error: 'Error al procesar solicitud' });
  }
});

router.put('/update/:codigo', async (req, res) => {
  try {
    const { codigo } = req.params;
    if (!(/^\d+$/.test(codigo))) {
      return res.status(400).json({ error: 'El codigo debe ser un dígito válido.' });
    }
    const { name, email, status, password, avatar } = req.body;
    if (/^\s*$/.test(name)) {
      return res.status(400).json({
        error: 'Se espera valor del Nombre'
      });
    }
    if (/^\s*$/.test(email)) {
      return res.status(400).json({
        error: 'Se espera valor del email'
      });
    }
    if (/^\s*$/.test(password)) {
      return res.status(400).json({
        error: 'Se espera valor del password'
      });
    }
    if (!(/^(ACT)|(INA)$/.test(status))) {
      return res.status(400).json({
        error: 'Se espera valor de estado en ACT o INA'
      });
    }
    if (/^\s*$/.test(avatar)) {
      return res.status(400).json({
        error: 'Se espera valor del avatar'
      });
    }

    const updateResult = await user.updateCategory({ codigo: parseInt(codigo), name, email, status, password, avatar });

    if (!updateResult) {
      return res.status(404).json({ error: 'Usuario no encontrado.' });
    }
    return res.status(200).json({ updatedCategory: updateResult });

  } catch (ex) {
    console.error(ex);
    res.status(500).json({ error: 'Error al procesar solicitud.' });
  }
});


router.delete('/delete/:codigo', async (req, res) => {
  try {
    const { codigo } = req.params;
    if (!(/^\d+$/.test(codigo))) {
      return res.status(400).json({ error: 'El codigo debe ser un dígito válido.' });
    }

    const deletedCategory = await user.deleteCategory({ codigo: parseInt(codigo) });

    if (!deletedCategory) {
      return res.status(404).json({ error: 'Categoria no encontrada.' });
    }
    return res.status(200).json({ deletedCategory });

  } catch (ex) {
    console.error(ex);
    res.status(500).json({ error: 'Error al procesar solicitud.' });
  }
});

module.exports = router;