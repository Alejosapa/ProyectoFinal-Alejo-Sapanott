
const btnCarrito = document.querySelector('.contenedor-icono');

btnCarrito.addEventListener('click', () => {
	const contProductosCarrito = document.querySelector('.contenedor-productos-carrito');
	contProductosCarrito.style.display = contProductosCarrito.style.display === 'none' ? 'block' : 'none';
})

const infoCarrito = document.querySelector('.producto-carrito');
const filaProducto = document.querySelector('.fila-producto');


const listaProductos = document.querySelector('.contenedor-articulos');



let todosLosProductos = [];

const valorTotal = document.querySelector('.total-pagar');

const contadorProductos = document.querySelector('#contador-productos');

const carritoVacio = document.querySelector('.carrito-vacio');
const totalCarrito = document.querySelector('.total-carrito');

listaProductos.addEventListener('click', e => {
    if (e.target.classList.contains('btn-agregar-carrito')) {
        const producto = e.target.parentElement;

        const infoProducto = {
            cantidad: 1,
            titulo: producto.querySelector('h2').textContent,
            precio: producto.querySelector('.precio').textContent,
        };

        const existe = todosLosProductos.some(
            producto => producto.titulo === infoProducto.titulo
        );

        if (existe) {
            const productos = todosLosProductos.map(producto => {
                if (producto.titulo === infoProducto.titulo) {
                    producto.cantidad++;
                    return producto;
                } else {
                    return producto;
                }
            });
            todosLosProductos = [...productos];
        } else {
            todosLosProductos = [...todosLosProductos, infoProducto];
        }

        mostrarHTML();
    }
});

filaProducto.addEventListener('click', e => {
    if (e.target.classList.contains('icono-cerrar')) {
        const producto = e.target.parentElement;
        const titulo = producto.querySelector('p').textContent;

        todosLosProductos = todosLosProductos.filter(
            producto => producto.titulo !== titulo
        );

        console.log(todosLosProductos);

        mostrarHTML();
    }
});


const mostrarHTML = () => {
    if (!todosLosProductos.length) {
        carritoVacio.classList.remove('oculto');
        filaProducto.classList.add('oculto');
        totalCarrito.classList.add('oculto');
    } else {
        carritoVacio.classList.add('oculto');
        filaProducto.classList.remove('oculto');
        totalCarrito.classList.remove('oculto');
    }

    filaProducto.innerHTML = ' ';

    let total = 0;
    let totalDeProductos = 0;

    todosLosProductos.forEach(producto => {
        const contenedorProducto = document.createElement('div');
        contenedorProducto.classList.add('producto-carrito');

        contenedorProducto.innerHTML = `
            <div class="info-producto-carrito">
                <span class="cantidad-producto-carrito">${producto.cantidad}</span>
                <p class="titulo-producto-carrito">${producto.titulo}</p>
                <span class="precio-producto-carrito">${producto.precio}</span>
            </div>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="icono-cerrar"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                />
            </svg>
        `;

        filaProducto.append(contenedorProducto);

        total =
            total + parseInt(producto.cantidad * producto.precio.slice(1));
        totalDeProductos = totalDeProductos + producto.cantidad;
    });

    valorTotal.innerText = `$${total}`;
    contadorProductos.innerText = totalDeProductos;
};

const btnToastify = document.querySelector('.btn-agregar-carrito');
btnToastify.addEventListener('click',() => {

	Toastify({
		text: "!Producto añadido¡",
		duration: 3000,
		gravity: 'bottom',
		position: 'right',
		className: 'notificacion'
	}).showToast();
	

});


document.getElementById('iniciarSesion').addEventListener('click', loginForm);

async function loginForm() {
    const { value: email } = await Swal.fire({
        title: "Input email address",
        input: "email",
        inputLabel: "Your email address",
        inputPlaceholder: "Enter your email address"
    });

    if (!email) return;

    const { value: password } = await Swal.fire({
        title: "Enter your password",
        input: "password",
        inputLabel: "Password",
        inputPlaceholder: "Enter your password",
        inputAttributes: {
            maxlength: "10",
            autocapitalize: "off",
            autocorrect: "off"
        }
    });

    if (!password) return;

    localStorage.setItem('email', email);
    localStorage.setItem('password', password);

    Swal.fire(`Inicio de sesión exitoso`);
}

window.onload = function() {
    const savedEmail = localStorage.getItem('email');
    const savedPassword = localStorage.getItem('password');

    if (savedEmail && savedPassword) {
        Swal.fire(`Email: ${savedEmail}, Password: ${savedPassword}`);
    }
}

