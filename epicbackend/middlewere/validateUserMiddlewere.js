const validateUserMiddleware = (req, res, next) => {
  const errors = [];
  const { name, surname, dob, email, address, password, username } = req.body;

  // Controlla se l'email è valida
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push("L'email non è valida");
  }

  // Controlla se lo username è una stringa
  if (typeof username !== "string") {
    errors.push("Lo username deve essere una stringa");
  }

  // Controlla se la password è una stringa e ha almeno 8 caratteri
  if (typeof password !== "string" || password.length < 8) {
    errors.push("La password deve contenere più di 8 caratteri");
  }

  // Controlla se il nome è una stringa e ha almeno 3 caratteri
  if (typeof name !== "string" || name.length < 3) {
    errors.push("Il nome deve contenere almeno 3 caratteri");
  }

  // Controlla se il cognome è una stringa e ha almeno 3 caratteri
  if (typeof surname !== "string" || surname.length < 3) {
    errors.push("Il cognome deve essere una stringa di almeno 3 caratteri");
  }

  // Controlla se la data di nascita è una stringa
  if (typeof dob !== "string") {
    errors.push("La data di nascita non è valida");
  }

  // Controlla se l'indirizzo è una stringa
  if (typeof address !== "string") {
    errors.push("L'indirizzo non è valido");
  }

  // Se ci sono errori, restituisci un errore 400 con i dettagli
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  // Se non ci sono errori, passa al middleware successivo
  next();
};

module.exports = validateUserMiddleware;

/*const validateUserMiddlware = (req, res, next) => {
  const errors = [];

  const { name, surname, dob, email, address, password, username } = req.body;

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push("The Email is not Vslid");
  }

  if (typeof username !== "string") {
    errors.push("Username must be a string");
  }

  if (typeof password !== "string" || password.length < 8) {
    errors.push("Password must more 8 char");
  }

  if (typeof name !== "string" || name.length < 3) {
    errors.push("Name must be a more 3 char");
  }

  if (typeof surname !== "string" || surname.length < 3) {
    errors.push("Surname must be a string more 3 char");
  }

  if (typeof dob !== "string") {
    errors.push("Date is not valid");
  }
  if (typeof address !== "string") {
    errors.push("Address  is not valid");
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  } else {
    // Se non ci sono errori, passa al middleware successivo
    next();
  }
};

module.exports = validateUserMiddlware;
*/
