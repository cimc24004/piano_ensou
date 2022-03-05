window.addEventListener('DOMContentLoaded', function(){
  let pianos = document.getElementsByClassName("piano");
  let piano_texts = document.getElementsByClassName("piano-text");
  let note_button = document.getElementById("NoteButton");
  let hide_mode = true;
  let key_piano = false;
  let onMouseNow = false;
  let key_for_pianos = {
    "z" : "C3",
    "x" : "D3",
    "c" : "E3",
    "q" : "F3",
    "w" : "G3",
    "e" : "A3",
    "r" : "B3",
    "t" : "C4",
    "y" : "D4",
    "u" : "E4",
    "i" : "F4",
    "o" : "G4",
    "p" : "A4",
    "[" : "B4",
    "]" : "C5",
    "v" : "D5",
    "b" : "E5",
    "n" : "F5",
    "m" : "G5",
    "," : "A5",
    "." : "B5",


    "s" : "C#3",
    "d" : "D#3",
    "3" : "F#3",
    "4" : "G#3",
    "5" : "A#3",
    "6" : "C#4",
    "7" : "D#4",
    "9" : "F#4",
    "0" : "G#4",
    "-" : "A#4",
    "f" : "C#5",
    "g" : "D#5",
    "l" : "A#5",
    "k" : "G#5",
    "j" : "F#5"
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
  if(note_button != null){
    note_button.addEventListener("click", function(event){
      if(!hide_mode){
        piano_texts_control(true);
      }else{
        piano_texts_control(false);
      }

    });
  }

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