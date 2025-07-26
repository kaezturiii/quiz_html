// inisialisasi elemen
const startBtn = document.querySelector('.start-btn');
const popupInfo = document.querySelector('.popup-info');
const exitBtn = document.querySelector('.exit-btn');
const main = document.querySelector('.main');
const continueBtn = document.querySelector('.continue-btn');
const quizSection = document.querySelector('.quiz-section');
const quizBox = document.querySelector('.quiz-box');
const resultBox = document.querySelector('.kotak-nilai');
const tryAgainBtn = document.querySelector('.tryAgain-btn');
const goHomeBtn = document.querySelector('.goHome-btn');


// event haedler
startBtn.onclick = () => {  //onclick = () => { adalah cara menambahkan event listener secara langsung
    // ketika di klik kode dalam{} akan di jalankan
    popupInfo.classList.add('active'); //
    main.classList.add('active');

}

exitBtn.onclick = () => {
    // Menghapus class 'active' dari elemen popupInfo agar popup menghilang (disembunyikan), biasanya dengan efek transisi sesuai aturan CSS
    popupInfo.classList.remove('active');
    main.classList.remove('active');

}

continueBtn.onclick = () => {
    quizSection.classList.add('active');
    popupInfo.classList.remove('active');
    main.classList.remove('active');
    quizBox.classList.add('active');

    showQuestions(0); //melacak no quiz ke berapa
    questionCounter(1);
    headerScore() //deklarasinya ada di bawah

}

tryAgainBtn.onclick = () => {
    quizBox.classList.add('active');  
    nextBtn.classList.remove('active');
    resultBox.classList.remove('active');

    questionCount = 0;
    questionNumb = 1;
    scoreQuiz = 0;
    showQuestions(questionCount);
    questionCounter(questionNumb);
    headerScore();
}

goHomeBtn.onclick = () => {
    quizSection.classList.remove('active');
    nextBtn.classList.remove('active');
    resultBox.classList.remove('active');

    questionCount = 0;
    questionNumb = 1;
    scoreQuiz = 0;
    showQuestions(questionCount);
    questionCounter(questionNumb);
    headerScore();
}


let questionCount = 0; //melacak nomor kuis ke brp
let questionNumb = 1;
let scoreQuiz = 0;

const nextBtn = document.querySelector('.next-btn');

nextBtn.onclick = () => {
    //fungsinya untuk mengecek apakah masi terdapat soal jika ada maka akan di tambah dengan menampilkan pertanyaan selanjutnya
    if (questionCount < pertanyaan.length - 1){
        questionCount++;
        // buat fungsinya dulu di bawah
        showQuestions(questionCount); //pilihan  akan di perbaharui sesuai pertanyaan yang si maksud 

        // mengatur nomor di footer
        questionNumb++;
        questionCounter(questionNumb);

        //tombol next
        nextBtn.classList.remove('active');
    }
    else{
        showResultBox();
    }
}

const optionlist = document.querySelector('.option-list'); //tempat pilihan jawaban akan di masukkan

// pertanyaan dan pilihan jawaban dari array
function showQuestions (index) {
    const questionText = document.querySelector('.question-text'); //mengatur teks dari element 
    questionText.textContent = `${pertanyaan [index].nomor}.${pertanyaan[index].pertanyaan}`; //menggabungkang nomor pertanyaan dan isi pertanyaan


    // membuat HTML untuk 4 pilihan
    let optiontag = `<div class="option"><span>${pertanyaan[index].pilihan[0]}</span></div>
    <div class="option"><span>${pertanyaan[index].pilihan[1]}</span></div>
    <div class="option"><span>${pertanyaan[index].pilihan[2]}</span></div>
    <div class="option"><span>${pertanyaan[index].pilihan[3]}</span></div>`;

    optionlist.innerHTML = optiontag; //memasukkan 4 blok html pilihan jawaban ke dlm element option-list

    // untuk memilih jawaban
    // mengambil jawaban yang ada di class option (hasil dari innerHTML sebelumnya)
    const option = document.querySelectorAll('.option');
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute('onclick', 'optionSelected(this)'); 
        //memberikan attribut onclick ke setiap pilihan 
        //Saat pengguna mengklik salah satu opsi, fungsi optionSelected(this) akan dipanggil. Kata this mengacu pada elemen .option yang diklik.
    }
}


