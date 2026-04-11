import '@material/web/icon/icon.js'
import '@material/web/iconbutton/icon-button.js'
import '@material/web/switch/switch.js'
import '@material/web/dialog/dialog.js'
import '@material/web/button/text-button.js'
import { styles as typescaleStyles } from '@material/web/typography/md-typescale-styles.js'

document.adoptedStyleSheets = [
	...document.adoptedStyleSheets,
	typescaleStyles.styleSheet,
]

const html = document.documentElement
const settingsDialog = document.getElementById('settings-dialog')
const systemSwitch = document.getElementById('system-theme-switch')
const darkSwitch = document.getElementById('dark-mode-switch')
const myProfile = document.getElementById('my-profile')
const toGithubPage = document.getElementById('to-github-page')
const openSettings = document.getElementById('open-settings')

window.addEventListener('load', () => {
	document.body.classList.remove('preload')
})

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
	anchor.addEventListener('click', function (e) {
		e.preventDefault()
		const target = document.querySelector(this.getAttribute('href'))
		if (target) {
			target.scrollIntoView({
				behavior: 'smooth',
			})
		}
	})
})

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

	html.classList.remove('dark', 'light')
	html.classList.add(themeToApply)
	html.dataset.theme = themeToApply

	localStorage.setItem('use-system-theme', useSystem)
	localStorage.setItem('theme', darkSwitch.selected ? 'dark' : 'light')
}

if (systemSwitch) systemSwitch.addEventListener('change', applyTheme)
if (darkSwitch) darkSwitch.addEventListener('change', applyTheme)

const redirectToGithubPage = () => {
	window.location.href = 'https://github.com/vekvy/'
}

if (myProfile) myProfile.addEventListener('click', redirectToGithubPage)
if (toGithubPage) toGithubPage.addEventListener('click', redirectToGithubPage)

const openSettingsDialog = () => {
	if (settingsDialog) settingsDialog.show()
}

if (openSettings) openSettings.addEventListener('click', openSettingsDialog)

const savedUseSystem = localStorage.getItem('use-system-theme') !== 'false'
const savedTheme = localStorage.getItem('theme') || 'dark'

if (systemSwitch && darkSwitch) {
	systemSwitch.selected = savedUseSystem
	darkSwitch.selected = savedTheme === 'dark'

	setTimeout(applyTheme, 0)
}

window
	.matchMedia('(prefers-color-scheme: dark)')
	.addEventListener('change', () => {
		if (systemSwitch.selected) applyTheme()
	})
