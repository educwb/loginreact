import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleRegister(e){
    e.preventDefault()

    if(email !== '' && password !==''){
      alert('teste')
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
            autoComplete={false}
            type="password" 
            placeholder="******"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Registar</button>
        </form>

        <Link className="button-link" to="/">
          Já possui uma conta? Acesse aqui!
        </Link>
      </div>
    </div>
  )
}