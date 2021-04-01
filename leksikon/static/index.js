

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
    var input = document.getElementById("exampleFormControlTextarea1").textContent;

    // примерен вход: Юнак без , рана не може
    // req

    //http://15.237.27.239:5000/
    $.postCORS("http://127.0.0.1:5000/",{ body : input },function(response){
        console.log(response);
        $.showBtn();
        // има грешка в input-а
        if(response[0] == 1){
            document.getElementById("exampleFormControlTextarea1").innerHTML = response[1];
                //var a = inputText.substring(0,index-1) + `<mark data-toggle="tooltip" data-placement="bottom" title='${err}'>` + inputText.substring(index,index+2) + "</mark>" + inputText.substring(index + 2) + " -> " + `${err}`;
                // document.getElementById("output").innerHTML = response[1];
                // document.getElementById("correct").innerHTML = "";          
        }        
        // няма грешка
        else if(response[0] == 0){     
            // document.getElementById("output").innerHTML = "";
            // var a = "Всичко е правилно!🎉";
            // document.getElementById("correct").innerHTML = a;
        }
    });
    //var response = [1, 4, ["Липсва запетая -> Мисля<mark> че</mark> той го заслужава. <br>Липсва запетая -> Мисля че той го<mark> заслужава."]]; 
}

// TODO: podobrqvane na dizaina
// TODO: vkluchvane i izkluchvane na proverki s butoni. napr. nenujni zapetaiki

