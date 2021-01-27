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


function spellCheck(data){
    var data_arr = data.split("");
    var prev = "", i = 0;
    var pos, flag=0, err;
    data_arr.forEach(element => {
        //console.log(element);
        if((element) == ',' && prev == ' '){
            console.log("NE E PRAVILNO")
            flag = 1;
            pos = i;
            err = "Не може да има интервал преди запетайка.";
        }
    
        i++;
        prev = element;
    });
    if(flag == 1){
        return [flag, pos, err];
    }
    return [0];
}

function highlight(index, err) {
    var inputText = document.getElementById("exampleFormControlTextarea1").value;
    if (index >= 0) { 
     var a = inputText.substring(0,index-1) + `<mark data-toggle="tooltip" data-placement="bottom" title='${err}'>` + inputText.substring(index,index+2) + "</mark>" + inputText.substring(index + 2) + " -> " + `${err}`;
     document.getElementById("output").innerHTML = a;
     document.getElementById("correct").innerHTML = "";
    }
  }

function punctCheck(input, response){
    var arr = [];
    let i, j = 0;
    let temp;
    for(i = 0; i < input.length; i++){
        console.log("input ->" + input[i] + " response ->" + response[j]);
     
            if(response[j] == ',COMMA' && input[i] != ',COMMA'){
                console.log("tuk sum");
                arr.push(i);
                temp = i;
                j += 1;
            }else if(response[j] != ',COMMA' && input[i] == ',COMMA'){
                i+= 1;
            }
            j += 1;
        
    }
    if(arr == null || arr.length == 0){
        return [0];
    }
    return [1, arr, "Изпусната запетая. Преди думата: " + input[temp]];
}

function onSubmit(){
    var input = document.getElementById("exampleFormControlTextarea1").value;

    var spell = spellCheck(input)
    if(spell[0] == 1){
        //alert(spell);
        highlight(spell[1], spell[2]);
    }
    else{
        url_req = input.replaceAll(",", "").replaceAll(" ", "%20");
        input = input.replaceAll(",", " ,COMMA");
        var input_arr = input.split(" ");
        
        fetch('https://us-central1-azbuki-ml.cloudfunctions.net/forwardApi/api?pnct='+url_req)
        .then(response => {
            return response.json();
        })
        .then(response => {
            // req 
            //var response = ["Мисля",",COMMA","че","грешиш"];

            
            var punct = punctCheck(input_arr, response);
            if(punct[0] == 0){
                document.getElementById("output").innerHTML = "";
                var a = "Всичко е правилно!🎉";
                document.getElementById("correct").innerHTML = a;
            }else{
                highlight(6, punct[2]);
            }
        })

    }

}


// Мисля, че грешиш
