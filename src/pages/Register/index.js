import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { auth } from '../../firebaseConnection'
import { createUserWithEmailAndPassword } from 'firebase/auth'

export default function Register(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  async function handleRegister(e){
    e.preventDefault()

    if(email !== '' && password !==''){
      await createUserWithEmailAndPassword(auth, email, password)
      .then((value) => {

        console.log('Cadastrado com sucesso!')

        navigate('/admin', { replace: true })
      })
      .catch((error) => {
        console.log('Erro ao cadastrar: ' + error)
  
        if(error.code === 'auth/weak-password'){
          alert('Senha precisa ter pelo menos 6 caracteres!')
        } else if(error.code === 'auth/email-already-in-use'){
          alert('Email já existe!')
        } else if(error.code === 'auth/invalid-email'){
          alert('Email inválido!')
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

        <span>CADASTRE-SE</span>

        <form className="form" onSubmit={handleRegister}>
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

          <button type="submit">Registrar</button>
        </form>

        <Link className="button-link" to="/">
          Já possui uma conta? Acesse aqui!
        </Link>
      </div>
    </div>
  )
}