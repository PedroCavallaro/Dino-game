const dino: Element = document.querySelector("#dinoDiv")
const cactus = document.querySelectorAll(".cactus")
const score: Element = document.querySelector(".score")
const road: Element = document.querySelector("#road")
const gameOver: Element = document.querySelector(".gameOver")
const mainContainer: Element = document.querySelector("main")
const finalScore: Element = document.querySelector("#finalScore")
const lastScore: Element = document.querySelector(".lastScore")
let count: number = 0;
let test: boolean = true
let hit: boolean = false;

window.addEventListener("keydown", (e)=>{
    if(localStorage.getItem("lastScore")){
        let lastLs: number = JSON.parse(localStorage.getItem("lastScore"))
        lastScore.innerHTML = `Last: ${lastLs}`
    }
    if(e.which === 32 || e.which === 38){
       
            dino.classList.add("jump")
            test = true;

            if(test == true){
                const jumpTime = setInterval(()=>{
                    dino.classList.remove("jump")    
                    clearInterval(jumpTime)
                }, 7 * 100)
            }
       
    }
    
    
})
const scoreCount = setInterval(()=>{
    if(!hit){
        count ++;
        localStorage.setItem("actualPoints" , JSON.stringify(count))
        score.innerHTML = `Score: ${count}`
    }
}, 1 * 1000)


const endGame = setInterval(()=>{
    for (let i = 0; i < cactus.length; i++) {
         testEndGame(cactus,i);
    }
},1)



function testEndGame(cactus: NodeListOf<Element>, pos:number){
    let dinoPos : DOMRect = dino.getBoundingClientRect() 
    let cactusPos: DOMRect = cactus[pos].getBoundingClientRect() 
    if(dinoPos.x == 100 && cactusPos.x <= 100 && dinoPos.y >= 453){
        hit = true
        cactus.forEach((e)=>{
            gameOver.classList.add("true")
            e.classList.remove("cactusAni")
        })
        road.classList.remove("roadAni")
        dino.classList.remove("jump")
        
        localStorage.setItem("lastScore", JSON.stringify(count))
        
        score.classList.add("hide")
        finalScore.innerHTML = `Your final score is: ${count}`
        
        
        window.addEventListener("keydown", (e)=>{
            hit = false
            if(e.code === "Enter"){
                count = 0
                score.classList.remove("hide")
                cactus.forEach((e)=>{
                    e.classList.add("cactusAni")
                })
                road.classList.add("roadAni")
                gameOver.classList.remove("true")
                let lastLs: number = JSON.parse(localStorage.getItem("lastScore"))
                lastScore.innerHTML = `Last: ${lastLs}`
            }
        })}
}

