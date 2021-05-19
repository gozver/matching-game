'use strict';

let body = $('body');
let img1, img2, cell1, cell2;
let counter, attemptsNo, hitsNo;
let initGame;
let imgsList = [
  './img/imagen0.png', './img/imagen1.png', './img/imagen2.png', './img/imagen3.png', './img/imagen4.png', './img/imagen5.png',
  './img/imagen0.png', './img/imagen1.png', './img/imagen2.png', './img/imagen3.png', './img/imagen4.png', './img/imagen5.png'
];

$(() => {
  createBody();
});

function createBody() {
  createTitle();
  createTable();
  createButton();
}

function createTitle() {
  body.append('<div><h1 class="title">MATCHING GAME</h1></div>');
}

function createTable() {
  let table = $('<table>');

  for (let i = 0; i < 3; i++) {
    let tr = $('<tr>');
  
    for (let j = 0; j < 4; j++) {
      let td = $('<td>').attr('id', `td-${i}-${j}`);
      $(tr).append(td);
    }

    $(table).append(tr);
  }

  body.append(table);
}

function createButton() {
  let btnContainer = $('<div>').attr('id', 'btnContainer');
  body.append(btnContainer);

  let button = $('<input>').attr('type', 'button').attr('id', 'start').attr('value', 'START GAME');
  btnContainer.append(button);
  button.on('click', startGame);
}


function startGame() {
  counter = attemptsNo = hitsNo = 0;

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 4; j++) {
      $(`#td-${i}-${j}`).css('cursor', 'pointer');
    }
  }

  initGame = Date.now();
  imgsList.sort(() => {
    return Math.random() - 0.5;
  });

  clearTable();
  insertImgs();
  addActiontoTds();
}

function clearTable() {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 4; j++) {
      $(`#td-${i}-${j}`).empty().css('background', '#efefef');
    }
  }
}

function insertImgs() {
  let index = 0;

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 4; j++) {
      let img = $('<img>').attr('src', imgsList[index]).fadeOut(0);
      $(`#td-${i}-${j}`).append(img);
      index++;
    }
  }
}

function addActiontoTds() {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 4; j++) {
      $(`#td-${i}-${j}`).on('click', checkMatch);
    }
  }
}

function checkMatch() {
  switch (counter) {
    case 0:
      cell1 = $(this);
      img1 = $(this).children().first().fadeIn(50);
      counter++;

      break;
    case 1:
      cell2 = $(this);
      img2 = $(this).children().first().fadeIn(50);

      counter = 0;
      attemptsNo++;

      if (img1.attr('src') == img2.attr('src')) {
        cell1.off('click');
        cell2.off('click');

        $(`#${cell1[0].id}`).css('cursor', 'auto');
        $(`#${cell2[0].id}`).css('cursor', 'auto');

        hitsNo++
      } else {
        img1.fadeOut(2000);
        img2.fadeOut(2000);
      }

      if (hitsNo == 6) {
        let endGame =  Date.now();                     
        let seconds = parseInt((endGame - initGame) / 1000); 

        Swal.fire(
          'Game finished.',
          `You took ${seconds} seconds and needed ${attemptsNo} attempts.`,
          'info'
        );
      }

      break;
  }
}
