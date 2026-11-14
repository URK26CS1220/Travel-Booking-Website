# CampusConnect – Web Technology IA-3 Working Model

A multi-page, responsive student portal demo created to cover the functional requirements in the supplied IA-3 checklist.

## Run the website
1. Extract `CampusConnect_Web_Technology_IA3.zip`.
2. Open the folder in VS Code.
3. Open `index.html` in a browser, or use the VS Code Live Server extension.
4. Go to **Register**, complete all fields with valid values, and create an account.
5. Sign in with the same email and password to open the dashboard.

## Pages and modules
- `index.html` – landing page, navigation, hero, feature cards and CTA.
- `register.html` – full registration form.
- `signup.html` – email/password sign-up and Terms checkbox.
- `signin.html` – login form with show/hide password and invalid-credential alert.
- `home.html` – authenticated demo dashboard, responsive layouts, task checklist and calculator.
- `styles.css`, `layout.css` – design tokens, light/dark themes, responsive CSS Grid/Flexbox.
- `validation.js` – checklist Regex validation on blur and submit.
- `theme.js` – persistent theme toggle using localStorage.
- `calculator.js` – calculator keys, result display and division-by-zero handling.
- `chatbot.js` – floating chatbot with keyword replies and auto-scroll.
- `app.js` – navigation, sign-up/sign-in demo interactions and dashboard data.

## Functional requirements mapping
| Checklist item | Included implementation |
|---|---|
| FR-01 Landing page | Header, brand, nav links, theme toggle, hero CTA, feature cards |
| FR-02 Registration | Full Name, Register ID, Email, Mobile, Division, Password, Confirm Password; regex validation; inline errors; disabled submit |
| FR-03 Sign-up | Email/password and Terms checkbox |
| FR-04 Sign-in | Login, show/hide password, invalid credential alert |
| FR-05 Dashboard | Desktop 3-column CSS Grid; mobile stacked Flexbox; hamburger navigation |
| FR-06 Chatbot | Fixed FAB, expandable panel, user/bot nodes, keyword replies, auto-scroll |
| FR-07 Theme | CSS variables, instant toggle, localStorage persistence |
| FR-08 Calculator | Digits, operators, C, =, display and divide-by-zero handling |

## Important demo limitations
- This is a front-end academic working model. Account information is stored in browser `localStorage`; it is not a secure production authentication system and must not be used for real personal data.
- GitHub repository creation and Vercel deployment require your own accounts and explicit publishing steps. No live hosting URL is created by this ZIP.
- Replace the sample project title, student details, division list and dashboard sample statistics with your actual project information before submission.
- The IA-3 checklist also requires a 20+ page e-report, screenshots, QR codes, GitHub/Vercel proof and a five-minute presentation video. These are separate submission tasks and are not automatically produced by this website source.

## Suggested valid registration example
- Full Name: Asha Kumar
- Register ID: 25CS208
- Email: asha@example.com
- Mobile: 9876543210
- Division: Computer Science & Engineering
- Password: Campus@123
