console.log("=== BÀI TẬP QUẢN LÝ POSTS VÀ COMMENTS (IN-MEMORY) ===\n");

// ==================== DATA STORAGE ====================

// Lưu trữ dữ liệu trong memory
let posts = [];
let comments = [];

// ==================== UTILITY FUNCTIONS ====================

// Hàm lấy ID tự tăng cho Posts
function getNextPostId() {
    if (posts.length === 0) {
        return "1";
    }
    const maxId = Math.max(...posts.map(p => parseInt(p.id) || 0));
    return String(maxId + 1);
}

// Hàm lấy ID tự tăng cho Comments
function getNextCommentId() {
    if (comments.length === 0) {
        return "1";
    }
    const maxId = Math.max(...comments.map(c => parseInt(c.id) || 0));
    return String(maxId + 1);
}

// ==================== POST CRUD OPERATIONS ====================

// CREATE - Tạo post mới
function createPost(title, content, author) {
    const id = getNextPostId();
    const newPost = {
        id: id,
        title: title,
        content: content,
        author: author,
        createdAt: new Date().toISOString(),
        isDeleted: false
    };

    posts.push(newPost);
    console.log(`✓ Đã tạo post mới với ID: ${newPost.id}`);
    return newPost;
}

// READ - Đọc tất cả posts (bao gồm cả posts bị xóa mềm)
function getAllPosts(includeDeleted = true) {
    if (includeDeleted) {
        return [...posts];
    }
    return posts.filter(p => !p.isDeleted);
}

// READ - Đọc post theo ID
function getPostById(id) {
    return posts.find(p => p.id === id) || null;
}

// UPDATE - Cập nhật post
function updatePost(id, title, content, author) {
    const postIndex = posts.findIndex(p => p.id === id);
    if (postIndex === -1) {
        console.log(`✗ Không tìm thấy post với ID: ${id}`);
        return null;
    }

    const post = posts[postIndex];
    if (post.isDeleted) {
        console.log(`✗ Không thể cập nhật post đã bị xóa (ID: ${id})`);
        return null;
    }

    if (title !== undefined) post.title = title;
    if (content !== undefined) post.content = content;
    if (author !== undefined) post.author = author;

    console.log(`✓ Đã cập nhật post ID: ${id}`);
    return post;
}

// DELETE - Xóa mềm post (soft delete)
function deletePost(id) {
    const post = getPostById(id);
    if (!post) {
        console.log(`✗ Không tìm thấy post với ID: ${id}`);
        return false;
    }

    post.isDeleted = true;
    console.log(`✓ Đã xóa mềm post ID: ${id}`);
    return true;
}

// RESTORE - Khôi phục post đã xóa mềm
function restorePost(id) {
    const post = getPostById(id);
    if (!post) {
        console.log(`✗ Không tìm thấy post với ID: ${id}`);
        return false;
    }

    post.isDeleted = false;
    console.log(`✓ Đã khôi phục post ID: ${id}`);
    return true;
}

// ==================== COMMENT CRUD OPERATIONS ====================

// CREATE - Tạo comment mới
function createComment(postId, content, author) {
    // Kiểm tra post có tồn tại và chưa bị xóa không
    const post = getPostById(postId);
    if (!post) {
        console.log(`✗ Không tìm thấy post với ID: ${postId}`);
        return null;
    }
    if (post.isDeleted) {
        console.log(`✗ Không thể comment vào post đã bị xóa (ID: ${postId})`);
        return null;
    }

    const id = getNextCommentId();
    const newComment = {
        id: id,
        postId: postId,
        content: content,
        author: author,
        createdAt: new Date().toISOString()
    };

    comments.push(newComment);
    console.log(`✓ Đã tạo comment mới với ID: ${newComment.id} cho post ID: ${postId}`);
    return newComment;
}

// READ - Đọc tất cả comments
function getAllComments() {
    return [...comments];
}

// READ - Đọc comments theo postId
function getCommentsByPostId(postId) {
    return comments.filter(c => c.postId === postId);
}

// READ - Đọc comment theo ID
function getCommentById(id) {
    return comments.find(c => c.id === id) || null;
}

// UPDATE - Cập nhật comment
function updateComment(id, content, author) {
    const commentIndex = comments.findIndex(c => c.id === id);
    if (commentIndex === -1) {
        console.log(`✗ Không tìm thấy comment với ID: ${id}`);
        return null;
    }

    const comment = comments[commentIndex];

    // Kiểm tra post của comment có bị xóa không
    const post = getPostById(comment.postId);
    if (post && post.isDeleted) {
        console.log(`✗ Không thể cập nhật comment của post đã bị xóa`);
        return null;
    }

    if (content !== undefined) comment.content = content;
    if (author !== undefined) comment.author = author;

    console.log(`✓ Đã cập nhật comment ID: ${id}`);
    return comment;
}

// DELETE - Xóa cứng comment (hard delete)
function deleteComment(id) {
    const commentIndex = comments.findIndex(c => c.id === id);
    if (commentIndex === -1) {
        console.log(`✗ Không tìm thấy comment với ID: ${id}`);
        return false;
    }

    comments.splice(commentIndex, 1);
    console.log(`✓ Đã xóa comment ID: ${id}`);
    return true;
}

// ==================== DISPLAY FUNCTIONS ====================

