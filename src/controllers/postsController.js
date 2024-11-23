import { createPost, getAllPosts, updatePost } from '../models/postModel.js'
import fs from 'fs'
import generateDescriptionWithGemini from '../services/geminiService.js'

export async function listPosts(req, res) {
  const posts = await getAllPosts()
  res.status(200).json(posts)
}

export async function postNewPost(req, res) {
  const newPost = req.body
  try {
    const createdPost = await createPost(newPost)
    res.status(200).json(createdPost)
  } catch (error) {
    console.error(error.message)
    res.status(500).json({ Error: 'Request failed' })
  }
}

export async function uploadImage(req, res) {
  const newPost = {
    description: '',
    imgUrl: req.file.originalname,
    alt: '',
  }

  try {
    const createdPost = await createPost(newPost)
    const updatedImage = `uploads/${createdPost.insertedId}.png`
    fs.renameSync(req.file.path, updatedImage)
    res.status(200).json(createdPost)
  } catch (error) {
    console.error(error.message)
    res.status(500).json({ Erro: 'Request failed' })
  }
}

export async function updateNewPost(req, res) {
  const id = req.params.id
  const imageUrl = `http://localhost:3000/${id}.png`

  try {
    const imgBuffer = fs.readFileSync(`uploads/${id}.png`)
    const description = await generateDescriptionWithGemini(imgBuffer)
    const post = {
      imgUrl: imageUrl,
      description: description,
      alt: req.body.alt,
    }

    const createdPost = await updatePost(id, post)
    res.status(200).json(createdPost)
  } catch (error) {
    console.error(error.message)
    res.status(500).json({ Error: 'Request failed' })
  }
}
