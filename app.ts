// --- CLASES DEL DOMINIO (POO - Agregación) ---

class Arma {
    constructor(
        private nombre: string,
        private potencia: number
    ) {}

    ejecutarAtaque(): string {
        return `Ataque canalizado con ${this.nombre} (Daño: ${this.potencia} pts)`;
    }

    getNombre(): string { return this.nombre; }
    getPotencia(): number { return this.potencia; }
}

class Habilidad {
    constructor(
        private nombre: string,
        private efecto: string
    ) {}

    activar(): string {
        return `Habilidad [${this.nombre}] activada: ${this.efecto}`;
    }

    getNombre(): string { return this.nombre; }
}

class Personaje {
    constructor(
        private nombre: string,
        private vidaActual: number,
        private vidaMaxima: number,
        private armaEquipada: Arma,
        private habilidadActiva: Habilidad
    ) {}

    atacar(): string {
        return `${this.nombre} ataca. ${this.armaEquipada.ejecutarAtaque()}`;
    }

    usarHabilidad(): string {
        return `${this.nombre} conjura. ✨ ${this.habilidadActiva.activar()}`;
    }

    equiparArma(nuevaArma: Arma): void {
        this.armaEquipada = nuevaArma;
    }

    equiparHabilidad(nuevaHabilidad: Habilidad): void {
        this.habilidadActiva = nuevaHabilidad;
    }

    recibirImpacto(danio: number): void {
        this.vidaActual -= danio;
        if (this.vidaActual < 0) this.vidaActual = 0;
    }

    getVida(): number { return this.vidaActual; }
    getVidaMaxima(): number { return this.vidaMaxima; }
    getNombreArma(): string { return this.armaEquipada.getNombre(); }
    getNombreHabilidad(): string { return this.habilidadActiva.getNombre(); }
}

// --- INSTANCIAS DE PRUEBA (Completamente únicas) ---

const baculo = new Arma("Báculo Runificado", 35);
const mandoble = new Arma("Mandoble Fénix", 45);

const escudoEstelar = new Habilidad("Escudo Estelar", "+30 Barrera de Protección");
const rafagaAstral = new Habilidad("Ráfaga Astral", "25 Daño de Área Elemental");

const heroe = new Personaje("Paladín Arcano", 100, 100, baculo, escudoEstelar);

// --- VINCULACIÓN CON EL DOM ---

const vidaText = document.getElementById("vida")!;
const hpBarFill = document.getElementById("hp-bar")!;
const armaText = document.getElementById("arma")!;
const habilidadText = document.getElementById("habilidad")!;
const logTerminal = document.getElementById("log")!;

function refrescarPantalla(mensaje: string) {
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

document.getElementById("btn-atacar")?.addEventListener("click", () => {
    refrescarPantalla(heroe.atacar());
});

document.getElementById("btn-habilidad")?.addEventListener("click", () => {
    refrescarPantalla(heroe.usarHabilidad());
});

document.getElementById("btn-cambiar-arma")?.addEventListener("click", () => {
    tieneMandoble = !tieneMandoble;
    const nuevaArma = tieneMandoble ? mandoble : baculo;
    heroe.equiparArma(nuevaArma);
    refrescarPantalla(`Equipamiento cambiado a: ${nuevaArma.getNombre()}`);
});

document.getElementById("btn-cambiar-hab")?.addEventListener("click", () => {
    tieneRafaga = !tieneRafaga;
    const nuevaHab = tieneRafaga ? rafagaAstral : escudoEstelar;
    heroe.equiparHabilidad(nuevaHab);
    refrescarPantalla(`Habilidad cambiada a: ${nuevaHab.getNombre()}`);
});

document.getElementById("btn-recibir-danio")?.addEventListener("click", () => {
    heroe.recibirImpacto(20);
    refrescarPantalla(`El héroe recibió un impacto de 20 de daño. HP restante: ${heroe.getVida()}`);
});

// Inicio
refrescarPantalla("Paladín listo para la batalla.");