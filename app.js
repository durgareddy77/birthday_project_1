// Extracted JavaScript from birth.html
// Screen Navigation Function
function nextScreen(currentId, nextId) {
    document.getElementById(currentId).classList.remove('active');
    document.getElementById(nextId).classList.add('active');
}

// Passcode Logic
const CORRECT_PIN = "1234"; // Set your custom code here
let currentInput = "";
// Global webcam stream handle
let localMediaStream = null;

function pressKey(num) {
    if (currentInput.length < 4) {
        currentInput += num;
        updatePinDisplay();
    }
}

function clearPin() {
    currentInput = "";
    updatePinDisplay();
}

function updatePinDisplay() {
    for (let i = 0; i < 4; i++) {
        let box = document.getElementById(`box${i}`);
        
        if (currentInput[i]) {
            box.innerText = "*";
            box.classList.add('filled');
        } else {
            box.innerText = "";
            box.classList.remove('filled');
        }
    }
}

function checkPin() {
    if (currentInput === CORRECT_PIN) {
        nextScreen('screen1', 'screen2');
    } else {
        alert("Incorrect Passcode! Try again 💕");
        clearPin();
    }
}

// Store both photos separately
let capturedPhoto1 = null;
let capturedPhoto2 = null;

// Function 1: Moves from Snoopy greeting to the Close-up Cake/Blow stage
function showBlowPhase() {
    document.getElementById('cake-phase-a').style.display = 'none';
    document.getElementById('cake-phase-b').style.display = 'block';
    let mainCard = document.getElementById('screen2');
    mainCard.style.maxWidth = "750px";
    mainCard.style.width = "95%";
    mainCard.style.padding = "40px";
}

// Function 2: Handles blowing out the candles, then reveals the Next button
function blowCandles() {
    let cake = document.getElementById('cake-img');
    let title = document.getElementById('birthday-title');
    let text = document.getElementById('instruction-text');
    let blowBtn = document.getElementById('action-btn');
    let nextBtn = document.getElementById('post-blow-next');
    cake.src = "images/off.jpeg";
    title.innerText = "Happy Birthday, My Friend! ❤️";
    text.innerText = "Your wish is safely locked away in my heart.";
    blowBtn.style.display = 'none';
    nextBtn.style.display = 'inline-block';
}

function goToGifts() {
    let mainCard = document.getElementById('screen2');
    mainCard.style.maxWidth = "450px";
    nextScreen('screen2', 'screen3');
}

