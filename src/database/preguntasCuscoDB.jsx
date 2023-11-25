export const preguntasCusco = [
  {
    title: 'Características Sociodemográficas',
    questions: [
        {
            title: '¿Cuál es su edad en años cumplidos hasta el día de hoy?',
            options: [],
            questionType: 'numberInput',
            questionID: 'edad-actual-123',
          },
      {
        title: '¿Cuál es su sexo?',
        options: ['Hombre', 'Mujer'],
        questionType: 'radioButton',
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
        questionType: 'radioButton',
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
        questionType: 'radioButton',
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
        questionType: 'radioButton',
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
        questionType: 'radioButton',
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
        questionType: 'radioButton',
        questionID: 'combustible-cocinar-345',
      },
      {
        title: '¿Hay luz eléctrica en esta vivienda?',
        options: ['Sí', 'No'],
        questionType: 'radioButton',
        questionID: 'luz-electrica-678',
      },
      {
        title: '¿Esta vivienda tiene agua entubada?',
        options: ['Sí', 'No'],
        questionType: 'radioButton',
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
        questionType: 'radioButton',
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
        questionType: 'radioButton',
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
        questionType: 'radioButton',
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
        questionType: 'radioButton',

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
        questionType: 'radioButton',

        questionID: 'donde-atiende-salud-456',
      },
      {
        title: '¿Con qué tipo de seguridad social cuenta?',
        options: ['IMSS', 'ISSSTE', 'INSABI', 'Privado', 'Ninguno'],
        questionType: 'radioButton',

        questionID: 'seguridad-social-789',
      },
      {
        title:
          '¿Cómo considera usted que es la atención recibida en su centro de atención médica?',
        options: ['Excelente', 'Muy buena', 'Buena', 'Regular', 'Mala'],
        questionType: 'radioButton',

        questionID: 'atencion-recibida-123',
      },
      {
        title:
          'En los últimos seis meses ¿usted acudió a revisión médica preventiva?',
        options: ['Sí', 'No'],
        questionType: 'radioButton',

        questionID: 'revision-preventiva-987',
      },
      {
        title:
          'En los últimos seis meses, ¿usted solicitó ser atendido(a) por algún profesional de salud o centro sanitario debido a un problema de salud, enfermedad, control de la misma, lesión o accidente?',
        options: ['Sí', 'No'],
        questionType: 'radioButton',
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
        questionType: 'radioButton',
        questionID: 'motivo-atencion-medica-321',
      },
      {
        title: '¿Cuenta usted con cartilla nacional de vacunación actualizada?',
        options: ['Sí', 'No'],
        questionType: 'radioButton',
        questionID: 'cartilla-vacunacion-555',
      },
      {
        title:
          'En los últimos 10 años ¿Le han aplicado la vacuna contra el Tétanos?',
        options: ['Sí', 'No', 'No sabe / No recuerda'],
        questionType: 'radioButton',
        questionID: 'vacuna-tetanos-777',
      },
      {
        title:
          'En el último año ¿Le han aplicado la vacuna contra la Influenza?',
        options: ['Sí', 'No', 'No sabe / No recuerda'],
        questionType: 'radioButton',
        questionID: 'vacuna-influenza-888',
      },
      {
        title: '¿Le han aplicado la vacuna contra COVID-19?',
        options: ['Sí', 'No'],
        questionType: 'radioButton',
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
        questionType: 'radioButton',
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
        questionType: 'radioButton',
        questionID: 'actividad-fisica-mes-222',
      },
      {
        title:
          'Durante las dos últimas semanas ¿Ha realizado alguna actividad física en su tiempo libre como hacer deporte, correr, nadar, andar en bicicleta, hacer gimnasia etc?',
        options: ['Sí', 'No'],
        questionType: 'radioButton',
        questionID: 'actividad-fisica-tiempo-libre-333',
      },
    ],
    
    questionCuscoID: 2,
  },
  {
    title: 'Salud Física',
    questions:[
            {
                title: 'Aproximadamente ¿Cuánto pesa sin zapatos? Kg',
                options:[0],
                questionType: 'numberInput',
                questionID: 'peso-sin-zapatos-413'
            },{
                title: 'Aproximadamente ¿Cuánto mide sin zapatos? M',
                options:[0],
                questionType: 'numberInput',
                questionID: 'peso-sin-zapatos-043'
            },
            {
              title: '¿Cómo considera usted que es su estado de salud actual?',
              options: ['Excelente', 'Muy bueno', 'Bueno', 'Regular', 'Malo'],
              questionType: 'radioButton',
              questionID: 'salud-actual-231',
            },
            {
              title: '¿Considera que su peso actual es...?',
              options: ['Mayor al saludable', 'Saludable', 'Menor al saludable', 'No sabe'],
              questionType: 'radioButton',
              questionID: 'peso-actual-232',
            },
            {
              title: '¿Su estado de salud actual... ¿le limita para realizar sus actividades cotidianas en el trabajo, hogar o escuela?',
              options: ['Nunca', 'Pocas veces', 'Un número de veces considerable', 'Siempre'],
              questionType: 'radioButton',
              questionID: 'limitaciones-actividades-233',
            },
            {
              title: '¿Durante la última semana... ¿le parecía que todo lo que hacía era un esfuerzo?',
              options: [
                'Rara vez o nunca (menos de un día)',
                'Pocas veces o alguna vez (1-2 días)',
                'Un número de veces considerable (3-4 días)',
                'Todo el tiempo o la mayoría del tiempo (5-7 días)'
              ],
              questionType: 'radioButton',
              questionID: 'esfuerzo-actividades-234',
            },
            {
              title: '¿Usted puede caminar más de seis minutos sin sentir fatiga?',
              options: ['Sí', 'No'],
              questionType: 'radioButton',
              questionID: 'caminar-fatiga-235',
            },
            {
              title: '¿Cuándo fue la última vez que usted se midió el azúcar en sangre?',
              options: ['Nunca', 'Hace 6 meses o menos', 'Hace 1 año o menos', 'Hace más de un año'],
              questionType: 'radioButton',
              questionID: 'azucar-sangre-236',
            },
            {
              title: '¿Algún médico le ha dicho que tiene diabetes (o alta el azúcar en la sangre)?',
              options: ['Sí', 'Sí, durante el embarazo (Diabetes gestacional)', 'No'],
              questionType: 'radioButton',
              questionID: 'diabetes-diagnostico-237',
            },
            {
              title: '¿Cuándo fue la última vez que usted se midió la tensión arterial?',
              options: ['Nunca', 'Hace 6 meses o menos', 'Hace 1 año o menos', 'Hace más de un año'],
              questionType: 'radioButton',
              questionID: 'tension-arterial-238',
            },
            {
              title: '¿Algún médico le ha dicho que tiene la presión alta?',
              options: ['Sí', 'No'],
              questionType: 'radioButton',
              questionID: 'presion-alta-diagnostico-239',
            },
            {
              title: '¿Ha tenido alguna vez un dolor fuerte en el pecho, sudoración, con falta de aire o gran malestar que durara media hora o más?',
              options: ['Sí', 'No'],
              questionType: 'radioButton',
              questionID: 'dolor-pecho-240',
            },
            {
              title: '¿Alguna vez un médico le ha dicho que padece de alguna enfermedad del riñón, como… infección de vías urinarias en más de una ocasión?',
              options: ['Sí', 'No'],
              questionType: 'radioButton',
              questionID: 'enfermedad-rinon-241',
            },
            {
              title: '¿Cuándo fue la última vez que usted se realizó un análisis para medir colesterol?',
              options: ['Nunca', 'Hace 6 meses o menos', 'Hace 1 año o menos', 'Hace más de un año'],
              questionType: 'radioButton',
              questionID: 'colesterol-analisis-242',
            },
            {
              title: '¿Algún médico le ha dicho que tiene el colesterol alto?',
              options: ['Sí', 'No'],
              questionType: 'radioButton',
              questionID: 'colesterol-alto-diagnostico-243',
            },
            {
              title: '¿Cuándo fue la última vez que usted se realizó un análisis para medir triglicéridos?',
              options: ['Nunca', 'Hace 6 meses o menos', 'Hace 1 año o menos', 'Hace más de un año'],
              questionType: 'radioButton',
              questionID: 'trigliceridos-analisis-244',
            },
            {
              title: '¿Algún médico le ha dicho que tiene los triglicéridos altos?',
              options: ['Sí', 'No'],
              questionType: 'radioButton',
              questionID: 'trigliceridos-altos-diagnostico-245',
            },
            {
              title: 'En los últimos 12 meses, ¿sufrió usted algún daño a su salud a causa de un accidente?',
              options: ['Sí', 'No'],
              questionType: 'radioButton',
              questionID: 'daño-salud-accidente-246',
            },
            {
              title: '¿Usa anteojos o lentes de contacto? Incluya el uso de anteojos para leer.',
              options: ['Sí', 'No'],
              questionType: 'radioButton',
              questionID: 'uso-anteojos-247',
            },
            {
              title: '¿Usa una prótesis auditiva?',
              options: ['Sí', 'No'],
              questionType: 'radioButton',
              questionID: 'protesis-auditiva-248',
            },
            {
              title: '¿Tuvo dolor en alguna parte del cuerpo durante las 4 últimas semanas?',
              options: ['Nada', 'Un poco', 'Regular', 'Bastante', 'Mucho'],
              questionType: 'radioButton',
              questionID: 'dolor-corporal-249',
            },
            
          
    ],
    questionCuscoID: 3
  },{
    title: 'Salud Mental',
    questions:[
        {
            title: '¿Cómo considera usted que es su estado de salud actual?',
            options: ['Excelente', 'Muy bueno', 'Bueno', 'Regular', 'Malo'],
            questionType: 'radioButton',
            questionID: 'salud-actual-231',
          },
          {
            title: '¿Alguna vez ha pensado en suicidarse?',
            options: ['Sí', 'No', 'No responde'],
            questionType: 'radioButton',
            questionID: 'pensamientos-suicidas-232',
          },
          {
            title: 'Durante la última semana... ¿Cuántas veces se ha sentido nervioso (a)?',
            options: [
              'Rara vez o nunca (menos de un día)',
              'Pocas veces o alguna vez (1-2 días)',
              'Un número de veces considerable (3-4 días)',
              'Todo el tiempo o la mayoría del tiempo (5-7 días)'
            ],
            questionType: 'radioButton',
            questionID: 'sentimiento-nerviosismo-233',
          },
          {
            title: 'Durante la última semana... ¿le costaba concentrarse en lo que estaba haciendo?',
            options: [
              'Rara vez o nunca (menos de un día)',
              'Pocas veces o alguna vez (1-2 días)',
              'Un número de veces considerable (3-4 días)',
              'Todo el tiempo o la mayoría del tiempo (5-7 días)'
            ],
            questionType: 'radioButton',
            questionID: 'dificultad-concentracion-234',
          },
          {
            title: 'Durante la última semana...¿se sintió triste o deprimido(a)?',
            options: [
              'Rara vez o nunca (menos de un día)',
              'Pocas veces o alguna vez (1-2 días)',
              'Un número de veces considerable (3-4 días)',
              'Todo el tiempo o la mayoría del tiempo (5-7 días)'
            ],
            questionType: 'radioButton',
            questionID: 'sentimiento-tristeza-depresion-235',
          },
          {
            title: 'Durante la última semana...¿no durmió bien?',
            options: [
              'Rara vez o nunca (menos de un día)',
              'Pocas veces o alguna vez (1-2 días)',
              'Un número de veces considerable (3-4 días)',
              'Todo el tiempo o la mayoría del tiempo (5-7 días)'
            ],
            questionType: 'radioButton',
            questionID: 'problemas-sueño-236',
          },
          {
            title: 'Regularmente, ¿Cuántas horas duerme diariamente?',
            options: ['0'],
            questionType: 'numberInput',
            questionID: 'horas-sueno-diarias-237',
          },
          {
            title: 'Durante la última semana... ¿disfrutó de la vida?',
            options: [
              'Rara vez o nunca (menos de un día)',
              'Pocas veces o alguna vez (1-2 días)',
              'Un número de veces considerable (3-4 días)',
              'Todo el tiempo o la mayoría del tiempo (5-7 días)'
            ],
            questionType: 'radioButton',
            questionID: 'disfrute-de-la-vida-238',
          },
    ],
     questionCuscoID: 4
  },
  {
    title: 'Salud Social',
    questions:[
        {
            title: '¿Cómo considera usted que es su estado de salud actual?',
            options: ['Excelente', 'Muy bueno', 'Bueno', 'Regular', 'Malo'],
            questionType: 'radioButton',
            questionID: 'salud-actual-231',
          },
          {
            title: 'En los últimos 12 meses, ¿sufrió usted algún daño a su salud por robo, agresión o violencia?',
            options: ['Sí', 'No', 'No responde'],
            questionType: 'radioButton',
            questionID: 'danio-salud-agresion-232',
          },
          {
            title: '¿Ha fumado usted por lo menos 100 cigarrillos (5 cajetillas) de tabaco durante toda su vida?',
            options: ['Sí', 'No', 'No sabe / No responde'],
            questionType: 'radioButton',
            questionID: 'fumador-vida-233',
          },
          {
            title: 'Actualmente ¿Fuma tabaco...',
            options: ['todos los días', 'algunos días', 'no fuma actualmente', 'No responde'],
            questionType: 'radioButton',
            questionID: 'fumador-actual-234',
          },
          {
            title: 'En promedio, ¿cuántos cigarros fuma actualmente por día?',
            options: ['0'],
            questionType: 'numberInput',
            questionID: 'promedio-cigarros-dia-235',
          },
          {
            title: '¿Actualmente toma bebidas alcohólicas?',
            options: ['Sí', 'No', 'Nunca ha tomado'],
            questionType: 'radioButton',
            questionID: 'toma-alcohol-236',
          },
          {
            title: 'Aproximadamente, ¿con qué frecuencia toma bebidas alcohólicas?',
            options: ['Diario', 'Semanal', 'Mensual', 'Ocasional', 'No responde'],
            questionType: 'radioButton',
            questionID: 'frecuencia-alcohol-237',
          },
          {
            title: 'En promedio, ¿cuántas copas toma por ocasión?',
            options: ['0'],
            questionType: 'numberInput',
            questionID: 'promedio-copas-ocasion-238',
          },
          {
            title: 'En promedio, ¿cuántas horas trabaja diariamente?',
            options: ['0'],
            questionType: 'numberInput',
            questionID: 'horas-trabajo-diarias-239',
          },
          {
            title: 'Durante las 4 últimas semanas, ¿hasta qué punto su salud física o los problemas emocionales han dificultado sus actividades sociales habituales con la familia, los amigos, los vecinos u otras personas?',
            options: ['Nada', 'Un poco', 'Regular', 'Bastante', 'Mucho'],
            questionType: 'radioButton',
            questionID: 'dificultad-actividades-sociales-240',
          },
          {
            title: '¿Cómo piensa que es su vida social?',
            options: ['Muy satisfactoria', 'Medianamente satisfactoria', 'Poco satisfactoria', 'Nada satisfactoria'],
            questionType: 'radioButton',
            questionID: 'vida-social-241',
          },
          {
            title: 'Durante las 4 últimas semanas, ¿Ha recibido invitaciones para distraerse y salir con otras personas?',
            options: ['Nunca', 'Pocas veces', 'Regularmente', 'Bastantes veces', 'Muchas veces'],
            questionType: 'radioButton',
            questionID: 'invitaciones-salir-242',
          },
          {
            title: 'Durante las 4 últimas semanas, ¿Ha recibido amor o afecto?',
            options: ['Nunca', 'Pocas veces', 'Regularmente', 'Bastantes veces', 'Muchas veces'],
            questionType: 'radioButton',
            questionID: 'recibido-amor-afecto-243',
          },
          {
            title: 'Durante las 4 últimas semanas, ¿Ha tenido la posibilidad de hablar con alguien de sus problemas personales, familiares o de trabajo?',
            options: ['Nunca', 'Pocas veces', 'Regularmente', 'Bastantes veces', 'Muchas veces'],
            questionType: 'radioButton',
            questionID: 'hablar-problemas-personales-244',
          },
          {
            title: 'Durante las 4 últimas semanas, ¿Ha contado con personas que se preocuparan por lo que a usted le sucede?',
            options: ['Nunca', 'Pocas veces', 'Regularmente', 'Bastantes veces', 'Muchas veces'],
            questionType: 'radioButton',
            questionID: 'personas-preocupadas-245',
          },
          {
            title: '¿Ha recibido usted consejos útiles cuando le ocurre algún acontecimiento importante en su vida?',
            options: ['Nunca', 'Pocas veces', 'Regularmente', 'Bastantes veces', 'Muchas veces'],
            questionType: 'radioButton',
            questionID: 'consejos-utiles-246',
          },
          {
            title: '¿Ha recibido usted ayuda cuando está en la cama por enfermedad?',
            options: ['Nunca', 'Pocas veces', 'Regularmente', 'Bastantes veces', 'Muchas veces'],
            questionType: 'radioButton',
            questionID: 'ayuda-enfermedad-cama-247',
          },
    ],
    questionCuscoID: 5
  }
];


export const prueba = [
    {
      title: 'Características Sociodemográficas',
      questions: [
          {
              title: '¿Cuál es su edad en años cumplidos hasta el día de hoy?',
              options: [],
              questionType: 'numberInput',
              questionID: 'edad-actual-123',
            },
        {
          title: '¿Cuál es su sexo?',
          options: ['Hombre', 'Mujer'],
          questionType: 'radioButton',
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
          questionType: 'radioButton',
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
          questionType: 'radioButton',
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
          questionType: 'radioButton',
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
          questionType: 'radioButton',
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
          questionType: 'radioButton',
          questionID: 'combustible-cocinar-345',
        },
        {
          title: '¿Hay luz eléctrica en esta vivienda?',
          options: ['Sí', 'No'],
          questionType: 'radioButton',
          questionID: 'luz-electrica-678',
        },
        {
          title: '¿Esta vivienda tiene agua entubada?',
          options: ['Sí', 'No'],
          questionType: 'radioButton',
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
          questionType: 'radioButton',
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
          questionType: 'radioButton',
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
          questionType: 'radioButton',
          questionID: 'grado-aprobado-890',
        },
      ],
      questionCuscoID: 1,
    },
    
  ];



