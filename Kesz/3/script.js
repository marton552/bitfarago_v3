var n;
var x = 0;

function play(){
    var d = new Date();
    n = d.getTime();
    document.getElementById("a").innerHTML="";
    for(var i = 1; i < 9; i++){
    document.getElementById("a").innerHTML+="<span id="+i+" onclick='asd("+i+")' style='left:"+Math.random()*95+"vw; top: "+Math.random()*90+"vh;'>"+i+"</span>";}
    document.getElementById("a").innerHTML+="<span onclick='asd2()' style='left:"+Math.random()*95+"vw; top: "+Math.random()*90+"vh;'>"+9+"</span>";

}

function asd(w){
    document.getElementById(w).style.display = "none";
    x++;
}

function asd2(){
    if(x === 8){
    var d2 = new Date();
    var n2 = d2.getTime();
    alert((n2-n)/1000+"másodperc kellett");}
}