"use strict";
// ============================================
// ARMA
// ============================================
class Arma {
    nombre;
    danio;
    constructor(nombre, danio) {
        this.nombre = nombre;
        this.danio = danio;
    }
    atacar() {
        console.log(`⚔️ Ataque con ${this.nombre}: ${this.danio} puntos de daño`);
    }
    getDanio() {
        return this.danio;
    }
    getNombre() {
        return this.nombre;
    }
}
// ============================================
// HABILIDAD
// ============================================
class Habilidad {
    nombre;
    poder;
    constructor(nombre, poder) {
        this.nombre = nombre;
        this.poder = poder;
    }
    usar() {
        console.log(`✨ Se utiliza ${this.nombre}: ${this.poder} puntos de poder`);
    }
    getNombre() {
        return this.nombre;
    }
}
// ============================================
// PERSONAJE
// ============================================
class Personaje {
    nombre;
    vida;
    arma;
    habilidad;
    constructor(nombre, vida, arma, habilidad) {
        this.nombre = nombre;
        this.vida = vida;
        this.arma = arma;
        this.habilidad = habilidad;
    }
    atacar() {
        console.log(`${this.nombre} ataca:`);
        this.arma.atacar();
    }
    usarHabilidad() {
        console.log(`${this.nombre} utiliza una habilidad:`);
        this.habilidad.usar();
    }
    cambiarArma(nuevaArma) {
        this.arma = nuevaArma;
        console.log(`${this.nombre} ahora utiliza ${nuevaArma.getNombre()}`);
    }
    recibirDanio(danio) {
        this.vida -= danio;
        console.log(`${this.nombre} recibió ${danio} puntos de daño.`);
        console.log(`Vida restante: ${this.vida}`);
    }
}
// ============================================
// CREACIÓN DE OBJETOS
// ============================================
// Creamos armas
const espada = new Arma("Espada de fuego", 30);
const arco = new Arma("Arco mágico", 20);
// Creamos habilidades
const curacion = new Habilidad("Curación", 25);
const escudo = new Habilidad("Escudo mágico", 15);
// ============================================
// COMPOSICIÓN
// ============================================
// Creamos un personaje utilizando
// los objetos anteriores.
const guerrero = new Personaje("Guerrero", 100, espada, curacion);
// ============================================
// JUGAMOS
// ============================================
guerrero.atacar();
guerrero.usarHabilidad();
guerrero.recibirDanio(20);
// ============================================
// CAMBIAMOS EL ARMA
// ============================================
guerrero.cambiarArma(arco);
guerrero.atacar();
// ============================================
// CREAMOS OTRO PERSONAJE
// ============================================
const arquero = new Personaje("Arquero", 80, arco, escudo);
arquero.atacar();
arquero.usarHabilidad();
