### **1\. Project Title**

Vault: De-Escalation by Design

### **2\. One-Sentence Summary**

We built Vault for Black civilians and immigrants to help them safely present identification during police encounters without the life-threatening risk of "reaching".

### **3\. Problem Statement** 

* What exact problem exists?  
  * implicit bias often causes officers to misinterpret a Black driver reaching for ID as reaching for a weapon.  
      
  * Non-citizens face indefinite detention or deportation risks if they cannot produce physical status documents immediately.

* Who experiences the pain?  
  * Blacks / Black Civilians: Targeted by systemic bias and at risk during any interaction with law enforcement.

  * Immigrants: Risk indefinite detention or deportation if physical documents are not immediately at hand.

### **4\. User Persona**

**Primary User**: Black Civilians / Immigrants

* Role:  
  *  Everyday people navigating public spaces where police presence is high.

* Goal:   
  * Survive police encounters without escalation;   
  * ensure rights are protected even if they forget physical papers.

* Pain Points:  
  * The "Reaching" Fear: Anxiety that reaching for a wallet will be seen as reaching for a weapon (implicit bias).  
  * Documentation Fragility: Immigrants risk indefinite detention or deportation if they leave bulky documents (I-20, Passport, Green Card) at home.  
      
  * Digital Privacy: Fear that handing a phone to an officer for one document gives them permission to search the whole device.

**Secondary User**: Law Enforcement (The "Viewer")

Goal: Quick verification of status/identity.

Pain Points: High-stress uncertainty about what a civilian is reaching for; false documents.

### **5\. Key Insight**

We discovered that the most dangerous moment in a traffic stop is the dynamic movement of the driver. Officers are trained to react to hands moving out of sight. Our Insight: By moving the identification process to the phone—which is likely already visible on the dashboard or in hand—we convert a "dynamic, hidden" action into a "static, visible" one. We don't just digitize IDs; we remove the physical trigger for violence.

### **6\. Solution Overview**

Vault is a verified digital document wallet with a "Traffic Stop Mode." It allows users to pre-upload and verify high-stakes documents (License, Passport, I-20). During a stop, the user activates the app, which locks the phone screen to only show the ID (preventing digital searches) and broadcasts their location to safety contacts.

### **7\. Features (Ranked by Impact)**

1. **Core Feature: The Verified Secure Wallet**  
* What it does: Stores digital copies of IDs that are pre-verified so officers trust them.

* How we mock it for Hackathon:  
  * Upload: User uploads image of ID.  
  * "Verification": We run a mock check (green checkmark) simulating a match with government databases.  
  * Display: ID appears on a high-contrast, easy-to-read card.

2. **Secondary Feature: "Lockdown Mode" (Privacy Shield)**  
* What it does: When "Present ID" is clicked, the app locks the screen. The officer cannot swipe to texts, photos, or other apps.

* Implementation: Simulates "Guided Access" (iOS) or "App Pinning" (Android).

* Why: Protects 4th Amendment rights against unreasonable digital search.

3. **Stretch Feature: The "Dead Man's Switch" / Panic Mode**  
* **What it does**: If the phone detects violent movement (accelerometer) or if a voice trigger is used ("Hey Siri, I'm being pulled over"), it sends a location beacon to emergency contacts.

Hackathon version: A simple "Safety Trigger" button that sends a mock SMS/WhatsApp alert.

### **8\. Demo Prototype (The "Happy Path")**

**Onboarding**: User scans their Driver's License and I-20.

**Verification**: System shows "Verifying..." \-\> "Verified ✅".

**The Scenario**: User clicks large red "Traffic Stop" button.

**Action**:

Screen goes into "Lockdown Mode."

Brightness maximizes automatically.

Documents are displayed in a swipeable carousel.

"Emergency Contacts Notified" toast appears.

Exit: User enters a PIN to leave the app (proving only they can unlock it).

### **9\. Technical Architecture**

Frontend: Next.js with Vercel (Fast UI, easy to deploy).

Backend: Node.js / Supabase (Database for users and docs).

Storage: Supabase Storage (for the ID images).

AI/Verification (Mocked): We will use a standard OCR library (Tesseract.js) to read the name off the ID to prove it's "real" text, then auto-approve it for the demo.

### **10\. Workflow Diagram**

