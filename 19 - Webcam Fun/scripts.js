const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo() {
    //to access video and audio 
    navigator.mediaDevices.getUserMedia({ video: true, audio: false }) // gives object here ( on resolve retruns media stream )
        .then(stream => {
            console.log(stream);
            video.srcObject = stream;
            video.play();
        })
        .catch(err => console.error(err));
}

function drawImage() {
    const { videoHeight: height, videoWidth: width } = video;
    canvas.height = height;
    canvas.width = width;
    console.log(height, width);
    setInterval(() => {
        ctx.drawImage(video, 0, 0, width, height);
        let pixels = ctx.getImageData(0, 0, width, height);
        pixels = redEffect(pixels);
        ctx.putImageData(pixels, 0, 0);
    }, 16);
}

function redEffect(pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i - 150] = pixels.data[i + 0]; // RED
        pixels.data[i + 500] = pixels.data[i + 1]; // GREEN
        pixels.data[i - 550] = pixels.data[i + 2]; // Blue
    }
    return pixels;
}

function takePhoto() {
    // play sound while photo is taken
    snap.currentTime = 0;
    snap.play();

    // get image from canvas
    const img = canvas.toDataURL('image/jpeg');
    const link = document.createElement('a');
    link.href = img;
    link.setAttribute('download', 'handsome');
    link.textContent = 'downlaod image';
    link.innerHTML = `<img src= ${img}>`;
    strip.insertBefore(link, strip.firstChild);

}

getVideo();
video.addEventListener('canplay', drawImage);
