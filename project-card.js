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
////////////////////////////////////////////////////////////////////////
const projectCardContent = [
      {
        title: 'FavorHive',
        image: '/assets/images/FavorHive.png',
        alt: 'The FavorHive website logo',
        description: 'FavorHive is a community lending website for users to request and offer help, resources, or services within their neighborhoods',
        link: 'https://github.com/Mianbao004/FavorHive',
        status: 'Ongoing'
    },
    {
        title: 'TritonRoute',
        image: '/assets/images/TritonRoute.png',
        alt: 'The TritonRoute website logo',
        description: 'TritonRoute is an informative website designed to help individuals with mobility challenges, identify accessible routes and plan their journeys more easily.',
        link: 'https://github.com/Mianbao004/TritonRoute',
        status: 'Completed'
    }
]
////////////////////////////////////////////////////////////////////////
function renderProjects(projects) {
  const gallery = document.getElementById('projectGallery');
    //clear gallery section
    gallery.innerHTML = '';


  projects.forEach((project) => { //light DOM
    const card = document.createElement('project-card'); //the key
    card.setAttribute('title', project.title || 'Untitled Project');
    card.setAttribute('image', project.image || '');
    card.setAttribute('alt', project.alt || 'Project image');
    card.setAttribute('description', project.description || 'No description available');
    card.setAttribute('link', project.link || '#');
    card.setAttribute('status', project.status || '');
    
    gallery.appendChild(card); //add the child(card) to that gallery space
  });
}
////////////////////////////////////////////////////////////////////////

//If localStorage is empty, add the projectCards
if (!localStorage.getItem("projectCards")) {
  localStorage.setItem('projectCards', JSON.stringify(projectCardContent));
}
// Otherwise, fetch from localStorage with Load Local btn
document.getElementById("loadLocal").addEventListener("click", () => {
  const projects = JSON.parse(localStorage.getItem("projectCards")); //Bc the projectCards are stringified
  renderProjects(projects);
});

////////////////////////////////////////////////////////////////////////
const JSONBIN_URL = "https://api.jsonbin.io/v3/b/688ade04ae596e708fbe91cc";
function loadRemoteProjects() {
  fetch(JSONBIN_URL)
    .then(response => {
      if (!response.ok) {
        throw new Error("Fetch failed.");
      }
      return response.json();
    })
    .then(data => {
      const projects = data.record;
      renderProjects(projects); // Render the fetched projects
    })
    .catch(error => {
      console.error("Failed to load remote data:", error);
    });
}
document.getElementById("loadRemote").addEventListener("click", loadRemoteProjects);