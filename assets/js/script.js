const html = document.documentElement
const settingsDialog = document.getElementById('settings-dialog')
const systemSwitch = document.getElementById('system-theme-switch')
const darkSwitch = document.getElementById('dark-mode-switch')

const applyTheme = () => {
	const useSystem = systemSwitch.selected
	let themeToApply

	if (useSystem) {
		const systemPrefersDark = window.matchMedia(
			'(prefers-color-scheme: dark)',
		).matches
		themeToApply = systemPrefersDark ? 'dark' : 'light'

		darkSwitch.disabled = true
		darkSwitch.selected = systemPrefersDark
	} else {
		darkSwitch.disabled = false
		themeToApply = darkSwitch.selected ? 'dark' : 'light'
	}

	html.classList.toggle('dark', themeToApply === 'dark')
	html.classList.toggle('light', themeToApply === 'light')

	localStorage.setItem('use-system-theme', useSystem)
	localStorage.setItem('theme', darkSwitch.selected ? 'dark' : 'light')

	if (typeof updateIcons === 'function') updateIcons()
}

systemSwitch.addEventListener('change', applyTheme)
darkSwitch.addEventListener('change', applyTheme)

window.toGithubPage = () => {
	window.location.href = 'https://github.com/vekvy'
}

window.openSettingsDialog = () => {
	settingsDialog.show()
}

const savedUseSystem = localStorage.getItem('use-system-theme') !== 'false'
const savedTheme = localStorage.getItem('theme') || 'dark'

systemSwitch.selected = savedUseSystem
darkSwitch.selected = savedTheme === 'dark'

applyTheme()

window
	.matchMedia('(prefers-color-scheme: dark)')
	.addEventListener('change', () => {
		if (systemSwitch.selected) applyTheme()
	})
