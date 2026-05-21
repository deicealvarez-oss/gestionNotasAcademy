document.addEventListener('DOMContentLoaded', async () => {
    const rol = sessionStorage.getItem('id_rol');
    if (!rol || rol !== 'PROF') {
        alert('Acceso no autorizado. Por favor inicie sesión como docente.');
        window.location.href = '../index.html';
        return;
    }

    const contenedor = document.getElementById('contenedor-grupos');
    if (!contenedor) return;

    try {
        const response = await fetch('http://localhost:3000/api/asignaturas');
        if (!response.ok) throw new Error('No se pudo obtener la información del servidor');

        const asignaturas = await response.json();
        contenedor.innerHTML = '';

        if (!asignaturas.length) {
            contenedor.innerHTML = '<p class="text-center">No hay asignaturas registradas.</p>';
            return;
        }

        asignaturas.forEach(asignatura => {
            contenedor.innerHTML += `
                <div class="col-md-4 mb-4">
                    <div class="card h-100 shadow-sm" style="background-color: #DDE6ED; border: none;">
                        <div class="card-header text-white text-center py-3" style="background-color: #1B365D; border: none;">
                            <h5 class="mb-0">${asignatura.nombre_asignatura}</h5>
                        </div>
                        <div class="card-body text-center d-flex flex-column justify-content-center">
                            <p class="card-text">Periodo: ${asignatura.periodo}</p>
                            <p class="card-text">Grado: ${asignatura.grado}</p>
                        </div>
                    </div>
                </div>
            `;
        });
    } catch (error) {
        console.error('Error al cargar asignaturas:', error);
        contenedor.innerHTML = '<p class="text-center text-danger">Error al conectar con el servidor.</p>';
    }
});