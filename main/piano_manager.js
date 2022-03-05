let codeTypes = [
    {'codeName': '(M)',
        'codeKeys': [1,5,8]},
    {'codeName': 'm',
        'codeKeys': [1,4,8]},
    {'codeName': 'dim',
        'codeKeys': [1,4,7]},
    {'codeName': 'aug',
        'codeKeys': [1,5,9]},
    {'codeName': '7',
        'codeKeys': [1,5,8,11]},
    {'codeName': 'm7',
        'codeKeys': [1,4,8,11]},
    {'codeName': 'maj7',
        'codeKeys': [1,5,8,12]},
    {'codeName': 'dim7',
        'codeKeys': [1,4,7,10]},
    {'codeName': 'm7(-5)',
        'codeKeys': [1,4,7,11]},
    {'codeName': 'sus4',
        'codeKeys': [1,6,8]},
    {'codeName': 'sus2',
        'codeKeys': [1,3,8]},
    {'codeName': '7sus4',
        'codeKeys': [1,6,8,11]},	
    {'codeName': '6',
        'codeKeys': [1,5,8,10]},	
    {'codeName': 'm6',
        'codeKeys': [1,4,8,10]},
    {'codeName': '9',
        'codeKeys': [1,5,8,11,15]},
    {'codeName': 'm9',
        'codeKeys': [1,4,8,11,15]},
    {'codeName': 'maj9',
        'codeKeys': [1,5,8,12,15]},
    {'codeName': '11',
        'codeKeys': [1,5,8,11,15,18]},
    {'codeName': 'm11',
        'codeKeys': [1,4,8,11,15,18]},
    {'codeName': 'maj11',
        'codeKeys': [1,5,8,12,15,18]},
    {'codeName': '13',
        'codeKeys': [1,5,8,11,15,18,22]},
    {'codeName': 'm13',
        'codeKeys': [1,4,8,11,15,18,22]},
    {'codeName': 'maj13',
        'codeKeys': [1,5,8,12,15,18,22]},
    {'codeName': 'add9',
        'codeKeys': [1,3,5,8]},
    {'codeName': '6/9',
        'codeKeys': [1,3,5,8,10]},
    {'codeName': '5',
        'codeKeys': [1,8]},
    {'codeName': "7(b5)",
        'codeKeys': [1,5,7,11]},
    {'codeName': "7(b9)",
        'codeKeys': [1,5,8,11,14]},
    {'codeName': "7(#9)",
        'codeKeys': [1,5,8,11,16]},
];

let elements_by_piano = {
    "C3":0,
    "D3":2,
    "E3":4,
    "F3":5,
    "G3":7,
    "A3":9,
    "B3":11,
    "C4":12,
    "D4":14,
    "E4":16,
    "F4":17,
    "G4":19,
    "A4":21,
    "B4":23,
    "C5":24,
    "D5":26,
    "E5":28,
    "F5":29,
    "G5":31,
    "A5":33,
    "B5":35,

    "C#3":1,
    "D#3":3,
    "F#3":6,
    "G#3":8,
    "A#3":10,
    "C#4":13,
    "D#4":15,
    "F#4":18,
    "G#4":20,
    "A#4":22,
    "C#5":25,
    "D#5":27,
    "A#5":30,
    "G#5":32,
    "F#5":34
}
let chord_root_start_data = {
  "C" : {
    "n" :"C4",
    "#":"C#4",
    "b":"B3"
  },
  "D" : {
    "n" :"D4",
    "#":"D#4",
    "b":"C#4"
  },
  "E" : {
    "n" :"E4",
    "#":"F4",
    "b":"D#4"
  },
  "F" : {
    "n" :"F4",
    "#":"F#4",
    "b":"E4"
  },
  "G" : {
    "n" :"G3",
    "#":"G#3",
    "b":"F#3"
  },
  "A" : {
    "n" :"A3",
    "#":"A#3",
    "b":"G#3"
  },
  "B" : {
    "n" :"B3",
    "#":"C#4",
    "b":"A#3"
  },
}
let TimeIntervalEvent = null;
let TimeOutEvent = null;
let pianos = document.getElementsByClassName("piano");
let chord_play_button = document.getElementById("ChordsPlayButton");

