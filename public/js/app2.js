var id;
var x;
var userLogin = {
    name: '',
    email: ''
  }
var userDataJson;
var startProcess = () => {
    fetch('https://wwc2018.herokuapp.com/groups')
        .then(function(grpData){
            return grpData.text();
        })
        .then(function(data){
            //console.log(data);
            x = JSON.parse(data);
            setStart();
            buildPage();
            console.log(x);
        });
};

var setStart = () => {
    $('.wait-bar').css('display', 'none');
    $('#main-section').css('display', 'block');
}

//send the user data to the server and get id back
$('#startBtn').click(function(){
    userLogin.name = $('#nameInput').val();
    userLogin.email = $('#emailInput').val();
    userLoginJson = JSON.stringify(userLogin);
    $('.wait-bar').css("display", "block");
    $('#startBtn').attr('disabled', 'disabled');

    fetch('https://wwc2018.herokuapp.com/api/addUser', {
        method: 'POST',
        body: userLoginJson,
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      }).then(data => data.text())
      .then(userData => {
        console.log(userData)
        id = JSON.parse(userData).id;
        console.log('Success:', userData);
        $('#showName').text("HI " + $("#nameInput").val());
        
        if(JSON.parse(userData).newUser) {
            startProcess();
        } else { 
            if(localStorage.getItem('localUserBet') != null && JSON.parse(localStorage.getItem('localUserBet')).id == id){
                var loclUsrBet = JSON.parse(localStorage.getItem('localUserBet'));
                console.log(loclUsrBet);
                showUserBet(loclUsrBet.res)
            } else if (JSON.parse(userData).userBet.constructor === Array){
                if (JSON.parse(userData).userBet.length == 0){
                    startProcess();
                }
            } else if (JSON.parse(userData).userBet.constructor === Object){
                if (JSON.parse(userData).userBet.groupss.length == 0){
                    startProcess();
                } else {
                console.log("showbet")
                showUserBet(JSON.parse(userData).userBet);
            }
        }
    }
        
    });

});


var sortGroups = function(groupId, top16A, top16B){
    $(top16A+" li:nth-child(1)").html($(groupId+" li:nth-child(1)").html());
    $(top16B+" li:nth-child(2)").html($(groupId+" li:nth-child(2)").html());
    $(groupId).sortable({
        update: function( event, ui ) {
            var x = $(groupId+" li:nth-child(1)").html();
            var y = $(groupId+" li:nth-child(2)").html();
            $(top16A+" li:nth-child(1)").html(x);
            $(top16B+" li:nth-child(2)").html(y);
        }
    })
};

var pickQtr = function(top16Id, qtrId, c){
    $(top16Id).selectable({
        selected: function( event, ui ) {	
            $(qtrId +' li:nth-child('+ c +')').html(ui.selected.textContent);
        }
});
};

var pickSemi = function(qtrId, semiId, c){
    $(qtrId).selectable({
        selected: function( event, ui ) {	
            $(semiId +' li:nth-child('+ c +')').html(ui.selected.textContent);
        }
    });
};

var pickFin = function(semiId,finId, c){
    $(semiId).selectable({
        selected: function( event, ui ) {	
            $(finId +' li:nth-child('+ c +')').html(ui.selected.textContent);
        }

    });
}
var pickWin = function(){
    $('#fin').selectable({
        selected: function( event, ui ) {	
            $('#win').html(ui.selected.textContent);
            $('#winSquare').css('display', 'block');
        }
});
}



var buildPage = () => {
    for(var i = 0 ; i < x.grupus.length ; i ++){
        for(var j = 0 ; j < 4 ; j++){
            $('#group' + (i + 1) + ' li:nth-child('+ (j + 1) +')').text(x.grupus[i].Countrys[j]);
        }
    }
    sortGroups("#group1", "#topSixteen1", "#topSixteen3");
    sortGroups("#group2", "#topSixteen3", "#topSixteen1");
    sortGroups("#group3", "#topSixteen2", "#topSixteen4");
    sortGroups("#group4", "#topSixteen4", "#topSixteen2");
    sortGroups("#group5", "#topSixteen5", "#topSixteen7");
    sortGroups("#group6", "#topSixteen7", "#topSixteen5");
    sortGroups("#group7", "#topSixteen6", "#topSixteen8");
    sortGroups("#group8", "#topSixteen8", "#topSixteen6");

    pickQtr("#topSixteen1", "#qtr1", 1);
    pickQtr("#topSixteen2", "#qtr1", 2);
    pickQtr('#topSixteen3', '#qtr2', 1);
    pickQtr('#topSixteen4', '#qtr2', 2);
    pickQtr('#topSixteen5', '#qtr3', 1);
    pickQtr('#topSixteen6', '#qtr3', 2);
    pickQtr('#topSixteen7', '#qtr4', 1);
    pickQtr('#topSixteen8', '#qtr4', 2);

    pickSemi("#qtr1", "#semi1", 1);
    pickSemi("#qtr2", "#semi1", 2);
    pickSemi('#qtr3', '#semi2', 1);
    pickSemi('#qtr4', '#semi2', 2);

    pickFin("#semi1", "#fin", 1);
    pickFin("#semi2", "#fin", 2);

    pickWin();
};

