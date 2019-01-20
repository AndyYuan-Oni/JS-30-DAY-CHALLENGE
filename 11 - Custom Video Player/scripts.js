/** Get the elements */

const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled'); // progress vitra ko line 
const toggle = player.querySelector('.toggle'); // play pause ko button
const skipButtons = player.querySelectorAll('[data-skip]'); // 10 25 ko skip button 
const ranges = player.querySelectorAll('.player__slider');  // volume ra speed ko sliderr

/** Build up the functionality */

function togglePlay() {
    const method = video.paused ? 'play' : 'pause';
    video[method]();
}

function updateToggle() {
    toggle.textContent = this.paused ? '►' : '❚ ❚';
}

function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
    video[this.name] = this.value;
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
    video.currentTime = (e.offsetX / progress.offsetWidth) * video.duration;
}

/** Hook up event listeners */
toggle.addEventListener('click', togglePlay);

video.addEventListener('play', updateToggle);
video.addEventListener('pause', updateToggle);
video.addEventListener('click', togglePlay);

skipButtons.forEach(button => button.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));

video.addEventListener('timeupdate', handleProgress);

progress.addEventListener('click', scrub);

let mouseDown = false;
progress.addEventListener('mousemove', (e) => mouseDown && scrub(e));
progress.addEventListener('mouseup', () => mouseDown = false);
progress.addEventListener('mousedown', () => mouseDown = true);

document.querySelector('.full').addEventListener('click',() => {
    video.requestFullscreen();
});