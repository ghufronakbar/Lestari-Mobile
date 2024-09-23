interface TNC {
  title: string;
  last_updated: string;
  sections: Section[];
  acceptance: string;
}

interface Section {
  title: string;
  content: Content[];
}

interface Content {
  sub_title: string;
  text: string;
}

export const TERMS_CONDITIONS_REQUEST_DATA: TNC = {
  title: "Permintaan Data Satwa",
  last_updated: "2024-09-23T08:00:00.000Z",
  sections: [
    {
      title: "1. Proses Permintaan Data",
      content: [
        {
          sub_title: "1.1. Pengajuan Permintaan",
          text: "Anda dapat mengajukan permintaan data satwa dengan mengisi form permintaan yang tersedia dan menyertakan informasi yang diminta, seperti: Nama lengkap, Alasan atau tujuan permintaan data, Surat legal atau dokumen pendukung (jika diminta).",
        },
        {
          sub_title: "1.2. Verifikasi Permintaan",
          text: "Setiap permintaan data satwa akan melalui proses verifikasi oleh Admin untuk memastikan kebenaran dan relevansi permintaan. Admin berhak meminta informasi tambahan jika diperlukan guna melengkapi proses verifikasi.",
        },
        {
          sub_title: "1.3. Persetujuan atau Penolakan",
          text: "Admin berhak untuk menyetujui atau menolak permintaan data. Penolakan dapat dilakukan apabila: Tujuan permintaan tidak sesuai dengan kebijakan atau peraturan hukum, Dokumen pendukung yang diberikan tidak lengkap atau tidak valid, Permintaan bertentangan dengan prinsip kerahasiaan dan keamanan data satwa.",
        },
      ],
    },
    {
      title: "2. Penggunaan Data Satwa",
      content: [
        {
          sub_title: "2.1. Tujuan Penggunaan",
          text: "Data satwa yang diperoleh melalui sistem LESTARI hanya boleh digunakan untuk tujuan yang sah sesuai dengan yang dinyatakan dalam form permintaan. Data ini tidak boleh disalahgunakan atau digunakan untuk tujuan komersial tanpa persetujuan tertulis dari pihak LESTARI.",
        },
        {
          sub_title: "2.2. Kerahasiaan dan Perlindungan Data",
          text: "Anda bertanggung jawab untuk menjaga kerahasiaan data satwa yang diterima dan dilarang menyebarluaskan atau mendistribusikan data tersebut kepada pihak ketiga tanpa persetujuan tertulis dari Admin.",
        },
        {
          sub_title: "2.3. Larangan Penggunaan Data",
          text: "Dilarang menggunakan data satwa untuk aktivitas yang dapat merugikan spesies satwa, merusak lingkungan, atau melanggar undang-undang perlindungan hewan dan lingkungan hidup yang berlaku.",
        },
      ],
    },
    {
      title: "3. Kewajiban Pengguna",
      content: [
        {
          sub_title: "3.1. Keabsahan Informasi",
          text: "Anda bertanggung jawab untuk memberikan informasi yang akurat dan benar dalam permintaan data. Pemberian informasi yang tidak akurat, palsu, atau menyesatkan dapat mengakibatkan penolakan permintaan atau penangguhan akses.",
        },
        {
          sub_title: "3.2. Patuhi Kebijakan",
          text: "Dengan mengajukan permintaan data, Anda setuju untuk mematuhi semua kebijakan sistem dan peraturan hukum yang berlaku. Segala pelanggaran terhadap syarat dan ketentuan ini dapat mengakibatkan tindakan lebih lanjut, termasuk pembatalan akses ke data satwa dan tindakan hukum yang sesuai.",
        },
      ],
    },
    {
      title: "4. Pembatasan Tanggung Jawab",
      content: [
        {
          sub_title: "4.1. Keakuratan Data",
          text: "LESTARI tidak menjamin keakuratan, kelengkapan, atau keberlanjutan dari data satwa yang diberikan. Anda setuju bahwa penggunaan data dilakukan dengan tanggung jawab penuh dari Anda sebagai peminta.",
        },
        {
          sub_title: "4.2. Tanggung Jawab atas Penggunaan Data",
          text: "Anda setuju bahwa LESTARI tidak bertanggung jawab atas kerugian atau dampak negatif yang timbul dari penggunaan data satwa yang diterima melalui sistem ini.",
        },
      ],
    },
    {
      title: "5. Perubahan Terms and Conditions",
      content: [
        {
          sub_title: "",
          text: "LESTARI berhak untuk memperbarui atau mengubah syarat dan ketentuan ini sewaktu-waktu. Anda akan diberitahu mengenai perubahan signifikan melalui email atau notifikasi di dalam aplikasi.",
        },
      ],
    },
  ],
  acceptance:
    'Dengan mengklik "Setuju" dan melanjutkan permintaan, Anda menyatakan telah membaca, memahami, dan menyetujui syarat dan ketentuan yang ditetapkan.',
};

