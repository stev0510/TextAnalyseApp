import { describe, test } from 'vitest';
import wordComputer from "../../mixins/wordComputer.js";
import testStrings from "../../constants/test.json";

describe('prepareText', () => {
    test('Teste die Funktion prepareText() auf Korrekte Ausgabe mit Sonderzeichen, einem Wiederholten Wort und Zahlen', () => {
        const result = wordComputer.methods.prepareText(testStrings.test1);
        const testArray = [
            {word:'wiederholt', count:2, getWord:'"wiederholt" = 2 mal'},
            {word:'enthält', count:1, getWord:'"enthält" = 1 mal'},
            {word:'zahlen', count:1, getWord:'"zahlen" = 1 mal'},
            {word:'sonderzeichen', count:1, getWord:'"sonderzeichen" = 1 mal'},
            {word:'außerdem', count:1, getWord:'"außerdem" = 1 mal'},
            {word:'wörter', count:1, getWord:'"wörter" = 1 mal'}];
        expect(result.textCount).toBe(16)
        expect(result.uniqueTextCount).toBe(11)
        expect(result.list).toEqual(expect.arrayContaining(testArray));
    })
    test('Teste die Funktion prepareText() auf Korrekte Ausgabe mit doppelten Leerzeichen und Füllwörtern', () => {
        const result = wordComputer.methods.prepareText(testStrings.test2);
        const testArray = [
            {word:'testtext', count:1, getWord:'"testtext" = 1 mal'},
            {word:'doppelten', count:1, getWord:'"doppelten" = 1 mal'},
            {word:'leerzeichen', count:1, getWord:'"leerzeichen" = 1 mal'},
        ];
        expect(result.textCount).toBe(13)
        expect(result.uniqueTextCount).toBe(11)
        expect(result.list).toEqual(expect.arrayContaining(testArray));
    })
    test('Teste die Funktion prepareText() auf Korrekte Ausgabe mit Emojis, Symbole und Bindestriche', () => {
        const result = wordComputer.methods.prepareText(testStrings.test3);
        const testArray = [
            {word:'französisch', count:1, getWord:'"französisch" = 1 mal'},
            {word:'hablas', count:1, getWord:'"hablas" = 1 mal'},
            {word:'español', count:1, getWord:'"español" = 1 mal'},
            {word:'working', count:1, getWord:'"working" = 1 mal'},
            {word:'space', count:1, getWord:'"space" = 1 mal'},
            {word:'super', count:1, getWord:'"super" = 1 mal'},
        ];
        expect(result.textCount).toBe(11)
        expect(result.uniqueTextCount).toBe(9)
        expect(result.list).toEqual(expect.arrayContaining(testArray));
    })
})