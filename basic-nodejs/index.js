var fs = require('fs');
var data =fs.readFileSync('tes.txt');


/* Materi tentang Konsep Callback
*/
//cara ke.1
console.log(data.toString()); //membaca isi file dari file tes.txt menjadi string
console.log('program berakhir');


//cara ke2(dengan menambahkan exception untuk antisipasi error)
fs.readFile('tes.txt',function(err,data){
    if(err) return console.error(err);
    console.log(data.toString()); //membaca isi file dari tes.txt menjadi string
})
console.log('akhir bab tentang Callback Concept');
// /*akhir materi tentang Konsep Callback */



/*Materi tentang Event loop 

**Alur Event Loop secara Singkat:**
1. Inisialisasi dan pemrosesan modul.
2. Eksekusi kode JavaScript utama secara synchronous.
3. Operasi asinkron dikirimkan ke sistem operasi atau lingkungan runtime.
4. Callback yang sesuai ditempatkan dalam antrian "Callback Queue" setelah operasi asinkron selesai.
5. Event Loop terus memeriksa antrian "Callback Queue".
6. Jika ada callback yang tersedia, Event Loop menjalankannya.
7. Pemrosesan tugas mikro dari "Microtask Queue" (jika ada).
8. Pengulangan terus berlanjut, menjalankan kode, memeriksa callback, dan menangani tugas mikro sesuai kebutuhan.


Event Loop digunakan dalam Node.js dan lingkungan JavaScript lainnya ketika Anda perlu mengatasi tugas-tugas yang bersifat asinkron dan non-blok dalam aplikasi Anda. Di bawah ini adalah beberapa situasi di mana Anda perlu menggunakan Event Loop:

1. **Operasi I/O Lambat**: Ketika Anda perlu melakukan operasi masukan/keluaran (I/O) yang mungkin memakan waktu, seperti membaca atau menulis file, membuat permintaan jaringan (HTTP, database, dll.), atau berinteraksi dengan perangkat keras (misalnya, sensor), Anda harus menggunakan Event Loop. Event Loop akan memungkinkan aplikasi Anda untuk melanjutkan menjalankan kode lain sambil menunggu hasil operasi I/O.

2. **Server Web**: Ketika Anda mengembangkan aplikasi server web menggunakan Node.js, Event Loop sangat berguna. Ini memungkinkan server Anda untuk melayani banyak klien secara bersamaan tanpa memblokir. Ketika ada permintaan HTTP dari klien, server Anda dapat menangani permintaan tersebut secara asinkron, menjalankan callback untuk setiap permintaan yang masuk, dan tetap responsif terhadap permintaan lainnya.

3. **Aplikasi Real-Time**: Jika Anda mengembangkan aplikasi real-time seperti aplikasi chat, game, atau alat kolaborasi yang memerlukan pembaruan cepat dan responsif, Event Loop sangat berguna. Anda dapat menggunakan event-driven programming untuk menangani peristiwa dan pembaruan secara efisien.

4. **Penggunaan Promises**: Dengan pengenalan Promises dan async/await di JavaScript, Event Loop dapat digunakan untuk mengelola pemrosesan tugas-tugas yang bersifat asinkron dengan lebih terstruktur dan mudah dibaca. Anda dapat menggunakan Promise.all atau Promise.race untuk mengkoordinasikan beberapa tugas asinkron sekaligus.

5. **Interaksi Dengan Basis Data**: Ketika berinteraksi dengan database yang bekerja secara asinkron (seperti MongoDB atau MySQL dengan koneksi non-blok), Anda akan menggunakan Event Loop. Ini memungkinkan Anda untuk menjalankan kueri, mendapatkan hasilnya secara asinkron, dan menangani responsnya dengan baik.

6. **Aplikasi Berorientasi Kejadian (Event-Driven)**: Ketika Anda mengembangkan aplikasi yang merespons peristiwa atau sinyal tertentu, seperti mengontrol perangkat keras (IoT), pembacaan sensor, atau sistem kontrol industri, Event Loop adalah pilihan yang tepat.

Jadi, secara umum, Anda menggunakan Event Loop ketika Anda perlu mengatasi tugas-tugas yang bersifat asinkron dan non-blok dalam aplikasi Anda, sehingga memungkinkan aplikasi Anda tetap responsif dan efisien dalam menangani banyak operasi secara bersamaan. Event Loop adalah salah satu aspek kunci yang membuat Node.js sangat kuat dalam menghadapi tugas-tugas seperti ini.


Dengan menggunakan Event Loop, Node.js dapat mengatasi tugas-tugas yang bersifat asinkron dengan efisien, sehingga membuat aplikasi tetap responsif dan non-blok, yang sangat berguna dalam pengembangan aplikasi server dan real-time.

*/

