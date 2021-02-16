window.onload=function(){
    canv=document.getElementById("ecran");
    ctx=canv.getContext("2d");
    document.addEventListener("keydown",keyPush);
    var interval = setInterval(game,1000/15); //faire bouger le serpent de 15 toutes les secondes
}

//position de mon joueur
positionx=positiony=10;
gs=tc=20; //gs = taille en pixels sur mon canvas
// tc=40
//taille de la pomme que le serpent vas manger
pommex=pommey=2;

pommebonusx=pommebonusy=15;
//vitesse du joueur v
xv=yv=0;

//corps du joueur
trainee =[],
corps = 5;

//scoreboard
let score = 0;
//fonction du jeu 

function game(){
    positionx+=xv;
    positiony+=yv;
    if(positionx<0) {       //quand il vas a gauche
        positionx = tc-1;
    }
    if(positionx> tc-1) {   //quand tu vas a droite
        positionx = 0
    }
    if(positiony<0) {
        positiony = tc-1;   //quand tu vas vers le haut
    }
    if(positiony>tc-1) {    //quand tu vas en bas
        positiony = 0;
    }
    ctx.fillStyle="black";
    ctx.fillRect(0,0,canv.width,canv.height); //couleur du background

    var my_gradient = ctx.createLinearGradient(0, 0, 0, 170);
    my_gradient.addColorStop(0, "#1453D8");
    my_gradient.addColorStop(0, "#14D8B4");
    my_gradient.addColorStop(1, "#FF1212");
    my_gradient.addColorStop(1, "#5B14D8");// dégrader de couleurs selon la position de la queue du serpent
    
    ctx.fillStyle = my_gradient;//couleur de la queue du serpent(carré ajouter quand tu mange la pomme)
    for(let i=0; i<trainee.length; i++){
        if (i==trainee.length-1) {
            ctx.fillStyle="#7CFC00";
        }
        if (i==trainee.length-2) {
            ctx.fillStyle="#ADFF2F"
        }
        if (i==trainee.length-3) {
            ctx.fillStyle="#7FFF00"
        }
        if (i==trainee.length-4) {
            ctx.fillStyle=" #00FF00"//couleur du serpent
        }
        ctx.fillRect(trainee[i].x*gs, trainee[i].y*gs, gs-2, gs-2); 

//conditions si le joueurs se touche, le jeu se reinitialise il reprends sa forme du debut 
        if(trainee[i].x==positionx && trainee[i].y==positiony){
        corps =5;
        score = 0 // 
        positionx=positiony=10;//il reprends sa position de depart
        }
    }
trainee.push({x:positionx,y:positiony});
while(trainee.length>corps){
trainee.shift(); // ajoute la pomme a la fin de mon tableau (serpent)
}
if(pommex==positionx && pommey==positiony){
    corps++;//si il touche la pomme il s'incremente d'un carré
    pommex=Math.floor(Math.random()*tc);
    pommey=Math.floor(Math.random()*tc);
    score++;
}
if (pommebonusx==positionx && pommebonusy==positiony
    && corps%5==0){
    corps+=2 //si le joueur mange la pomme d'or il s'incremente de 2, si il mange l'autre pomme, la pomme d'or disparait
    pommebonusx=Math.floor(Math.random()*tc);
    pommebonusy=Math.floor(Math.random()*tc);
    score+=2;
}

    ctx.fillStyle="#990033";//couleur de la pomme
    ctx.fillRect(pommex*gs, pommey*gs, gs-6, gs-6); //gs -6 donc pomme pomme rouge plus petite que la d'or

    //pommebonus
    if (corps%5==0) { //quand le joueur mange 5 pommes la pomme bonus apparrait 
        ctx.fillStyle="#FFD700"; //pomme d'or
        ctx.fillRect(pommebonusx*gs, pommebonusy*gs, gs-3, gs-3);
    }
    drawScore()
    drawpomme()
}
// touche attribuer pour bouger le serpent haut, bas, gauche, droite
function keyPush(evt){
    switch (evt.keyCode) {
        case 37:
            xv=-1; yv=0;
            break;
        case 38:
            xv=0; yv=-1;
            break;
        case 39:
            xv=1; yv=0;
            break;
        case 40:
            xv=0; yv=1;
            break;
    }
}
//tableau des scores
// function drawpomme() {
//     if (
//         pommebonusx !== positionx && pommebonusy !== positiony
//     ) {
//     ctx.font = "16px math";
//     ctx.fillStyle = "white";
//     ctx.fillText("Prends la pomme d'or vite !!! ", 8, 20);
//     }
    
// }
function drawScore() {
    ctx.font = "16px math";
    ctx.fillStyle = "white";
    ctx.fillText("TON SCORE DE GROS NOOB: "+ score.toString().padStart(4, '0'), 8, 395);
}
// string = tranfsorm mon entier en string pour faire apparaitre 0000 