// Hiển thị post với định dạng đặc biệt cho posts bị xóa mềm
function displayPost(post) {
    if (post.isDeleted) {
        // Hiển thị với gạch ngang cho posts bị xóa mềm
        console.log(`  [ĐÃ XÓA] ~~${post.title}~~`);
        console.log(`  ~~${post.content}~~`);
        console.log(`  Tác giả: ~~${post.author}~~ | ID: ${post.id} | Ngày tạo: ${post.createdAt}`);
    } else {
        console.log(`  ${post.title}`);
        console.log(`  ${post.content}`);
        console.log(`  Tác giả: ${post.author} | ID: ${post.id} | Ngày tạo: ${post.createdAt}`);
    }
}

// Hiển thị tất cả posts (bao gồm cả posts bị xóa mềm)
function displayAllPosts(includeDeleted = true) {
    const postsToDisplay = getAllPosts(includeDeleted);

    console.log(`\n=== DANH SÁCH POSTS ${includeDeleted ? '(Bao gồm đã xóa)' : '(Chưa xóa)'} ===`);
    if (postsToDisplay.length === 0) {
        console.log("  (Không có post nào)");
        return;
    }

    for (let index = 0; index < postsToDisplay.length; index++) {
        const post = postsToDisplay[index];
        console.log(`\nPost ${index + 1}:`);
        displayPost(post);

        // Hiển thị comments của post này
        const postComments = getCommentsByPostId(post.id);
        if (postComments.length > 0) {
            console.log(`  Comments (${postComments.length}):`);
            postComments.forEach((comment, cIndex) => {
                console.log(`    ${cIndex + 1}. [${comment.author}]: ${comment.content} (ID: ${comment.id})`);
            });
        }
    }
}

// Hiển thị comment
function displayComment(comment) {
    console.log(`  [${comment.author}]: ${comment.content}`);
    console.log(`  ID: ${comment.id} | Post ID: ${comment.postId} | Ngày tạo: ${comment.createdAt}`);
}

// ==================== DEMO & TEST ====================

function main() {
    console.log("=== KHỞI TẠO DỮ LIỆU MẪU ===\n");

    // Tạo một số posts mẫu
    const post1 = createPost("Chào mừng đến với Node.js", "Đây là bài viết đầu tiên về Node.js", "Admin");
    const post2 = createPost("Hướng dẫn JavaScript cơ bản", "JavaScript là ngôn ngữ lập trình phổ biến", "Teacher");
    const post3 = createPost("Làm việc với Arrays", "Arrays trong JavaScript rất mạnh mẽ", "Student");

    // Tạo một số comments mẫu
    createComment("1", "Bài viết rất hay!", "User1");
    createComment("1", "Cảm ơn bạn đã chia sẻ", "User2");
    createComment("2", "Tôi đã học được nhiều điều", "User3");
    createComment("2", "Cần thêm ví dụ thực tế", "User4");
    createComment("3", "Arrays thật sự rất hữu ích", "User1");

    console.log("\n=== HIỂN THỊ TẤT CẢ POSTS (Bao gồm đã xóa) ===");
    displayAllPosts(true);

    console.log("\n=== TEST XÓA MỀM POST ===");
    deletePost("2");
    console.log("\nSau khi xóa mềm post ID 2:");
    displayAllPosts(true);

    console.log("\n=== TEST CẬP NHẬT POST ===");
    updatePost("1", "Chào mừng đến với Node.js (Đã cập nhật)", "Nội dung đã được cập nhật", "Admin");

    console.log("\n=== TEST TẠO COMMENT MỚI ===");
    createComment("1", "Comment mới sau khi cập nhật post", "User5");

    console.log("\n=== TEST CẬP NHẬT COMMENT ===");
    updateComment("1", "Bài viết rất hay! (Đã chỉnh sửa)", "User1");

    console.log("\n=== TEST XÓA COMMENT ===");
    deleteComment("2");

    console.log("\n=== HIỂN THỊ POSTS SAU CÁC THAO TÁC ===");
    displayAllPosts(true);

    console.log("\n=== HIỂN THỊ CHỈ POSTS CHƯA XÓA ===");
    displayAllPosts(false);

    console.log("\n=== TEST KHÔI PHỤC POST ===");
    restorePost("2");
    console.log("\nSau khi khôi phục post ID 2:");
    displayAllPosts(true);

    console.log("\n=== TEST TẠO POST MỚI (ID tự tăng) ===");
    const post4 = createPost("Bài viết mới nhất", "Nội dung bài viết mới", "Author");
    displayAllPosts(true);

    console.log("\n=== TEST TẠO COMMENT CHO POST MỚI ===");
    createComment("4", "Comment đầu tiên cho post mới", "User6");
    displayAllPosts(true);

    console.log("\n=== TỔNG KẾT ===");
    const allPosts = getAllPosts(true);
    const allComments = getAllComments();
    console.log(`Tổng số posts: ${allPosts.length}`);
    console.log(`Posts chưa xóa: ${allPosts.filter(p => !p.isDeleted).length}`);
    console.log(`Posts đã xóa mềm: ${allPosts.filter(p => p.isDeleted).length}`);
    console.log(`Tổng số comments: ${allComments.length}`);
}

// Chạy chương trình
main();
