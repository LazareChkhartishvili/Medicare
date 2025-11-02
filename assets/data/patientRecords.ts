export interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
}

export interface FollowUp {
  required: boolean;
  date?: string;
  reason?: string;
}

export interface Form100 {
  id: string;
  issueDate: string;
  validUntil: string;
  reason: string;
  diagnosis: string;
  recommendations: string;
  pdfUrl?: string;
}

export interface VisitRecord {
  id: string;
  date: string;
  doctorName: string;
  doctorSpecialty: string;
  diagnosis: string;
  symptoms: string[];
  medications: Medication[];
  followUp: FollowUp;
  notes: string;
  vitalSigns: {
    bloodPressure: string;
    heartRate: string;
    temperature: string;
    weight: string;
  };
  form100?: Form100;
}

export const patientVisits: VisitRecord[] = [
  {
    id: "V001",
    date: "2024-10-20",
    doctorName: "დოქტორი გიორგი მელაძე",
    doctorSpecialty: "კარდიოლოგი",
    diagnosis: "მსუბუქი ჰიპერტენზია",
    symptoms: ["თავის ტკივილი", "თავბრუსხვევა", "დაღლილობა"],
    medications: [
      {
        name: "ენალაპრილი",
        dosage: "10 მგ",
        frequency: "დღეში 1-ჯერ",
        duration: "1 თვე",
        instructions: "დილით ჭამის შემდეგ",
      },
      {
        name: "ასპირინი",
        dosage: "100 მგ",
        frequency: "დღეში 1-ჯერ",
        duration: "მუდმივად",
        instructions: "საღამოს ჭამის შემდეგ",
      },
    ],
    followUp: {
      required: true,
      date: "2024-11-20",
      reason: "არტერიული წნევის კონტროლი და ანალიზების შემოწმება",
    },
    notes:
      "პაციენტს მიეცა რეკომენდაცია მარილის შემცირებაზე, რეგულარული ფიზიკური აქტივობისა და წონის კონტროლისთვის. საჭიროა არტერიული წნევის ყოველდღიური მონიტორინგი.",
    vitalSigns: {
      bloodPressure: "145/90",
      heartRate: "78 bpm",
      temperature: "36.6°C",
      weight: "82 კგ",
    },
    form100: {
      id: "F100-001",
      issueDate: "2024-10-20",
      validUntil: "2024-10-27",
      reason: "არტერიული ჰიპერტენზიის გამო",
      diagnosis: "მსუბუქი არტერიული ჰიპერტენზია (I10)",
      recommendations:
        "რეკომენდებულია შრომისგან განთავისუფლება 7 დღის ვადით. საჭიროა სრული დასვენება, არტერიული წნევის ყოველდღიური მონიტორინგი და დანიშნული მედიკამენტების მიღება. თავი აარიდეთ ფიზიკურ დატვირთვას და სტრესულ სიტუაციებს.",
      pdfUrl: "https://example.com/forms/F100-001.pdf",
    },
  },
  {
    id: "V002",
    date: "2024-10-15",
    doctorName: "დოქტორი ნინო ბერიძე",
    doctorSpecialty: "ოტორინოლარინგოლოგი",
    diagnosis: "ბაქტერიული ანგინა",
    symptoms: ["ყელის ტკივილი", "ცხელება", "სირთულე გადაყლაპვისას"],
    medications: [
      {
        name: "ამოქსიცილინი",
        dosage: "500 მგ",
        frequency: "დღეში 3-ჯერ",
        duration: "7 დღე",
        instructions: "ჭამის შემდეგ 8 საათში ერთხელ",
      },
      {
        name: "იბუპროფენი",
        dosage: "400 მგ",
        frequency: "საჭიროების შემთხვევაში",
        duration: "5 დღე",
        instructions: "ტკივილის ან ცხელების დროს",
      },
      {
        name: "ანტისეპტიკური სპრეი",
        dosage: "2-3 შპრიცი",
        frequency: "დღეში 4-5-ჯერ",
        duration: "10 დღე",
        instructions: "ჭამის შემდეგ 30 წუთში",
      },
    ],
    followUp: {
      required: true,
      date: "2024-10-25",
      reason: "ინფექციის განვითარების შემოწმება და ანტიბიოტიკის ეფექტურობა",
    },
    notes:
      "რეკომენდებულია ბევრი სითხის მიღება, დასვენება და თბილი სასმელები. თუ 3 დღის შემდეგ სიმპტომები არ გაუმჯობესდება, დაუყოვნებლივ მიმართეთ ექიმს.",
    vitalSigns: {
      bloodPressure: "120/80",
      heartRate: "88 bpm",
      temperature: "38.2°C",
      weight: "75 კგ",
    },
    form100: {
      id: "F100-002",
      issueDate: "2024-10-15",
      validUntil: "2024-10-20",
      reason: "მწვავე ბაქტერიული ანგინის გამო",
      diagnosis: "მწვავე ბაქტერიული ანგინა (J03.9)",
      recommendations:
        "რეკომენდებულია შინ დარჩენა და შრომისგან განთავისუფლება 5 დღის ვადით. აუცილებელია ანტიბიოტიკების კურსის სრული გავლა, ბევრი სითხის მიღება და დასვენება. თავი აარიდეთ ცივ და თბილ ჰაერს.",
      pdfUrl: "https://example.com/forms/F100-002.pdf",
    },
  },
  {
    id: "V003",
    date: "2024-10-10",
    doctorName: "დოქტორი დავით ხარაიშვილი",
    doctorSpecialty: "გასტროენტეროლოგი",
    diagnosis: "გასტრიტი",
    symptoms: [
      "კუჭის ტკივილი",
      "გულისრევა",
      "მადის დაქვეითება",
      "მძიმე შეგრძნება ჭამის შემდეგ",
    ],
    medications: [
      {
        name: "ომეპრაზოლი",
        dosage: "20 მგ",
        frequency: "დღეში 1-ჯერ",
        duration: "1 თვე",
        instructions: "დილით ჭამამდე 30 წუთით ადრე",
      },
      {
        name: "მოტილიუმი",
        dosage: "10 მგ",
        frequency: "დღეში 3-ჯერ",
        duration: "2 კვირა",
        instructions: "ჭამამდე 15 წუთით ადრე",
      },
    ],
    followUp: {
      required: true,
      date: "2024-11-10",
      reason:
        "სიმპტომების შეფასება და საჭიროების შემთხვევაში ენდოსკოპიის დანიშვნა",
    },
    notes:
      "რეკომენდებულია დიეტის დაცვა: გამორიცხეთ ცხარე, მჟავე და ცხიმიანი საკვები. თავი აარიდეთ ალკოჰოლს, კოფეინსა და მწვანე კომბოსტოს. რეგულარული ჭამა მცირე ულუფებით.",
    vitalSigns: {
      bloodPressure: "118/75",
      heartRate: "72 bpm",
      temperature: "36.5°C",
      weight: "78 კგ",
    },
  },
  {
    id: "V004",
    date: "2024-09-28",
    doctorName: "დოქტორი მარიამ კვირიკაშვილი",
    doctorSpecialty: "დერმატოლოგი",
    diagnosis: "ალერგიული დერმატიტი",
    symptoms: ["კანის გაღიზიანება", "ქავილი", "გამონაყარი", "სიწითლე"],
    medications: [
      {
        name: "ცეტირიზინი",
        dosage: "10 მგ",
        frequency: "დღეში 1-ჯერ",
        duration: "2 კვირა",
        instructions: "საღამოს ძილის წინ",
      },
      {
        name: "ჰიდროკორტიზონის მალამო",
        dosage: "1% კრემი",
        frequency: "დღეში 2-ჯერ",
        duration: "10 დღე",
        instructions: "წაისვით თხელი ფენით დაზიანებულ უბანზე",
      },
    ],
    followUp: {
      required: false,
      reason: "საჭიროების შემთხვევაში თუ სიმპტომები არ გაუმჯობესდება",
    },
    notes:
      "ალერგენის იდენტიფიკაციისთვის რეკომენდებულია ალერგოლოგთან კონსულტაცია. თავი აარიდეთ სინთეზურ ქსოვილებს და აგრესიულ საწმენდ საშუალებებს.",
    vitalSigns: {
      bloodPressure: "115/72",
      heartRate: "68 bpm",
      temperature: "36.4°C",
      weight: "70 კგ",
    },
  },
  {
    id: "V005",
    date: "2024-09-15",
    doctorName: "დოქტორი ლევან გელაშვილი",
    doctorSpecialty: "ტრავმატოლოგი-ორთოპედი",
    diagnosis: "მარცხენა წვივის დაჭიმვა",
    symptoms: ["ტკივილი წვივში", "შეშუპება", "სირთულე სიარულისას"],
    medications: [
      {
        name: "დიკლოფენაკი",
        dosage: "75 მგ",
        frequency: "დღეში 2-ჯერ",
        duration: "7 დღე",
        instructions: "ჭამის შემდეგ",
      },
      {
        name: "ტრომბექსის გელი",
        dosage: "არაოპერაციული",
        frequency: "დღეში 3-ჯერ",
        duration: "2 კვირა",
        instructions: "მსუბუქად მასაჟით დაზიანებულ ადგილას",
      },
    ],
    followUp: {
      required: true,
      date: "2024-10-15",
      reason: "განმეორებითი რენტგენი და მკურნალობის ეფექტურობის შეფასება",
    },
    notes:
      "რეკომენდებულია კიდურის იმობილიზაცია ელასტიური ბანდაჟით, ცივი კომპრესები პირველი 48 საათის განმავლობაში, კიდურის აწევა დასვენების დროს. თავი აარიდეთ ძლიერ ფიზიკურ დატვირთვას 3 კვირის განმავლობაში.",
    vitalSigns: {
      bloodPressure: "125/82",
      heartRate: "75 bpm",
      temperature: "36.7°C",
      weight: "85 კგ",
    },
  },
];
