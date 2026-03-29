// ── Patients ────────────────────────────────────────────────
export const patients = [
  { id: 'P-00248', name: 'Amara Kamau',    age: 34, gender: 'Female', dob: '1990-03-12', blood: 'B+',  phone: '+260 77 123 4567', doctor: 'Dr. Faith Moyo',    ward: 'Ward A', diagnosis: 'Hypertension',       status: 'Active',     admitted: '2026-03-27', allergies: 'Penicillin',      avatar: 'AK', color: '#2563eb' },
  { id: 'P-00247', name: 'Lila Mwansa',    age: 58, gender: 'Female', dob: '1966-08-21', blood: 'A+',  phone: '+260 96 234 5678', doctor: 'Dr. Kelvin Chirwa', ward: 'Ward B', diagnosis: 'Migraine Disorder',  status: 'Admitted',   admitted: '2026-03-26', allergies: 'None',            avatar: 'LM', color: '#7c3aed' },
  { id: 'P-00246', name: 'James Nkosi',    age: 42, gender: 'Male',   dob: '1983-11-05', blood: 'O-',  phone: '+260 95 345 6789', doctor: 'Dr. Ruth Banda',    ward: 'Ward C', diagnosis: 'Fractured Femur',   status: 'Scheduled',  admitted: '2026-03-25', allergies: 'Sulfa drugs',     avatar: 'JN', color: '#059669' },
  { id: 'P-00245', name: 'Fatima Osei',    age: 29, gender: 'Female', dob: '1997-01-18', blood: 'AB+', phone: '+260 97 456 7890', doctor: 'Dr. Faith Moyo',    ward: 'Ward A', diagnosis: 'Type 2 Diabetes',  status: 'Active',     admitted: '2026-03-24', allergies: 'Aspirin',         avatar: 'FO', color: '#dc2626' },
  { id: 'P-00244', name: 'Bongani Thabo',  age: 67, gender: 'Male',   dob: '1959-06-30', blood: 'O+',  phone: '+260 76 567 8901', doctor: 'Dr. Kelvin Chirwa', ward: 'Ward B', diagnosis: 'Stroke Recovery',   status: 'Discharged', admitted: '2026-03-23', allergies: 'Ibuprofen',       avatar: 'BT', color: '#d97706' },
  { id: 'P-00243', name: 'Kezia Dlamini',  age: 51, gender: 'Female', dob: '1974-09-14', blood: 'A-',  phone: '+260 78 678 9012', doctor: 'Dr. Ruth Banda',    ward: 'Ward C', diagnosis: 'Knee Arthritis',   status: 'Scheduled',  admitted: '2026-03-22', allergies: 'None',            avatar: 'KD', color: '#0891b2' },
  { id: 'P-00242', name: 'Samuel Phiri',   age: 38, gender: 'Male',   dob: '1987-04-22', blood: 'B-',  phone: '+260 79 789 0123', doctor: 'Dr. Peter Zulu',    ward: 'Ward D', diagnosis: 'Pneumonia',        status: 'Admitted',   admitted: '2026-03-21', allergies: 'Codeine',         avatar: 'SP', color: '#0f766e' },
  { id: 'P-00241', name: 'Naledi Dube',    age: 23, gender: 'Female', dob: '2002-12-03', blood: 'AB-', phone: '+260 77 890 1234', doctor: 'Dr. Grace Ngoma',   ward: 'Ward A', diagnosis: 'Anaemia',          status: 'Active',     admitted: '2026-03-20', allergies: 'Latex',           avatar: 'ND', color: '#be185d' },
  { id: 'P-00240', name: 'Chisomo Banda',  age: 45, gender: 'Male',   dob: '1980-07-09', blood: 'A+',  phone: '+260 96 901 2345', doctor: 'Dr. Faith Moyo',    ward: 'Ward A', diagnosis: 'Cardiac Arrhythmia', status: 'Admitted', admitted: '2026-03-19', allergies: 'None',            avatar: 'CB', color: '#1d4ed8' },
  { id: 'P-00239', name: 'Thandiwe Moyo',  age: 60, gender: 'Female', dob: '1965-02-17', blood: 'O+',  phone: '+260 95 012 3456', doctor: 'Dr. Peter Zulu',    ward: 'Ward D', diagnosis: 'COPD',             status: 'Discharged', admitted: '2026-03-18', allergies: 'Aspirin',         avatar: 'TM', color: '#047857' },
]

