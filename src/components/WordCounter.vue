<template>
  <div class="wordCounterComponent">
    <!-- Zeigt die Anzahl der Wörter und eindeutigen Wörter. -->
    <div class="counter">
      <span v-text="getWordCounterText"/><br>
      <span v-text="getUniqueWordsText"/>
    </div>
    <!-- Liste der häufigsten Wörter. -->
    <div class="mostWords" >
      <span v-text="getMostWordsText"/><br>
      <div class="error" v-if="getError">
        <span v-text="getErrorMsg"/>
      </div>
      <ol class="mostWordList">
        <li v-for="wordObj in getWordList" :key="wordObj.word">
          <span v-text="wordObj.getWord" />
        </li>
      </ol>
    </div>
  </div>
</template>
<script>
import strings from "../constants/strings.json";
import wordComputer from "@/mixins/wordComputer.js";

export default {
  mixins: [wordComputer],
  props: {
    text: String
  },
  data() {
    return {
      textCount: 0,
      uniqueTextCount: 0,
      wordList: [],
      error: false,
      errMsg: ''
    };
  },
  watch: {
    text(text) {
      this.prepare(text);
    }
  },
  computed: {
    getWordCounterText() {
      return strings.wordCounter + this.textCount + strings.words;
    },
    getUniqueWordsText() {
      return strings.wordCounter + this.uniqueTextCount + strings.uniqueWords;
    },
    getMostWordsText() {
      return strings.mostWords;
    },
    getWordList() {
      return this.wordList;
    },
    getError() {
      return this.error;
    },
    getErrorMsg() {
      return this.errMsg;
    }
  },
  methods: {
    /**
     * Berechnet die Wortstatistik basierend auf dem eingegebenen Text.
     * @param {String} text - Der zu analysierende Text.
     */
    prepare(text) {
      const result = this.prepareText(text);
      this.textCount = result.textCount;
      this.uniqueTextCount = result.uniqueTextCount;
      this.wordList = result.list;
    }
  }
}
</script>