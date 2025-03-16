<template>
  <header class="header">
    <div>
      <h1 v-text="getTitleText"></h1>
    </div>
  </header>
  <main>
    <div class="mainContent">
      <!-- Zeigt die Textbox. -->
      <div class="inputField">
        <textarea
            v-model="text"
            placeholder="Hier bitte ihren Text einfügen"/>
      </div>
      <!-- Zeigt die Komponente WordCounter, übergibt die Eingabe in der Textbox. -->
      <div class="wordCounter">
        <WordCounter :text="text"/>
      </div>
    </div>
  </main>
</template>
<script>
import '@/assets/style.css'
import strings from './constants/strings.json'
import WordCounter from "@/components/WordCounter.vue";

export default {
  components: {WordCounter},
  data() {
    return {
      text: ''
    };
  },
  computed: {
    getTitleText() {
      return strings.title;
    }
  }
}
</script>

