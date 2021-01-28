/*!
    * Start Bootstrap - Grayscale v6.0.3 (https://startbootstrap.com/theme/grayscale)
    * Copyright 2013-2020 Start Bootstrap
    * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-grayscale/blob/master/LICENSE)
    */
   (function ($) {
    "use strict"; // Start of use strict

    // Smooth scrolling using jQuery easing
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
        if (
            location.pathname.replace(/^\//, "") ==
                this.pathname.replace(/^\//, "") &&
            location.hostname == this.hostname
        ) {
            var target = $(this.hash);
            target = target.length
                ? target
                : $("[name=" + this.hash.slice(1) + "]");
            if (target.length) {
                $("html, body").animate(
                    {
                        scrollTop: target.offset().top - 70,
                    },
                    1000,
                    "easeInOutExpo"
                );
                return false;
            }
        }
    });

    // Closes responsive menu when a scroll trigger link is clicked
    $(".js-scroll-trigger").click(function () {
        $(".navbar-collapse").collapse("hide");
    });

    // Activate scrollspy to add active class to navbar items on scroll
    $("body").scrollspy({
        target: "#mainNav",
        offset: 100,
    });

    // Collapse Navbar
    var navbarCollapse = function () {
        if ($("#mainNav").offset().top > 100) {
            $("#mainNav").addClass("navbar-shrink");
        } else {
            $("#mainNav").removeClass("navbar-shrink");
        }
    };
    // Collapse now if page is not at top
    navbarCollapse();
    // Collapse the navbar when page is scrolled
    $(window).scroll(navbarCollapse);
})(jQuery); // End of use strict

$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();
  });




function onSubmit(){
    window.post = function(url, data) {
        return fetch(url, {method: "POST", body: JSON.stringify(data)});
    }

    var input = document.getElementById("exampleFormControlTextarea1").value;
    //url_req = input.replaceAll(" ", "%20");

    // req
    var response = post("http://0.0.0.0:5000/", {element: input}); // не работи :(
    //var response = [1, 4, ["Липсва запетая -> Мисля<mark> че</mark> той го заслужава. <br>Липсва запетая -> Мисля че той го<mark> заслужава."]];


    if(response[0] == 1){
            //var a = inputText.substring(0,index-1) + `<mark data-toggle="tooltip" data-placement="bottom" title='${err}'>` + inputText.substring(index,index+2) + "</mark>" + inputText.substring(index + 2) + " -> " + `${err}`;
            document.getElementById("output").innerHTML = response[1];
            document.getElementById("correct").innerHTML = "";
    }        
    else if(response[0] == 0){
        document.getElementById("output").innerHTML = "";
        var a = "Всичко е правилно!🎉";
        document.getElementById("correct").innerHTML = a;
    }
}