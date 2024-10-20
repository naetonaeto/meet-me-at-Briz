// Use HTML5 Web Cryptography API for end-to-end encryption
const encryptionKey = crypto.subtle.generateKey(
    { name: 'AES-GCM', length: 256 },
    true,
    ['encrypt', 'decrypt']
);

// Use HTML5 Web Storage for customizable themes
const themeSelect = document.getElementById('theme');
themeSelect.addEventListener('change', () => {
    localStorage.setItem('theme', themeSelect.value);
});

// Use HTML5 Web Storage for passwords
const passwordInput = document.getElementById('password');
passwordInput.addEventListener('input', () => {
    localStorage.setItem('password', passwordInput.value);
});

// Use HTML5 Web Storage for Face ID
const faceIdInput = document.getElementById('face-id');
faceIdInput.addEventListener('input', () => {
    localStorage.setItem('face-id', faceIdInput.value);
});

// Use HTML5 Web Storage for voice mail
const voiceMailAudio = document.getElementById('voice-mail-audio');
const voiceMailBtn = document.getElementById('voice-mail-btn');
voiceMailBtn.addEventListener('click', () => {
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.start();
            localStorage.setItem('voice-mail', mediaRecorder.blob);
        });
});

// Use HTML5 Web Storage for self-destructive messages
const selfDestructInput = document.getElementById('self-destruct-input');
const selfDestructBtn = document.getElementById('self-destruct-btn');
selfDestructBtn.addEventListener('click', () => {
    const message = selfDestructInput.value;
    localStorage.setItem('self-destruct', message);
    setTimeout(() => {
        localStorage.removeItem('self-destruct');
    }, 30000); // Delete message after 30 seconds
});
// Get the video element
const faceIdVideo = document.getElementById('face-id-video');

// Get the Face ID button
const faceIdBtn = document.getElementById('face-id-btn');

// Initialize the Web Authentication API
navigator.credentials.get({
    name: 'face-id',
    type: 'public-key'
})
.then(credentials => {
    // Use the Face Recognition API to verify the user's face
    const faceRecognitionApi = new FaceRecognitionApi();
    faceRecognitionApi.verifyFace(credentials)
        .then(result => {
            if (result) {
                console.log('Face ID authenticated successfully!');
            } else {
                console.log('Face ID authentication failed!');
            }
        });
})
.catch(error => {
    console.error('Error initializing Face ID:', error);
});

// Set up the video stream for facial recognition
navigator.mediaDevices.getUserMedia({ video: true })
.then(stream => {
    faceIdVideo.srcObject = stream;
})
.catch(error => {
    console.error('Error accessing camera:', error);
});

// Handle Face ID button click
faceIdBtn.addEventListener('click', () => {
    // Start the facial recognition process
    faceRecognitionApi.startRecognition(faceIdVideo);
});