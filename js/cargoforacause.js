var map;

$(function() {
    
    // for Page Animations
    var $elems = $('.animateblock');
    var fullheight = $(document).height(); // Full Hieght for animations
    
    $(window).scroll(function(){
        animate_elems();
    });
    
    
    // Google Maps   
    //navigator.geolocation.getCurrentPosition(initialize);

    //lat = 26.088862 ;
    //lon = -80.139031;
    var waitTime = 5000;
    try {
    
        if (navigator.geolocation) {
            
           navigator.geolocation.getCurrentPosition(getLat, geoError, {timeout:3000});

        } else {
            alert('Geolocation is not supported in your browser');
        }
        // if no answer in 5 seconds will deafult to FLL Station
        var t = setTimeout(function () {
            if ( $("#map").is(':empty') ){
                
                 $('#map-canvas').storeLocator({'dataType': 'json','dataLocation': 'data/locations2.json', 'slideMap' : false, 'defaultLoc': true, 'defaultLat': 26.088862, 'defaultLng' : -80.139031 });
            }
            
        }, waitTime);
        
    } catch (evt) {
        alert(evt);
    }
   

    
    function getLat(loc){      
        
        var lat = loc.coords.latitude;
        var lon = loc.coords.longitude;
        $('#map-canvas').storeLocator({'dataType': 'json','dataLocation': 'locations2.json', 'slideMap' : false, 'defaultLoc': true, 'defaultLat': lat, 'defaultLng' : lon });
        
    }
    
    function geoError(err){
        switch(error.code) {
            case error.PERMISSION_DENIED:
                alert("User denied the request for Geolocation.");
                break;
            case error.POSITION_UNAVAILABLE:
                alert("Location information is unavailable.");
                break;
            case error.TIMEOUT:
                alert("The request to get user location timed out.");
                break;
            case error.UNKNOWN_ERROR:
                alert("An unknown error occurred.");
                break;
        }   
    }
    
    
"use strict";

  var topoffset = 150; //variable for menu height
  var slideqty = $('#featured .item').length;
  var wheight = $(window).height(); //get the height of the window
  var randSlide = Math.floor(Math.random()*slideqty);

  $('#featured .item').eq(randSlide).addClass('active');


  $('.fullheight').css('height', wheight); //set to window tallness  


  //replace IMG inside carousels with a background image
  $('#featured .item img').each(function() {
    var imgSrc = $(this).attr('src');
    $(this).parent().css({'background-image': 'url('+imgSrc+')'});
    $(this).remove();
  });

  //adjust height of .fullheight elements on window resize
  $(window).resize(function() {
    wheight = $(window).height(); //get the height of the window
    $('.fullheight').css('height', wheight); //set to window tallness  
  });



  //Activate Scrollspy
  $('body').scrollspy({
    target: '.navbar',
    offset: topoffset
  });

  // add inbody class
  var hash = $(this).find('li.active a').attr('href');
  if(hash !== '#featured') {
    $('header nav').addClass('inbody');
  } else {
    $('header nav').removeClass('inbody');
  }


  // Add an inbody class to nav when scrollspy event fires
  $('.navbar-fixed-top').on('activate.bs.scrollspy', function() {
    var hash = $(this).find('li.active a').attr('href');
    if(hash !== '#featured') {
      $('header nav').addClass('inbody');
    } else {
      $('header nav').removeClass('inbody');
    }
  });


  //Use smooth scrolling when clicking on navigation
  $('.navbar a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') === 
      this.pathname.replace(/^\//,'') && 
      location.hostname === this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top-topoffset+2
        }, 500, function(){
            
           slildeAnimate("#slide-nav");// close Open Menu
        
        });
        return false;
      } //target.length
    } //click function
  }); //smooth scrolling

  //Automatically generate carousel indicators
  for (var i=0; i < slideqty; i++) {
    var insertText = '<li data-target="#featured" data-slide-to="' + i + '"';
    if (i === randSlide) {
      insertText += ' class="active" ';
    }
    insertText += '></li>';
    $('#featured ol').append(insertText);
  }

  $('.carousel').carousel({
    pause: false
  });
    

    // Elements animation
    function animate_elems() {
        wintop = $(window).scrollTop(); // calculate distance from top of window

        // loop through each item to check when it animates
        $elems.each(function(){
            $elm = $(this);

            if($elm.hasClass('animated')) { return true; } // if already animated skip to the next item
            topcoords = $elm.offset().top; // element's distance from top of page in pixels

            if(wintop > (topcoords - (wheight*.80))) {
            // animate when top of the window is 3/4 above the element
            $elm.addClass('animated');
            }
        });
    } // end animate_elems()        
  
    
    
    
    
    
    
    
    //stick in the fixed 100% height behind the navbar but don't wrap it
    $('#slide-nav.navbar .container').append($('<div id="navbar-height-col"></div>'));

    // Enter your ids or classes
    var toggler = '.navbar-toggle';
    var pagewrapper = '#page-content';
    var navigationwrapper = '.navbar-header';
    var menuwidth = '100%'; // the menu inside the slide menu itself
    var slidewidth = '50%';
    var menuneg = '-100%';
    var slideneg = '-50%';


    $("#slide-nav").on("click", toggler, function (e) {

        slildeAnimate(this);
        
        /*
        var selected = $(this).hasClass('slide-active');

        $('#slidemenu').stop().animate({
            right: selected ? menuneg : '0px'
        });

        $('#navbar-height-col').stop().animate({
            right: selected ? slideneg : '0px'
        });

        $(pagewrapper).stop().animate({
            right: selected ? '0px' : slidewidth
        });

        $(navigationwrapper).stop().animate({
            right: selected ? '0px' : slidewidth
        });


        $(this).toggleClass('slide-active', !selected);
        $('#slidemenu').toggleClass('slide-active');


        $('#page-content, .navbar, body, .navbar-header').toggleClass('slide-active');
        */

    });
    


    var selected = '#slidemenu, #page-content, body, .navbar, .navbar-header';


    $(window).on("resize", function () {

        if ($(window).width() > 767 && $('.navbar-toggle').is(':hidden')) {
            $(selected).removeClass('slide-active');
        }


    });
    
    
function slildeAnimate (e) {
    
        // Enter your ids or classes
    var toggler = '.navbar-toggle';
    var pagewrapper = '#page-content';
    var navigationwrapper = '.navbar-header';
    var menuwidth = '100%'; // the menu inside the slide menu itself
    var slidewidth = '50%';
    var menuneg = '-100%';
    var slideneg = '-50%';
    
    
    var selected = $(e).hasClass('slide-active');

    $('#slidemenu').stop().animate({
        right: selected ? menuneg : '0px'
    });

    $('#navbar-height-col').stop().animate({
        right: selected ? slideneg : '0px'
    });

    $(pagewrapper).stop().animate({
        right: selected ? '0px' : slidewidth
    });

    $(navigationwrapper).stop().animate({
        right: selected ? '0px' : slidewidth
    });


    $(e).toggleClass('slide-active', !selected);
    $('#slidemenu').toggleClass('slide-active');


    $('#page-content, .navbar, body, .navbar-header').toggleClass('slide-active');
    

}   
    
    
    
    
    
    
    
    
    

});


function initialize(location){ 
    var currentLocation = new google.maps.LatLng(location.coords.latitude, location.coords.longitude);
    var mapOptions = {
        zoom: 12,
        center: currentLocation
    };    
    var marker = new google.maps.Marker({
        position: currentLocation
    });

    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    marker.setMap(map);
}



















