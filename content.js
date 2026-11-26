/* Seguridad Alimentaria al Día — contenido bilingüe (ES/EN)
   Cifras verificadas en noviembre de 2026. Fuentes al final de la app. */
window.CONTENT = {

  stats: [
    { n: '21,1 %', es: ['de los hogares de Colombia vivió inseguridad alimentaria moderada o grave en 2025', 'DANE · Escala FIES, mayo 2026'], en: ['of Colombian households faced moderate or severe food insecurity in 2025', 'DANE · FIES scale, May 2026'] },
    { n: '12,07 M', es: ['de personas afectadas en el país (22,8 % de la población)', 'DANE · ECV 2025'], en: ['people affected nationwide (22.8% of the population)', 'DANE · ECV 2025'] },
    { n: '3,4 %', es: ['de los hogares pasó hambre grave (5,0 % en 2024): 779 mil personas menos', 'DANE · FIES 2025'], en: ['of households suffered severe hunger (5.0% in 2024): 779,000 fewer people', 'DANE · FIES 2025'] },
    { n: '31,4 %', es: ['en el campo vs. 18,1 % en las cabeceras: el hambre pega más en lo rural', 'DANE · población 2025'], en: ['in rural areas vs. 18.1% in towns: hunger hits the countryside harder', 'DANE · population 2025'] },
    { n: '9,76 M t', es: ['de alimentos se pierden o desperdician al año: un 34 % de lo disponible', 'Estimación citada por Forbes Colombia, oct 2026'], en: ['tonnes of food lost or wasted each year: about 34% of supply', 'Estimate cited by Forbes Colombia, Oct 2026'] },
    { n: '6,6 M', es: ['de personas necesitan asistencia alimentaria y nutricional en 2026', 'OCHA · FAO-SMIA'], en: ['people need food and nutrition assistance in 2026', 'OCHA · FAO-GIEWS'] }
  ],

  // Prevalencia de inseguridad alimentaria moderada o grave en hogares (%), DANE-FIES
  deptos: [
    { d: 'Chocó', v: { 2023: 18.9, 2024: 36.3, 2025: 56.8 } },
    { d: 'Sucre', v: { 2024: 49.5, 2025: 50.1 } },
    { d: 'La Guajira', v: { 2024: 52.4, 2025: 47.8 } },
    { d: 'Córdoba', v: { 2023: 30.6, 2024: 47.6, 2025: 40.2 } },
    { d: 'Antioquia', v: { 2023: 21.6, 2024: 27.9, 2025: 20.1 } },
    { d: 'Colombia', v: { 2022: 28.1, 2024: 25.5, 2025: 21.1 }, total: true },
    { d: 'Bogotá D.C.', v: { 2025: 9.6 } },
    { d: 'Caldas', v: { 2025: 9.2 } },
    { d: 'San Andrés', v: { 2025: 5.2 } }
  ],
  deptosNota: {
    es: 'Distrileco y el Bajo Cauca viven en medio de dos de los departamentos con más hambre: Córdoba (40,2 %) y Sucre (50,1 %). Antioquia bajó a 20,1 % en 2025, pero el DANE no publica cada año la cifra municipal de Caucasia: por eso la app te deja medir la de tu propio hogar.',
    en: 'The Bajo Cauca region sits between two of the hungriest departments: Córdoba (40.2%) and Sucre (50.1%). Antioquia dropped to 20.1% in 2025, but DANE does not publish a yearly figure for Caucasia: that is why this app lets you measure your own household.'
  },

  // Los 5 ejes de la política colombiana (CONPES 113 de 2008)
  ejes: [
    { t: { es: 'Disponibilidad', en: 'Availability' }, p: { es: 'Que haya comida suficiente: lo que se produce, se importa y llega a la plaza. Depende del campo, las vías, el clima y la paz en el territorio.', en: 'Enough food: what is produced, imported and reaches the market. It depends on farms, roads, weather and peace in the territory.' } },
    { t: { es: 'Acceso', en: 'Access' }, p: { es: 'Que el hogar pueda conseguirla: ingresos, precios, empleo, subsidios. En Colombia el hambre está más ligada a la pobreza que a la falta de producción.', en: 'Households being able to get it: income, prices, jobs, subsidies. In Colombia hunger is tied more to poverty than to lack of production.' } },
    { t: { es: 'Consumo', en: 'Consumption' }, p: { es: 'Qué y cómo comemos: hábitos, cultura, educación nutricional. Comer lleno no siempre es comer bien.', en: 'What and how we eat: habits, culture, nutrition education. Feeling full is not always eating well.' } },
    { t: { es: 'Aprovechamiento biológico', en: 'Biological utilization' }, p: { es: 'Que el cuerpo aproveche lo que come: agua potable, saneamiento, salud, desparasitación. Sin agua limpia no hay nutrición.', en: 'The body making use of food: clean water, sanitation, health care. Without safe water there is no nutrition.' } },
    { t: { es: 'Calidad e inocuidad', en: 'Quality and safety' }, p: { es: 'Que la comida no enferme: buena manipulación, cadena de frío, sin químicos ni mercurio en el agua y el pescado.', en: 'Food that does not make you sick: proper handling, cold chain, no chemicals or mercury in water and fish.' } }
  ],

  // Escala FIES (FAO): 8 preguntas, últimos 12 meses
  fies: [
    { es: '¿Le preocupó no tener suficientes alimentos para comer por falta de dinero u otros recursos?', en: 'Were you worried you would not have enough food to eat because of a lack of money or other resources?' },
    { es: '¿No pudo comer alimentos saludables y nutritivos por falta de dinero u otros recursos?', en: 'Were you unable to eat healthy and nutritious food because of a lack of money or other resources?' },
    { es: '¿Comió poca variedad de alimentos por falta de dinero u otros recursos?', en: 'Did you eat only a few kinds of foods because of a lack of money or other resources?' },
    { es: '¿Tuvo que saltarse una comida (desayuno, almuerzo o cena) por falta de dinero u otros recursos?', en: 'Did you have to skip a meal because there was not enough money or other resources?' },
    { es: '¿Comió menos de lo que pensaba que debía comer por falta de dinero u otros recursos?', en: 'Did you eat less than you thought you should because of a lack of money or other resources?' },
    { es: '¿Su hogar se quedó sin alimentos por falta de dinero u otros recursos?', en: 'Did your household run out of food because of a lack of money or other resources?' },
    { es: '¿Sintió hambre pero no comió porque no había suficiente dinero u otros recursos?', en: 'Were you hungry but did not eat because there was not enough money or other resources?' },
    { es: '¿Dejó de comer todo un día por falta de dinero u otros recursos?', en: 'Did you go without eating for a whole day because of a lack of money or other resources?' }
  ],

  // Plato que rinde: semana con alimentos de la región
  menu: [
    { d: { es: 'Lunes', en: 'Monday' }, a: { es: 'Arroz, fríjol, tajadas de plátano maduro y ensalada de tomate y cebolla', en: 'Rice, beans, fried ripe plantain and tomato-onion salad' } },
    { d: { es: 'Martes', en: 'Tuesday' }, a: { es: 'Sopa de lentejas con ahuyama y yuca, arroz y aguacate', en: 'Lentil soup with squash and cassava, rice and avocado' } },
    { d: { es: 'Miércoles', en: 'Wednesday' }, a: { es: 'Bocachico o mojarra sudada, arroz con coco y patacón', en: 'Stewed bocachico or tilapia, coconut rice and patacón' } },
    { d: { es: 'Jueves', en: 'Thursday' }, a: { es: 'Huevos pericos, arepa de maíz, queso costeño y jugo de guayaba', en: 'Scrambled eggs with tomato, corn arepa, coastal cheese and guava juice' } },
    { d: { es: 'Viernes', en: 'Friday' }, a: { es: 'Mote de queso con ñame, arroz y ensalada de repollo y zanahoria', en: 'Cheese and yam mote, rice and cabbage-carrot salad' } },
    { d: { es: 'Sábado', en: 'Saturday' }, a: { es: 'Arroz atollado de pollo con verduras (rinde para toda la familia)', en: 'Creamy chicken rice with vegetables (feeds the whole family)' } },
    { d: { es: 'Domingo', en: 'Sunday' }, a: { es: 'Sancocho trifásico o de gallina con yuca, plátano, mazorca y cilantro de la huerta', en: 'Sancocho with cassava, plantain, corn and cilantro from the garden' } }
  ],
  tips: [
    { t: { es: 'Compra de cosecha', en: 'Buy in season' }, p: { es: 'Lo que está en cosecha es más barato y más fresco. Pregunta en la plaza qué llegó esa semana.', en: 'Seasonal produce is cheaper and fresher. Ask at the market what arrived this week.' } },
    { t: { es: 'Legumbres secas', en: 'Dried legumes' }, p: { es: 'Fríjol, lenteja y garbanzo dan proteína por mucho menos que la carne. Arroz + fríjol = proteína completa.', en: 'Beans, lentils and chickpeas give protein for much less than meat. Rice + beans = complete protein.' } },
    { t: { es: 'Nada a la basura', en: 'Waste nothing' }, p: { es: 'Cáscaras al compost, maduros en coladas, arroz del día anterior en arroz frito o arepas.', en: 'Peels to compost, overripe fruit in drinks, leftover rice into fried rice or arepas.' } },
    { t: { es: 'Agua segura', en: 'Safe water' }, p: { es: 'Hierve o filtra el agua para tomar y lavar verduras. Sin agua limpia el cuerpo no aprovecha la comida.', en: 'Boil or filter drinking water and water for washing vegetables.' } },
    { t: { es: 'Mercado en grupo', en: 'Group buying' }, p: { es: 'Entre vecinos, compren por bulto o arroba directo al productor y repartan: el ahorro es real.', en: 'Neighbors can buy in bulk straight from farmers and split it.' } },
    { t: { es: 'Primero los niños', en: 'Children first' }, p: { es: 'Los primeros 1.000 días (embarazo hasta los 2 años) marcan la vida. Lactancia, controles y comida variada.', en: 'The first 1,000 days (pregnancy to age 2) shape a whole life.' } }
  ],

  // Huerta casera para clima cálido (Bajo Cauca, ~28 °C). Tiempos aproximados.
  huerta: [
    { c: { es: 'Cilantro cimarrón', en: 'Culantro' }, t: { es: '2 a 3 meses', en: '2–3 months' }, n: { es: 'Aguanta el calor mejor que el cilantro común. Media sombra.', en: 'Handles heat better than regular cilantro. Partial shade.' } },
    { c: { es: 'Ají dulce', en: 'Sweet pepper' }, t: { es: '3 meses', en: '3 months' }, n: { es: 'Produce todo el año en matera grande.', en: 'Produces all year in a large pot.' } },
    { c: { es: 'Tomate', en: 'Tomato' }, t: { es: '2,5 a 3 meses', en: '2.5–3 months' }, n: { es: 'Tutor de caña o palo. Riego al pie, no a las hojas.', en: 'Stake it. Water at the base, not the leaves.' } },
    { c: { es: 'Habichuela', en: 'Green beans' }, t: { es: '2 meses', en: '2 months' }, n: { es: 'Enriquece el suelo con nitrógeno. Rápida y rendidora.', en: 'Adds nitrogen to the soil. Fast and productive.' } },
    { c: { es: 'Pepino', en: 'Cucumber' }, t: { es: '1,5 a 2 meses', en: '1.5–2 months' }, n: { es: 'Enredadera: aprovecha cercas y mallas.', en: 'A climber: use fences and mesh.' } },
    { c: { es: 'Ahuyama', en: 'Squash' }, t: { es: '3 a 4 meses', en: '3–4 months' }, n: { es: 'Ocupa espacio; ideal en el patio o el lote.', en: 'Needs space; ideal for a yard.' } },
    { c: { es: 'Batata', en: 'Sweet potato' }, t: { es: '4 meses', en: '4 months' }, n: { es: 'Las hojas también se comen. Muy resistente.', en: 'Leaves are edible too. Very hardy.' } },
    { c: { es: 'Yuca', en: 'Cassava' }, t: { es: '8 a 12 meses', en: '8–12 months' }, n: { es: 'Se siembra por estaca. Base de la comida costeña.', en: 'Planted from cuttings. A staple of coastal food.' } },
    { c: { es: 'Plátano', en: 'Plantain' }, t: { es: '10 a 12 meses', en: '10–12 months' }, n: { es: 'Un colino bien abonado da racimo y nuevos hijos.', en: 'One well-fed sucker gives a bunch and new shoots.' } },
    { c: { es: 'Maracuyá', en: 'Passion fruit' }, t: { es: '8 a 9 meses', en: '8–9 months' }, n: { es: 'En emparrado, da sombra y fruta para jugos.', en: 'On a trellis it gives shade and fruit for juice.' } }
  ],
  huertaPasos: [
    { t: { es: 'Escoge el sitio', en: 'Pick the spot' }, p: { es: 'Mínimo 5 a 6 horas de sol y cerca de una llave de agua. En zona inundable, usa eras elevadas o materas.', en: 'At least 5–6 hours of sun near a water tap. In flood-prone areas use raised beds or pots.' } },
    { t: { es: 'Prepara la tierra', en: 'Prepare the soil' }, p: { es: 'Mezcla tierra negra con compost o estiércol curado. Llantas, baldes y botellas recicladas sirven de materas.', en: 'Mix topsoil with compost or aged manure. Recycled tires, buckets and bottles make good pots.' } },
    { t: { es: 'Siembra según la lluvia', en: 'Plant with the rains' }, p: { es: 'En el Bajo Cauca las lluvias van más o menos de abril a noviembre, con un veranillo a mitad de año. Siembra al empezar las lluvias.', en: 'In Bajo Cauca rains run roughly April to November with a short dry spell mid-year. Plant as rains begin.' } },
    { t: { es: 'Riega temprano o al final de la tarde', en: 'Water early or late' }, p: { es: 'Con el calor del mediodía el agua se evapora. Cubre el suelo con hojas secas (mulch) para guardar humedad.', en: 'Midday heat evaporates water. Cover soil with dry leaves (mulch) to keep moisture.' } },
    { t: { es: 'Controla plagas sin veneno', en: 'Pest control without poison' }, p: { es: 'Ajo, ají y jabón de barra diluidos en agua; siembra albahaca y caléndula entre las hortalizas.', en: 'Garlic, chili and bar soap diluted in water; plant basil and marigold among vegetables.' } },
    { t: { es: 'Comparte la cosecha', en: 'Share the harvest' }, p: { es: 'Intercambia semillas y excedentes con los vecinos: así nace una huerta comunitaria.', en: 'Swap seeds and surplus with neighbors: that is how a community garden starts.' } }
  ],

  campo: [
    { t: { es: 'La paradoja colombiana', en: 'The Colombian paradox' }, p: { es: 'Un país con enorme potencial agrícola que todavía convive con el hambre. El problema principal es el acceso: ingresos, precios y vías, más que la falta de comida.', en: 'A country with huge farming potential that still lives with hunger. The main problem is access: income, prices and roads, more than lack of food.' } },
    { t: { es: 'Se pierde antes de llegar', en: 'Lost before it arrives' }, p: { es: 'Cerca del 64 % de las pérdidas ocurre antes de la distribución: en la finca, la cosecha, el transporte y el almacenamiento. Centros de acopio y cadena de frío salvan comida.', en: 'About 64% of losses happen before distribution: on the farm, at harvest, in transport and storage. Collection centers and cold chains save food.' } },
    { t: { es: 'Compras públicas locales', en: 'Local public procurement' }, p: { es: 'La Ley 2046 de 2020 obliga a que los programas públicos de alimentos (como el PAE) compren mínimo el 30 % a pequeños productores y a la agricultura campesina, familiar y comunitaria.', en: 'Law 2046 of 2020 requires public food programs (like school meals) to buy at least 30% from small and family farmers.' } },
    { t: { es: 'Mercados campesinos', en: 'Farmers markets' }, p: { es: 'Venta directa del productor al hogar: el campesino gana más y la familia paga menos. Una plaza viva es seguridad alimentaria para el municipio.', en: 'Direct sale from farmer to household: farmers earn more and families pay less.' } },
    { t: { es: 'Las APPA: qué pasó', en: 'Food production areas (APPA)' }, p: { es: 'Las Áreas de Protección para la Producción de Alimentos nacieron en el Plan de Desarrollo 2022-2026. En noviembre de 2026 la Corte Constitucional las mantuvo (sentencia C-364 de 2026) pero exigió concertarlas con los municipios; el actual Gobierno derogó las que existían.', en: 'Food production protection areas were created in the 2022–2026 Development Plan. In November 2026 the Constitutional Court upheld them (ruling C-364/2026) but required agreement with municipalities; the current government repealed the existing ones.' } },
    { t: { es: 'El Bajo Cauca, despensa posible', en: 'Bajo Cauca, a potential pantry' }, p: { es: 'Arroz, yuca, plátano, maíz, cacao, ganado y la pesca de ríos y ciénagas. La minería ilegal y el mercurio amenazan suelos, agua y pescado: cuidar el río es cuidar la comida.', en: 'Rice, cassava, plantain, corn, cocoa, cattle and river fishing. Illegal mining and mercury threaten soil, water and fish: protecting the river protects food.' } }
  ],

  programas: [
    { t: { es: 'PAE · Alimentos para Aprender', en: 'School Meals (PAE)' }, p: { es: 'Desayuno o almuerzo en los colegios oficiales, a cargo de la Unidad de Alimentación Escolar y las entidades territoriales. Pregunta en el colegio cómo va tu hijo inscrito y denuncia si la ración llega incompleta.', en: 'Breakfast or lunch in public schools, run by the School Food Unit and local governments. Ask at school and report incomplete rations.' }, l: 'https://www.alimentosparaaprender.gov.co/' },
    { t: { es: 'ICBF · primera infancia y nutrición', en: 'ICBF · early childhood' }, p: { es: 'Atención a niños, gestantes y lactantes: hogares comunitarios, CDI, programa 1.000 días y Bienestarina. Línea 141 gratuita las 24 horas.', en: 'Care for children, pregnant and nursing mothers: community homes, child centers and Bienestarina. Free line 141, 24 hours.' }, l: 'https://www.icbf.gov.co/' },
    { t: { es: 'Prosperidad Social', en: 'Prosperidad Social' }, p: { es: 'Entregas de alimentos y transferencias para hogares pobres y vulnerables (en 2026 operaron estrategias como Hambre Cero y Alimentos para la Vida). Con el cambio de gobierno los nombres pueden cambiar: confirma en la entidad.', en: 'Food deliveries and cash transfers for poor households (2026 strategies included Zero Hunger and Food for Life). Names may change with the new government.' }, l: 'https://prosperidadsocial.gov.co/' },
    { t: { es: 'Gerencia MANÁ · Antioquia', en: 'MANÁ · Antioquia' }, p: { es: 'Programa de la Gobernación de Antioquia para seguridad alimentaria y nutricional; ha visitado Caucasia para revisar los programas del Bajo Cauca.', en: 'Antioquia Governor’s Office food and nutrition program; it has visited Caucasia to review Bajo Cauca programs.' }, l: 'https://www.antioquia.gov.co/' },
    { t: { es: 'Ley 2536 de 2025 contra el hambre', en: 'Law 2536 of 2025 against hunger' }, p: { es: 'Crea el Fondo Nacional para la Lucha contra el Hambre, la Inseguridad Alimentaria y el Desperdicio de Alimentos, y medidas para donar comida en vez de botarla.', en: 'Creates a National Fund against Hunger, Food Insecurity and Food Waste, plus measures to donate food instead of throwing it away.' }, l: 'https://www.alcaldiabogota.gov.co/sisjur/normas/Norma1.jsp?i=190093' },
    { t: { es: 'Bancos de alimentos', en: 'Food banks' }, p: { es: 'Recogen excedentes de empresas, supermercados y plazas y los llevan a fundaciones y comedores. Si tu negocio bota comida buena, dónala.', en: 'They collect surplus from companies and markets and deliver it to charities. If your business throws away good food, donate it.' }, l: 'https://www.abaco.org.co/' },
    { t: { es: 'PMA (ONU) en Colombia', en: 'WFP in Colombia' }, p: { es: 'El Programa Mundial de Alimentos aprobó un plan 2025-2028 de más de 592 millones de dólares para atender emergencias y fortalecer la seguridad alimentaria en municipios del país.', en: 'The World Food Programme approved a 2025–2028 plan of more than US$592 million for emergencies and food security in Colombian municipalities.' }, l: 'https://www.wfp.org/countries/colombia' }
  ],

  // Entidades a las que va el derecho de petición (correos públicos verificados)
  entidades: [
    { n: 'Alcaldía de Caucasia', e: 'contactenos@caucasia-antioquia.gov.co', w: 'https://www.caucasia-antioquia.gov.co/' },
    { n: 'Gobernación de Antioquia (Gerencia MANÁ)', e: 'gestiondocumental@antioquia.gov.co', w: 'https://www.antioquia.gov.co/' },
    { n: 'Prosperidad Social', e: 'servicioalciudadano@prosperidadsocial.gov.co', w: 'https://prosperidadsocial.gov.co/' },
    { n: 'ICBF', e: 'atencionalciudadano@icbf.gov.co', w: 'https://www.icbf.gov.co/' }
  ],
  preguntas: {
    es: [
      '¿Cuál es el plan de seguridad alimentaria y nutricional vigente para el municipio de Caucasia y el Bajo Cauca, y qué metas tiene para 2026 y 2027?',
      '¿Cuánto presupuesto se asignó y cuánto se ha ejecutado en 2026 en programas de alimentación (PAE, complemento alimentario, primera infancia, entregas de alimentos) en Caucasia?',
      '¿Cuántas personas, niños y hogares de Caucasia son beneficiarios de cada programa y con qué criterios fueron seleccionados?',
      '¿Qué porcentaje de las compras públicas de alimentos se hizo a pequeños productores locales, como exige la Ley 2046 de 2020?',
      '¿Qué operadores o contratistas ejecutan estos programas, con qué número de contrato en el SECOP y qué informes de supervisión existen?',
      '¿Qué medidas concretas tomarán ante los niveles de inseguridad alimentaria de la región, vecina de Córdoba (40,2 %) y Sucre (50,1 %) según el DANE?'
    ],
    en: [
      'What food and nutrition security plan is in force for Caucasia and Bajo Cauca, and what are its goals for 2026 and 2027?',
      'How much budget was allocated and executed in 2026 for food programs (school meals, food supplements, early childhood, food deliveries) in Caucasia?',
      'How many people, children and households in Caucasia benefit from each program, and how were they selected?',
      'What percentage of public food purchases came from small local producers, as Law 2046 of 2020 requires?',
      'Which operators or contractors run these programs, under which SECOP contract numbers, and what supervision reports exist?',
      'What concrete measures will be taken given food insecurity levels in the region, next to Córdoba (40.2%) and Sucre (50.1%) according to DANE?'
    ]
  },
  veeduria: [
    { es: 'La ración del PAE llega completa, a tiempo y en buen estado', en: 'School meal rations arrive complete, on time and in good condition' },
    { es: 'El menú publicado en el colegio coincide con lo que sirven', en: 'The posted menu matches what is served' },
    { es: 'Los alimentos se guardan limpios, tapados y con frío cuando toca', en: 'Food is stored clean, covered and refrigerated when needed' },
    { es: 'El operador compra a productores de la región', en: 'The operator buys from local producers' },
    { es: 'La lista de beneficiarios es pública y no hay "fantasmas"', en: 'The beneficiary list is public with no "ghost" beneficiaries' },
    { es: 'Hay un punto de atención para quejas en el municipio', en: 'There is a local office for complaints' }
  ],

  mundo: [
    { t: { es: '645 millones con hambre', en: '645 million hungry' }, p: { es: 'El 7,8 % de la humanidad pasó hambre en 2025, según el informe SOFI 2026 de la FAO y otras agencias de la ONU. Es el tercer año seguido de reducción.', en: '7.8% of humanity was hungry in 2025, per the SOFI 2026 report by FAO and other UN agencies. It is the third straight year of decline.' } },
    { t: { es: 'América Latina avanza', en: 'Latin America improves' }, p: { es: 'La región bajó al 4,8 % de su población con hambre (unos 32 millones de personas), con progresos sostenidos desde la pandemia.', en: 'The region fell to 4.8% of its population hungry (about 32 million), improving steadily since the pandemic.' } },
    { t: { es: 'Comer sano sigue siendo caro', en: 'Healthy food is still expensive' }, p: { es: 'Cerca de una de cada tres personas en el mundo no puede pagar una dieta saludable: ese fue el tema central del SOFI 2026.', en: 'Nearly one in three people worldwide cannot afford a healthy diet: the focus of SOFI 2026.' } },
    { t: { es: 'Riesgos que vienen', en: 'Risks ahead' }, p: { es: 'La FAO advierte que el conflicto en Oriente Medio (por energía y fertilizantes) y un posible El Niño fuerte en 2026-2027 pueden frenar el avance.', en: 'FAO warns that Middle East conflict (energy and fertilizer prices) and a possible strong El Niño in 2026–2027 could slow progress.' } }
  ],

  sources: [
    ['DANE · Inseguridad alimentaria escala FIES 2025 (21 may 2026)', 'https://www.dane.gov.co/index.php/estadisticas-por-tema/salud/escala-de-experiencia-de-inseguridad-alimentaria-fies'],
    ['DANE · Comunicado FIES 2025', 'https://www.dane.gov.co/files/operaciones/FIES/cp-FIES-2025.pdf'],
    ['DANE · Presentación FIES 2025 por departamentos', 'https://www.dane.gov.co/files/operaciones/FIES/pre-FIES-2025.pdf'],
    ['FAO · SOFI 2026 (21 jul 2026)', 'https://www.fao.org/newsroom/detail/un-report--global-hunger-levels-ease-for-third-consecutive-year-as-regional-disparities-persist/en'],
    ['FAO-SMIA · Ficha de Colombia', 'https://www.fao.org/giews/countrybrief/country.jsp?code=COL&lang=es'],
    ['Corte Constitucional · Comunicado 34 (APPA, nov 2026)', 'https://www.corteconstitucional.gov.co/comunicados/comunicado-34-9-y-11-de-noviembre-de-2026.pdf'],
    ['Ley 2536 de 2025 · lucha contra el hambre', 'https://www.alcaldiabogota.gov.co/sisjur/normas/Norma1.jsp?i=190093'],
    ['Forbes Colombia · desperdicio de alimentos (oct 2026)', 'https://forbes.co/2026/10/31/sostenibilidad/colombia-desperdicia-976-millones-de-toneladas-de-alimentos-al-ano-que-esta-fallando/'],
    ['Gobernación de Antioquia · MANÁ en el Bajo Cauca', 'https://antioquia.gov.co/noticias-gerencia-mana/el-bajo-cauca-le-está-cumpliendo-a-la-seguridad-alimentaria'],
    ['Decreto 0159 de 2026 · salario mínimo', 'https://normograma.mintic.gov.co/mintic/compilacion/docs/decreto_0159_2026.htm']
  ]
};

