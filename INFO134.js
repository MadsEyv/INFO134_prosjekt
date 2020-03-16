function load(url) {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "http://wildboy.uib.no/~tpe056/folk/104857.json");
  xhr.onreadystatechange = function(){
    if (xhr.readyState === 4 && xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);
      //console.log(response);
      //console.log(response.elementer.Moss.Kvinner);
    }
  };
  xhr.send()
}

function visdata(data, kommune) {
  return data.elementer[kommune].Menn[tall] + return data.elementer[kommune].Kvinner[tall]
}

function sjekk(antall) {
  return data.datasett[kommune]
}
