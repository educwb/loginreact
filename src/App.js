import { useState} from 'react'
import { db } from './firebaseConnection'
import { doc, setDoc } from 'firebase/firestore'
import './app.css'

export default function App(){
  const [titulo, setTitulo] = useState('')
  const [autor, setAutor] = useState('')

  async function handleAdd(){
    await setDoc(doc(db, "posts", "12345"), {
      titulo: titulo,
      autor: autor,
    })
    .then(() => {
      console.log('Dados registrados no banco!')
    })
    .catch((error) => {
      console.log('Gerou erro ' + error)
    })
  }

  return(
    <div>
      <h1>Login RLGouvea</h1>

      <div className='container'>
        <label>Título:</label>
        <textarea 
          type='text'
          placeholder='Digite o título'
          value={titulo}
          onChange={ (e) => setTitulo(e.target.value)}
        />

        <label>Autor:</label>
        <input 
          type="text" 
          placeholder='Autor do post'
          value={autor}
          onChange={ (e) => setAutor(e.target.value)}
        />

        <button onClick={handleAdd}>Cadastrar</button>

      </div>
    </div>
  )
}