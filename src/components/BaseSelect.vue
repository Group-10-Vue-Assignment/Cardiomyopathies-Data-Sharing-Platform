<template>
  <label v-if="label">{{ label }}</label>
  <select
    class="displayBlock browser-default"
    :value="modelValue"
    v-bind="{
      ...$attrs,
      onChange: $event => {
        $emit('update:modelValue', $event.target.value);
      }
    }"
    required
  >
    <option hidden disabled selected value> -- select an option -- </option>
    <option
      v-for="option in options"
      :value="option"
      :key="option"
      :selected="option === modelValue"
      >{{ option }}</option
    >
  </select>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: ""
    },
    modelValue: {
      type: [String, Number],
      default: ""
    },
    options: {
      type: Array,
      required: true
    }
  }
};
</script>
