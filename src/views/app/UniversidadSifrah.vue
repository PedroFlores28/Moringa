<template>
  <App :session="session" :title="title">
    <div class="universidad-sifrah">
      <h2 class="page-title">Universidad ClassMoringa</h2>
      <p class="page-subtitle">
        Aquí irá el contenido de la Universidad (cursos, enlaces, materiales, etc.).
      </p>
    </div>
  </App>
</template>

<script>
import App from "@/views/layouts/App";

export default {
  name: "UniversidadSifrah",
  components: { App },
  data() {
    return {
      title: "Universidad ClassMoringa",
      session: this.$store.state.session,
    };
  },
};
</script>

<style scoped>
.universidad-sifrah {
  padding: 16px;
}

.page-title {
  margin: 0 0 8px 0;
  font-size: 22px;
  font-weight: 800;
  color: #111;
}

.page-subtitle {
  margin: 0;
  color: #555;
}
</style>

