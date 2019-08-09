<template>
  <div class="posts">
    <h1>Add Post</h1>
      <div class="form">
        <div>
          <input type="text" name="nombre" placeholder="Nombre" v-model="nombre">
        </div>
        <div>
          <input type="text" name="direccion" placeholder="Direccion" v-model="direccion">
        </div>
        <div>
          <input type="text" name="telefono" placeholder="Telefono" v-model="telefono">
        </div>
        <div>
          <button class="app_post_btn" @click="addPost">Add</button>
        </div>
      </div>
  </div>
</template>

<script>
import PostsService from '@/services/PostsService'
export default {
  name: 'addpost',
  data () {
    return {
      nombre: '',
      direccion: '',
      telefono: ''
    }
  },
  methods: {
    async addPost () {
      await PostsService.addPost({
        nombre: this.nombre,
        direccion: this.direccion,
        telefono: this.telefono
      })
      this.$swal(
        'Great!',
        `Your post has been added!`,
        'success'
      )
      this.$router.push({ name: 'Posts' })
    }
  }
}
</script>
<style type="text/css">
.form input, .form textarea {
  width: 500px;
  padding: 10px;
  border: 1px solid #e0dede;
  outline: none;
  font-size: 12px;
}
.form div {
  margin: 20px;
}
.app_post_btn {
  background: palevioletred;
  color: #fff;
  padding: 10px 80px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
  width: 520px;
  border: none;
  cursor: pointer;
}
</style>
