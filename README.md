# 💰 Financial Safety Scorecard

![App Preview](https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1200&h=300&fit=crop&auto=format)

An interactive, gamified financial assessment tool that collects user data step-by-step, calculates a Financial Safety Score, and integrates with Google Sheets and WhatsApp for seamless data management and result sharing.

## ✨ Features

- 🎮 **Game-like UI**: One question per screen with smooth transitions and progress tracking
- 🎨 **Animated Character System**: Visual avatar that updates based on user responses
- 📊 **Smart Conditional Logic**: Dynamic form fields based on employment type
- 💾 **Local Progress Saving**: Data persists in browser until final submission
- 📈 **Financial Safety Score**: Intelligent calculation based on multiple financial factors
- 📱 **Mobile Responsive**: Optimized for all device sizes
- 🔗 **Google Sheets Integration**: Backend data storage via Google Apps Script
- 💬 **WhatsApp Sharing**: One-click result sharing functionality
- ✅ **Real-time Validation**: Mandatory field checking with instant feedback
- 🚀 **Zero Database Required**: Uses Google Sheets as backend storage

## 🚀 Clone this Project

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=68f639be90633b10bf459fab&clone_repository=68f63aaf90633b10bf459fb3)

## 💬 Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> No content model prompt provided - app built from existing content structure

### Code Generation Prompt

> Build a mobile-compatible interactive step-by-step data collection website using HTML, CSS, JavaScript (React or plain JS), and connect it to Google Sheets using Google Apps Script as backend. Collect financial-related data from users step by step (one question per screen like a game), show animated character on the background that updates visually based on user input, and save all data to Google Sheets after final submit. Also calculate a financial safety score and send results to WhatsApp number +919965317160.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🛠️ Technologies Used

- **Frontend**: Next.js 15 with React 18
- **Styling**: Tailwind CSS with custom animations
- **State Management**: React Hooks (useState, useEffect)
- **Data Storage**: Google Sheets via Google Apps Script
- **API Integration**: Fetch API for backend communication
- **Type Safety**: TypeScript with strict mode
- **Package Manager**: Bun

## 📋 Prerequisites

- Node.js 18+ or Bun installed
- Google Account for Google Sheets integration
- Modern web browser

## 🚀 Getting Started

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd financial-safety-scorecard
   ```

2. **Install dependencies**:
   ```bash
   bun install
   ```

3. **Set up environment variables**:
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_GOOGLE_SCRIPT_URL=your-google-apps-script-url
   NEXT_PUBLIC_WHATSAPP_NUMBER=919965317160
   ```

4. **Run the development server**:
   ```bash
   bun run dev
   ```

5. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

### Google Sheets Setup

1. **Create a new Google Sheet** with the following columns:
   - Timestamp, Name, Mobile, DOB, Gender, Employment Type, Company Name, Monthly Income, House Type, Family Members, 2-Wheelers Count, 2-Wheeler Insurance, 4-Wheelers Count, 4-Wheeler Insurance, Health Insurance, Term Insurance, Life Insurance, Loans, Credit Cards, Financial Score

2. **Create Google Apps Script**:
   - Open your Google Sheet
   - Go to Extensions > Apps Script
   - Copy the provided script from `google-script.js` in this repository
   - Deploy as Web App (Execute as: Me, Access: Anyone)
   - Copy the deployment URL and add it to `.env.local`

3. **Test the integration**:
   - Submit a test form entry
   - Verify data appears in your Google Sheet

## 📊 Google Apps Script Example

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    sheet.appendRow([
      new Date(),
      data.name,
      data.mobile,
      data.dob,
      data.gender,
      data.employmentType,
      data.companyName,
      data.monthlyIncome,
      data.houseType,
      JSON.stringify(data.familyMembers),
      data.twoWheelersCount,
      JSON.stringify(data.twoWheelerInsurance),
      data.fourWheelersCount,
      JSON.stringify(data.fourWheelerInsurance),
      JSON.stringify(data.healthInsurance),
      JSON.stringify(data.termInsurance),
      JSON.stringify(data.lifeInsurance),
      JSON.stringify(data.loans),
      JSON.stringify(data.creditCards),
      data.financialScore
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      message: 'Data saved successfully'
    })).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
```

## 🧮 Financial Safety Score Calculation

The score is calculated based on the following criteria:

- **Base Score**: 50 points
- **Own House**: +10 points
- **Each Insurance** (Health/Term/Life/Vehicle): +5 points each
- **Monthly Income > ₹50k**: +10 points
- **Each Loan**: -5 points
- **Credit Card Utilization > 50%**: -5 points
- **Maximum Score**: 100 points
- **Minimum Score**: 0 points

## 📱 WhatsApp Integration

After form submission, users can share their Financial Safety Score via WhatsApp to the configured number (+919965317160). The share message includes:
- User's name
- Calculated financial safety score
- Timestamp of assessment

## 🎨 Character Animation System

The animated character responds to:
- **Gender Selection**: Updates avatar appearance
- **Family Members**: Shows additional character icons
- **Employment Type**: Changes background icon (office vs business)
- **Vehicle Count**: Animates vehicle icons
- **Insurance Coverage**: Displays shield badges
- **Loan Status**: Shows warning indicators

## 📱 Deployment Options

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Deploy to Netlify

1. Build the application: `bun run build`
2. Deploy the `out` directory to Netlify
3. Configure environment variables in Netlify dashboard

## 🔒 Privacy & Data Security

- All data is stored securely in your private Google Sheet
- No third-party analytics or tracking
- Local storage is cleared after successful submission
- HTTPS recommended for production deployment

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

---

Built with ❤️ using Next.js, Tailwind CSS, and Google Apps Script

<!-- README_END -->