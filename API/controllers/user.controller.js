
const userGet = async (req, res) => {
    res.json({
        ok: true,
        msg: 'Obtener usuarios'
    });
}

const userPut = async (req, res) => {
    res.json({
        ok: true,
        msg: 'Actualizar usuario'
    });
}

const userPost = async (req, res) => {
    res.json({
        ok: true,
        msg: 'Crear usuario'
    });
}

const userDelete = async (req, res) => {
    res.json({
        ok: true,
        msg: 'Eliminar Usuario'
    });
}

module.exports = { userGet, userPut, userPost, userDelete }