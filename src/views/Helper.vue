<template>
  <PageBanner>
    <template v-slot:title>FAQ</template>
    <template v-slot:description>
      Got any questions?
    </template>
  </PageBanner>
  <div v-for="question in Questions" :key="question" class="question-cards">
    <div
      @click="toggleAnswer(question.id)"
      class="card-panel blue-grey lighten-1"
    >
      <div class="question-icon">
        <h6 class="left-align white-text ">{{ question.questions }}</h6>
        <i class="material-icons">help</i>
      </div>

      <div
        v-if="question.displayAnswer"
        class="card-panel white  blue-grey-text text-lighten-1"
      >
        <div v-if="question.type == 'para'">
          <p class="left-align ">{{ question.answer }}</p>
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

h6 {
  font-weight: 200;
}

.question-icon {
  display: flex;
}

.question-icon i {
  margin-left: 5px;
  margin-top: 9px;
}
</style>
