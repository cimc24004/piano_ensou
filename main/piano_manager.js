let codeTypes = [
  //三和音
    {'codeName': '(M)',
        'codeKeys': [1,5,8]},
    {'codeName': 'm',
        'codeKeys': [1,4,8]},
    {'codeName': 'dim',
        'codeKeys': [1,4,7]},
    {'codeName': 'aug',
        'codeKeys': [1,5,9]},
    {'codeName': 'sus4',
        'codeKeys': [1,6,8]},
    //四和音
    {'codeName': 'M7',
        'codeKeys': [1,5,8,12]},
    {'codeName': '7',
        'codeKeys': [1,5,8,11]},	
    {'codeName': 'mM7',
        'codeKeys': [1,4,8,12]},
    {'codeName': 'm7',
        'codeKeys': [1,4,8,11]},
    {'codeName': 'm7(-5)',
        'codeKeys': [1,4,7,11]},
    {'codeName': 'dim7',
        'codeKeys': [1,4,7,10]},
    {'codeName': 'augM7',
        'codeKeys': [1,5,9,12]},	
    {'codeName': 'aug7',
        'codeKeys': [1,5,9,11]},	
    {'codeName': 'M7sus4',
        'codeKeys': [1,6,8,12]},	
    {'codeName': '7sus4',
        'codeKeys': [1,6,8,11]},	
    {'codeName': '6',
        'codeKeys': [1,5,8,10]},	

    {'codeName': 'm6',
        'codeKeys': [1,4,8,10]},
    {'codeName': "7(#9)",
        'codeKeys': [1,5,8,11,16]}
];

let elements_by_piano = {
    "C2":0,
    "D2":2,
    "E2":4,
    "F2":5,
    "G2":7,
    "A2":9,
    "B2":11,
    "C3":12,
    "D3":14,
    "E3":16,
    "F3":17,
    "G3":19,
    "A3":21,
    "B3":23,
    "C4":24,
    "D4":26,
    "E4":28,
    "F4":29,
    "G4":31,
    "A4":33,
    "B4":35,

    "C#2":1,
    "D#2":3,
    "F#2":6,
    "G#2":8,
    "A#2":10,
    "C#3":13,
    "D#3":15,
    "F#3":18,
    "G#3":20,
    "A#3":22,
    "C#4":25,
    "D#4":27,
    "A#4":30,
    "G#4":32,
    "F#4":34
}
let chord_root_start_data = {
  "C" : {
    "n" :"C3",
    "#":"C#3",
    "b":"B2"
  },
  "D" : {
    "n" :"D3",
    "#":"D#3",
    "b":"C#3"
  },
  "E" : {
    "n" :"E3",
    "#":"F3",
    "b":"D#3"
  },
  "F" : {
    "n" :"F3",
    "#":"F#3",
    "b":"E3"
  },
  "G" : {
    "n" :"G2",
    "#":"G#2",
    "b":"F#2"
  },
  "A" : {
    "n" :"A2",
    "#":"A#2",
    "b":"G#2"
  },
  "B" : {
    "n" :"B2",
    "#":"C#3",
    "b":"A#2"
  },
}

let pianos = document.getElementsByClassName("piano");
let chord_play_button = document.getElementById("ChordsPlayButton");

for(let i = 0; i < pianos.length; i++){
  let text = document.createElement("p");
  text.textContent = i;
  text.style.fontSize = "5px";
  text.style.position = "absolute";
  text.style.bottom = "25px";
  text.style.color = "red";
  text.style.zIndex = "100";
  pianos[i].appendChild(text);
}
chord_play_button.addEventListener("click", function(event){
  let marked_piano = document.getElementsByClassName("mark_on_piano");
  for(let i = 0; i < marked_piano.length; i++){
    clickEvent(marked_piano[i].parentElement);
    setTimeout(function(){UpEvent(marked_piano[i].parentElement)}, 1000);

  }
});
function root_start_get(key, symbol){
  return chord_root_start_data[key][symbol];
}
function get_element_by_key(piano_key){
  return pianos[elements_by_piano[piano_key]];
}
contents_on_piano(root_start_get("G", "n"), "(M)");
function contents_on_piano(root_start_key, _codeName){
  let get_element = get_element_by_key(root_start_key);
  //何番目の要素か
  let start_index = elements_by_piano[root_start_key];
  let piano_cords_keys = FindCodeTypeByCodeName(_codeName);
  console.log(piano_cords_keys.codeKeys);
  
  for(let i = 0; i < piano_cords_keys.codeKeys.length; i++){
    MarkOnPiano(pianos[(start_index + piano_cords_keys.codeKeys[i]) - 1]);
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
