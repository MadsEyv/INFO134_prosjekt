
function openNav() {
  document.getElementById("mySidebar").style.width = "250px";
};
function closeNav() {
  document.getElementById("mySidebar").style.width = "0";
};
function removediv(div) {
  var liste = ["intro", "oversikt", "detaljer", "sammenligning"];
  for (var i in liste) {
    if (liste[i] === div) {
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
  //denne funksjonen sender forespørsel om å laste ned datasettet.
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
/* Her tar vi et parameter kommunenr, og iterer over for å sammenligne.
   Derved tar vi å lager et nytt object(information), og legger til properties
   som name og data av den valgte kommunen. */
  this.getInfo = function(kommunenr) {
    for (var x in this.data) {
      if (this.data[x].kommunenummer == kommunenr) {
        var information = new Object();
        information.name = x;
        information.data = this.data[g];
        return information
      }
    }
    return list;
  };
};

var befolkning = new constructor("http://wildboy.uib.no/~tpe056/folk/104857.json");
befolkning.load("befolk");
var sysselsatte = new constructor("http://wildboy.uib.no/~tpe056/folk/100145.json");
sysselsatte.load("syssels");
var utdanning = new constructor("http://wildboy.uib.no/~tpe056/folk/85432.json");
utdanning.load("utdan");
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
function detaljTabell(){
  document.getElementById("detaljer").innerHTML="";
  var tabell2 = document.createElement("TABLE");
  tabell2.setAttribute("id", "tabell2");
  document.getElementById('detaljer').appendChild(tabell2);
  var id = document.getElementById("inputnr".value)
  try {
  /*
  var befolkningsinfo = befolkning.getInfo(id)
  var sysselsatteinfo = sysselsatte.getInfo(id)
  var utdanningsinfo = utdanning.getInfo(id)
  */
  if(id == "") throw "ingenting skrevet!";
  }
  catch(err) {
    document.getElementById('detaljer').innerHTML= "Feil:" + err;
  }
    appendrad("tabell2", "byer", "kommuner");
    appendrad("tabell2", "ider", "kommuneID");
    appendrad("tabell2", "bef", "befolkning");
    appendrad("tabell2", "befvekst", "befolkningsvekst");
    appendrad("tabell2", "statsant", "statistikk for sysselsetting");
    appendrad("tabell2", "statspros", "prosent for sysselsetting");
    appendrad("tabell2", "utdanant", "utdanning antall");
    appendrad("tabell2", "utdanpros", "utdanning prosent");

};
  var id = document.getElementById("inputnr".value)
