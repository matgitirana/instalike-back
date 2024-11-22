import connectToDatabase from '../config/dbConfig.js'

const connection = await connectToDatabase(process.env.CONNECTION_STRING)

export async function getAllPosts() {
  const db = connection.db('imersao-instabytes')
  const collection = db.collection('posts')
  return collection.find().toArray()
}

export async function createPost(newPost) {
  const db = connection.db('imersao-instabytes')
  const collection = db.collection('posts')
  return collection.insertOne(newPost)
}
