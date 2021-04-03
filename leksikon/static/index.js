$( document ).ready(function() {
    $('#exampleFormControlTextarea1').on('DOMNodeInserted', function () { //listed for new items inserted onto ul
        $('.popoverData').popover();
        $('.popoverOption').popover({ trigger: "hover" });
    });

    $('#popoverData').popover();
    $('#popoverOption').popover({ trigger: "hover" });
    
    // document.getElementById("exampleFormControlTextarea1").innerHTML = '<mark id="popoverOption" data-content="Дребния -> Дребният" rel="popover" data-placement="bottom" data-original-title="Грешно членуване">Дребния</mark> месар който надничаше утиде за месо.';
    $("#exampleFormControlTextarea1").html('Дребния месар<mark class="popoverOption" data-content="месар," rel="popover" data-placement="bottom" data-original-title="Изпусната запетая"> </mark>който седеше <mark class="popoverOption" data-content="[option 1, option 2, option 3]" rel="popover" data-placement="bottom" data-original-title="Несъществуваща дума">утиде</mark> за месо.');

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
    $("#deleteBtn").click((e)=>{
        $("#exampleFormControlTextarea1").html('');
    })

    $("#submitBtn").click((e)=>{
        console.log("peppepopo")
        jQuery.hideBtn();
        var input = document.getElementById("exampleFormControlTextarea1").textContent;

        // примерен вход: Юнак без , рана не може
        // req

        //http://15.237.27.239:5000/
        console.log("ayo")
        $.postCORS("http://127.0.0.1:4000/",{ body : input },function(response){
            console.log(response);
            $.showBtn();
            // има грешка в input-а
            if(response[0] == 1){
                $("#exampleFormControlTextarea1").html(response[1]);
                // document.getElementById("exampleFormControlTextarea1").innerHTML = response[1];
                    //var a = inputText.substring(0,index-1) + `<mark data-toggle="tooltip" data-placement="bottom" title='${err}'>` + inputText.substring(index,index+2) + "</mark>" + inputText.substring(index + 2) + " -> " + `${err}`;
                    // document.getElementById("output").innerHTML = response[1];
                    // document.getElementById("correct").innerHTML = "";          
            }        
            // няма грешка
            else if(response[0] == 0){    
                $("#exampleFormControlTextarea1").html(response[1]);
                // document.getElementById("exampleFormControlTextarea1").innerHTML = response[1];
                // document.getElementById("output").innerHTML = "";
                // var a = "Всичко е правилно!🎉";
                // document.getElementById("correct").innerHTML = a;
            }
        });
        //var response = [1, 4, ["Липсва запетая -> Мисля<mark> че</mark> той го заслужава. <br>Липсва запетая -> Мисля че той го<mark> заслужава."]]; 
    })

    // TODO: podobrqvane na dizaina
    // TODO: vkluchvane i izkluchvane na proverki s butoni. napr. nenujni zapetaiki

})