<template>
  <div>
    <HeaderNav/>
    <BookList/>
  </div>
</template>

<script>
import BookList from "@/components/BookList.vue";
import HeaderNav from "@/components/HeaderNav.vue";

export default {
  name: "Welcome",
  components: {HeaderNav, BookList}
}
</script>

