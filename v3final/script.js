var resp;
var tomb = [];
var sensorsX = [];
var sensorsY = [];
var sensorsAngle = [];
var sensorsAngle2 = [];
var canvas;
var c;
var xplayer = 1;
var yplayer = 1;
var volt1 = 0;
var verzio = 0;
var o = 5;

function ckl() {
    var x1 = event.clientX - canvas.offsetLeft;
    var y1 = event.clientY - canvas.offsetTop;
    var p = c.getImageData(x1, y1, 1, 1).data;
    alert(x1 + " " + y1 + " " + p);
}

function key() {
    //var p = c.getImageData(1, 1, 1, 1).data;
    e = event.key;
    if (e === "ArrowUp" && yplayer > 0) {
        yplayer -= 5;
    }
    if (e === "ArrowDown" && yplayer < 500) {
        yplayer += 5;
    }
    if (e === "ArrowLeft" && xplayer > 0) {
        xplayer -= 5;
    }
    if (e === "ArrowRight" && xplayer < 500) {
        xplayer += 5;
    }
    draw2();
}

function playerdraw() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    c.beginPath();
    c.arc(xplayer, yplayer, 5, 0, Math.PI * 3, false);
    c.fillStyle = "black";
    c.fill();
    c.stroke();
}

function lever(a) {
    c.clearRect(0, 0, canvas.width, canvas.height);
    if (a === 2) {

    } else if (document.getElementById("lever").style.transform === "scaleY(1)") {
        document.getElementById("lever").style.transform = "scaleY(-1)";
        document.getElementById("lever").style.top = "0vh";
        document.getElementById("lm").innerHTML = "Látómező: Kikapcsolva";
        draw(false);
        if (verzio === 2) draw2();
    } else {
        document.getElementById("lever").style.transform = "scaleY(1)";
        draw(true);
        document.getElementById("lever").style.top = "2vh";
        document.getElementById("lm").innerHTML = "Látómező: Bekapcsolva";
        if (verzio === 2) draw2();
    }
}

function ver1() {
    verzio = 1;
    volt1 = 1;
    checkVersion();
    c.clearRect(0, 0, canvas.width, canvas.height);
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            if (this.status == 200) {
                resp = this.responseText;
                resp = resp.replace('{"status":"success","data":[', '');
                resp = resp.replace('],"message":"","hash":""}', '');
                tomb = resp.split("},{");
                for (var i = 0; i < 4; i++) {
                    sensorsX[i] = tomb[i].split(",")[1].split(":")[1];
                    sensorsY[i] = tomb[i].split(",")[2].split(":")[1];
                    sensorsAngle[i] = tomb[i].split(",")[3].split(":")[1];
                }


                document.getElementById("data").innerHTML = this.responseText;
                draw(false);
            }
        }
    };
    xhr.open('POST', 'http://bitkozpont.mik.uni-pannon.hu/Vigyazz3SensorData.php', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send(JSON.stringify({
        request: 'sensors',
    }));
}

function draw(y) {
    for (var i = 0; i < 4; i++) {
        c.beginPath();
        c.arc(sensorsX[i], sensorsY[i], 15, 0, Math.PI * 3, false);
        c.fill();
        c.stroke();
        if (y) {
            c.arc(sensorsX[i], sensorsY[i], 400, ((sensorsAngle[i]) - 45) * Math.PI / 180, ((sensorsAngle[i] * 1 + 45)) * Math.PI / 180);
            c.lineTo(sensorsX[i], sensorsY[i]);
            c.stroke();
        }
    }

}

function ver2() {
    if (volt1 === 0) ver1();
    verzio = 2;
    checkVersion();
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            if (this.status == 200) {
                resp = this.responseText;
                resp = resp.replace('{"status":"success","data":[', '');
                resp = resp.replace('],"message":"","hash":""}', '');
                tomb = resp.split("},{");
                for (var i = 0; i < 4; i++) {
                    sensorsAngle2[i] = tomb[i].split(",")[2].split(":")[1];
                    sensorsAngle2[i] = sensorsAngle2[i].replace("}", "");
                }


                document.getElementById("data").innerHTML = this.responseText + sensorsAngle2[3];
                //draw2();
            }
        }
    };
    xhr.open('POST', 'http://bitkozpont.mik.uni-pannon.hu/Vigyazz3SensorData.php', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send(JSON.stringify({
        request: 'sensordata',
        version: 1,
        posx: xplayer,
        posy: yplayer
    }));
}

