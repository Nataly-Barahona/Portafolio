const interruptorTema = document.getElementById('themeToggle');
const fotoPerfil = document.getElementById('fotoPerfil');
const temaGuardado = localStorage.getItem('theme');
const botonesLetra = document.querySelectorAll('.font-btn');
const raiz = document.documentElement;
let tamañoActual = 16;

function aplicarTema(tema) {
    const esModoClaro = tema === 'light';
    
    // Añade 'dark-mode' si NO es modo claro (es decir, si es oscuro)
    document.body.classList.toggle('dark-mode', !esModoClaro);
    
    // Cambia la foto solo si el elemento existe en la página actual
    if (fotoPerfil) {
        fotoPerfil.src = esModoClaro ? 'img/Retrato2modo diurno.png' : 'img/Retrato2.png';
    }
    
    // Cambia el texto del botón solo si existe
    if (interruptorTema) {
        interruptorTema.textContent = esModoClaro ? '☀️' : '🌙';
        interruptorTema.setAttribute('aria-label', esModoClaro ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro');
    }
}

function ajustarTamañoLetra(accion) {
    if (accion === 'increase') {
        tamañoActual += 1;
    } else if (accion === 'decrease') {
        tamañoActual -= 1;
    }

    if (tamañoActual < 12) tamañoActual = 12;
    if (tamañoActual > 24) tamañoActual = 24;

    raiz.style.fontSize = `${tamañoActual}px`;
}

// Configuración inicial del tema
if (temaGuardado) {
    aplicarTema(temaGuardado);
} else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    aplicarTema('dark');
}

// Escuchador del botón de tema (protegido si no existe en el HTML)
if (interruptorTema) {
    interruptorTema.addEventListener('click', () => {
        const esOscuro = document.body.classList.contains('dark-mode');
        const siguienteTema = esOscuro ? 'light' : 'dark';
        
        localStorage.setItem('theme', siguienteTema);
        aplicarTema(siguienteTema);
    });
}

// Escuchador para los botones de tamaño de letra
botonesLetra.forEach((boton) => {
    boton.addEventListener('click', () => ajustarTamañoLetra(boton.dataset.action));
});
