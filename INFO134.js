
function openNav() {
  document.getElementById("mySidebar").style.width = "250px";
};
function closeNav() {
  document.getElementById("mySidebar").style.width = "0";
};
function removediv(div) {
  var liste = ["intro", "oversikt", "detaljer", "sammenligning"];
  for (var i in liste) {
    if (liste[i] == div) {
      document.getElementById(liste[i]).style.display = "block";
    }
    else{
      document.getElementById(liste[i]).style.display = "none";
    }
  }
};

function constructor(fil){
//vi lagde en universal konstruktør for å gjøre ting mer oversiktlig.
this.load = function(kategori){
  var respons = undefined;
  var htp = new XMLHttpRequest();
  htp.open("GET", fil, true);
  htp.onreadystatechange = function() {
    if (htp.readyState == 4 && htp.status == 200){
      respons = JSON.parse(htp.responseText);
      //kategori avgjør hvilke objektet som skal få datasettet
      if (kategori == "befolk"){
        // datasetter blir så lagt til i data til objektet
        befolkning.data = respons.elementer;
      }
      if (kategori == "syssels") {
        sysselsatte.data = respons.elementer;
      }
      if (kategori == "utdan") {
        utdanning.data = respons.elementer;
      }
    }
  };
  htp.send();
};
  this.getNames = function() {
    // Vi legger til alle elementer i en liste.//
    var list = [];
    for (var x in this.data) {
      liste.push(x);
    }
    return list;
  };

  this.getIDs = function() {
      // samme som getNames, men vi spesifiserer kun kommunenummer in i lista.//
    var list = []
    for (var x in this.data) {
      liste.push(this.data[x].kommunenummer);
    }
    return list;
  };
   this.getInfo = function(kn){
     for (var g in this.data) {
       if (this.data[g].kommunenummer == kn){
         var q = new Object({});
         q.name = g;
         q.data = this.data[g];
         return q;
       }
     }
   };
};

var befolkning = new constructor("http://wildboy.uib.no/~tpe056/folk/104857.json");
befolkning.load("befolk");
var sysselsatte = new constructor("http://wildboy.uib.no/~tpe056/folk/100145.json");
sysselsatte.load("syssels");
var utdanning = new constructor("http://wildboy.uib.no/~tpe056/folk/85432.json");
utdanning.load("utdan");
function headers(div, data){
 var h = document.createElement("H1")
 var t = document.createTextNode(data);
 h.appendChild(t);
 document.getElementById(div).appendChild(h);
 }
function appendrad(tabell, rowid, dataid) {
  var rad = document.createElement("TR");
  rad.setAttribute("id", rowid);
  document.getElementById(tabell).appendChild(rad);
  headerdata = document.createElement("TD");
  datanode = document.createTextNode(dataid);
  headerdata.appendChild(datanode);
  document.getElementById(rowid).appendChild(headerdata);
}


function addinfotorad(rowid, dataid) {
  var add_data = document.createElement("TD");
  var datanode = document.createTextNode(dataid);
  add_data.appendChild(datanode);
  document.getElementById(rowid).appendChild(add_data);
}

function oversiktTabell(){
  document.getElementById("oversikt").innerHTML="";
  var tabell1 = document.createElement("TABLE");
  tabell1.setAttribute("id", "tabell1");
  document.getElementById('oversikt').appendChild(tabell1);
  appendrad("tabell1", "byer", "kommuner");
  appendrad("tabell1", "ider", "kommuneID");
  appendrad("tabell1", "bef", "befolkning");
  appendrad("tabell1", "befvekst", "befolkningsvekst");

  for (var i in befolkning.data) {
    addinfotorad("byer", i);
    addinfotorad("ider", befolkning.data[i].kommunenummer);
    var menn = befolkning.data[i].Menn[2018];
    var kvinner = befolkning.data[i].Kvinner[2018];
    var test = menn + kvinner;
    addinfotorad("bef", test);
    var menngamle = befolkning.data[i].Menn[2007];
    var kvinngamle = befolkning.data[i].Kvinner[2007];
    var oldgang = menngamle + kvinngamle;
    var befolkningsvekst = Math.floor((test - oldgang) / test * 100) + " %"
    addinfotorad("befvekst", befolkningsvekst);
  }

};