function draw2() {
    ver2();
    c.clearRect(0, 0, canvas.width, canvas.height);
    c.beginPath();
    c.arc(xplayer, yplayer, 5, 0, Math.PI * 3, false);
    c.fillStyle = "black";
    c.fill();
    c.stroke();
    var mehet = 0;
    for (var i = 0; i < 4; i++) {
        if ((sensorsAngle[i] * 1 !== 0)) mehet++;
    }
    if (mehet >= 2) {
        for (var i = 0; i < 4; i++) {
            c.beginPath();
            c.arc(sensorsX[i], sensorsY[i], 15, 0, Math.PI * 3, false);
            if ((sensorsAngle2[i] * 1) !== 0) {
                c.fillStyle = 'rgba(255, 0, 0, 0.5)';
                c.moveTo(sensorsX[i], sensorsY[i]);
                c.arc(sensorsX[i], sensorsY[i], 400, ((sensorsAngle[i] * 1) + (sensorsAngle2[i] * 1) - 2) * Math.PI / 180, ((sensorsAngle[i] * 1) + (sensorsAngle2[i] * 1) + 2) * Math.PI / 180);
                c.lineTo(sensorsX[i], sensorsY[i]);
                c.fill();

            }
            if (document.getElementById("lever").style.transform === "scaleY(1)") {
                c.arc(sensorsX[i], sensorsY[i], 400, ((sensorsAngle[i]) - 45) * Math.PI / 180, ((sensorsAngle[i] * 1 + 45)) * Math.PI / 180);
                c.lineTo(sensorsX[i], sensorsY[i]);
                c.stroke();
            }
            c.stroke();
        }
    }
}

function ver3() {
    if (volt1 === 0) ver1();
    verzio = 3;
    checkVersion();
    document.getElementById("loading").innerHTML = "Betöltés...";
    document.body.style.cursor = "wait";
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            if (this.status == 200) {
                resp = this.responseText;
                resp = resp.replace('{"status":"success","data":[', '');
                resp = resp.replace('],"message":"","hash":""}', '');
                tomb = resp.split("},{");
                for (var i = 0; i < 4; i++) {
                    sensorsAngle2[i] = tomb[i].split(",")[2].split(":")[1];
                    sensorsAngle2[i] = sensorsAngle2[i].replace("}", "");
                }


                document.getElementById("data").innerHTML = this.responseText;
                draw3();
            }
        }
    };
    xhr.open('POST', 'http://bitkozpont.mik.uni-pannon.hu/Vigyazz3SensorData.php', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send(JSON.stringify({
        request: 'sensordata',
        version: 2,
    }));
}

function draw3() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    var mehet = 0;
    for (var i = 0; i < 4; i++) {
        if ((sensorsAngle2[i] * 1 !== 0)) mehet++;
    }
    if (mehet >= 2) {
        for (var i = 0; i < 4; i++) {
            c.beginPath();
            c.arc(sensorsX[i], sensorsY[i], 15, 0, Math.PI * 3, false);
            if ((sensorsAngle2[i] * 1) !== 0) {
                c.fillStyle = 'rgba(255, 0, 0, 0.5)';
                c.moveTo(sensorsX[i], sensorsY[i]);
                c.arc(sensorsX[i], sensorsY[i], 400, ((sensorsAngle[i] * 1) + (sensorsAngle2[i] * 1) - 2) * Math.PI / 180, ((sensorsAngle[i] * 1) + (sensorsAngle2[i] * 1) + 2) * Math.PI / 180);
                c.lineTo(sensorsX[i], sensorsY[i]);
                c.fill();

            }
            if (document.getElementById("lever").style.transform === "scaleY(1)") {
                c.arc(sensorsX[i], sensorsY[i], 400, ((sensorsAngle[i]) - 45) * Math.PI / 180, ((sensorsAngle[i] * 1 + 45)) * Math.PI / 180);
                c.lineTo(sensorsX[i], sensorsY[i]);
                c.stroke();
            }
            c.stroke();
        }
        pixelcheck(mehet);
    } else {
        c.font = "30px Arial";
        c.fillText("Nem látja elég kamera!", 100, 50);
        c.stroke();
        document.getElementById("loading").innerHTML = "Kész";
        document.body.style.cursor = "auto";
    }

}

