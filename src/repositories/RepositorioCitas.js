// Repositorio: Maneja el almacenamiento de citas (Capa 2)
class RepositorioCitas {
  constructor() {
    this.citas = [];
  }

  // Guardar una cita
  guardar(cita) {
    this.citas.push(cita);
    return cita;
  }

  // Obtener todas las citas
  obtenerTodas() {
    return this.citas;
  }

  // Buscar cita por ID
  buscarPorId(id) {
    return this.citas.find(cita => cita.id === id);
  }

  // Buscar citas por email del paciente
  buscarPorEmailPaciente(email) {
    return this.citas.filter(cita => cita.emailPaciente === email);
  }
}

module.exports = RepositorioCitas;
