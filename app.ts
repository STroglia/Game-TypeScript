class Arma {
    constructor(private nombre: string, private danio: number) {}

    atacar(): string {
        return `⚔️ Ataque con ${this.nombre}: ${this.danio} puntos de daño`;
    }

    getDanio(): number { return this.danio; }
    getNombre(): string { return this.nombre; }
}

class Habilidad {
    constructor(private nombre: string, private poder: number) {}

    usar(): string {
        return `✨ Se utiliza ${this.nombre}: ${this.poder} puntos de poder`;
    }

    getNombre(): string { return this.nombre; }
}

class Personaje {
    constructor(
        private nombre: string,
        private vida: number,
        private arma: Arma,
        private habilidad: Habilidad
    ) {}

    atacar(): string {
        return `${this.nombre} ataca. ` + this.arma.atacar();
    }

    usarHabilidad(): string {
        return `${this.nombre} utiliza una habilidad. ` + this.habilidad.usar();
    }

    cambiarArma(nuevaArma: Arma): void {
        this.arma = nuevaArma;
    }

    recibirDanio(danio: number): void {
        this.vida -= danio;
        if (this.vida < 0) this.vida = 0;
    }

    getVida(): number { return this.vida; }
    getArmaNombre(): string { return this.arma.getNombre(); }
    getHabilidadNombre(): string { return this.habilidad.getNombre(); }
}

// Objetos del juego
const espada = new Arma("Espada de fuego", 30);
const arco = new Arma("Arco mágico", 20);

const curacion = new Habilidad("Curación", 25);
const escudo = new Habilidad("Escudo mágico", 15);

const guerrero = new Personaje("Guerrero", 100, espada, curacion);

// Conexión con el HTML
const vidaVal = document.getElementById("vida")!;
const armaVal = document.getElementById("arma")!;
const habilidadVal = document.getElementById("habilidad")!;
const logBox = document.getElementById("log")!;

function actualizarUI(mensaje: string) {
    vidaVal.textContent = guerrero.getVida().toString();
    armaVal.textContent = guerrero.getArmaNombre();
    habilidadVal.textContent = guerrero.getHabilidadNombre();
    logBox.innerHTML = mensaje + "<br>" + logBox.innerHTML;
}

// Botones de acción
document.getElementById("btn-atacar")?.addEventListener("click", () => {
    actualizarUI(guerrero.atacar());
});

document.getElementById("btn-habilidad")?.addEventListener("click", () => {
    actualizarUI(guerrero.usarHabilidad());
});

let usandoArco = false;
document.getElementById("btn-cambiar")?.addEventListener("click", () => {
    usandoArco = !usandoArco;
    const nuevaArma = usandoArco ? arco : espada;
    guerrero.cambiarArma(nuevaArma);
    actualizarUI(`🔄 El personaje cambió su arma a: ${nuevaArma.getNombre()}`);
});

actualizarUI("Juego inicializado correctamente.");