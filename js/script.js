
const texts = [  
    "🌟 Innovator",    
    "DEVELOPER  💻",     
    "DESIGNER🎨",     
    "Engineer 🚀",     
    "Full-stack 🌐",     
    "Problem-solver 💡",     
    "Learner 📚",     
    "Creative ",     
    "Explorer 🔍",       
    "Dreamer 🌟"
];
let speed  =100;
const textElements = document.querySelector(".typewriter-text");
let textIndex = 0;
let charcterIndex = 0;
function typeWriter(){
    if (charcterIndex < texts[textIndex].length){
        textElements.innerHTML += texts[textIndex].charAt(charcterIndex);
        charcterIndex++;
        setTimeout(typeWriter, speed);
    }
    else{
        setTimeout(eraseText, 1000)
    }
}
function eraseText(){
    if(textElements.innerHTML.length > 0){
        textElements.innerHTML = textElements.innerHTML.slice(0,-1);
        setTimeout(eraseText, 50)
    }
    else{
        textIndex = (textIndex + 1) % texts.length;
        charcterIndex = 0;
        setTimeout(typeWriter, 500)
    }
}
window.onload = typeWriter


// Fonction pour changer la couleur automatiquement
function changeLineColor() {
    const line = document.getElementById("line");

    const colors = ["#7b071e","#ADD8E6", "#F0E68C", "#98FB98", "#FFDAB9", "#FFB6C1", "#E6E6FA", "black"];


    let index = 0; 
    setInterval(() => {
        line.style.backgroundColor = colors[index]; 
        index = (index + 1) % colors.length; 
    }, 600); 
}


changeLineColor();
