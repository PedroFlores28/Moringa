<template>
  <Auth>
    <section>
      <div class="register-mobile-hero" aria-hidden="true">
        <div class="register-form-logo-wrap">
          <img
            class="register-form-logo"
            src="@/assets/img/logo/Logoto.png"
            alt="Class Natural Moringa"
          />
        </div>
        <p class="register-form-brand">CLASS NATURAL MORINGA</p>
        <p class="register-form-brand-sub">S.R.L.</p>
      </div>

      <div class="register-title-form">
        <h1>REGÍSTRATE</h1>
      </div>
      
      <!-- Documento de Identidad -->
      <div class="form-field">
        <div class="input-container">
          <input
            id="dni"
            class="input-register-new"
            placeholder="Cédula de identidad"
            oninput="this.value=this.value.replace(/(?![0-9])./gmi,'')"
            v-model="dni"
            :class="{ error: error.dni }"
            @keydown="reset('dni')"
          />
          <svg 
            class="overflow-icon" 
            width="20" 
            height="20" 
            viewBox="0 0 19 19" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_3401_11851)">
              <path d="M11.6776 4.16922C11.6776 3.93352 11.7694 3.70747 11.9327 3.5408C12.096 3.37413 12.3176 3.2805 12.5486 3.2805H22.129C22.36 3.2805 22.5816 3.37413 22.7449 3.5408C22.9082 3.70747 23 3.93352 23 4.16922C23 4.40492 22.9082 4.63097 22.7449 4.79764C22.5816 4.9643 22.36 5.05794 22.129 5.05794H12.5486C12.3176 5.05794 12.096 4.9643 11.9327 4.79764C11.7694 4.63097 11.6776 4.40492 11.6776 4.16922ZM22.129 8.61281H12.5486C12.3176 8.61281 12.096 8.70644 11.9327 8.87311C11.7694 9.03978 11.6776 9.26583 11.6776 9.50153C11.6776 9.73723 11.7694 9.96328 11.9327 10.13C12.096 10.2966 12.3176 10.3903 12.5486 10.3903H22.129C22.36 10.3903 22.5816 10.2966 22.7449 10.13C22.9082 9.96328 23 9.73723 23 9.50153C23 9.26583 22.9082 9.03978 22.7449 8.87311C22.5816 8.70644 22.36 8.61281 22.129 8.61281ZM22.129 13.9451H15.1614C14.9304 13.9451 14.7089 14.0388 14.5456 14.2054C14.3822 14.3721 14.2905 14.5981 14.2905 14.8338C14.2905 15.0695 14.3822 15.2956 14.5456 15.4623C14.7089 15.6289 14.9304 15.7226 15.1614 15.7226H22.129C22.36 15.7226 22.5816 15.6289 22.7449 15.4623C22.9082 15.2956 23 15.0695 23 14.8338C23 14.5981 22.9082 14.3721 22.7449 14.2054C22.5816 14.0388 22.36 13.9451 22.129 13.9451ZM7.0278 11.0568C7.89219 10.3774 8.52651 9.43904 8.8418 8.37321C9.15709 7.30739 9.13753 6.1676 8.78588 5.11369C8.43423 4.05978 7.76811 3.14461 6.88095 2.49654C5.99379 1.84847 4.93009 1.5 3.83902 1.5C2.74796 1.5 1.68425 1.84847 0.797094 2.49654C-0.0900655 3.14461 -0.756182 4.05978 -1.10784 5.11369C-1.45949 6.1676 -1.47904 7.30739 -1.16375 8.37321C-0.848463 9.43904 -0.214145 10.3774 0.650242 11.0568C-1.59464 12.0266 -3.36376 13.9785 -3.97234 16.3891C-4.00558 16.5205 -4.00891 16.6579 -3.98206 16.7907C-3.95521 16.9236 -3.89891 17.0484 -3.81746 17.1557C-3.73601 17.2629 -3.63159 17.3497 -3.51218 17.4094C-3.39278 17.4691 -3.26157 17.5001 -3.12861 17.5H10.8067C10.9396 17.5001 11.0708 17.4691 11.1902 17.4094C11.3096 17.3497 11.4141 17.2629 11.4955 17.1557C11.577 17.0484 11.6333 16.9236 11.6601 16.7907C11.6869 16.6579 11.6836 16.5205 11.6504 16.3891C11.0418 13.9773 9.27268 12.0255 7.0278 11.0568Z" fill="#13402c82"/>
            </g>
            <defs>
              <clipPath id="clip0_3401_11851">
                <rect width="19" height="19" fill="white"/>
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>

      <!-- Checkbox menor de edad -->
      <div class="checkbox-field">
        <label class="checkbox-label">
          <input type="checkbox" v-model="younger" class="checkbox-input" />
          <span class="checkbox-text">Menor de edad / extranjero</span>
        </label>
      </div>

      <!-- Nombre y Apellido en fila -->
      <div class="form-row">
        <div class="form-field">
          <div class="input-container">
            <input
              id="name"
              class="input-register-new"
              placeholder="Nombre"
              v-model="name"
              :class="{ error: error.name }"
              @keydown="reset('name')"
            />
            <svg 
              class="input-icon" 
              width="20" 
              height="20" 
              viewBox="0 0 13 15" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6.49984 0.375C8.24942 0.375 9.6665 1.79208 9.6665 3.54167C9.6665 5.29125 8.24942 6.70833 6.49984 6.70833C4.75025 6.70833 3.33317 5.29125 3.33317 3.54167C3.33317 1.79208 4.75025 0.375 6.49984 0.375ZM9.6665 8.71917C9.6665 9.55833 9.44484 11.5138 7.93275 13.6988L7.2915 9.875L8.03567 8.38667C7.54484 8.33125 7.03025 8.29167 6.49984 8.29167C5.96942 8.29167 5.45484 8.33125 4.964 8.38667L5.70817 9.875L5.06692 13.6988C3.55484 11.5138 3.33317 9.55833 3.33317 8.71917C1.44109 9.27333 0.166504 10.2708 0.166504 11.4583V14.625H12.8332V11.4583C12.8332 10.2708 11.5665 9.27333 9.6665 8.71917Z" fill="#13402c82"/>
            </svg>
          </div>
        </div>
        <div class="form-field">
          <div class="input-container">
            <input
              id="lastName"
              class="input-register-new"
              placeholder="Apellido"
              v-model="lastName"
              :class="{ error: error.lastName }"
              @keydown="reset('lastName')"
            />
            <svg 
              class="input-icon" 
              width="20" 
              height="20" 
              viewBox="0 0 13 15" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6.49984 0.375C8.24942 0.375 9.6665 1.79208 9.6665 3.54167C9.6665 5.29125 8.24942 6.70833 6.49984 6.70833C4.75025 6.70833 3.33317 5.29125 3.33317 3.54167C3.33317 1.79208 4.75025 0.375 6.49984 0.375ZM9.6665 8.71917C9.6665 9.55833 9.44484 11.5138 7.93275 13.6988L7.2915 9.875L8.03567 8.38667C7.54484 8.33125 7.03025 8.29167 6.49984 8.29167C5.96942 8.29167 5.45484 8.33125 4.964 8.38667L5.70817 9.875L5.06692 13.6988C3.55484 11.5138 3.33317 9.55833 3.33317 8.71917C1.44109 9.27333 0.166504 10.2708 0.166504 11.4583V14.625H12.8332V11.4583C12.8332 10.2708 11.5665 9.27333 9.6665 8.71917Z" fill="#13402c82"/>
            </svg>
          </div>
        </div>
      </div>

      <!-- Celular -->
      <div class="form-field">
        <div class="input-container">
          <input
            id="phone"
            class="input-register-new"
            placeholder="Celular"
            oninput="this.value=this.value.replace(/(?![0-9])./gmi,'')"
            v-model="phone"
            :class="{ error: error.phone }"
            @keydown="reset('phone')"
          />
          <svg 
            class="overflow-icon" 
            width="20" 
            height="20" 
            viewBox="0 0 19 19" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12.6667 1.58337H6.33333C5.91341 1.58337 5.51068 1.75019 5.21375 2.04712C4.91681 2.34405 4.75 2.74678 4.75 3.16671V15.8334C4.75 16.2533 4.91681 16.656 5.21375 16.953C5.51068 17.2499 5.91341 17.4167 6.33333 17.4167H12.6667C13.0866 17.4167 13.4893 17.2499 13.7863 16.953C14.0832 16.656 14.25 16.2533 14.25 15.8334V3.16671C14.25 2.74678 14.0832 2.34405 13.7863 2.04712C13.4893 1.75019 13.0866 1.58337 12.6667 1.58337ZM10.2917 16.625H8.70833V15.8334H10.2917V16.625ZM12.6667 15.0417H6.33333V3.95837H12.6667V15.0417Z" fill="#13402c82"/>
          </svg>
        </div>
      </div>

      <!-- Correo -->
      <div class="form-field">
        <div class="input-container">
          <input
            id="email"
            class="input-register-new"
            type="email"
            placeholder="Correo"
            v-model="email"
            :class="{ error: error.email }"
            @keydown="reset('email')"
          />
          <i class="fas fa-envelope overflow-icon"></i>
        </div>
      </div>

      <!-- Fecha de Nacimiento -->
      <div class="form-field">
        <div class="input-container">
          <input
            id="birthDate"
            class="input-register-new date-input"
            type="text"
            placeholder="dd/mm/aaaa"
            :value="birthDate"
            @input="formatDateInput"
            :class="{ error: error.birthDate }"
            @keydown="reset('birthDate')"
            maxlength="10"
          />
          <i class="fas fa-calendar-alt overflow-icon"></i>
        </div>
      </div>

      <!-- Depto -->
      <div class="form-field">
        <div class="input-container">
          <select
            id="department"
            class="input-register-new select-field"
            v-model="department"
            :class="{ error: error.department }"
            @change="onDepartmentChange"
          >
            <option value="" disabled>Depto.</option>
            <option v-for="dept in departments" :key="dept.value" :value="dept.value">
              {{ dept.name }}
            </option>
          </select>
        </div>
      </div>

      <!-- Contraseña -->
      <div class="form-field">
        <div class="input-container">
          <input
            id="password"
            class="input-register-new"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Contraseña"
            v-model="password"
            :class="{ error: error.password }"
            @keydown="reset('password')"
          />
          <i 
            :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"
            class="overflow-icon password-icon"
            @click="togglePassword"
          ></i>
        </div>
      </div>

      <!-- Código de patrocinador -->
      <div class="form-field">
        <div class="input-container">
          <input
            id="sponsorCode"
            class="input-register-new"
            placeholder="Código de patrocinador"
            v-model="sponsorCode"
            :class="{ error: error.sponsorCode }"
            @keydown="reset('sponsorCode')"
          />
          <svg 
            class="overflow-icon" 
            width="20" 
            height="20" 
            viewBox="0 0 19 19" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.3658 4.09291L14.967 15.3227C14.7881 16.1136 14.329 16.2917 13.6655 15.9347L10.0674 13.281L8.30596 14.9649C8.12784 15.1438 7.94892 15.3227 7.54042 15.3227L7.82147 11.6217L14.5332 5.52266C14.8135 5.24162 14.4564 5.1395 14.0994 5.36987L5.75442 10.6265L2.15551 9.52929C1.36463 9.27437 1.36463 8.73762 2.33442 8.38137L16.3192 2.945C17.008 2.74075 17.5954 3.09858 17.3658 4.09291Z" fill="#13402c82"/>
          </svg>
        </div>
      </div>

      <!-- Mensaje de alerta -->
      <div v-if="alert" class="alert-message">
        {{ alert | alert }}
      </div>

      <!-- Botón de registro -->
      <button class="register-button" @click="submit" :disabled="sending">
        {{ sending ? 'Registrando...' : 'Registrarme' }}
      </button>

      <!-- Términos y condiciones -->
      <div class="terms-field">
        <label class="checkbox-label">
          <input type="checkbox" v-model="acceptTerms" class="checkbox-input" />
          <span class="checkbox-text">Acepto los términos de uso</span>
        </label>
      </div>

      <!-- Enlace de login -->
      <div class="login-link">
        <small>¿Ya tienes una cuenta? <router-link to="/login">Haz click aquí</router-link></small>
      </div>

    </section>
  </Auth>
