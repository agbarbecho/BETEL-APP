import jwt from "jsonwebtoken";

export const createAccessToken = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      "xyz123", // Asegúrate de usar una clave secreta más segura en producción
      {
        expiresIn: "1d", // El token expira en 1 día
      },
      (err, token) => {
        if (err) reject(err);
        resolve(token);
      }
    );
  });
};
