export const verifyRole = (...rolesPermitidos) => {
    return (req, res, next) => {
        const rol = req.usuario?.rol;

        if (!rol || !rolesPermitidos.includes(rol)) {
            return res.status(403).json({
                message: `Acceso denegado. Se requiere uno de estos roles: ${rolesPermitidos.join(', ')}`
            });
        }

        next();
    };
};