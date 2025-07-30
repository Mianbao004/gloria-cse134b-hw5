class ProjectCard extends HTMLElement {
    constructor() {
        super();
    }

        connectedCallback() { // This method is called when the element is added to the document
            const title = this.getAttribute("title") || "Untitled";
            const image = this.getAttribute("image") || "";
            const alt = this.getAttribute("alt") || ";"
            const description = this.getAttribute("description") || "No description available.";
            const link = this.getAttribute("link") || "#";
            const status = this.getAttribute("status") || "";

            const statusTag = status ?
                `<span class="status-tag ${status.toLowerCase()}">${status}</span>` : "";

            this.innerHTML += `
                <div class="project-card-content">
                    <h2>${title}</h2>
                    <div class="image-container">
                        ${statusTag}
                        <picture>
                            <img src="${image}" alt="${alt}">
                        </picture>
                    </div>
                    <p>${description}</p>
                    <a class="view-project-btn" href="${link}" target="_blank">View Project</a>
                </div>
            `;

        }
}

customElements.define('project-card', ProjectCard);
// <project-card>