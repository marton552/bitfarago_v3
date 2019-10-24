var selected = 0;
function tablegenerate(){
nehez = 10;
for (i = 1; i < nehez+1; i++) {
    document.getElementById("table").innerHTML += "<tr>";
    for (k = 1; k < nehez+1; k++) {
        document.getElementById("table").innerHTML += "<img onclick='click1("+i+","+k+")' onmouseout='out("+i+""+k+")' onmouseover='ck(" + i + "" + k + ");' src='blank.png' style='max-width: " + 35 / nehez + "vw; font-size: " + 35 / nehez + "vw;' class='cell' id='cell" + i + "" + k + "'>";
    }
    document.getElementById("table").innerHTML += "</tr>";
}}

var save = "";
var x;
var y;
var irany = "jobb";
var nyilfel;
var nyille;
var nyiljobb;
var nyilbal;

function ck(a){
    save = document.getElementById("cell"+a).src;
    if(selected === 1 ){
        document.getElementById("cell"+a).src="nyilfel.png";
    }
    if(selected === 2 ){
        document.getElementById("cell"+a).src="nyille.png";
    }
    if(selected === 3 ){
        document.getElementById("cell"+a).src="nyilbal.png";
    }
    if(selected === 4 ){
        document.getElementById("cell"+a).src="nyiljobb.png";
    }
    if(selected === 5 ){
        document.getElementById("cell"+a).src="robot.png";
    }
}

function out(a){
        document.getElementById("cell"+a).src=save;
}

function click1(a,b){
    save = document.getElementById("cell"+a+""+b).src;
    if(selected === 5){
        x = a*1;
        y = b*1;
    }
}

function start(){
    nyilfel = document.getElementById("nyilfel").src;
    nyille = document.getElementById("nyille").src;
    nyiljobb = document.getElementById("nyiljobb").src;
    nyilbal = document.getElementById("nyilbal").src;
    console.log(x+""+y);
    var coor = x+""+y;

    
    if(irany === "jobb")y++;
    else if(irany === "bal")y--;
    else if(irany === "fel")x--;
    else if(irany === "le")x++;

    if (document.getElementById("cell"+(x)+""+y).src === nyille && y < nehez){
        irany = "le";
    }
    else if (document.getElementById("cell"+(x)+""+y).src === nyilfel && y > 1){
        irany = "fel";
    }
    else if (document.getElementById("cell"+x+""+(y)).src === nyilbal && x > 1){
        irany = "bal";
    }
    else if (document.getElementById("cell"+x+""+(y)).src === nyiljobb && x < nehez){
        irany = "jobb";
    }
    var sv = document.getElementById("cell"+x+""+y).src;
    document.getElementById("cell"+x+""+y).src = "robot.png";
    document.getElementById("cell"+coor).src = "blank.png";
    
    setTimeout(start,1000);
}