function pixelcheck(a) {
    //255
    //2 - 192
    //3 - 224
    //4 - 240
    var x0 = [];
    var y0 = [];
    var ii = 0;

    for (var i = 0; i < 500; i += o) {
        for (var k = 0; k < 500; k += o) {
            if (c.getImageData(i, k, 1, 1).data[0] * 1 === 255) {
                if ((a === 2 && c.getImageData(i, k, 1, 1).data[3] * 1 === 192) || (a === 3 && c.getImageData(i, k, 1, 1).data[3] * 1 === 224) || (a === 4 && c.getImageData(i, k, 1, 1).data[3] * 1 === 240)) {
                    //ha kettő álltal fedett rész
                    x0[ii] = i;
                    y0[ii] = k;
                    ii++;
                }
            }
        }
    }
    document.getElementById("loading").innerHTML = "Kész";
    document.body.style.cursor = "auto";
    var xDisc = Math.abs(x0[0] - x0[x0.length - 1]);
    var yDisc = Math.abs(y0[0] - y0[y0.length - 1]);
    var distance = xDisc + yDisc;
    c.beginPath();
    c.lineWidth = 5;
    c.arc(x0[0] + xDisc / 2, y0[0] + yDisc / 2, distance / 2 + 10, 0, Math.PI * 3, false);
    c.stroke();
    c.lineWidth = 1;
    if (y0[0] > 100) {
        c.font = "30px Arial";
        c.fillStyle = "#000000";
        c.fillText("Valahol itt", x0[0] - 60, y0[0] - 40);
        c.stroke();
    }
}

function test() {
    canvas = document.querySelector('canvas');
    canvas.width = 500;
    canvas.height = 500;
    c = canvas.getContext('2d');

}

var x = 200;
var y = 200;
var maxy = 100
var move = 5;
var move2 = 5;
var rad = 30;

function setPont() {
    o = document.getElementById("pontossag").value * 1;
    document.getElementById("pp").innerHTML = "Pontosság: " + o;
    if (o === 10) var t = 2;
    else if (o === 9) var t = 2.5;
    else if (o === 8) var t = 3;
    else if (o === 7) var t = 4;
    else if (o === 6) var t = 4.5;
    else if (o === 5) var t = 6;
    else if (o === 4) var t = 12;
    else if (o === 3) var t = 18;
    else var t = "ismeretlen (1 percnél több, nem ajánlott)"
    document.getElementById("pp").innerHTML += "<br>Várható lefutási idő: " + t + "mp";
}

function checkVersion() {
    if (verzio !== 3) {
        document.getElementById("pontossag").style.display = "none";
        document.getElementById("pp").style.display = "none";
    } else {
        document.getElementById("pontossag").style.display = "inherit";
        document.getElementById("pp").style.display = "inherit";
    }

    if (verzio === 1) {
        document.getElementById("vr").innerHTML = "Verzió: 1";
    }
    if (verzio === 2) {
        document.getElementById("vr").innerHTML = "Verzió: 2";
    }
    if (verzio === 3) {
        document.getElementById("vr").innerHTML = "Verzió: 3";
    }
}

var on1 = true;
var on2 = true;

function irany() {
    if (on1) {
        document.getElementById("irany").innerHTML = "Irányítás ▲"; //▲
        document.getElementById("ir2").style.display = "inherit";
        on1 = false;
    } else {
        document.getElementById("irany").innerHTML = "Irányítás ▼";
        document.getElementById("ir2").style.display = "none";
        on1 = true;
    }
}

function v3p() {
    if (on2) {
        document.getElementById("v3p").innerHTML = "Verzió 3 pontosság ▲";
        document.getElementById("v3p2").style.display = "inherit";
        on2 = false;
    } else {
        document.getElementById("v3p").innerHTML = "Verzió 3 pontosság ▼";
        document.getElementById("v3p2").style.display = "none";
        on2 = true;
    }
}