// Servicio: Contiene la lógica de negocio (Capa 1)
const Cita = require('../models/Cita');

class ServicioCitas {
  constructor(repositorio) {
    this.repositorio = repositorio;
  }

  // Crear una nueva cita
  crearCita(nombrePaciente, emailPaciente, nombreDoctor, fechaHora, motivo) {
    // Validación: No permitir citas en el pasado
    // new Date() obtiene la fecha y hora actual del sistema operativo
    const ahora = new Date();
    
    if (fechaHora < ahora) {
      throw new Error('No se pueden agendar citas en el pasado');
    }

    // Crear la cita
    const cita = new Cita(
      this.generarId(),
      nombrePaciente,
      emailPaciente,
      nombreDoctor,
      fechaHora,
      motivo,
      'PENDIENTE'
    );

    // Guardar en el repositorio
    return this.repositorio.guardar(cita);
  }

  // Obtener todas las citas
  obtenerTodasLasCitas() {
    return this.repositorio.obtenerTodas();
  }

  // Obtener citas de un paciente
  obtenerCitasPaciente(email) {
    return this.repositorio.buscarPorEmailPaciente(email);
  }

  // Confirmar una cita
  confirmarCita(id) {
    const cita = this.repositorio.buscarPorId(id);
    
    if (!cita) {
      throw new Error('Cita no encontrada');
    }

    if (cita.estado === 'CANCELADA') {
      throw new Error('No se puede confirmar una cita cancelada');
    }

    cita.estado = 'CONFIRMADA';
    console.log(` Cita confirmada para ${cita.nombrePaciente}`);
    
    return cita;
  }

  // Cancelar una cita
  cancelarCita(id) {
    const cita = this.repositorio.buscarPorId(id);
    
    if (!cita) {
      throw new Error('Cita no encontrada');
    }

    cita.estado = 'CANCELADA';
    console.log(` Cita cancelada para ${cita.nombrePaciente}`);
    
    return cita;
  }

  // Generar ID único
  generarId() {
    return `cita-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}

module.exports = ServicioCitas;
