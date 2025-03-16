import {mount} from '@vue/test-utils';
import {beforeEach, describe, it} from 'vitest';
import WordCounter from '@/components/WordCounter.vue';

describe('WordCounter.vue', () => {
    let wrapper = null;
    beforeEach(() => {
        // Komponente mit Props "text" initialisieren
        wrapper = mount(WordCounter, {
            props:{
                text: ''
            },
            data () {
                return {
                    textCount: 0,
                    uniqueTextCount: 0,
                    wordList: [],
                    error: false,
                    errMsg: ''
                }
            }
        });
    })
    // Komponente wird zum schluss geschlossen
    afterEach(() => {
        wrapper.unmount();
    })
    it('Prüft ob die Komponente läd', () => {
       expect(wrapper.exists()).toBe(true);
    });
    it('Prüft der Error angezeigt wird', async () => {
        wrapper.setData({
            error: true,
            errMsg: 'Bei der Analyse ist folgender Fehler aufgetreten: Das ist ein Error'
        })
        await wrapper.vm.$nextTick()
        expect(wrapper.text()).toContain("Das ist ein Error");
    });
    it('Zeigt die korrekte Wortanzahl basierend auf der Eingabe', async () => {
        await wrapper.setProps({ text: 'Das ist ein Testtext mit sieben Worten'})
        await wrapper.vm.$nextTick()
        expect(wrapper.text()).toContain('7 Wörter');
        expect(wrapper.text()).toContain('7 eindeutige Wörter', );
    })
    it('Prüft ob die Liste korrekt befüllt wird und die Grß und Kleinschreibung richtig verarbeitet wird', async () => {
        wrapper.setProps({ text: 'Tests tests Tests tests Texte texte TEXTE analyse Analyse Klasse' });
        await wrapper.vm.$nextTick()
        expect(wrapper.text()).toContain('"tests" = 4 mal');
        expect(wrapper.text()).toContain('"texte" = 3 mal');
        expect(wrapper.text()).toContain('"analyse" = 2 mal');
        expect(wrapper.text()).toContain('"klasse" = 1 mal');
    })
})