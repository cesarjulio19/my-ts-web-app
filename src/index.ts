
import { Observable, from } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
function createCard(name: string): HTMLElement{
  // Crea el ion-card utilizando una cadena HTML para inicializar correctamente los componentes de Ionic
  const cardHtml = `
    <ion-card>
      <ion-card-header>
        <ion-card-title>${name}</ion-card-title>
      </ion-card-header>
      <ion-card-content>
      </ion-card-content>
    </ion-card>
  `;

  // Crea un div temporal para insertar la cadena HTML
  const wrapper = document.createElement('div');
  wrapper.innerHTML = cardHtml.trim();

  // Devuelve el ion-card que se acaba de crear
  return wrapper.firstElementChild as HTMLElement;

}

function fetchImage(imageurl: string): Observable<string>{

  /*return from(axios.get(imageurl, {responseType: 'blob'})).pipe(
    map(response =>{
      // Convierte el Blob de la respuesta a una URL válida
      const imageBlob = response.data;
      return URL.createObjectURL(imageBlob);
    }),
    catchError(error =>{
      console.error(error);
      throw new Error('No se pudo cargar la imagen.');
    })
  );*/

  return from(
    fetch(imageurl)
    .then(response => {
      if(!response.ok){
        throw new Error(`Error al obtener la imagen: ${response.statusText}`);
      }
      return response.blob();
    })
    .then(imageBlob => {
      return URL.createObjectURL(imageBlob);
    })
  ).pipe(
    catchError(error =>{
      console.error(error);
      throw new Error('No se pudo cargar la imagen.');
    })
  );



}

document.addEventListener( 'DOMContentLoaded', () => {

  document.getElementById('addbutton')?.addEventListener('click', () => {
    const inputElement = document.getElementById('name') as HTMLInputElement;
    const nameValue = inputElement.value;

  
    
    if (nameValue) {
        
        const newCard = createCard(nameValue);

        let promesa =new Promise<HTMLElement>((resolve, reject) =>{
          console.log("creando la carta....")
          setTimeout(()=>{
            const newCard = createCard(nameValue);
            if(newCard){
              resolve(newCard)
            }else{
              reject('error al crear la carta')
            }

          }, 2000);

        })

        promesa
        .then(resultado =>{

          const cardsContainer = document.getElementById('cards-container');
          cardsContainer?.appendChild(resultado);

        })
        .catch(error =>{
          console.error("Error:", error);
        })

  
        
        inputElement.value = '';
    } else {
        alert("Por favor ingrese un nombre");
    }
  });

  document.getElementById('addbuttonImage')?.addEventListener('click', () => {

    const image = document.createElement("img")
    const divimg = document.getElementById('images-container')

    fetchImage("Https://picsum.photos/200/300").subscribe({
      next:(url: string) => {
        image.src = url;
        divimg?.appendChild(image);
      },
      error: (err) =>{
        console.error(err);
      }
    });



  });


});


