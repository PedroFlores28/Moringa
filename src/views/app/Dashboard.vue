<template>
  <App :session="session" :title="title">
    <div v-cloak class="dashboard-page-root">
      <div v-if="loading" class="loading-container">
        <div class="loading-spinner-large"></div>
        <p>Cargando dashboard...</p>
      </div>
      
      <SkeletonLoader
        v-if="loading"
        :lines="6"
        width="100%"
        height="60px"
        style="margin: 24px 0"
      />

      <!-- Dashboard Moringa -->

      <div v-else class="moringa-dashboard">

        <div class="md-row md-row-top">

          <div class="md-card md-card-nivel">

            <h3 class="md-card-title nivel-card-title">Nivel Actual</h3>

            <div class="nivel-body">

              <div class="nivel-visual">

                <div class="nivel-diamond-scene" aria-hidden="true">
                  <nivel-diamond-svg />
                </div>

                <span class="nivel-rank-name">{{ rank | _rank }}</span>

              </div>

              <div class="nivel-stats">

                <div v-for="(s, i) in levelStats" :key="'lv-' + i" class="nivel-stat">

                  <div class="nivel-stat-icon"><i :class="s.icon"></i></div>

                  <div class="nivel-stat-text">

                    <span class="nivel-stat-label">{{ s.label }}</span>

                    <span
                      class="nivel-stat-value"
                      :class="s.valueClass"
                    >{{ s.value }}</span>

                  </div>

                </div>

              </div>

            </div>

          </div>



          <div class="md-card md-card-rango">

            <div class="rango-layout">

              <div class="rango-col-left">

                <h3 class="md-card-title rango-card-title">
                  Rango {{ rankCycleTargetLabel }}
                </h3>

                <div class="rango-gauge-block">

                  <div class="gauge-ring" :class="{ 'gauge-ring--complete': gaugeIsComplete }">

                    <svg viewBox="0 0 120 120" class="gauge-svg">

                      <circle cx="60" cy="60" r="48" fill="none" class="gauge-track" :stroke="gaugeTrackStroke" stroke-width="10" />

                      <circle

                        class="gauge-progress"

                        cx="60" cy="60" r="48" fill="none"

                        stroke="url(#gaugeGradMain)" stroke-width="10" stroke-linecap="round"

                        :stroke-dasharray="gaugeCircumference"

                        :stroke-dashoffset="gaugeOffset"

                        transform="rotate(-90 60 60)"

                      />

                      <defs>

                        <linearGradient id="gaugeGradMain" gradientUnits="userSpaceOnUse" x1="12" y1="12" x2="108" y2="108">

                          <stop offset="0%" :stop-color="gaugeGradStart" />

                          <stop offset="50%" :stop-color="gaugeGradMid" />

                          <stop offset="100%" :stop-color="gaugeGradEnd" />

                        </linearGradient>

                      </defs>

                    </svg>

                    <div class="gauge-center">

                      <i class="fas fa-crown gauge-crown"></i>

                      <span class="gauge-pct" :style="{ color: gaugePctColor }">{{ rankCycleOverallPct }}%</span>

                      <span class="gauge-caption">Avance actual</span>

                    </div>

                  </div>

                  <p class="rango-next-text">

                    a {{ rankCycleRemainingPct }}% de subir a

                    <strong>{{ rankCycleTargetLabel }}</strong>

                  </p>

                </div>

              </div>

              <div class="rango-col-right">

                <div class="rango-quick-stats">

                  <div class="rango-quick-stat">

                    <div class="rango-quick-icon"><i class="fas fa-user-friends"></i></div>

                    <div class="rango-quick-text">

                      <span class="rango-quick-label">Patrocinados personales</span>

                      <span class="rango-quick-value">{{ rankCyclePersonalDirects }}</span>

                    </div>

                  </div>

                  <div class="rango-quick-divider" aria-hidden="true"></div>

                  <div class="rango-quick-stat">

                    <div class="rango-quick-icon"><i class="fas fa-sync-alt"></i></div>

                    <div class="rango-quick-text">

                      <span class="rango-quick-label">Ciclos del rango</span>

                      <span class="rango-quick-value">{{ rankCycleCyclesLabel }}</span>

                    </div>

                  </div>

                </div>

                <div class="rango-cycles-panel">

                  <div class="rango-cycles-head">

                    <h4 class="rango-cycles-title">Progreso de ciclos del rango</h4>

                    <p class="rango-cycles-hint">

                      <i class="fas fa-info-circle" aria-hidden="true"></i>

                      Cada ciclo requiere <strong>{{ rankCycleProductsPerCycle }}</strong> productos

                    </p>

                  </div>

                  <div class="rango-cycles-grid">

                    <div

                      v-for="c in rankCycleList"

                      :key="'cyc-' + c.index"

                      class="rango-cycle-card"

                      :class="'rango-cycle-card--' + c.status"

                    >

                      <span class="rango-cycle-name">{{ c.label }}</span>

                      <span
                        class="rango-cycle-badge"
                        :class="'rango-cycle-badge--' + c.status"
                      >{{ c.statusLabel }}</span>

                      <span class="rango-cycle-amount">{{ c.display }}</span>

                    </div>

                  </div>

                  <div
                    v-if="rankCycleList.length"
                    class="rango-cycles-timeline"
                    aria-hidden="true"
                  >

                    <div class="rango-timeline-line">

                      <span
                        v-for="(c, ti) in rankCycleList"
                        :key="'seg-' + c.index"
                        class="rango-timeline-seg"
                        :class="rankCycleTimelineSegClass(ti)"
                      ></span>

                    </div>

                    <div class="rango-timeline-dots">

                      <span
                        v-for="c in rankCycleList"

                        :key="'dot-' + c.index"

                        class="rango-timeline-dot"
                        :class="'rango-timeline-dot--' + c.status"

                      >

                        <i v-if="c.status === 'completed'" class="fas fa-check"></i>

                      </span>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>



        <div class="md-row md-row-mid">

          <affiliation-status-card
            :variant="affiliationCard.variant"
            :title="affiliationCard.title"
            :title-highlight="affiliationCard.titleHighlight"
            :message="affiliationCard.message"
            :to="affiliationCard.to"
          />



          <div class="md-card md-card-comisiones">

            <h3 class="md-card-title comisiones-title">Comisiones</h3>

            <p class="md-card-sub comisiones-sub">
              Consulta tus ganancias y el estado de tus saldos.
            </p>

            <div class="comisiones-saldos">

              <div class="comision-saldo-item comision-saldo-item--earned">

                <div class="comision-saldo-icon-wrap">

                  <i class="fas fa-dollar-sign" aria-hidden="true"></i>

                </div>

                <span class="comision-saldo-label">Total ganado</span>

                <span class="comision-saldo-value">Bs {{ formatMoney(totalEarned) }}</span>

              </div>

              <div class="comision-saldo-divider" aria-hidden="true"></div>

              <div class="comision-saldo-item comision-saldo-item--available">

                <div class="comision-saldo-icon-wrap">

                  <i class="fas fa-wallet" aria-hidden="true"></i>

                </div>

                <span class="comision-saldo-label">Saldo disponible</span>

                <span class="comision-saldo-value">Bs {{ balanceDisplay }}</span>

              </div>

              <div class="comision-saldo-divider" aria-hidden="true"></div>

              <div class="comision-saldo-item comision-saldo-item--locked">

                <div class="comision-saldo-icon-wrap">

                  <i class="fas fa-lock" aria-hidden="true"></i>

                </div>

                <span class="comision-saldo-label">Saldo no disponible</span>

                <span class="comision-saldo-value">Bs {{ unavailableBalanceDisplay }}</span>

              </div>

            </div>

          </div>



          <div class="md-card md-card-viaje">

            <h3 class="md-card-title">Bonos de Viaje</h3>

            <p class="md-card-sub">Completa los porcentajes y disfruta el viaje!</p>

            <div class="viaje-gauges">

              <div class="viaje-gauge-item">

                <div class="viaje-ring" :class="{ 'viaje-ring--complete': viajeIntlIsComplete }">

                  <svg viewBox="0 0 80 80">

                    <circle cx="40" cy="40" r="32" fill="none" class="viaje-track" :stroke="viajeIntlTrackStroke" stroke-width="6" />

                    <circle

                      class="viaje-progress viaje-progress--intl"

                      cx="40" cy="40" r="32" fill="none" stroke="url(#viajeGradIntl)" stroke-width="6" stroke-linecap="round"

                      :stroke-dasharray="viajeCircumference"

                      :stroke-dashoffset="viajeOffset(travelInternationalPct)"

                      transform="rotate(-90 40 40)"

                    />

                    <defs>

                      <linearGradient id="viajeGradIntl" gradientUnits="userSpaceOnUse" x1="8" y1="8" x2="72" y2="72">

                        <stop offset="0%" :stop-color="viajeIntlGradStart" />

                        <stop offset="100%" :stop-color="viajeIntlGradEnd" />

                      </linearGradient>

                    </defs>

                  </svg>

                  <span class="viaje-pct" :style="{ color: viajeIntlPctColor }">{{ travelInternationalPct }}%</span>

                </div>

                <span class="viaje-label">Internacional</span>

              </div>

              <div class="viaje-gauge-item">

                <div class="viaje-ring" :class="{ 'viaje-ring--complete': viajeNatlIsComplete }">

                  <svg viewBox="0 0 80 80">

                    <circle cx="40" cy="40" r="32" fill="none" class="viaje-track" :stroke="viajeNatlTrackStroke" stroke-width="6" />

                    <circle

                      class="viaje-progress viaje-progress--natl"

                      cx="40" cy="40" r="32" fill="none" stroke="url(#viajeGradNatl)" stroke-width="6" stroke-linecap="round"

                      :stroke-dasharray="viajeCircumference"

                      :stroke-dashoffset="viajeOffset(travelNationalPct)"

                      transform="rotate(-90 40 40)"

                    />

                    <defs>

                      <linearGradient id="viajeGradNatl" gradientUnits="userSpaceOnUse" x1="8" y1="8" x2="72" y2="72">

                        <stop offset="0%" :stop-color="viajeNatlGradStart" />

                        <stop offset="100%" :stop-color="viajeNatlGradEnd" />

                      </linearGradient>

                    </defs>

                  </svg>

                  <span class="viaje-pct" :style="{ color: viajeNatlPctColor }">{{ travelNationalPct }}%</span>

                </div>

                <span class="viaje-label">Nacional</span>

              </div>

            </div>

          </div>

        </div>



        <div class="md-card md-card-ingresos">

          <h3 class="md-card-title">Ultimos Ingresos</h3>

          <div class="ingresos-table-wrap">

            <table class="ingresos-table" v-if="recentIncomes.length">

              <thead>

                <tr>

                  <th></th>

                  <th>Paquete / Producto</th>

                  <th>Monto</th>

                  <th>Fecha y hora</th>

                  <th></th>

                </tr>

              </thead>

              <tbody>

                <tr v-for="(row, idx) in recentIncomes" :key="'inc-' + idx">

                  <td class="col-user">

                    <div class="user-cell">

                      <div class="user-avatar"><i class="fas fa-user"></i></div>

                      <div>

                        <span class="user-name">{{ row.name }}</span>

                        <span class="user-sub">{{ row.subtitle }}</span>

                      </div>

                    </div>

                  </td>

                  <td>{{ row.product }}</td>

                  <td class="col-monto">USD {{ formatMoney(row.amount) }}</td>

                  <td class="col-fecha">{{ formatIncomeDate(row.date) }}</td>

                  <td class="col-menu"><i class="fas fa-ellipsis-v"></i></td>

                </tr>

              </tbody>

            </table>

            <p v-else class="ingresos-empty">Aún no hay ingresos recientes para mostrar.</p>

          </div>

        </div>

      </div>
    </div>
  </App>
