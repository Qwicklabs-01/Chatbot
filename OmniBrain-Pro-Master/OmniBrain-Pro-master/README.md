# OmniBrain-Pro 🧠

A professional God Prompt generator and Omni-Disciplinary Master AI. It acts as a Multi-Discipline Creator, Engineer, Data Scientist, and Strategist, providing high-quality, professional-grade outputs instantly.

Powered by the lightning-fast `phi3` engine for maximum speed and intelligence. Includes integrated skills documented in [`brain.md`](./brain.md) and the comprehensive God Prompt in [`master-prompt-professional.md`](./master-prompt-professional.md).

**Created by Sakshi**

---

## 🚀 How to Download & Load the Model

Follow these simple steps to install and run OmniBrain-Pro on your machine:

### Step 1: Install Ollama
If you don't have Ollama installed yet, you need it to run the model locally.
1. Go to [ollama.com](https://ollama.com/)
2. Download and install the version for your operating system (Windows, Mac, or Linux).

### Step 2: Download the Modelfile
1. Save the provided `Modelfile` to a folder on your computer. (e.g., `C:\Users\YourName\Downloads\OmniBrain`)

### Step 3: Load and Build the Model
You need to tell Ollama to build your custom brain using the Modelfile you just downloaded.
1. Open a Terminal (Command Prompt or PowerShell on Windows).
2. Navigate to the folder where you saved the `Modelfile`. For example:
   ```bash
   cd "C:\Users\YourName\Downloads\OmniBrain"
   ```
3. Run the following command to download the base engine and compile your model:
   ```bash
   ollama create omnibrain-pro -f Modelfile
   ```
   *(Note: This might take a few minutes the first time as it downloads the ~2.5GB engine in the background).*

### Step 4: Start Chatting!
1. Open your Ollama desktop chat application.
2. Click **New Chat**.
3. In the model dropdown menu, select **`omnibrain-pro`**.
4. Type your message and get instant, professional-grade answers!
