# NNPTUD Buổi 1 & 2 - Bài tập Node.js

Dự án Node.js thực hành xử lý mảng Product objects và quản lý Posts/Comments.

## Cấu trúc dự án

```
NNPTUD_Buoi2/
├── src/
│   ├── baitap1.js      # File bài tập Buổi 1 - Product objects
│   └── baitap2.js      # File bài tập Buổi 2 - Posts & Comments
├── package.json        # Cấu hình dự án
├── .gitignore         # Git ignore file
└── README.md          # File hướng dẫn
```

## Yêu cầu

- Node.js (phiên bản 14 trở lên)

## Cài đặt

```bash
npm install
```

## Chạy chương trình

### Bài tập Buổi 1 (Product objects)

```bash
npm start
```

hoặc

```bash
node src/baitap1.js
```

### Bài tập Buổi 2 (Posts & Comments)

**Lưu ý**: Bài tập Buổi 2 sử dụng json-server để tạo REST API server. Bạn cần chạy server trước:

**Bước 1**: Khởi động json-server (chạy trong terminal riêng hoặc background)

```bash
npm run server
```

Server sẽ chạy tại: `http://localhost:3000`

**Bước 2**: Chạy chương trình (trong terminal khác)

```bash
npm run start:buoi2
```

hoặc

```bash
node src/baitap2.js
```

**Lưu ý**: Nếu server chưa chạy, chương trình sẽ hiển thị thông báo lỗi và hướng dẫn.

## Nội dung bài tập

### Buổi 1: Xử lý mảng Product objects

Bài tập bao gồm 10 câu yêu cầu xử lý mảng Product objects:

1. Khai báo constructor function Product
2. Khởi tạo mảng products với ít nhất 5 sản phẩm
3. Tạo mảng mới chỉ chứa name và price
4. Lọc sản phẩm còn hàng trong kho
5. Kiểm tra có sản phẩm giá > 30
6. Kiểm tra tất cả sản phẩm "Accessories" có đang bán
7. Tính tổng giá trị kho hàng
8. Duyệt mảng bằng for...of
9. Duyệt object bằng for...in
10. Lấy danh sách sản phẩm đang bán và còn hàng

### Buổi 2: Quản lý Posts và Comments

Bài tập thực hiện các chức năng CRUD cho Posts và Comments:

#### Tính năng chính:

1. **Xóa mềm (Soft Delete)**: 
   - Posts sử dụng xóa mềm bằng cách đặt `isDeleted: true`
   - Comments sử dụng xóa cứng (hard delete)

2. **ID tự tăng**: 
   - ID tự động tăng dựa trên `maxId + 1`
   - Khi tạo mới, ID có thể bỏ trống, hệ thống sẽ tự động gán
   - ID lưu trong CSDL là chuỗi (string)

3. **Hiển thị posts bị xóa mềm**: 
   - Posts bị xóa mềm được hiển thị với gạch ngang (`~~text~~`)
   - Có nhãn `[ĐÃ XÓA]` để dễ nhận biết

4. **CRUD Operations cho Posts**:
   - **Create**: Tạo post mới với ID tự tăng
   - **Read**: Đọc tất cả posts hoặc theo ID, có thể lọc posts đã xóa
   - **Update**: Cập nhật thông tin post (không thể cập nhật post đã xóa)
   - **Delete**: Xóa mềm post (đặt `isDeleted = true`)
   - **Restore**: Khôi phục post đã xóa mềm

5. **CRUD Operations cho Comments**:
   - **Create**: Tạo comment mới với ID tự tăng (kiểm tra post tồn tại và chưa bị xóa)
   - **Read**: Đọc tất cả comments hoặc theo postId, commentId
   - **Update**: Cập nhật thông tin comment (không thể cập nhật comment của post đã xóa)
   - **Delete**: Xóa cứng comment (xóa khỏi mảng)

#### Sử dụng JSON-Server:

Bài tập Buổi 2 sử dụng **json-server** để tạo REST API server ảo:
- Dữ liệu được lưu trong file `db.json`
- Server chạy tại `http://localhost:3000`
- Tất cả các thao tác CRUD được thực hiện thông qua HTTP requests (GET, POST, PUT, DELETE)
- Dữ liệu được tự động lưu vào `db.json` khi có thay đổi
