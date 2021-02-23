<template>
  <h1>Got any questions?</h1>

  <div v-for="question in Questions" :key="question">
    <div @click="toggleAnswer(question.id)">
      <h2>{{ question.questions }}</h2>

      <div v-if="question.displayAnswer">
        <div v-if="question.type == 'para'">
          <p>{{ question.answer }}</p>
        </div>
        <div v-if="question.type == 'list'">
          <ul v-for="list in question.answer" :key="list">
            <li>{{ list }}</li>
          </ul>
        </div>
      </div>
      <div v-else>
        click me
      </div>
    </div>
  </div>
</template>

<script>
import { GuideQuestions } from "../composables/sharedData.js";
import { ref } from "vue";
export default {
  setup() {
    const Questions = ref();
    Questions.value = GuideQuestions;

    const toggleAnswer = id => {
      Questions.value[id].displayAnswer = !Questions.value[id].displayAnswer;
    };
    return { toggleAnswer, Questions };
  }
};
</script>

<style></style>
