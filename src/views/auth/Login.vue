<template>
  <Auth>
    <section class="login-panel">
      <div class="login-tabs-mobile">
        <router-link
          to="/login"
          class="tab-login"
          :class="{ active: $route.path === '/login' }"
        >
          INICIO
        </router-link>
        <router-link
          to="/register"
          class="tab-login"
          :class="{ active: $route.path.startsWith('/register') }"
        >
          REGISTRO
        </router-link>
      </div>

      <div class="login-mobile-hero">
        <div class="login-form-logo-wrap">
          <img
            class="login-form-logo"
            src="@/assets/img/logo/Logoto.png"
            alt="Class Natural Moringa"
          />
        </div>
        <p class="login-form-brand">CLASS NATURAL MORINGA</p>
        <p class="login-form-brand-sub">S.R.L.</p>
      </div>

      <header class="login-form-header">
        <p class="login-form-leaf" aria-hidden="true">
          <i class="fas fa-leaf"></i>
          <i class="fas fa-leaf"></i>
          <i class="fas fa-leaf"></i>
        </p>
        <h2 class="login-form-title">
          <span class="login-form-title-line">Bienvenido a</span>
          <span class="login-form-title-line">nuestra plataforma</span>
        </h2>
      </header>

      <div class="login-field">
        <label class="login-label" for="dni">Usuario</label>
        <div class="login-input-wrap">
          <i class="far fa-user login-field-icon login-field-icon--left" aria-hidden="true"></i>
          <input
            id="dni"
            class="input login-input"
            placeholder="Ingresa tu usuario"
            oninput="this.value=this.value.replace(/(?![0-9])./gmi,'')"
            v-model="dni"
            :class="{ error: error.dni }"
            @keydown="reset('dni')"
          />
        </div>
      </div>

      <div v-if="!office_id" class="login-field">
        <label class="login-label" for="password">Contraseña</label>
        <div class="login-input-wrap">
          <i class="fas fa-lock login-field-icon login-field-icon--left" aria-hidden="true"></i>
          <input
            id="password"
            :type="show ? 'text' : 'password'"
            class="input login-input login-input--password"
            placeholder="Ingresa tu contraseña"
            v-model="password"
            :class="{ error: error.password }"
            @keydown="reset('password')"
          />
          <button
            type="button"
            class="login-field-icon login-field-icon--right login-toggle-pass"
            :aria-label="show ? 'Ocultar contraseña' : 'Mostrar contraseña'"
            @click="show = !show"
          >
            <i :class="show ? 'far fa-eye-slash' : 'far fa-eye'"></i>
          </button>
        </div>
      </div>

      <p class="alert">{{ alert | alert }}</p>

      <button class="login-button" v-show="!sending" @click="submit">
        Iniciar Sesión
      </button>
      <button class="login-button" v-show="sending" disabled>
        Validando datos ...
      </button>

      <p class="login-forgot">
        <router-link to="/remember">¿Has olvidado tu contraseña?</router-link>
      </p>
    </section>

    <footer class="login-footer">
      <div class="login-link">
        <small>
          ¿No tienes cuenta?
          <router-link to="/register">Regístrate</router-link>
        </small>
      </div>
    </footer>
  </Auth>
</template>

<script>
import Auth from "@/views/layouts/Auth";
import api from "@/api";