// ── Doctors ──────────────────────────────────────────────────
export const doctors = [
  { id: 'D-001', name: 'Dr. Faith Moyo',    specialty: 'Cardiology',      patients: 8,  days: 'Mon – Fri', status: 'Available',   avatar: 'FM', color: '#2563eb', qualifications: 'MBChB, PhD Cardiology',   email: 'f.moyo@medicore.zw',    phone: '+260 77 100 0001', bio: 'Over 15 years experience in cardiac care and interventional cardiology.' },
  { id: 'D-002', name: 'Dr. Kelvin Chirwa', specialty: 'Neurology',       patients: 6,  days: 'Tue – Sat', status: 'In Surgery',  avatar: 'KC', color: '#7c3aed', qualifications: 'MBChB, FRCP Neurology',   email: 'k.chirwa@medicore.zw',  phone: '+260 96 100 0002', bio: 'Specialist in stroke management, epilepsy and neurodegenerative disorders.' },
  { id: 'D-003', name: 'Dr. Ruth Banda',    specialty: 'Orthopaedics',    patients: 5,  days: 'Mon – Thu', status: 'Available',   avatar: 'RB', color: '#059669', qualifications: 'MBChB, FRCS Orthopaedics', email: 'r.banda@medicore.zw',   phone: '+260 95 100 0003', bio: 'Expert in joint replacement, fractures, and sports medicine.' },
  { id: 'D-004', name: 'Dr. Peter Zulu',    specialty: 'Paediatrics',     patients: 10, days: 'Mon – Fri', status: 'Available',   avatar: 'PZ', color: '#dc2626', qualifications: 'MBChB, MRCPCH',           email: 'p.zulu@medicore.zw',    phone: '+260 97 100 0004', bio: 'Dedicated to newborn care, childhood development, and infectious diseases.' },
  { id: 'D-005', name: 'Dr. Grace Ngoma',   specialty: 'General Medicine', patients: 9, days: 'Wed – Sun', status: 'Off Duty',    avatar: 'GN', color: '#0891b2', qualifications: 'MBChB, MRCP',             email: 'g.ngoma@medicore.zw',   phone: '+260 78 100 0005', bio: 'Broad clinical expertise with a focus on preventive care and chronic disease management.' },
  { id: 'D-006', name: 'Dr. Isaiah Tembo',  specialty: 'Oncology',        patients: 4,  days: 'Mon – Fri', status: 'Available',   avatar: 'IT', color: '#be185d', qualifications: 'MBChB, ESMO Oncology',    email: 'i.tembo@medicore.zw',   phone: '+260 79 100 0006', bio: 'Cancer specialist with expertise in chemotherapy protocols and palliative care.' },
]

