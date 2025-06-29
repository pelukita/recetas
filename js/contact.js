const captchaText = document.getElementById("captcha-text");
const refreshBtn = document.getElementById("refresh-captcha");
const captchaInput = document.getElementById("captcha-input");
const captchaError = document.getElementById("captcha-error");

function generarCodigoCaptcha() {
  const caracteres = "ABCDEFGHJKLMNOPQRSTUVWXYZ0123456789";
  let resultado = "";

  for (let i = 0; i < 5; i++) {
    resultado += caracteres.charAt(
      Math.floor(Math.random() * caracteres.length)
    );
  }

  captchaText.textContent = resultado;
  return resultado;
}

let codigoActual = generarCodigoCaptcha();

refreshBtn.addEventListener("click", function () {
  codigoActual = generarCodigoCaptcha();
  captchaInput.value = "";
  captchaError.textContent = "";
});

document
  .getElementById("contact-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    if (captchaInput.value.toUpperCase() === codigoActual) {
      captchaError.textContent = "✓ Correcto";
      captchaError.style.color = "green";
      console.log(codigoActual);
    } else {
      captchaError.textContent = "❌ Fallaste";
      captchaError.style.color = "red";
      codigoActual = generarCodigoCaptcha();
    }
  });