// Import events module
var events = require('events');

// Create an eventEmitter object
var eventEmitter = new events.EventEmitter();

// Create an event handler as follows
var connectHandler = function connected() {
   console.log('connection succesful.');

   // Fire the data_received event
   eventEmitter.emit('data_received');
}

// Bind the connection event with the handler
eventEmitter.on('connection', connectHandler);

// Bind the data_received event with the anonymous function
eventEmitter.on('data_received', function() {
   console.log('data received succesfully.');
});

// Fire the connection event
eventEmitter.emit('connection');

console.log("Program Ended.");

console.log('Akhir Bab Event Loop');

/*Akhir bab Event Loop */


/*Materi tentang EventEmitter

 konsep `EventEmitter` di Node.js memiliki kesamaan dengan `eventListener` dalam JavaScript DOM (Document Object Model), meskipun ada perbedaan dalam konteks penggunaannya:

1. **Kesamaan**:
   - Baik `EventEmitter` di Node.js maupun `eventListener` di JavaScript DOM digunakan untuk menangani peristiwa (events).
   - Keduanya memungkinkan Anda untuk mendaftarkan fungsi-fungsi (listener) yang akan dipanggil saat peristiwa tertentu terjadi.
   - Mereka memisahkan logika pemrosesan peristiwa dari kode utama aplikasi, sehingga memungkinkan manajemen peristiwa yang lebih terstruktur.

2. **Perbedaan**:
   - `EventEmitter` adalah modul yang tersedia di Node.js dan digunakan untuk menangani peristiwa dalam lingkungan server-side. Ini digunakan untuk mengoordinasikan tugas asinkron dan komunikasi antar komponen di aplikasi Node.js.
   - `eventListener` adalah API yang digunakan di JavaScript untuk menangani peristiwa dalam lingkungan web browser (DOM). Ini digunakan untuk menangani peristiwa yang terjadi pada elemen-elemen HTML di halaman web, seperti mengklik tombol atau mengirim formulir.

Jadi, meskipun keduanya memiliki kesamaan dalam cara mereka menangani peristiwa, mereka digunakan dalam konteks yang berbeda. `EventEmitter` adalah alat yang kuat untuk mengelola peristiwa dalam aplikasi Node.js, sementara `eventListener` adalah alat yang digunakan untuk menangani peristiwa dalam halaman web yang berbasis DOM.

Anda harus menggunakan `EventEmitter` dalam aplikasi Node.js dalam beberapa situasi berikut:

1. **Komunikasi Antar Komponen**: Ketika Anda memiliki komponen atau modul yang perlu berkomunikasi satu sama lain secara longgar terkait dan Anda ingin memisahkan logika mereka. `EventEmitter` memungkinkan Anda untuk mengirim dan menerima peristiwa antar komponen tanpa harus membuat ketergantungan langsung di antara mereka.

2. **Manajemen Peristiwa**: Ketika Anda ingin menangani peristiwa dalam aplikasi Anda, seperti peristiwa server yang dipancarkan ketika permintaan HTTP diterima atau peristiwa dalam aplikasi real-time seperti pesan yang dikirim dalam aplikasi obrolan. `EventEmitter` memungkinkan Anda untuk dengan mudah mendaftarkan dan menanggapi peristiwa ini.

3. **Asinkronitas dan Non-Blok**: Ketika Anda bekerja dengan operasi asinkron, seperti membaca file, mengakses database, atau menunggu respons dari permintaan jaringan. `EventEmitter` dapat membantu Anda mengoordinasikan tugas-tugas ini dengan cara yang non-blok.

4. **Pola Desain Pengamat (Observer Pattern)**: Ketika Anda ingin menerapkan pola desain pengamat di mana beberapa komponen atau objek memantau perubahan atau peristiwa yang terjadi pada objek lain. `EventEmitter` memungkinkan Anda untuk menerapkan pola ini dengan mudah.

5. **Manajemen Peristiwa dalam Aplikasi Server**: Dalam pengembangan server web atau aplikasi berbasis server lainnya, `EventEmitter` dapat digunakan untuk menangani peristiwa seperti permintaan HTTP masuk, koneksi socket, atau peristiwa lain yang berkaitan dengan server Anda.

Namun, tidak semua aplikasi memerlukan penggunaan `EventEmitter`. Penggunaan yang berlebihan dari peristiwa dan listener dapat mempersulit pemahaman dan pemeliharaan kode Anda. Oleh karena itu, pertimbangkan dengan bijak di mana Anda benar-benar memerlukan `EventEmitter` dan kapan Anda dapat menggunakan pendekatan lain seperti callback atau promise untuk menangani logika asinkron.

*/

