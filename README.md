# Aura AI - Intelligent Client-Side Mobile Assistant & Chatbot

Aura AI is a high-speed, local, and 100% client-side mobile chatbot and productivity utility suite running entirely inside your browser. No cloud APIs, no backend database, and complete offline capability.

---

## 🚀 How to Run Locally

### Step 1: Open Your Terminal
Open **PowerShell** or **Command Prompt** and navigate to this project folder:
```bash
cd c:\Users\Sakshi\Downloads\chatbot
```

### Step 2: Start the Built-in Server
Run the local static server:
```bash
node server.js
```
*(If you see an `EADDRINUSE` error, it means the server is already active and running. Proceed directly to the next step).*

### Step 3: Open in Browser
Open your browser and visit:
[**http://localhost:3000/**](http://localhost:3000/)

---

## 🌐 How to Host Online for Free on Netlify (Step-by-Step)

Since Aura AI runs entirely on the client side (directly in the browser), you can host it online 100% free without setting up databases or servers.

### Step 1: Open Netlify Drop
1. Open your web browser and go to [**app.netlify.com/drop**](https://app.netlify.com/drop).
2. *(Optional but recommended)*: Log in or create a free account so you can edit your site name later.

### Step 2: Drag and Drop the Folder
1. Open your computer's **File Explorer** and locate your `chatbot` folder (at `c:\Users\Sakshi\Downloads\chatbot`).
2. Drag the entire `chatbot` folder and drop it onto the big dotted box on the Netlify Drop webpage that says **"Drag and drop your site folder here"**.

### Step 3: View Your Live App
1. Wait 5–10 seconds for the upload to complete.
2. Netlify will generate a live URL for you (e.g., `https://random-name-12345.netlify.app`).
3. Click the link to open your live mobile chatbot online!

### Step 4: Customize Your Link Name (Optional)
1. In your Netlify dashboard for this site, click on **Site configuration** (or **Site settings**).
2. Scroll down to **Site info** and click **Change site name**.
3. Type a custom name like `aura-ai-assistant` and click **Save**.
4. Your new link will be: `https://aura-ai-assistant.netlify.app`!

---

## 📱 How to Install on Mobile Devices (PWA)

Aura AI is configured as a Progressive Web App (PWA) supporting offline access and fullscreen native displays on both Android and iOS.

### 📱 For iPhone & iPad (iOS)
1. Open your live hosted URL in **Safari** on your iOS device.
2. Tap the **Share** button (the square icon with an upward arrow at the bottom).
3. Scroll down and tap **Add to Home Screen**.
4. Name the application **Aura AI** and tap **Add**.
5. It will appear on your iOS home screen as a borderless, fullscreen mobile app!

### 🤖 For Android
1. Open your live hosted URL in **Chrome** on your Android device.
2. Tap the **Menu (three dots)** in the top right, or click the native **"Install App"** banner that slides up from the bottom.
3. Tap **Install** to add the application directly to your home screen and app drawer.

---

## 🛠️ How to Compile to a Native Android APK (Free)

If you want to compile Aura AI into a native Android `.apk` file that anyone can download and sideload for free, follow these steps:

1. **Host Online**: Deploy your app online using the Netlify instructions above and copy the live URL.
2. **Go to PWABuilder**: Visit [**PWABuilder.com**](https://www.pwabuilder.com/) (a 100% free tool maintained by Microsoft).
3. **Paste URL**: Paste your live website URL and click **Start**.
4. **Package App**: PWABuilder will automatically read the `manifest.json`, `sw.js` (offline service worker), and `icon.svg` files.
5. **Download Package**: Click **Package for Store** or **Build My App**, select **Android**, and click **Download**.
6. Inside the downloaded package, you will have a signed, clean `.apk` file ready to install and share!

### How to Extract and Install the Compiled APK

1. **Extract the ZIP File**: Double-click the downloaded `.zip` file on your computer and extract its contents. Inside, you will see two main files:
   - `app-release.apk`: This is the installer file for Android phones!
   - `app-release.aab`: This is the Android App Bundle file (you only need this if you want to publish your app to the Google Play Store in the future).
2. **Install it on Your Mobile Phone**:
   - Send the `app-release.apk` file to your Android phone (you can send it to yourself via email, WhatsApp, Telegram, Google Drive, or connect your phone via USB).
   - On your phone, tap the `.apk` file to open it.
   - If your phone asks for permission to install from "Unknown Sources" or your file manager, click **Allow/Settings** to grant it (this is normal for apps installed outside the Google Play Store).
   - Tap **Install**.

You now have a fully compiled, native Android app version of your Aura AI chatbot! You can share this `.apk` file with anyone, and they can install and run it on their mobile device fully offline!

---

*Copyright © 2026 Made by Sakshi. All Rights Reserved.*
