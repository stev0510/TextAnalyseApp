
export default {
    name: 'wordComputer',
    methods: {
        /**
         * Analysiert einen gegebenen Text und berechnet:
         * - Die Gesamtanzahl der Wörter
         * - Die Anzahl eindeutiger Wörter
         * - Eine sortierte Liste der häufigsten Wörter mit mehr als 4 Zeichen und deren Häufigkeit
         *
         * @param {string} text - Der zu analysierende Text
         * @returns {Object} - Enthält textCount, uniqueTextCount und eine sortierte Liste der häufigsten Wörter
         */
        prepareText(text) {
            // Variablen für die Berechnung und die Rückgabe.
            let wordList = [];
            let uniqueTextCount = 0;
            let textCount = 0;
            let wordMap = new Map();
            try {
                // Emojis, Sonderzeichen und Nummern werden durch einen Leerstring ersetzt,
                // der Bindestrich "-" und Slash "/" werden durch ein Leerzeichen ersetzt.
                let cleanText = text
                    .replaceAll(/\p{Emoji}/gu, '')
                    .replaceAll(/[!@#$%^&*()_+=\[\]{};':"„“\\|,.<>¿?€£¥§°~`\d]/g, '')
                    .replaceAll(/[-\/]/g, ' ');
                // Teilt den Text in Wörter auf.
                let list = cleanText.split(" ");
                for (let word of list) {
                    // Entfernt leere Strings (z. B. durch doppelte Leerzeichen).
                    if (word.trim() === "") {
                        continue;
                    }
                    // Entfernt Leerzeichen in Wörtern und speichert das WOrt kleingeschrieben, um Dubletten zu vermeiden.
                    let cleanWord = word.trim().toLowerCase();
                    // Erhöht den Wortzähler
                    textCount++;
                    // Die Values der Map wird als Counter benutzt, sollte das Wort noch.
                    // nicht existieren so wird ein neuer Eintrag erstellt.
                    let wordIndex = wordMap.has(cleanWord)
                    if (!wordIndex) {
                        wordMap.set(cleanWord, 1);
                    } else {
                        wordMap.set(cleanWord, wordMap.get(cleanWord) + 1);
                    }
                }
                // Aus jedem Map Eintrag mit mehr als 4 Zeichen, wird ein Object für die Liste erstellt.
                wordMap.forEach((value, key) => {
                    if (key.length > 4) {
                        // Der String 'getWord' wird für die vereinfachte Ausgabe im Model schon hier definiert.
                        let wordObject = {
                            word: key,
                            count: value,
                            getWord: '"' + key + '"' + ' = ' + value + ' mal'
                        };
                        wordList.push(wordObject);
                    }
                    // Erhöht den Wortzähler für eindeutige Wörter.
                    // Ein Wort zählt als eindeutig, wenn es genau einmal vorkommt.
                    uniqueTextCount += value === 1 ? 1 : 0;
                });
                wordList = this.sortWord(wordList);
                // Gibt die berechneten Werte zurück.
                return {
                    textCount: textCount,
                    uniqueTextCount: uniqueTextCount,
                    list: wordList,
                    error: false,
                    errMsg: ''
                }
            } catch (e) {
                return {
                    textCount: 0,
                    uniqueTextCount: 0,
                    list: [],
                    error: true,
                    errMsg: 'Bei der Analyse ist folgender Fehler aufgetreten: ' + e
                }
            }
        },
        /**
         * Sortiert die Wortliste nach Häufigkeit und gibt die 20 häufigsten zurück.
         *
         * @param {Array} wordList - Die Liste der Wörter mit Häufigkeit
         * @returns {Array} - Die 20 häufigsten Wörter (oder weniger, falls nicht genug vorhanden)
         */
        sortWord(wordList) {
            // Sortiert die Wörterliste nach Häufigkeit.
            wordList.sort(function (b, a) {
                return a.count - b.count
            });
            // Gibt die Top 20 Wörter zurück (oder weniger, falls die Liste kürzer ist).
            return wordList.slice(0, 20);
        }
    }
}