var events = require('events');
var eventEmitter = new events.EventEmitter();

// listener #1
var listner1 = function listner1() {
   console.log('listner1 executed.');
}

// listener #2
var listner2 = function listner2() {
   console.log('listner2 executed.');
}

// Bind the connection event with the listner1 function
eventEmitter.addListener('connection', listner1);

// Bind the connection event with the listner2 function
eventEmitter.on('connection', listner2);

var eventListeners = require('events').EventEmitter.listenerCount
   (eventEmitter,'connection');
console.log(eventListeners + " Listner(s) listening to connection event");

// Fire the connection event
eventEmitter.emit('connection');

// Remove the binding of listner1 function
eventEmitter.removeListener('connection', listner1);
console.log("Listner1 will not listen now.");

// Fire the connection event
eventEmitter.emit('connection');

eventListeners = require('events').EventEmitter.listenerCount(eventEmitter,'connection');
console.log(eventListeners + " Listner(s) listening to connection event");


console.log('Materi Bab EventEmitter berakhir');

/*Materi Bub Buffers

Penjelasan:
Buffers adalah objek dalam Node.js yang digunakan untuk mengelola dan memanipulasi data biner (data dalam bentuk byte) secara efisien. Mereka biasanya digunakan untuk mengatasi operasi masukan/keluaran (I/O) atau berinteraksi dengan data dalam format biner, seperti file, gambar, audio, dan sebagainya.
Buffers di Node.js adalah objek yang digunakan untuk mengelola dan memanipulasi data biner dalam bentuk byte.


Anda harus menggunakan Buffers dalam Node.js dalam beberapa situasi berikut:

1. **Operasi I/O (Input/Output)**: Ketika Anda berurusan dengan operasi I/O yang menghasilkan atau mengonsumsi data biner, seperti membaca atau menulis file, mengirim atau menerima data melalui soket jaringan, atau berinteraksi dengan perangkat keras yang mengirimkan data dalam format biner.

2. **Protokol Jaringan**: Ketika Anda mengimplementasikan atau berinteraksi dengan protokol jaringan yang menggunakan format data biner, seperti protokol HTTP, protokol TCP/IP, atau protokol lainnya. Buffer membantu Anda dengan efisien membaca dan menulis data dalam format yang sesuai dengan protokol tersebut.

3. **Operasi Terkait Gambar atau Audio**: Saat Anda bekerja dengan data gambar, audio, atau video, terutama jika Anda perlu memproses atau memanipulasi data dalam format biner. Buffer memungkinkan Anda untuk mengakses dan mengedit data tersebut dengan baik.

4. **Enkripsi dan Dekripsi**: Dalam proses enkripsi atau dekripsi data, Anda sering berurusan dengan data biner. Buffer berguna untuk memproses data ini dalam algoritma enkripsi atau dekripsi.

5. **Parsing Data**: Saat Anda perlu mengurai atau memecah data biner menjadi struktur data yang lebih mudah dimengerti. Buffer dapat digunakan untuk membaca data biner dan mengubahnya menjadi objek JavaScript atau struktur data lainnya.

6. **Manipulasi Bit-Level**: Ketika Anda perlu melakukan operasi manipulasi bit-level pada data, seperti mengubah bit tertentu dalam byte, menggabungkan byte, atau melakukan operasi logika pada bit.

7. **Pemrosesan Data Binary pada Aplikasi Server**: Dalam pengembangan aplikasi server, terutama jika Anda mengembangkan server yang berhubungan dengan operasi I/O intensif, Buffers sangat penting untuk mengelola dan memanipulasi data biner dengan efisien.

8. **Kinerja yang Kritis**: Ketika Anda memerlukan kinerja yang sangat baik dalam pengolahan data biner. Buffers dirancang untuk bekerja secara efisien dalam pengolahan data biner dan memiliki overhead yang lebih rendah daripada string JavaScript biasa.

Selain itu, Anda harus menggunakan Buffers jika Anda ingin menghindari masalah terkait encoding atau jika Anda ingin memproses data dengan format yang lebih efisien dibandingkan dengan data teks. Namun, ketika Anda berurusan dengan data teks atau operasi teks, menggunakan string JavaScript biasa mungkin lebih nyaman daripada Buffer.

*/

