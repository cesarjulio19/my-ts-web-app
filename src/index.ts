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

document.getElementById('addbutton')?.addEventListener('click', () => {
  const inputElement = document.getElementById('name') as HTMLInputElement;
  const nameValue = inputElement.value;

  
  if (nameValue) {
      
      const newCard = createCard(nameValue);

      
      const cardsContainer = document.getElementById('cards-container');
      cardsContainer?.appendChild(newCard);

      
      inputElement.value = '';
  } else {
      alert("Por favor ingrese un nombre");
  }
});


