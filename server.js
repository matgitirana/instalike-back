import express from 'express'

const posts = [
  {
    id: 1,
    description: 'Uma foto teste',
    image: 'https://placecats.com/millie/300/150',
  },
  {
    id: 2,
    description: 'Gato brincando com um novelo de lã',
    image: 'https://placekitten.com/400/200',
  },
  {
    id: 3,
    description: 'Paisagem de um pôr do sol',
    image: 'https://source.unsplash.com/random/400x300/?sunset',
  },
  {
    id: 4,
    description: 'Cachorro correndo na praia',
    image: 'https://source.unsplash.com/random/400x300/?dog,beach',
  },
  {
    id: 5,
    description: 'Comida deliciosa',
    image: 'https://source.unsplash.com/random/400x300/?food',
  },
  {
    id: 6,
    description: 'Montanha nevando',
    image: 'https://source.unsplash.com/random/400x300/?mountain,snow',
  },
  {
    id: 7,
    description: 'Cidade à noite',
    image: 'https://source.unsplash.com/random/400x300/?city,night',
  },
]

const app = express()
app.use(express.json())

app.listen(3000, () => {
  console.log('Server listening...')
})

app.get('/posts', (req, res) => {
  res.status(200).json(posts)
})

function getPostById(id) {
  return posts.find((post) => post.id === Number(id))
}

app.get('/posts/:id', (req, res) => {
  const post = getPostById(req.params.id)
  res.status(200).json(post)
})