/* Salario mínimo 2026 (Decreto 1469 de 2025, mantenido por el Decreto 0159 de 2026) */
window.LEGAL = { smmlv: 1750905, auxilio: 249095, anio: 2026 };

window.I18N = {
  es: {
    tagline: 'al Día', refresh: 'Actualizar', loadingNews: 'Cargando noticias de seguridad alimentaria...',
    nav_hoy: 'Hoy', nav_cifras: 'Cifras', nav_hogar: 'Mi hogar', nav_plato: 'Plato que rinde', nav_huerta: 'Huerta casera',
    nav_campo: 'Campo y abastecimiento', nav_programas: 'Programas', nav_veeduria: 'Veeduría y petición', nav_mundo: 'Mundo', nav_fuentes: 'Fuentes',
    heroKicker: 'Que en ninguna mesa falte la comida',
    heroTitle: 'Comer bien todos los días es un derecho, no un lujo',
    heroLead: 'Cifras reales del hambre en Colombia y el Bajo Cauca, un test para medir tu hogar, calculadora del mercado, huerta casera, programas de ayuda, veeduría ciudadana y noticias que trae un robot cada 30 minutos.',
    ctaTest: 'Medir mi hogar', ctaPet: 'Exigir respuestas',
    entered: 'Entraste el',
    hoyTitle: 'Hoy en seguridad alimentaria', hoyLead: 'Esta sección se renueva cada vez que entras: búsqueda en vivo más lo que dejó el robot en su última vuelta.',
    f_all: 'Todo', f_bajocauca: 'Bajo Cauca', f_region: 'Antioquia y Caribe', f_programas: 'Programas', f_campo: 'Campo', f_mundo: 'Mundo', f_colombia: 'Colombia',
    liveOk: 'Búsqueda en vivo: {n} noticias nuevas. Robot: ', liveFail: 'La búsqueda en vivo no respondió; mostrando lo del robot. Robot: ', robotAt: 'última vuelta', noNews: 'Aún no hay noticias en este tema. El robot vuelve en menos de 30 minutos.', more: 'Ver más noticias', live: 'EN VIVO',
    cifrasTitle: 'El hambre en cifras', cifrasLead: 'Datos oficiales más recientes. Detrás de cada número hay mesas reales.',
    deptoTitle: 'Inseguridad alimentaria moderada o grave por departamento (% de hogares)', ejesTitle: 'Los cinco ejes de la seguridad alimentaria en Colombia',
    hogarTitle: 'Mide la seguridad alimentaria de tu hogar', hogarLead: 'Las mismas 8 preguntas que usa el DANE con la FAO. Piensa en los últimos 12 meses. Tus respuestas no salen de tu celular.',
    si: 'Sí', no: 'No', calcTest: 'Ver resultado', resetTest: 'Volver a empezar',
    r0t: 'Hogar con seguridad alimentaria', r0p: 'No reportas dificultades. Sigue cuidando la variedad de la comida y comparte esta app con quien la necesite.',
    r1t: 'Inseguridad alimentaria leve', r1p: 'Hay preocupación o poca variedad. Revisa la calculadora del mercado, el plato que rinde y empieza tu huerta casera.',
    r2t: 'Inseguridad alimentaria moderada', r2p: 'Ya se está comiendo menos de lo necesario. Pregunta por el PAE en el colegio, el ICBF si hay niños pequeños o gestantes, y Prosperidad Social. No es pena pedir ayuda: es un derecho.',
    r3t: 'Inseguridad alimentaria grave', r3p: 'Tu hogar está pasando hambre. Busca hoy mismo a la Alcaldía, la parroquia o un comedor comunitario. Si hay niños, llama gratis a la línea 141 del ICBF.',
    testNote: 'Resultado orientativo con el puntaje simple de la escala FIES (0 = seguro; 1–3 leve; 4–6 moderada; 7–8 grave). El DANE usa un modelo estadístico más completo.',
    mercadoTitle: 'Calculadora del mercado', mercadoLead: 'Cuánto pesa la comida en el bolsillo de tu casa. Viene con el salario mínimo 2026 más el auxilio de transporte.',
    m_ing: 'Ingreso mensual del hogar ($)', m_per: 'Personas en el hogar', m_gas: 'Gasto mensual en comida ($)',
    m_pct: 'del ingreso se va en comida', m_dia: 'por persona al día', m_com: 'por persona en cada comida (3 al día)',
    m_ok: 'La comida pesa menos de un tercio del ingreso: hay margen para mejorar la variedad.', m_mid: 'Más de un tercio del ingreso se va en comida: compra de cosecha, en grupo y aprovecha legumbres.', m_bad: 'Más de la mitad del ingreso se va en comida: tu hogar es vulnerable. Revisa los programas de ayuda.',
    minimo: 'Salario mínimo 2026: {s} + auxilio de transporte {a} = {t}',
    platoTitle: 'El plato que rinde', platoLead: 'Una semana con comida de la región: arroz, fríjol, plátano, yuca, pescado de río y verduras de la huerta.',
    huertaTitle: 'Huerta casera en clima cálido', huertaLead: 'Para Caucasia y el Bajo Cauca: lo que se da rápido en patio, terraza o materas. Tiempos aproximados.',
    th_cult: 'Cultivo', th_tiempo: 'Primera cosecha', th_nota: 'Consejo',
    campoTitle: 'Campo y abastecimiento', campoLead: 'De la finca a la plaza: dónde se pierde la comida y cómo se protege a quien la produce.',
    progTitle: 'Programas de ayuda', progLead: 'A dónde acudir. Los programas cambian: confirma siempre en la entidad oficial.',
    veeTitle: 'Veeduría ciudadana', veeLead: 'Lo que cualquier padre o vecino puede vigilar. Marca lo que ya revisaste.',
    petTitle: 'Derecho de petición a todos los entes', petLead: 'Exige qué se está haciendo contra el hambre en Caucasia y el Bajo Cauca. Llena tus datos, revisa el texto y envíalo de una sola vez a todas las entidades. Por la Ley 1755 de 2015 deben responder en 15 días hábiles.',
    p_nom: 'Nombre completo', p_ced: 'Cédula', p_mail: 'Tu correo (para la respuesta)', p_tel: 'Teléfono', p_dir: 'Dirección', p_mun: 'Municipio',
    p_ent: 'Se envía a:', p_add: 'Agregar otro correo de entidad', p_send: 'Enviar a todas las entidades', p_copy: 'Copiar texto', p_wa: 'Compartir por WhatsApp', p_copied: 'Texto copiado',
    p_falta: 'Escribe tu nombre y cédula para firmar la petición.', p_mailnote: 'Se abre tu correo con todas las entidades como destinatarias y tu correo en copia. Guarda el mensaje enviado como prueba.',
    mundoTitle: 'El hambre en el mundo', mundoLead: 'Lo que dice el informe SOFI 2026 de la ONU.',
    fuentesTitle: 'Fuentes', fuentesLead: 'Cifras verificadas en noviembre de 2026. Las noticias son de los medios citados en cada tarjeta.',
    foot: 'Una app de Vibras Positivas HM · Caucasia, Antioquia', fotos: 'Fotos y videos reales: Wikimedia Commons (autor y licencia en cada imagen).', share: 'Compartir la app'
  },
  en: {
    tagline: 'Today', refresh: 'Refresh', loadingNews: 'Loading food security news...',
    nav_hoy: 'Today', nav_cifras: 'Figures', nav_hogar: 'My household', nav_plato: 'Budget meals', nav_huerta: 'Home garden',
    nav_campo: 'Farming and supply', nav_programas: 'Programs', nav_veeduria: 'Oversight and petition', nav_mundo: 'World', nav_fuentes: 'Sources',
    heroKicker: 'No table should go without food',
    heroTitle: 'Eating well every day is a right, not a luxury',
    heroLead: 'Real hunger figures for Colombia and Bajo Cauca, a test for your household, a grocery calculator, home gardening, aid programs, citizen oversight and news fetched by a robot every 30 minutes.',
    ctaTest: 'Check my household', ctaPet: 'Demand answers',
    entered: 'You came in on',
    hoyTitle: 'Today in food security', hoyLead: 'This section refreshes every time you open it: live search plus what the robot left on its last run.',
    f_all: 'All', f_bajocauca: 'Bajo Cauca', f_region: 'Antioquia & Caribbean', f_programas: 'Programs', f_campo: 'Farming', f_mundo: 'World', f_colombia: 'Colombia',
    liveOk: 'Live search: {n} new stories. Robot: ', liveFail: 'Live search did not respond; showing the robot’s news. Robot: ', robotAt: 'last run', noNews: 'No news on this topic yet. The robot runs again within 30 minutes.', more: 'More news', live: 'LIVE',
    cifrasTitle: 'Hunger in numbers', cifrasLead: 'The latest official data. Behind every number are real tables.',
    deptoTitle: 'Moderate or severe food insecurity by department (% of households)', ejesTitle: 'The five pillars of food security in Colombia',
    hogarTitle: 'Measure your household’s food security', hogarLead: 'The same 8 questions DANE uses with FAO. Think about the last 12 months. Your answers never leave your phone.',
    si: 'Yes', no: 'No', calcTest: 'See result', resetTest: 'Start over',
    r0t: 'Food secure household', r0p: 'You report no difficulties. Keep your diet varied and share this app with anyone who needs it.',
    r1t: 'Mild food insecurity', r1p: 'There is worry or little variety. Try the grocery calculator, budget meals and start a home garden.',
    r2t: 'Moderate food insecurity', r2p: 'Your household is eating less than needed. Ask about school meals, ICBF if there are small children or pregnant women, and Prosperidad Social. Asking for help is a right.',
    r3t: 'Severe food insecurity', r3p: 'Your household is going hungry. Contact the mayor’s office, your parish or a community kitchen today. If there are children, call ICBF line 141 for free.',
    testNote: 'Indicative result using the simple FIES raw score (0 = secure; 1–3 mild; 4–6 moderate; 7–8 severe). DANE uses a more complete statistical model.',
    mercadoTitle: 'Grocery calculator', mercadoLead: 'How much food weighs on your household budget. Preloaded with the 2026 minimum wage plus transport allowance.',
    m_ing: 'Monthly household income (COP)', m_per: 'People in the household', m_gas: 'Monthly food spending (COP)',
    m_pct: 'of income goes to food', m_dia: 'per person per day', m_com: 'per person per meal (3 a day)',
    m_ok: 'Food is under a third of income: there is room to improve variety.', m_mid: 'Over a third of income goes to food: buy in season, in groups, and use legumes.', m_bad: 'Over half of income goes to food: your household is vulnerable. Check the aid programs.',
    minimo: '2026 minimum wage: {s} + transport allowance {a} = {t}',
    platoTitle: 'Budget meals', platoLead: 'A week of regional food: rice, beans, plantain, cassava, river fish and garden vegetables.',
    huertaTitle: 'Home garden in a hot climate', huertaLead: 'For Caucasia and Bajo Cauca: fast crops for a yard, terrace or pots. Approximate times.',
    th_cult: 'Crop', th_tiempo: 'First harvest', th_nota: 'Tip',
    campoTitle: 'Farming and supply', campoLead: 'From farm to market: where food gets lost and how to protect those who grow it.',
    progTitle: 'Aid programs', progLead: 'Where to go. Programs change: always confirm with the official agency.',
    veeTitle: 'Citizen oversight', veeLead: 'What any parent or neighbor can watch. Tick what you have checked.',
    petTitle: 'Petition to every agency', petLead: 'Demand to know what is being done against hunger in Caucasia and Bajo Cauca. Fill in your details, review the text and send it to every agency at once. Under Law 1755 of 2015 they must answer within 15 business days.',
    p_nom: 'Full name', p_ced: 'ID number', p_mail: 'Your email (for the reply)', p_tel: 'Phone', p_dir: 'Address', p_mun: 'Municipality',
    p_ent: 'Sent to:', p_add: 'Add another agency email', p_send: 'Send to all agencies', p_copy: 'Copy text', p_wa: 'Share on WhatsApp', p_copied: 'Text copied',
    p_falta: 'Enter your name and ID number to sign the petition.', p_mailnote: 'Your email app opens with every agency as recipient and you in copy. Keep the sent message as proof. The petition itself is written in Spanish, as Colombian agencies require.',
    mundoTitle: 'Hunger in the world', mundoLead: 'What the UN SOFI 2026 report says.',
    fuentesTitle: 'Sources', fuentesLead: 'Figures verified in November 2026. News comes from the outlets named on each card.',
    foot: 'An app by Vibras Positivas HM · Caucasia, Antioquia', fotos: 'Real photos and videos: Wikimedia Commons (author and license on each image).', share: 'Share the app'
  }
};