// Gift Selection Logic
function openGift(choice) {
    let revealArea = document.getElementById('gift-reveal-area');
    let contentContainer = document.getElementById('gift-content');
    let actionNextBtn = document.getElementById('gifts-screen-next');
    document.querySelector('.gift-container').style.display = 'none';
    document.querySelector('#screen3 .sub-title').style.display = 'none';
    contentContainer.innerHTML = "";
    
    if (choice === 'camera') {
        contentContainer.innerHTML = `
            <div class="camera-stage-wrapper">
                <h2 class="camera-title" id="camera-main-title">Wow! That looks so good on you</h2>
                <p class="camera-subtitle" id="camera-sub-title">Now, get ready to take a picture</p>
                <div class="camera-action-row">
                    <div class="webcam-view-box">
                        <video id="webcam-preview" autoplay playsinline muted></video>
                        <canvas id="capture-canvas" style="display:none;"></canvas>
                    </div>
                    <button class="see-picture-btn" id="camera-action-btn" onclick="takePhotoBoothSnapshot(1)">See the picture</button>
                </div>
                <div id="polaroid-drop-zone" style="display: none; margin-top: 30px;">
                    <div class="polaroid-card">
                        <img id="polaroid-snapshot-target" alt="Captured Moment" class="polaroid-photo">
                        <div class="polaroid-caption" id="polaroid-text">The most beautiful smile ❤️</div>
                    </div>
                </div>
            </div>
        `;
        if (actionNextBtn) actionNextBtn.style.display = 'none';
        startWebcamStream();

    } else if (choice === 'bottle') {
        let stampSrc = capturedPhoto1 ? capturedPhoto1 : "images/rapunzel_stamp.png";
        let mainSrc = capturedPhoto2 ? capturedPhoto2 : "images/rapunzel_main.png";
        
        contentContainer.innerHTML = `
            <div class="scrapbook-container">
                
                <div class="collage-zone">
                    <img src="images/gift.png" alt="Snoopy Sunflower" class="snoopy-sunflower">
                    
                    <div class="main-portrait-frame">
                        <img src="${mainSrc}" alt="Pose 2 Main">
                    </div>

                    <div class="stamp-photo-frame">
                        <img src="${stampSrc}" alt="Pose 1 Stamp">
                    </div>
                </div>

                <div class="noteboard-zone">
                    <img src="images/butterflies.png" alt="Flower Decoration" class="flower-sticker">
                    
                    <div class="scrapbook-clipboard">
                        <div class="metal-clip-header"></div>
                        <div class="clipboard-text-content">
                            Happy Birthday, My Friend. Today is not just another day. It is the day the most precious person came into this world, and I feel lucky that I get to celebrate you.<br><br>
                            You make ordinary moments feel special. Your smile, your voice, your care, and the way you exist in my life mean more than words can ever explain.<br><br>
                            I hope this new year of your life brings you endless happiness, success, peace, love, and every beautiful thing your heart dreams of. You deserve all of it and more.<br><br>
                            I am always proud of you, always cheering for you, and always grateful for you. ❤️
                        </div>
                    </div>
                    
                    <img src="images/snoopy2.png" alt="Snoopy Hearts" class="snoopy-hearts-overlay">
                    
                    <div class="btn-row">
                    <div class="btn-row">
                        <button class="scrapbook-next-btn" onclick="resetToGiftSelection()">Next</button>
                    </div>
                </div>

                </div>

            </div>
        `;
        if (actionNextBtn) actionNextBtn.style.display = 'none';
    } else if (choice === 'star') {
        contentContainer.innerHTML = `
            <div class="mock-browser-window">
                
                <div class="browser-header-bar">
                    <div class="window-dots">
                        <span class="dot red-dot"></span>
                        <span class="dot yellow-dot"></span>
                        <span class="dot green-dot"></span>
                    </div>
                    <div class="mock-address-field"></div>
                </div>

                <div class="video-gift-container" style="padding: 15px; background-color: #ffffff; text-align: center;">
                    <div class="video-wrapper" style="position: relative; width: 100%; max-width: 680px; margin: 0 auto; border-radius: 8px; overflow: hidden; box-shadow: 0 8px 25px rgba(0,0,0,0.1); aspect-ratio: 16/9;">
                        
                        <video id="birthdayVideo" controls autoplay playsinline style="width: 100%; height: 100%; object-fit: cover; display: block;">
                            <source src="https://res.cloudinary.com/dukhnxk98/video/upload/v1779733525/mywish_d72fci.webm" type="video/webm">
                            Your browser does not support the video tag.
                        </video>
                        
                    </div>

                    <div class="btn-row" style="margin-top: 15px;">
                        <button class="scrapbook-next-btn" onclick="stopVideoAndReset()">Next</button>
                    </div>
                </div>

            </div>
        `;
        actionNextBtn.style.display = 'none';
    }
    revealArea.style.display = 'block';
}

function stopVideoAndReset() {
    let videoElement = document.getElementById('birthdayVideo');
    if (videoElement) {
        videoElement.pause(); 
        videoElement.src = ""; // Instantly breaks the network stream so it stops playing background audio
        videoElement.load();
    }
    resetToGiftSelection(); 
}

