<template>
  <App :session="session" title="Comprobante">
    <div class="comprobante-page">
      <div v-if="loading" class="comprobante-state">
        <div class="loading-spinner-large"></div>
        <p>Cargando comprobante...</p>
      </div>

      <div v-else-if="error" class="comprobante-state comprobante-state--error">
        <i class="fas fa-exclamation-triangle"></i>
        <p>{{ error }}</p>
        <button class="btn-back" @click="$router.push('/activations')">
          Volver al historial
        </button>
      </div>

      <BoletaDigital
        v-else-if="orderData"
        :order-data="orderData"
        :client-data="clientData"
        :products="products"
        :show-actions="true"
      />
    </div>
  </App>
</template>

<script>
import App from "@/views/layouts/App";
import api from "@/api";
import BoletaDigital from "@/components/BoletaDigital.vue";

export default {
  components: {
    App,
    BoletaDigital,
  },
  data() {
    return {
      loading: true,
      error: null,
      orderData: null,
      clientData: null,
      products: [],
    };
  },
  computed: {
    session() {
      return this.$store.state.session;
    },
  },
  async created() {
    const id = this.$route.query.id;
    const type = this.$route.query.type === "affiliation" ? "affiliation" : "activation";

    if (!id) {
      this.loading = false;
      this.error = "Comprobante no encontrado.";
      return;
    }

    try {
      const { data } = await api.Boleta.GET(this.session, { id, type });

      if (data.error) {
        this.error = data.msg || "No se pudo cargar el comprobante.";
        return;
      }

      this.orderData = data.orderData;
      this.clientData = data.clientData;
      this.products = data.products || [];
    } catch (e) {
      console.error(e);
      this.error = "Error de conexión al obtener el comprobante.";
    } finally {
      this.loading = false;
    }
  },
};
</script>

<style scoped>
.comprobante-page {
  min-height: 60vh;
  padding: 16px 0 40px;
}

.comprobante-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 320px;
  color: #666;
  text-align: center;
  gap: 12px;
}

.comprobante-state--error i {
  font-size: 42px;
  color: #c0392b;
}

.btn-back {
  margin-top: 8px;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  background: #1b5e3a;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
}

.loading-spinner-large {
  width: 48px;
  height: 48px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #1b5e3a;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
