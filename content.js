$(function(){
  const gpaSelector = 'body > table:nth-child(3) > tbody > tr > td > table > tbody > tr:nth-child(2) > td:nth-child(2)';
  const gpaElement = document.querySelector(gpaSelector);
  const gpa = gpaElement.textContent;
  const number = String(gpa * 100).slice(0, 3);
  if (number > 0) {
    $.ajax({
      type: "GET",
      url: `https://pokeapi.co/api/v2/pokemon-species/${number}`,
      dataType: "json",
      success: function(result, status, xhr){
        const pokeName = result.names[0].name;
        showMessage(`あなたのGPAポケモンは<b>${pokeName}</b>です!`);
        showMessage(`<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${number}.png" style="background-color: #eeeeee;border: solid 1px #9e9e9e;">`);
      },
      error: function(xhr, status, error) {
        console.log(error);
      }
    });
  }
});

function showMessage(str) {
  const tableSelector = 'body > table:nth-child(3)';
  const tableElement = document.querySelector(tableSelector);
  const element = document.createElement('p');
  element.innerHTML = str;
  tableElement.appendChild(element);
}