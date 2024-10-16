type RoomType = "single" | "double" | "suite";

class Reservation {
  constructor(
    public id: number,
    public guestName: string,
    public roomType: RoomType,
    public checkInDate: Date,
    public checkOutDate: Date
  ) {}
}

class ReservationSystem {
  private reservations: Reservation[] = [];
  private nextId: number = 1; // Para generar un ID único para cada reserva

  makeReservation(guestName: string, roomType: RoomType, checkInDate: Date, checkOutDate: Date): void {
    const newReservation = new Reservation(this.nextId++, guestName, roomType, checkInDate, checkOutDate);
    this.reservations.push(newReservation);
    console.log(`Reserva hecha para ${guestName}. ID: ${newReservation.id}`);
  }

  cancelReservation(id: number): void {
    const index = this.reservations.findIndex(reservation => reservation.id === id);
    if (index !== -1) {
      this.reservations.splice(index, 1);
      console.log(`Reserva con ID ${id} cancelada.`);
    } else {
      console.log(`Reserva con ID ${id} no encontrada.`);
    }
  }

  getReservationsByDate(date: Date): Reservation[] {
    return this.reservations.filter(reservation => 
      reservation.checkInDate <= date && reservation.checkOutDate >= date
    );
  }

  calculateOccupancy(month: number, year: number): number {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0); // Último día del mes
    const totalNights = endDate.getDate();

    let bookedNights = 0;

    for (const reservation of this.reservations) {
      const checkIn = reservation.checkInDate < startDate ? startDate : reservation.checkInDate;
      const checkOut = reservation.checkOutDate > endDate ? endDate : reservation.checkOutDate;
      
      const nights = Math.max(0, (checkOut.getTime() - checkIn.getTime()) / (1000 * 3600 * 24));
      bookedNights += nights;
    }

    const occupancyRate = (bookedNights / (totalNights * this.getTotalRooms())) * 100; // Asumiendo que tenemos un número fijo de habitaciones
    return occupancyRate;
  }

  private getTotalRooms(): number {
    // Asumiendo que hay 10 habitaciones de cada tipo
    return 10 * 3; // 10 habitaciones por tipo: single, double y suite
  }
}

// Ejemplo de uso
const reservationSystem = new ReservationSystem();

reservationSystem.makeReservation("Juan Pérez", "double", new Date(2024, 9, 1), new Date(2024, 9, 5));
reservationSystem.makeReservation("María López", "suite", new Date(2024, 9, 3), new Date(2024, 9, 10));

console.log(reservationSystem.getReservationsByDate(new Date(2024, 9, 4))); // Mostrar reservas para el 4 de octubre de 2024

console.log(`Tasa de ocupación: ${reservationSystem.calculateOccupancy(10, 2024).toFixed(2)}%`);

reservationSystem.cancelReservation(1); // Cancelar la primera reserva