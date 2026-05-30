<template>
  <App :session="session" :title="title">
    <div v-cloak>
      <div v-if="loading" class="loading-container">
        <div class="loading-spinner-large"></div>
        <p>Cargando historial...</p>
      </div>

      <div v-else class="activations-bg">
        <h2 class="activations-title" v-if="!showMasterTrophy">
          Historial
        </h2>
        <section>
          <div></div>
          <div>
            <h4 class="tabs">
              <router-link class="tab" to="/activation" v-if="affiliated">
                <span class="tab-icon">🛒</span> Comprar
              </router-link>
              <router-link class="tab" to="/affiliation" v-else>
                <span class="tab-icon">🛒</span> Afiliarse
              </router-link>
            </h4>

            <div class="period-filter-wrap" v-if="historyRecords && historyRecords.length">
              <label class="period-filter-label" for="period-filter-select">Período</label>
              <select
                id="period-filter-select"
                class="period-filter-select"
                v-model="periodFilter"
              >
                <option value="">Todos (agrupado por mes)</option>
                <option
                  v-for="opt in periodOptions"
                  :key="opt.key"
                  :value="opt.key"
                >
                  {{ opt.label }} ({{ opt.key }})
                </option>
              </select>
            </div>

            <div class="scroll">
              <table class="activations-table">
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Tipo</th>
                    <th>Periodo</th>
                    <th>Productos</th>
                    <th>Monto</th>
                    <th>Voucher</th>
                    <th>Estado</th>
                    <th>Boleta</th>
                  </tr>
                </thead>
                <tbody v-if="!historyRecords || !historyRecords.length">
                  <tr>
                    <td colspan="8" class="activations-empty-msg">
                      No hay registros en tu historial comercial.
                    </td>
                  </tr>
                </tbody>
                <tbody v-else-if="periodFilter && !filteredRecords.length">
                  <tr>
                    <td colspan="8" class="activations-empty-msg">
                      No hay compras en este período.
                    </td>
                  </tr>
                </tbody>
                <tbody v-else-if="periodFilter">
                  <tr
                    v-for="record in filteredRecords"
                    :key="recordKey(record)"
                  >
                    <td>{{ record.date | date }}</td>
                    <td>
                      <span :class="['history-type-badge', record.recordType]">
                        {{ recordTypeLabel(record.recordType) }}
                      </span>
                    </td>
                    <td>{{ periodLabel(record) }}</td>
                    <td>
                      <div class="product-chips">
                        <span
                          v-if="isAffiliationRecord(record) && record.plan && record.plan.name"
                          class="product-chip product-chip--plan"
                        >
                          {{ record.plan.name }}
                        </span>
                        <span
                          v-for="product in record.products"
                          v-if="product && product.total != 0"
                          class="product-chip"
                          :key="product.name + '-' + product.total"
                        >
                          {{ product.name }}
                          <span class="product-chip-total">x{{ product.total }}</span>
                        </span>
                      </div>
                    </td>
                    <td>{{ record.price | price }}</td>
                    <td>
                      <a v-if="record.voucher" :href="record.voucher" target="_blank">
                        <img :src="record.voucher" class="voucher-img" />
                      </a>
                      <span v-else>-</span>
                    </td>
                    <td>
                      <span :class="['status-badge', record.status]">
                        <span v-if="record.status === 'pending'" class="status-icon">⏳</span>
                        <span v-else-if="record.status === 'approved'" class="status-icon">✔️</span>
                        <span v-else-if="record.status === 'rejected'" class="status-icon">❌</span>
                        {{ record.status | status }}
                      </span>
                    </td>
                    <td>
                      <a
                        :href="comprobanteUrl(record)"
                        target="_blank"
                        class="invoice-link-btn"
                        v-if="record.status == 'approved'"
                      >
                        <span class="invoice-icon">🧾</span> Boleta
                      </a>
                    </td>
                  </tr>
                </tbody>
                <template v-else>
                  <tbody
                    v-for="group in groupedRecords"
                    :key="group.key"
                  >
                    <tr class="period-group-header">
                      <td colspan="8">{{ group.label }}</td>
                    </tr>
                    <tr v-for="record in group.items" :key="recordKey(record)">
                      <td>{{ record.date | date }}</td>
                      <td>
                        <span :class="['history-type-badge', record.recordType]">
                          {{ recordTypeLabel(record.recordType) }}
                        </span>
                      </td>
                      <td>{{ periodLabel(record) }}</td>
                      <td>
                        <div class="product-chips">
                          <span
                            v-if="isAffiliationRecord(record) && record.plan && record.plan.name"
                            class="product-chip product-chip--plan"
                          >
                            {{ record.plan.name }}
                          </span>
                          <span
                            v-for="product in record.products"
                            v-if="product && product.total != 0"
                            class="product-chip"
                            :key="product.name + '-' + product.total"
                          >
                            {{ product.name }}
                            <span class="product-chip-total">x{{ product.total }}</span>
                          </span>
                        </div>
                      </td>
                      <td>{{ record.price | price }}</td>
                      <td>
                        <a v-if="record.voucher" :href="record.voucher" target="_blank">
                          <img :src="record.voucher" class="voucher-img" />
                        </a>
                        <span v-else>-</span>
                      </td>
                      <td>
                        <span :class="['status-badge', record.status]">
                          <span v-if="record.status === 'pending'" class="status-icon">⏳</span>
                          <span v-else-if="record.status === 'approved'" class="status-icon">✔️</span>
                          <span v-else-if="record.status === 'rejected'" class="status-icon">❌</span>
                          {{ record.status | status }}
                        </span>
                      </td>
                      <td>
                        <a
                          :href="comprobanteUrl(record)"
                          target="_blank"
                          class="invoice-link-btn"
                          v-if="record.status == 'approved'"
                        >
                          <span class="invoice-icon">🧾</span> Boleta
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  </App>
</template>

