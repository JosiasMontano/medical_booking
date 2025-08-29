import React from "react";

    
const doctors = [
    { id: 1, name: "Dr. Ana Martínez", specialty: "Cardiología", image: "https://thumbs.dreamstime.com/z/portrait-positive-young-doctor-17425454.jpg" },
    { id: 2, name: "Dr. Carlos Ruiz", specialty: "Pediatría", image: "https://www.adiratechserve.com/wp-content/uploads/2016/05/our_team_4.jpg" },
    { id: 3, name: "Dra. Laura Gómez", specialty: "Dermatología", image: "https://tse4.mm.bing.net/th/id/OIP.ynLvvq5xBKo9VlrJoNZWvgHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3" },
    { id: 4, name: "Dr. Javier Sánchez", specialty: "Ortopedia", image: "https://tse2.mm.bing.net/th/id/OIP.eH622VPOfskqX-gnnfRrGwHaHa?r=0&w=626&h=626&rs=1&pid=ImgDetMain&o=7&rm=3" },
];

const availableSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM", 
    "12:00 PM", "02:00 PM", "03:00 PM", 
    "04:00 PM", "05:00 PM"
];

const existingAppointments = [
    { doctorId: 1, date: "2023-06-20", time: "10:00 AM", patientName: "Paciente Ejemplo 1" },
    { doctorId: 2, date: "2023-06-20", time: "02:00 PM", patientName: "Paciente Ejemplo 2" }
];

const MedicalBookingApp = () => {
    const [selectedDoctor, setSelectedDoctor] = React.useState(null);
    const [selectedDate, setSelectedDate] = React.useState(new Date());
    const [selectedTime, setSelectedTime] = React.useState(null);
    const [patientInfo, setPatientInfo] = React.useState({
        name: "",
        email: "",
        phone: "",
        notes: ""
    });
    const [isConfirmed, setIsConfirmed] = React.useState(false);
    
    const formatDate = (date) => {
        return date.toISOString().split('T')[0];
    };
    
    const changeDate = (days) => {
        const newDate = new Date(selectedDate);
        newDate.setDate(newDate.getDate() + days);
        setSelectedDate(newDate);
        setSelectedTime(null); 
    };
    
    const handleTimeSelect = (time) => {
        setSelectedTime(time);
    };
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPatientInfo({
            ...patientInfo,
            [name]: value
        });
    };
    
    const isBooked = (time) => {
        const formattedDate = formatDate(selectedDate);
        return existingAppointments.some(appt => 
            appt.doctorId === selectedDoctor?.id && 
            appt.date === formattedDate && 
            appt.time === time
        );
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        console.log("Cita agendada:", {
            doctor: selectedDoctor,
            date: formatDate(selectedDate),
            time: selectedTime,
            patient: patientInfo
        });
        
        setIsConfirmed(true);
        
        setTimeout(() => {
            setSelectedDoctor(null);
            setSelectedTime(null);
            setPatientInfo({ name: "", email: "", phone: "", notes: "" });
            setIsConfirmed(false);
        }, 50000);
    };
    const canSubmit = selectedDoctor && selectedTime && 
                     patientInfo.name && (patientInfo.email || patientInfo.phone);
    
    return (
        <div className="booking-container">
            <header className="app-header">
                <h1><i className="fas fa-calendar-check"></i> Reserva de Citas Médicas</h1>
                <p>Sistema de agendamiento en línea</p>
            </header>
            
            {!isConfirmed ? (
                <div className="main-content">
                    <div className="doctor-list">
                        <h2>Seleccione un médico</h2>
                        {doctors.map(doctor => (
                            <div 
                                key={doctor.id}
                                className={`doctor-card ${selectedDoctor?.id === doctor.id ? 'selected' : ''}`}
                                onClick={() => setSelectedDoctor(doctor)}
                            >
                                <h3 className="doctor-name">
                                    <img 
                                        src={doctor.image} 
                                        alt={`Foto del ${doctor.name}, especialista en ${doctor.specialty}`}
                                        style={{width: '40px', borderRadius: '50%', marginRight: '10px'}} 
                                    />
                                    {doctor.name}
                                </h3>
                                <p className="doctor-specialty">{doctor.specialty}</p>
                            </div>
                        ))}
                    </div>
                    
                    {selectedDoctor && (
                        <div className="booking-calendar">
                            <div className="calendar-header">
                                <div>
                                    <h2 className="calendar-title">
                                        {selectedDate.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}
                                    </h2>
                                </div>
                                <div className="calendar-nav">
                                    <button onClick={() => changeDate(-1)}>
                                        <i className="fas fa-chevron-left"></i>
                                    </button>
                                    <button onClick={() => setSelectedDate(new Date())}>
                                        Hoy
                                    </button>
                                    <button onClick={() => changeDate(1)}>
                                        <i className="fas fa-chevron-right"></i>
                                    </button>
                                </div>
                            </div>
                            <div className="time-slots">
                                {availableSlots.map(time => (
                                    <button
                                        key={time}
                                        className={`time-slot ${
                                            isBooked(time) ? 'booked' : 
                                            selectedTime === time ? 'selected' : ''
                                        }`}
                                        onClick={() => !isBooked(time) && handleTimeSelect(time)}
                                        disabled={isBooked(time)}
                                    >
                                        {time}
                                    </button>
                                ))}
                            </div>

                            {selectedTime && (                    
                                <form className="booking-form" onSubmit={handleSubmit}>
                                    <h3>Datos del Paciente</h3>    
                                    
                                    <div className="form-group">
                                        <label>Nombre completo</label>
                                        <input 
                                            type="text" 
                                            name="name"
                                            value={patientInfo.name}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    
                                    <div className="form-group">
                                        <label>Correo electrónico</label>
                                        <input 
                                            type="email" 
                                            name="email"
                                            value={patientInfo.email}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    
                                    <div className="form-group">
                                        <label>Teléfono</label>
                                        <input 
                                            type="tel" 
                                            name="phone"
                                            value={patientInfo.phone}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    
                                    <div className="form-group">
                                        <label>Notas adicionales (opcional)</label>
                                        <textarea 
                                            name="notes"
                                            value={patientInfo.notes}
                                            onChange={handleInputChange}
                                            rows="3"
                                        ></textarea>
                                    </div>
                                    
                                    <div className="form-group">
                                        <p>
                                            <strong>Cita con:</strong> {selectedDoctor.name}<br />
                                            <strong>Fecha:</strong> {selectedDate.toLocaleDateString()}<br />
                                            <strong>Hora:</strong> {selectedTime}
                                        </p>
                                    </div>
                                    
                                    <button type="submit" disabled={!canSubmit}>
                                        Confirmar Cita
                                    </button>
                                </form>                            
                            )}
                        </div>                                    
                    )}
                </div>                                             
            ) : (
                <div className="confirmation">
                    <h2><i className="fas fa-check-circle"></i> Cita Confirmada</h2>
                    <p>Hemos programado tu cita con {selectedDoctor.name} para el {selectedDate.toLocaleDateString()} a las {selectedTime}.</p>
                    <p>Te enviaremos los detalles a {patientInfo.email || patientInfo.phone}.</p>
                </div>
            )}
        </div>
    );
};

ReactDOM.render(<MedicalBookingApp />, document.getElementById('root'));


