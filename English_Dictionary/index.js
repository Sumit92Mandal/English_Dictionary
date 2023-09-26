let textinput = document.getElementById("text");
const infotext = document.getElementById("info-text");
const meaningcontainer = document.getElementById("meaning-container");
const wordtitle = document.getElementById("title");
const wordmeaning = document.getElementById("meaning");
let audiosource = document.getElementById("audio");


function fetchApi(value){
    try {
        meaningcontainer.style.display="None";
        infotext.style.display="block";
        infotext.innerText= `Searching the meaning of ${value}`;
        const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${value}`;
        
        let result = null;
         fetch(url).then((res)=> res.json()).then((response)=>{console.log(response);
        result = response;
        showResult(result);
    })

    } catch (error) {
        console.log(error)
    }
 
}


function showResult(value)
{
    infotext.style.display="None";
    meaningcontainer.style.display="block";
    wordtitle.innerText = value[0].word;
    wordmeaning.innerText = value[0].meanings[0].definitions[0].definition;
    // <---------------------- Audio source---------------------->
    audiosource.style.display='None';

    let audio = value[0].phonetics.find(ele => {
        return ele.audio !== "";
    })
    
     if (audio.audio){
        audiosource.src = audio.audio;
        audiosource.style.display='block';
     }
   
}



textinput.addEventListener("keyup",(e)=>{
    if(e.target.value && e.key==='Enter') {
        fetchApi(e.target.value)
    }
    else if (!e.target.value && e.key === 'Enter')
    {
        meaningcontainer.style.display="None";
    }
})