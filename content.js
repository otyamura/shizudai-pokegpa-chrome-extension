const max = 450;

$(function(){
  let dic = "";
  let dicArray = new Array();
  chrome.storage.sync.get(["GPAPokeDic"], function (value) {
    if (typeof value.GPAPokeDic === 'undefined') {
      for (let i = 0; i < max; i++) {
        dic = dic + "0";
      }
    } else {
      dic = value.GPAPokeDic;
    }
    for (let i = 0; i < max; i++) {
      dicArray.push(parseInt(dic.charAt(i)));
    }
  });
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
        dicArray[number - 1] = 1;
        const pokeName = result.names[0].name;
        showMessage(`あなたのGPAポケモンは<b>${pokeName}</b>です!`);
        showMessage(`<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${number}.png" style="background-color: #eeeeee;border: solid 1px #9e9e9e;">`);
        showDictionary(dicArray);
        let dicSave = "";
        for (let i = 0; i < max; i++) {
          dicSave = dicSave + dicArray[i];
        }
        chrome.storage.sync.set({'GPAPokeDic': dicSave}, function(){});
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

function showDictionary(dicArray) {
  let output = "";
  let imageOpacity = "";
  let getCount = 0;
  let complete = 0.0;
  for (let i = 0; i < max; i++) {
    if (dicArray[i] == 1) {
      getCount++;
    }
    switch (dicArray[i]) {
      case 0:
        imageOpacity = "0.3";
        break;
      case 1:
        imageOpacity = "1";
        break;
    }
    output = output + `<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i + 1}.png" width="32" height="32" style="image-rendering: pixelated;opacity: ${imageOpacity};">`;
  }
  complete = (getCount / max) * 100;
  showMessage(`<div class="txt16" style="margin-top: 30px;color: #0000ff;">GPAポケモン図鑑</div>`);
  showMessage(`<div style="margin-top: -10px;margin-bottom: 5px;font-size: 14px;">コンプ率：${complete.toFixed(2)}% (${getCount}/${max})</div>`);
  showMessage(output);
}