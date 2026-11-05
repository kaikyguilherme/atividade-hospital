const specialtySelect = document.querySelector("#specialty");
const professionalSelect = document.querySelector("#professional");
const appointmentDate = document.querySelector("#appointment-date");
const appointmentForm = document.querySelector("#appointment-form");

const professionalsBySpecialty = {
    pediatria: { name: "Dr. Felipe Velozo", value: "felipe" },
    geriatria: { name: "Dr. Pedro Damasceno", value: "pedro" },
    clinica: { name: "Dr. Deivide Bembem", value: "deivide" },
    cardiologia: { name: "Dra. Marjorie Fernanda", value: "marjorie" },
    ortopedia: { name: "Dr. Kaiky Guilherme", value: "kaiky" },
    psicologia: { name: "Dra. Andrea Mesquita", value: "andrea" }
};

const summaryElements = {
    specialty: document.querySelector("#summary-specialty"),
    professional: document.querySelector("#summary-professional"),
    date: document.querySelector("#summary-date"),
    time: document.querySelector("#summary-time")
};

function updateProfessional() {
    const professional = professionalsBySpecialty[specialtySelect.value];
    professionalSelect.replaceChildren();

    if (!professional) {
        professionalSelect.add(new Option("Escolha primeiro uma especialidade", ""));
        professionalSelect.disabled = true;
        return;
    }

    professionalSelect.add(new Option("Selecione um profissional", ""));
    professionalSelect.add(new Option(professional.name, professional.value));
    professionalSelect.disabled = false;
}

function formatDate(dateValue) {
    if (!dateValue) {
        return "A selecionar";
    }

    const [year, month, day] = dateValue.split("-").map(Number);
    return new Intl.DateTimeFormat("pt-BR", {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "UTC"
    }).format(new Date(Date.UTC(year, month - 1, day)));
}

function updateSummary() {
    const specialtyOption = specialtySelect.selectedOptions[0];
    const professionalOption = professionalSelect.selectedOptions[0];
    const selectedTime = appointmentForm.querySelector('input[name="time"]:checked');

    summaryElements.specialty.textContent = specialtySelect.value && specialtyOption
        ? specialtyOption.textContent
        : "A selecionar";
    summaryElements.professional.textContent = professionalSelect.value && professionalOption
        ? professionalOption.textContent
        : "A selecionar";
    summaryElements.date.textContent = formatDate(appointmentDate.value);
    summaryElements.time.textContent = selectedTime ? selectedTime.value : "A selecionar";
}

function setMinimumDate() {
    const today = new Date();
    const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
        .toISOString()
        .slice(0, 10);
    appointmentDate.min = localDate;
}

specialtySelect.addEventListener("change", () => {
    updateProfessional();
    updateSummary();
});

professionalSelect.addEventListener("change", updateSummary);
appointmentDate.addEventListener("change", updateSummary);
appointmentForm.addEventListener("change", updateSummary);

setMinimumDate();
updateProfessional();
updateSummary();