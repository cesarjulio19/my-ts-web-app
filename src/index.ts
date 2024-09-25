// src/index.ts
function greet(name: string): void {
    const greeting = `Hello, ${name}!`;
    const element = document.getElementById("greeting");
    if (element) {
      element.innerText = greeting;
    }
  }

  const boton = document.getElementById("button");
  const card = document.getElementById("card");
  boton?.addEventListener("click", () => {
    var input = document.getElementById("name");
    var valor = (<HTMLInputElement>document.getElementById("name")).value;
     card
  
    
    
  });

  function addcard(name: string): void{
    const cardname = document.getElementById('name')
  }
  
  greet("World");