var showUserBet = (obj) =>{
    setStart();
    for (var i = 0 ; i < 8 ; i++){
        for(var j = 0 ; j < 4 ; j++){
            $('#group' + (i + 1) + ' li:nth-child('+ (j + 1) +')').text(obj.groupss[i][j]);
        }
    }

    for (var i = 0 ; i < 8 ; i++){
        for(var j = 0 ; j < 2 ; j++){
            $('#topSixteen' + (i + 1) + ' li:nth-child('+ (j + 1) +')').text(obj.top16[j+i+1*i]);
        }
    }

    for (var i = 0 ; i < 4 ; i++){
        for(var j = 0 ; j < 2 ; j++){
            $('#qtr' + (i + 1) + ' li:nth-child('+ (j + 1) +')').text(obj.top8[j+i+1*i]);
        }
    }

    for (var i = 0 ; i < 2 ; i++){
        for(var j = 0 ; j < 2 ; j++){
            $('#semi' + (i + 1) + ' li:nth-child('+ (j + 1) +')').text(obj.top4[j+i+1*i]);
        }
    }

    for (var i = 0 ; i < 2 ; i++){
            $('#fin li:nth-child('+ (i + 1) +')').text(obj.top2[i]);
    }

    $('#winSquare').css('display', 'block');
    $('#win').text(obj.top1);

    $('#submitBtn').attr('disabled', 'disabled');

}

var obj = {
    id:'',
    res: {    
        groupss : [[],[],[],[],[],[],[],[]],
        top16 : [],
        top8 : [],
        top4 : [],
        top2 : [],
        top1 : ''
    }
}

var resJson;

var createPicksJson = () => {
    for(var i = 0 ; i < 8 ; i++){
        for(var j = 0 ; j < 4 ; j++){
            obj.res.groupss[i].push($('#group'+(i+1)+' li:nth('+j+')').text())
        }
    }
    for(var i = 0 ; i < 8 ; i++){
        for(var j = 0 ; j < 2 ; j++){
            obj.res.top16.push($('#topSixteen'+(i+1)+' li:nth('+j+')').text())
        }
    }
    for(var i = 1 ; i < 9 ; i++){
        obj.res.top8.push($('#topSixteen' + i + ' .ui-selected').text());
    }
    for(var i = 1 ; i < 5 ; i++){
        obj.res.top4.push($('#qtr' + i + ' .ui-selected').text());
    }
    for(var i = 1 ; i < 3 ; i++){
        obj.res.top2.push($('#semi' + i + ' .ui-selected').text());
    }
    obj.res.top1 = $('#win').text();
    obj.id = id;
    resJson = JSON.stringify(obj);
}

$('#submitBtn').click(function(){
    var makeSure = confirm("you are about to submit your bet. are you sure?")
    if(makeSure){
        var count = 0;
        console.log(count);
        for(var i = 1 ; i < 9 ; i++){
            if($('#topSixteen' + i + ' li').hasClass('ui-selected')){
                continue;
            } else {
                count++
            }
        }
        console.log(count);
        for(var i = 1 ; i < 5 ; i++){
            if($('#qtr' + i + ' li').hasClass('ui-selected')){
                continue;
            } else {
                count++
            }
        }
        console.log(count);
        for(var i = 1 ; i < 3 ; i++){
            if($('#semi' + i + ' li').hasClass('ui-selected')){
                continue;
            } else {
                count++
            }
        }
        console.log(count);
        if(count > 0) {
            alert('not finished');
            console.log('alert')
        } else {
            createPicksJson();
            console.log('json');
            localStorage.setItem('localUserBet', resJson);
            fetch('https://wwc2018.herokuapp.com/api/setRes', {
                method: 'POST',
                body: resJson,
                headers: new Headers({
                'Content-Type': 'application/json'
                })
            }).then(aaa => aaa.text())
            .then(response => {
                console.log(response)
                $('#main-section').css('display', 'none');
                $('.tnkuGif').css('display', 'block');
            });
        }
    } else {
        alert('Check again and then submit.')
    }
});


  

  