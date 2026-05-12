import { openDownloadMenu } from './downloads.js';
interface Project {
  name: string;
  description?: string;
  versions?: string[];
  docs_url?: string;
  github_url?: string;
  meta_url: string;
}
export async function initProjects(indexUrl: string): Promise<void> {
  const container = document.getElementById('projects-container');
  if (!container) return;
  try {
    const indexResponse = await fetch(indexUrl);
    const indexData = await indexResponse.json();
    const projectUrls: string[] = indexData.projects || [];
    if (projectUrls.length === 0) {
      container.innerHTML = `
        <div style="opacity: 0.7;">
            <p class="md-typescale-body-large">There's nothing here yet</p>
        </div>
      `;
      return;
    }
    const projectDataArray = await Promise.all(
      projectUrls.map(async (url: string): Promise<Project | null> => {
        try {
          const res = await fetch(url);
          const data = await res.json();
          return { ...data, meta_url: url };
        } catch (e) {
          console.error(e);
          return null;
        }
      }),
    );
    const validProjects = projectDataArray.filter(
      (p): p is Project => p !== null,
    );
    container.innerHTML = validProjects
      .map((project: Project) => {
        const hasVersions = project.versions && project.versions.length > 0;
        const hasDocs = !!project.docs_url;
        const hasGithub = !!project.github_url;
        return `
          <div class="project-card">
              <div class="project-card-header">
                  <p class="md-typescale-headline-large project-card-title">
                      ${project.name}
                  </p>
                  <md-outlined-icon-button
                      href="${project.github_url || '#'}"
                      target="_blank"
                      ${!hasGithub ? 'disabled' : ''}>
                      <md-icon>code</md-icon>
                  </md-outlined-icon-button>
              </div>
              <p class="md-typescale-body-large project-card-description">
                  ${project.description || ''}
              </p>
              <div class="project-card-buttons">
                  <md-outlined-button
                      href="${project.docs_url || '#'}"
                      target="_blank"
                      ${!hasDocs ? 'disabled' : ''}>
                      Docs
                  </md-outlined-button>
                  <md-filled-tonal-button
                      class="download-btn"
                      data-name="${project.name}"
                      data-url="${project.meta_url}"
                      ${!hasVersions ? 'disabled' : ''}>
                      Download
                  </md-filled-tonal-button>
              </div>
          </div>
        `;
      })
      .join('');
    container
      .querySelectorAll('.download-btn:not([disabled])')
      .forEach((btn) => {
        btn.addEventListener('click', () => {
          const name = btn.getAttribute('data-name') || '';
          const url = btn.getAttribute('data-url') || '';
          openDownloadMenu(name, url);
        });
      });
  } catch (e) {
    console.error(e);
  }
}
