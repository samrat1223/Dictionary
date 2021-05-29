//Selecting different elements
const resultDiv = document.querySelector(".result"); // . used for selecting class
const wordEle = document.querySelector(".word");
const phonetics = document.querySelector(".phonetics");
const audio = document.querySelector("audio"); //selecting audio tag
const wordMeaning = document.querySelector(".word-definition");
const synonyms = document.querySelector(".synonyms");


//The API Url
const url = 'https://api.dictionaryapi.dev/api/v2/entries/en_US/';

//Function to handle the API calls
const handle = async(e) => {
    if(e.keyCode === 13)
    {
        //storing the user input
        const word = e.target.value;
        //making a reauest to the API 
        const result = await fetch(url + word);
        
        //Checking for a valid word
        if(!result.ok)
        {
            alert("Check the word , you may have typed it wrong ");
            return;
        }
        //Result is retreving JSON data
        const data = await result.json();

        //showing resultDiv
        resultDiv.style.display="block";
        wordEle.innerText=data[0].word;
        phonetics.innerText=data[0].phonetics[0].text;
        audio.src = data[0].phonetics[0].audio;
        wordMeaning.innerText=data[0].meanings[0].definitions[0].definition;

        //Fetching all synonyms inside synonymsArray
        const synonymsArray = data[0].meanings[0].definitions[0].synonyms;

        if(synonymsArray)
        {
        
            let synonymsData=" ";
            //Now iterating the whole array and displaying those synonyms
            for(let i=0;i<synonymsArray.length;i++)
            {   
                synonymsData += `<p class="pills">${synonymsArray[i]}</p>`;
            }
            synonyms.innerHTML = synonymsData;
            } else 
            {
                synonyms.innerHTML = "<p class='pills'>No synonyms found</p>";
            }
        
    }
};