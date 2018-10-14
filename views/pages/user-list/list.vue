<template lang="pug">
div#userContainer(class="user-container")
  ul(class="user-list")
    li(
      v-for="user in users"
      :key="user.id"
      class="user"
    )
      section(class="user-content")
        p(class="field")
          span(class="key") uid:
          span(class="value") {{user.id}}
        p(class="field")
          span(class="key") user name:
          span(class="value") {{user.name}}
      a(
        class="button button--delete"
        @click="handleDelete(user.id)"
      ) 删除
      a(
        class="button button--detail"
        :href="`/user/${user.id}`"
      ) 详情
  div(class="input-wrapper")
    input(type="text", v-model="inputStr")
    a(
      class="button button--add"
      @click="handleAdd"
    ) 添加
</div>
</template>
  
<script>
export default {
  data() {
    return {
      users: [],
      maxUid: 0,
      inputStr: ''
    }
  },
  methods: {
    handleDelete(userId) {
      this.users = this.users.filter(u => u.id !== userId);
    },
    handleAdd() {
      this.maxUid ++;
      this.users.push({ id: this.maxUid, name: this.inputStr });
      this.inputStr = '';
    }
  },
  mounted() {
    this.users = window.users;
    this.maxUid = this.users.length;
  }
}
</script>

<style>
.button {
  user-select: none;
  cursor: pointer;
  border: 1px solid;
  border-radius: 6px;
  padding: 5px 10px;
  margin-left: 20px;
}
.button:first-of-type {
  margin-left: 150px;
}
.button--delete {
  display: none;
  border-color: orangered;
}
.button--detail {
  display: none;
  border-color: blue;
}
.user:hover > .button {
  display: block;
}
.input-wrapper {
  margin: 40px;
}
.button--add {
  padding-left: 25px;
  padding-right: 25px;
}
</style>
