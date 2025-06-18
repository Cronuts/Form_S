const userEmail = document.getElementById('user-data')?.dataset?.userEmail?.trim();
const userName = document.getElementById('user-data')?.dataset?.userName?.trim();

const camposArchivos = [
    "documento_pyg_autonomo",
    "documento_imp_sociedades",
    "documento_pyg_sociedad",
    "documentos_deudas",
    "documento_irpf",
    "info_empleados",
    "nominas_empleados",
    "info_colaboradores",
    "info_equipamiento",
    "documento_contrato_arrendamiento",
    "tratamientos_precios",
    "fotos_clinica"
];

const camposNumericos = [
    'importe_condiciones_no_mercado',
    'renta_mercado_local',
    'ticket_medio_cliente',
    'precio_visita_mutua',
    'precio_visita_privada',
    'numero_fichas_pacientes',
    'importe_produccion_pendiente',
    'numero_fichas_pacientes'
];

const secciones = [
    {
      titulo: "1. Características y descripción general",
      preguntas: [
        { id: "1.1", texto: "Descripción de la Clínica. Puedes inspirarte en cualquiera de los anuncios que tenemos publicados en nuestra página web.", campo: "descripcion_clinica", tipo: "textarea" },
        { id: "1.2", texto: "Motivo del traspaso. Es importante argumentar un motivo convincente y fundamentado para un comprador (i.e. jubilación, mudanza, etc.).", campo: "motivo_traspaso", tipo: "textarea" },
        { id: "1.3", texto: "Dirección completa de la Clínica.", campo: "direccion_clinica", tipo: "text" },
        { id: "1.4", texto: "Metros cuadrados del local.", campo: "metros_cuadrados", tipo: "number" },
        { id: "1.5", texto: "Número de boxes.", campo: "numero_boxes", tipo: "number" },
        { id: "1.6", texto: "Especialidades de la Clínica.", campo: "especialidades_clinica", tipo: "textarea" }
      ]
    },
    {
      titulo: "2. Información financiera",
      preguntas: [
        { id: "2", texto: "¿Explotas la clínica como autónomo o como empresa/sociedad?", campo: "tipo_explotacion", tipo: "select", opciones: ["Autónomo", "Empresa/Sociedad"] },
        { id: "2.1", texto: "Aporta la declaración de IRPF (modelo 100) de los últimos 4 ejercicios. Si no se dispone del IRPF del último ejercicio, aportar modelo 130 correspondiente al 4to trimestre del último ejercicio.", campo: "documento_irpf", tipo: "file", maxArchivos: 4, minArchivos: 4, mostrarSi: { campo:"tipo_explotacion", valor:"Autónomo" } },
        { id: "2.2", texto: "¿Explotas solo una clínica dental o varias clínicas dentales como autónomo?", campo: "numero_clinicas_autonomo", tipo: "select", opciones: ["Solo una", "Más de una"], mostrarSi: { campo:"tipo_explotacion", valor:"Autónomo" } },
        { id: "2.3", texto: "Aporta un PYG (cuenta de pérdidas y ganancias) del último ejercicio individualizado por cada clínica dental.", campo: "documento_pyg_autonomo", tipo: "file", mostrarSi: {campo:"numero_clinicas_autonomo", valor:"Más de una"} },
        { id: "2.4", texto: "Aporta el Impuesto de Sociedades (modelo 200) de los últimos 4 ejercicios. Si no se dispone del Impuesto de Sociedades del último ejercicio, aportar “cuenta de pérdidas y ganancias” correspondiente al último ejercicio.", campo: "documento_imp_sociedades", tipo: "file", mostrarSi: { campo:"tipo_explotacion", valor:"Empresa/Sociedad" } },
        { id: "2.5", texto: "¿Explotas solo una clínica dental o varias clínicas dentales como Sociedad?", campo: "numero_clinicas_sociedad", tipo: "select", opciones: ["Solo una", "Más de una"], mostrarSi: { campo:"tipo_explotacion", valor:"Empresa/Sociedad" } },
        { id: "2.6", texto: "Aporta un PYG (cuenta de pérdidas y ganancias) del último ejercicio individualizado por cada clínica dental.", campo: "documento_pyg_sociedad", tipo: "file", mostrarSi: {campo:"numero_clinicas_sociedad", valor:"Más de una"} },
        { id: "2.7", texto: "Indica un precio orientativo para la venta de la Clínica:", campo: "precio_orientativo_venta", tipo: "number" },
        { id: "2.8", texto: "¿Declaras todos los ingresos de la clínica en el Impuesto de Sociedades? No te preocupes, no somos hacienda y trataremos estos datos con el máximo rigor confidencialidad.", campo: "declara_ingresos", tipo: "select", opciones: ["Sí", "No"] },
        { id: "2.9", texto: "¿Llevas algún registro contable aparte para ellos?", campo: "registro_contable_aparte", tipo: "select", opciones: ["Sí", "No"], mostrarSi: { campo:"declara_ingresos", valor:"Sí"} },
        { id: "2.10", texto: "Indica el importe de los 4 últimos ejercicios:", campo: "importe_ultimos_ejercicios", tipo: "number", mostrarSi: { campo:"registro_contable_aparte", valor:"Sí"} },
        { id: "2.11", texto: "¿Existe algún gasto que el nuevo dueño no tendría? (i.e. renting de vehículo, seguros, reformas, etc.).", campo: "gastos_no_nuevo_dueno", tipo: "textarea", mostrarSi: { campo:"registro_contable_aparte", valor:"Sí"} },
        { id: "2.12", texto: "La clínica tiene deudas (renting, préstamo, ICO, líneas de crédito, etc.).", campo: "clinica_tiene_deudas", tipo: "select", opciones: ["Sí", "No"] },
        { id: "2.13", texto: "En caso afirmativo, aporta los documentos financieros correspondientes (i.e. contrato de renting, préstamo ICO, etc.).", campo: "documentos_deudas", tipo: "file", maxArchivos: 4, minArchivos: 1, mostrarSi: {campo:"clinica_tiene_deudas", valor:"Sí"} },
        { id: "2.14", texto: "¿Estás al día con los pagos de impuestos y Seguridad Social?", campo: "pagos_impuestos_seguridad", tipo: "select", opciones: ["Sí", "No"] },
        { id: "2.15", texto: "En caso negativo, ¿Cuánto es el importe de la deuda?", campo: "importe_deuda", tipo: "number", mostrarSi: {campo:"pagos_impuestos_seguridad", valor:"No"} }
      ]
    },
    {
      titulo: "3. Personal, pasivo laboral y colaboradores",
      preguntas: [
        { id: "3.1", texto: "¿La Clínica tiene empleados?", campo: "clinica_tiene_empleados", tipo: "select", opciones: ["Sí", "No"] },
        { id: "3.1.1", texto: "Aporta la siguiente información: (i) Nombre; (ii) Cargo; (iii) Nómina; (iv) Jornada laboral; (v) Días a la semana que trabaja.", campo: "info_empleados", tipo: "file", mostrarSi: { campo:"clinica_tiene_empleados", valor:"Sí" } },
        { id: "3.1.2", texto: "Aporta la última nómina de cada trabajador.", campo: "nominas_empleados", tipo: "file", mostrarSi: { campo:"clinica_tiene_empleados", valor:"Sí" } },
        { id: "3.2", texto: "¿La Clínica tiene colaboradores?", campo: "clinica_tiene_colaboradores", tipo: "select", opciones: ["Sí", "No"] },
        { id: "3.2.1", texto: "Aporta la siguiente información: (i) Nombre; (ii) Especialidad de los/las doctores/as que colaboren en la Clínica como autónomos (régimen de prestación de servicios); (iii) régimen retributivo (% de facturación que cobran); (iv) importe total facturado; (v) días al mes que van a la clínica.", campo: "info_colaboradores", tipo: "file", mostrarSi: { campo:"clinica_tiene_colaboradores", valor:"Sí" } },
        { id: "3.3", texto: "Información del vendedor / familiares del vendedor: ¿Tenéis imputado algún sueldo (vendedor o a algún familiar)?", campo: "imputacion_sueldo", tipo: "select", opciones: ["Sí", "No"] },
        { id: "3.3.1", texto: "En caso afirmativo, ¿Cuáles son las funciones y sus condiciones económicas?", campo: "funciones_condiciones", tipo: "textarea", mostrarSi: { campo:"imputacion_sueldo", valor:"Sí"} },
        { id: "3.3.2", texto: "¿Son condiciones económicas de mercado? Es decir, cobraría lo mismo que un tercero por hacer las mismas funciones.", campo: "condiciones_mercado", tipo: "select", opciones: ["Sí", "No"] ,mostrarSi: { campo:"imputacion_sueldo", valor:"Sí"} },
        { id: "3.3.2.1", texto: "En caso de que no lo fueran, ¿cuánto cobraría una persona por realizar las mismas funciones y misma dedicación.", campo: "importe_condiciones_no_mercado", tipo: "textarea" , mostrarSi: { campo:"condiciones_mercado", valor:"No"} },
        { id: "3.4", texto: "Una vez realizada la venta, ¿te gustaría quedarte trabajando en la Clínica?", campo: "quedarse_trabajando", tipo: "select", opciones: ["Sí", "No"] },
        { id: "3.7", texto: "En caso afirmativo, ¿durante cuánto tiempo y bajo qué condiciones económicas (i.e. % facturación)?", campo: "tiempo_condiciones_quedarse", tipo: "textarea", mostrarSi:{ campo:"quedarse_trabajando", valor:"Sí" } }
      ]
    },
    {
      titulo: "4. Instalaciones, equipamiento y reforma",
      preguntas: [
        { id: "4.1", texto: "Aporta la siguiente información sobre el equipamiento existente en la Clínica: (i) Modelo; (ii) Año adquisición; (iii) Coste adquisición.", campo: "info_equipamiento", tipo: "file" },
        { id: "4.2", texto: "¿Hay TAC/CBCT en la clínica? En su defecto, ¿hay ortopantomógrafo?", campo: "tac_cbct", tipo: "select", opciones: ["Si hay TAC/CBCT y/o ortopantomógrafo", "No, no hay TAC/CBCT ni ortopantomógrafo."] },
        { id: "4.2.1", texto: "En caso negativo, indicar en este apartado si hay lugar en la clínica para instalarlo.", campo: "lugar_instalacion_tac", tipo: "textarea", mostrarSi: { campo:"tac_cbct", valor:"No, no hay TAC/CBCT ni ortopantomógrafo." } },
        { id: "4.3", texto: "¿Se han realizado mantenimientos regulares en el equipamiento y están documentados?", campo: "mantenimientos_equipamiento", tipo: "textarea" }
      ]
    },
    {
      titulo: "5. Local",
      preguntas: [
        { id: "5.1", texto: "¿Eres dueño del local donde está la clínica?", campo: "dueno_local", tipo: "select", opciones: ["Sí", "No"] },
        { id: "5.2", texto: "¿Indica la renta de mercado del local comercial dónde se ubica la clínica a la que estás dispuesto a alquilarlo?", campo: "renta_mercado_local", tipo: "number", mostrarSi: { campo:"dueno_local", valor:"Sí" } },
        { id: "5.3", texto: "Aporta el contrato de arrendamiento y todas sus novaciones", campo: "documento_contrato_arrendamiento", tipo: "file", mostrarSi: { campo:"dueno_local", valor:"No" } },
        { id: "5.4", texto: "La propiedad del Local (arrendador) estaría dispuesta a la cesión del contrato de arrendamiento en los mismos términos y condiciones que el contrato actualmente vigente, por un nuevo plazo de aproximadamente 10 años de duración.", campo: "cesion_contrato_arrendamiento", tipo: "select", opciones: ["Sí", "No", "No lo sé"] },
        { id: "5.5", texto: "Explicación, fecha y coste de la última reforma importante realizada en la Clínica.", campo: "reforma_ultima", tipo: "textarea" },
        { id: "5.6", texto: "¿La Clínica cuenta con alguna licencia adicional (i.e. formación, medicina estética, etc.)?", campo: "licencia_adicional", tipo: "textarea" }
      ]
    },
    {
      titulo: "6. Información operacional",
      preguntas: [
        { id: "6.1", texto: "Ticket medio de cliente. Nota: El ticket medio de cliente es el resultado de dividir la facturación total del último año entre los pacientes que han acudido en ese mismo año.", campo: "ticket_medio_cliente", tipo: "number" },
        { id: "6.2", texto: "Tratamientos y precio de los mismos:", campo: "tratamientos_precios", tipo: "file" },
        { id: "6.3", texto: "¿Se trabaja con Mutuas?", campo: "trabaja_mutuas", tipo: "select", opciones: ["Sí", "No"] },
        { id: "6.3.1", texto: "¿Con qué mutuas se trabaja?", campo: "mutuas_trabajadas", tipo: "textarea", mostrarSi: { campo:"trabaja_mutuas", valor:"Sí" } },
        { id: "6.3.2", texto: "¿Cuánto se cobra por visita de mutua?", campo: "precio_visita_mutua", tipo: "number", mostrarSi: { campo:"trabaja_mutuas", valor:"Sí" } },
        { id: "6.4", texto: "¿Cuánto se cobra por visita privada?", campo: "precio_visita_privada", tipo: "number" },
        { id: "6.5", texto: "Número de fichas de pacientes activas a día de hoy.", campo: "numero_fichas_pacientes", tipo: "number" }
      ]
    },
    {
      titulo: "7. Producción Pendiente",
      preguntas: [
        { id: "7.1", texto: "¿Tienes tratamientos pagados por los pacientes, pero que aún no se han finalizado (“Producción Pendiente”)?", campo: "produccion_pendiente", tipo: "select", opciones: ["Sí", "No"] },
        { id: "7.1.1", texto: "Indica un importe aproximado de la Producción Pendiente actual", campo: "importe_produccion_pendiente", tipo: "number", mostrarSi: { campo:"produccion_pendiente", valor:"Sí" } },
        { id: "7.1.2", texto: "¿Estás dispuesto a terminar la Producción Pendiente después de la venta o prefieres descontar del precio de venta el 40% del importe de la Producción Pendiente?", campo: "terminar_produccion_pendiente", tipo: "select", opciones: ["Prefiero terminarla yo asumiendo el coste de ejecución", "Prefiero que la termine el Comprador con el descuento"], mostrarSi: { campo:"produccion_pendiente", valor:"Sí" } }
      ]
    },
    {
      titulo: "8. Información adicional",
      preguntas: [
        { id: "8.1", texto: " Fotografías tanto del exterior como interior del local, donde se vean bien todas las salas y espacios que constan.", campo: "fotos_clinica", tipo: "file", multiple: true, maxArchivos: 10,  minArchivos: 5},
        { id: "8.2", texto: "¿Quieres añadir alguna información adicional?", campo: "informacion_adicional", tipo: "textarea" }
      ]
    }
  ];

