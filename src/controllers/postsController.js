import { createPost, getAllPosts } from '../models/postModel.js'
import fs from 'fs'

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
