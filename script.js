
let btn = document.querySelectorAll("#btn")[0];

let btnswitch = document.querySelectorAll(".slider")[0];

btn.addEventListener("click", ()=>{

    chrome.storage.sync.get('accesOn', (on)=>{
        console.log(on.accesOn);

        if(!on.accesOn ) {
            chrome.storage.sync.set({'accesOn': 1});
            btnswitch.style.backgroundColor = '#2196F3';
        }
        else {
            chrome.storage.sync.set({'accesOn': 0});
            btnswitch.style.backgroundColor = '#ccc';
        }
    });
    
});

chrome.storage.sync.get('accesOn', (on)=>{
    console.log(on.accesOn);

    if(on.accesOn ) btnswitch.style.backgroundColor = '#2196F3';
    else btnswitch.style.backgroundColor = '#ccc';

});

const btnLang = document.querySelectorAll("#btn-lang")[0];

btnLang.addEventListener("click", ()=>{

    const lang = document.querySelectorAll("#lang-select")[0].value;    

    chrome.storage.sync.set({'lang': lang});

});


const langOptions = document.querySelectorAll('.lang-option');

chrome.storage.sync.get('lang', (on)=>{
    
    for(let i = 0; i < langOptions.length; i++){
        if(langOptions[i].value == on.lang){
            langOptions[i].setAttribute('selected', '');
        }
    }

});



