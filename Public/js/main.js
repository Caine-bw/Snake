window.onload=function(){
    canv=document.getElementById("ecran");
    ctx=canv.getContext("2d");
    document.addEventListener("keydown",keyPush);
    setInterval(game,1000/15); //faire bouger le serpent de 15 toutes les secondes
}
//position de mon joueur
positionx=positiony=10;
gs=tc=20;
// tc=40
//taille de la pomme que le serpent vas manger
pommex=pommey=10;

pommebonusx=pommebonusy=5;
//vitesse du joueur v
xv=yv=0;

//corps du joueur
trail =[],
tail = 5;

//scoreboard
let score = 0;
//fonction du jeu 

function game(){
    positionx+=xv;
    positiony+=yv;
    if(positionx<0) {           //quand il vas a gauche
        positionx = tc-1;
    }
    if(positionx> tc-1) {       //quand tu vas a droite
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

    ctx.fillStyle="#009966";
    for(let i=0; i<trail.length; i++){
        if (i==trail.length-1) {
            ctx.fillStyle="#7CFC00"
        }
        if (i==trail.length-2) {
            ctx.fillStyle="#ADFF2F"
        }
        if (i==trail.length-3) {
            ctx.fillStyle="#7FFF00"
        }
        if (i==trail.length-4) {
            ctx.fillStyle=" #00FF00"
        }
        ctx.fillRect(trail[i].x*gs, trail[i].y*gs, gs-2, gs-2); //couleur du serpent

        if(trail[i].x==positionx && trail[i].y==positiony){
        tail =5; //conditions si le joueurs se touche, le jeu se reinitialise il reprends sa forme du debut 
        }
    }
trail.push({x:positionx,y:positiony});
while(trail.length>tail){
trail.shift(); // ajoute la pomme a la fin de mon tableau (serpent)
}
if(pommex==positionx && pommey==positiony){
    tail++;//si il touche la pomme il s'incremente d'un carré
    pommex=Math.floor(Math.random()*tc);
    pommey=Math.floor(Math.random()*tc);
    score++;
}
if (pommebonusx==positionx && pommebonusy==positiony
    && tail%5==0){
    tail+=2 
    pommebonusx=Math.floor(Math.random()*tc);
    pommebonusy=Math.floor(Math.random()*tc);
    score+=2;
}

    ctx.fillStyle="#990033";//couleur de la pomme
    ctx.fillRect(pommex*gs, pommey*gs, gs-2, gs-2); 

    //pommebonus
    if (tail%5==0) { //quand le joueur mange 5 pommes la pomme bonus apparrait 
        ctx.fillStyle="#FFD700"; //pomme d'or
    ctx.fillRect(pommebonusx*gs, pommebonusy*gs, gs-2, gs-2);
    
    }
    
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

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: "+score, 8, 20);
}

