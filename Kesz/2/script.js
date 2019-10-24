/*
 ’1’-es karakterek összes száma
 ’0’-ás karakterek összes száma
 Leghosszabb ’1’-es sorozat
 Leghosszabb ’0’-ás sorozat
 Leghosszabb váltakozó sorozat (’0’ és ’1’ karakterek felváltva)
*/

function staticstics() {
    var be = document.getElementById("be").value;
    if(be != "") {
        if(isNaN(be) == false) {
            var ok = true;
            for(var i = 0; i < be.length; i++) {
                if(be[i] == "0" || be[i] == "1") {
                    ok = true; //k
                }else { ok = false; break; }
            }

            if(ok == true) {
                updateGraph([sumBit(be, 1), sumBit(be, 0), biggestSeries(be, 1), biggestSeries(be, 0), biggestSwitchingS(be)])
            } else alert("A bitek csak 1-ből és 0-ból álhatnak!")
            
        }else alert("A bitek mezőbe csak számokat írhat be!");
    }else {
        alert("Nem maradhat üresen a bitek mező!");
    }
}

function sumBit(bits, a) {
    var db = 0;
    for(var i = 0; i < bits.length; i++) {
        if(bits[i] == a) db++;
    }

    return db;
}

function biggestSeries(bits, a) {
    var biggestDb = 0;
    var db = 0;
    for(var i = 0; i < bits.length; i++) {
        if(bits[i] == a) {
            db++;
        } else {
            if(db > biggestDb){ biggestDb = db; db = 0;}
        }
    }

    if(db > biggestDb){ biggestDb = db; db = 0;}


    return biggestDb;
}

function biggestSwitchingS(bits) {
    var biggestDb = 1;
    var db = 1;
    var lastBit = bits[0];
    for(var i = 1; i < bits.length; i++) {
        if(bits[i] == switchBit(lastBit)) {
            db++;
        } else {
            lastCharWasCorrect = false;
            if(db > biggestDb){ biggestDb = db; db = 1;}
        }

        lastBit = bits[i];
    }

    if(db > biggestDb){ biggestDb = db; db = 0;}


    return biggestDb;
}


function switchBit(a) {
    if(a == 0) return 1;
    else return 0;
}
var myChart;
function updateGraph(d) {
    var ctx = document.getElementById('chart');

    if(myChart) myChart.destroy();

    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['’1’-es karakterek összes száma', '’0’-ás karakterek összes száma', 'Leghosszabb ’1’-es sorozat', 'Leghosszabb ’0’-ás sorozat', 'Leghosszabb váltakozó sorozat'],
            datasets: [{
                label: ' db',
                data: d,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });

    
}

function generate() {
    var len = getRndInteger(10, 20);
    var str = "";

    for(var i = 0; i < len; i++) {
        str += getRndInteger(0, 1);
    }

    document.getElementById("be").value = str;
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }