// Modelo: Representa una cita médica
class Cita {
  constructor(id, nombrePaciente, emailPaciente, nombreDoctor, fechaHora, motivo, estado) {
    this.id = id;
    this.nombrePaciente = nombrePaciente;
    this.emailPaciente = emailPaciente;
    this.nombreDoctor = nombreDoctor;
    this.fechaHora = fechaHora;
    this.motivo = motivo;
    this.estado = estado;
  }
}

module.exports = Cita;
