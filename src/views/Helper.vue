<template>
  <PageBanner>
    <template v-slot:title>Frequently Asked Questions</template>
    <template v-slot:description>
      Here is a helper page with commonly asked questions to guide you
      throughout our website. Click on the questions for further information.
    </template>
  </PageBanner>
  <div v-for="question in Questions" :key="question" class="question-cards">
    <div
      @click="toggleAnswer(question.id)"
      class="white-text card-panel blue-grey lighten-1"
    >
      <div class="question-icon">
        <h6 class="left-align">{{ question.questions }}</h6>
        <i class="material-icons right">help</i>
      </div>
      <div v-if="question.displayAnswer" class="card-panel blue-grey darken-1">
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
import PageBanner from "@/components/PageBanner.vue";
export default {
  components: {
    PageBanner
  },
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

<style scoped>
.question-cards {
  padding: 0 8rem;
  cursor: pointer;
}

.question-icon {
  display: flex;
}

.question-icon i {
  margin-left: 5px;
  margin-top: 9px;
}
</style>
