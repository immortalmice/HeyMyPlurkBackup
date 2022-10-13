const { electronAPI: api } = window

window.onload = () => {
  window.addEventListener('keydown', event => {
    if (event.key === 'F12') {
      api.openDevTools()
    }
  })

  document.getElementById('select_folder').addEventListener('click', async() => {
    const path = await api.selectFolder()
    console.log(path)
  })
}
