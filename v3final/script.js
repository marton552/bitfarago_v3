var resp;
var tomb = [];
var sensorsX = [];
var sensorsY = [];
var sensorsAngle = [];
var sensorsAngle2 = [];
var canvas;
var c;
var xplayer = 10;
var yplayer = 10;
var volt1 = 0;
var verzio = 0;
var o = 5;
var ketszer = true;
var mobile1 = false;
var melyik = 0;
var fel = "ArrowUp";
var bal = "ArrowLeft";
var jobb = "ArrowRight";
var le = "ArrowDown";

function mobil() {
    if (mobile1) {
        document.getElementById("mobil").style.backgroundColor = "rgb(29, 143, 29)";
        document.getElementById("mobil").innerHTML = "Mobilos/kattintós mód bekapcsolása";
        mobile1 = false;
    } else {
        document.getElementById("mobil").style.backgroundColor = "rgb(255, 74, 74)";
        document.getElementById("mobil").innerHTML = "Mobilos/kattintós mód kikapcsolása";
        mobile1 = true;
    }
}



function fel1() {
    melyik = 1;
    document.getElementById("fel").style.backgroundColor = "red";
}

function bal1() {
    melyik = 2;
    document.getElementById("bal").style.backgroundColor = "red";
}

function jobb1() {
    melyik = 3;
    document.getElementById("jobb").style.backgroundColor = "red";
}

function le1() {
    melyik = 4;
    document.getElementById("le").style.backgroundColor = "red";
}

function ckl() {
    if (mobile1) {
        xplayer = event.clientX - canvas.offsetLeft;
        yplayer = event.clientY - canvas.offsetTop;
        ver2();
    }
}

function kk() {
    document.getElementById("bk").style.overflow = "auto";
}

function key() {
    document.getElementById("bk").style.overflow = "hidden";
    if (melyik === 0) {
        console.log(event.key);
        //var p = c.getImageData(1, 1, 1, 1).data;
        e = event.key;
        if (e === fel && yplayer > 0) {
            yplayer -= 5;
        }
        if (e === le && yplayer < 500) {
            yplayer += 5;
        }
        if (e === bal && xplayer > 0) {
            xplayer -= 5;
        }
        if (e === jobb && xplayer < 500) {
            xplayer += 5;
        }
        ver2();
    }

    //beállítás
    if (melyik === 1) {
        fel = event.key;
        document.getElementById("fel").style.backgroundColor = "burlywood";
        document.getElementById("fel").innerHTML = "Fel: " + fel;
        melyik = 0;
    }
    if (melyik === 2) {
        bal = event.key;
        document.getElementById("bal").style.backgroundColor = "burlywood";
        document.getElementById("bal").innerHTML = "Bal: " + bal;
        melyik = 0;
    }
    if (melyik === 3) {
        jobb = event.key;
        document.getElementById("jobb").style.backgroundColor = "burlywood";
        document.getElementById("jobb").innerHTML = "Jobb: " + jobb;
        melyik = 0;
    }
    if (melyik === 4) {
        le = event.key;
        document.getElementById("le").style.backgroundColor = "burlywood";
        document.getElementById("le").innerHTML = "Le: " + le;
        melyik = 0;
    }
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

    if (document.getElementById("lever").style.transform === "scaleY(1)") {
        document.getElementById("lever").style.transform = "scaleY(-1)";
        document.getElementById("lever").style.top = "6.2vh";
        document.getElementById("lm").innerHTML = "Látómező: Kikapcsolva";
        draw(false);
        if (verzio === 2) draw2();

    } else {
        document.getElementById("lever").style.transform = "scaleY(1)";
        draw(true);
        document.getElementById("lever").style.top = "0vh";
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
    if (verzio === 1) c.clearRect(0, 0, canvas.width, canvas.height);
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
                draw2();
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
    c.clearRect(0, 0, canvas.width, canvas.height);
    c.beginPath();
    c.arc(xplayer, yplayer, 5, 0, Math.PI * 3, false);
    c.fillStyle = "black";
    c.fill();
    c.stroke();
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

function ver3() {
    c.clearRect(0, 0, canvas.width, canvas.height);
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
        c.fillText("Valahol itt " + Math.floor(x0[0] * 1 / 100) + ", " + Math.floor(y0[0] * 1 / 100), x0[0] - 60, y0[0] - 40);
        c.stroke();
    } else {
        c.font = "30px Arial";
        c.fillStyle = "#000000";
        c.fillText("Valahol itt " + Math.floor(x0[0] * 1 / 100) + ", " + Math.floor(y0[0] * 1 / 100), x0[0] - 60, y0[0] + 40);
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
        document.getElementById("slider").style.display = "none";
        document.getElementById("pontossag").style.display = "none";
        document.getElementById("pp").style.display = "none";
    } else {
        document.getElementById("slider").style.display = "inherit";
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
var mc_x = -4;
var mc_y = 0;

function mc_cart() {
    var x = document.getElementById("allapot").offsetWidth - 23;
    var y = document.getElementById("allapot").offsetHeight - 20;
    var top = document.getElementById("allapot").offsetTop;
    if (mc_x < x && mc_y === 0) {
        mc_x++;
    }
    if (mc_x === x && mc_y === 0) {
        document.getElementById("minecart").style.transform = "rotate(90deg)";
    }
    if (mc_x === x && mc_y < y) {
        mc_y++;
    }
    if (mc_x === x && mc_y === y) {
        document.getElementById("minecart").style.transform = "rotate(0deg)";
    }
    if (mc_x > -4 && mc_y === y) {
        mc_x--;
    }
    if (mc_x === -4 && mc_y === y) {
        document.getElementById("minecart").style.transform = "rotate(90deg)";
    }
    if (mc_x === -4 && mc_y > 0) {
        mc_y--;
    }
    if (mc_x === -4 && mc_y === 0) {
        document.getElementById("minecart").style.transform = "rotate(0deg)";
    }

    document.getElementById("minecart").style.left = mc_x + "px";
    document.getElementById("minecart").style.top = top + mc_y + "px";
    setTimeout(mc_cart, 10);
}

var le1 = Math.random() / 5;
var jobb1 = Math.random() / 3;
var forgas = Math.random();
var boatx = 10;
var boaty = 10;
var r = 0;

function mc_boat() {
    var x = document.getElementById("sugo").offsetWidth - 27;
    var top = document.getElementById("sugo").offsetTop;
    var left = document.getElementById("sugo").offsetLeft;
    boatx += jobb1;
    boaty += le1;
    r += forgas;
    if (boaty < -3 || boaty > 35) le1 = -le1;
    if (boatx < 0 || boatx > x) jobb1 = -jobb1;
    document.getElementById("boat").style.transform = "rotate(" + r + "deg)";
    document.getElementById("boat").style.left = left + boatx + "px";
    document.getElementById("boat").style.top = top + boaty + "px";
    setTimeout(mc_boat, 10);
}