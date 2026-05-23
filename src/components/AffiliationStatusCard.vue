<template>
  <router-link
    :to="to"
    class="md-card-afiliacion"
    :class="`md-card-afiliacion--${variant}`"
  >
    <div class="afiliacion-content">
      <div class="afiliacion-text">
        <h3 class="afiliacion-title">
          <template v-if="titleHighlight">
            {{ titlePrefix }}
            <span class="afiliacion-highlight">{{ titleHighlight }}</span>
          </template>
          <template v-else>{{ title }}</template>
        </h3>
        <p class="afiliacion-message">{{ message }}</p>
        <span class="afiliacion-btn">Más información</span>
      </div>
      <div class="afiliacion-icon-wrap" aria-hidden="true">
        <!-- Sin afiliación: usuario + -->
        <svg
          v-if="variant === 'register'"
          class="afiliacion-icon-svg"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="28" cy="22" r="10" stroke="currentColor" stroke-width="2.5" />
          <path
            d="M12 52c0-9 7-14 16-14s16 5 16 14"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
          />
          <circle cx="46" cy="46" r="12" stroke="currentColor" stroke-width="2.5" />
          <path d="M46 40v12M40 46h12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" />
        </svg>
        <!-- CLASS: caja + estrella -->
        <svg
          v-else-if="variant === 'class'"
          class="afiliacion-icon-svg"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 22h36l6 8v22H10V22z"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linejoin="round"
          />
          <path d="M10 22l6-8h36" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round" />
          <path d="M22 22v-8" stroke="currentColor" stroke-width="2.5" />
          <path
            d="M42 38l4 4 8-8"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M48 14l2 4 4-2-2 4-4-2 4 2-4-2-4 2z"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linejoin="round"
          />
        </svg>
        <!-- EMPRESARIO: maletín + crecimiento -->
        <svg
          v-else
          class="afiliacion-icon-svg"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="10" y="20" width="34" height="28" rx="3" stroke="currentColor" stroke-width="2.5" />
          <path d="M18 20v-6h18v6" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round" />
          <path d="M10 32h34" stroke="currentColor" stroke-width="2.5" />
          <path
            d="M44 42h14v10H44z"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linejoin="round"
          />
          <path d="M48 36v6M44 40h8" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" />
          <path d="M46 46v4M50 44v4M54 42v6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" />
        </svg>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "AffiliationStatusCard",
  props: {
    variant: {
      type: String,
      required: true,
      validator: (v) => ["register", "class", "empresario"].includes(v),
    },
    title: { type: String, required: true },
    titleHighlight: { type: String, default: "" },
    message: { type: String, required: true },
    to: { type: String, default: "/affiliation" },
  },
  computed: {
    titlePrefix() {
      if (!this.titleHighlight) return "";
      const h = this.titleHighlight;
      if (this.title.endsWith(h)) {
        return this.title.slice(0, -h.length).trimEnd();
      }
      if (this.title.includes(h)) {
        return this.title.replace(h, "").trim();
      }
      return "Paquete";
    },
  },
};
</script>

<style scoped>
.md-card-afiliacion {
  display: block;
  text-decoration: none;
  background: linear-gradient(118deg, #0a1f14 0%, #143d28 42%, #1f5c38 100%) !important;
  color: #fff;
  position: relative;
  overflow: hidden;
  min-height: 200px;
  padding: 20px 22px;
  border-radius: 16px;
  box-sizing: border-box;
  border: 1px solid rgba(212, 175, 55, 0.12);
  box-shadow: 0 4px 18px rgba(15, 42, 28, 0.12);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.md-card-afiliacion:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 28px rgba(15, 42, 28, 0.22);
}

.md-card-afiliacion::before {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 88% 18%, rgba(212, 175, 55, 0.22), transparent 52%);
  pointer-events: none;
}

.md-card-afiliacion--empresario::before {
  background: radial-gradient(circle at 88% 18%, rgba(212, 175, 55, 0.28), transparent 55%);
}

.afiliacion-content {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  min-height: 168px;
  padding: 4px 0;
}

.afiliacion-text {
  flex: 1;
  min-width: 0;
}

.afiliacion-title {
  margin: 0 0 10px;
  font-size: 1.42rem;
  font-weight: 700;
  line-height: 1.2;
  color: #fff;
}

.afiliacion-highlight {
  color: #e8c547;
  font-weight: 800;
  letter-spacing: 0.02em;
}

.afiliacion-message {
  margin: 0 0 16px;
  font-size: 0.95rem;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.92);
  max-width: 240px;
}

.afiliacion-btn {
  display: inline-block;
  padding: 9px 22px;
  border: 1.5px solid #d4af37;
  border-radius: 9px;
  color: #fff;
  font-size: 0.92rem;
  font-weight: 600;
  background: transparent;
}

.afiliacion-icon-wrap {
  flex-shrink: 0;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: rgba(212, 175, 55, 0.12);
  border: 2px solid rgba(212, 175, 55, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #d4af37;
}

.afiliacion-icon-svg {
  width: 56px;
  height: 56px;
}

@media (max-width: 520px) {
  .afiliacion-content {
    flex-direction: column-reverse;
    text-align: center;
    padding: 8px 0 4px;
  }

  .afiliacion-message {
    max-width: none;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
