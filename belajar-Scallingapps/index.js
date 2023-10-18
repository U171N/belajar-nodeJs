/*
Materi tentang Scaling Application


Scaling Application pada NodeJS adalah proses meningkatkan kapasitas dan kinerja aplikasi web berbasis NodeJS sehingga dapat menangani volume pengguna yang lebih besar dan memproses permintaan lebih cepat. Skala aplikasi NodeJS dapat dilakukan secara horizontal dengan menambahkan lebih banyak server atau secara vertikal dengan menambahkan lebih banyak sumber daya (CPU, RAM) pada server yang ada. Skala aplikasi ini dapat dilakukan melalui fitur load balancing, clustering, dan replikasi yang tersedia di NodeJS. Dengan melakukan scaling, aplikasi NodeJS dapat berjalan lebih efisien dan menghadapi jumlah pengguna yang lebih besar tanpa mengorbankan kecepatan dan kinerja.


Kita harus menerapkan Scaling Application ketika aplikasi web yang berbasis NodeJS yang kita miliki mulai mengalami penurunan kinerja yang signifikan atau waktu respon yang lambat karena lonjakan pengguna atau volume data yang tinggi. Berikut adalah beberapa situasi di mana kita harus menerapkan Scaling Application pada aplikasi web NodeJS:

1. Lonjakan pengguna: Jika aplikasi web mulai mendapatkan volume pengguna yang semakin besar dari waktu ke waktu, maka diperlukan Scaling Application untuk memastikan kinerja aplikasi tetap stabil dan responsif.

2. Volume data yang meningkat: Jika aplikasi web memiliki volume data yang semakin tinggi dari waktu ke waktu, maka Scaling Application diperlukan agar aplikasi dapat mengakses dan memproses data lebih cepat.

3. Waktu respon yang lambat: Saat pengguna mengalami waktu respon yang lambat atau tidak responsif ketika menggunakan aplikasi, Scaling Application dapat membantu mengatasi masalah ini dengan meningkatkan kapasitas aplikasi secara horizontal atau vertikal.

4. Peningkatan permintaan API: Jika aplikasi web memiliki permintaan API yang meningkat, Scaling Application dapat membantu memastikan permintaan ini direspons dengan cepat dan akurat.

5. Peak Load: Jika aplikasi web memiliki periode waktu tinggi, seperti saat periode festival atau penjualan besar, maka Scaling Application diperlukan untuk memastikan kinerja aplikasi tetap stabil dan konsisten selama waktu puncak ini.

Jadi, Scaling Application sangat penting untuk meningkatkan kinerja aplikasi web NodeJS dengan meningkatkan kapasitas dan mengoptimalkan penggunaan sumber daya secara efektif.
*/


const fs = require('fs');
const child_process = require('child_process');

for(var i=0; i<3; i++) {
   var workerProcess = child_process.exec('node support.js '+i,function
      (error, stdout, stderr) {

      if (error) {
         console.log(error.stack);
         console.log('Error code: '+error.code);
         console.log('Signal received: '+error.signal);
      }
      console.log('stdout: ' + stdout);
      console.log('stderr: ' + stderr);
   });

   workerProcess.on('exit', function (code) {
      console.log('Child process exited with exit code '+code);
   });
}