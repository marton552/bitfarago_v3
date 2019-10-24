var id = "";
var temp = 0;


function post(attr, callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            callback(this);
        }
    };
    xhttp.open("POST", "http://bitkozpont.mik.uni-pannon.hu/2019/onlineForduloHomero.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(attr);
}

function getTeamID(callback) {
    post('{"request": "teamcode"}', function(a) {
        id = JSON.parse(a.responseText)["data"];
        update();

    });
}

function updateWindowState() {
    post('{"request": "state", "teamcode": "'+id+'"}', function(a) {
        var c = JSON.parse(a.responseText)["data"]["window"];
        if(c == "closed") { document.getElementById("ablak").src = "ablak_zarva.png"; document.getElementById("ablaks").innerHTML = "Ablak: Zárva"; }
        else { document.getElementById("ablak").src = "ablak_nyitva.png"; document.getElementById("ablaks").innerHTML = "Ablak: Nyitva"; }
    });
}

function updateHeaterState() {
    post('{"request": "state", "teamcode": "'+id+'"}', function(a) {
        var c = JSON.parse(a.responseText)["data"]["heater"];
        
        if(c == "offline")
            document.getElementById("heaters").innerHTML = "Kazán: kikapcsolva";        
        else
            document.getElementById("heaters").innerHTML = "Kazán: "+c+" C";
    });
}

function updateTemp() {
    post('{"request": "state", "teamcode": "'+id+'"}', function(a) {
        var c = JSON.parse(a.responseText)["data"]["temperature"];
        temp = c;
        document.getElementById("temp").innerHTML = "Hőmérséklet: "+c+" C";
    });
}

function update() {
    updateWindowState();
    updateHeaterState();
    updateTemp();
}


function setWindowState(state) {
    post('{"request": "change", "teamcode": "'+id+'", "window": "'+state+'"}', function(a) {
        update();
    });
}

function setHeaterTemp(val) {
    post('{"request": "change", "teamcode": "'+id+'", "heater": "'+val+'"}', function(a) {
        update();
    });
}


function load() {
    getTeamID(function() {
        update();
    });   

    
    setInterval(function() {
        update();
    }, 1000);
}

function ff() {
    var a  = document.getElementById("fastforward").value;
    if(isNaN(a) == false) {
        post('{"request": "change", "teamcode": "'+id+'", "speed": "'+a+'"}', function(a) {
            update();
        });
    }else alert("Számnak kell lennie!");
}

function changeHeaterTemp() {
    var be = document.getElementById("beheater").value;
    console.log(be);

    if(isNaN(be) == false) {
        if(be >= 30 && be <= 50) {
            setHeaterTemp(be);
            console.log(be);
            update();
        }else alert("30 és  50 között kell lennie!");
    }else alert("Számnak kell lennie!");
}