const { electronAPI: api } = window

window.addEventListener('keydown', event => {
  if (event.key === 'F12') {
    api.openDevTools()
  }
})