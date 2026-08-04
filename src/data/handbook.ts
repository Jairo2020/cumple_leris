export interface HandbookEntry {
  concept: string;
  syntax: string;
  category: 'Metáfora' | 'Fundamento' | 'Filosofía' | 'Vocación';
  analogyTitle: string;
  analogyDesc: string;
  codeSnippet: string;
}

export const HANDBOOK_ENTRIES: HandbookEntry[] = [
  {
    concept: 'Promise (Promesa)',
    syntax: 'new Promise((resolve, reject) => { ... })',
    category: 'Metáfora',
    analogyTitle: 'Confiar en lo que vendrá',
    analogyDesc:
      'Una Promise representa confiar en que algo hermoso sucederá en el futuro. Algo parecido a aceptar conocer mejor a una persona sin saber de antemano todos los momentos increíbles que llegarán después.',
    codeSnippet: `const amistad = new Promise((resolve) => {
  setTimeout(() => {
    resolve("Recuerdos inolvidables en Cartagena");
  }, 1000);
});

amistad.then(recuerdo => console.log(recuerdo));`,
  },
  {
    concept: 'Vocación Médica & HealthCheck',
    syntax: 'function cuidarPersona(paciente) { ... }',
    category: 'Vocación',
    analogyTitle: 'Curar, cuidar y llevar luz',
    analogyDesc:
      'La medicina y la buena programación comparten la misma esencia: diagnosticar con sabiduría, reparar con empatía y restaurar la paz y el bienestar en la vida de los demás.',
    codeSnippet: `function profesionMedica(vocacion) {
  const empatia = true;
  const luzPropia = Infinity;
  return brindarSaludYPaz(paciente, empatia, luzPropia);
}`,
  },
  {
    concept: 'Estrellas & Galaxias (Constelaciones)',
    syntax: 'const galaxia = estrellas.map(crearLuz);',
    category: 'Filosofía',
    analogyTitle: 'El firmamento de momentos',
    analogyDesc:
      'Así como las galaxias albergan billones de estrellas brillantes, los momentos especiales y las conversaciones sinceras forman nuestra propia constelación en el universo.',
    codeSnippet: `const firmamento = ["Cartagena", "Conversaciones", "Risas", "Sueños 2026"];
const galaxiaLeris = firmamento.map(estrella => iluminar(estrella));`,
  },
  {
    concept: 'Loop (Bucle while)',
    syntax: 'while (condicion) { ... }',
    category: 'Metáfora',
    analogyTitle: 'Conversaciones donde el tiempo no pasa',
    analogyDesc:
      'Hay pláticas y risas que uno desearía repetir una y otra vez. Un bucle representa esos momentos cómodos donde cada minuto compartido suma tranquilidad.',
    codeSnippet: `while (conversandoConLeris) {
  sonrisas++;
  comodidad += 100;
  tiempoOlvidado = true;
}`,
  },
  {
    concept: 'Git Commit',
    syntax: 'git commit -m "feat: nuevo recuerdo"',
    category: 'Metáfora',
    analogyTitle: 'Inmortalizar momentos',
    analogyDesc:
      'Git guarda versiones en el tiempo para no perder ningún avance. En la vida, cada caminata y conversación sincera es un commit imborrable en nuestra memoria.',
    codeSnippet: `git commit -m "feat: donde todo empezo el 17 de Julio"
git commit -m "feat: una chica diferente fuera de lo común"
git push origin recuerdos_para_siempre`,
  },
  {
    concept: 'Try / Catch',
    syntax: 'try { ... } catch (error) { ... }',
    category: 'Metáfora',
    analogyTitle: 'Manejar imprevistos con madurez',
    analogyDesc:
      'No todo sale perfecto a la primera. Pero lo más valioso del código (y de la vida) es tener la sabiduría para aprender de los imprevistos, levantarse y seguir adelante con fe.',
    codeSnippet: `try {
  caminar_sin_plan();
} catch (imprevisto) {
  aprender_de_la_experiencia();
  sonreir_y_continuar();
}`,
  },
  {
    concept: 'SQL Query',
    syntax: 'SELECT * FROM recuerdos WHERE ...',
    category: 'Metáfora',
    analogyTitle: 'Consultar los mejores recuerdos',
    analogyDesc:
      'Buscar un recuerdo en el alma es parecido a realizar una consulta SELECT en una base de datos. Filtramos los momentos tristes y nos quedamos con la gratitud y la alegría.',
    codeSnippet: `SELECT fecha, lugar, detalles 
FROM recuerdos 
WHERE persona = 'Leris' 
ORDER BY fecha ASC;`,
  },
  {
    concept: 'Clean Code (Código Limpio)',
    syntax: 'const sencillez = true;',
    category: 'Filosofía',
    analogyTitle: 'La elegancia de la sinceridad',
    analogyDesc:
      'El código limpio no presume complejidad innecesaria; se entiende con claridad y transmite paz. Así son las amistades genuinas: transparentes, tranquilas y respetuosas.',
    codeSnippet: `const tratoRespetuoso = true;
const afectoSincero = true;
const buenosDeseos2026 = Infinity;`,
  },
];
