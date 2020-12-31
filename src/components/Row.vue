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
      v-bind:class="{ [`cell-${cell}`]: true }"
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
  color: #f9f6f2;
  font-weight: bold;
  font-size: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  float: left;
  background-color: rgba(238, 228, 218, 0.35);
  border-radius: 2px;
}

.cell-2 {
  color: #776e65;
  background-color: #eee4da;
}

.cell-4 {
  color: #776e65;
  background-color: #eee1c9;
}

.cell-8 {
  background: #f3b27a;
}

.cell-16 {
  background: #f69664;
}

.cell-32 {
  background: #f77c5f;
}

.cell-64 {
  background: #f75f3b;
}

.cell-128 {
  background: #edd073;
}

.cell-256 {
  background: #edcc62;
}

.cell-512 {
  background: #edc950;
}

.cell-1024 {
  background: #edc53f;
}

.cell-2048 {
  background: #edc22e;
}
</style>
