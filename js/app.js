/** 3 Endpoints
 * Uno para categorías, 
 * uno para los platillos que pertenecen a esa categoría 
 * La información del platillo en específico. 
 */
function iniciarApp() {

    const selectCategorias = document.querySelector('#categorias');
    selectCategorias.addEventListener('change', seleccionarCategoria);

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
            .then(resultado => console.log(resultado)); /** Está consultando en base a la selección del usuario, trae las recetas que pertenecen a esa categoría. */

    }

}

document.addEventListener('DOMContentLoaded', iniciarApp);