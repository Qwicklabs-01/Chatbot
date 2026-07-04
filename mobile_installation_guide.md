# How to Access and Install Aura AI on Your Mobile Phone

Since Aura AI is a 100% client-side web application, you can access and install it on your mobile device without needing to download it from an app store. 

Here are the two ways to run and install it on your mobile phone:

---

## Method 1: Access from Mobile via Your Local Wi-Fi (No Deployment Needed)

If you are running the app locally on your computer (on port `3000`), you can access it on your mobile phone as long as both devices are connected to the **same Wi-Fi network**.

### Step 1: Find Your Computer's Local IP Address
1. Open **Command Prompt** (cmd) on your computer.
2. Type the following command and press Enter:
   ```cmd
   ipconfig
   ```
3. Look for **IPv4 Address** under your active connection (e.g., Wi-Fi). It will look like `192.168.X.X` (for example, `192.168.1.15`).

### Step 2: Open it on Your Mobile Phone
1. Open the web browser (Safari, Chrome, or Firefox) on your mobile phone.
2. In the address bar, type your computer's IP address followed by `:3000`.
   - *Example*: `http://192.168.1.15:3000/`
3. The Aura AI mobile interface will load on your phone!

---

## Method 2: Install as a Full-Screen App on Your Mobile Home Screen

Once you have opened the app's URL on your phone's browser (either using the Wi-Fi method above or by deploying it online), you can install it as a standalone app:

### On iPhone (Safari):
1. Tap the **Share** button (the square icon with an upward arrow at the bottom of Safari).
2. Scroll down and select **Add to Home Screen**.
3. Name it **Aura AI** and tap **Add**.
4. An icon will appear on your home screen. When you tap it, Aura AI will launch in **full-screen app mode** without browser address bars!

### On Android (Chrome):
1. Tap the **three vertical dots** (menu) in the top-right corner of Chrome.
2. Select **Add to Home Screen** (or **Install App**).
3. Tap **Add** to confirm.
4. Aura AI will now appear on your home screen as a native-feeling app!

---

## Method 3: Deploy Online for Free on Netlify (Step-by-Step)

To access Aura AI on your phone even when your computer is shut down, you can host it online for free in under 2 minutes using Netlify Drop:

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

## Method 4: Compile to a Native Android APK for Free (Using Microsoft PWABuilder)

If you want a downloadable `.apk` file that you can distribute to anyone for free (with no watermarks, restrictions, or fees), you can use **PWABuilder**—a 100% free tool maintained by Microsoft.

### Step 1: Deploy Your App Online (Free)
1. Drag and drop your `chatbot` folder into [Netlify](https://www.netlify.com/) (completely free, takes 10 seconds).
2. Copy your new live website URL (e.g., `https://your-app-name.netlify.app`).

### Step 2: Generate the APK File
1. Go to [**PWABuilder.com**](https://www.pwabuilder.com/).
2. Paste your live website URL and click **Start**.
3. PWABuilder will scan the site and detect the `manifest.json`, `sw.js` (offline service worker), and `icon.svg` we configured.
4. Click **Package for Store** or **Build My App**.
5. Select **Android** and click **Generate APK**.
6. Download the package. Inside it, you will find a ready-to-use `.apk` file that you can install on any Android phone!

---

*Copyright © 2026 Made by Sakshi. All Rights Reserved.*