<script>
import App from "@/views/layouts/App";
import api from "@/api";
import Spinner from "@/components/Spinner.vue";
import { resolvePlanDisplayName } from "@/utils/planNames";

export default {
  components: {
    App,
    Spinner,
  },
  data() {
    return {
      historyRecords: null,
      loading: true,
      /** '' = todos (vista agrupada por mes); 'YYYY-MM' = solo ese período */
      periodFilter: "",
    };
  },
  computed: {
    session() {
      return this.$store.state.session;
    },
    affiliated() {
      return this.$store.state.affiliated;
    },
    isMasterPlan() {
      return (
        this.$store && this.$store.state && this.$store.state.plan === "master"
      );
    },
    showMasterTrophy() {
      return this.isMasterPlan;
    },
    title() {
      return "Historial";
    },
    periodOptions() {
      if (!this.historyRecords || !this.historyRecords.length) return [];
      const keys = [
        ...new Set(
          this.historyRecords
            .map((r) => this.periodKeyFromRecord(r))
            .filter(Boolean)
        ),
      ];
      keys.sort((a, b) => (a < b ? 1 : a > b ? -1 : 0));
      return keys.map((k) => ({
        key: k,
        label: this.monthLabelFromKey(k),
      }));
    },
    filteredRecords() {
      if (!this.historyRecords || !this.periodFilter) return [];
      return this.historyRecords.filter(
        (r) => this.periodKeyFromRecord(r) === this.periodFilter
      );
    },
    groupedRecords() {
      if (!this.historyRecords || this.periodFilter) return [];
      const map = new Map();
      for (const record of this.historyRecords) {
        const k = this.periodKeyFromRecord(record);
        if (!k) continue;
        if (!map.has(k)) map.set(k, []);
        map.get(k).push(record);
      }
      const keys = [...map.keys()].sort().reverse();
      return keys.map((k) => ({
        key: k,
        label: this.monthLabelFromKey(k),
        items: map
          .get(k)
          .sort(
            (a, b) =>
              new Date(b.date || b.createdAt || 0) -
              new Date(a.date || a.createdAt || 0)
          ),
      }));
    },
  },
  methods: {
    recordKey(record) {
      return `${record.recordType || "record"}-${record.id}`;
    },
    isAffiliationRecord(record) {
      return (
        record.recordType === "affiliation" || record.recordType === "migration"
      );
    },
    recordTypeLabel(recordType) {
      if (recordType === "affiliation") return "Afiliación";
      if (recordType === "migration") return "Migración";
      if (recordType === "activation") return "Activación";
      return "Compra";
    },
    comprobanteUrl(record) {
      const type = this.isAffiliationRecord(record) ? "affiliation" : "activation";
      return this.$router.resolve({
        path: "/comprobante",
        query: { id: record.id, type },
      }).href;
    },
    periodKeyFromDate(val) {
      if (!val) return "";
      const d = new Date(val);
      if (isNaN(d.getTime())) return "";
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    },
    periodKeyFromRecord(record) {
      return (
        record.period_key ||
        record.periodKey ||
        this.periodKeyFromDate(record.date || record.createdAt)
      );
    },
    periodLabel(record) {
      if (record.period_label || record.periodLabel) {
        return record.period_label || record.periodLabel;
      }
      return this.$options.filters.period(record.date);
    },
    monthLabelFromKey(key) {
      const MONTHS_ES = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
      ];
      if (!key || !/^\d{4}-\d{2}$/.test(key)) return key || "";
      const [y, m] = key.split("-").map(Number);
      return `${MONTHS_ES[m - 1] || ""} ${y}`;
    },
    normalizeActivation(record) {
      return {
        ...record,
        recordType: "activation",
        price: Number(record.price) || 0,
      };
    },
    normalizeAffiliation(record) {
      const isMigration = record.type === "upgrade";
      const price = isMigration
        ? Number((record.difference && record.difference.amount) || record.price || 0)
        : Number(
            record.price ||
              record.amount ||
              (record.plan ? record.plan.amount : 0) ||
              0
          );

      return {
        ...record,
        recordType: isMigration ? "migration" : "affiliation",
        price,
        plan: record.plan
          ? { ...record.plan, name: resolvePlanDisplayName(record.plan) }
          : record.plan,
      };
    },
    buildHistoryRecords(activationsList, affiliationsList) {
      const seenIds = new Set();
      const records = [];

      activationsList.forEach((item) => {
        if (!item || !item.id || seenIds.has(item.id)) return;
        seenIds.add(item.id);
        records.push(this.normalizeActivation(item));
      });

      affiliationsList.forEach((item) => {
        if (!item || !item.id || seenIds.has(item.id)) return;
        seenIds.add(item.id);
        records.push(this.normalizeAffiliation(item));
      });

      return records.sort((a, b) => {
        const dateA = new Date(a.date || a.createdAt || 0).getTime();
        const dateB = new Date(b.date || b.createdAt || 0).getTime();
        return dateB - dateA;
      });
    },
  },
  filters: {
    date(val) {
      return new Date(val).toLocaleDateString();
    },
    period(val) {
      if (!val) return "-";
      const d = new Date(val);
      if (isNaN(d.getTime())) return "-";
      const raw = d.toLocaleDateString("es-BO", { month: "long", year: "numeric" });
      const normalized = raw.replace(/\s+de\s+/gi, " ").trim();
      return normalized.charAt(0).toUpperCase() + normalized.slice(1);
    },
    price(val) {
      return `Bs. ${val}`;
    },
    status(val) {
      if (val == "pending") return "Pendiente";
      if (val == "approved") return "Aprobada";
      if (val == "rejected") return "Rechazada";
      return val || "-";
    },
  },
  async created() {
    try {
      const [activationsRes, affiliationsRes] = await Promise.all([
        api.Activations.GET(this.session),
        api.Afiliation.GET(this.session),
      ]);

      const data = activationsRes.data;
      const affiliationsData = affiliationsRes.data || {};

      this.loading = false;

      if (data.error && data.msg == "invalid session")
        this.$router.push("/login");
      if (data.error && data.msg == "unverified user")
        this.$router.push("/verify");

      this.$store.commit("SET_NAME", data.name);
      this.$store.commit("SET_LAST_NAME", data.lastName);
      this.$store.commit("SET_AFFILIATED", data.affiliated);
      this.$store.commit("SET_ACTIVATED", data.activated);
      this.$store.commit("SET__ACTIVATED", data._activated);
      this.$store.commit("SET_PLAN", data.plan);
      this.$store.commit("SET_COUNTRY", data.country);
      this.$store.commit("SET_PHOTO", data.photo);
      this.$store.commit("SET_TREE", data.tree);

      const activationsList = data.activations || [];
      const affiliationsList =
        affiliationsData.affiliationHistory ||
        affiliationsData.affiliations ||
        [];

      this.historyRecords = this.buildHistoryRecords(
        activationsList,
        affiliationsList
      );
    } catch (e) {
      console.error(e);
      this.loading = false;
      this.historyRecords = [];
    }
  },
};
</script>

<style lang="stylus">
@import '../../assets/style/views/app/Activations.styl'
</style>
