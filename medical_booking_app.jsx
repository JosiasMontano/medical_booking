
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
};