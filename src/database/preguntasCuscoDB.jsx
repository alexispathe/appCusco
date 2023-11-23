export const preguntasCusco = [
  {
    title: 'Características Sociodemográficas',
    questions: [
      {
        title: '¿Cuál es su sexo?',
        options: ['Hombre', 'Mujer'],
        questionID: 'cual-es-su-sexo-123',
      },
      {
        title: '¿Cuál es su estado civil?',
        options: [
          'Soltero(a)',
          'Casado(a)',
          'Viudo(a)',
          'Divorciado(a)',
          'Unión libre',
        ],
        questionID: 'estado-civil-123',
      },
      {
        title: '¿De qué material es la mayor parte del techo de esta vivienda?',
        options: [
          'Material de desecho',
          'Lámina de cartón',
          'Lámina metálica',
          'Lámina de asbesto',
          'Palma o paja',
          'Madera o tejamanil',
          'Terrado con viguería',
          'Teja',
          'Losa de concreto o viguetas con bovedilla',
        ],
        questionID: 'material-techo-456',
      },
      {
        title:
          '¿De qué material es la mayor parte de las paredes o muros de esta vivienda?',
        options: [
          'Material de desecho',
          'Lámina de cartón',
          'Lámina de asbesto o metálica',
          'Carrizo, bambú o palma',
          'Embarro, bajareque o paja',
          'Madera',
          'Adobe',
          'Tabique, ladrillo, block, piedra, cantera, cemento o concreto',
          'No especificado',
        ],
        questionID: 'material-paredes-789',
      },
      {
        title: '¿De qué material es la mayor parte del piso de esta vivienda?',
        options: [
          'Tierra',
          'Cemento o Firme',
          'Madera',
          'mosaico u otro recubrimiento',
          'No especificado',
        ],
        questionID: 'material-piso-012',
      },
      {
        title: '¿Cuál es el combustible que más usan para cocinar?',
        options: [
          'Leña',
          'Carbón',
          'Gas de cilindro o estacionario',
          'Gas natural o de tubería',
          'Electricidad',
          '¿Otro combustible?',
          '¿No cocinan?',
        ],
        questionID: 'combustible-cocinar-345',
      },
      {
        title: '¿Hay luz eléctrica en esta vivienda?',
        options: ['Sí', 'No'],
        questionID: 'luz-electrica-678',
      },
      {
        title: '¿Esta vivienda tiene agua entubada?',
        options: ['Sí', 'No'],
        questionID: 'agua-entubada-901',
      },
      {
        title: '¿Esta vivienda tiene drenaje o desagüe conectado a:',
        options: [
          'la red pública?',
          '¿una fosa séptica o tanque séptico (biodigestor)?',
          '¿una tubería que va a dar a una barranca o grieta?',
          '¿una tubería que va a dar a un río, lago o mar?',
          '¿No tiene drenaje?',
          'No especificado',
        ],
        questionID: 'drenaje-234',
      },
      {
        title: '¿La basura de esta vivienda:',
        options: [
          '¿la recoge un camión o carrito de basura?',
          '¿la tiran en el basurero público?',
          '¿la tiran en un contenedor o depósito?',
          '¿la queman?',
          '¿la entierran?',
          '¿la tiran en un terreno baldío o calle?',
          '¿la tiran a la barranca o grieta?',
          '¿la tiran al rio, lago o mar?',
          'No especificado',
        ],
        questionID: 'basura-vivienda-567',
      },
      {
        title: '¿Cuál es el último año o grado que aprobó usted en la escuela?',
        options: [
          'Ninguno',
          'Preescolar',
          'Primaria',
          'Secundaria',
          'Preparatoria o bachillerato',
          'Carrera Tecnica o Comercial',
          'Licenciatura o Ingenieria',
          'Maestria',
          'Doctorado',
        ],
        questionID: 'grado-aprobado-890',
      },
    ],
    questionCuscoID: 1,
  },
  {
    title: 'Autopercepción de Salud  y Prevención',
    questions: [
      {
        title: '¿Cómo considera usted que es su estado de salud actual?',
        options: ['Excelente', 'Muy bueno', 'Bueno', 'Regular', 'Malo'],
        questionID: 'salud-actual-231',
      },
      {
        title:
          'Cuando usted tiene problemas de salud ¿En dónde se atiende usualmente?',
        options: [
          'IMSS',
          'ISSSTE',
          'INSABI',
          'Consultorio',
          'Clínica u Hospital Privado',
          'Se Automedica',
          'No se atiende',
          'Otro',
        ],
        questionID: 'donde-atiende-salud-456',
      },
      {
        title: '¿Con qué tipo de seguridad social cuenta?',
        options: ['IMSS', 'ISSSTE', 'INSABI', 'Privado', 'Ninguno'],
        questionID: 'seguridad-social-789',
      },
      {
        title:
          '¿Cómo considera usted que es la atención recibida en su centro de atención médica?',
        options: ['Excelente', 'Muy buena', 'Buena', 'Regular', 'Mala'],
        questionID: 'atencion-recibida-123',
      },
      {
        title:
          'En los últimos seis meses ¿usted acudió a revisión médica preventiva?',
        options: ['Sí', 'No'],
        questionID: 'revision-preventiva-987',
      },
      {
        title:
          'En los últimos seis meses, ¿usted solicitó ser atendido(a) por algún profesional de salud o centro sanitario debido a un problema de salud, enfermedad, control de la misma, lesión o accidente?',
        options: ['Sí', 'No'],
        questionID: 'solicitud-atencion-salud-654',
      },
      {
        title:
          'En los últimos seis meses ¿Cuál fue el principal problema o motivo por el que tuvo necesidad de solicitar atención médica?',
        options: [
          'Infecciones respiratorias',
          'Neumonía o bronconeumonía',
          'Enfermedad pulmonar obstructiva crónica (bronquitis crónica)',
          'Tos, catarro, dolor de garganta',
          'Tuberculosis',
          'Infección de oído',
          'Conjuntivitis',
          'Asma',
          'Alergias',
          'Enfermedades del corazón',
          'Fiebre reumática',
          'Diabetes',
          'Hipertensión arterial',
          'Embolia o derrame cerebral',
          'Obesidad',
          'Artritis',
          'Diarrea',
          'Gastritis o úlcera gástrica',
          'Colitis',
          'Parasitosis intestinal',
          'Hepatitis',
          'Enfermedades renales',
          'Infecciones de vías urinarias',
          'Enfermedad exantemática (varicela, rubeola, escarlatina)',
          'Infección de transmisión sexual',
          'VIH/SIDA',
          'Paludismo',
          'Dengue',
          'Intoxicación por veneno de alacrán, serpiente o araña',
          'Alcoholismo',
          'Tabaquismo',
          'Padecimientos generados por consumo de drogas',
          'Lesión física por accidente',
          'Lesión física por agresión',
          'Pérdida de la memoria',
          'Estrés',
          'Depresión',
          'Problemas de la piel',
          'Enfermedad bucodental',
          'Dolor de cabeza o cefalea sin otra manifestación',
          'Fiebre sin otra manifestación',
          'Susto, empacho, mal de ojo o aire',
          'Embarazo',
          'Cáncer o tumores',
          'Otro (especifica)',
          'No sabe',
        ],
        questionID: 'motivo-atencion-medica-321',
      },
      {
        title: '¿Cuenta usted con cartilla nacional de vacunación actualizada?',
        options: ['Sí', 'No'],
        questionID: 'cartilla-vacunacion-555',
      },
      {
        title:
          'En los últimos 10 años ¿Le han aplicado la vacuna contra el Tétanos?',
        options: ['Sí', 'No', 'No sabe / No recuerda'],
        questionID: 'vacuna-tetanos-777',
      },
      {
        title:
          'En el último año ¿Le han aplicado la vacuna contra la Influenza?',
        options: ['Sí', 'No', 'No sabe / No recuerda'],
        questionID: 'vacuna-influenza-888',
      },
      {
        title: '¿Le han aplicado la vacuna contra COVID-19?',
        options: ['Sí', 'No'],
        questionID: 'vacuna-covid19-999',
      },
      {
        title:
          'Cuando usted utiliza automóvil, motocicleta o bicicleta ¿Lleva puesto el cinturón de seguridad o casco?',
        options: [
          'Rara vez o nunca',
          'Pocas veces o alguna vez',
          'Un número de veces considerable',
          'Todo el tiempo o la mayoría del tiempo',
        ],
        questionID: 'uso-cinturon-casco-111',
      },
      {
        title:
          'Durante el último mes ¿Cuántas veces realizó usted por lo menos 30 minutos de actividad física moderada?',
        options: [
          'Rara vez o nunca',
          'Pocas veces o alguna vez',
          'Un número de veces considerable',
          'Todo el tiempo o la mayoría del tiempo',
        ],
        questionID: 'actividad-fisica-mes-222',
      },
      {
        title:
          'Durante las dos últimas semanas ¿Ha realizado alguna actividad física en su tiempo libre como hacer deporte, correr, nadar, andar en bicicleta, hacer gimnasia etc?',
        options: ['Sí', 'No'],
        questionID: 'actividad-fisica-tiempo-libre-333',
      },
    ],
    questionCuscoID: 2,
  },
];

