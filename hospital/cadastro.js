const registrationForm = document.querySelector("#registration-form");
const passwordInput = document.querySelector("#password");
const confirmPasswordInput = document.querySelector("#confirm-password");
const formStatus = document.querySelector("#form-status");

document.querySelectorAll("[data-password-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
        const input = document.getElementById(button.dataset.passwordToggle);
        const shouldShow = input.type === "password";

        input.type = shouldShow ? "text" : "password";
        button.textContent = shouldShow ? "Ocultar" : "Mostrar";
        button.setAttribute("aria-pressed", String(shouldShow));
        button.setAttribute(
            "aria-label",
            `${shouldShow ? "Ocultar" : "Mostrar"} ${input.id === "password" ? "senha" : "confirmação da senha"}`
        );
    });
});

function validatePasswordMatch() {
    const passwordsMatch = passwordInput.value === confirmPasswordInput.value;
    confirmPasswordInput.setCustomValidity(passwordsMatch ? "" : "As senhas não coincidem.");
}

passwordInput.addEventListener("input", validatePasswordMatch);
confirmPasswordInput.addEventListener("input", validatePasswordMatch);

registrationForm.addEventListener("input", () => {
    formStatus.hidden = true;
    formStatus.textContent = "";
});

registrationForm.addEventListener("submit", (event) => {
    event.preventDefault();
    validatePasswordMatch();

    if (!registrationForm.reportValidity()) {
        return;
    }

    formStatus.textContent = "Os campos foram validados. Para concluir o cadastro, esta página precisa ser conectada ao sistema do hospital. Nenhum dado foi enviado ou armazenado.";
    formStatus.hidden = false;
});