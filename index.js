let currentIndex = 1;
const totalContainers = 7;
let hasAnswered = false;
let startTime;

function nextContainer() {
    if (currentIndex < totalContainers) {
        if (currentIndex === 3 && !hasAnswered) {
            showPopup();
            return;
        }

        let currentContainer = document.getElementById(`container${currentIndex}`);
        let nextContainer = document.getElementById(`container${currentIndex + 1}`);

        currentContainer.classList.add("exit-left");
        nextContainer.classList.remove("hidden");
        nextContainer.classList.add("enter-right");

        setTimeout(() => {
            nextContainer.classList.remove("enter-right");
            nextContainer.classList.add("active");
            currentContainer.style.display = "none";
        }, 500);

        currentIndex++;

        // Mengubah teks tombol menjadi "JAWABAN 💌" pada saat di container 3
        if (currentIndex === 3) {
            document.getElementById("nextButton").innerText = "JAWABAN 💌";
            document.getElementById("nextButton").setAttribute("onclick", "showPopup()");
            return;
        }

        // Mengubah teks tombol menjadi "KLIK SINI MAMI💕" di semua langkah lainnya
        document.getElementById("nextButton").innerText = "KLIK SINI MAMI💕";
        document.getElementById("nextButton").setAttribute("onclick", "nextContainer()");

        if (currentIndex === 4) {
            document.getElementById("nextButton").innerText = "JAWABAN 💌";
            document.getElementById("nextButton").setAttribute("onclick", "showStyledPopup()");
            return;
        }

        if (currentIndex === 7) {
            setTimeout(() => {
                showFinalPopup();
            }, 3000);
        }

        if (currentIndex === totalContainers) {
            setTimeout(() => {
                document.getElementById("nextButton").style.display = "none";
            }, 600);
        }
    }
}


function showPopup() {
    let popup = document.createElement("div");
    popup.classList.add("popup");

    popup.innerHTML = `
        <div class="popup-content bounce-in">
            <p>Ciapa Nama Bayi Mami Paling Gemezz? 😍</p>
            <input type="text" id="userAnswer" placeholder="Tulis jawaban...">
            <button onclick="submitAnswer()">Kirim Jawaban</button>
        </div>
    `;

    document.body.appendChild(popup);
    playSound("popup");
}

function submitAnswer() {
    let userAnswer = document.getElementById("userAnswer").value;
    if (userAnswer.trim() !== "") {
        document.getElementById("answerText").innerText = `JAWABAN: ${userAnswer}`;
        document.querySelector(".popup").remove();
        hasAnswered = true;

        // Sembunyikan tombol setelah jawaban dikirim
        document.getElementById("nextButton").style.display = "none";

        // Ubah tombol menjadi "KLIK SINI MAMI💕" dan lanjutkan ke container berikutnya
        document.getElementById("nextButton").innerText = "KLIK SINI MAMI💕";
        document.getElementById("nextButton").setAttribute("onclick", "nextContainer()");

        // Tunda beberapa detik agar pengguna dapat melihat jawaban
        setTimeout(() => {
            // Sembunyikan container dengan teks "Ciapa Nama Bayi Mami Paling Gemezz😍"
            let currentContainer = document.getElementById(`container3`);
            currentContainer.classList.add("exit-left");  // Tambahkan efek keluar dengan animasi

            // Hapus container langsung tanpa animasi keluar
            currentContainer.style.display = "none";  // Sembunyikan container segera setelah animasi keluar

            // Pindah ke container selanjutnya
            currentIndex++;  // Pindah ke container selanjutnya
            let nextContainer = document.getElementById(`container${currentIndex}`);
            nextContainer.classList.remove("hidden");
            nextContainer.classList.add("enter-right");

            setTimeout(() => {
                nextContainer.classList.remove("enter-right");
                nextContainer.classList.add("active");
            }, 100); // Durasi animasi masuk 100ms

            // Tampilkan tombol lagi setelah berpindah ke container berikutnya
            document.getElementById("nextButton").style.display = "block";
        }, 1000); // Jeda 1 detik untuk memberi waktu melihat jawaban
    } else {
        alert("Jawab dulu dong, jangan kosong!");
    }
}



function playSound(type) {
    let audio = new Audio();
    if (type === "popup") {
        audio.src = "https://www.soundjay.com/button/sounds/button-3.mp3";
    } else if (type === "love") {
        audio.src = "https://www.soundjay.com/button/sounds/button-4.mp3";
    }
    audio.play();
}

function showStyledPopup() {
    let popup = document.createElement("div");
    popup.classList.add("styled-popup");
    popup.innerHTML = `
        <div class="styled-popup-content bounce-in">
            <h2 class="popup-title">💌 Mami Cayank Ndak Cama Daddy Na? 💌</h2>
            <p class="popup-question">Ndak Ada Pilihan Bo Cayank Daddy😝</p>
            <div class="popup-options">
                <button class="option-btn yes" onclick="selectStyledAnswer(true)">Cayank Bangettt 💖</button>
                <button class="option-btn no" onclick="selectStyledAnswer(false)">Cayank Pakai Bangettt 💖</button>
            </div>
        </div>
    `;
    document.body.appendChild(popup);
    setTimeout(() => { popup.classList.add("show"); }, 10);
    playSound("popup");
}

function selectStyledAnswer(isLove) {
    let popup = document.querySelector(".styled-popup");
    popup.classList.remove("show");
    setTimeout(() => {
        popup.remove();
        let answerText = document.createElement("p");
        answerText.classList.add("text");
        answerText.innerText = "YEAYY!! Mami Cayank Daddy 💖💖💖";
        let container4 = document.getElementById("container4");
        container4.appendChild(answerText);
        playSound("love");
        document.getElementById("nextButton").innerText = `Klik Saya 5`;
        document.getElementById("nextButton").setAttribute("onclick", "nextContainer()");
    }, 300);
}