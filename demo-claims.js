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
};

function referencePhoto(claim) {
  if (!claim.demo) return null;
  const key = claim.categoria === "infraestructura" ? (/vereda|cordón roto/i.test(claim.titulo) ? "vereda" : "bache")
    : claim.categoria === "espacios_verdes" || /restos de poda/i.test(claim.titulo) ? "ramas"
    : claim.categoria === "otro" && /canilla/i.test(claim.titulo) ? "canilla"
    : claim.categoria;
  const photo = REFERENCE_PHOTOS[key];
  return photo ? { ...photo, src: "assets/fotos-referencia/" + key + ".jpg" } : null;
}

function claimPhoto(claim) {
  return referencePhoto(claim)?.src || claim.foto;
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