function appendlist(id, data) {
  var y = document.createElement("LI");
  var t = document.createTextNode(data);
  y.appendChild(t);
  document.getElementById(id).appendChild(y);
}
function detaljTabell(){
  document.getElementById("informasjonsting").innerHTML="";
  var loadeddata = document.getElementById("listeinfo").value;
  var sys = sysselsatte.getInfo(loadeddata)
  var ut = utdanning.getInfo(loadeddata)
  var be = befolkning.getInfo(loadeddata)
  var what = document.createElement("UL");
  what.setAttribute("id", "detaljeliste");
  document.getElementById('informasjonsting').appendChild(what);
  appendlist("detaljeliste", "Kommune: " + be.name)
  appendlist("detaljeliste", "Kommunenr: " + loadeddata)
for (var i in be.data) {
    var menn = be.data.Menn[2018];
    var kvinner = be.data.Kvinner[2018];
    var test = menn + kvinner;
}
appendlist("detaljeliste", "Total befolkning(2018): " + test);
  var menn2 = sys.data.Menn[2018]
  var kvinner2 = sys.data.Kvinner[2018]
  var totalum = (menn2 + kvinner2) / 2
  appendlist("detaljeliste", "Sist målt sysselsetting(2018): " + totalum);
 //appendlist("detaljeliste", "Siste målt sysselsetting: "
 var menn3 = be.data.Menn[2018];
 var kvinner3 = be.data.Kvinner[2018];
 var test2 = menn3 + kvinner3;
 var antallsys = test2 * (totalum / 100);
 appendlist("detaljeliste", "antall sysselsettet(2018): " + antallsys);

var menn1 = ut.data["03a"].Menn[2017]
var menn2 = ut.data["04a"].Menn[2017]
var kvinner1 = ut.data["03a"].Kvinner[2017]
var kvinner2 = ut.data["04a"].Kvinner[2017]
var totalmenn = be.data.Menn[2017];
var totalkvinne = be.data.Kvinner[2017];
var prosmenn1 = totalmenn / 100 * menn1;
var prosmenn2 = totalmenn / 100 * menn2;
var proskvinne1 = totalkvinne / 100 * kvinner1;
var proskvinne2 = totalkvinne / 100 * kvinner2;
totaltutdannet = prosmenn1 + prosmenn2 + proskvinne1 + proskvinne2;
 appendlist("detaljeliste", "antall utdannet(2017): " + totaltutdannet);

headers("informasjonsting", "Befolkning")
var befvekst = document.createElement("TABLE");
befvekst.setAttribute("id", "befvekst");
document.getElementById('informasjonsting').appendChild(befvekst);
appendrad("befvekst", "års", "år");
appendrad("befvekst", "vekstt", "befolkningsendring");

for (var i in be.data.Kvinner)
  addinfotorad("års", i)
for (var i in be.data.Kvinner)
  addinfotorad("vekstt", be.data.Menn[i] + be.data.Kvinner[i])
headers("informasjonsting", "Sysselsattevekst")
var sysvekst = document.createElement("TABLE");
sysvekst.setAttribute("id", "sysvekst");
document.getElementById('informasjonsting').appendChild(sysvekst);
appendrad("sysvekst", "kek", "år");
appendrad("sysvekst", "endring", "vekst");
for (var i in sys.data.Menn){
  addinfotorad("kek", i)
}
for (i in sys.data["Begge kjønn"]) {
  addinfotorad("endring", sys.data["Begge kjønn"][i])
}

headers("informasjonsting", "Utdanningsvekst")
var utvekst = document.createElement("TABLE");
utvekst.setAttribute("id", "utvekst");
document.getElementById('informasjonsting').appendChild(utvekst);
appendrad("utvekst", "year", "år");
appendrad("utvekst", "11", "11");
appendrad("utvekst", "01", "01");
appendrad("utvekst", "02a", "02a");
appendrad("utvekst", "03a", "03a");
appendrad("utvekst", "04a", "04a");
appendrad("utvekst", "09a", "09a");
for (var i in ut.data["01"].Menn) {
  addinfotorad("year", i)
}
var alle =  ["11", "01", "02a", "03a", "04a", "09a"];
 for (var kk in ut.data["01"].Menn) {
  var arrayLength = alle.length;
  for (var i = 0; i < arrayLength; i++) {
    xxx = alle[i]
     var tall1 = ut.data[xxx].Menn[kk];
     var tall2 = ut.data[xxx].Kvinner[kk];
     var gjennomsnittet = (tall1 + tall2) / 2;
     gjennomsnittet = Math.round(gjennomsnittet * 100) / 100;
     addinfotorad(xxx, gjennomsnittet)
   }
 }
};
