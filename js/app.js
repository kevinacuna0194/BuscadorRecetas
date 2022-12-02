/** 3 Endpoints
 * Uno para categorías, 
 * uno para los platillos que pertenecen a esa categoría 
 * La información del platillo en específico. 
 */
function iniciarApp() {

    const selectCategorias = document.querySelector('#categorias');
    selectCategorias.addEventListener('change', seleccionarCategoria);

    const resultado = document.querySelector('#resultado');
    const modal = new bootstrap.Modal('#modal', {});

    obtenerCategorias();

    function obtenerCategorias() {

        const url = 'https://www.themealdb.com/api/json/v1/1/categories.php';
        fetch(url) /** Como es de tipo GET no tienes que especificar nada más; por default es este tipo de GET, entonces solamente le pasas la URL. */
            /** Aquí se pasa en automático un parámetro que tú puedes nombrarlo como desees. */
            .then(restpuesta => restpuesta.json())
            /** console.log(restpuesta);  Aquí nos va a decir si el llamado fue correcto o no (Response - status: 200). */
            /** Entonces voy a tener un segundo .then; está en automático. Se le pasa otro parámetro, lo puedes nombrar com desees. */
            .then(resultado => mostrarCategorias(resultado.categories)); /** (14) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}] */
    }

    function mostrarCategorias(categorias = []) {

        categorias.forEach(categoria => {

            const { strCategory } = categoria;

            const option = document.createElement('OPTION');
            /** option.value = categoria.strCategory;
            option.textContent = categoria.strCategory; */
            option.value = strCategory;
            option.textContent = strCategory;

            /** console.log(option); <option value="Beef"> */
            selectCategorias.appendChild(option);
        });
    }

    function seleccionarCategoria(e) {
        // console.log(e.target.value);
        const categoria = e.target.value;

        const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoria}`;

        fetch(url)
            .then(restpuesta => restpuesta.json())
            .then(resultado => mostrarRecetas(resultado.meals)); /** Está consultando en base a la selección del usuario, trae las recetas que pertenecen a esa categoría. */
    }

    function mostrarRecetas(recetas = []) {
        /** console.log(recetas); Array(42) [ {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, … ] */
        limpiarHTML(resultado);

        const heading = document.createElement('H2');
        heading.classList.add('text-center', 'text-black', 'my-5');
        heading.textContent = recetas.length ? 'Resultados' : 'No Hay Resultados';
        resultado.appendChild(heading);

        /** Iterar en los Resultados */
        recetas.forEach(receta => {

            // console.log(receta);

            const { idMeal, strMeal, strMealThumb } = receta;

            const recetaContenedor = document.createElement('DIV');
            recetaContenedor.classList.add('col-md-4');

            const recetaCard = document.createElement('DIV');
            recetaCard.classList.add('card', 'mb-4');

            const recetaImagen = document.createElement('IMG');
            recetaImagen.classList.add('card-img-top');
            recetaImagen.alt = `Imagen de la receta ${strMeal}`; /** Texto alternativo */
            recetaImagen.src = strMealThumb;

            /** El Card debe tener un Body */
            const recetaCardBody = document.createElement('DIV');
            recetaCardBody.classList.add('card-body');

            const recetaHeading = document.createElement('H3');
            recetaHeading.classList.add('card-title', 'mb-3');
            recetaHeading.textContent = strMeal;

            const recetaButton = document.createElement('BUTTON');
            recetaButton.classList.add('btn', 'btn-danger', 'w-100');
            recetaButton.textContent = 'Ver Receta';
            // recetaButton.dataset.bsTarget = "#modal"; // <button> data-bs-target="#modal" </button>
            // recetaButton.dataset.bsToggle = "modal"; // <button> data-bs-toggle="modal" </button>

            /**Mandar a llamar otra función, que consulte la API y que se traiga esa receta en específico **/
            /** Aquí utilizamos onclick porque este elemento no existe, no va a existir en el código HTML cuando el código de JavaScript se ejecute, sino que se genera hasta que el usuario selecciona algunas opciones. un eventListener no te serviría. */
            recetaButton.onclick = function() {
                seleccionarReceta(idMeal)
            }


            /** Inyectar en el código HTML */
            /**
             * contenedorCard
             *   .card
             *      img
             *      .cardBody
             *           h3
             *           button
             */
            recetaCardBody.appendChild(recetaHeading);
            recetaCardBody.appendChild(recetaButton);

            recetaCard.appendChild(recetaImagen);
            recetaCard.appendChild(recetaCardBody);

            recetaContenedor.appendChild(recetaCard);

            /** Muy importante es que este receta contenedor es algo que nosotros estamos generando con scripting; Entonces, se tienes que tomar un elemento real del código HTML, algo que sí esté disponible para entonces inyectar todo este código que se ha generado Y para ello tenemos este div con la ide de resultado que está vacío. */
            resultado.appendChild(recetaContenedor);

        })
    }

    function seleccionarReceta(id) {
        // console.log(id)
        const url = `https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`;

        fetch(url)
            .then(respuesta => respuesta.json())
            .then(reslutado => mostrarRecetaModal(reslutado.meals[0]));
    }

    function mostrarRecetaModal(receta) {

        // console.log(receta);

        const { idMeal, strInstructions, strMeal, strMealThumb } = receta;

        // Añadir contenido al Modal
        const modalTitle = document.querySelector('.modal .modal-title');
        const modalBody = document.querySelector('.modal .modal-body');

        modalTitle.textContent = strMeal;

        modalBody.innerHTML = `
            <img class="img-fluid" src="${strMealThumb}" alt="${strMeal}" />
            <h3 class="my-3">Instrucciones</h3>
            <p>${strInstructions}</p>
        `;

        /** Mostar el modal */
        modal.show();
    }

    function limpiarHTML(selector) {
        while (selector.firstChild) {
            selector.removeChild(selector.firstChild);
        }
    }

}

document.addEventListener('DOMContentLoaded', iniciarApp);