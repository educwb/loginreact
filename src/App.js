import { useState, useEffect} from 'react'
import { db } from './firebaseConnection'
import { 
  doc, 
  setDoc, 
  collection, 
  addDoc, 
  getDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  onSnapshot 
} from 'firebase/firestore'

import './app.css'
import { async } from '@firebase/util'

export default function App(){
  const [titulo, setTitulo] = useState('')
  const [autor, setAutor] = useState('')
  const [idPost, setIdPost] = useState('')

  const [posts, setPosts] = useState([])

  useEffect(() => {
    async function refreshPosts(){ // o nome usado pelo Matheus é loadPosts
      const unsub = onSnapshot(collection(db, 'posts'), (dadosDoBanco) => {
        let listaPost = []

        dadosDoBanco.forEach((doc) => {
          listaPost.push({
            id: doc.id,
            titulo: doc.data().titulo,
            autor: doc.data().autor,
          })
        })

        setPosts(listaPost)
      })
    }

    refreshPosts()
  }, [])

  async function handleAdd(){
    // // PARA GRAVAR O ID MANUALMENTE
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
    // // PARA BUSCAR UM ÚNICO REGISTRO
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

  async function editarPost(){
    const docRef = doc(db, 'posts', idPost)

    await updateDoc(docRef, {
      titulo: titulo,
      autor: autor
    })
    .then(() => {
      console.log('Post atualizado!')
      setIdPost('')
      setTitulo('')
      setAutor('')
    })
    .catch((error) => {
      console.log('Error ao atualizar: ' + error)
    })

  }

  async function excluirPost(id){
    const docRef = doc(db, 'posts', id)
    await deleteDoc(docRef)
    .then(() => {
      console.log(`Post ${id} deletado com sucesso`)
    })
    .catch((error) => {
      console.log('Erro ao deletar: ' + error)
    })
  }
  
  async function carregarPost(id){
    const docRef = doc(db, 'posts', id)
    await getDoc(docRef)
    .then((dadosDoBanco) => {
      console.log(`Post ${id} carregado com sucesso`)
      setIdPost(dadosDoBanco.id)
      setTitulo(dadosDoBanco.data().titulo)
      setAutor(dadosDoBanco.data().autor)
    })
    .catch((error) => {
      console.log('Erro ao carregar: ' + error)
    })
  }
  
  return(
    <div>
      <h1>Login RLGouvea</h1>

      <div className='container'>

        <label>ID do Post:</label>
        <input 
          type="text" 
          placeholder='Digite o ID do post'
          value={idPost}
          onChange={ (e) => setIdPost(e.target.value)}
        /><br/>

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
        <button onClick={buscarPost}>Buscar</button> <br/>

        <button onClick={editarPost}>Atualizar post</button>

        <ul>
          {posts.map((post) => {
            return(
              <li key={post.id}>
                <strong>ID: {post.id}</strong> <br/>
                <span>Título: {post.titulo}</span> <br/>
                <span>Autor: {post.autor}</span> <br/>
                <button onClick={() => carregarPost(post.id) }>Editar</button> 
                <button onClick={() => excluirPost(post.id) }>Excluir</button> <br/><br/>
              </li>
            )
          })}
        </ul>

      </div>
    </div>
  )
}