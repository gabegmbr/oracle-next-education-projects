let saveContainer = document.getElementById("saved-texts");

function save(){
    if(outputText.value != ''){
        let textContainer = document.createElement("div");
        let text = document.createElement("p");
        let button = document.createElement("button");
        let img = document.createElement("img");
        img.src = "./assets/icons/copy.svg";
        button.appendChild(img);
        button.addEventListener("click", copy(text.value));
        textContainer.setAttribute("id", "text-container")
        text.textContent = outputText.value;
        textContainer.appendChild(text);
        textContainer.appendChild(button);
        saveContainer.appendChild(textContainer);
    }
}

function copy(text){
    navigator.clipboard.writeText(text);
}