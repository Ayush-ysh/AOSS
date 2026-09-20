# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

## Contact Form Google Sheets Integration

If your data is not showing up in Google Sheets, follow these exact steps to recreate the connection. The most common issues are permissions and not creating a "New version" when deploying.

### Step 1: Prepare the Google Sheet
1. Go to [Google Sheets](https://sheets.google.com) and create a new spreadsheet.
2. Name the first tab exactly: `Sheet1`
3. In the first row, add these headers: `Timestamp`, `Name`, `Email`, `Message`

### Step 2: Add the Code
1. Click **Extensions > Apps Script**.
2. Replace all the code in `Code.gs` with the following:

```javascript
function doPost(e) {
  try {
    // 1. Get the sheet
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1");
    
    // 2. Parse data
    var data = e.parameter;
    
    // 3. Honeypot check
    if (data.website && data.website !== "") {
      return ContentService.createTextOutput("Spam blocked").setMimeType(ContentService.MimeType.TEXT);
    }
    
    // 4. Create timestamp
    var timestamp = new Date();
    
    // 5. Append row
    sheet.appendRow([
      timestamp,
      data.name || "No Name",
      data.email || "No Email",
      data.message || "No Message"
    ]);
    
    return ContentService.createTextOutput("Success").setMimeType(ContentService.MimeType.TEXT);
      
  } catch (error) {
    return ContentService.createTextOutput("Error: " + error.toString()).setMimeType(ContentService.MimeType.TEXT);
  }
}

// Add doGet so you can test if the script is alive in your browser
function doGet(e) {
  return ContentService.createTextOutput("The web app is alive and waiting for POST requests!").setMimeType(ContentService.MimeType.TEXT);
}
```

### Step 3: Crucial Deployment Steps
If you have deployed before, you MUST create a New Version.

1. Click **Deploy > New deployment** (Do not just click Save).
2. Click the gear icon next to "Select type" and check **Web app**.
3. Under **Description**, type "Version 1".
4. **Execute as:** `Me (your email)`
5. **Who has access:** `Anyone`
6. Click **Deploy**.
7. Google will ask for Authorization. Click **Authorize access** -> Choose your account -> Click **Advanced** -> Click **Go to Untitled project (unsafe)** -> Click **Allow**.
8. Copy the **Web app URL**.

### Step 4: Update the App
1. Open your `.env` file in the project.
2. Paste the URL: `VITE_GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/.../exec`
3. Restart your dev server: Press `Ctrl+C`, then run `npm run dev`.

### Step 5: Test It
1. Paste the Web App URL directly into your browser tab. It should say: *"The web app is alive and waiting for POST requests!"*
2. If it does, go to your website and submit the contact form. The data will appear in the sheet!
