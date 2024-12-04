let lastLoggedText = '';
let isTranslating = false;
let i = 0;
let insetStyle = '';

function update() {
    if (isTranslating) {
        return;
    }

    const cueElement = document.querySelector('.vjs-text-track-cue.vjs-text-track-cue-da');
    if (cueElement) {
        const childDiv = cueElement.querySelector('div');

        if (childDiv) {
            const currentText = childDiv.textContent;

            if (currentText !== lastLoggedText) {
                isTranslating = true;
                if (lastLoggedText)
                {
                    raiseSubtitles(cueElement);
                }

                translateText(currentText)
                    .then(translatedText => {
                        subtitleChanged(cueElement, childDiv, currentText, translatedText);
                    })
                    .catch(error => {
                        console.error('Translation error:', error);
                    })
                    .finally(() => {
                        isTranslating = false;
                    });
            }
        } else {
            console.log('Subtitles child div not found.');
        }
    } else {
        i = i + 1;
        if (i % 500 == 0)
        {
            i = 0;
            console.log('Subtitles not found.');
        }
    }
}

function translateText(text) {
    const url = `http://localhost:5050/translate`;
    const body = {
        "text": text,
    };

    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(data => {
        if (data && data.translated_text.length > 0) {
            return data.translated_text;
        } else {
            throw new Error('Translation failed');
        }
    });
}

function raiseSubtitles(cueElement) {
    const currentInset = cueElement.style.inset;
    const fontHeight = parseFloat(cueElement.style.font.split(' ')[0]);
    let [topInset, rightInset, bottomInset, leftInset] = currentInset.split(' ');
    let newTopInset = parseFloat(topInset) - fontHeight;
    insetStyle = `${newTopInset}px 0px`;
    cueElement.style.inset = insetStyle;
}

function subtitleChanged(cueElement, childDiv, originalText, translatedText) {
    if (!lastLoggedText)
    {
        raiseSubtitles(cueElement);
    }

    const newText = `${originalText}\n${translatedText}`;
    childDiv.textContent = newText;
    lastLoggedText = newText;
}

setInterval(update, 10);