let chord_select = document.getElementById("chord-select");
let symbol_select = document.getElementById("symbol-select");
let key_select = document.getElementById("key-select");

//順番デバッグ用
// for(let i = 0; i < pianos.length; i++){
//   let text = document.createElement("p");
//   text.textContent = i;
//   text.style.fontSize = "5px";
//   text.style.position = "absolute";
//   text.style.bottom = "25px";
//   text.style.color = "red";
//   text.style.zIndex = "100";
//   pianos[i].appendChild(text);
// }


let pianos_data_now = {
  piano_key: "C",
  symbol: "n",
  codeName: "(M)"
};


//書記
contents_on_piano(root_start_get(pianos_data_now.piano_key, pianos_data_now.symbol), pianos_data_now.codeName);

chord_select.addEventListener("change", function(event){
  pianos_data_now.codeName = event.target.value;
  
  clearInterval(TimeIntervalEvent);
  clearTimeout(TimeOutEvent);

  reset_contents_on_piano();
  contents_on_piano(root_start_get(pianos_data_now.piano_key, pianos_data_now.symbol), pianos_data_now.codeName);
});
key_select.addEventListener("change", function(event){
  pianos_data_now.piano_key = event.target.value;

  clearInterval(TimeIntervalEvent);
  clearTimeout(TimeOutEvent);

  reset_contents_on_piano();
  contents_on_piano(root_start_get(pianos_data_now.piano_key, pianos_data_now.symbol), pianos_data_now.codeName);
});
symbol_select.addEventListener("change", function(event){
  pianos_data_now.symbol = event.target.value;

  clearInterval(TimeIntervalEvent);
  clearTimeout(TimeOutEvent);

  reset_contents_on_piano();
  contents_on_piano(root_start_get(pianos_data_now.piano_key, pianos_data_now.symbol), pianos_data_now.codeName);
});


chord_play_button.addEventListener("click", function(event){
  let marked_piano = document.getElementsByClassName("mark_on_piano");
  clearInterval(TimeIntervalEvent);
  clearTimeout(TimeOutEvent);
  for(let i = 0; i < marked_piano.length; i++){
    if(marked_piano[i] != null){
      clickEvent(marked_piano[i].parentElement);
      setTimeout(function(){
        UpEvent(marked_piano[i].parentElement);
      }, 1000);
    }

  }
  let count = 0;

  TimeOutEvent = setTimeout(function(){
    TimeIntervalEvent = setInterval(function(){
      console.log("-----------------");
      if(count < marked_piano.length){
        clickEvent(marked_piano[count].parentElement);
        setTimeout(function(){
          UpEvent(marked_piano[count - 1].parentElement);
        }, 500);
      }else{
        clearInterval(TimeIntervalEvent);
      }
      count += 1;
    }, (count + 1) * 1000);
  }, 1000);
});
function root_start_get(key, symbol){
  return chord_root_start_data[key][symbol];
}
function get_element_by_key(piano_key){
  return pianos[elements_by_piano[piano_key]];
}
function contents_on_piano(root_start_key, _codeName){

  let get_element = get_element_by_key(root_start_key);
  let event;
  //何番目の要素か
  let start_index = elements_by_piano[root_start_key];
  let piano_cords_keys = FindCodeTypeByCodeName(_codeName);
  console.log(piano_cords_keys.codeKeys);
  
  for(let i = 0; i < piano_cords_keys.codeKeys.length; i++){
    MarkOnPiano(pianos[(start_index + piano_cords_keys.codeKeys[i]) - 1]);
  }


}
function reset_contents_on_piano(){
  let mark_on_pianos = document.getElementsByClassName("mark_on_piano");
  let length = mark_on_pianos.length;
  
  for(let i = 0; i < length; i++){
    console.log(i);
    mark_on_pianos[0].remove();
  }
}

function MarkOnPiano(target_piano_element){
  let i = document.createElement("i");
  i.className = "mark_on_piano";
  target_piano_element.appendChild(i);
}

function FindCodeTypeByCodeName(_codeName){
  for(let i = 0; i < codeTypes.length; i++){
    if(codeTypes[i].codeName == _codeName){
      return codeTypes[i];
    }
  }
}
