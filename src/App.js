import { useState} from 'react'
import { db } from './firebaseConnection'
import { doc, setDoc, collection, addDoc, getDoc, getDocs } from 'firebase/firestore'
import './app.css'
import { async } from '@firebase/util'

export default function App(){
  const [titulo, setTitulo] = useState('')
  const [autor, setAutor] = useState('')

  const [posts, setPosts] = useState([])

  async function handleAdd(){
    // await setDoc(doc(db, "posts", "12345"), {
    //   titulo: titulo,
    //   autor: autor,
    // })
    // .then(() => {
    //   console.log('Dados registrados no banco!')
    // })
    // .catch((error) => {
    //   console.log('Gerou erro ' + error)
    // })

    await addDoc(collection(db, 'posts'), {
      titulo: titulo,
      autor: autor,
    })
    .then(() => {
      console.log('Cadastrado com sucesso!')
      setAutor('')
      setTitulo('')
    })
    .catch((error) => {
      console.log('Erro: ' + error)
    })

  }

  async function buscarPost(){
    // const postRef = doc(db, 'posts', '6yXy8DN6Q99JGCCYoy0v')

    // await getDoc(postRef)
    // .then((snapshot) => {
    //   setAutor(snapshot.data().autor)
    //   setTitulo(snapshot.data().titulo)
    // })
    // .catch(() => {
    //   console.log('Erro ao buscar!')
    // })

    const postRef = collection(db, 'posts')
    await getDocs(postRef)
    .then((dadosDoBanco) => {
      let lista = []

      dadosDoBanco.forEach((doc) => {
        lista.push({
          id: doc.id,
          titulo: doc.data().titulo,
          autor: doc.data().autor,
        })
      })

      setPosts(lista)
    })
    .catch((error) => {
      console.log(error + ' Erro ao realizar a busca')
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
        <button onClick={buscarPost}>Buscar</button>

        <ul>
          {posts.map((post) => {
            return(
              <li key={post.id}>
                <span>Título: {post.titulo}</span> <br/>
                <span>Autor: {post.autor}</span> <br/>
              </li>
            )
          })}
        </ul>

      </div>
    </div>
  )
}