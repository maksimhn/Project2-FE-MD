$(document).ready(function(){

  $('.materialboxed').materialbox();

  $('.tooltipped').tooltip({delay: 20});

  $('#start').on('click', function(e){
    nextWord();
  });

  $('#register').on('click', function(e){
    registerPlayer();
  });

  $('#logout').on('click', function(e){

  });

  $('#login').on('click', function(e){
    signIn();
  });

  $('#previous').on('click', function(e){

  });

  $('#next').on('click', function(e){
    nextWord();
  });

  $('#das').on('click', function(e){
    var guess_result = $(this).attr('name');
    sendResult(guess_result);
  });

  $('#der').on('click', function(e){
    var guess_result = $(this).attr('name');
    sendResult(guess_result);
  });

  $('#die').on('click', function(e){
    var guess_result = $(this).attr('name');
    sendResult(guess_result);
  });


});