buf = new Buffer(26);
for (var i = 0 ; i < 26 ; i++) {
  buf[i] = i + 97;
}

console.log( buf.toString('ascii'));       // outputs: abcdefghijklmnopqrstuvwxyz
console.log( buf.toString('ascii',0,5));   // outputs: abcde
console.log( buf.toString('utf8',0,5));    // outputs: abcde
console.log( buf.toString(undefined,0,5)); // encoding defaults to 'utf8', outputs abcde

/*Akhir Materi Bab Buffers */


/*Materi tentang Streams

Streams adalah abstraksi yang digunakan untuk menghandle aliran data (streaming data) secara efisien. Mereka digunakan untuk membaca dan menulis data secara berurutan, dengan membagi data menjadi potongan-potongan kecil yang dapat diolah secara incremental. Streams sangat berguna ketika Anda memiliki data yang besar atau ketika Anda ingin melakukan operasi I/O secara non-blok.
Streams sangat berguna dalam pengembangan Node.js, terutama saat berurusan dengan operasi I/O yang melibatkan data besar atau aliran data real-time, seperti aplikasi berbasis server, pengolahan file besar, atau protokol jaringan.
*/

var fs = require('fs');
var data ='';

//membuat read data dengan stream
var readerStream = fs.createReadStream('tes.txt');

//set encoding utf8
readerStream.setEncoding('utf8');

//handle stream events(data,end,dan error)
readerStream.on('data', function (chunk){
    data += chunk;
});

readerStream.on('end', function(){
    console.log(data);
});

readerStream.on('error', function(err){
    console.log(err.stack);
});

console.log('Materi Bab Streams berakhir');

/*Materi Bab Streams berakhir */


/*Materi tentang File System


File System (FS) adalah modul yang terintegrasi dalam Node.js yang memungkinkan Anda untuk berinteraksi dengan sistem file lokal pada server atau komputer tempat aplikasi Node.js berjalan. FS module ini memberikan berbagai fungsi dan metode untuk membaca, menulis, menghapus, dan memanipulasi berkas (file) dan direktori.
Dengan menggunakan File System module, Anda dapat dengan mudah berinteraksi dengan sistem file lokal dalam aplikasi Node.js Anda, melakukan operasi I/O, mengelola data dalam berkas, dan menjalankan berbagai tugas yang melibatkan berkas dan direktori.
Jadi, FS digunakan dalam berbagai konteks, terutama saat aplikasi Anda membutuhkan akses atau manipulasi data berkas, berinteraksi dengan sistem file, atau melakukan operasi I/O yang berkaitan dengan penyimpanan dan pengelolaan data dalam sistem file lokal.
*/