User Uploads Doc → OCR Scans Text → System "Verifies" → Stored in Vault Traffic Stop → User Hits Button → Phone Locks & Brightens → ID Displayed

\*\*User Uploads Doc\*\*    
→ \*\*OCR Scans Text\*\*    
→ \*\*System Verifies\*\*    
→ \*\*Stored in Vault\*\*

\*\*Traffic Stop\*\*    
→ \*\*User Hits Button\*\*    
→ \*\*Phone Locks & Brightens\*\*    
→ \*\*ID Displayed\*\*

### **Suggested API Endpoints**

#### Auth (Firebase handles client-side, backend verifies)
- `GET  /api/auth/me` — Get current user profile

#### Documents
- `GET    /api/documents` — List all user's documents
- `GET    /api/documents/:id` — Get single document
- `POST   /api/documents/upload` — Upload new document (image)
- `DELETE /api/documents/:id` — Delete a document
- `POST   /api/documents/:id/verify` — Trigger OCR verification

#### Emergency Contacts
- `GET    /api/contacts` — List emergency contacts
- `POST   /api/contacts` — Add emergency contact
- `PUT    /api/contacts/:id` — Update emergency contact
- `DELETE /api/contacts/:id` — Delete emergency contact

#### Safety/Alert
- `POST   /api/alert/trigger` — Send location beacon to emergency contacts
- `GET    /api/alert/history` — Get alert history

#### User Settings
- `GET    /api/settings` — Get user settings (lockdown PIN, preferences)
- `PUT    /api/settings` — Update user settings
- `PUT    /api/settings/pin` — Update lockdown PIN

#### Health
- `GET    /api/health` — Server health check (already exists)

### **11\. Data & Metrics (Success Criteria)**

Latency: Time from "Tap" to "ID Displayed" (Needs to be \< 2 seconds).

Verification Accuracy: % of IDs correctly read by OCR.

Safety: 100% success rate in locking the navigation bar (preventing app exit).

### **12\. Differentiation**

Why is Vault \> Existing Solutions?

**Vs. Just a Photo**: A photo in your gallery can be Photoshopped and ignored by police. A Vault Wallet Pass is cryptographically signed (just like a boarding pass or credit card), proving the document has been verified and not tampered with.

**Vs. Native Apple/Google ID**s: Big Tech currently only supports Driver's Licenses for a handful of states. They completely ignore immigration documents (I-20, I-94, Foreign Passports). Vault fills this critical gap for the most vulnerable populations.

**Vs. Physical Papers**: Paper documents are fragile, easily lost, and hard to reach for. The Wallet is backed up to the cloud, accessible instantly, and protected by your phone's biometrics (FaceID), which implicitly proves ownership.

### **13\. Impact & Value**

Safety: Reduces the need to reach into hidden areas (pockets/gloveboxes).

Legal Protection: Prevents unlawful digital searches via Lockdown Mode.

Immigration Safety: Ensures documentation is always available, preventing 48-hour holds.

### **15\. What We Built at the Hackathon**

Screens: Login, Wallet Dashboard, Document Upload Flow, "Lockdown" Presentation View.

Tech: Functional OCR scanner for IDs; Pin-locked exit mechanism.

In Progress: Real integration with DMV/DHS databases (Mocked for now).

### **16\. Final Pitch Script (Draft)**

"We tell Black drivers: 'Keep your hands visible.' But the law says: 'Show me your ID.' This contradiction gets people killed. We built Vault to solve the 'Reaching Paradox.' By moving identity from the glovebox to the locked screen of a phone, we protect the driver’s life, their data privacy, and their peace of mind."

### **17\. Links**

\[GitHub Placeholder\]

\[Demo Video Placeholder\]

Likely Judge Questions & Answers  
Q: How do you verify the documents are real?

A: "In this MVP, we use OCR to match the name on the ID to the user account. In a production environment, we would use API integrations with services like Clear or Id.me (federal standards) to cryptographically verify the document."

Q: Will police accept a digital ID?

A: "Louisiana, Colorado, and several other states already accept digital IDs. Vault acts as a bridge—even if they require the physical card eventually, showing the digital version first with hands on the wheel de-escalates the initial tension, allowing the driver to ask permission to reach for the physical card safely."

