$(function(){
  const gpaSelector = 'body > table:nth-child(3) > tbody > tr > td > table > tbody > tr:nth-child(2) > td:nth-child(2)';
  const gpaElement = document.querySelector(gpaSelector);
  const gpa = gpaElement.textContent;
  console.log(gpa);
  const number = String(gpa * 100).slice(0, 3);
  console.log(number);
  $.ajax({
    type: "GET",
    url: `https://pokeapi.co/api/v2/pokemon-species/${number}`,
    dataType: "json",
    success: function(result, status, xhr){
      console.log(result);
      const pokeName = result.names[0].name;
      console.log(pokeName);
      const tableSelector = 'body > table:nth-child(3)';
      const tableElement = document.querySelector(tableSelector);
      const element = document.createElement('p');
      element.textContent = `あなたのGPAポケモンは${pokeName}です！`;
      tableElement.appendChild(element);
    },
    error: function(xhr, status, error) {
      console.log(error);
    }
  });
});
