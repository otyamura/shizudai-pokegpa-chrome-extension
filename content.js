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
        showMessage(`あなたのGPAポケモンは${pokeName}です!`);
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
  element.textContent = str;
  tableElement.appendChild(element);
}