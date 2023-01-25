var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":[],"propsByKey":{}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----

var playerMallet;

var goal1=createSprite(200,18,100,20);
goal1.shapeColor=("yellow");

var goal2=createSprite(200,382,100,20);
goal2.shapeColor=("yellow");

var gameState ="serve";
//criando quadra
var boundary1 = createSprite(200,0,400,10);
boundary1.shapeColor = "white";
var boundary2 = createSprite(200,400,400,10);
boundary2.shapeColor = "white";
var boundary3 = createSprite(0,200,10,400);
boundary3.shapeColor = "white";
var boundary4 = createSprite(400,200,10,400);
boundary4.shapeColor = "white";



// criando objetos e lhes dando cores
var striker = createSprite(200,200,10,10);
striker.shapeColor = "white";

var playerMallet = createSprite(200,50,50,10);
playerMallet.shapeColor = "black";

var computerMallet = createSprite(200,350,50,10);
computerMallet.shapeColor = "black";

//variáveis de pontuação
var compScore=0;
var playerScore=0;

function draw() {
  //limpar a tela
  background("green");
  
  //exibir pontuação
  textSize(18);
  fill("maroon");
  text(playerScore, 25,225);
  text(compScore,25,185);
  
  //estados de jogo
  //serve
  if (gameState=="serve") {
    //texto
    textSize(24);
    fill("maroon");
    
    text("pressione espaço para começar",40,120);
  }
  //mudar para play
  if (keyDown("space")) {
    gameState= "play";
  }
  
  
  //play
  if (gameState=="play") {
   //faça o bastão do jogador se mover com as teclas de seta
  paddleMovement();
  
  
  //inteligência artificial para o bastão do computador
  //faça com que se mova com a posição y do atacante
  computerMallet.x = striker.x; 
    
    
    
  }
  
  //mudar para end
  
  if ( compScore === 5 || playerScore === 5) {
      gameState= "end" ;
      }
  
  //end
  if (gameState=="end") {
   fill("maroon");
        textSize(28);
        //adicione o texto para fim de jogo
        text(" Fim de jogo! ",170,160);  
        playerMallet.velocityX = 0;
        playerMallet.velocityY = 0;
  }
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  // Pontuação
  
     if(striker.isTouching(goal1))
      { //aumente a pontuação do jogador
        playerScore = playerScore+ 1;
        //use show grid para identificar o valor de x e y para trazer o atacante para o centro
        striker.x=200;
        striker.y=200;
        striker.velocityX=0;
        striker.velocityY=0;
      }
      
      if(striker.isTouching(goal2))
      {
        compScore = compScore  + 1;
        //Redefina o atacante adicionando o valor central de x e y
        striker.x=200;
        striker.y=200;
        striker.velocityX=0;
        striker.velocityY=0;
      }
      
   
   
     if ( compScore === 5 || playerScore === 5) {
       fill("maroon");
        textSize(28);
        //adicione o texto para fim de jogo
        text(" Fim de jogo! ",170,160); 
      }
       
        
      
 
 
  
  

  
  //desenhe uma linha no centro
   for (var i = 0; i < 400; i=i+20) {
    line(i,200,i+10,200);
  }
  
  //crie bordas de limite
  //faça com que o atacante rebata nas bordas de cima e de baixo
  createEdgeSprites();
  
  striker.bounceOff(edges);
  striker.bounceOff(playerMallet);
  striker.bounceOff(computerMallet);
  playerMallet.bounceOff(edges);
  computerMallet.bounceOff(edges);

  
  //lance o atacante quando a tecla espaço for pressionada
  if (keyDown("space")) {
    serve();
  }
  
 
  drawSprites();
}
function serve() {
  striker.velocityX = 10;
  striker.velocityY = 5;
 
}

function paddleMovement()
{
  if(keyDown("left")){
    playerMallet.x = playerMallet.x-10;
    
  }
  
  if(keyDown("right")){
    playerMallet.x = playerMallet.x+10;
    
  }
  
  if(keyDown("up")){
   if(playerMallet.y>25)
   {
    playerMallet.y = playerMallet.y- 10;
   }
  }
  
  if(keyDown("down")){
    if(playerMallet.y<120)
   {
    playerMallet.y = playerMallet.y+10;
   }
  }
} 

// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