// ── Appointments ─────────────────────────────────────────────
export const appointments = [
  { id: 'A-0034', patient: 'Amara Kamau',   patientId: 'P-00248', doctor: 'Dr. Faith Moyo',    specialty: 'Cardiology',      reason: 'Follow-up ECG',       time: '08:00', date: '2026-03-28', status: 'Confirmed', avatar: 'AK', color: '#2563eb' },
  { id: 'A-0033', patient: 'Lila Mwansa',   patientId: 'P-00247', doctor: 'Dr. Kelvin Chirwa', specialty: 'Neurology',       reason: 'MRI Review',          time: '09:30', date: '2026-03-28', status: 'Confirmed', avatar: 'LM', color: '#7c3aed' },
  { id: 'A-0032', patient: 'James Nkosi',   patientId: 'P-00246', doctor: 'Dr. Ruth Banda',    specialty: 'Orthopaedics',    reason: 'X-Ray Consult',       time: '10:45', date: '2026-03-28', status: 'Pending',   avatar: 'JN', color: '#059669' },
  { id: 'A-0031', patient: 'Fatima Osei',   patientId: 'P-00245', doctor: 'Dr. Faith Moyo',    specialty: 'General Medicine', reason: 'Annual Check-up',    time: '13:00', date: '2026-03-28', status: 'Confirmed', avatar: 'FO', color: '#dc2626' },
  { id: 'A-0030', patient: 'Bongani Thabo', patientId: 'P-00244', doctor: 'Dr. Kelvin Chirwa', specialty: 'Neurology',       reason: 'Discharge Review',    time: '15:15', date: '2026-03-28', status: 'Cancelled', avatar: 'BT', color: '#d97706' },
  { id: 'A-0029', patient: 'Kezia Dlamini', patientId: 'P-00243', doctor: 'Dr. Ruth Banda',    specialty: 'Orthopaedics',    reason: 'Pre-op Assessment',   time: '08:30', date: '2026-03-29', status: 'Confirmed', avatar: 'KD', color: '#0891b2' },
  { id: 'A-0028', patient: 'Samuel Phiri',  patientId: 'P-00242', doctor: 'Dr. Peter Zulu',    specialty: 'Paediatrics',     reason: 'Lung Function Test',  time: '11:00', date: '2026-03-29', status: 'Pending',   avatar: 'SP', color: '#0f766e' },
  { id: 'A-0027', patient: 'Naledi Dube',   patientId: 'P-00241', doctor: 'Dr. Grace Ngoma',   specialty: 'General Medicine', reason: 'Blood Panel Review', time: '14:30', date: '2026-03-29', status: 'Confirmed', avatar: 'ND', color: '#be185d' },
]

// ── Wards ────────────────────────────────────────────────────
export const wards = [
  { id: 'W-A', name: 'Ward A', specialty: 'Cardiology',      total: 12, beds: ['O','O','O','O','A','A','O','O','A','O','R','A'], color: '#2563eb', fillColor: '#2563eb' },
  { id: 'W-B', name: 'Ward B', specialty: 'Neurology',       total: 10, beds: ['O','A','O','A','O','A','A','O','A','A'], color: '#7c3aed', fillColor: '#7c3aed' },
  { id: 'W-C', name: 'Ward C', specialty: 'Paediatrics',     total: 8,  beds: ['O','O','O','O','A','O','O','O'], color: '#059669', fillColor: '#059669' },
  { id: 'W-D', name: 'Ward D', specialty: 'General Medicine', total: 15, beds: ['O','O','A','O','O','A','A','O','R','O','A','O','O','R','A'], color: '#d97706', fillColor: '#d97706' },
]

// ── Invoices ─────────────────────────────────────────────────
export const invoices = [
  { id: 'INV-0052', patient: 'Amara Kamau',   patientId: 'P-00248', date: '2026-03-27', amount: 320.00, status: 'Paid',    avatar: 'AK', color: '#2563eb', items: [{ desc: 'Consultation Fee', amount: 120.00 }, { desc: 'ECG Test', amount: 80.00 }, { desc: 'Medication (Amlodipine)', amount: 120.00 }] },
  { id: 'INV-0051', patient: 'Lila Mwansa',   patientId: 'P-00247', date: '2026-03-26', amount: 850.00, status: 'Pending', avatar: 'LM', color: '#7c3aed', items: [{ desc: 'Consultation Fee', amount: 150.00 }, { desc: 'MRI Scan', amount: 450.00 }, { desc: 'Medication', amount: 95.00 }, { desc: 'Nursing Care (2 days)', amount: 155.00 }] },
  { id: 'INV-0050', patient: 'James Nkosi',   patientId: 'P-00246', date: '2026-03-25', amount: 1240.00, status: 'Pending', avatar: 'JN', color: '#059669', items: [{ desc: 'Consultation Fee', amount: 150.00 }, { desc: 'X-Ray (2 views)', amount: 240.00 }, { desc: 'Surgical Theatre', amount: 600.00 }, { desc: 'Post-op Medication', amount: 250.00 }] },
  { id: 'INV-0049', patient: 'Fatima Osei',   patientId: 'P-00245', date: '2026-03-24', amount: 180.00, status: 'Paid',    avatar: 'FO', color: '#dc2626', items: [{ desc: 'Consultation Fee', amount: 120.00 }, { desc: 'Blood Panel', amount: 60.00 }] },
  { id: 'INV-0048', patient: 'Bongani Thabo', patientId: 'P-00244', date: '2026-03-23', amount: 2100.00, status: 'Overdue', avatar: 'BT', color: '#d97706', items: [{ desc: 'Consultation Fee', amount: 150.00 }, { desc: 'MRI Brain Scan', amount: 600.00 }, { desc: 'ICU Stay (3 days)', amount: 1050.00 }, { desc: 'Medication & Infusions', amount: 300.00 }] },
  { id: 'INV-0047', patient: 'Kezia Dlamini', patientId: 'P-00243', date: '2026-03-22', amount: 440.00, status: 'Paid',    avatar: 'KD', color: '#0891b2', items: [{ desc: 'Consultation Fee', amount: 120.00 }, { desc: 'Joint X-Ray', amount: 180.00 }, { desc: 'Physiotherapy (2 sessions)', amount: 140.00 }] },
]

