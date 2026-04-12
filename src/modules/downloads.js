const projectsCache = {}

function renderVersions(data) {
	const content = document.getElementById('dialog-content')
	if (!content) return

	content.innerHTML = data.versions
		.map(
			v => `
        <div class="version-item" style="display: flex; align-items: center; justify-content: space-between; padding: 12px 0;">
            <div class="version-details">
                <div class="version-name md-typescale-body-large">${v.version}</div>
                <div class="version-size md-typescale-body-small">${v.size}</div>
            </div>
            <md-outlined-button href="${v.download_url}" target="_blank">
                Download
            </md-outlined-button>
        </div>
        <md-divider></md-divider>
    `,
		)
		.join('')

	const lastDivider = content.querySelector('md-divider:last-child')
	if (lastDivider) lastDivider.remove()
}

export async function openDownloadMenu(projectName, repoUrl) {
	const dialog = document.getElementById('download-dialog')
	const content = document.getElementById('dialog-content')
	const title = document.getElementById('dialog-title')

	if (!dialog || !content) return

	title.innerText = `Download ${projectName}`
	dialog.show()

	if (projectsCache[repoUrl]) {
		renderVersions(projectsCache[repoUrl])
		return
	}

	content.innerHTML =
		'<md-linear-progress indeterminate style="width: 100%;"></md-linear-progress>'

	try {
		const response = await fetch(repoUrl)
		const data = await response.json()
		projectsCache[repoUrl] = data
		renderVersions(data)
	} catch (e) {
		content.innerHTML = '<p>Load error</p>'
	}
}