export default {
  components: { Auth },
  data() {
    return {
      dni: null,
      password: null,
      error: {
        dni: false,
        password: false,
      },
      sending: false,
      alert: null,
      show: false,

      office_id: null,
      path: null,
    };
  },
  filters: {
    alert(msg) {
      if (msg == "dni not found") return "El documento no existe";
      if (msg == "invalid password") return "Contraseña incorrecta";
    },
  },
  created() {
    this.office_id = this.$route.params.id;
    this.path = this.$route.query.path;
    console.log({ office_id: this.office_id, path: this.path });

    if (this.office_id) {
      this.password = "8QfghvCxuzxrbvii4w";
    } else {
      localStorage.removeItem("office");
      localStorage.removeItem("path");
    }

    setTimeout(() => {
      const logoAuth = document.getElementById("logo-auth");
      if (logoAuth) logoAuth.style.order = 0;

      const contentAuth = document.getElementById("content-auth");
      if (contentAuth) contentAuth.style.order = 1;
    }, 100);
  },
  mounted() {
    if (!window.google || !window.google.accounts) {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.onload = this.renderGoogleButton;
      document.head.appendChild(script);
    } else {
      this.renderGoogleButton();
    }
  },
  methods: {
    renderGoogleButton() {
      if (
        window.google &&
        window.google.accounts &&
        window.google.accounts.id
      ) {
        window.google.accounts.id.initialize({
          client_id:
            "511469100162-s6f2f9qbkr533hbvaoevbr6m0mhfdrvk.apps.googleusercontent.com",
          callback: this.handleGoogleCredentialResponse,
        });
        const el = document.getElementById("g_id_signin");
        if (el) {
          window.google.accounts.id.renderButton(el, {
            theme: "outline",
            size: "large",
            text: "signin_with",
            width: 200,
          });
        }
      }
    },
    async handleGoogleCredentialResponse(response) {
      try {
        const id_token = response.credential;
        const { data } = await api.loginWithGoogle(id_token);
        if (data.error) {
          this.alert = data.msg;
          return;
        }

        this.$store.commit("SET_SESSION", data.session);

        if (data.name) this.$store.commit("SET_NAME", data.name);
        if (data.lastName) this.$store.commit("SET_LAST_NAME", data.lastName);
        if (data.email) this.$store.commit("SET_EMAIL", data.email);
        if (data.photo) this.$store.commit("SET_PHOTO", data.photo);
        if (data.plan) this.$store.commit("SET_PLAN", data.plan);
        if (data.total_points !== undefined)
          this.$store.commit("SET_TOTAL_POINTS", data.total_points);

        this.$store.commit("SET_AFFILIATED", data.affiliated);

        if (data.affiliated) {
          this.$router.push("/dashboard");
        } else {
          this.$router.push("/affiliation");
        }
      } catch (e) {
        alert("Error al iniciar sesión con Google");
      }
    },
    async submit() {
      const { dni, password, office_id, path } = this;

      if (!dni) {
        return (this.error.dni = true);
      }
      if (!password) {
        return (this.error.password = true);
      }

      this.sending = true;

      try {
        const { data } = await api.login({ dni, password, office_id });
        this.sending = false;

        if (data.error) {
          this.alert = data.msg;
          return;
        }

        this.$store.commit("SET_SESSION", data.session);

        if (office_id) {
          this.$store.commit("SET_OFFICE_ID", { office_id, path });
        }

        if (data.affiliated === undefined || data.affiliated === null) {
          try {
            const userData = await api.Afiliation.GET(data.session);

            if (userData.data.error) {
              this.alert = "Error al obtener información del usuario";
              return;
            }

            const userInfo = userData.data;

            if (userInfo.name) this.$store.commit("SET_NAME", userInfo.name);
            if (userInfo.lastName)
              this.$store.commit("SET_LAST_NAME", userInfo.lastName);
            if (userInfo.email) this.$store.commit("SET_EMAIL", userInfo.email);
            if (userInfo.photo) this.$store.commit("SET_PHOTO", userInfo.photo);
            if (userInfo.plan) this.$store.commit("SET_PLAN", userInfo.plan);
            if (userInfo.total_points !== undefined)
              this.$store.commit("SET_TOTAL_POINTS", userInfo.total_points);

            this.$store.commit("SET_AFFILIATED", userInfo.affiliated);

            if (userInfo.tree !== undefined)
              this.$store.commit("SET_TREE", userInfo.tree);
            if (userInfo.activated !== undefined)
              this.$store.commit("SET_ACTIVATED", userInfo.activated);
            if (userInfo._activated !== undefined)
              this.$store.commit("SET__ACTIVATED", userInfo._activated);
            if (userInfo.country)
              this.$store.commit("SET_COUNTRY", userInfo.country);
            if (userInfo.balance !== undefined)
              this.$store.commit("SET_BALANCE", userInfo.balance);
            if (userInfo._balance !== undefined)
              this.$store.commit("SET__BALANCE", userInfo._balance);
          } catch (userError) {
            this.alert = "Error al obtener información del usuario";
            return;
          }
        } else {
          if (data.name) this.$store.commit("SET_NAME", data.name);
          if (data.lastName) this.$store.commit("SET_LAST_NAME", data.lastName);
          if (data.email) this.$store.commit("SET_EMAIL", data.email);
          if (data.photo) this.$store.commit("SET_PHOTO", data.photo);
          if (data.plan) this.$store.commit("SET_PLAN", data.plan);
          if (data.total_points !== undefined)
            this.$store.commit("SET_TOTAL_POINTS", data.total_points);

          this.$store.commit("SET_AFFILIATED", data.affiliated);

          if (data.tree !== undefined) this.$store.commit("SET_TREE", data.tree);
          if (data.activated !== undefined)
            this.$store.commit("SET_ACTIVATED", data.activated);
          if (data._activated !== undefined)
            this.$store.commit("SET__ACTIVATED", data._activated);
          if (data.country) this.$store.commit("SET_COUNTRY", data.country);
          if (data.balance !== undefined)
            this.$store.commit("SET_BALANCE", data.balance);
          if (data._balance !== undefined)
            this.$store.commit("SET__BALANCE", data._balance);
        }

        await this.$nextTick();
        await this.$nextTick();
        await this.$nextTick();

        if (
          this.$store.state.affiliated === null ||
          this.$store.state.affiliated === undefined
        ) {
          const localAffiliated = localStorage.getItem("affiliated");
          if (localAffiliated !== null) {
            this.$store.commit(
              "SET_AFFILIATED",
              localAffiliated === "true"
            );
          }
          await this.$nextTick();
        }

        if (office_id) {
          this.$router.push(`/${this.path}`);
        } else if (this.$store.state.affiliated) {
          this.$router.push("/dashboard");
        } else {
          this.$router.push("/affiliation");
        }
      } catch (error) {
        this.sending = false;
        this.alert = "Error en el servidor. Intente nuevamente.";
        console.error("Error en login:", error);
      }
    },
    reset(name) {
      this.alert = null;

      if (name == "dni") this.error.dni = false;
      if (name == "password") this.error.password = false;
    },
  },
};
</script>
<style scoped lang="stylus">
@import '~@/assets/style/login.styl';
</style>
