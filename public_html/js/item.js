const btnagregar = document.querySelector('#add');
const btnquitar = document.querySelector('#subtract');
const quantity = document.querySelector('#quantity');

btnagregar.addEventListener('click', () => quantity.value = Number(quantity.value) + 1);//lo parseo a numero para que no concatene como cadena
btnquitar.addEventListener('click', () => {
    quantity.value = Number(quantity.value) === 0
      ? 0
      : Number(quantity.value) -  1
  });
  quantity.addEventListener('change', () => quantity.value = Number(quantity.value) < 0 && 0);


  //Number(quantity.value)lo parseo a numero
  //Number(quantity.value) === 0: Compara el número resultante con cero
  //si el número es igual a cero, entonces asigna 0 a quantity.value, de lo contrario, resta 1 al número actual y asigna el resultado a quantity.value
  //funcion flecha del evento "change": La función verifica si el nuevo valor convertido a número (Number(quantity.value)) es menor que 0. Si es así, se establece quantity.value en 0.