const filterButtons = document.querySelectorAll(".filter-button");
const specialtyCards = document.querySelectorAll(".specialty-card");
const searchInput = document.querySelector("#specialty-search");
const resultsCount = document.querySelector("#results-count");
const emptyState = document.querySelector("#empty-state");

let activeFilter = "all";

function normalizeText(text) {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("pt-BR");
}

function updateResults() {
    const searchTerm = normalizeText(searchInput.value.trim());
    let visibleCount = 0;

    specialtyCards.forEach((card) => {
        const matchesFilter = activeFilter === "all" || card.dataset.category === activeFilter;
        const searchableText = normalizeText(`${card.textContent} ${card.dataset.search}`);
        const matchesSearch = searchableText.includes(searchTerm);
        const isVisible = matchesFilter && matchesSearch;

        card.hidden = !isVisible;
        if (isVisible) {
            visibleCount += 1;
        }
    });

    resultsCount.textContent = `Exibindo ${visibleCount} ${visibleCount === 1 ? "atendimento" : "atendimentos"}`;
    emptyState.hidden = visibleCount > 0;
}

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        activeFilter = button.dataset.filter;

        filterButtons.forEach((filterButton) => {
            const isActive = filterButton === button;
            filterButton.classList.toggle("is-active", isActive);
            filterButton.setAttribute("aria-pressed", String(isActive));
        });

        updateResults();
    });
});

searchInput.addEventListener("input", updateResults);

updateResults();