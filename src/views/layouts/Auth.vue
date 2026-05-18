<template>
  <div class="auth" :class="{ 'register-page': $route.path.startsWith('/register'), 'login-page': $route.path.startsWith('/login') }">
    <!-- <header>
      <img class="logo" src="@/assets/img/logo-big.svg" style="width: 400px;">
      <p style="color: white; font-size: 14px; margin: 12px 0 8px 0;">Siguenos</p>
      <div class="social">
        <a class="fab fa-facebook-square" :href="fb" target="_blank"></a>
        <a class="fab fa-instagram"       :href="is" target="_blank"></a>
        <a class="fab fa-tiktok"          :href="tk" target="_blank"></a>
        <a class="fab fa-youtube"         :href="yt" target="_blank"></a>
      </div>
    </header> -->
    <section id="content-auth">
      <div class="content">
        <div class="form">
          <header>
            <!-- <img class="logo" src="@/assets/img/logo/logo.jpeg"> <br> -->
            <!-- <img class="logo-text" src="@/assets/img/logo/text.svg"> -->
          </header>

          <slot />
        </div>
        <!-- <div class="links">
          <a :href="msn"  target="_blank" class="link"><small>Ayuda</small></a>
          <a :href="site" target="_blank" class="link"><small></small></a>
          <a :href="wsp"  target="_blank" class="link"><small>Whatsapp de Ayuda</small></a>
        </div> -->
      </div>
    </section>

    <section class="welcome-section" aria-hidden="true">
      <div class="welcome-content">
        <div class="welcome-logo-wrap">
          <img
            class="welcome-logo"
            src="@/assets/img/logo/Logoto.png"
            alt="Class Natural Moringa"
          />
        </div>
        <p class="welcome-brand">CLASS NATURAL MORINGA</p>
        <p class="welcome-brand-sub">S.R.L.</p>
        <p class="welcome-slogan">
          Donde la <span class="welcome-gold">naturaleza</span> y el
          <span class="welcome-gold">bienestar</span>
          se unen para
          <span class="welcome-gold">transformar tu vida.</span>
        </p>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  computed: {
    // msn()  { return this.$store.state.msn },
    // wsp()  { return this.$store.state.wsp_bo },
    wsp() {
      return this.$store.state.wsp_ec;
    },
    site() {
      return this.$store.state.site;
    },

    // social
    fb() {
      return this.$store.state.fb;
    },
    is() {
      return this.$store.state.is;
    },
    tk() {
      return this.$store.state.tk;
    },
    yt() {
      return this.$store.state.yt;
    },
  },
};
</script>
<style scoped>
.form {
  background: #ffffff;
  border-radius: 0;
  padding: 16px;
  width: 100%;
  height: 100vh;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow-y: auto;
}

/* Responsive para el formulario */
@media (max-width: 1024px) {
  .form {
    padding: 20px;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
  }
}

@media (max-width: 768px) {
  .form {
    padding: 8px;
    height: 100%;
    min-height: 70vh;
    max-height: 70vh;
    justify-content: flex-start;
    padding-top: 16px;
    padding-bottom: 8px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    border-radius: 50px 50px 0 0 !important; /* Bordes más redondos en círculos */
  }
}

@media (max-width: 480px) {
  .form {
    padding: 10px;
    padding-top: 12px;
  }
}
@media (max-width: 1260px) {
  .logo-auth {
    display: none;
  }
}
@media (min-width: 1260px) {
  .logo-blanco {
    display: none;
  }
}

.welcome-section {
  display: none;
}

@media (min-width: 1261px) {
  .welcome-section {
    display: flex;
    position: absolute;
    top: 0;
    right: 0;
    width: 50%;
    height: 100vh;
    align-items: center;
    justify-content: center;
    z-index: 3;
    pointer-events: none;
    padding: 72px 16px 32px 88px;
    box-sizing: border-box;
  }

  .welcome-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    max-width: 520px;
    font-family: 'Open Sans', sans-serif;
    transform: translate(52px, -52px);
  }

  .welcome-logo-wrap {
    width: min(268px, 24vw);
    height: calc(min(268px, 24vw) * 401 / 512);
    margin: 0 auto;
    overflow: hidden;
  }

  .welcome-logo {
    width: min(268px, 24vw);
    height: auto;
    display: block;
    margin: 0;
    margin-top: calc(min(268px, 24vw) * -55 / 512);
  }

  .welcome-brand {
    margin: 0;
    font-size: 18px;
    font-weight: 700;
    letter-spacing: 0.01em;
    color: #d4b46a;
    line-height: 1;
  }

  .welcome-brand-sub {
    margin: -4px 0 32px;
    font-size: 18px;
    font-weight: 700;
    letter-spacing: 0.01em;
    color: #d4b46a;
    line-height: 1;
  }

  .welcome-slogan {
    margin: 0;
    font-size: 34px;
    font-weight: 500;
    line-height: 1.45;
    color: #ffffff;
  }

  .welcome-gold {
    color: #d4b46a;
    font-weight: 600;
  }
}

</style>
