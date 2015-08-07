// link to the server
// var sa = '//localhost:3000';
var sa = 'https://powerful-sands-2723.herokuapp.com';

// checks if user guessed the gender correctly
var checkGuess = function(userGuess) {
  return userGuess === wordGen ? true : false;
};

// creates toast message to display depending on whether the answer is correct ot not
var toastMessage = function(guess_result) {
  return checkGuess(guess_result) ? "Bingo! It's " + wordGen : "Wrong! It's actually " + wordGen
};

// sends a sign-in request; hides unnecessary elements
var signIn = function() {
  event.preventDefault();
  this.blur();
  $.ajax(sa + '/login', {
    contentType: 'application/json',
    processData: false,
    data: JSON.stringify({
      credentials: {
        email: $('#email').val(),
        password: $('#password').val()
      }
    }),
    dataType: 'json',
    method: 'POST'
  }).done(function(data, textStatus, jqxhr){
    userToken = data.token;
    userId = data.id;
    userEmail = data.email;
    toggleElements(userToken, userEmail);
    updateGraph(progressGraph, progressData, [data.stats], data.quizzes, 5);
    updateGraph(rateGraph, rateData, [data.rate], data.quizzes, 5);
  }).fail(function(jqxhr, textStatus, errorThrown){
    console.log(errorThrown);
    alert('Authentication failed. Please check login and password');
  });
  $('#email').val('');
  $('#password').val('');
};

// registers a new user with email/password combo
var registerPlayer = function () {
  event.preventDefault();
  this.blur();
  $.ajax(sa + '/users', {
      contentType: 'application/json',
      processData: false,
      data: JSON.stringify({
        credentials: {
          email: $('#email').val(),
          password: $('#password').val(),
          password_confirmation: $('#password').val()
        }
      }),
      dataType: 'json',
      method: 'POST'
    }).done(function(data, textStatus, jqxhr){
      alert('Registration completed! Please log in now...');
    }).fail(function(jqxhr, textStatus, errorThrown){
      console.log(errorThrown);
      alert('Registration failed. Please check login and password for invalid symbols');
    });
};

// sends a request to get new word from the server; renders it
var nextWord = function() {
  event.preventDefault();
  this.blur();
  $.ajax(sa + '/word', {
    dataType: 'json',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + userToken
    }
  }).done(function(data, textStatus, jqxhr){
    $('#wordfield').text(data.noun);
    wordGen = data.gen;
    wordId = data.id;
    $("#picbox").attr("src", data.pic);
  }).fail(function(jqxhr, textStatus, errorThrown){
    console.log('Word retrieval failed.');
  });
};

// sends a guess result to the server; updates graphs when stats are recieved
var sendResult = function(guess_result) {
  console.log(guess_result);
  $.ajax(sa + '/quizzes', {
    contentType: 'application/json',
    processData: false,
    headers: {
        Authorization: 'Token token=' + userToken
      },
    data: JSON.stringify(
      {
        word: $('#wordfield').text(),
        result: checkGuess(guess_result),
        id: userId
      }
    ),
    dataType: 'json',
    method: 'POST'
  }).done(function(data, textStatus, jqxhr){
    updateGraph(progressGraph, progressData, [data.stats], data.quizzes, 5);
    updateGraph(rateGraph, rateData, [data.rate], data.quizzes, 5);
  }).fail(function(jqxhr, textStatus, errorThrown){
    console.log('stats retrieval failed');
  });
};

// deletes a user currently logged in and reloads the page
var destroyUser = function () {
  $.ajax(sa + '/users/' + userId, {
    contentType: 'application/json',
    processData: false,
    headers: {
        Authorization: 'Token token=' + userToken
      },
    data: JSON.stringify(
      {
        id: userId
      }),
    dataType: 'json',
    method: 'DELETE'
  }).done(function(data, textStatus, jqxhr){
  }).fail(function(jqxhr, textStatus, errorThrown){
    alert('User has been successfully deleted!');
    location.reload();
    console.log(errorThrown);
  });
};

// updates current word's gender
var updateWord = function (newGender) {
  $.ajax(sa + '/words/' + wordId, {
    contentType: 'application/json',
    processData: false,
    headers: {
        Authorization: 'Token token=' + userToken
      },
    data: JSON.stringify(
      {
        id: wordId,
        gender: newGender
      }),
    dataType: 'json',
    method: 'PATCH'
  }).done(function(data, textStatus, jqxhr){
    alert('The gender has been successfully updated');
  }).fail(function(jqxhr, textStatus, errorThrown){
    console.log(errorThrown);
  });
};
