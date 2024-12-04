## Part 1 Add on
# Add extension to chrome

1. enter chrome://extensions/ into chrome url bar

2. Click add unpacked extion (or called something similar)

3. Navigate to this folder and choose extension folder


# Add extension temporarily to firefox (works until firefox restart)

1. Enter about:debugging into firefox url bar

2. Click this firefox

3. Load temporary add on

4. Navigate to this folder -> extension and choose drtv.js


## Part 2 translator

The translation service is running locally on your computer, free of charge.


# Prerequisites

1. Install python3 and pip. (I used python 3.10.4 . There are plenty resources on how to do that. Verify that python works by typing python3 --version or python --version to the terminal.)

2. In the terminal find the source if this folder by typing:
cd (path to this folder)

3. Activate the virtual environment by typing in terminal: 
.\venv\Scripts\activate

4. Install necessary packages by typing in terminal: 
pip install -r requirements.txt


# Run translation service. Make sure it is running every time you want DRTV translation

1. In terminal type: 
python translate_service.py

If it didn't start just ask ChatGPT what went wrong. Probably missing some packages or python is not installed correctly.


# (Optional) Verify that translating service works

1. In another terminal type: curl -X POST http://localhost:5050/translate -H "Content-Type: application/json" -d "{\"text\":\"Din danske tekst her\"}"

2. If you received: {"translated_text":"Your Danish text here"}. Congratulations!