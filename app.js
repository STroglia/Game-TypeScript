"use strict";
// --- CLASES DEL DOMINIO (POO - Agregación) ---
var _a, _b, _c, _d, _e;
class Arma {
    constructor(nombre, potencia) {
        this.nombre = nombre;
        this.potencia = potencia;
    }
    ejecutarAtaque() {
        return `Ataque canalizado con ${this.nombre} (Daño: ${this.potencia} pts)`;
    }
    getNombre() { return this.nombre; }
    getPotencia() { return this.potencia; }
}
class Habilidad {
    constructor(nombre, efecto) {
        this.nombre = nombre;
        this.efecto = efecto;
    }
    activar() {
        return `Habilidad [${this.nombre}] activada: ${this.efecto}`;
    }
    getNombre() { return this.nombre; }
}
class Personaje {
    constructor(nombre, vidaActual, vidaMaxima, armaEquipada, habilidadActiva) {
        this.nombre = nombre;
        this.vidaActual = vidaActual;
        this.vidaMaxima = vidaMaxima;
        this.armaEquipada = armaEquipada;
        this.habilidadActiva = habilidadActiva;
    }
    atacar() {
        return `${this.nombre} ataca. ${this.armaEquipada.ejecutarAtaque()}`;
    }
    usarHabilidad() {
        return `${this.nombre} conjura. ✨ ${this.habilidadActiva.activar()}`;
    }
    equiparArma(nuevaArma) {
        this.armaEquipada = nuevaArma;
    }
    equiparHabilidad(nuevaHabilidad) {
        this.habilidadActiva = nuevaHabilidad;
    }
    recibirImpacto(danio) {
        this.vidaActual -= danio;
        if (this.vidaActual < 0)
            this.vidaActual = 0;
    }
    getVida() { return this.vidaActual; }
    getVidaMaxima() { return this.vidaMaxima; }
    getNombreArma() { return this.armaEquipada.getNombre(); }
    getNombreHabilidad() { return this.habilidadActiva.getNombre(); }
}
// --- INSTANCIAS DE PRUEBA (Completamente únicas) ---
const baculo = new Arma("Báculo Runificado", 35);
const mandoble = new Arma("Mandoble Fénix", 45);
const escudoEstelar = new Habilidad("Escudo Estelar", "+30 Barrera de Protección");
const rafagaAstral = new Habilidad("Ráfaga Astral", "25 Daño de Área Elemental");
const heroe = new Personaje("Paladín Arcano", 100, 100, baculo, escudoEstelar);
// --- VINCULACIÓN CON EL DOM ---
const vidaText = document.getElementById("vida");
const hpBarFill = document.getElementById("hp-bar");
const armaText = document.getElementById("arma");
const habilidadText = document.getElementById("habilidad");
const logTerminal = document.getElementById("log");
function refrescarPantalla(mensaje) {
    // 1. Textos
    vidaText.textContent = heroe.getVida().toString();
    armaText.textContent = heroe.getNombreArma();
    habilidadText.textContent = heroe.getNombreHabilidad();
    // 2. Barra de HP
    const porcentaje = (heroe.getVida() / heroe.getVidaMaxima()) * 100;
    hpBarFill.style.width = `${porcentaje}%`;
    // 3. Log
    logTerminal.innerHTML = `> ${mensaje}<br>` + logTerminal.innerHTML;
}
// --- LISTENERS DE INTERACCIÓN ---
let tieneMandoble = false;
let tieneRafaga = false;
(_a = document.getElementById("btn-atacar")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
    refrescarPantalla(heroe.atacar());
});
(_b = document.getElementById("btn-habilidad")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
    refrescarPantalla(heroe.usarHabilidad());
});
(_c = document.getElementById("btn-cambiar-arma")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", () => {
    tieneMandoble = !tieneMandoble;
    const nuevaArma = tieneMandoble ? mandoble : baculo;
    heroe.equiparArma(nuevaArma);
    refrescarPantalla(`Equipamiento cambiado a: ${nuevaArma.getNombre()}`);
});
(_d = document.getElementById("btn-cambiar-hab")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", () => {
    tieneRafaga = !tieneRafaga;
    const nuevaHab = tieneRafaga ? rafagaAstral : escudoEstelar;
    heroe.equiparHabilidad(nuevaHab);
    refrescarPantalla(`Habilidad cambiada a: ${nuevaHab.getNombre()}`);
});
(_e = document.getElementById("btn-recibir-danio")) === null || _e === void 0 ? void 0 : _e.addEventListener("click", () => {
    heroe.recibirImpacto(20);
    refrescarPantalla(`El héroe recibió un impacto de 20 de daño. HP restante: ${heroe.getVida()}`);
});
// Inicio
refrescarPantalla("Paladín listo para la batalla.");
