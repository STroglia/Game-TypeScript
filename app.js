"use strict";
var _a, _b, _c;
class Arma {
    constructor(nombre, danio) {
        this.nombre = nombre;
        this.danio = danio;
    }
    atacar() {
        return `⚔️ Ataque con ${this.nombre}: ${this.danio} puntos de daño`;
    }
    getDanio() { return this.danio; }
    getNombre() { return this.nombre; }
}
class Habilidad {
    constructor(nombre, poder) {
        this.nombre = nombre;
        this.poder = poder;
    }
    usar() {
        return `✨ Se utiliza ${this.nombre}: ${this.poder} puntos de poder`;
    }
    getNombre() { return this.nombre; }
}
class Personaje {
    constructor(nombre, vida, arma, habilidad) {
        this.nombre = nombre;
        this.vida = vida;
        this.arma = arma;
        this.habilidad = habilidad;
    }
    atacar() {
        return `${this.nombre} ataca. ` + this.arma.atacar();
    }
    usarHabilidad() {
        return `${this.nombre} utiliza una habilidad. ` + this.habilidad.usar();
    }
    cambiarArma(nuevaArma) {
        this.arma = nuevaArma;
    }
    recibirDanio(danio) {
        this.vida -= danio;
        if (this.vida < 0)
            this.vida = 0;
    }
    getVida() { return this.vida; }
    getArmaNombre() { return this.arma.getNombre(); }
    getHabilidadNombre() { return this.habilidad.getNombre(); }
}
// Objetos del juego
const espada = new Arma("Espada de fuego", 30);
const arco = new Arma("Arco mágico", 20);
const curacion = new Habilidad("Curación", 25);
const escudo = new Habilidad("Escudo mágico", 15);
const guerrero = new Personaje("Guerrero", 100, espada, curacion);
// Conexión con el HTML
const vidaVal = document.getElementById("vida");
const armaVal = document.getElementById("arma");
const habilidadVal = document.getElementById("habilidad");
const logBox = document.getElementById("log");
function actualizarUI(mensaje) {
    vidaVal.textContent = guerrero.getVida().toString();
    armaVal.textContent = guerrero.getArmaNombre();
    habilidadVal.textContent = guerrero.getHabilidadNombre();
    logBox.innerHTML = mensaje + "<br>" + logBox.innerHTML;
}
// Botones de acción
(_a = document.getElementById("btn-atacar")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
    actualizarUI(guerrero.atacar());
});
(_b = document.getElementById("btn-habilidad")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
    actualizarUI(guerrero.usarHabilidad());
});
let usandoArco = false;
(_c = document.getElementById("btn-cambiar")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", () => {
    usandoArco = !usandoArco;
    const nuevaArma = usandoArco ? arco : espada;
    guerrero.cambiarArma(nuevaArma);
    actualizarUI(`🔄 El personaje cambió su arma a: ${nuevaArma.getNombre()}`);
});
actualizarUI("Juego inicializado correctamente.");
