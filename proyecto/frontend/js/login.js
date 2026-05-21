document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm');
    const correoInput = document.getElementById('loginCorreo');
    const passwordInput = document.getElementById('loginPassword');

    if (!form || !correoInput || !passwordInput) {
        console.error('Campos de inicio no encontrados');
        return;
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const correo = correoInput.value.trim();
        const password = passwordInput.value;

        if (!correo || !password) {
            alert('Por favor ingrese correo/usuario y contraseña.');
            return;
        }

        //carga los datos y los pasa a formato json
        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ correo, password })
            });

            const data = await response.json();

            if (!data.success || !data.user) {
                alert(data.error || 'Usuario o contraseña incorrectos');
                return;
            }
        
        //dependiendo la respuesta se identifica o se trae lo que responde el usuario y 
        // asi se identifica que tipo de usuario es 
            const { id, rol } = data.user;
            sessionStorage.setItem('id_rol', rol);
            sessionStorage.setItem('id_usuario', id);

        //dependiendo el rol, se redirije al panel predestinado

            if (rol === 'ADM') {
                alert('Bienvenido Administrador');
                window.location.href = './administrador/panelAdmin.html';
            } else if (rol === 'PROF') {
                alert('Bienvenido Profesor');
                window.location.href = './docente/inicioDocente.html';
            } else {
                alert('Bienvenido Estudiante');
                window.location.href = './estudiante/inicioEstudiante.html';
            }
        
        //si existen errores en el servidor se mostrara el catch
        } catch (error) {
            console.error('Error al conectar con el servidor:', error);
            alert('El servidor de backend no está respondiendo.');
        }
    });
});