export const TERMS_CONDITIONS_REQUEST_ACCOUNT = {
  title: "Permintaan Pembuatan Akun",
  last_updated: "2024-09-23T08:00:00.000Z",
  sections: [
    {
      title: "1. Proses Pembuatan Akun",
      content: [
        {
          sub_title: "1.1. Pengajuan Pembuatan Akun",
          text: "Pengguna dapat mengajukan pembuatan akun dengan memberikan informasi yang diminta, termasuk nama lengkap, alasan atau tujuan penggunaan sistem, serta dokumen pendukung jika diperlukan.",
        },
        {
          sub_title: "1.2. Verifikasi Pembuatan Akun",
          text: "Setiap permintaan pembuatan akun akan melalui proses verifikasi oleh Admin untuk memastikan keaslian dan relevansi permintaan. Admin berhak meminta informasi tambahan jika diperlukan untuk melengkapi proses verifikasi.",
        },
        {
          sub_title: "1.3. Persetujuan atau Penolakan",
          text: "Admin berhak untuk menyetujui atau menolak permintaan pembuatan akun. Penolakan dapat dilakukan jika: Tujuan pembuatan akun tidak sesuai dengan kebijakan sistem, Dokumen yang diberikan tidak valid, atau Informasi yang diberikan tidak akurat atau menyesatkan.",
        },
      ],
    },
    {
      title: "2. Penggunaan Akun",
      content: [
        {
          sub_title: "2.1. Tanggung Jawab Pengguna",
          text: "Pengguna bertanggung jawab untuk menjaga kerahasiaan kredensial login dan tidak boleh membagikan akses akun kepada pihak ketiga. Segala aktivitas yang dilakukan melalui akun adalah tanggung jawab penuh dari pemilik akun.",
        },
        {
          sub_title: "2.2. Penggunaan yang Diizinkan",
          text: "Akun hanya boleh digunakan untuk tujuan pendataan satwa dan aktivitas lain yang sah sesuai dengan kebijakan sistem. Penyalahgunaan akun dapat mengakibatkan penangguhan atau penghentian akun.",
        },
      ],
    },
    {
      title: "3. Pengelolaan Akun",
      content: [
        {
          sub_title: "3.1. Penangguhan atau Penghentian Akun",
          text: "Admin berhak menangguhkan atau menghentikan akun jika ditemukan pelanggaran terhadap syarat dan ketentuan, termasuk namun tidak terbatas pada: penyalahgunaan sistem, pelanggaran hukum, atau memasukkan informasi yang tidak akurat.",
        },
        {
          sub_title: "3.2. Pembaruan Informasi",
          text: "Pengguna diwajibkan untuk memperbarui informasi yang tidak lagi akurat agar tetap sesuai dengan data pengguna yang terkini. Informasi yang salah atau tidak diperbarui dapat mengakibatkan penangguhan akun.",
        },
      ],
    },
    {
      title: "4. Kebijakan Privasi dan Kerahasiaan",
      content: [
        {
          sub_title: "4.1. Penggunaan Data Pengguna",
          text: "Data yang diberikan oleh pengguna hanya akan digunakan untuk keperluan internal sistem dan tidak akan dibagikan kepada pihak ketiga tanpa persetujuan dari pengguna, kecuali diwajibkan oleh hukum.",
        },
        {
          sub_title: "4.2. Keamanan Informasi",
          text: "Sistem LESTARI berkomitmen untuk menjaga keamanan informasi pengguna dengan tindakan pengamanan yang sesuai. Namun, pengguna juga bertanggung jawab untuk menjaga kerahasiaan data pribadi mereka.",
        },
      ],
    },
    {
      title: "5. Perubahan Syarat dan Ketentuan",
      content: [
        {
          sub_title: "",
          text: "LESTARI berhak untuk memperbarui atau mengubah syarat dan ketentuan ini sewaktu-waktu. Pengguna akan diberitahu mengenai perubahan signifikan melalui email atau notifikasi di dalam aplikasi.",
        },
      ],
    },
  ],
  acceptance:
    'Dengan mengklik "Setuju" dan melanjutkan pembuatan akun, Anda menyatakan telah membaca, memahami, dan menyetujui syarat dan ketentuan yang ditetapkan.',
};
