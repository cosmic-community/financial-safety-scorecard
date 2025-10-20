export interface FormData {
  // Personal Information
  name: string;
  mobile: string;
  dob: string;
  gender: 'Male' | 'Female' | 'Other' | '';
  
  // Employment Information
  employmentType: 'Salaried' | 'Business' | '';
  companyName: string;
  monthlyIncome: string;
  
  // Housing
  houseType: 'Own' | 'Rented' | '';
  
  // Family
  familyMembers: string[];
  
  // Vehicles
  twoWheelersCount: number;
  twoWheelerNumbers: string[];
  twoWheelerInsurance: {
    hasInsurance: boolean;
    company?: string;
    premium?: string;
  };
  
  fourWheelersCount: number;
  fourWheelerNumbers: string[];
  fourWheelerInsurance: {
    hasInsurance: boolean;
    company?: string;
    premium?: string;
  };
  
  // Insurance
  healthInsurance: {
    hasInsurance: boolean;
    company?: string;
    premium?: string;
  };
  termInsurance: {
    hasInsurance: boolean;
    company?: string;
    premium?: string;
  };
  lifeInsurance: {
    hasInsurance: boolean;
    company?: string;
    premium?: string;
  };
  
  // Loans
  loans: {
    personalLoan?: LoanDetails;
    twoWheelerLoan?: LoanDetails;
    carLoan?: LoanDetails;
    homeLoan?: LoanDetails;
    businessLoan?: LoanDetails;
  };
  
  // Credit Cards
  creditCards: {
    hasCards: boolean;
    numberOfCards?: number;
    bank?: string;
    totalLimit?: string;
    availableLimit?: string;
  };
  
  // Score
  financialScore?: number;
}

export interface LoanDetails {
  hasLoan: boolean;
  bank?: string;
  emi?: string;
  outstanding?: string;
}

export interface Question {
  id: string;
  title: string;
  type: 'text' | 'number' | 'date' | 'radio' | 'checkbox' | 'dropdown' | 'conditional';
  options?: string[];
  field: keyof FormData | string;
  required: boolean;
  condition?: (data: FormData) => boolean;
  subQuestions?: Question[];
}