/** 3 Endpoints
 * Uno para categorías, 
 * uno para los platillos que pertenecen a esa categoría 
 * La información del platillo en específico. 
 */
function iniciarApp() {

    obtenerCategorias();

    function obtenerCategorias() {

        const url = 'https://www.themealdb.com/api/json/v1/1/categories.php';
        fetch(url) /** Como es de tipo GET no tienes que especificar nada más; por default es este tipo de GET, entonces solamente le pasas la URL. */
            /** Aquí se pasa en automático un parámetro que tú puedes nombrarlo como desees. */
            .then(restpuesta => restpuesta.json())
            /** console.log(restpuesta);  Aquí nos va a decir si el llamado fue correcto o no (Response - status: 200). */
            /** Entonces voy a tener un segundo .then; está en automático. Se le pasa otro parámetro, lo puedes nombrar com desees. */
            .then(resultado => console.log(resultado)); /** {categories: Array(14)} */
    }

}

document.addEventListener('DOMContentLoaded', iniciarApp);