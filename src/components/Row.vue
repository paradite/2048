<template>
  <div
    class="row"
    v-bind:style="{
      width: totalSize + 'px',
      height: cellSize + 'px',
      marginBottom: last ? 0 : marginSize + 'px'
    }"
  >
    <div
      v-for="(cell, i) in row"
      :key="i"
      class="cell"
      v-bind:style="{
        width: cellSize + 'px',
        height: cellSize + 'px',
        marginRight: i === row.length - 1 ? 0 : marginSize + 'px'
      }"
    >
      {{ cell }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Row',
  props: {
    row: Array,
    cellSize: Number,
    marginSize: Number,
    totalSize: Number,
    last: Boolean
  }
};
</script>

<style scoped>
.cell {
  font-size: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  float: left;
  background-color: rgba(238, 228, 218, 0.35);
  border-radius: 5px;
}
</style>
