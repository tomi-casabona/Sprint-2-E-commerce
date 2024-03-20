function validate() {
  // Validate fields entered by the user: name, phone, password, and email
  // Obtener los campos del formulario

  const formulario = document.getElementById("form");
  formulario.addEventListener("submit", (e) => {
    e.preventDefault();
  });

  // Validate fields entered by the user: name, phone, password, and email
  // Obtener los campos del formulario
  const fName = document.getElementById("fName");
  const fEmail = document.getElementById("fEmail");
  const fAddress = document.getElementById("fAddress");
  const fLastN = document.getElementById("fLastN");
  const fPassword = document.getElementById("fPassword");
  const fPhone = document.getElementById("fPhone");

  // Obtener los elementos de error
  const errorName = document.getElementById("errorName");
  const errorEmail = document.getElementById("errorEmail");
  const errorAddress = document.getElementById("errorAddress");
  const errorLastN = document.getElementById("errorLastN");
  const errorPassword = document.getElementById("errorPassword");
  const errorPhone = document.getElementById("errorPhone");

  // Expresiones regulares para validaciones
  const nameRegex = /^[A-Za-z]{3,}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^[A-Za-z0-9]{3,}$/;
  const phoneRegex = /^\d{9,}$/;

  // Función para aplicar estilos CSS para validaciones
  function applyStyle(element, isValid) {
    if (isValid) {
      element.style.border = "2px solid green";
    } else {
      element.style.border = "2px solid red";
    }
  }

  // Validar el campo Nombre
  applyStyle(fName, nameRegex.test(fName.value));
  // Validar el campo Email
  applyStyle(fEmail, emailRegex.test(fEmail.value));
  // Validar el campo Dirección
  applyStyle(fAddress, fAddress.value.length >= 3);
  // Validar el campo Apellido
  applyStyle(fLastN, nameRegex.test(fLastN.value));
  // Validar el campo Contraseña
  applyStyle(fPassword, passwordRegex.test(fPassword.value));
  // Validar el campo Teléfono
  applyStyle(fPhone, phoneRegex.test(fPhone.value));

  // Mostrar u ocultar mensajes de error según la validación
  errorName.style.display = nameRegex.test(fName.value) ? "none" : "block";
  errorEmail.style.display = emailRegex.test(fEmail.value) ? "none" : "block";
  errorAddress.style.display = fAddress.value.length >= 3 ? "none" : "block";
  errorLastN.style.display = nameRegex.test(fLastN.value) ? "none" : "block";
  errorPassword.style.display = passwordRegex.test(fPassword.value)
    ? "none"
    : "block";
  errorPhone.style.display = phoneRegex.test(fPhone.value) ? "none" : "block";
}
  

