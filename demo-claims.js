const REFERENCE_PHOTOS = {
  bache: { label: "Bache en asfalto", author: "Frankie Fouganthin", source: "https://commons.wikimedia.org/wiki/File:Pothole_in_an_asphalt_pavement.jpg", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/" },
  vereda: { label: "Vereda deteriorada", author: "Vendor on Robolow Universe", source: "https://commons.wikimedia.org/wiki/File:Damaged_footpath_in_India.jpg", license: "CC BY 4.0", licenseUrl: "https://creativecommons.org/licenses/by/4.0/" },
  alumbrado: { label: "Luminaria dañada", author: "Bidgee", source: "https://commons.wikimedia.org/wiki/File:Small_HPS_street_lamp.jpg", license: "CC BY 3.0", licenseUrl: "https://creativecommons.org/licenses/by/3.0/" },
  limpieza: { label: "Contenedor desbordado", author: "Kotivalo", source: "https://commons.wikimedia.org/wiki/File:Paper_recycling_bin_overflows.jpg", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/" },
  ramas: { label: "Ramas que obstruyen un sendero", author: "Evelyn Simak", source: "https://commons.wikimedia.org/wiki/File:Fallen_trees_blocking_footpath_-_geograph.org.uk_-_5305995.jpg", license: "CC BY-SA 2.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/" },
  desagues: { label: "Calle inundada por un desagüe obstruido", author: "Bart Everson", source: "https://commons.wikimedia.org/wiki/File:Storm_Drain_Clogged_-_Mid-City_New_Orleans.jpg", license: "CC BY 2.0", licenseUrl: "https://creativecommons.org/licenses/by/2.0/" },
  transito: { label: "Cruce peatonal", author: "Nigel Chadwick", source: "https://commons.wikimedia.org/wiki/File:Pedestrian_%28Zebra%29_Crossing%2C_Quarry_Hill_-_geograph.org.uk_-_1583524.jpg", license: "CC BY-SA 2.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/" },
  seguridad: { label: "Cerco dañado", author: "Anne Burgess", source: "https://commons.wikimedia.org/wiki/File:Damaged_Fence_-_geograph.org.uk_-_1803886.jpg", license: "CC BY-SA 2.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/" },
  otro: { label: "Banco de plaza roto", author: "Tomwsulcer", source: "https://commons.wikimedia.org/wiki/File:Broken_bench_Briant_Pond_Park_Summit_NJ_2009.jpg", license: "Dominio público", licenseUrl: "https://commons.wikimedia.org/wiki/File:Broken_bench_Briant_Pond_Park_Summit_NJ_2009.jpg" },
  canilla: { label: "Canilla con pérdida de agua", author: "Angelsharum", source: "https://commons.wikimedia.org/wiki/File:Dripping_Faucet.JPG", license: "CC BY-SA 3.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/" },
  "bache-2": {label: "Bache en la calzada",author: "State Farm",source: "https://commons.wikimedia.org/wiki/File:Pothole_in_the_street.jpg",license: "CC BY 2.0",licenseUrl: "https://creativecommons.org/licenses/by/2.0/"},
  "vereda-2": {label: "Vereda deteriorada en Montevideo",author: "NaBUru38",source: "https://commons.wikimedia.org/wiki/File:Damaged_sidewalk_in_Montevideo_-_01.jpg",license: "CC BY-SA 4.0",licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/"},
  "alumbrado-2": {label: "Poste de alumbrado caído",author: "Niera",source: "https://commons.wikimedia.org/wiki/File:A_fallen_street_light_pole.jpg",license: "CC BY-SA 4.0",licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/"},
  "limpieza-2": {label: "Tacho desbordado",author: "Microrao",source: "https://commons.wikimedia.org/wiki/File:Overflowing_garbage.jpg",license: "CC BY-SA 4.0",licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/"},
  "ramas-2": {label: "Ramas caídas sobre un sendero",author: "John Sparshatt",source: "https://commons.wikimedia.org/wiki/File:Storm_Damage_-_geograph.org.uk_-_755531.jpg",license: "CC BY-SA 2.0",licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/"},
  "desagues-2": {label: "Desborde de una cuneta",author: "Paul The Writer",source: "https://commons.wikimedia.org/wiki/File:Street_Drainage_Channel_Overflow.jpg",license: "CC0 1.0",licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/"},
  "transito-2": {label: "Senda peatonal despintada",author: "Alan Stanton",source: "https://commons.wikimedia.org/wiki/File:Fading_road_crossing_in_Park_View_Road_N17.jpg",license: "CC BY-SA 2.0",licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/"},
  "seguridad-2": {label: "Cerco roto",author: "Packer1028",source: "https://commons.wikimedia.org/wiki/File:Fallen_tree%2C_broken_fence.jpg",license: "CC0 1.0",licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/"},
  "otro-2": {label: "Banco de plaza deteriorado",author: "Rob Burke",source: "https://commons.wikimedia.org/wiki/File:Broken_bench_at_Neil_Gows_Oak_(geograph_2897831).jpg",license: "CC BY-SA 2.0",licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/"},
};

const REFERENCE_VARIANTS = {
  bache: ["bache", "bache-2"],
  vereda: ["vereda", "vereda-2"],
  alumbrado: ["alumbrado", "alumbrado-2"],
  limpieza: ["limpieza", "limpieza-2"],
  ramas: ["ramas", "ramas-2"],
  desagues: ["desagues", "desagues-2"],
  transito: ["transito", "transito-2"],
  seguridad: ["seguridad", "seguridad-2"],
  otro: ["otro", "otro-2"],
};

function referencePhoto(claim, variant = "") {
  if (claim.foto && !claim.demo) return null;
  const key = claim.categoria === "infraestructura" ? (/vereda|cordón roto/i.test(claim.titulo) ? "vereda" : "bache")
    : claim.categoria === "espacios_verdes" && /bancos?/i.test(claim.titulo) ? "otro"
    : claim.categoria === "espacios_verdes" || /restos de poda/i.test(claim.titulo) ? "ramas"
    : claim.categoria === "otro" && /canilla/i.test(claim.titulo) ? "canilla"
    : claim.categoria;
  const choices = REFERENCE_VARIANTS[key];
  let photoKey = key;
  if (choices) {
    // Keep the same photo for the claim's marker, card and detail.
    let hash = 0;
    for (const character of String(claim.id || claim.titulo)) {
      hash = Math.imul(hash ^ character.codePointAt(0), 16777619);
    }
    photoKey = choices[(hash >>> 0) % choices.length];
  }
  const photo = REFERENCE_PHOTOS[photoKey];
  return photo ? { ...photo, src: "assets/fotos-referencia/" + photoKey + (variant ? "-" + variant : "") + ".webp" } : null;
}

function claimPhoto(claim, variant) {
  return referencePhoto(claim, variant)?.src || claim.foto;
}

function makePetitionClaims() {
  const initiatives = {
    "La Lucila": [
      ["alumbrado", "Iluminar el acceso peatonal a la estación", "Entorno de la estación"],
      ["espacios_verdes", "Recuperar los bancos del Paseo del Viento", "Paseo del Viento"],
      ["infraestructura", "Emparejar el sendero hacia la costa", "Entorno de Av. del Libertador"],
      ["limpieza", "Colocar cestos en el recorrido ribereño", "Paseo de la Costa"],
      ["transito", "Mejorar la demarcación del cruce hacia la estación", "Centro de La Lucila"],
      ["desagues", "Limpiar sumideros cerca de la bajada a la costa", "Bajada al río"],
      ["seguridad", "Reparar el cerco del sendero recreativo", "Corredor ribereño"],
    ],
    Olivos: [
      ["transito", "Reforzar la señalización peatonal en el centro", "Av. Maipú"],
      ["infraestructura", "Acondicionar veredas de acceso a la plaza", "Plaza Vicente López y Planes"],
      ["alumbrado", "Revisar las luminarias junto al puerto", "Entorno del Puerto de Olivos"],
      ["espacios_verdes", "Renovar bancos y sombra en la plaza", "Plaza Vicente López y Planes"],
      ["limpieza", "Mejorar la recolección en el corredor comercial", "Av. Maipú"],
      ["desagues", "Despejar rejillas en las calles del puerto", "Zona del puerto"],
      ["seguridad", "Reponer la baranda del recorrido al río", "Frente costero de Olivos"],
    ],
    Florida: [
      ["infraestructura", "Hacer accesible el recorrido a la estación", "Entorno de la estación Florida"],
      ["transito", "Renovar las sendas peatonales en San Martín", "Av. San Martín"],
      ["espacios_verdes", "Recuperar el arbolado de las cuadras escolares", "Centro de Florida"],
      ["alumbrado", "Cambiar luminarias del corredor de la estación", "Entorno ferroviario"],
      ["desagues", "Destapar sumideros del corredor comercial", "Av. San Martín"],
      ["limpieza", "Reforzar el barrido en el entorno de la estación", "Zona de la estación"],
      ["seguridad", "Asegurar las tapas en el paso peatonal", "Barrio Florida"],
    ],
    "Florida Oeste": [
      ["desagues", "Revisar el drenaje de las calles bajas", "Sector de Av. Mitre"],
      ["infraestructura", "Reparar el pavimento de acceso al barrio", "Av. Mitre y alrededores"],
      ["limpieza", "Organizar el retiro de residuos voluminosos", "Centro de Florida Oeste"],
      ["alumbrado", "Iluminar el acceso al corredor de colectivos", "Av. Mitre"],
      ["transito", "Repintar los cruces próximos al ferrocarril", "Entorno de la estación"],
      ["espacios_verdes", "Acondicionar el área de descanso de la plaza", "Plaza barrial"],
      ["seguridad", "Reponer defensas en el paso peatonal", "Sector ferroviario"],
    ],
    Munro: [
      ["limpieza", "Sumar cestos en el centro comercial de Munro", "Av. Vélez Sarsfield"],
      ["infraestructura", "Mejorar los accesos al centro cultural", "Centro Cultural Munro"],
      ["transito", "Ordenar la señalización de las paradas", "Av. Vélez Sarsfield"],
      ["espacios_verdes", "Recuperar los canteros del centro de Munro", "Centro comercial"],
      ["alumbrado", "Mejorar la iluminación del paso a la estación", "Entorno ferroviario"],
      ["desagues", "Limpiar desagües alrededor de la estación", "Entorno de la estación Munro"],
      ["seguridad", "Reparar el cerramiento del espacio de juegos", "Área recreativa de Munro"],
    ],
    "Villa Martelli": [
      ["alumbrado", "Reponer luces en el ingreso a Villa Martelli", "Entorno de Av. Laprida"],
      ["transito", "Hacer visible el cruce del corredor de colectivos", "Av. Laprida"],
      ["desagues", "Verificar los sumideros del acceso barrial", "Entorno de General Paz"],
      ["limpieza", "Mantener libres las esquinas de residuos", "Sector comercial de Villa Martelli"],
      ["infraestructura", "Reparar baldosas y rampas del paseo comercial", "Av. Laprida"],
      ["espacios_verdes", "Renovar el equipamiento de la plaza barrial", "Centro de Villa Martelli"],
      ["seguridad", "Sustituir la baranda suelta del paso peatonal", "Sector de General Paz"],
    ],
    "Villa Adelina": [
      ["espacios_verdes", "Mejorar senderos y bancos en la plaza", "Sector de Av. Paraná"],
      ["infraestructura", "Acondicionar las rampas del centro comercial", "Av. Paraná"],
      ["transito", "Demarcar los cruces usados por estudiantes", "Corredor escolar"],
      ["desagues", "Mantener los sumideros antes de las lluvias", "Zona de Av. Paraná"],
      ["alumbrado", "Iluminar el camino hacia las paradas", "Corredor de Av. Paraná"],
      ["limpieza", "Reforzar el retiro de ramas después de la poda", "Barrio Villa Adelina"],
      ["seguridad", "Asegurar el perímetro del espacio recreativo", "Plaza barrial"],
    ],
    Carapachay: [
      ["infraestructura", "Reparar el recorrido peatonal hacia la estación", "Entorno de la estación Carapachay"],
      ["limpieza", "Colocar cestos junto al corredor ferroviario", "Zona de la estación"],
      ["alumbrado", "Reponer luces alrededor de la plaza", "Centro de Carapachay"],
      ["transito", "Renovar las señales del cruce principal", "Corredor comercial de Carapachay"],
      ["espacios_verdes", "Acondicionar los canteros del paseo central", "Centro de Carapachay"],
      ["desagues", "Limpiar rejillas en las calles residenciales", "Entorno de la estación"],
      ["seguridad", "Reparar el cerco junto al paso ferroviario", "Corredor ferroviario"],
    ],
  };
  const work = {
    alumbrado: ["Hay sectores oscuros al atardecer. Pedimos revisar los artefactos y priorizar los accesos peatonales.", "Se repusieron luminarias y se comprobó el encendido del tramo."],
    espacios_verdes: ["El uso diario deterioró el espacio. Pedimos reparar el equipamiento y despejar las zonas de paso.", "Se reparó el equipamiento y se despejaron los recorridos."],
    infraestructura: ["El deterioro dificulta la circulación con cochecitos o sillas de ruedas. Pedimos nivelar y reparar el tramo.", "Se reparó el tramo y se verificó la continuidad del paso."],
    limpieza: ["La acumulación de residuos se repite durante la semana. Pedimos revisar la capacidad y la frecuencia de retiro.", "Se retiraron los residuos y se incorporó el sector al recorrido de mantenimiento."],
    transito: ["La señalización es poco visible. Pedimos mejorar la demarcación para facilitar un cruce seguro.", "Se renovó la demarcación y se verificó la visibilidad del cruce."],
    desagues: ["Se acumula agua después de cada lluvia. Pedimos retirar las obstrucciones y revisar el escurrimiento.", "Se retiraron sedimentos y se realizó una prueba de escurrimiento."],
    seguridad: ["El elemento de protección está deteriorado y el sector tiene circulación diaria. Pedimos repararlo.", "Se repuso el elemento dañado y se comprobó su fijación."],
  };
  const today = new Date();
  const date = (daysAgo) => new Date(today.getFullYear(), today.getMonth(), today.getDate() - daysAgo, 12).toISOString().slice(0, 10);
  return Object.entries(initiatives).flatMap(([barrio, entries], area) => entries.map(([categoria, titulo, direccion], position) => {
    const index = area * 7 + position;
    const estado = ["abierto", "en_proceso", "resuelto"][(area + position) % 3];
    const closed = estado === "resuelto";
    const [description, evidence] = work[categoria];
    const published = 12 + index % 51;
    const resolvedDate = closed ? date(published - 8) : "";
    const { lat, lng } = BARRIOS[barrio];
    return {
      id: "pet-" + (index + 1), numero: "P-" + (101 + index), demo: true, titulo, categoria, barrio, direccion,
      descripcion: direccion + ". " + description, fecha: date(published),
      apoyos: index % 10 === 9 || index === 55 ? 44 + index % 43 : 103 + (index * 31) % 207,
      estado, verificado: estado !== "abierto", evidencia: closed ? evidence : "",
      evidenciaFoto: closed ? "assets/reclamos-demo/" + categoria + "-resuelto.svg" : "",
      fechaResolucion: resolvedDate, foto: "", owner: "",
      comentarios: estado === "abierto" ? [] : [{
        autor: "Municipio de Vicente López", muni: true, fecha: date(published - 8),
        texto: closed ? evidence : "El equipo asignado está relevando el sector para programar la intervención.",
      }],
      lat: lat + (position % 3 - 1) * .0013, lng: lng + (Math.floor(position / 3) - 1) * .0014,
    };
  }));
}


function makeDemoClaims() {
  const places = [
    ["La Lucila", -34.4960, -58.4880, [
      ["alumbrado", "Luminaria apagada en Rawson", "El tramo queda oscuro al anochecer y cuesta distinguir el cruce peatonal."],
      ["infraestructura", "Vereda levantada cerca de la estación", "Las baldosas se levantaron y dejaron un desnivel junto al cordón."],
      ["limpieza", "Residuos junto al contenedor", "Hay bolsas abiertas en la vereda y parte de la basura quedó sobre la calle."],
      ["desagues", "Charco persistente cerca del andén", "El agua queda acumulada junto a la rampa después de que para de llover."],
      ["transito", "Cruce escolar con pintura gastada", "La senda quedó desdibujada y necesita repintado."],
    ]],
    ["Olivos", -34.5106, -58.4852, [
      ["infraestructura", "Bache en el acceso a Olivos", "El pozo ocupa parte del carril y se llena de agua después de cada lluvia."],
      ["transito", "Senda peatonal despintada", "Las marcas están gastadas y casi no se distinguen al acercarse al cruce."],
      ["espacios_verdes", "Rama caída en un paseo", "La rama bloquea parte del camino y obliga a caminar por el césped."],
      ["alumbrado", "Dos luces apagadas en un sendero", "El sector entre dos postes queda completamente oscuro al anochecer."],
      ["limpieza", "Bolsas acumuladas en un cantero", "Quedaron bolsas alrededor del contenedor después de la recolección."],
    ]],
    ["Florida", -34.5261, -58.4802, [
      ["desagues", "Boca de tormenta tapada", "Se acumula agua contra el cordón y el desagüe está cubierto de hojas."],
      ["alumbrado", "Luz intermitente en la cuadra", "La luminaria se apaga y vuelve a prender varias veces durante la noche."],
      ["seguridad", "Cerco abierto junto al paso peatonal", "Quedó una abertura en el cerco y hay hierros que sobresalen hacia el paso."],
      ["infraestructura", "Hundimiento frente a una parada", "Hay un desnivel en el asfalto por donde suben y bajan pasajeros."],
      ["desagues", "Sumidero cubierto de hojas en Florida", "La rejilla está tapada y se junta agua en el cruce peatonal."],
    ]],
    ["Florida Oeste", -34.5408, -58.5068, [
      ["limpieza", "Restos de poda sin retirar", "Las ramas ocupan parte de la vereda y dificultan el paso con cochecito."],
      ["transito", "Cartel de prioridad girado", "La señal quedó orientada hacia la vereda y no se lee desde el carril."],
      ["infraestructura", "Cordón roto en la parada", "Falta un tramo de cordón en el sector de ascenso al colectivo."],
      ["espacios_verdes", "Ramas bajas junto a los juegos", "Varias ramas quedaron a la altura de la cabeza junto al sendero."],
      ["alumbrado", "Luz fuera de servicio cerca del cruce", "El poste de la esquina no enciende desde la última tormenta."],
    ]],
    ["Munro", -34.5300, -58.5176, [
      ["infraestructura", "Pozo en la calzada de Munro", "El asfalto cedió cerca de la esquina y los vehículos lo esquivan."],
      ["otro", "Banco flojo en el paseo", "El banco se mueve al sentarse y uno de los anclajes quedó a la vista."],
      ["limpieza", "Contenedor desbordado", "El contenedor está lleno y quedaron bolsas sueltas alrededor."],
      ["seguridad", "Baranda suelta frente a una plaza", "La baranda de protección está floja del lado de la calle."],
      ["infraestructura", "Asfalto abierto cerca del cordón", "Una abertura ocupa parte de la calle en una zona de paso frecuente."],
    ]],
    ["Villa Martelli", -34.5503, -58.5040, [
      ["transito", "Semáforo peatonal apagado", "El indicador peatonal no enciende durante el ciclo del semáforo."],
      ["desagues", "Agua acumulada en el cruce", "Queda un charco profundo junto a la rampa después de llover."],
      ["alumbrado", "Poste sin luz cerca de la plaza", "La lámpara dejó de encender y el sendero queda oscuro por la noche."],
      ["limpieza", "Punto de basura junto al paso bajo nivel", "Se acumularon bolsas y envases en el camino peatonal."],
      ["espacios_verdes", "Rama partida sobre la bicisenda", "Una rama ocupa parte de la ciclovía y reduce el espacio de paso."],
    ]],
    ["Villa Adelina", -34.5180, -58.5330, [
      ["espacios_verdes", "Césped alto alrededor de los juegos", "La vegetación creció alrededor de los bancos y del acceso a los juegos."],
      ["seguridad", "Baranda floja en una rampa", "El pasamanos se mueve al sujetarlo y una fijación está suelta."],
      ["desagues", "Rejilla obstruida cerca de la plaza", "Hojas y barro tapan la rejilla cuando llueve."],
      ["transito", "Cartel tapado por vegetación", "La señal de cruce no se ve desde la calle por las ramas."],
      ["seguridad", "Tramo de cerco desprendido", "Dos piezas del cerco se soltaron y quedaron inclinadas hacia la vereda."],
    ]],
    ["Carapachay", -34.5168, -58.5134, [
      ["alumbrado", "Foco quemado en la esquina", "La lámpara no enciende y el cruce queda con poca visibilidad."],
      ["espacios_verdes", "Ramas que invaden la vereda", "Las ramas bajas ocupan el espacio de paso cerca del cordón."],
      ["otro", "Canilla pública con pérdida", "El grifo pierde agua aun cuando está completamente cerrado."],
      ["desagues", "Agua que desborda hacia la vereda", "El desagüe no alcanza a evacuar el agua después de lluvias fuertes."],
      ["otro", "Banco dañado junto al sendero", "Uno de los listones está desprendido y se mueve al tocarlo."],
    ]],
  ];
  const offsets = [[-.0027, -.0032], [.0027, .0006], [-.0010, .0038], [.0029, -.0031], [-.0034, .0019]];
  const interventions = {
    infraestructura: "Se retiró el material suelto, se rellenó el desnivel y se verificó que la superficie quedara firme y pareja.",
    alumbrado: "La cuadrilla reparó la conexión, reemplazó el equipo dañado y verificó el encendido al anochecer.",
    limpieza: "Se retiraron los residuos, se limpió el área y se comprobó que la vereda quedara libre.",
    transito: "Se renovó la señalización y se verificó su visibilidad desde el punto de aproximación al cruce.",
    espacios_verdes: "Se retiraron las ramas que obstruían el paso y se inspeccionó el sendero antes de reabrirlo.",
    desagues: "Se extrajeron hojas y sedimentos de la rejilla. La cuadrilla hizo una prueba con agua y verificó el escurrimiento.",
    seguridad: "Se retiraron las piezas sueltas, se fijaron los soportes y se verificó la estabilidad del cerramiento.",
    otro: "Se ajustaron los anclajes, se reemplazó la pieza dañada y se verificó el funcionamiento del mobiliario.",
  };
  return places.flatMap(([barrio, lat, lng, reports], area) => reports.map(([categoria, titulo, descripcion], index) => {
    const n = area * reports.length + index;
    const date = new Date();
    const status = ["abierto", "en_proceso", area % 2 ? "resuelto" : "en_proceso", "abierto", "resuelto"][index];
    date.setDate(date.getDate() - (4 + n % 24));
    const followUp = new Date(date);
    followUp.setDate(followUp.getDate() + (status === "resuelto" ? 3 : 1));
    const updatedAt = followUp.toISOString().slice(0, 10);
    const closed = status === "resuelto";
    const message = closed ? interventions[categoria]
      : "El equipo municipal registró la incidencia y programó una inspección del punto señalado.";
    return {
      id: "demo-" + (n + 1),
      numero: "E-" + String(n + 1).padStart(3, "0"),
      demo: true,
      titulo, descripcion, categoria, barrio, direccion: barrio,
      lat: lat + offsets[index][0],
      lng: lng + offsets[index][1],
      fecha: date.toISOString().slice(0, 10),
      estado: status,
      apoyos: 2 + (n * 7) % 39,
      evidencia: closed ? message : "",
      evidenciaFoto: closed ? "assets/reclamos-demo/" + categoria + "-resuelto.svg" : "",
      fechaResolucion: closed ? updatedAt : "",
      verificado: status !== "abierto",
      foto: "assets/reclamos-demo/" + categoria + ".svg",
      owner: "",
      comentarios: status === "abierto" ? [] : [{
        autor: "Municipio de Vicente López",
        texto: closed ? "Intervención finalizada. Se adjuntó un registro del resultado." : message,
        fecha: updatedAt,
        muni: true,
      }],
    };
  }));
}
