// scripts.js

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
    $("#loadingAni").hide();
  });

// POST request jQuery
jQuery.postCORS = function(url, data, func) {
    if(func == undefined) func = function(){};
    return $.ajax({
      type: 'POST', 
      url: url, 
      data: data, 
      dataType: 'json', 
      crossDomain:true,
      contentType: 'application/x-www-form-urlencoded', 
      xhrFields: { withCredentials: true }, 
      success: function(res) { func(res) }, 
      error: function() { 
              func({}) 
      }
    });
}

jQuery.hideBtn = function(){
    $("#submitBtn").hide(1000);
    $("#loadingAni").show(1000);
}

jQuery.showBtn = function(){
    $("#loadingAni").hide(1000);
    $("#submitBtn").show(1000);
}

function onSubmit(){
    $.hideBtn();
    var input = document.getElementById("exampleFormControlTextarea1").value;

    // примерен вход: Юнак без , рана не може
    // req
    $.postCORS("http://15.237.27.239/",{ body : input },function(response){
        console.log(response);
        $.showBtn();
        // има грешка в input-а
        if(response[0] == 1){
                //var a = inputText.substring(0,index-1) + `<mark data-toggle="tooltip" data-placement="bottom" title='${err}'>` + inputText.substring(index,index+2) + "</mark>" + inputText.substring(index + 2) + " -> " + `${err}`;
                document.getElementById("output").innerHTML = response[1];
                document.getElementById("correct").innerHTML = "";
        }        
        // няма грешка
        else if(response[0] == 0){
            document.getElementById("output").innerHTML = "";
            var a = "Всичко е правилно!🎉";
            document.getElementById("correct").innerHTML = a;
        }
    });
    //var response = [1, 4, ["Липсва запетая -> Мисля<mark> че</mark> той го заслужава. <br>Липсва запетая -> Мисля че той го<mark> заслужава."]]; 
}

// TODO: podobrqvane na dizaina
// TODO: vkluchvane i izkluchvane na proverki s butoni. napr. nenujni zapetaiki


