import { useState } from 'react'
import { auth } from './firebaseConnection'
import'./app.css'

import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth'

export default function Login(){

  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  const [user, setUser] = useState(false)
  const [userDetail, setUserDetail] = useState({})

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

  async function logarUsuario(){
    await signInWithEmailAndPassword(auth, email, senha)
    .then((value) => {
      console.log('Usuário logado com sucesso')

      setUserDetail({
        uid: value.user.uid,
        email: value.user.email,
      })
      setUser(true)
      
      setEmail('')
      setSenha('')
    })
    .catch((error) => {
      console.log('Erro ao logar: ' + error)

      if(error.code === 'auth/user-not-found'){
        alert('Usuário não cadastrado!')
      } else if(error.code === 'auth/wrong-password'){
        alert('Senha incorreta!')
      }
    })
  }

  async function fazerLogout(){
    await signOut(auth)
    setUser(false)
    setUserDetail({})
  }

  return(
    <div>
      <h1>Login RLGouvea</h1>

      {
        user && (
          <div>
            <span>Email: {userDetail.email}</span> <br/>
            <button onClick={fazerLogout}>Sair</button>
            <br/> <br/>
          </div>
        )
      }

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

        <button onClick={novoUsuario}>Cadastrar</button> <br/>
        <button onClick={logarUsuario}>Entrar</button>
      </div>
    </div>
  )

}