const interruptorTema = document.getElementById('themeToggle');
const fotoPerfil = document.getElementById('fotoPerfil');
const temaGuardado = localStorage.getItem('theme');
const botonesLetra = document.querySelectorAll('.font-btn');
const raiz = document.documentElement;
let tamañoActual = 16;

function aplicarTema(tema) {
    const esModoClaro = tema === 'light';
    document.body.classList.toggle('dark-mode', esModoClaro);
    fotoPerfil.src = esModoClaro ? 'img/Retrato2modo diurno.png' : 'img/Retrato2.png';
    interruptorTema.textContent = esModoClaro ? '☀️' : '🌙';
    interruptorTema.setAttribute('aria-label', esModoClaro ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro');
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

if (temaGuardado) {
    aplicarTema(temaGuardado);
} else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    aplicarTema('dark');
}

interruptorTema.addEventListener('click', () => {
    const siguienteTema = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('theme', siguienteTema);
    aplicarTema(siguienteTema);
});

botonesLetra.forEach((boton) => {
    boton.addEventListener('click', () => ajustarTamañoLetra(boton.dataset.action));
});