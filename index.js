document.addEventListener("DOMContentLoaded", () => {
  const dateElement = document.getElementById("last-updated");

  if (dateElement) {
    const lastUpdated = "August 2, 2025";
    dateElement.textContent = lastUpdated;
  }
});
