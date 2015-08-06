
var sa = '//localhost:3000';
var checkGuess = function(userGuess) {
  return userGuess === wordGen ? true : false;
};
var toastMessage = function(guess_result) {
  // console.log(checkGuess(guess_result));
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
    // (graph, data, stats_or_rate, quizzes, limit)
    updateGraph(progressGraph, progressData, [data.stats], data.quizzes, 5);
    updateGraph(rateGraph, rateData, [data.rate], data.quizzes, 5);
    // console.log(data.quizzes);
    // console.log('token: ' + data.token + ', stats: ' + data.stats + ', rate: ' + data.rate + ', id: ' + data.id);
    // $('#result').val(data.stats);
    // $('#result').val(data.rate);
    //$('#maincontainer > p').append('<h4>Logged in as ' + data.credentials.email + '</h4>');
  }).fail(function(jqxhr, textStatus, errorThrown){
    alert('Authorization failed. Please check login and password');
    $('#result').val('login failed');
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
      $('#result').val(JSON.stringify(data));
    }).fail(function(jqxhr, textStatus, errorThrown){
      $('#result').val('registration failed');
    });
  // $('#email').val('');
  // $('#password').val('');
};

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
    console.log(data.id);
    $("#picbox").attr("src", data.pic);

    // alert('Recieved: ' + data.noun + ', and it is a ' + data.gen);
    // search API trigger
  }).fail(function(jqxhr, textStatus, errorThrown){
    alert('Word retrieval failed.');
  });
};

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
    // data = JSON.stringify(data);
    // $('#result').val(JSON.stringify(data));
    updateGraph(progressGraph, progressData, [data.stats], data.quizzes, 5);
    updateGraph(rateGraph, rateData, [data.rate], data.quizzes, 5);
    console.log(data.quizzes);
    console.log(data.rate + ' is rate, ' + data.stats + ' is stats!' )
    // nextWord();
  }).fail(function(jqxhr, textStatus, errorThrown){
    $('#result').val('stats retrieval failed');
  });
};

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
    console.log(data);
  }).fail(function(jqxhr, textStatus, errorThrown){
    console.log(errorThrown);
  });
};

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
    console.log(data);
  }).fail(function(jqxhr, textStatus, errorThrown){
    console.log(errorThrown);
  });
};