</template>

<script>
import App from "@/views/layouts/App";
import api from "@/api";
import Spinner from "@/components/Spinner.vue";
import SkeletonLoader from "@/components/SkeletonLoader.vue";
import NivelDiamondSvg from "@/components/dashboard/NivelDiamondSvg.vue";
import AffiliationStatusCard from "@/components/AffiliationStatusCard.vue";

const THEME_FOREST_DARK = "#0e2318";
const THEME_FOREST = "#1b4332";
const THEME_FOREST_MID = "#1b5e3a";
const THEME_GOLD = "#c5a059";
const THEME_GOLD_SOFT = "#c9a962";
const THEME_GOLD_LIGHT = "#e8c96a";
const THEME_GREEN_VIAJE = "#2e7d32";
const THEME_GOLD_DEEP = "#b8942e";
const THEME_GOLD_INTENSE = "#9a7b1a";

function lerpColor(hexA, hexB, t) {
  const u = Math.min(1, Math.max(0, Number(t) || 0));
  const parse = (h) => {
    const s = h.replace("#", "");
    const n = parseInt(s.length === 3 ? s.split("").map((c) => c + c).join("") : s, 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  };
  const a = parse(hexA);
  const b = parse(hexB);
  const clamp = (x) => Math.min(255, Math.max(0, Math.round(x)));
  const r = clamp(a[0] + (b[0] - a[0]) * u);
  const g = clamp(a[1] + (b[1] - a[1]) * u);
  const bl = clamp(a[2] + (b[2] - a[2]) * u);
  return `#${((1 << 24) + (r << 16) + (g << 8) + bl).toString(16).slice(1)}`;
}

export default {
  components: {
    App,
    Spinner,
    SkeletonLoader,
    NivelDiamondSvg,
    AffiliationStatusCard,
  },
  data() {
    return {
      ins: null,
      insVirtual: null,
      outs: null,
      balance: null,
      _balance: null,
      team: null,
      rank: "",
      points: null,
      directs: [],
      frontals: [],
      loading: true,
      plans: null,
      total_points: null,
      n_affiliates_total: 0,
      nextRankName: "",
      nextRankPercentage: 0,
      provisionalRank: "",
      travelBonusText: null,

      sifrahBalance: 0,
      op: 1,
      op2: 0,
      op3: 0,
      node: {},
      recentIncomes: [],
      totalEarned: 0,
      travelInternationalPct: 0,
      travelNationalPct: 0,
      gaugeCircumference: 2 * Math.PI * 48,
      viajeCircumference: 2 * Math.PI * 32,
      plan: "",
      affiliated: false,
      monthlyPurchaseBs: 0,
      personalProductCount: 0,
      groupProductCount: 0,
      monthlyActive: false,
      minActivePurchaseBs: 360,
      rankCycle: null,
    };
  },
  computed: {
    session() {
      return this.$store.state.session;
    },
    activated() {
      return this.$store.state.activated;
    },
    _activated() {
      return this.$store.state._activated;
    },
    formattedPlan() {
      const p = this.$store.state.plan || this.plan;
      if (!p || p === 'none') return "Ninguno";
      const v = p.toLowerCase();
      if (v == "early") return "Cliente preferente";
      if (v == "basic") return "Ejecutivo";
      if (v == "standard") return "Distribuidor";
      if (v == "business") return "Empresarial";
      if (v == "master") return "Empresario";
      return p.charAt(0).toUpperCase() + p.slice(1).toLowerCase();
    },
    userPlan() {
      if (!this.plans) return null;
      return this.plans.find(
        (p) => p.name === this.plan || p.id === this.plan
      );
    },
    affiliationPackageKind() {
      const raw = String(this.plan || this.$store.state.plan || "").trim();
      const norm = raw.toLowerCase();
      const matched = this.userPlan;
      const name = String((matched && matched.name) || raw).toLowerCase();
      const amount = matched ? Number(matched.amount) : NaN;

      const isEmpresario =
        norm === "master" ||
        norm === "empresario" ||
        /empresario/.test(name) ||
        amount === 500;

      if (isEmpresario) return "empresario";

      const isClass =
        norm === "class" ||
        norm === "basic" ||
        norm === "standard" ||
        norm === "business" ||
        /class/.test(name) ||
        amount === 480;

      if (isClass) return "class";

      // Afiliado con plan desconocido: solo existen CLASS y EMPRESARIO → CLASS por defecto
      return "class";
    },
    affiliationCard() {
      const affiliated =
        this.affiliated || this.$store.state.affiliated;

      if (!affiliated) {
        return {
          variant: "register",
          title: "Regístrate Ahora",
          titleHighlight: "",
          message: "Únete y comienza tu camino al éxito",
          to: "/affiliation",
        };
      }

      if (this.affiliationPackageKind === "empresario") {
        return {
          variant: "empresario",
          title: "Paquete EMPRESARIO",
          titleHighlight: "EMPRESARIO",
          message: "Impulsa tu negocio y crece con tu equipo",
          to: "/affiliation",
        };
      }

      return {
        variant: "class",
        title: "Paquete CLASS",
        titleHighlight: "CLASS",
        message: "Ya formas parte de ClassMoringa",
        to: "/affiliation",
      };
    },
    title() {
      return "Dashboard";
    },
    activationLevelLabel() {
      if (this.activated) {
        if ((this.points || 0) >= 120) {
          return "Activaci?n Ejecutiva/Empresarial";
        }
        return "Activaci?n B?sica";
      }
      return this.formattedPlan;
    },
    gaugePct() {
      return Math.min(100, Math.max(0, Number(this.rankCycleOverallPct) || 0));
    },
    rankCycleList() {
      return (this.rankCycle && this.rankCycle.cycles) || [];
    },
    rankCycleOverallPct() {
      return (this.rankCycle && this.rankCycle.overallPct) || 0;
    },
    rankCycleRemainingPct() {
      return (this.rankCycle && this.rankCycle.remainingPct) != null
        ? this.rankCycle.remainingPct
        : this.remainingRankPct;
    },
    rankCycleTargetLabel() {
      const key =
        (this.rankCycle && this.rankCycle.targetRank) ||
        this.nextRankName ||
        "star";
      return this.$options.filters._rank(key);
    },
    rankCyclePersonalDirects() {
      return (this.rankCycle && this.rankCycle.personalDirects) != null
        ? this.rankCycle.personalDirects
        : (this.directs || []).length;
    },
    rankCycleCyclesLabel() {
      return (this.rankCycle && this.rankCycle.cyclesLabel) || "0 / 4";
    },
    rankCycleProductsPerCycle() {
      return (this.rankCycle && this.rankCycle.productsPerCycle) || 600;
    },
    gaugeIsComplete() {
      return this.gaugePct >= 100;
    },
    gaugeTrackStroke() {
      return this.gaugeIsComplete ? "#f0e6c8" : "#e8efe9";
    },
    gaugeGradStart() {
      const t = this.gaugePct / 100;
      if (this.gaugeIsComplete) return THEME_GOLD_SOFT;
      return lerpColor(THEME_FOREST_DARK, THEME_FOREST, t * 0.35 + 0.15);
    },
    gaugeGradMid() {
      const t = this.gaugePct / 100;
      if (this.gaugeIsComplete) return THEME_GOLD;
      return lerpColor(THEME_FOREST, THEME_GOLD_SOFT, t * t + 0.2);
    },
    gaugeGradEnd() {
      const t = this.gaugePct / 100;
      if (this.gaugeIsComplete) return THEME_GOLD_LIGHT;
      return lerpColor(THEME_FOREST_MID, THEME_GOLD_LIGHT, Math.min(1, t * 1.15 + 0.08));
    },
    gaugePctColor() {
      if (this.gaugeIsComplete) return THEME_GOLD;
      return lerpColor(THEME_FOREST_DARK, THEME_GOLD, (this.gaugePct / 100) * 0.85);
    },
    gaugeOffset() {
      return this.gaugeCircumference - (this.gaugeCircumference * this.gaugePct) / 100;
    },
    remainingRankPct() {
      return Math.max(0, 100 - (Number(this.nextRankPercentage) || 0));
    },
    levelStats() {
      const personal = Number(this.personalProductCount) || 0;
      let personalLabel = "0";
      if (personal === 1) personalLabel = "1 compra personal";
      else if (personal > 1) personalLabel = personal + " compras personales";
      const active = !!this.monthlyActive;

      return [
        {
          label: "Compra mensual",
          value: "Bs " + this.formatMoney(this.monthlyPurchaseBs),
          icon: "fas fa-shopping-cart",
        },
        {
          label: "Estado",
          value: active ? "Activo" : "Inactivo",
          icon: active ? "fas fa-check-circle" : "fas fa-times-circle",
          valueClass: active ? "nivel-stat-value--active" : "nivel-stat-value--inactive",
        },
        {
          label: "Compras personales",
          value: personalLabel,
          icon: "fas fa-box-open",
        },
        {
          label: "Volumen grupal",
          value: String(Number(this.groupProductCount) || 0),
          icon: "fas fa-users",
        },
      ];
    },
    nextRankReq() {
      const key = (this.nextRankName || "").toLowerCase();
      const map = {
        star: { points: 300, childs: 2 },
        master: { points: 900, childs: 2 },
        silver: { points: 1800, childs: 3 },
        gold: { points: 3300, childs: 3 },
        sapphire: { points: 9000, childs: 4 },
        rubi: { points: 21000, childs: 4 },
        diamante: { points: 60000, childs: 5 },
        active: { points: 1, childs: 0 },
      };
      if (key.includes("doble")) return { points: 115000, childs: 5 };
      if (key.includes("triple")) return { points: 225000, childs: 6 };
      if (key.includes("estrella")) return { points: 520000, childs: 6 };
      return map[key] || { points: 100, childs: 1 };
    },
    rankProgressStats() {
      const req = this.nextRankReq;
      const pct = (val, max) => (max ? Math.min(100, Math.round((Number(val) / max) * 100)) : 0);
      return [
        { label: "Volumen Personal", value: this.points || 0, progress: pct(this.points, req.points), icon: "fas fa-chart-line" },
        { label: "Volumen Rango", value: (this.frontals || []).length, progress: pct((this.frontals || []).length, req.childs || 1), icon: "fas fa-layer-group" },
        { label: "Patrocinados Personales", value: (this.directs || []).length, progress: pct((this.directs || []).length, req.childs), icon: "fas fa-user-friends" },
        { label: "Volumen Grupales", value: this.total_points || 0, progress: pct(this.total_points, req.points), icon: "fas fa-users" },
      ];
    },
    viajeIntlPct() {
      return Math.min(100, Math.max(0, Number(this.travelInternationalPct) || 0));
    },
    viajeNatlPct() {
      return Math.min(100, Math.max(0, Number(this.travelNationalPct) || 0));
    },
    viajeIntlIsComplete() {
      return this.viajeIntlPct >= 100;
    },
    viajeNatlIsComplete() {
      return this.viajeNatlPct >= 100;
    },
    viajeIntlTrackStroke() {
      return this.viajeIntlIsComplete ? "#d4e8d6" : "#e8efe9";
    },
    viajeNatlTrackStroke() {
      return this.viajeNatlIsComplete ? "#f0e6c8" : "#e8efe9";
    },
    viajeIntlGradStart() {
      return THEME_GREEN_VIAJE;
    },
    viajeIntlGradEnd() {
      const t = this.viajeIntlPct / 100;
      if (this.viajeIntlIsComplete) return THEME_FOREST_DARK;
      return lerpColor(THEME_GREEN_VIAJE, THEME_FOREST_DARK, Math.min(1, t * 1.05 + 0.2));
    },
    viajeIntlPctColor() {
      const t = this.viajeIntlPct / 100;
      return lerpColor(THEME_FOREST, THEME_FOREST_DARK, t * 0.75);
    },
    viajeNatlGradStart() {
      return THEME_GOLD;
    },
    viajeNatlGradEnd() {
      const t = this.viajeNatlPct / 100;
      if (this.viajeNatlIsComplete) return THEME_GOLD_INTENSE;
      return lerpColor(THEME_GOLD, THEME_GOLD_INTENSE, Math.min(1, t * 1.05 + 0.2));
    },
    viajeNatlPctColor() {
      const t = this.viajeNatlPct / 100;
      return lerpColor(THEME_GOLD, THEME_GOLD_DEEP, t * 0.8);
    },
    balanceDisplay() {
      const n = Number(this.balance);
      return Number.isFinite(n) ? n.toFixed(2) : "0.00";
    },
    unavailableBalanceDisplay() {
      const n = Number(this._balance);
      return Number.isFinite(n) ? n.toFixed(2) : "0.00";
    },
  },
  filters: {
    _rank(val) {
      if (!val) return "Ninguno";
      const v = val.toLowerCase();
      let result = "";
      if (v == "none") result = "Ninguno";
      else if (v == "active") result = "Activo";
      else if (v == "star") result = "Bronce";
      else if (v == "master") result = "Master";
      else if (v == "silver") result = "Plata";
      else if (v == "si") result = "Platino";
      else if (v == "gold") result = "Oro";
      else if (v == "sapphire") result = "Zafiro";
      else if (v == "rubi" || v == "ruby") result = "Ruby";
      else if (v == "emerald") result = "Esmeralda";
      else if (v == "diamond" || v == "diamante") result = "Diamante";
      else if (v.includes("doble diamante")) result = "Doble diamante";
      else if (v.includes("triple diamante")) result = "Triple diamante";
      else if (v.includes("diamante estrella")) result = "Diamante estrella";
      else result = v;

      return result.charAt(0).toUpperCase() + result.slice(1).toLowerCase();
    },
  },
  methods: {
    viajeOffset(pct) {
      const p = Math.min(100, Math.max(0, Number(pct) || 0));
      return this.viajeCircumference - (this.viajeCircumference * p) / 100;
    },
    formatMoney(n) {
      return Number(n || 0).toLocaleString("es-BO", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    },
    rankCycleTimelineSegClass(index) {
      const c = this.rankCycleList[index];
      if (!c) return "rango-timeline-seg--pending";
      if (c.status === "completed") return "rango-timeline-seg--completed";
      if (c.status === "in_progress") return "rango-timeline-seg--progress";
      return "rango-timeline-seg--pending";
    },
    formatIncomeDate(dateStr) {
      if (!dateStr) return "?";
      const d = new Date(dateStr);
      if (Number.isNaN(d.getTime())) return String(dateStr);
      const now = new Date();
      const isToday = d.toDateString() === now.toDateString();
      const time = d.toLocaleTimeString("es-BO", { hour: "2-digit", minute: "2-digit" });
      if (isToday) return `Hoy, ${time}`;
      return d.toLocaleDateString("es-BO", { day: "2-digit", month: "short", year: "numeric" }) + `, ${time}`;
    },
    async loadAffiliationPlans() {
      try {
        const { data } = await api.Afiliation.GET(this.session);
        if (data.error) return;
        if (data.plans && data.plans.length) {
          this.plans = data.plans;
        }
      } catch (e) {
        console.warn("No se pudieron cargar planes de afiliación:", e);
      }
    },
    async loadTransactionsExtra() {
      try {
        const { data } = await api.transactions(this.session);
        if (data.error || !data.transactions) return;
        const txs = data.transactions;
        const incomes = txs
          .filter((t) => t.type === "in")
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 6);
        this.recentIncomes = incomes.map((t) => ({
          name: t.user_name || `${this.$store.state.name || "Usuario"}`.trim(),
          subtitle: this.formattedPlan,
          product: t.name || "Ingreso",
          amount: Number(t.value) || 0,
          date: t.date,
        }));
        const virtualIn = txs.filter((t) => t.type === "in" && t.virtual).length;
        const totalIn = txs.filter((t) => t.type === "in").length || 1;
        this.travelInternationalPct = Math.min(100, Math.round((virtualIn / totalIn) * 100)) || 15;
        this.travelNationalPct = Math.min(100, Number(this.nextRankPercentage) || 0) || 46;
      } catch (e) {
        console.warn("No se pudieron cargar movimientos:", e);
      }
    },
  },
  async created() {
    try {
      const { data } = await api.dashboard(this.session);

      // error
      if (data.error && data.msg == "invalid session") {
        this.$router.push("/login");
        return;
      }
      if (data.error) {
        console.error("Dashboard:", data.msg || data.error);
        return;
      }

    // success - actualizar store
    this.$store.commit("SET_NAME", data.name);
    this.$store.commit("SET_LAST_NAME", data.lastName);
    this.$store.commit("SET_AFFILIATED", data.affiliated);
    this.$store.commit("SET__ACTIVATED", data._activated);
    this.$store.commit("SET_ACTIVATED", data.activated);
    this.$store.commit("SET_PLAN", data.plan);
    this.plan = data.plan || "";
    this.affiliated = !!data.affiliated;
    this.$store.commit("SET_COUNTRY", data.country);
    this.$store.commit("SET_PHOTO", data.photo);
    this.$store.commit("SET_TREE", data.tree);
    this.$store.commit("SET_EMAIL", data.email);
    this.$store.commit("SET_TOKEN", data.token);
    this.$store.commit("SET_TOTAL_POINTS", data.total_points);

    // Cargar datos del dashboard
    this.ins = data.ins;
    this.insVirtual = data.insVirtual;
    this.outs = data.outs ? data.outs.toFixed(2) : "0.00";
    const balNum = Number(data.balance) || 0;
    const vbalNum = Number(data._balance) || 0;
    this.sifrahBalance = Number(data.sifrahBalance) || 0;
    this.balance = balNum.toFixed(2);
    this._balance = vbalNum.toFixed(2);
    this.totalEarned =
      data.totalEarned != null
        ? Number(data.totalEarned) || 0
        : (Number(data.ins) || 0) + (Number(data.insVirtual) || 0);
    this.$store.commit("SET_BALANCE", balNum);
    this.$store.commit("SET__BALANCE", vbalNum);
    this.team = data.team;
    this.rank = data.rank || "";
    this.points = data.points;
    this.node = data.node || {};
    this.n_affiliates = data.n_affiliates;
    this.n_affiliates_total = data.n_affiliates_total || 0;
    this.directs = data.directs || [];
    this.frontals = data.frontals || [];
    this.total_points = data.total_points;
    this.nextRankName = data.nextRankName || "";
    this.nextRankPercentage = data.nextRankPercentage || 0;
    this.provisionalRank = data.provisionalRank || "none";
    this.travelBonusText = data.travelBonusText || 'Tu progreso hacia el Bono Viaje se actualizar? pr?ximamente. ?Sigue trabajando para alcanzar tus objetivos!';
    this.monthlyPurchaseBs = Number(data.monthlyPurchaseBs) || 0;
    this.personalProductCount = Number(data.personalProductCount) || 0;
    this.groupProductCount = Number(data.groupProductCount) || 0;
    this.monthlyActive = !!data.monthlyActive;
    this.minActivePurchaseBs = Number(data.minActivePurchaseBs) || 360;
    this.rankCycle = data.rankCycle || null;
    if (data.rankCycle && data.rankCycle.overallPct != null) {
      this.nextRankPercentage = data.rankCycle.overallPct;
    }

    this.loadTransactionsExtra();
    this.loadAffiliationPlans();
    } catch (err) {
      console.error("Error cargando dashboard:", err);
    } finally {
      this.loading = false;
    }
  },
};
</script>

<style scoped src="../../assets/style/views/app/Dashboard.css"></style>
