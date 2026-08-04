export interface MemoryFragment {
  id: number;
  code: string;
  title: string;
  subtitle: string;
  dateTag: string;
  location: string;
  narrativeText: string;
  metaphorTitle: string;
  metaphorDesc: string;
  hints: [string, string, string]; // Nivel 1 (sutil), Nivel 2 (claro), Nivel 3 (solución)
  image?: string;
  nodePosition: { x: number; y: number }; // Posición relativa en porcentaje en la constelación
}

export const MEMORIES_DATA: MemoryFragment[] = [
  {
    id: 1,
    code: 'FRAGMENT_01_PROMISE',
    title: 'La Promesa del Destino',
    subtitle: 'Llegada al Congreso en Julio',
    dateTag: 'Viernes 17 de Julio • Mañana',
    location: 'Cartagena de Indias',
    narrativeText:
      'Todo comenzó en Cartagena durante el Congreso de Jóvenes en Julio. Muchas personas reunidas, miles de historias por coincidir... sin saber que una de las más especiales estaba a punto de iniciarse.',
    metaphorTitle: 'Promesa.resolver()',
    metaphorDesc: 'Una Promesa en código representa confiar en que algo valioso llegará a su debido tiempo.',
    hints: [
      'Arrastra o selecciona la opción que representa confiar en el futuro.',
      'El concepto clave de código es Promesa.resolver().',
      "Selecciona 'Promesa.resolver(\"Cartagena de Indias\")' para desbloquear este fragmento.",
    ],
    nodePosition: { x: 15, y: 75 },
  },
  {
    id: 2,
    code: 'FRAGMENT_02_SUNSET',
    title: 'Atardecer del Viernes',
    subtitle: 'La promesa de que se venía algo lindo',
    dateTag: 'Viernes 17 de Julio • Atardecer',
    location: 'Bajo las palmeras',
    image: '/images/friday_sunset.jpg',
    narrativeText:
      'El cielo del viernes 17 de Julio se tiñó de tonos violetas y anaranjados tras las palmeras, pareciendo una verdadera galaxia al anochecer. Había una serenidad mágica en el ambiente, como si el firmamento avisara que se aproximaba un momento inolvidable.',
    metaphorTitle: 'Espectro y Degradado Galáctico CSS',
    metaphorDesc: 'Ajustar la saturación y enfoque de una imagen revela el verdadero espectro de los momentos compartidos.',
    hints: [
      'Desliza el control de enfoque para aclarar la fotografía del atardecer.',
      'Mueve el control deslizante hacia la derecha hasta que el brillo alcance el 100%.',
      'Desliza el control por completo hacia la derecha y haz clic en Restaurar Fotografía del Atardecer.',
    ],
    nodePosition: { x: 28, y: 60 },
  },
  {
    id: 3,
    code: 'FRAGMENT_03_LOOK',
    title: 'Cruzar Miradas',
    subtitle: 'El almuerzo del Viernes 17 de Julio',
    dateTag: 'Viernes 17 de Julio • Almuerzo',
    location: 'Comedor del Congreso',
    narrativeText:
      'Era la hora del almuerzo el Viernes 17 de Julio. Entre el bullicio y la gente, no dijimos una sola palabra. Simplemente cruzamos miradas por un segundo. Un pequeño instante silencioso pero profundamente significativo.',
    metaphorTitle: 'Sincronización de Onda de Frecuencia',
    metaphorDesc: 'Sincronizar dos frecuencias de onda hasta que encuentren resonancia exacta.',
    hints: [
      'Ajusta la frecuencia de onda hasta que las miradas coincidan en la misma fase.',
      'Mueve los diales para alinear la frecuencia en 17 Hz (17 de Julio).',
      'Ajusta la frecuencia en 17 Hz para sintonizar.',
    ],
    nodePosition: { x: 42, y: 72 },
  },
  {
    id: 4,
    code: 'FRAGMENT_04_INTRODUCTION',
    title: 'Donde Todo Empezó',
    subtitle: 'Viernes 17 de Julio por la noche',
    dateTag: 'Viernes 17 de Julio • Noche',
    location: 'Cartagena',
    narrativeText:
      'Llegó la noche del Viernes 17 de Julio y el pastor nos presentó. Fue ahí donde todo empezó: desde esa primera conversación nos entendimos muy bien y conectamos de una forma especial.',
    metaphorTitle: 'git commit -m "feat: donde todo empezo"',
    metaphorDesc: 'Un commit en Git inmortaliza el verdadero comienzo de una historia especial.',
    hints: [
      'Escribe o selecciona el mensaje de commit correcto para guardar el recuerdo.',
      'Debes ingresar "feat: donde todo empezo" o hacer clic en el bloque interactivo.',
      'Haz clic en el botón "Ejecutar Git Commit" con el mensaje feat: donde todo empezo.',
    ],
    nodePosition: { x: 55, y: 55 },
  },
  {
    id: 5,
    code: 'FRAGMENT_05_CONVERSATION',
    title: 'La Oportunidad de Hablar',
    subtitle: 'Risas y buena sintonía',
    dateTag: 'Viernes 17 de Julio • Noche',
    location: 'Cartagena de Indias',
    narrativeText:
      'El viernes por la noche, tras ser presentados, tuvimos la oportunidad de hablar por primera vez. Fue una plática espontánea y llena de risas, sintiendo desde el primer instante esa gran comodidad y afinidad.',
    metaphorTitle: 'while(conversando) { sonrisas++; }',
    metaphorDesc: 'Un bucle infinito donde hablar por primera vez entre risas solo genera recuerdos valiosos.',
    hints: [
      'Mantén la condición del bucle en estado activo.',
      'Incrementa el contador de sonrisas hasta alcanzar la meta de 100%.',
      "Mantén presionado el botón 'Avanzar Conversación' hasta llenar la barra de comodidad.",
    ],
    nodePosition: { x: 68, y: 40 },
  },
  {
    id: 6,
    code: 'FRAGMENT_06_CITY_WALK',
    title: 'Una Chica Diferente',
    subtitle: 'Sábado 18 de Julio',
    dateTag: 'Sábado 18 de Julio • Decisión',
    location: 'Cartagena de Indias',
    narrativeText:
      'El Sábado 18 de Julio me animé a decirte que quería que nos conociéramos mejor. Desde el primer instante vi en ti a una chica completamente diferente, fuera de lo común, con una luz auténtica y especial.',
    metaphorTitle: 'Algoritmo de Trazado de Ruta',
    metaphorDesc: 'Tomar la iniciativa de conectar con alguien verdaderamente especial fuera de lo común.',
    hints: [
      'Conecta los 4 puntos en el mapa de Cartagena siguiendo el orden numérico.',
      'El orden es: Punto 1 -> Punto 2 -> Punto 3 -> Punto 4.',
      'Haz clic secuencial en los puntos iluminados 1, 2, 3 y 4 del plano.',
    ],
    nodePosition: { x: 80, y: 28 },
  },
  {
    id: 7,
    code: 'FRAGMENT_07_TURBACO',
    title: 'La Esencia de Turbaco & Su Vocación',
    subtitle: 'Luz y cuidado por la salud',
    dateTag: 'Recuerdo Continuo',
    location: 'Turbaco, Bolívar',
    narrativeText:
      'Turbaco es el hogar de una persona admirable. Tu vocación como médica refleja un corazón alegre, brillante y lleno de empatía, dedicado a brindar salud, bienestar y paz a cada paciente.',
    metaphorTitle: 'Cerradura de Bóveda & Vocación Médica',
    metaphorDesc: 'Las almas dedicadas a curar y llevar luz guardan los recuerdos más valiosos.',
    hints: [
      'La combinación de la caja fuerte requiere ingresar el día del primer encuentro (17 de Julio).',
      'El día clave del congreso fue el 17.',
      'Gira los diales numéricos hasta marcar la cifra 1-7.',
    ],
    nodePosition: { x: 72, y: 70 },
  },
  {
    id: 8,
    code: 'FRAGMENT_08_SQL_QUERY',
    title: 'Consultando Memorias',
    subtitle: 'La búsqueda del corazón',
    dateTag: 'Base de Datos de Recuerdos',
    location: 'Sistema Interno',
    narrativeText:
      'Al buscar entre los mejores momentos guardados, no hace falta ningún algoritmo complejo. Solo basta con recordar su nombre para filtrar momentos inolvidables.',
    metaphorTitle: 'SELECT * FROM recuerdos',
    metaphorDesc: "SELECT * FROM recuerdos WHERE persona='Leris' ORDER BY fecha ASC;",
    hints: [
      "Completa la consulta SQL seleccionando el nombre 'Leris'.",
      "Filtra por WHERE persona = 'Leris'.",
      "Selecciona la consulta: SELECT * FROM recuerdos WHERE persona='Leris'.",
    ],
    nodePosition: { x: 58, y: 82 },
  },
  {
    id: 9,
    code: 'FRAGMENT_09_TRY_CATCH',
    title: 'Resiliencia y Esperanza 2026',
    subtitle: 'Aprender y continuar siempre',
    dateTag: 'Reflexión 2026',
    location: 'Perspectiva de Vida',
    narrativeText:
      'La vida y la medicina enseñan que no todo es una línea perfecta sin imprevistos. Pero la madurez y la fe permiten aprender, sonreír y seguir adelante con la mirada puesta en las estrellas.',
    metaphorTitle: 'try { ... } catch (error) { aprender(); }',
    metaphorDesc: 'Un bloque try/catch garantiza que la esperanza nunca colapse ante la adversidad.',
    hints: [
      'Conecta el bloque Try con la función SeguirAdelante() en el flujo.',
      'Captura la excepción y dirige el flujo hacia aprender_y_seguir().',
      "Selecciona 'aprender_y_seguir()' para resolver el circuito.",
    ],
    nodePosition: { x: 40, y: 88 },
  },
  {
    id: 10,
    code: 'FRAGMENT_10_CONSOLE_SECRET',
    title: 'Curioseando en la Consola',
    subtitle: 'Detalles ocultos para curiosos',
    dateTag: 'Terminal Interactiva',
    location: 'Consola del Sistema',
    narrativeText:
      'A veces las cosas más bonitas se descubren curioseando sutilmente. Como una nota secreta guardada en la consola que revela un detalle hermoso sobre tu forma de ser.',
    metaphorTitle: 'consola.log("Sonrisa radiante")',
    metaphorDesc: 'Curiosear en la consola para descubrir un secreto sincero sobre una persona alegre y espontánea.',
    hints: [
      'Ingresa a la consola interactiva y prueba curiosear escribiendo "ayuda" o "secreto".',
      'Ingresa la palabra "secreto" o "sonrisa" en la consola.',
      'Escribe "secreto" en la consola para revelar el mensaje.',
    ],
    nodePosition: { x: 25, y: 40 },
  },
  {
    id: 11,
    code: 'FRAGMENT_11_CONSTELLATION',
    title: 'Galaxia de Recuerdos',
    subtitle: 'Estrellas en el firmamento',
    dateTag: 'Firmamento Estelar',
    location: 'Cielo de Cartagena & Galaxias',
    narrativeText:
      'Como apasionada de las estrellas y las galaxias, sabes bien que cada punto brillante en el firmamento guarda un misterio fascinante. Cada conversación y recuerdo contigo forma nuestra propia galaxia brillante.',
    metaphorTitle: 'Protocolo de Conexión de Galaxias',
    metaphorDesc: 'Vincular estrellas aisladas hasta formar una galaxia estelar coherente y deslumbrante.',
    hints: [
      'Haz clic en las estrellas parpadeantes para trazar las líneas de la constelación.',
      'Une las 5 estrellas iluminadas en el firmamento visual.',
      'Haz clic en cada estrella para conectar toda la galaxia.',
    ],
    nodePosition: { x: 38, y: 22 },
  },
  {
    id: 12,
    code: 'FRAGMENT_12_MASTER_VAULT',
    title: 'El Archivo Maestro Protegido',
    subtitle: '13 de Agosto de 2026',
    dateTag: '13 de Agosto de 2026 • Día Especial',
    location: 'Núcleo del Sistema',
    narrativeText:
      'Todos los fragmentos están restaurados. Hoy, 13 de Agosto de 2026, el sistema ha completado la reconstrucción estelar. Ha llegado el momento de celebrar tu vida y revelar la carta final y el misterio del libro.',
    metaphorTitle: 'Clave de Desencriptación Maestra 2026',
    metaphorDesc: 'Un Cifrado Maestro que solo responde al afecto sincero y a los mejores deseos para tu cumpleaños este 13 de Agosto.',
    hints: [
      'Activa los 3 interruptores cuánticos para desencriptar el archivo maestro.',
      'Haz clic en los interruptores: Afecto, Respeto y Sinceridad.',
      'Haz clic en el botón central "Desencriptar Archivo Maestro".',
    ],
    nodePosition: { x: 50, y: 12 },
  },
];
