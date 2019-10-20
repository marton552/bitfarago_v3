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

function key() {
    var p = c.getImageData(1, 1, 1, 1).data;
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
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            if (this.status == 200) {
                resp = this.responseText;
                resp = resp.replace('{"status":"success","data":[', '');
                resp = resp.replace('],"message":"","hash":""}', '');
                tomb = resp.split("},{");
                for (var i = 0; i < 4; i++) {
                    sensorsAngle[i] = tomb[i].split(",")[2].split(":")[1];
                }


                document.getElementById("data").innerHTML = this.responseText;
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


function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    c.beginPath();
    c.arc(x, y, rad, 0, Math.PI * 3, false);
    c.stroke();
    if (x + rad > canvas.width || x - rad < 0) move = -move;
    if (y + rad > canvas.height) {
        move2 = -move2;

        maxy += 10;
    } else if (y - rad < maxy) move2 = -move2;
    x += move;
    y -= move2;
}