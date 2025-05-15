// server.js
import express from 'express'
import { Low } from 'lowdb'
import { Memory } from 'lowdb'

// Tạo app express
const app = express()
app.use(express.json())

// Khởi tạo database trong bộ nhớ (RAM)
const adapter = new Memory()
const db = new Low(adapter)

// Đọc dữ liệu (trong RAM, không cần file)
await db.read()

// Nếu chưa có dữ liệu, set dữ liệu mặc định
db.data ||= {
  posts: [],
  users: []
}

// Một số route mẫu
app.get('/posts', (req, res) => {
  res.json(db.data.posts)
})

app.post('/posts', (req, res) => {
  const newPost = req.body
  db.data.posts.push(newPost)
  db.write() // vẫn phải gọi để "cập nhật" trong RAM
  res.status(201).json(newPost)
})

// Khởi động server (dùng trong local dev hoặc API route nếu trong Next.js)
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
