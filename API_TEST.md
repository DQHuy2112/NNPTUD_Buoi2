# API Test - json-server

Sau khi chạy `npm install` và `npm run server`, API chạy tại: **http://localhost:3000**

---

## Khởi động server

```bash
npm install
npm run server
```

---

## Posts API

| Method | Endpoint | Mô tả |
|--------|----------|--------|
| GET | `/posts` | Lấy tất cả posts |
| GET | `/posts/:id` | Lấy post theo ID |
| POST | `/posts` | Tạo post mới |
| PUT | `/posts/:id` | Cập nhật post |
| PATCH | `/posts/:id` | Cập nhật một phần post |
| DELETE | `/posts/:id` | Xóa post |

### Ví dụ test (curl)

**GET tất cả posts**
```bash
curl http://localhost:3000/posts
```

**GET post theo ID**
```bash
curl http://localhost:3000/posts/1
```

**POST tạo post mới**
```bash
curl -X POST http://localhost:3000/posts -H "Content-Type: application/json" -d "{\"title\":\"Bài mới\",\"content\":\"Nội dung\",\"author\":\"Admin\",\"createdAt\":\"2026-01-26T10:00:00.000Z\",\"isDeleted\":false}"
```

**PUT cập nhật post**
```bash
curl -X PUT http://localhost:3000/posts/1 -H "Content-Type: application/json" -d "{\"id\":\"1\",\"title\":\"Tiêu đề đã sửa\",\"content\":\"Nội dung\",\"author\":\"Admin\",\"createdAt\":\"2026-01-26T08:00:00.000Z\",\"isDeleted\":false}"
```

**DELETE post**
```bash
curl -X DELETE http://localhost:3000/posts/1
```

---

## Comments API

| Method | Endpoint | Mô tả |
|--------|----------|--------|
| GET | `/comments` | Lấy tất cả comments |
| GET | `/comments/:id` | Lấy comment theo ID |
| GET | `/comments?postId=1` | Lấy comments theo postId |
| POST | `/comments` | Tạo comment mới |
| PUT | `/comments/:id` | Cập nhật comment |
| PATCH | `/comments/:id` | Cập nhật một phần comment |
| DELETE | `/comments/:id` | Xóa comment |

### Ví dụ test (curl)

**GET tất cả comments**
```bash
curl http://localhost:3000/comments
```

**GET comments theo postId**
```bash
curl "http://localhost:3000/comments?postId=1"
```

**GET comment theo ID**
```bash
curl http://localhost:3000/comments/1
```

**POST tạo comment mới**
```bash
curl -X POST http://localhost:3000/comments -H "Content-Type: application/json" -d "{\"postId\":\"1\",\"content\":\"Comment mới\",\"author\":\"User1\",\"createdAt\":\"2026-01-26T10:00:00.000Z\"}"
```

**PUT cập nhật comment**
```bash
curl -X PUT http://localhost:3000/comments/1 -H "Content-Type: application/json" -d "{\"id\":\"1\",\"postId\":\"1\",\"content\":\"Đã chỉnh sửa\",\"author\":\"User1\",\"createdAt\":\"2026-01-26T08:15:00.000Z\"}"
```

**DELETE comment**
```bash
curl -X DELETE http://localhost:3000/comments/1
```

---

## Lọc & phân trang (json-server mặc định)

**Lọc:** `?_field=value`  
Ví dụ: `GET /posts?author=Admin`

**Sắp xếp:** `?_sort=field&_order=asc|desc`  
Ví dụ: `GET /posts?_sort=createdAt&_order=desc`

**Phân trang:** `?_page=1&_limit=10`  
Ví dụ: `GET /posts?_page=1&_limit=5`

**Tìm kiếm:** `?q=keyword`  
Ví dụ: `GET /posts?q=Node`

---

## Kiểm tra nhanh

- Mở trình duyệt: http://localhost:3000/posts  
- Hoặc: http://localhost:3000/comments  
