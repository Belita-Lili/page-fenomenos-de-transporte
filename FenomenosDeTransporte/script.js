// Función para cambiar entre pestañas
function openTab(tabName) {
    // Ocultar todos los contenidos de pestañas
    const tabContents = document.getElementsByClassName('tab-content');
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].classList.remove('active-tab');
    }

    // Desactivar todos los botones de pestañas
    const tabButtons = document.getElementsByClassName('tab-button');
    for (let i = 0; i < tabButtons.length; i++) {
        tabButtons[i].classList.remove('active');
    }

    // Mostrar la pestaña seleccionada y activar su botón
    document.getElementById(tabName).classList.add('active-tab');
    event.currentTarget.classList.add('active');

    // Actualizar la sección de teoría
    updateTheorySection(tabName);
}

// Función para actualizar la sección de teoría
function updateTheorySection(tabName) {
    const theoryContent = document.getElementById('theory-content');
    let theoryHTML = '';

    switch(tabName) {
        case 'conduccion':
            theoryHTML = `
                <h3>Ley de Fourier</h3>
                <p>La transferencia de calor por conducción se calcula mediante:</p>
                <p class="equation">Q = -k·A·(dT/dx)</p>
                <p>Para una pared plana con diferencias de temperatura constante:</p>
                <p class="equation">Q = k·A·(T₁ - T₂)/Δx</p>
                <p>Donde:</p>
                <ul>
                    <li>Q = Tasa de transferencia de calor (W)</li>
                    <li>k = Conductividad térmica (W/m·K)</li>
                    <li>A = Área transversal (m²)</li>
                    <li>T₁, T₂ = Temperaturas en los extremos (°C o K)</li>
                    <li>Δx = Espesor del material (m)</li>
                </ul>
            `;
            break;
        case 'conveccion':
            theoryHTML = `
                <h3>Ley de Enfriamiento de Newton</h3>
                <p>La transferencia de calor por convección se calcula mediante:</p>
                <p class="equation">Q = h·A·(Tₛ - T∞)</p>
                <p>Donde:</p>
                <ul>
                    <li>Q = Tasa de transferencia de calor (W)</li>
                    <li>h = Coeficiente de transferencia de calor por convección (W/m²·K)</li>
                    <li>A = Área superficial (m²)</li>
                    <li>Tₛ = Temperatura de la superficie (°C o K)</li>
                    <li>T∞ = Temperatura del fluido lejos de la superficie (°C o K)</li>
                </ul>
            `;
            break;
        case 'radiacion':
            theoryHTML = `
                <h3>Ley de Stefan-Boltzmann</h3>
                <p>La transferencia de calor por radiación se calcula mediante:</p>
                <p class="equation">Q = ε·σ·A·(Tₛ⁴ - Talr⁴)</p>
                <p>Donde:</p>
                <ul>
                    <li>Q = Tasa de transferencia de calor (W)</li>
                    <li>ε = Emisividad de la superficie (adimensional, 0 ≤ ε ≤ 1)</li>
                    <li>σ = Constante de Stefan-Boltzmann (5.67 × 10⁻⁸ W/m²·K⁴)</li>
                    <li>A = Área superficial (m²)</li>
                    <li>Tₛ = Temperatura de la superficie (K)</li>
                    <li>Talr = Temperatura de los alrededores (K)</li>
                </ul>
                <p><strong>Nota:</strong> Las temperaturas deben estar en Kelvin para este cálculo.</p>
            `;
            break;
        case 'flujo-fluidos':
            theoryHTML = `
                <h3>Ecuación de Hagen-Poiseuille</h3>
                <p>El caudal volumétrico en un flujo laminar completamente desarrollado en una tubería circular se calcula mediante:</p>
                <p class="equation">Q = (π·D⁴·ΔP)/(128·μ·L)</p>
                <p>Donde:</p>
                <ul>
                    <li>Q = Caudal volumétrico (m³/s)</li>
                    <li>D = Diámetro de la tubería (m)</li>
                    <li>ΔP = Diferencia de presión (Pa)</li>
                    <li>μ = Viscosidad dinámica (Pa·s)</li>
                    <li>L = Longitud de la tubería (m)</li>
                </ul>
                <p>Esta ecuación es válida para flujo laminar (Número de Reynolds &lt; 2300).</p>
            `;
            break;
        default:
            theoryHTML = '<p>Seleccione una pestaña para ver las ecuaciones teóricas correspondientes.</p>';
    }

    theoryContent.innerHTML = theoryHTML;
}

