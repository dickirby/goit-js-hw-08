import Player from '@vimeo/player';
import throttle from 'lodash.throttle';
const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);

player.on(
  'timeupdate',
  throttle(function (duration) {
    localStorage.setItem('videoplayer-current-time', JSON.stringify(duration));
  }, 1000)
);
const storageTime = JSON.parse(
  localStorage.getItem('videoplayer-current-time')
);
const currentTime = storageTime ? storageTime.seconds : 0;
player.setCurrentTime(currentTime);