// ── Medical Records ──────────────────────────────────────────
export const records = [
  { patientId: 'P-00248', patientName: 'Amara Kamau', avatar: 'AK', color: '#2563eb', visits: [
    { date: '2026-03-27', doctor: 'Dr. Faith Moyo', diagnosis: 'Hypertension Stage 2', notes: 'Patient presents with elevated BP 160/95. ECG normal sinus rhythm. Advised DASH diet, reduce sodium intake. Prescribed Amlodipine 5mg daily. Follow-up in 2 weeks.', prescription: ['Amlodipine 5mg — once daily', 'Enalapril 10mg — twice daily'], tests: ['ECG — Normal', 'Blood Pressure Monitoring'] },
    { date: '2026-02-14', doctor: 'Dr. Faith Moyo', diagnosis: 'Hypertension Stage 1', notes: 'First visit. BP 148/90. Initiated lifestyle modifications. No medications at this stage.', prescription: [], tests: ['Full Blood Count — Normal', 'Lipid Panel — Elevated LDL'] },
  ]},
  { patientId: 'P-00247', patientName: 'Lila Mwansa', avatar: 'LM', color: '#7c3aed', visits: [
    { date: '2026-03-26', doctor: 'Dr. Kelvin Chirwa', diagnosis: 'Chronic Migraine Disorder', notes: 'Patient reports 3–4 migraines/month lasting 12–24hrs. MRI Brain: no structural lesions. Prescribed preventive therapy. Advised migraine diary.', prescription: ['Propranolol 40mg — twice daily', 'Sumatriptan 50mg — as needed'], tests: ['MRI Brain — No abnormality', 'Visual Field Test — Normal'] },
  ]},
  { patientId: 'P-00246', patientName: 'James Nkosi', avatar: 'JN', color: '#059669', visits: [
    { date: '2026-03-25', doctor: 'Dr. Ruth Banda', diagnosis: 'Fractured Femur (Right)', notes: 'Trauma admission following road traffic accident. X-ray confirms displaced mid-shaft fracture right femur. Patient stable. Scheduled for ORIF surgery tomorrow AM.', prescription: ['Morphine 10mg IV — PRN', 'Enoxaparin 40mg — once daily'], tests: ['X-Ray Right Femur — Displaced fracture', 'CT Angiogram — No vascular injury'] },
  ]},
]

// ── Revenue data for chart ───────────────────────────────────
export const revenueData = [
  { month: 'Oct', revenue: 12400, target: 14000 },
  { month: 'Nov', revenue: 15800, target: 14000 },
  { month: 'Dec', revenue: 13200, target: 14000 },
  { month: 'Jan', revenue: 16400, target: 16000 },
  { month: 'Feb', revenue: 14900, target: 16000 },
  { month: 'Mar', revenue: 18400, target: 16000 },
]

// ── Specialty distribution ──────────────────────────────────
export const specialtyData = [
  { name: 'Cardiology', value: 68 },
  { name: 'Neurology',  value: 42 },
  { name: 'Orthopaedics', value: 38 },
  { name: 'Paediatrics', value: 51 },
  { name: 'General', value: 49 },
]
