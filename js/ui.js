$(document).ready(function(){

  // Hover effect for buttons
  $('.materialboxed').materialbox();

  // Tooltips trigger
  $('.tooltipped').tooltip({delay: 20});

  // HIT ME button
  $('#start').on('click', function(e){
    nextWord();
  });

  // REGISTER button
  $('#register').on('click', function(e){
    registerPlayer();
  });

  // LOGOUT button
  $('#logout').on('click', function(e){
    location.reload();
  });

  // LOGIN button
  $('#login').on('click', function(e){
    signIn();
  });

  // DAS quiz answer. Toast also triggers when clicked.
  $('#das').on('click', function(e){
    var guess_result = $(this).attr('name');
    sendResult(guess_result);
    Materialize.toast(toastMessage(guess_result), 4000);
  });

  // DER quiz answer. Toast also triggers when clicked.
  $('#der').on('click', function(e){
    var guess_result = $(this).attr('name');
    sendResult(guess_result);
    Materialize.toast(toastMessage(guess_result), 4000);
  });

  // DIE quiz answer. Toast also triggers when clicked.
  $('#die').on('click', function(e){
    var guess_result = $(this).attr('name');
    sendResult(guess_result);
    Materialize.toast(toastMessage(guess_result), 4000);
  });

  // DELETE button. Destroys user and reloads a page
  $('#deleteuser').on('click', function(e){
    destroyUser();
  });

  // GENDER UPDATE button with selector pop-up
  $('.genderselector').on('click', function(e){
    updateWord($(this).html().slice(0,3));
  });

  // Hides or shows elements depending on user's status
  toggleElements(userToken, userEmail);

});