</template>

<script>
import Auth from "@/views/layouts/Auth";
import api from "@/api";

export default {
  components: { Auth },
  data() {
    return {
      // country: 'Perú',
      // country: 'Bolivia',
      // country: 'Ecuador',
      country: null,

      younger: false,
      dni: null,
      name: null,
      lastName: null,
      // username: null,
      birthDate: "",
      email: null,
      phone: null,
      password: "",
      sponsorCode: null,
      acceptTerms: false,
      showPassword: false,
      department: "",
      code: null,
      check: false,
      
      // Datos de ubicación
      departments: [
        { value: 'la-paz', name: 'La Paz' },
        { value: 'santa-cruz', name: 'Santa Cruz' },
        { value: 'cochabamba', name: 'Cochabamba' },
        { value: 'oruro', name: 'Oruro' },
        { value: 'potosi', name: 'Potosí' },
        { value: 'chuquisaca', name: 'Chuquisaca' },
        { value: 'tarija', name: 'Tarija' },
        { value: 'beni', name: 'Beni' },
        { value: 'pando', name: 'Pando' }
      ],
      
      error: {
        country: false,
        dni: false,
        name: false,
        lastName: false,
        birthDate: false,
        email: false,
        phone: false,
        department: false,
        password: false,
        sponsorCode: false,
      },
      sending: false,
      alert: null,
      disabled: false,
      show: false,
    };
  },
  filters: {
      alert(msg) {
        if (msg === "dni already use") return "El documento ya existe";
        if (msg === "email already use") return "El correo electrónico ya está en uso";
        if (msg === "code not found") return "El código de invitación no existe";
        if (msg === "code required") return "El código de patrocinador es requerido";
        return msg;
      },
    },
  computed: {
    prefix() {
      if (this.country == "Ecuador") return "+593";
      if (this.country == "Perú") return "+51";
      if (this.country == "Argentina") return "+54";
      if (this.country == "Bolivia") return "+591";
      if (this.country == "Colombia") return "+57";
      if (this.country == "Costa Rica") return "+506";
      if (this.country == "Chile") return "+56";
    },
  },
  created() {
    console.log("Register");

    this.code = this.$route.params.code;
    
    // Si viene código en la URL, pre-llenarlo en el campo de patrocinador
    if (this.code) {
      this.sponsorCode = this.code;
      this.disabled = true;
    }

    setTimeout(() => {
      const logoAuth = document.getElementById("logo-auth");
      console.log(logoAuth);
      logoAuth.style.order = 1;

      const contentAuth = document.getElementById("content-auth");
      console.log(contentAuth);
      contentAuth.style.order = 0;
    }, 100);

    // const logoAuth = document.getElementById("logo-auth");
    // console.log(logoAuth);
    // logoAuth.style.order = 1;

    // const contentAuth = document.getElementById("content-auth");
    // console.log(contentAuth);
    // contentAuth.style.order = 0;
  },
  watch: {
    /* async dni(dni) {
      if(this.country != 'Perú' || this.younger) return

      if(dni.length < 8) return

      const response = await fetch(`https://dniruc.apisperu.com/api/v1/dni/${dni}?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImhhbnNldmFuZ2VsaXN0YUBnbWFpbC5jb20ifQ.Fa2w9sYLXtcgMbtM58YRiwYvomChYwwMAoIDmYmo1H8`)

      var data = await response.json()

      if(data.success == false) {
        console.log('person not found ...')
        this.error.name = true
        return
      }

      this.error.name = false

      this.name     = data.nombres
      this.lastName = data.apellidoPaterno + ' ' + data.apellidoMaterno
    } */
  },
  methods: {
    async submit() {
      const { dni, name, lastName, password, phone, sponsorCode, email, birthDate, acceptTerms, department } = this;

      if (!dni) {
        this.error.dni = true;
        this.alert = "El documento se requiere";
        return;
      }
      if (!name) {
        this.error.name = true;
        this.alert = "El nombre se requiere";
        return;
      }
      if (!lastName) {
        this.error.lastName = true;
        this.alert = "El apellido se requiere";
        return;
      }
      if (!email) {
        this.error.email = true;
        this.alert = "El correo se requiere";
        return;
      }
      
      // Validar formato de email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        this.error.email = true;
        this.alert = "El correo no tiene un formato válido";
        return;
      }
      if (!birthDate) {
        this.error.birthDate = true;
        this.alert = "La fecha de nacimiento se requiere";
        return;
      }

      // Validar formato dd/mm/aaaa y fecha válida
      const dateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
      if (!dateRegex.test(birthDate)) {
        this.error.birthDate = true;
        this.alert = "La fecha de nacimiento debe tener el formato dd/mm/aaaa";
        return;
      }

      const [, dayStr, monthStr, yearStr] = birthDate.match(dateRegex);
      const day = parseInt(dayStr, 10);
      const month = parseInt(monthStr, 10);
      const year = parseInt(yearStr, 10);

      if (month < 1 || month > 12) {
        this.error.birthDate = true;
        this.alert = "El mes de la fecha de nacimiento no es válido";
        return;
      }

      if (day < 1 || day > 31) {
        this.error.birthDate = true;
        this.alert = "El día de la fecha de nacimiento no es válido";
        return;
      }

      const maxDays = [31, (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      if (day > maxDays[month - 1]) {
        this.error.birthDate = true;
        this.alert = "El día ingresado no es válido para ese mes";
        return;
      }

      const currentYear = new Date().getFullYear();
      if (year < 1900 || year > currentYear) {
        this.error.birthDate = true;
        this.alert = "El año de la fecha de nacimiento no es válido";
        return;
      }
      if (!password) {
        this.error.password = true;
        this.alert = "La contraseña es requerida";
        return;
      }
      if (!sponsorCode) {
        this.error.sponsorCode = true;
        this.alert = "El código de patrocinador es requerido";
        return;
      }
      if(!phone) {
        this.error.phone = true;
        this.alert = "El telefono se requiere";
        return;
      }
      if (!department) {
        this.error.department = true;
        this.alert = "Debe seleccionar un departamento";
        return;
      }
      if (!acceptTerms) {
        this.alert = "Debes aceptar los términos.";
        return;
      }

      this.sending = true;

      try {
        const { data } = await api.register({
          dni,
          name,
          lastName,
          email,
          date: birthDate,
          password,
          phone,
          code: sponsorCode,
          department,
        });

        this.sending = false;

        if (data.error) {
          this.alert = data.msg;
          return;
        }

        const session = localStorage.getItem("session");
        if (session) {
          localStorage.removeItem("session");
          api.logout(this.session);
        }

        this.$store.commit("SET_SESSION", data.session);
        
        // Redirigir según el estado de afiliación
        if (data.affiliated) {
          this.$router.push("/dashboard");
        } else {
          this.$router.push("/affiliation");
        }
      } catch (err) {
        this.sending = false;
        this.alert = "Error al registrar. Por favor intenta nuevamente.";
      }
    },

    reset(name) {
      this.alert = null;

      if (name == "dni") this.error.dni = false;
      if (name == "name") this.error.name = false;
      if (name == "lastName") this.error.lastName = false;
      if (name == "phone") this.error.phone = false;
      if (name == "email") this.error.email = false;
      if (name == "birthDate") this.error.birthDate = false;
      if (name == "password") this.error.password = false;
      if (name == "sponsorCode") this.error.sponsorCode = false;
      if (name == "department") this.error.department = false;
    },

    async onDepartmentChange() {
      this.reset('department');
    },

    togglePassword() {
      this.showPassword = !this.showPassword;
    },

    formatDateInput(event) {
      let value = event.target.value.replace(/\D/g, ''); // Solo números
      if (value.length > 8) value = value.substring(0, 8);
      
      let formatted = '';
      if (value.length > 0) {
        formatted += value.substring(0, 2);
      }
      if (value.length > 2) {
        formatted += '/' + value.substring(2, 4);
      }
      if (value.length > 4) {
        formatted += '/' + value.substring(4, 8);
      }
      
      event.target.value = formatted;
      this.birthDate = formatted;
      this.reset('birthDate');
    },
  },
};
</script>
<style scoped lang="stylus">
@import '~@/assets/style/register.styl';
</style>

