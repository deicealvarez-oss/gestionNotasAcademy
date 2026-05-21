const API_URL = 'http://localhost:3000';
//se requiere que haya ingresado previamente
function redirectToLogin() {
    alert('Acceso no autorizado. Por favor inicie sesión como administrador.');
    window.location.href = '../index.html';
}
//se crea una funcion asincroca para almacenar el registro del usuario
async function cargarUsuarios() {
    try {
        //en base a la respuesta del usuario se trae el resultado y se pasa a json
        const response = await fetch(`${API_URL}/api/usuarios`);
        if (!response.ok) {
            throw new Error('No se pudo obtener la lista de usuarios');
        }
        const usuarios = await response.json();
        const listaUsuarios = document.getElementById('listaUsuarios');

        if (!listaUsuarios) return console.log('usuario no registrado');

        //en base a los datos json se almacenan en la tabla 
        listaUsuarios.innerHTML = usuarios.map(usuario => `
            <tr>
                <td>${usuario.id}</td>
                <td>${usuario.nombre}</td>
                <td>${usuario.correo}</td>
                <td>${usuario.direccion || ''}</td>
                <td>${usuario.telefono || ''}</td>
                <td>${usuario.rol}</td>
                <td class="text-center">-</td>
            </tr>
        `).join('');
    } catch (error) {
        console.error('Error al cargar usuarios:', error);
    }
}

//se almacenan los usuarios
const listaUsuarios = document.getElementById('listaUsuarios');
const registerForm = document.getElementById('registerForm');

    if (listaUsuarios) {
        if (rol !== 'ADM') {
            redirectToLogin();
            return;
        }
        cargarUsuarios();
    }

    if (registerForm) {
        if (rol !== 'ADM') {
            redirectToLogin();
            return;
        }

//funcion asincroca que va almacenando los datos de los usuarios
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const nuevoUsuario = {
                nombre: document.getElementById('nombre').value.trim(),
                correo: document.getElementById('correo').value.trim(),
                direccion: document.getElementById('direccion').value.trim(),
                telefono: document.getElementById('telefono').value.trim(),
                password: document.getElementById('password').value,
                rol: document.getElementById('rol').value
            };

            //condicion si el usuario no registra algun dato
            if (!nuevoUsuario.nombre || !nuevoUsuario.correo || !nuevoUsuario.password ||!nuevoUsuario.telefono||!nuevoUsuario.rol||!nuevoUsuario.direccion) {
                alert('Por favor complete los campos obligatorios.');
                return;
            }

//almacena los datos del formulario y los pasa a formato json
            try {
                const response = await fetch(`${API_URL}/api/usuarios`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(nuevoUsuario)
                });

//en base a los datos de almacenan y 
// con una condicional si se almacenan bien se redirige el administrador a su panel 
                const data = await response.json();
                if (data.success) {
                    alert(`Usuario registrado con ID: ${data.id}`);
                    window.location.href = './panelAdmin.html';
                } else {
                    alert('No se pudo registrar el usuario.');
                }
            } catch (error) {
                console.error('Error en el registro:', error);
                alert('Error de conexión con el servidor.');
            }
        });
    };