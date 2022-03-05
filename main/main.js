window.addEventListener('DOMContentLoaded', function(){
  let pianos = document.getElementsByClassName("piano");
  let piano_texts = document.getElementsByClassName("piano-text");
  let note_button = document.getElementById("NoteButton");
  let hide_mode = true;
  let key_piano = false;
  let onMouseNow = false;
  let key_for_pianos = {
    "z" : "C2",
    "x" : "D2",
    "c" : "E2",
    "q" : "F2",
    "w" : "G2",
    "e" : "A2",
    "r" : "B2",
    "t" : "C3",
    "y" : "D3",
    "u" : "E3",
    "i" : "F3",
    "o" : "G3",
    "p" : "A3",
    "[" : "B3",
    "]" : "C4",
    "v" : "D4",
    "b" : "E4",
    "n" : "F4",
    "m" : "G4",
    "," : "A4",
    "." : "B4",


    "s" : "C#2",
    "d" : "D#2",
    "2" : "F#2",
    "3" : "G#2",
    "4" : "A#2",
    "6" : "C#3",
    "7" : "D#3",
    "9" : "F#3",
    "0" : "G#3",
    "-" : "A#3",
    "f" : "C#4",
    "g" : "D#4",
    "l" : "A#4",
    "k" : "G#4",
    "j" : "F#4"
  }
  let pushed_key_history = [

  ]
  // const synth = new Tone.Synth({
  //   oscillator: {
  //     type: "triangle8"
  //   }
  // }).toMaster();
  console.log("This is created by Kuroonrails");


  document.getElementsByClassName("piano-plugin-kuroonrails")[0].style.display = "block";

  for(let i = 0; i < pianos.length; i++){

    pianos[i].addEventListener("mousedown", function(event){
      clickEvent(event.target);
      onMouseNow = true;
    });
    pianos[i].addEventListener("mouseup", function(event){
      UpEvent(event.target);
      onMouseNow = false;
    });
    pianos[i].addEventListener("mouseout", function(event){
      if(onMouseNow){
        UpEvent(event.target);
        onMouseNow = false;
      }
    });
  }
  note_button.addEventListener("click", function(event){
    if(!hide_mode){
      piano_texts_control(true);
    }else{
      piano_texts_control(false);
    }

  });
  console.log(codeTypes);
  document.addEventListener("keypress", function(event){
    var target = document.getElementById(key_for_pianos[event.key]);
    if(target != null && pushed_key_history[pushed_key_history.length - 1] != event.key){
      clickEvent(target);
      key_piano = true;
    }
    pushed_key_history.push(event.key);
  });
  document.addEventListener("keyup", function(event){
    var target = document.getElementById(key_for_pianos[event.key]);
    UpEvent(target);
    key_piano = false;
    pushed_key_history = [];
  });

  function piano_texts_control(hide){
    if(!hide){
      //表示させる
      for(let i = 0; i < piano_texts.length; i++){
        piano_texts[i].style.display = "none";
      }
      note_button.textContent = "音名を非表示";
      hide_mode = false;
    }else{
      //表示させない
      for(let i = 0; i < piano_texts.length; i++){
        piano_texts[i].style.display = "block";
      }
      note_button.textContent = "音名を表示";
      hide_mode = true;
    }
  }
});