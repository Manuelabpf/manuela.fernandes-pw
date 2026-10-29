// SEU LOGIN.JS DEVE COMEÇAR EXATAMENTE AQUI:
const sLogin = document.querySelector('#m-login')
const sSenha = document.querySelector('#m-senha')
const btnLogin = document.querySelector('#btnLogin')

btnLogin.onclick = async e => {
  e.preventDefault()

  try {
    const response = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        login: sLogin.value,
        senha: sSenha.value
      })
    })

    const data = await response.json()

    if (data.success) {
      localStorage.setItem('logado', 'true')
      window.location.href = 'index.html'
    } else {
      alert('Senha ou Login incorretos!')
    }
  } catch (error) {
    console.error('Erro no login:', error)
  }
}
