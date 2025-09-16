1.Pelacakan Pengiriman:
●Setiap pengiriman memiliki informasi seperti nomor pengiriman, tanggal pengiriman, lokasi asal, lokasi tujuan, status pengiriman (tertunda, dalam perjalanan, telah tiba), dan detail barang yang dikirim.m
●Implementasikan tampilan pelacakan yang memungkinkan pengguna memasukkan nomor pengiriman dan melihat status dan detail pengiriman.
2.Manajemen Armada:
●Data armada termasuk nomor armada, jenis kendaraan, ketersediaan (tersedia, tidak tersedia), dan kapasitas muatan.
●Buat halaman untuk menambah, mengedit, dan menghapus informasi armada.
●Tampilkan daftar armada dan status ketersediaannya.
3.Pemesanan Armada:
●Pelanggan dapat memesan armada untuk pengiriman barang.
●Implementasikan formulir pemesanan yang mencakup jenis kendaraan, tanggal pemesanan, dan detail barang.
●Setelah pemesanan berhasil, update status ketersediaan armada.
4.Pencarian dan Filter:
●Tambahkan fitur pencarian untuk mencari pengiriman berdasarkan nomor pengiriman atau lokasi tujuan.
●Tambahkan filter untuk menampilkan armada berdasarkan jenis kendaraan atau ketersediaan.
5.Lokasi Check-In Peta:
●Armada dapat melakukan check-in lokasi terupdate.
●Admin dapat melihat update lokasi armada dan titik koordinatnya.
6.Laporan Pengiriman:
●Gunakan query MySQL dengan JOIN dan GROUP BY untuk mengambil statistik jumlah pengiriman yang sedang dalam perjalanan untuk setiap armada.
7.Validasi Input:
●Lakukan validasi input untuk memastikan tanggal pemesanan tidak boleh masa lalu, detail pemesanan harus lengkap, armada tidak sedang digunakan.
8.Dokumentasi Kode:
●Sertakan dokumentasi yang jelas tentang struktur proyek, basis data, dan cara menjalankan aplikasi.

Catatan Tambahan:
●Gunakan fungsi ORM laravel (Eloquent) dan Migration dengan Seeder untuk database
●Fokus pada implementasi fungsi dasar dan integrasi yang memadai.
●Pastikan tampilan responsif dan mudah digunakan.
●Uji aplikasi untuk memastikan fungsi yang diharapkan berjalan dengan baik.
