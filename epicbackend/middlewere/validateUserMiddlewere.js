const validateUserMiddleware = (req, res, next) => {
  const errors = [];
  const { name, surname, dob, email, address, password, username } = req.body;

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push("L'email non è valida");
  }

  if (typeof username !== "string") {
    errors.push("Lo username deve essere una stringa");
  }

  if (typeof password !== "string" || password.length < 8) {
    errors.push("La password deve contenere più di 8 caratteri");
  }

  if (typeof name !== "string" || name.length < 3) {
    errors.push("Il nome deve contenere almeno 3 caratteri");
  }

  if (typeof surname !== "string" || surname.length < 3) {
    errors.push("Il cognome deve essere una stringa di almeno 3 caratteri");
  }

  if (typeof dob !== "string") {
    errors.push("La data di nascita non è valida");
  }

  if (typeof address !== "string") {
    errors.push("L'indirizzo non è valido");
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};

module.exports = validateUserMiddleware;
