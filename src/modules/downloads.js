const projectsCache = {};

const BYTES = {GB: 1073741824, MB: 1048576, KB: 1024};

const FILE_NAMES = {
    source_code_zip: 'Source code (.zip)',
};

function formatSize(bytes) {
    if (!bytes) return '';
    if (bytes >= BYTES.GB) return (bytes / BYTES.GB).toFixed(2) + ' GB';
    if (bytes >= BYTES.MB) return (bytes / BYTES.MB).toFixed(2) + ' MB';
    if (bytes >= BYTES.KB) return (bytes / BYTES.KB).toFixed(2) + ' KB';
    return bytes + ' B';
}

function getFileName(key) {
    return FILE_NAMES[key] ?? key;
}

function setBackButton(visible, onClick = null) {
    const btn = document.getElementById('dialog-back-btn');
    if (!btn) return;
    btn.style.display = visible ? 'inline-flex' : 'none';
    btn.onclick = onClick;
}

function createVersionItemHTML({left, actionHTML}) {
    return `
		<div class="version-item">
			<div class="version-details">${left}</div>
			${actionHTML}
		</div>
		<md-divider></md-divider>
	`;
}

function removeLastDivider(container) {
    container.querySelector('md-divider:last-child')?.remove();
}

function renderVersionFiles(data, version, projectName) {
    const content = document.getElementById('dialog-content');
    const title = document.getElementById('dialog-title');
    if (!content || !title) return;

    const v = data.versions.find(v => v.version === version);
    if (!v) return;

    title.innerText = `Download ${projectName} [${v.version}]`;

    setBackButton(true, () => {
        title.innerText = `Download ${projectName}`;
        renderVersionList(data, projectName);
    });

    content.innerHTML = Object.entries(v.files)
        .map(([key, file]) =>
            createVersionItemHTML({
                left: `
					<div class="version-name md-typescale-body-large">${getFileName(key)}</div>
					<div class="version-size md-typescale-body-small">${formatSize(file.size)}</div>
				`,
                actionHTML: `<md-outlined-button href="${file.url}" target="_blank" type="button">Download</md-outlined-button>`,
            }),
        )
        .join('');

    removeLastDivider(content);
}

function renderVersionList(data, projectName) {
    const content = document.getElementById('dialog-content');
    if (!content) return;

    setBackButton(false);

    content.innerHTML = data.versions
        .map(v =>
            createVersionItemHTML({
                left: `<div class="version-name md-typescale-body-large">${v.version}</div>`,
                actionHTML: `<md-outlined-button class="download-btn" data-version="${v.version}" type="button">Download</md-outlined-button>`,
            }),
        )
        .join('');

    removeLastDivider(content);

    content.querySelectorAll('.download-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            renderVersionFiles(data, btn.dataset.version, projectName);
        });
    });
}

export async function openDownloadMenu(projectName, repoUrl) {
    const dialog = document.getElementById('download-dialog');
    const content = document.getElementById('dialog-content');
    const title = document.getElementById('dialog-title');

    if (!dialog || !content) {
        return;
    }

    title.innerText = `Download ${projectName}`;
    setBackButton(false);

    document.getElementById('dialog-close-btn').onclick = () => dialog.close();

    dialog.show();

    if (projectsCache[repoUrl]) {
        renderVersionList(projectsCache[repoUrl], projectName);
        return;
    }

    content.innerHTML =
        '<md-linear-progress indeterminate style="width: 100%;"></md-linear-progress>';

    try {
        const response = await fetch(repoUrl);
        const data = await response.json();
        projectsCache[repoUrl] = data;
        renderVersionList(data, projectName);
    } catch (e) {
        content.innerHTML = '<p>Load error</p>';
        console.error(e);
    }
}
