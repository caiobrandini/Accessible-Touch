
var selecionado=0, alvo=null, text, border='', tts = null, lang;

const APIKey = 'YourAPIKey';


chrome.storage.onChanged.addListener(function (changes, namespace) {

  for (let [key, { oldValue, newValue }] of Object.entries(changes)) {

    if(key == 'accesOn'){
        if(newValue == '1') document.addEventListener('click', appOn, false);
        else {
            document.removeEventListener('click', appOn, false);
            if(alvo) alvo.style.border = border;
        }
    }

    if(key == 'lang'){
        lang = newValue;
    }

  }

});


chrome.storage.sync.get(['accesOn', 'lang'], function(on){

    if(!on.lang) {
        chrome.storage.sync.set({'lang': 'pt-br'});
        lang = 'pt-br';
    }
    else lang = on.lang;


    if(on.accesOn == '1') document.addEventListener('click', appOn, false);

});


function appOn (e) {
    
    if(selecionado) selecionado.style.border = border;

    e = e || window.event;
    alvo = e.alvo || e.srcElement;

    border = alvo.style.border;

    text = alvo.textContent || alvo.innerText || alvo.alt;

    //primeiro click
    if(selecionado != alvo){
        e.preventDefault();

        alvo.style.border = 'solid red 1px';

        if(tts) tts.pause();
        tts = new Audio('https://api.voicerss.org/?key='+APIKey+'&hl='+ lang +'&c=MP3&f=16khz_16bit_stereo&src='+ encodeURI(text));
        tts.play();
        selecionado = alvo;
    }
    else selecionado = 0;

    console.log(text);



}