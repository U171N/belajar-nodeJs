const http = require('http');
const fs = require('fs');
const path = require('path');

// Membuat server HTTP
const server = http.createServer((request, response) => {
    // Parse permintaan yang berisi nama file
    const pathname = path.join(__dirname, request.url);

    // Mencetak informasi permintaan yang diterima
    console.log("Permintaan untuk " + pathname + " diterima.");

    // Memeriksa apakah file yang diminta ada
    fs.stat(pathname, (err, stats) => {
        if (err) {
            console.error(err);

            // HTTP Status: 404 - Tidak Ditemukan
            response.writeHead(404, { 'Content-Type': 'text/html' });
            response.end('404 Tidak Ditemukan');
        } else {
            if (stats.isDirectory()) {
                // Jika itu adalah direktori, tambahkan 'index.htm' ke jalur
                const indexPath = path.join(pathname, 'index.htm');

                fs.stat(indexPath, (err, indexStats) => {
                    if (err) {
                        console.error(err);

                        // HTTP Status: 404 - Tidak Ditemukan
                        response.writeHead(404, { 'Content-Type': 'text/html' });
                        response.end('404 Tidak Ditemukan');
                    } else {
                        // Baca file 'index.htm' dan kirim sebagai respons
                        fs.readFile(indexPath, (err, data) => {
                            if (err) {
                                console.error(err);

                                // HTTP Status: 500 - Kesalahan Internal Server
                                response.writeHead(500, { 'Content-Type': 'text/html' });
                                response.end('500 Kesalahan Internal Server');
                            } else {
                                // Tentukan Content Type berdasarkan ekstensi file
                                const extname = path.extname(indexPath);
                                let contentType = 'text/html';

                                if (extname === '.js') {
                                    contentType = 'text/javascript';
                                } else if (extname === '.css') {
                                    contentType = 'text/css';
                                }

                                // HTTP Status: 200 - OK
                                response.writeHead(200, { 'Content-Type': contentType });
                                response.end(data);
                            }
                        });
                    }
                });
            } else {
                // Baca file yang diminta dan kirim sebagai respons
                fs.readFile(pathname, (err, data) => {
                    if (err) {
                        console.error(err);

                        // HTTP Status: 500 - Kesalahan Internal Server
                        response.writeHead(500, { 'Content-Type': 'text/html' });
                        response.end('500 Kesalahan Internal Server');
                    } else {
                        // Tentukan Content Type berdasarkan ekstensi file
                        const extname = path.extname(pathname);
                        let contentType = 'text/html';

                        if (extname === '.js') {
                            contentType = 'text/javascript';
                        } else if (extname === '.css') {
                            contentType = 'text/css';
                        }

                        // HTTP Status: 200 - OK
                        response.writeHead(200, { 'Content-Type': contentType });
                        response.end(data);
                    }
                });
            }
        }
    });
});

const port = 8081;
server.listen(port, () => {
    console.log(`Server berjalan di port ${port}`);
});
