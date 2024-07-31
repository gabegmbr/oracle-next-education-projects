let inputText = document.getElementById("inputText");
let outputText = document.getElementById("outputText");
let encodeButton = document.getElementById("encodeButton");
let decodeButton = document.getElementById("decodeButton");

changeMode('encode');

function changeMode(mode){
    if(mode == 'encode'){
        textMode = "encode";
        reset();
        inputText.removeEventListener("keypress", decodeKeypress);
        inputText.removeEventListener("keydown", decodeKeydown);
        inputText.removeEventListener("paste", decodePaste);
        inputText.addEventListener("keypress", encodeKeypress);
        inputText.addEventListener("keydown", encodeKeydown);
        inputText.addEventListener("paste", encodePaste);
    } else{
        textMode = "decode";
        reset();
        inputText.removeEventListener("keypress", encodeKeypress);
        inputText.removeEventListener("keydown", encodeKeydown);
        inputText.removeEventListener("paste", encodePaste);
        inputText.addEventListener("keypress", decodeKeypress);
        inputText.addEventListener("keydown", decodeKeydown);
        inputText.addEventListener("paste", decodePaste);
    }
}

function reset(){
    outputText.value = "";
    inputText.value = "";
}

function delOutput(position){
    outputText.value = outputText.value.slice(0, position);
}

function insOutput(string){
    outputText.value += string;
}

function encodeChar(char, mode){
    if(mode == 'ins'){
        switch(char){
            case 'a':
                insOutput('ai');
                break;
            case 'e':
                insOutput('enter');
                break;
            case 'i':
                insOutput('imes');
                break;
            case 'o':
                insOutput('ober');
                break;
            case 'u':
                insOutput('ufat');
                break;
            default:
                insOutput(char);
                break;
        }
    }
    if (mode == 'del'){
        delpressed = false;
        switch(char){
            case 'a':
                delOutput(-2);
                break;
            case 'e':
                delOutput(-5);
                break;
            case 'i':
                delOutput(-4);
                break;
            case 'o':
                delOutput(-4);
                break;
            case 'u':
                delOutput(-4);
                break;
            default:
                delOutput(-1);
            break;
        }
    }
}

function decodeChar(char, mode){
    let text = outputText.value;
    let textDel = inputText.value;
    if(mode == "ins"){
        switch(char){
            case 'i':
                if(text.slice(-1) == "a"){
                } else{
                    insOutput(char)
                } break;
            case 'r':
                if(text.slice(-3) == "obe"){
                    delOutput(-2);
                } else if (text.slice(-4) == "ente"){
                    delOutput(-3)
                } else{
                    insOutput(char);
                } break;
            case 's':
                if(text.slice(-3) == "ime"){
                    delOutput(-2);
                } else{
                    insOutput(char)
                } break;
            case 't':
                if(text.slice(-3) == "ufa"){
                    delOutput(-2);
                } else{
                    insOutput(char)
                }break;
            default:
                insOutput(char);
                break; 
        }
    }
    if (mode == 'del'){
        switch(char){
            case 'i':
                if(textDel.slice(-2) == "ai"){
                } else{
                    delOutput(-1);
                } break;
            case 'r':
                if(textDel.slice(-4) == "ober"){
                    insOutput("be");
                } else if (textDel.slice(-5) == "enter"){
                    insOutput("nte");
                } else{
                    delOutput(-1);
                } break;
            case 's':
                if(textDel.slice(-4) == "imes"){
                    insOutput("me");
                } else{
                    delOutput(-1);
                } break;
            case 't':
                if(textDel.slice(-4) == "ufat"){
                    insOutput("fa");
                } else{
                    delOutput(-1);
                } break;
            default:
                delOutput(-1);
                break;
        }
    }
}

function encodeKeypress(pressed){ //entrada de caracteres
    encodeChar(pressed.key, 'ins');
}
function encodeKeydown(pressed){ //exclusão de caracteres
    if(pressed.key == "Backspace"){
        encodeChar(inputText.value.slice(-1), 'del');
    }
}
function encodePaste(pastedContent){ //cópia de caracteres
    let pasteText = Array.from(pastedContent.clipboardData.getData('text'));
    for(let y = 0; y < pasteText.length; y++){
        encodeChar(pasteText[y], 'ins');
    }
}
function decodeKeypress(pressed){
    decodeChar(pressed.key, 'ins');
}
function decodeKeydown(pressed){ //exclusão de caracteres
    if(pressed.key == "Backspace"){
        decodeChar(inputText.value.slice(-1), 'del');
    }
}
function decodePaste(pastedContent){ //cópia de caracteres
    let pasteText = Array.from(pastedContent.clipboardData.getData('text'));
    for(let y = 0; y < pasteText.length; y++){
        decodeChar(pasteText[y], 'ins');
    }
}