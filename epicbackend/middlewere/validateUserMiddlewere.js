const validateUserMiddlware = (req, res, next) => {
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
