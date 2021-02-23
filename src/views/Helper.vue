<template>
  <h3>Got any questions?</h3>

  <div v-for="question in Questions" :key="question" class="question-cards">
    <div
      @click="toggleAnswer(question.id)"
      class="card-panel blue-grey lighten-1"
    >
      <h4 class="left-align white-text">
        {{ question.questions }}
      </h4>

      <div
        v-if="question.displayAnswer"
        class="card-panel white  blue-grey-text text-lighten-1"
      >
        <div v-if="question.type == 'para'">
          <p class="left-align">{{ question.answer }}</p>
        </div>
        <div v-if="question.type == 'list'">
          <ul v-for="list in question.answer" :key="list">
            <li class="left-align">{{ list }}</li>
          </ul>
        </div>
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

<style>
.question-cards {
  padding: 0 8rem;
  cursor: pointer;
}
</style>
