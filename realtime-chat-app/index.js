const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Menyajikan file statis (misalnya: CSS, JavaScript, gambar) dari direktori saat ini.
app.use(express.static(__dirname));

// Menetapkan route untuk URL utama ('/') dan mengirimkan file 'index.html' sebagai respons.
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Mengatur koneksi Socket.io dan menangani pesan chat.
io.on('connection', (socket) => {
  console.log('User terhubung'); // Pesan saat pengguna terhubung.

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg); // Mengirim pesan chat ke semua klien yang terhubung.
  });

  socket.on('disconnect', () => {
    console.log('User terputus'); // Pesan saat pengguna terputus.
  });
});

// Mendengarkan server pada port 3000 dan mencetak pesan saat server berjalan.
server.listen(3000, () => {
  console.log('Server berjalan pada port 3000');
});
