//ambil dan cek menu (enskripsi atau deskripsi)
const buttonEnskripsi = document.querySelector('#ens')
const buttonDeskripsi = document.querySelector('#desk')

//ambil untuk judul
const judul = document.getElementById('judul')

//ambil untuk subjudul plaintext dan ciphertext
const labelInputText = document.getElementById('sub-1')
const labelHasil = document.getElementById('sub-hasil')

//ambil untuk input text (plain or cipher) dari textarea
const inputText = document.querySelector('.plain-fix')


//event hendler untuk enskripsi dan deskripsi (merubah menu aktif)
buttonEnskripsi.addEventListener('click', function(e){
    if(!e.target.classList.contains('active')){
        //tambahkan kelas aktif untuk menu yg dipilih dan copot kelas aktif untuk menu yg tidak dipilih
        e.target.classList.toggle('active')
        buttonDeskripsi.classList.toggle('active')
    }

    //berikan label untuk menu yg dipilih
    judul.innerHTML = `Enskripsi`
    labelHasil.innerHTML = `Cipher Text`
    labelInputText.innerHTML = `Plain Text`

    //ganti id untuk inputan (menentukan plain or cipher)
    inputText.id = `plain-text` 
})

buttonDeskripsi.addEventListener('click', function(e){
    if(!e.target.classList.contains('active')){
        //tambahkan kelas aktif untuk menu yg dipilih dan copot kelas aktif untuk menu yg tidak dipilih
        e.target.classList.toggle('active')
        buttonEnskripsi.classList.toggle('active')
    }

    //berikan label untuk menu yg dipilih
    judul.innerHTML = `Deskripsi`
    labelHasil.innerHTML = `Plain Text`
    labelInputText.innerHTML = `Cipher Text`

    //ganti id untuk inputan (menentukan plain or cipher)
    inputText.id = `cipher-text` 
})


//ambil data untuk tiap -  tiap inputan (plain/cipher, character, key geser) agar tiap kali nilai di tiap2 inputan berubah, maka hasil pun ikut berubah

// const inputText = document.querySelector('.plain-fix') --> gunakan yg atas
const character = document.getElementById('karakter')
const keyGeser = document.getElementById('pergeseran')

//buat event listener untuk tiap2 inputan agar proses dijalankan!
inputText.addEventListener('input', cekInputId)
character.addEventListener('input', cekInputId)
keyGeser.addEventListener('input', cekInputId)


//ambil elemen box hasil untuk menampilkan hasil enskripsi atau deksirpsi
const hasil = document.querySelector('.hasil-isi')


//fungsi untuk menentukan proses enskripsi atau deksripsi yang dilakukan
function cekInputId () {
    if(inputText.id == 'plain-text'){
        console.log("jalankan enskripsi");
        hasil.innerHTML=encoder(inputText.value, character.value, keyGeser.value)

    }
    else{
        console.log("Jalankan Deskripsi");
        hasil.innerHTML=decoder(inputText.value, character.value, keyGeser.value)
    }
}

//buat fungsi enskripsi
function encoder (inputTeks, karakter, kunciGeser){
    
    //buat variabel baru untuk menampung nilai karakter geser
    var karakterBaru = []
    
    for(let index=0; index<karakter.length; index++)
    {   
        //bila index tambah karakternya lebuh dari panjang jumlah karakter maka lakukan proses berikut
        if(index + (kunciGeser % karakter.length) >= karakter.length){
            karakterBaru.push(karakter[(index+(kunciGeser % karakter.length)) - karakter.length])
        }
        //bila index tambah karakternya tidak lebih dari panjang jumlah karakter maka lakukan proses berikut
        else{
            karakterBaru.push(karakter[index+(kunciGeser % karakter.length)])
        } 
    }

    const hasilEncode = terjemah(inputTeks, karakterBaru, karakter)
    
    //return hasil dari proses penerjemahan dengan
    return hasilEncode

}

//buat fungsi deksripsi
function decoder (inputTeks, karakter, kunciGeser){

    //buat variabel baru untuk menampung nilai karakter geser
    var karakterBaru = []
    
    for(let index=0; index<karakter.length; index++)
    {   
        //bila index tambah karakternya lebuh dari panjang jumlah karakter maka lakukan proses berikut
        if(index - (kunciGeser % karakter.length) < 0){
            karakterBaru.push(karakter[(index-(kunciGeser % karakter.length)) + karakter.length])
        }
        //bila index tambah karakternya tidak lebih dari panjang jumlah karakter maka lakukan proses berikut
        else{
            karakterBaru.push(karakter[index-(kunciGeser % karakter.length)])
        } 
    }

    const hasilDecode = terjemah(inputTeks, karakterBaru, karakter)
    
    //return hasil dari proses penerjemahan dengan
    return hasilDecode

}

//fungsi untuk penerjemahan (mengganti karakter dengan karakter yg baru) kata dengan karakter yang baru!
function terjemah(inputan, karakterBaru, karakter){

    //terjemahkan sesuai karakter geser
    const teksInput = inputan.split("")
    
    const hasil = teksInput.map(cipher => {

        //cek apakah ada karakter di value cipher pada array karakterBaru
        if(karakterBaru.includes(cipher)){

            //bila karakter cipher tidak sama dengan value pada array karakter pada indexChara maka variable indexChara akan bertambah
            var indexChara = 0
            while(cipher != karakter[indexChara]){
                indexChara++
            }
            return karakterBaru[indexChara]
        }
        //bila tidak ada, kembalikan karakter cipher itu sendiri
        else{
            return cipher
        }
    })

    //return hasil penyesuain dengan join
    return hasil.join("")
}

//buat fungsi untuk mengcopy hasil encode / decode ke clipboard

//ambil button (trigger)
const btnCopy = document.querySelector('.copy')

btnCopy.addEventListener('click', function(e){

    //buat fungsi agar teks button kembali seperti semula
    setTimeout(function(){
        e.target.innerHTML = "Salin!"
    }, 3000)

    //jika ada teks hasil, maka copy ke clipboard
    if(hasil.innerHTML !== ""){

        //buat temporari input
        const tempInput = document.createElement('input')

        //isikan temporary input dengan teks hasil
        tempInput.value = hasil.innerHTML

        //pasang temporary input pada body
        document.body.appendChild(tempInput)

        //jalanken menu copy ke clipboard
        tempInput.select()
        document.execCommand("copy")

        //hapus temporary input dalam body
        document.body.removeChild(tempInput)

        //ubah teks button
        e.target.innerHTML = "Berhasil disalin!"
    }
    //bila tidak ada teks maka tampilkan pesan tidak ada teks
    else
    {
        e.target.innerHTML = "Tidak ada teks yang disalin!"
    }
})