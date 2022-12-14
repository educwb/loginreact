import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { auth } from '../../firebaseConnection'
import { signInWithEmailAndPassword } from 'firebase/auth'

import './home.css'

export default function Home(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  async function handleLogin(e){
    e.preventDefault()

    if(email !== '' && password !==''){
      
      await signInWithEmailAndPassword(auth, email, password)
      .then((value) => {
        console.log('Usuário logado com sucesso')
        
        // navegar para /admin
        navigate('/admin', { replace: true})
          
      })
      .catch((error) => {
        console.log('Erro ao logar: ' + error)
  
        if(error.code === 'auth/user-not-found'){
          alert('Usuário não cadastrado!')
        } else if(error.code === 'auth/wrong-password'){
          alert('Senha incorreta!')
        }
      })
    }else{
      alert('Preencha todos os campos!')
    }
  }

  return(
    <div className="home-container">
      <div className="box-form">

        <h1>Imobiliária RLGouvea</h1>

        <span>ACESSO AO SISTEMA</span>

        <form className="form" onSubmit={handleLogin}>
          <input 
            type="text" 
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input 
            type="password" 
            placeholder="******"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Acessar</button>
        </form>

        <Link className="button-link" to="/register">
          Não possui uma conta? Cadastre-se
        </Link>
      </div>
    </div>
  )
}