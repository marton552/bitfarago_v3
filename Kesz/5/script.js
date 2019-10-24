var szamok = []; 

function bead() {
    var be = document.getElementById("be").value;
    document.getElementById("be").value = "";

    if(isNaN(be) == false) {
        if(be >= 0) {
            szamok.push(be);
            document.getElementById("szamok").innerHTML += be + ", ";
        }else alert("A beadott számnak pozitívnek kell lennie.");
    }else alert("A beadott számnak számnak kell lennie.");
}

function hasonlo() {
    document.getElementById("szamparok").innerHTML = "";

    for(var i = 0; i < szamok.length; i++) {
        for(var j = i; j < szamok.length; j++) {
            if(i != j) {
                if(isSame(szamok[i], szamok[j]) == true) {
                    document.getElementById("szamparok").innerHTML += "<p>"+szamok[i]+" - "+szamok[j]+"</p>";
                }
            }
        }
    }
}

function clearlist() {
    szamok = [];
    document.getElementById("szamok").innerHTML = "";
}

function isSame(a, b) {
    var at = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var bt = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    
    for(var i = 0; i < a.length; i++) at[a[i]]++;
    for(var i = 0; i < b.length; i++) bt[b[i]]++;

    for(var i = 0; i < at.length; i++) {
        if(at[i] != bt[i]) { return false;}
    }

    return true;
}