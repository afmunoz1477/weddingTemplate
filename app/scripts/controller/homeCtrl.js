'use strict';


var app = angular.module('barbcharlie');

// Initialize Firebase
var config = {
  apiKey: "AIzaSyAmgJBB1HPOD_JLU_rEYFxSrb81UP3tMcI",
  authDomain: "babi-charlie.firebaseapp.com",
  databaseURL: "https://babi-charlie.firebaseio.com",
  projectId: "babi-charlie",
  storageBucket: "babi-charlie.appspot.com",
  messagingSenderId: "638772281277"
};

app.controller('homeCtrl', function ($scope) {

  firebase.initializeApp(config);
  $scope.dateCountDown = 0;
  var db = firebase.database();
  var myIndex = 0;
  carousel();
  $scope.registration = {
    asiste: true,
    email: '',
    rest: ''
  }

  function carousel() {
    var i;
    var x = document.getElementsByClassName("slidesPhoto");
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";
    }
    myIndex++;
    if (myIndex > x.length) {
      myIndex = 1
    }
    x[myIndex - 1].style.display = "block";
    setTimeout(carousel, 3000); // Change image every 2 seconds
  }

  function loadInitialInfo() {
    db.ref('/').once('value').then(function (snapshot) {
      countDown(snapshot.val().date);
    });
  }

  function countDown(date) {
    // Set the date we're counting down to
    var countDownDate = new Date(date).getTime();

    // Update the count down every 1 second
    var x = setInterval(function () {

      // Get todays date and time
      var now = new Date().getTime();

      // Find the distance between now and the count down date
      var distance = countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      document.getElementById("dateIdLarge").style.fontFamily = 'Autery';
      document.getElementById("dateIdSmall").style.fontFamily = 'Autery';
      document.getElementById("dateIdLarge").style.fontSize = '200%';
      document.getElementById("dateIdSmall").style.fontSize = '80%';
      document.getElementById("dateIdLarge").innerHTML = days + " dias " + hours + " horas " + minutes + " minutos " + seconds + " segundos";
      document.getElementById("dateIdSmall").innerHTML = days + " dias " + hours + " horas " + minutes + " minutos " + seconds + " segundos";

    }, 1000);
  }
  loadInitialInfo();

  //===================================================CONTACTO====================================================

  $scope.rsvpConfirmation = function rsvpConfirmation() {
    var identifier = $scope.registration.email.replace(/\./g, '');
    db.ref('white-list/' + identifier).once('value').then(function (snapshot) {
      if (snapshot.val()) {
        if (!snapshot.val().check) {
          db.ref('information/').once('value').then(function (snapshot) {
            var counter = snapshot.val().asisten;
            var counter_rechazos = snapshot.val().rechazos ? snapshot.val().rechazos : 0;
            if ($scope.registration.asiste === '1') {
              db.ref('information/').set({
                'asisten': counter + 1,
                'rechazo': counter_rechazos
              });
              if ($scope.registration.rest) {
                db.ref('/rest').once('value').then(function (snapshot) {
                  var info_rest = snapshot.val();
                  db.ref('/rest').set({
                    'ninguna': $scope.registration.rest == '0' ? info_rest.ninguna + 1 : info_rest.ninguna,
                    'vegetariano': $scope.registration.rest == '2' ? info_rest.vegetariano + 1 : info_rest.vegetariano
                  }).then(() => {
                    document.getElementById("Success").style.display = 'block';
                  })

                });
              }
            } else {
              db.ref('information/').set({
                'asisten': counter,
                'rechazos': counter_rechazos + 1
              });
            }
          });
          db.ref('white-list/' + identifier).set({
            'asiste': $scope.registration.asiste === '1' ? true : false,
            'check': true
          });
        } else {
          document.getElementById("UserChecked").style.display = 'block';
        }
      } else {
        db.ref('out-white-list/' + identifier).set({
          'asiste': $scope.registration.asiste === '1' ? true : false,
          'check': true
        }).then((snap) => {
          db.ref('out-information/').once('value').then(function (snapshot) {
            var counter = snapshot.val().asisten;
            var counter_rechazos = snapshot.val().rechazos ? snapshot.val().rechazos : 0;
            if ($scope.registration.asiste === '1') {
              db.ref('out-information/').set({
                'asisten': counter + 1,
                'rechazo': counter_rechazos
              });
              if ($scope.registration.rest) {
                db.ref('/out-rest').once('value').then(function (snapshot) {
                  var info_rest = snapshot.val();
                  db.ref('/out-rest').set({
                    'ninguna': $scope.registration.rest == '0' ? info_rest.ninguna + 1 : info_rest.ninguna,
                    'vegetariano': $scope.registration.rest == '2' ? info_rest.vegetariano + 1 : info_rest.vegetariano
                  }).then(() => {
                    document.getElementById("Success").style.display = 'block';
                  })

                });
              }
            } else {
              db.ref('out-information/').set({
                'asisten': counter,
                'rechazos': counter_rechazos + 1
              });
            }
          });
        });
      }
    });
  }

  $scope.rsvpConfirmationSmall = function rsvpConfirmationSmall() {
    var identifier = $scope.registration.email.replace(/\./g, '');
    db.ref('white-list/' + identifier).once('value').then(function (snapshot) {
      if (snapshot.val()) {
        if (!snapshot.val().check) {
          db.ref('information/').once('value').then(function (snapshot) {
            var counter = snapshot.val().asisten;
            var counter_rechazos = snapshot.val().rechazos ? snapshot.val().rechazos : 0;
            if ($scope.registration.asiste === '1') {
              db.ref('information/').set({
                'asisten': counter + 1,
                'rechazo': counter_rechazos
              });

              if ($scope.registration.rest) {
                db.ref('/rest').once('value').then(function (snapshot) {
                  var info_rest = snapshot.val();
                  db.ref('/rest').set({
                    'ninguna': $scope.registration.rest == '0' ? info_rest.ninguna + 1 : info_rest.ninguna,
                    'vegetariano': $scope.registration.rest == '2' ? info_rest.vegetariano + 1 : info_rest.vegetariano
                  }).then(() => {
                    document.getElementById("SuccessSmall").style.display = 'block';
                  })

                });
              }
            } else {
              db.ref('information/').set({
                'asisten': counter,
                'rechazos': counter_rechazos + 1
              });
            }
          });
          db.ref('white-list/' + identifier).set({
            'asiste': $scope.registration.asiste === '1' ? true : false,
            'check': true
          });
        } else {
          document.getElementById("UserCheckedSmall").style.display = 'block';
        }
      } else {
        db.ref('out-white-list/' + identifier).set({
          'asiste': $scope.registration.asiste === '1' ? true : false,
          'check': true
        }).then((snap) => {
          db.ref('out-information/').once('value').then(function (snapshot) {
            var counter = snapshot.val().asisten;
            var counter_rechazos = snapshot.val().rechazos ? snapshot.val().rechazos : 0;
            if ($scope.registration.asiste === '1') {
              db.ref('out-information/').set({
                'asisten': counter + 1,
                'rechazo': counter_rechazos
              });
              if ($scope.registration.rest) {
                db.ref('/out-rest').once('value').then(function (snapshot) {
                  var info_rest = snapshot.val();
                  db.ref('/out-rest').set({
                    'ninguna': $scope.registration.rest == '0' ? info_rest.ninguna + 1 : info_rest.ninguna,
                    'vegetariano': $scope.registration.rest == '2' ? info_rest.vegetariano + 1 : info_rest.vegetariano
                  }).then(() => {
                    document.getElementById("SuccessSmall").style.display = 'block';
                  })

                });
              }
            } else {
              db.ref('out-information/').set({
                'asisten': counter,
                'rechazos': counter_rechazos + 1
              });
            }
          });
        });
      }
    });
  }

  $scope.w3_open = function w3_open() {
    var x = document.getElementById("mySidenav");
    var y = document.getElementById("completePage");
    if (x.className.indexOf("w3-show") == -1) {
      x.className += " w3-show";
      y.style.display = "none";
    } else {
      x.className = x.className.replace(" w3-show", "");
      y.style.display = "block";
    }
  };

  /* 
      Maps 
  */
  var latlng = new google.maps.LatLng(11.1389925, -74.2128825);
  var myOptions = {
    zoom: 14,
    center: latlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  var marker = new google.maps.Marker({
    position: latlng,
    title: "Nuestro Matrimonio",
    label: "Babi & Charlie"
  });


  $scope.map = new google.maps.Map(document.getElementById("map"), myOptions);
  $scope.overlay = new google.maps.OverlayView();
  $scope.overlay.draw = function () { }; // empty function required
  $scope.overlay.setMap($scope.map);
  $scope.element = document.getElementById('map');
  marker.setMap($scope.map);
  //===============================================================================================================

  /*
      SideNavLarge
  */
  $(document).ready(function () {
    // Add scrollspy to <body>
    $('body').scrollspy({
      target: ".navbar",
      offset: 50
    });

    // Add smooth scrolling on all links inside the navbar
    $("#mySidenav a").on('click', function (event) {
      // Make sure this.hash has a value before overriding default behavior
      if (this.hash !== "") {
        // Prevent default anchor click behavior
        event.preventDefault();

        // Store hash
        var hash = this.hash;

        // Using jQuery's animate() method to add smooth page scroll
        // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
        $('html, body').animate({
          scrollTop: $(hash).offset().top
        }, 600, function () {

          // Add hash (#) to URL when done scrolling (default click behavior)
          window.location.hash = hash;
        });
      } // End if
    });
  });


  $(document).ready(function () {
    // Add scrollspy to <body>
    $('body').scrollspy({
      target: ".slidea",
      offset: 50
    });

    // Add smooth scrolling on all links inside the navbar
    $("#header a").on('click', function (event) {
      // Make sure this.hash has a value before overriding default behavior
      if (this.hash !== "") {
        // Prevent default anchor click behavior
        event.preventDefault();
        // Store hash
        var hash = this.hash;

        // Using jQuery's animate() method to add smooth page scroll
        // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
        $('html, body').animate({
          scrollTop: $(hash).offset().top
        }, 600, function () {

          // Add hash (#) to URL when done scrolling (default click behavior)
          window.location.hash = hash;
        });
      } // End if
    });
  });

  $(document).ready(function () {
    // Add scrollspy to <body>
    $('body').scrollspy({
      target: ".slidea",
      offset: 50
    });

    // Add smooth scrolling on all links inside the navbar
    $("#header-top a").on('click', function (event) {
      // Make sure this.hash has a value before overriding default behavior
      if (this.hash !== "") {
        // Prevent default anchor click behavior
        event.preventDefault();
        // Store hash
        var hash = this.hash;

        // Using jQuery's animate() method to add smooth page scroll
        // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
        $('html, body').animate({
          scrollTop: $(hash).offset().top
        }, 600, function () {

          // Add hash (#) to URL when done scrolling (default click behavior)
          window.location.hash = hash;
        });
      } // End if
    });
  });

  $(document).ready(function () {
    // Add scrollspy to <body>
    $('body').scrollspy({
      target: ".navbar",
      offset: 50
    });

    // Add smooth scrolling on all links inside the navbar
    $("#contactanos a").on('click', function (event) {
      // Make sure this.hash has a value before overriding default behavior
      if (this.hash !== "") {
        // Prevent default anchor click behavior
        event.preventDefault();
        // Store hash
        var hash = this.hash;

        // Using jQuery's animate() method to add smooth page scroll
        // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
        $('html, body').animate({
          scrollTop: $(hash).offset().top
        }, 600, function () {

          // Add hash (#) to URL when done scrolling (default click behavior)
          window.location.hash = hash;
        });
      } // End if
    });
  });

  $(document).ready(function () {
    // Add scrollspy to <body>
    $('body').scrollspy({
      target: ".navbar",
      offset: 50
    });

    // Add smooth scrolling on all links inside the navbar
    $("#buttonup a").on('click', function (event) {
      // Make sure this.hash has a value before overriding default behavior
      if (this.hash !== "") {
        // Prevent default anchor click behavior
        event.preventDefault();
        // Store hash
        var hash = this.hash;

        // Using jQuery's animate() method to add smooth page scroll
        // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
        $('html, body').animate({
          scrollTop: $(hash).offset().top
        }, 600, function () {

          // Add hash (#) to URL when done scrolling (default click behavior)
          window.location.hash = hash;
        });
      } // End if
    });
  });

  $(document).ready(function () {
    // Add scrollspy to <body>
    $('body').scrollspy({
      target: ".navbar",
      offset: 50
    });

    // Add smooth scrolling on all links inside the navbar
    $("#header-bar a").on('click', function (event) {
      // Make sure this.hash has a value before overriding default behavior
      if (this.hash !== "") {
        // Prevent default anchor click behavior
        event.preventDefault();
        // Store hash
        var hash = this.hash;

        // Using jQuery's animate() method to add smooth page scroll
        // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
        $('html, body').animate({
          scrollTop: $(hash).offset().top
        }, 600, function () {

          // Add hash (#) to URL when done scrolling (default click behavior)
          window.location.hash = hash;
        });
      } // End if
    });
  });

  //-----------------------------------------------------------------------------------------------------------------------

})