var fs = require('fs');

//menggunakan asynchronous untuk membaca isi suatu file
fs.readFile('tes.txt', function(err, data) {
    if(err) {
        return console.error(err);
    }
    console.log('Membaca isi file: ' + data.toString());
})


var data =fs.readFileSync('tes.txt');
console.log('membaca isi file: ' + data.toString());

console.log('Materi Bab File System berakhir');

/*Akhir Materi Bab File System */


/*Materi tentang Global Object

Global Objects (Objek Global) adalah sekelompok objek dan fungsi yang secara otomatis tersedia dalam lingkungan JavaScript tanpa perlu mengimpor atau menginisialisasi mereka secara eksplisit. Objek-objek ini dan fungsi-fungsi ini dapat diakses dari mana saja dalam kode JavaScript.

Jadi, Global Objects adalah kumpulan objek dan fungsi yang tersedia secara global dalam lingkungan JavaScript, memungkinkan akses universal ke fungsionalitas yang umum digunakan dalam kode Anda.


Penggunaan Global Objects dalam JavaScript harus dilakukan dengan hati-hati, karena penyalahgunaan dapat menyebabkan kode yang kurang terstruktur dan sulit dipelihara. Global Objects sebaiknya digunakan dalam beberapa situasi berikut:

1. **Fungsi-fungsi Utilitas Umum**: Global Objects digunakan untuk mengakses fungsi-fungsi utilitas umum seperti `setTimeout()`, `setInterval()`, `console.log()`, `Math`, dan lainnya. Anda harus menggunakannya ketika diperlukan untuk tugas-tugas umum.

2. **Variabel Konfigurasi Global**: Anda dapat menggunakan objek global untuk menyimpan variabel konfigurasi atau pengaturan aplikasi yang harus diakses dari banyak bagian kode. Ini membantu dalam menghindari pengulangan pengaturan dan membuat kode lebih bersih.

3. **Manajemen Proses atau Lingkungan**: Dalam lingkungan Node.js, objek global seperti `process` berguna untuk mengakses informasi tentang proses aplikasi dan mengelola variabel lingkungan. Mereka dapat digunakan untuk mengakses argumen baris perintah, variabel lingkungan, dan sebagainya.

4. **Penanganan Peristiwa Global**: Di dalam browser, objek global seperti `window` digunakan untuk menangani peristiwa global seperti `window.onload` atau `window.onunload`. Mereka juga digunakan dalam pengembangan aplikasi web yang memanipulasi elemen-elemen DOM.

Namun, Anda harus menghindari penyalahgunaan Global Objects dan berusaha membatasi penggunaannya sebanyak mungkin. Penggunaan berlebihan variabel global dapat membingungkan, mempersulit pemahaman kode, dan mengakibatkan potensi konflik dengan variabel lain di dalam aplikasi Anda. Sebaiknya gunakan praktik terbaik dalam mengorganisasi kode Anda, seperti penggunaan modul atau penyimpanan variabel dalam cakupan yang lebih terbatas jika memungkinkan, untuk menjaga kejelasan dan pemeliharaan kode yang lebih baik.

Penting untuk memahami penggunaan objek global dan fungsi-fungsi global ini dalam pengembangan JavaScript Anda, tetapi juga penting untuk menggunakan mereka dengan bijak dan mematuhi praktik terbaik dalam penggunaan variabel global untuk menjaga kode yang bersih dan mudah dipelihara.
*/
const tglSekarang = new Date();

function printHello(){
    console.log('Test');
    console.log('Tanggal sekarang:',tglSekarang);
}

setInterval(printHello,2000); //output ini akan terus dijalankan setiap 2 detik

/*Akhir Materi Bab Global Object */

