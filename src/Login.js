import { useState } from 'react'
import { auth } from './firebaseConnection'
import'./app.css'

import { createUserWithEmailAndPassword } from 'firebase/auth'

export default function Login(){

  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  async function novoUsuario(){
    await createUserWithEmailAndPassword(auth, email, senha)
    .then((value) => {
      console.log('Cadastrado com sucesso!')
      console.log(value)
      setEmail('')
      setSenha('')
    })
    .catch((error) => {
      console.log('Erro ao cadastrar: ' + error)

      if(error.code === 'auth/weak-password'){
        alert('Senha precisa ter pelo menos 6 caracteres!')
      } else if(error.code === 'auth/email-already-in-use'){
        alert('Email já existe!')
      }
    })
  }

  return(
    <div>
      <h1>Login RLGouvea</h1>

      <h2>Usuário</h2>

      <div className="container">
        <label>Email</label>
        <input 
          type="text"
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Digite um email'
        /> <br/>
        
        <label>Senha</label>
        <input 
          type="text"
          value={senha} 
          onChange={(e) => setSenha(e.target.value)}
          placeholder='Informe sua senha'
        /> <br/>

        <button onClick={novoUsuario}>Cadastrar</button>
      </div>
    </div>
  )

}