
//vi lagde en universal konstruktør for å gjøre ting mer oversiktlig.
function constr(file) {
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
  };
  this.getNames = function() {
    // Vi legger til alle elementer i en liste.//
    var list = []
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
   som name og data av den valgte kommunen.  */
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