function revealPolaroidPhoto() {
    takeSnapshot();
    let photoZone = document.getElementById('polaroid-drop-zone');
    if (photoZone) photoZone.style.display = 'block';
    let seeBtn = document.querySelector('.see-picture-btn');
    if (seeBtn) seeBtn.style.display = 'none';
    let backBtn = document.getElementById('gifts-screen-next');
    if (backBtn) {
        backBtn.innerText = "Back to gifts ➔";
        backBtn.style.display = 'inline-block';
        backBtn.setAttribute('onclick', 'resetToGiftSelection()');
    }
}

function resetToGiftSelection() {
    let revealArea = document.getElementById('gift-reveal-area');
    if (revealArea) revealArea.style.display = 'none';
    let contentContainer = document.getElementById('gift-content');
    if (contentContainer) contentContainer.innerHTML = '';
    let choicesGrid = document.querySelector('.gift-container');
    if (choicesGrid) choicesGrid.style.display = 'flex';
    let subtitle = document.querySelector('#screen3 .sub-title');
    if (subtitle) subtitle.style.display = 'block';
    let heading = document.querySelector('#screen3 h2');
    if (heading) heading.innerText = 'These are for you! ✨';
    let mainCard = document.getElementById('screen3');
    if (mainCard) mainCard.style.maxWidth = '650px';
    let nextBtn = document.getElementById('gifts-screen-next');
    if (nextBtn) {
        nextBtn.innerText = 'Next ➔';
        nextBtn.setAttribute('onclick', "nextScreen('screen3', 'screen4')");
    }
}

function startWebcamStream() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) return;
    navigator.mediaDevices.getUserMedia({ video: { width: 400, height: 400 }, audio: false })
        .then(function(stream) {
            localMediaStream = stream;
            let videoElement = document.getElementById('webcam-preview');
            if (videoElement) videoElement.srcObject = stream;
        })
        .catch(function(err) {
            console.log('Webcam initialization failed: ' + err);
            alert('Please allow camera access permissions to capture your birthday portrait snap! 💕');
        });
}

function takePhotoBoothSnapshot(photoNumber) {
    let video = document.getElementById('webcam-preview');
    let canvas = document.getElementById('capture-canvas');
    let snapshotTarget = document.getElementById('polaroid-snapshot-target');
    let photoZone = document.getElementById('polaroid-drop-zone');
    let actionBtn = document.getElementById('camera-action-btn');
    let mainTitle = document.getElementById('camera-main-title');
    let subTitle = document.getElementById('camera-sub-title');

    if (!video || !canvas || !snapshotTarget || !actionBtn || !mainTitle || !subTitle) return;
    if (localMediaStream) {
        let context = canvas.getContext('2d');
        canvas.width = video.videoWidth || 400;
        canvas.height = video.videoHeight || 400;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        let dataURL = canvas.toDataURL('image/png');
        
        if (photoNumber === 1) {
            capturedPhoto1 = dataURL;
            snapshotTarget.src = dataURL;
            document.getElementById('polaroid-text').innerText = "You look beautiful in this moment... ✨";
            if (photoZone) photoZone.style.display = 'block';
            mainTitle.innerText = "Great! Now take one more picture... 📸";
            subTitle.innerText = "Change your pose for the main frame!";
            actionBtn.innerText = "Take second picture";
            actionBtn.setAttribute("onclick", "takePhotoBoothSnapshot(2)");
        } else if (photoNumber === 2) {
            capturedPhoto2 = dataURL;
            snapshotTarget.src = dataURL;
            document.getElementById('polaroid-text').innerText = "Another beautiful capture — you're glowing! ❤️";
            localMediaStream.getTracks().forEach(track => track.stop());
            localMediaStream = null;
            actionBtn.style.display = 'none';
            let backBtn = document.getElementById('gifts-screen-next');
            if (backBtn) {
                backBtn.innerText = "Back to gifts ➔";
                backBtn.setAttribute("onclick", "resetToGiftSelection()");
                backBtn.style.display = 'inline-block';
            }
        }
    }
}
