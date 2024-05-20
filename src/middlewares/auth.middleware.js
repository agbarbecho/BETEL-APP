import jwt from "jsonwebtoken";

export const isAuth = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "No estás autorizado",
    });
  }

  jwt.verify(token, "xyz123", (err, decoded) => {
    if (err) {
      return res.status(401).json({
        message: "No estás autorizado",
      });
    }

    req.user = { id: decoded.id, role_id: decoded.role_id };
    next();
  });
};

export const isAdmin = (req, res, next) => {
  if (req.user.role_id !== 1) {
    return res.status(403).json({ message: 'Acceso denegado. No eres un administrador.' });
  }
  next();
};

export const isVeterinarian = (req, res, next) => {
  if (req.user.role_id !== 2) {
    return res.status(403).json({ message: 'Acceso denegado. No eres un veterinario.' });
  }
  next();
};
