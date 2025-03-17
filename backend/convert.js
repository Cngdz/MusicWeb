const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();

// Định nghĩa đường dẫn tệp SQLite
const databasePath = './src/assets/identifier.sqlite';
const jsonpath = './src/assets/songs.json';
// Đọc dữ liệu từ JSON
const jsonData = JSON.parse(fs.readFileSync(jsonpath, 'utf8')).songs;

// Kết nối với SQLite
const db = new sqlite3.Database(databasePath, (err) => {
    if (err) {
        console.error('❌ Lỗi kết nối SQLite:', err.message);
    } else {
        console.log('✅ Kết nối thành công với SQLite.');
    }
});

// Chèn dữ liệu vào bảng `songs`
db.serialize(() => {
    console.log('🚀 Đang nhập dữ liệu vào bảng songs...');

    const stmt = db.prepare(`
        INSERT OR REPLACE INTO songs (id, title, album, artist, source, image, duration, favorite, counter, replay)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    jsonData.forEach(song => {
        // Kiểm tra giá trị NOT NULL
        if (!song.title || !song.source) {
            console.warn(`⚠️ Bỏ qua bài hát (id: ${song.id}) do thiếu dữ liệu bắt buộc.`);
            return;  // Bỏ qua bài hát này
        }

        // Chuyển favorite từ "true"/"false" → 1/0
        const favoriteValue = song.favorite === "true" ? 1 : 0;

        // Chèn dữ liệu vào database
        stmt.run(song.id, song.title, song.album, song.artist, song.source, song.image, song.duration, favoriteValue, song.counter, song.replay);
    });

    stmt.finalize(() => {
        console.log('✅ Dữ liệu đã được nhập thành công!');
    });
});

// Đóng kết nối SQLite
db.close((err) => {
    if (err) {
        console.error('❌ Lỗi khi đóng kết nối:', err.message);
    } else {
        console.log('🔒 Đóng kết nối SQLite thành công.');
    }
});
