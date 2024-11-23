import express from 'express'
import {
  listPosts,
  postNewPost,
  updateNewPost,
  uploadImage,
} from '../controllers/postsController.js'
import multer from 'multer'
import cors from 'cors'

const corsOptions = {
  origin: 'http://localhost:8000',
  optionsSuccessStatus: 200,
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  },
})

const upload = multer({ dest: './uploads', storage })

const routes = (app) => {
  app.use(express.json())
  app.use(cors(corsOptions))

  app.get('/posts', listPosts)
  app.post('/posts', postNewPost)
  app.post('/upload', upload.single('image'), uploadImage)
  app.put('/upload/:id', updateNewPost)
}

export default routes
