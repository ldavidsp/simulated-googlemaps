/**
 * User: Luis Solorzano
 * Date: 16/10/2018
 */

'use strict';

(() => {
  let map = document.getElementById('maps-image');
  let zoomIn = document.getElementById('btn-zoomIn');
  let zoomOut = document.getElementById('btn-zoomOut');
  let zoomOut_icon = document.querySelector('#btn-zoomOut i');
  let offset = [0, 0];
  let draggable = false;
  let width;

  if (!window.matchMedia("(min-width: 1050px)").matches) {
    let width = map.clientWidth;
  }

  /*
   * Zoom Map
   */
  zoomIn.addEventListener('click', () => {
    if (!zoomOut_icon.classList.contains('fa-minus')) {
      zoomOut_icon.classList.add('fa-minus')
    }

    map.classList.add('zoomIn');
    map.style.width = (parseInt(map.width) + 150) + 'px';
    setTimeout(() => {
      map.classList.remove('zoomIn');
    }, 500);
  });

  zoomOut.addEventListener('click', () => {
    if (width !== map.clientWidth) {
      map.classList.add('zoomOut');
      map.style.width = (parseInt(map.width) - 150) + 'px';

      setTimeout(() => {
        map.classList.remove('zoomOut');
      }, 500);
    } else {
      if (!window.matchMedia("(min-width: 1050px)").matches) {
        zoomOut_icon.classList.remove('fa-minus')
      }
    }
  });

  /*
   *  Move Map
   */
  map.addEventListener('mousedown', (e) => {
    draggable = true;
    map.classList.add('map-move');
    offset = [
      map.offsetLeft - e.clientX,
      map.offsetTop - e.clientY
    ];
  }, true);

  document.addEventListener('mouseup', () => {
    draggable = false;
    map.classList.remove('map-move');
  }, true);

  document.addEventListener('mousemove', (e) => {
    event.preventDefault();
    if (draggable) {
      map.style.left = (e.clientX + offset[0]) + 'px';
      map.style.top = (e.clientY + offset[1]) + 'px';
      map.style.position = 'absolute';
    }
  }, true);


  /*
   * Touch Event
   */
  map.addEventListener('touchstart', (e) => {
    draggable = true;
    offset = [
      map.offsetLeft - e.touches[0].clientX,
      map.offsetTop - e.touches[0].clientY
    ];
  });

  map.addEventListener('touchend', () => {
    draggable = false;
  });

  map.addEventListener('touchmove', (e) => {
    event.preventDefault();
    if (draggable) {
      map.style.left = (e.touches[0].clientX + offset[0]) + 'px';
      map.style.top = (e.touches[0].clientY + offset[1]) + 'px';
      map.style.position = 'absolute';
    }
  });

})();

