export interface PatientAppointment {
  id: string;
  doctorName: string;
  doctorSpecialty: string;
  doctorImage?: string;
  date: string;
  time: string;
  type: "consultation" | "followup" | "emergency";
  status: "completed" | "scheduled" | "cancelled" | "in-progress";
  fee: number;
  isPaid: boolean;
  diagnosis?: string;
  symptoms?: string;
}

export const patientAppointments: PatientAppointment[] = [
  {
    id: "PA001",
    doctorName: "დოქტორი სტეფან კუკი",
    doctorSpecialty: "კარდიოლოგი",
    date: "2025-11-02",
    time: "14:00",
    type: "consultation",
    status: "scheduled",
    fee: 100.0,
    isPaid: true,
    symptoms: "თავის ტკივილი, თავბრუსხვევა",
  },
  {
    id: "PA002",
    doctorName: "დოქტორი ალექს ზენდერი",
    doctorSpecialty: "კარდიოლოგი",
    date: "2024-10-26",
    time: "10:00",
    type: "followup",
    status: "scheduled",
    fee: 50.0,
    isPaid: true,
    diagnosis: "გულის არითმია",
  },
  {
    id: "PA003",
    doctorName: "დოქტორი სარა ჯონსონი",
    doctorSpecialty: "ნევროლოგი",
    date: "2024-10-25",
    time: "14:00",
    type: "consultation",
    status: "completed",
    fee: 100.0,
    isPaid: true,
    diagnosis: "მიგრენი",
    symptoms: "თავის ტკივილი, სინათლის მოუტანებლობა",
  },
  {
    id: "PA004",
    doctorName: "დოქტორი ემილი როდრიგესი",
    doctorSpecialty: "ორთოპედი",
    date: "2024-10-24",
    time: "15:30",
    type: "consultation",
    status: "completed",
    fee: 120.0,
    isPaid: true,
    diagnosis: "ხერხემლის ოსტეოქონდროზი",
    symptoms: "ზურგის ტკივილი",
  },
  {
    id: "PA005",
    doctorName: "დოქტორი ლარი ვილსონი",
    doctorSpecialty: "კარდიოლოგი",
    date: "2024-10-23",
    time: "11:00",
    type: "consultation",
    status: "completed",
    fee: 100.0,
    isPaid: true,
    diagnosis: "არტერიული ჰიპერტენზია",
    symptoms: "თავის ტკივილი, თავბრუსხვევა",
  },
];

