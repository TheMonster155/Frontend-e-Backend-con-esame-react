// frontend/src/auth.js
import jwt_decode from "jwt-decode";

const token = new URLSearchParams(window.location.search).get("token");
if (token) {
  try {
    const decoded = jwt_decode(token);
    console.log("Token decodificato:", decoded);
    localStorage.setItem("Auth", token);
  } catch (error) {
    console.error("Errore durante la decodifica del token:", error);
  }
}
