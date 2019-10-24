var szoveg = "";
function gomb1(){
    szoveg = "";
    var a = document.getElementById("textbox").value;
    var tomb = a.split("-");
    for(var i = 0; i < tomb.length; i++){
        if(tomb[i].charAt(0) === "1"){
            szoveg+="1";
        }
        if(tomb[i].charAt(0) === "2"){
            if(tomb[i].length === 1){
                szoveg+="1";
            }
            if(tomb[i].length === 2){
                szoveg+="a";
            }
            if(tomb[i].length === 3){
                szoveg+="b";
            }
            if(tomb[i].length > 3){
                szoveg+="c";
            }
        }
        if(tomb[i].charAt(0) === "3"){
            if(tomb[i].length === 1){
                szoveg+="3";
            }
            if(tomb[i].length === 2){
                szoveg+="d";
            }
            if(tomb[i].length === 3){
                szoveg+="e";
            }
            if(tomb[i].length > 3){
                szoveg+="f";
            }
        }
        if(tomb[i].charAt(0) === "4"){
            if(tomb[i].length === 1){
                szoveg+="4";
            }
            if(tomb[i].length === 2){
                szoveg+="g";
            }
            if(tomb[i].length === 3){
                szoveg+="h";
            }
            if(tomb[i].length > 3){
                szoveg+="i";
            }
        }
        if(tomb[i].charAt(0) === "5"){
            if(tomb[i].length === 1){
                szoveg+="5";
            }
            if(tomb[i].length === 2){
                szoveg+="j";
            }
            if(tomb[i].length === 3){
                szoveg+="k";
            }
            if(tomb[i].length > 3){
                szoveg+="l";
            }
        }
        if(tomb[i].charAt(0) === "6"){
            if(tomb[i].length === 1){
                szoveg+="6";
            }
            if(tomb[i].length === 2){
                szoveg+="m";
            }
            if(tomb[i].length === 3){
                szoveg+="n";
            }
            if(tomb[i].length > 3){
                szoveg+="o";
            }
        }
        if(tomb[i].charAt(0) === "7"){
            if(tomb[i].length === 1){
                szoveg+="7";
            }
            if(tomb[i].length === 2){
                szoveg+="p";
            }
            if(tomb[i].length === 3){
                szoveg+="q";
            }
            if(tomb[i].length === 4){
                szoveg+="r";
            }
            if(tomb[i].length > 4){
                szoveg+="s";
            }
        }
        if(tomb[i].charAt(0) === "8"){
            if(tomb[i].length === 1){
                szoveg+="8";
            }
            if(tomb[i].length === 2){
                szoveg+="t";
            }
            if(tomb[i].length === 3){
                szoveg+="u";
            }
            if(tomb[i].length > 3){
                szoveg+="v";
            }
        }
        if(tomb[i].charAt(0) === "9"){
            if(tomb[i].length === 1){
                szoveg+="9";
            }
            if(tomb[i].length === 2){
                szoveg+="w";
            }
            if(tomb[i].length === 3){
                szoveg+="x";
            }
            if(tomb[i].length === 4){
                szoveg+="y";
            }
            if(tomb[i].length > 4){
                szoveg+="z";
            }
        }
        if(tomb[i].charAt(0) === "*"){
            szoveg+="*";
        }
        if(tomb[i].charAt(0) === "0"){
            szoveg+="0";
        }
        if(tomb[i].charAt(0) === "#"){
            szoveg+="x";
        }
    }
    document.getElementById("textbox1").value = szoveg;
}

function gomb2(){
    szoveg = "";
    var a = document.getElementById("textbox").value;
    for(var i = 0; i<a.length;i++){
        if(a.charAt(i) === "1"){
            szoveg+= "1";
        }
        if(a.charAt(i) === "2"){
            szoveg+= "2";
        }
        if(a.charAt(i) === "a"){
            szoveg+= "22";
        }
        if(a.charAt(i) === "b"){
            szoveg+= "222";
        }
        if(a.charAt(i) === "c"){
            szoveg+= "2222";
        }
        if(a.charAt(i) === "3"){
            szoveg+= "3";
        }
        if(a.charAt(i) === "d"){
            szoveg+= "33";
        }
        if(a.charAt(i) === "e"){
            szoveg+= "333";
        }
        if(a.charAt(i) === "f"){
            szoveg+= "3333";
        }
        if(a.charAt(i) === "4"){
            szoveg+= "4";
        }
        if(a.charAt(i) === "g"){
            szoveg+= "44";
        }
        if(a.charAt(i) === "h"){
            szoveg+= "444";
        }
        if(a.charAt(i) === "i"){
            szoveg+= "4444";
        }
        if(a.charAt(i) === "5"){
            szoveg+= "5";
        }
        if(a.charAt(i) === "j"){
            szoveg+= "55";
        }
        if(a.charAt(i) === "k"){
            szoveg+= "555";
        }
        if(a.charAt(i) === "l"){
            szoveg+= "5555";
        }
        if(a.charAt(i) === "6"){
            szoveg+= "6";
        }
        if(a.charAt(i) === "m"){
            szoveg+= "66";
        }
        if(a.charAt(i) === "n"){
            szoveg+= "666";
        }
        if(a.charAt(i) === "o"){
            szoveg+= "6666";
        }
        if(a.charAt(i) === "7"){
            szoveg+= "7";
        }
        if(a.charAt(i) === "p"){
            szoveg+= "77";
        }
        if(a.charAt(i) === "q"){
            szoveg+= "777";
        }
        if(a.charAt(i) === "r"){
            szoveg+= "7777";
        }
        if(a.charAt(i) === "s"){
            szoveg+= "77777";
        }
        if(a.charAt(i) === "8"){
            szoveg+= "8";
        }
        if(a.charAt(i) === "t"){
            szoveg+= "88";
        }
        if(a.charAt(i) === "u"){
            szoveg+= "888";
        }
        if(a.charAt(i) === "v"){
            szoveg+= "8888";
        }
        if(a.charAt(i) === "9"){
            szoveg+= "9";
        }
        if(a.charAt(i) === "w"){
            szoveg+= "99";
        }
        if(a.charAt(i) === "9x"){
            szoveg+= "999";
        }
        if(a.charAt(i) === "y"){
            szoveg+= "9999";
        }
        if(a.charAt(i) === "z"){
            szoveg+= "99999";
        }
        if(a.charAt(i) === "*"){
            szoveg+= "*";
        }
        if(a.charAt(i) === "#"){
            szoveg+= "#";
        }
        if(a.charAt(i) === "0"){
            szoveg+= "0";
        }
        szoveg+="-";
    }
    document.getElementById("textbox1").value = szoveg.substring(0,szoveg.length-1);
}