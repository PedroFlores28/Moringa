const CLASS_PLAN_IDS = new Set(["class", "basic", "business"]);
const VIP_PLAN_IDS = new Set(["empresario", "master", "standard"]);

function normalizeId(value) {
  return String(value || "")
    .trim()
    .toLowerCase();
}

export function isAffiliationActive(plan) {
  return plan && plan.affiliation_active !== false;
}

export function getAffiliationPlans(plans) {
  return (plans || [])
    .filter(isAffiliationActive)
    .slice()
    .sort(function (a, b) {
      return Number(a.amount) - Number(b.amount);
    });
}

function maxAffiliationAmount(plans) {
  const active = getAffiliationPlans(plans);
  if (!active.length) return null;
  return Number(active[active.length - 1].amount);
}

export function planTierFromRef(ref, catalog) {
  if (!ref) return null;

  var active = getAffiliationPlans(catalog || []);
  var amount =
    Number(ref.amount) ||
    Number((findPlanInCatalog(active, ref) || {}).amount) ||
    0;

  if (active.length >= 2) {
    var min = Number(active[0].amount);
    var max = Number(active[active.length - 1].amount);
    if (amount >= max) return "empresario";
    if (amount <= min) return "class";
    return "mid";
  }

  var id = normalizeId(ref.id != null ? ref.id : ref);
  var name = normalizeId(ref.name || "");

  if (
    VIP_PLAN_IDS.has(id) ||
    /empresario|vip/.test(name) ||
    amount >= 500
  ) {
    return "empresario";
  }

  if (
    CLASS_PLAN_IDS.has(id) ||
    /class/.test(name) ||
    (amount > 0 && amount <= 480)
  ) {
    return "class";
  }

  return null;
}

function tierRank(tier) {
  if (tier === "empresario") return 2;
  if (tier === "class") return 1;
  if (tier === "mid") return 1.5;
  return 0;
}

function isTruthyAffiliated(value) {
  return value === true || value === 1 || value === "1" || value === "true";
}

export function isAffiliatedMember(options) {
  var opts = options || {};

  if (isTruthyAffiliated(opts.affiliated)) return true;

  var planId = normalizeId(opts.plan);
  if (planId && planId !== "none" && planId !== "default") return true;

  if (opts.affiliation && opts.affiliation.status === "approved") return true;

  if (opts.approvedAffiliations && opts.approvedAffiliations.length > 0) {
    return true;
  }

  return false;
}

function findPlanInCatalog(plans, ref) {
  if (!ref || !plans || !plans.length) return null;

  var id = normalizeId(ref.id != null ? ref.id : ref);
  if (!id) return null;

  for (var i = 0; i < plans.length; i++) {
    if (normalizeId(plans[i].id) === id) return plans[i];
  }
  return null;
}

function resolveCurrentPlanRef(options, plans) {
  var opts = options || {};
  var catalog = getAffiliationPlans(plans);
  var fromCatalog = findPlanInCatalog(catalog, { id: opts.plan });
  if (fromCatalog) return fromCatalog;

  if (opts.affiliation && opts.affiliation.plan) {
    var fromAff = findPlanInCatalog(catalog, opts.affiliation.plan);
    if (fromAff) return fromAff;
    return opts.affiliation.plan;
  }

  if (opts.approvedAffiliations && opts.approvedAffiliations.length) {
    var last = opts.approvedAffiliations[opts.approvedAffiliations.length - 1];
    if (last && last.plan) {
      var fromHistory = findPlanInCatalog(catalog, last.plan);
      if (fromHistory) return fromHistory;
      return last.plan;
    }
  }

  if (opts.plan) return { id: opts.plan };
  return null;
}

function resolveCurrentTier(options, plans) {
  var opts = options || {};
  var catalog = getAffiliationPlans(plans);
  var currentRef = resolveCurrentPlanRef(opts, plans);
  var tier = planTierFromRef(currentRef, catalog);

  if (
    opts.affiliation &&
    opts.affiliation.status === "approved" &&
    opts.affiliation.plan
  ) {
    var affTier = planTierFromRef(opts.affiliation.plan, catalog);
    if (tierRank(affTier) > tierRank(tier)) tier = affTier;
  }

  if (!tier && isAffiliatedMember(opts)) {
    tier = "class";
  }

  return tier;
}

function resolveCurrentAmount(options, plans) {
  var currentRef = resolveCurrentPlanRef(options, plans);
  if (currentRef && currentRef.amount != null) {
    return Number(currentRef.amount);
  }

  var catalog = getAffiliationPlans(plans);
  var fromCatalog = findPlanInCatalog(catalog, currentRef);
  if (fromCatalog && fromCatalog.amount != null) {
    return Number(fromCatalog.amount);
  }

  var tier = resolveCurrentTier(options, plans);
  var amounts = catalog
    .map(function (p) {
      return Number(p.amount);
    })
    .filter(function (n) {
      return !isNaN(n);
    });
  if (amounts.length) {
    if (tier === "empresario") return Math.max.apply(null, amounts);
    if (tier === "class") return Math.min.apply(null, amounts);
  }

  if (tier === "empresario") return 500;
  if (tier === "class") return 480;
  return null;
}

export function filterAffiliationPlansForUser(plans, options) {
  var opts = options || {};
  var sorted = getAffiliationPlans(plans);

  if (!isAffiliatedMember(opts)) return sorted;

  var currentAmount = resolveCurrentAmount(opts, plans);
  var currentRef = resolveCurrentPlanRef(opts, plans);
  var currentId = normalizeId((currentRef || {}).id || opts.plan);
  var maxAmount = maxAffiliationAmount(plans);

  if (
    maxAmount != null &&
    currentAmount != null &&
    !isNaN(currentAmount) &&
    currentAmount >= maxAmount
  ) {
    return [];
  }

  return sorted.filter(function (p) {
    var pId = normalizeId(p.id);
    var pAmount = Number(p.amount);

    if (currentId && pId === currentId) return false;

    if (currentAmount != null && !isNaN(currentAmount)) {
      return pAmount > currentAmount;
    }

    var pTier = planTierFromRef(p, sorted);
    var currentTier = resolveCurrentTier(opts, plans);
    if (currentTier === "class") {
      return pTier === "empresario" || tierRank(pTier) > tierRank("class");
    }
    return tierRank(pTier) > tierRank(currentTier);
  });
}

export function isEmpresarioTier(planRef) {
  return planTierFromRef(planRef) === "empresario";
}
