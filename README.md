# DRTV Translation Service

This project consists of:
1. A Chrome/Firefox extension.
2. A local dual subtitles translation service that generates Danish and English subtitles, running locally on your computer, free of charge.

---

## Part 1: Add-On Installation

### Chrome Extension Installation
1. Open Chrome and enter `chrome://extensions/` in the URL bar.
2. Enable **Developer Mode** (toggle in the top right corner).
3. Click **Load unpacked**.
4. Navigate to this folder and select the `extension` folder.

### Firefox Extension Installation (Temporary)
1. Open Firefox and enter `about:debugging` in the URL bar.
2. Click **This Firefox**.
3. Click **Load Temporary Add-on**.
4. Navigate to this folder -> `extension` and select `drtv.js`.

---

## Part 2: Translator

The translation service runs locally on your computer, translating text for free.

### Prerequisites

1. Install **Python 3** and `pip`:
   - The project was tested with Python 3.10.4, but any version 3.10 or newer should work.
   - Resources for Python installation are available online.
   - Verify your Python installation by running:
    ```bash
    python --version   # Windows
    python3 --version  # macOS/Linux
    ```

2. Open a terminal and navigate to this project folder:
   ```bash
   cd /path/to/this/folder
    ```

3. Create a virtual environment:
    ```bash
    python -m venv venv
    ```

4. Activate the virtual environment:
    ```bash
    .\venv\Scripts\activate   # Windoes
    source venv/bin/activate  # macOS/Linux
    ```

5. Install the required packages:
    ```bash
    pip install -r requirements.txt
    ```

### Running the Translation Service

Ensure the translation service is running whenever you want to use DRTV translations.

1. Start the translation service:
    ```bash
    python translate_service.py
    ```

- If the service doesn't start, consult ChatGPT for troubleshooting. Common issues include missing packages or incorrect Python installation.

---

## Part 3: Everyday Use and Instructions

1. Activate the virtual environment:
    ```bash
    .\venv\Scripts\activate   # Windoes
    source venv/bin/activate  # macOS/Linux
    ```

2. Start the python script:
    ```bash
    python translate_service.py
    ```