import { FormData } from '@/types'

export function calculateFinancialScore(data: FormData): number {
  let score = 50 // Base score

  // Own house: +10
  if (data.houseType === 'Own') {
    score += 10
  }

  // Each insurance: +5
  if (data.healthInsurance.hasInsurance) score += 5
  if (data.termInsurance.hasInsurance) score += 5
  if (data.lifeInsurance.hasInsurance) score += 5
  if (data.twoWheelerInsurance.hasInsurance) score += 5
  if (data.fourWheelerInsurance.hasInsurance) score += 5

  // Monthly income > ₹50k: +10
  if (data.monthlyIncome === '50k–100k' || data.monthlyIncome === '1L+') {
    score += 10
  }

  // Count loans: -5 each
  const loans = data.loans
  if (loans.personalLoan?.hasLoan) score -= 5
  if (loans.twoWheelerLoan?.hasLoan) score -= 5
  if (loans.carLoan?.hasLoan) score -= 5
  if (loans.homeLoan?.hasLoan) score -= 5
  if (loans.businessLoan?.hasLoan) score -= 5

  // Credit card utilization (simplified): -5 if has cards
  if (data.creditCards.hasCards) {
    score -= 5
  }

  // Ensure score is between 0 and 100
  return Math.max(0, Math.min(100, score))
}