// Función para calcular conducción de calor
function calcularConduccion() {
    const k = parseFloat(document.getElementById('conductividad').value);
    const A = parseFloat(document.getElementById('area-conduccion').value);
    const T1 = parseFloat(document.getElementById('temp-caliente').value);
    const T2 = parseFloat(document.getElementById('temp-fria').value);
    const dx = parseFloat(document.getElementById('espesor').value);

    if (isNaN(k) || isNaN(A) || isNaN(T1) || isNaN(T2) || isNaN(dx)) {
        alert("Por favor ingrese todos los valores correctamente.");
        return;
    }

    if (dx === 0) {
        alert("El espesor no puede ser cero.");
        return;
    }

    const Q = k * A * (T1 - T2) / dx;
    const resultado = document.getElementById('resultado-conduccion');
    resultado.innerHTML = `
        <p><strong>Tasa de transferencia de calor:</strong> ${Q.toFixed(2)} W</p>
        <p>Fórmula utilizada: Q = k·A·(T₁ - T₂)/Δx</p>
    `;
}

// Función para calcular convección
function calcularConveccion() {
    const h = parseFloat(document.getElementById('coeficiente-conveccion').value);
    const A = parseFloat(document.getElementById('area-conveccion').value);
    const Ts = parseFloat(document.getElementById('temp-superficie').value);
    const Tinf = parseFloat(document.getElementById('temp-fluido').value);

    if (isNaN(h) || isNaN(A) || isNaN(Ts) || isNaN(Tinf)) {
        alert("Por favor ingrese todos los valores correctamente.");
        return;
    }

    const Q = h * A * (Ts - Tinf);
    const resultado = document.getElementById('resultado-conveccion');
    resultado.innerHTML = `
        <p><strong>Tasa de transferencia de calor:</strong> ${Q.toFixed(2)} W</p>
        <p>Fórmula utilizada: Q = h·A·(Tₛ - T∞)</p>
    `;
}

// Función para calcular radiación
function calcularRadiacion() {
    const epsilon = parseFloat(document.getElementById('emisividad').value);
    const A = parseFloat(document.getElementById('area-radiacion').value);
    const Ts = parseFloat(document.getElementById('temp-superficie-rad').value);
    const Talr = parseFloat(document.getElementById('temp-alrededores').value);
    const sigma = 5.67e-8; // Constante de Stefan-Boltzmann

    if (isNaN(epsilon) || isNaN(A) || isNaN(Ts) || isNaN(Talr)) {
        alert("Por favor ingrese todos los valores correctamente.");
        return;
    }

    if (epsilon < 0 || epsilon > 1) {
        alert("La emisividad debe estar entre 0 y 1.");
        return;
    }

    const Q = epsilon * sigma * A * (Math.pow(Ts, 4) - Math.pow(Talr, 4));
    const resultado = document.getElementById('resultado-radiacion');
    resultado.innerHTML = `
        <p><strong>Tasa de transferencia de calor:</strong> ${Q.toFixed(2)} W</p>
        <p>Fórmula utilizada: Q = ε·σ·A·(Tₛ⁴ - Talr⁴)</p>
    `;
}

// Función para calcular flujo de fluidos
function calcularFlujoFluidos() {
    const D = parseFloat(document.getElementById('diametro').value);
    const mu = parseFloat(document.getElementById('viscosidad').value);
    const L = parseFloat(document.getElementById('longitud').value);
    const deltaP = parseFloat(document.getElementById('caida-presion').value);

    if (isNaN(D) || isNaN(mu) || isNaN(L) || isNaN(deltaP)) {
        alert("Por favor ingrese todos los valores correctamente.");
        return;
    }

    if (D === 0 || mu === 0 || L === 0) {
        alert("Diámetro, viscosidad y longitud no pueden ser cero.");
        return;
    }

    const Q = (Math.PI * Math.pow(D, 4) * deltaP) / (128 * mu * L);
    const resultado = document.getElementById('resultado-flujo-fluidos');
    resultado.innerHTML = `
        <p><strong>Caudal volumétrico:</strong> ${Q.toExponential(4)} m³/s</p>
        <p>Fórmula utilizada: Q = (π·D⁴·ΔP)/(128·μ·L)</p>
    `;
}

// Inicializar la sección de teoría al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    updateTheorySection('conduccion');
});