export const preguntas = [
  {
    title: 'Características Sociodemográficas',
    questions: [
      {
        title: '¿Cuál es su sexo?',
        options: ['Hombre', 'Mujer'],
        questionID: 'cual-es-su-sexo-123',
      },
      {
        title: '¿Cuál es su estado civil?',
        options: [
          'Soltero(a)',
          'Casado(a)',
          'Viudo(a)',
          'Divorciado(a)',
          'Unión libre',
        ],
        questionID: 'estado-civil-123',
      },
      {
        title: '¿De qué material es la mayor parte del techo de esta vivienda?',
        options: [
          'Material de desecho',
          'Lámina de cartón',
          'Lámina metálica',
          'Lámina de asbesto',
          'Palma o paja',
          'Madera o tejamanil',
          'Terrado con viguería',
          'Teja',
          'Losa de concreto o viguetas con bovedilla',
        ],
        questionID: 'material-techo-456',
      },
    ],
  },
  {
    title: 'Autopercepción de Salud  y Prevención',
    questions: [
      {
        title: '¿Cómo considera usted que es su estado de salud actual?',
        options: ['Excelente', 'Muy bueno', 'Bueno', 'Regular', 'Malo'],
        questionID: 'salud-actual-231',
      },
      {
        title:
          'Cuando usted tiene problemas de salud ¿En dónde se atiende usualmente?',
        options: [
          'IMSS',
          'ISSSTE',
          'INSABI',
          'Consultorio',
          'Clínica u Hospital Privado',
          'Se Automedica',
          'No se atiende',
          'Otro',
        ],
        questionID: 'donde-atiende-salud-456',
      },
      {
        title: '¿Con qué tipo de seguridad social cuenta?',
        options: ['IMSS', 'ISSSTE', 'INSABI', 'Privado', 'Ninguno'],
        questionID: 'seguridad-social-789',
      },
      {
        title:
          '¿Cómo considera usted que es la atención recibida en su centro de atención médica?',
        options: ['Excelente', 'Muy buena', 'Buena', 'Regular', 'Mala'],
        questionID: 'atencion-recibida-123',
      },
      {
        title:
          'En los últimos seis meses ¿usted acudió a revisión médica preventiva?',
        options: ['Sí', 'No'],
        questionID: 'revision-preventiva-987',
      }]
  },
  {title: 'Programacion',
    questions: [
      {
        title: '¿Cuál es su nivel?',
        options: ['Bajo', 'Alto'],
        questionID: 'cual-es-nivel-123',
      }]}
  
];
