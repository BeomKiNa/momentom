const body = document.querySelector("body");

const IMG_NUM = 11;


function paintBg(imgNumber){
    const img = new Image();
    img.src = `img/${imgNumber}.jpg`;

    body.setAttribute("style",`background-image: url(${img.src})`);
    // console.log(imgNumber);
}


function getRandom(){
    const random = Math.floor(Math.random()*IMG_NUM)+1;
    return random;
}



function init(){
    const randomNum = getRandom();
    paintBg(randomNum);
}

init();