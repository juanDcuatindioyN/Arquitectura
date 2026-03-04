// Programa principal - Todo corre en consola
const ServicioCitas = require('./src/services/ServicioCitas');
const RepositorioCitas = require('./src/repositories/RepositorioCitas');

console.log('=================================');
console.log('SISTEMA DE CITAS MÉDICAS');
console.log('Arquitectura en Capas (2 capas)');
console.log('=================================\n');

// Mostrar fecha y hora actual del sistema
const fechaActual = new Date();
console.log(' FECHA Y HORA ACTUAL DEL SISTEMA:');
console.log(`   ${fechaActual.toLocaleString()}`);
console.log(`   (Esta es la referencia para validar si una cita está en el pasado)\n`);
console.log('---\n');

// Inicializar las capas
const repositorio = new RepositorioCitas();
const servicio = new ServicioCitas(repositorio);

// Ejemplo 1: Crear una cita
console.log(' Creando cita 1...');
try {
  const cita1 = servicio.crearCita(
    'Juan Pérez',
    'juan@example.com',
    'Dr. García',
    new Date('2026-04-15T10:00:00'),
    'Consulta general'
  );
  console.log(' Cita creada:');
  console.log(`   Paciente: ${cita1.nombrePaciente}`);
  console.log(`   Doctor: ${cita1.nombreDoctor}`);
  console.log(`   Estado: ${cita1.estado}`);
} catch (error) {
  console.log(' Error:', error.message);
}

console.log('\n---\n');

// Ejemplo 2: Crear otra cita
console.log(' Creando cita 2...');
try {
  const cita2 = servicio.crearCita(
    'María López',
    'maria@example.com',
    'Dr. Rodríguez',
    new Date('2026-05-20T14:30:00'),
    'Control de presión'
  );
  console.log(' Cita creada:');
  console.log(`   Paciente: ${cita2.nombrePaciente}`);
  console.log(`   Doctor: ${cita2.nombreDoctor}`);
  console.log(`   Estado: ${cita2.estado}`);
} catch (error) {
  console.log(' Error:', error.message);
}

console.log('\n---\n');

// Ejemplo 3: Intentar crear cita en el pasado (debe fallar)
console.log(' Intentando crear cita en el pasado...');
try {
  servicio.crearCita(
    'Pedro Gómez',
    'pedro@example.com',
    'Dr. Martínez',
    new Date('2020-01-01T10:00:00'),
    'Consulta'
  );
} catch (error) {
  console.log(' Error esperado:', error.message);
}

console.log('\n---\n');

// Ejemplo 4: Ver todas las citas
console.log(' Todas las citas:');
const todasLasCitas = servicio.obtenerTodasLasCitas();
todasLasCitas.forEach((cita, index) => {
  console.log(`\n${index + 1}. ${cita.nombrePaciente}`);
  console.log(`   Doctor: ${cita.nombreDoctor}`);
  console.log(`   Fecha: ${cita.fechaHora.toLocaleString()}`);
  console.log(`   Motivo: ${cita.motivo}`);
  console.log(`   Estado: ${cita.estado}`);
});

console.log('\n---\n');

// Ejemplo 5: Confirmar una cita
console.log(' Confirmando primera cita...');
const primeraId = todasLasCitas[0].id;
const confirmada = servicio.confirmarCita(primeraId);
console.log(`Estado actualizado: ${confirmada.estado}`);

console.log('\n---\n');

// Ejemplo 6: Ver citas de un paciente
console.log(' Buscando citas de juan@example.com...');
const citasJuan = servicio.obtenerCitasPaciente('juan@example.com');
console.log(`Encontradas ${citasJuan.length} cita(s):`);
citasJuan.forEach(cita => {
  console.log(`- ${cita.motivo} (${cita.estado})`);
});
