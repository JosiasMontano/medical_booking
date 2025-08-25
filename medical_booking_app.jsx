import React from "react";

    
const doctors = [
    { id: 1, name: "Dr. Ana Martínez", specialty: "Cardiología", image: "https://placehold.co/100x100?text=Dr.+Ana" },
    { id: 2, name: "Dr. Carlos Ruiz", specialty: "Pediatría", image: "https://placehold.co/100x100?text=Dr.+Carlos" },
    { id: 3, name: "Dra. Laura Gómez", specialty: "Dermatología", image: "https://placehold.co/100x100?text=Dra.+Laura" },
    { id: 4, name: "Dr. Javier Sánchez", specialty: "Ortopedia", image: "https://placehold.co/100x100?text=Dr.+Javier" },
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
                        </div>
                    )}
                </div>
            ) : (
                <div className="confirmation-message"></div>
                )
            }
        </div>
   );
}
ReactDOM.render(<MedicalBookingApp />, document.getElementById("root"));


