// Simulated data
const doctors = [
    { id: 1, name: "Dr. John Doe", email: "john@example.com", password: "1234", specialization: "Cardiology" },
    { id: 2, name: "Dr. Alice Smith", email: "alice@example.com", password: "1234", specialization: "Dermatology" }
];

const appointmentsData = [
    { id: 1, doctorId: 1, patientName: "Jane Smith", time: "10:00 AM", status: "Pending", prescription: "" },
    { id: 2, doctorId: 1, patientName: "Mark Lee", time: "11:00 AM", status: "Pending", prescription: "" },
    { id: 3, doctorId: 2, patientName: "Lucy Brown", time: "09:30 AM", status: "Pending", prescription: "" }
];

// ----- LOGIN PAGE -----
const loginForm = document.getElementById('doctorLoginForm');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const doctor = doctors.find(d => d.email === email && d.password === password);
        const loginError = document.getElementById('loginError');

        if (doctor) {
            // Store doctor info in localStorage and redirect
            localStorage.setItem('loggedDoctorId', doctor.id);
            window.location.href = "dashboard.html";
        } else {
            loginError.textContent = "Invalid email or password!";
        }
    });
}

// ----- DASHBOARD PAGE -----
const doctorId = localStorage.getItem('loggedDoctorId');
if (doctorId) {
    const doctor = doctors.find(d => d.id == doctorId);
    if (doctor) {
        document.getElementById('doctorName').textContent = doctor.name;
        document.getElementById('profileName').textContent = doctor.name;
        document.getElementById('profileSpecialization').textContent = doctor.specialization;

        const table = document.getElementById('appointmentsTable');
        const doctorAppointments = appointmentsData.filter(a => a.doctorId == doctorId);

        doctorAppointments.forEach(app => {
            const row = table.insertRow();
            row.insertCell(0).textContent = app.patientName;
            row.insertCell(1).textContent = app.time;
            row.insertCell(2).textContent = app.status;
            const actionsCell = row.insertCell(3);
            actionsCell.innerHTML = `
        <button onclick="updateStatus(${app.id}, 'Attended')">Attended</button>
        <button onclick="updateStatus(${app.id}, 'Not Attended')">Not Attended</button>
        <button onclick="addPrescription(${app.id})">Add Prescription</button>
      `;
        });
    }
}

// ----- FUNCTIONS -----
function updateStatus(appointmentId, status) {
    const appointment = appointmentsData.find(a => a.id === appointmentId);
    if (appointment) {
        appointment.status = status;
        alert(`Status updated to "${status}"`);
        location.reload();
    }
}

function addPrescription(appointmentId) {
    const appointment = appointmentsData.find(a => a.id === appointmentId);
    if (appointment) {
        const prescription = prompt(`Enter prescription for ${appointment.patientName}:`);
        if (prescription) {
            appointment.prescription = prescription;
            alert("Prescription saved!");
        }
    }
}