//Mendefinisikan fungsi dengan parameter jawaban, yaitu elemen .option yang diklik oleh pengguna (dikirim oleh this dari HTML).
function optionSelected(jawaban) {
    let namaJawaban = jawaban.textContent; //Mengambil teks dari opsi yang diklik.
    let jawabanBenar = pertanyaan[questionCount].jawaban; //Mengambil jawaban benar dari array pertanyaan berdasarkan indeks pertanyaan saat ini (questionCount).
    let allOptions = optionlist.children.length; //Menghitung jumlah elemen .option di dalam .option-list. Harusnya selalu 4 jika ada 4 pilihan jawaban.
    
    //Mengecek apakah jawaban yang dipilih benar atau salah.
    if (namaJawaban == jawabanBenar) {
        jawaban.classList.add('correct');
        //menambah score
        scoreQuiz += 1;
        headerScore();
    }
    else{
        jawaban.classList.add('incorrect');
        // untuk mengatur apabila kita menjawab salah muncul jawaban yang benar
        for(let i = 0; i < allOptions; i++){ //melakukan perulangan untuk semua soal 
            if (optionlist.children[i].textContent == jawabanBenar){
                optionlist.children[i].setAttribute('class', 'option correct')
            }
        }
    }


    // tidak bisa next
    //jika jawaban di pilih maka akan di catat
    for(let i = 0; i < allOptions; i++) {
        optionlist.children[i].classList.add('disabled');
    }
    // tombol next setelah jawab soal
    nextBtn.classList.add('active');
}

    function questionCounter(index) {
        const questionTotal = document.querySelector('.question-total');
        // menunjukkan pertanyaan ke berapa dan jumlah total pertanyaan
        questionTotal.textContent = `${index} of ${pertanyaan.length} Question`;
}

    // menghitung score pada bgian atas
    function headerScore(){
    const scoreText = document.querySelector('.header-score');
    //jumlah jawaban yang benar / total jumlah pertanyaan
    scoreText.textContent = `score: ${scoreQuiz} / ${pertanyaan.length}`;
}

    // menampilkan kotak nilai terakhir
    function showResultBox() {
        quizBox.classList.remove('active');
        resultBox.classList.add('active');

    const scoreText = document.querySelector('.score-text');
    //text content digunakan untuk mengatur isi teks dari element
    scoreText.textContent = `Your score ${scoreQuiz} out of ${pertanyaan.length}`; //score quiz pada kotak terakhir

    const circularProgress = document.querySelector('.circular-progress');
    const progressValue = document.querySelector('.progress-value');
    let progressStartValue = -1; //mulai dari -1 agar langsung naik ke 0 saat loop pertama
    let progressEndValue = (scoreQuiz / pertanyaan.length) * 100; //skor dalam bentuk persen
    let speed = 20; //di ulang setiap 20ms

    // design diagram
    let progress = setInterval( () => {
        progressStartValue++; //menaikkan nilai persen setiap 20ms


        //menampilkan angka persen di tengah lingkaran
        progressValue.textContent = `${progressStartValue}%`; 
        // conic-gradient = mengubah background lingkaran untuk memberikan efek progress berputar sesuai nilai persen
        circularProgress.style.background = `conic-gradient(aqua ${progressStartValue * 3.6}deg, rgba(255, 255, 255, .1) 0deg)`;

        //Ketika nilai mencapai target (progressEndValue), animasi dihentikan dengan clearInterval.
        if (progressStartValue == progressEndValue) {
            clearInterval(progress);
        }


    }, speed);
}
