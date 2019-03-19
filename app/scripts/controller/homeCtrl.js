'use strict';


var app = angular.module('Babie&Charlie');
app.controller('homeCtrl', function ($scope, $state, $location, $http) {

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

  var myIndex = 0;
  carousel();

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

  //===================================================CONTACTO====================================================
  $scope.enable = function enable() {
    document.getElementById("boton").style.display = "none";
    document.getElementById("botonDisable").style.display = "block"
    $("#map").css("opacity", "1");
    $("#map").css("pointer-events", "inherit");
  }

  $scope.disable = function disable() {
    document.getElementById("boton").style.display = "block";
    document.getElementById("botonDisable").style.display = "none";
    $("#map").css("opacity", "0.5");
    $("#map").css("pointer-events", "none");
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
  $scope.overlay.draw = function () {}; // empty function required
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
        }, 500, function () {

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
        }, 500, function () {

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
        console.log("header")
        // Store hash
        var hash = this.hash;

        // Using jQuery's animate() method to add smooth page scroll
        // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
        $('html, body').animate({
          scrollTop: $(hash).offset().top
        }, 500, function () {

          // Add hash (#) to URL when done scrolling (default click behavior)
          window.location.hash = hash;
        });
      } // End if
    });
  });

  //-----------------------------------------------------------------------------------------------------------------------



})