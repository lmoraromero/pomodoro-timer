const form = document.querySelector("#task form");
const taskInput = document.querySelector("input[type='text']");
const task = document.querySelector(".timer h2");
const clock = document.querySelector(".clock");
const tomato = document.querySelector(".timer img");
const textAlert = document.querySelector(".timer .alert");
const beepbeep = document.getElementById("beep");

let countdown; //es undefined por que no está antivado el temporizador, se usa como id del temporizador

//Funciones para activar/desactivar la aniamción del tomate

function startTomato(){
    tomato.classList.add("on");
}
function stopTomato(){
    tomato.classList.remove("on");
}

//Convertir una cantidad de segundos a formato MM:SS

function formatTime(segundos){
    const min = String(Math.floor(segundos / 60)).padStart(2, "0") //padStart convierte los númeroa  string y les agrega un 0 delante si tienen menos de dos dígitos
    const seg = String(segundos % 60).padStart(2, "0");
    return `${min}:${seg}`;
}

//Iniciar temporizador con una cuenta atrás, actualizando el tiempo y deteniendolo al llegar a 0

function startTimer(minutos){
    clearInterval(countdown);
    let timeLeft = minutos * 60;
    clock.textContent = formatTime(timeLeft);
    startTomato();

    countdown = setInterval(() => {
        timeLeft--;
        clock.textContent = formatTime(timeLeft);

        if(timeLeft <= 0){
            clearInterval(countdown);
            stopTomato();
            textAlert.innerText = "¡Tiempo terminado!";
            beepbeep.currentTime = 0;
            beepbeep.play();
        }
    }, 1000)
}


//Al enviar el formulario, la tarea pasa al h2 de timer

form.addEventListener("submit", evento => {
    evento.preventDefault();
    const texto = taskInput.value.trim();
    if(texto == "") return; //No hace nada si está vacío

    task.innerText = texto; 
    form.reset();

    document.querySelector(".timer").scrollIntoView({ behavior: "smooth" });
})

//Iniciar temporizadores

document.querySelector(".work").addEventListener("click", () => startTimer(25));
document.querySelector(".rest").addEventListener("click", () => startTimer(5));
document.querySelector(".long").addEventListener("click", () => startTimer(15));