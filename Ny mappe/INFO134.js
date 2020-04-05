
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
//vi lagde en universal konstruktør for å gjøre ting mer oversiktlig.
function constructor(file) {
  this.data = undefined;
  this.load = function(fiks) {
  let xhr = new XMLHttpRequest();
    xhr.open("GET", file);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        category = JSON.parse(xhr.responseText);
        if (file == "Befolkning") {
          befolkning.data = category.elementer;
          befolkning.onload();
        }
        if (file == "Sysselsatte") {
          sysselsatte.data = category.elementer;
          sysselsatte.onload();
        }
        if (file == "Utdanning") {
          utdanning.data = category.elementer;
          utdanning.onload();
        }
  }
    }
    xhr.send()
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
befolkning.load("Befolkning");
var sysselsatte = new constructor("http://wildboy.uib.no/~tpe056/folk/100145.json");
sysselsatte.load("Sysselsatte");
var utdanning = new constructor("http://wildboy.uib.no/~tpe056/folk/85432.json");
sysselsatte.load("Utdanning");

function lagEnRad(id1, id2, data) {
  var vv = document.createElement("TR");
  vv.setAttribute("id", id2);
  document.getElementById(id1).appendChild(vv);
  var m = document.createElement("TD");
  var n = document.createTextNode(data);
  m.appendChild(n);
  document.getElementById(id2).appendChild(m);
}

function leggTilInfoIRaden(id, data) {
  var cc = document.createElement("TD");
  var dd = document.createTextNode(data);
  cc.appendChild(dd);
  document.getElementById(id).appendChild(cc);
}

function oversiktTabell() {
 //Tømmer diven for ny tabell
 document.getElementById("alleKommunene").innerHTML = "";
 //Lager en tabell
  var x = document.createElement("TABLE");
  x.setAttribute("id", "oversiktTable");
  document.getElementById("alleKommunene").appendChild(x);

  lagEnRad("oversiktTable", "byane", "Kommuner");
  lagEnRad("oversiktTable", "KN", "Kommunenr.");
  lagEnRad("oversiktTable", "sistBefolk", "Sist målte befolkning");

  for (var i in befolkning.data) {
    leggTilInfoIRaden("byane", i);
    leggTilInfoIRaden("KN", befolkning.data[i].kommunenummer);
    var lista = [];
    for (var u in befolkning.data[i].Menn) {
      lista.push(u);
    }
    var punkt = lista.length - 1;
    var menn = befolkning.data[i].Menn[lista[punkt]];
    var kvinner = befolkning.data[i].Kvinner[lista[punkt]];
    leggTilInfoIRaden("sistBefolk", menn + kvinner);
  }
}

function aktiverOversikt(target) {
 oversiktTabell();
 removediv(target);
}
