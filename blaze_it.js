document.getElementById('btn1').addEventListener("click", function()
{
  var box1 = document.getElementById("red");
  if (box1.style.display=="none")
  {
    box1.style.display="block";
  }
  else
  {
    box1.style.display="none";
  }
})

document.getElementById('btn2').addEventListener("click", function()
{
  var box2 = document.getElementById('yellow');
  if (box2.style.display=="none")
  {
    box2.style.display="block";
  }
  else
  {
    box2.style.display="none";
  }
})

document.getElementById('btn3').addEventListener("click", function()
{
  var box3 = document.getElementById('green');
  if (box3.style.display=="none")
  {
    box3.style.display="block";
  }
  else
  {
    box3.style.display="none";
  }
})
