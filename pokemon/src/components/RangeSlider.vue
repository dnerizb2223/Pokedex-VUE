<template>
  <div class="range-slider">
    <label>{{ label }}</label>
    <input type="range" :min="minValue" :max="maxValue" v-model="sliderValue" :disabled="sliderValue > toValue">
    <span>{{ sliderValue }}</span>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true
    },
    minValue: {
      type: Number,
      required: true
    },
    maxValue: {
      type: Number,
      required: true
    },
    value: {
      type: Number,
      default: 1
    },
    toValue: {
      type: Number,
      default: 151
    }
  },
  data() {
    return {
      sliderValue: this.value
    };
  },
  mounted() {
    // Emitir el valor inicial cuando se monta el componente
    this.$emit('input', this.value);
  },
  watch: {
    sliderValue(newValue) {
      this.$emit('input', newValue);
    }
  }
};
</script>

<style scoped>
.range-slider {
  margin: 10px 0;
}

input[type="range"] {
  width: 100%;
}
</style>
