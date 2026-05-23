const CLASS_PLAN_IDS = new Set(["class", "basic", "standard", "business"]);
const EMPRESARIO_PLAN_IDS = new Set(["empresario", "master"]);

function normalizeId(value) {
  return String(value || "")
    .trim()
    .toLowerCase();
}

export function planTierFromRef(ref) {
  if (!ref) return null;

  var id = normalizeId(ref.id != null ? ref.id : ref);
  var name = normalizeId(ref.name || "");
  var amount = Number(ref.amount);

  if (
    EMPRESARIO_PLAN_IDS.has(id) ||
    /empresario/.test(name) ||
    amount >= 500
  ) {
    return "empresario";
  }

  if (
    CLASS_PLAN_IDS.has(id) ||
    id === "business" ||
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
  return 0;
}

function isTruthyAffiliated(value) {
  return value === true || value === 1 || value === "1" || value === "true";
}

export function isAffiliatedMember(options) {
  var opts = options || {};

  if (isTruthyAffiliated(opts.affiliated)) return true;

  var planId = normalizeId(opts.plan);
  if (planId && planId !== "none") return true;

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
  var fromCatalog = findPlanInCatalog(plans, { id: opts.plan });
  if (fromCatalog) return fromCatalog;

  if (opts.affiliation && opts.affiliation.plan) {
    var fromAff = findPlanInCatalog(plans, opts.affiliation.plan);
    if (fromAff) return fromAff;
    return opts.affiliation.plan;
  }

  if (opts.approvedAffiliations && opts.approvedAffiliations.length) {
    var last = opts.approvedAffiliations[opts.approvedAffiliations.length - 1];
    if (last && last.plan) {
      var fromHistory = findPlanInCatalog(plans, last.plan);
      if (fromHistory) return fromHistory;
      return last.plan;
    }
  }

  if (opts.plan) return { id: opts.plan };
  return null;
}

function resolveCurrentTier(options, plans) {
  var opts = options || {};
  var currentRef = resolveCurrentPlanRef(opts, plans);
  var tier = planTierFromRef(currentRef);

  if (
    opts.affiliation &&
    opts.affiliation.status === "approved" &&
    opts.affiliation.plan
  ) {
    var affTier = planTierFromRef(opts.affiliation.plan);
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

  var tier = resolveCurrentTier(options, plans);
  if (tier === "empresario") return 500;
  if (tier === "class") return 480;
  return null;
}

export function filterAffiliationPlansForUser(plans, options) {
  var opts = options || {};
  var sorted = (plans || []).slice().sort(function (a, b) {
    return Number(a.amount) - Number(b.amount);
  });

  if (!isAffiliatedMember(opts)) return sorted;

  var currentTier = resolveCurrentTier(opts, sorted);
  var currentAmount = resolveCurrentAmount(opts, sorted);
  var currentId = normalizeId(
    (resolveCurrentPlanRef(opts, sorted) || {}).id || opts.plan
  );

  if (currentTier === "empresario" || (currentAmount && currentAmount >= 500)) {
    return [];
  }

  return sorted.filter(function (p) {
    var pId = normalizeId(p.id);
    var pAmount = Number(p.amount);
    var pTier = planTierFromRef(p);

    if (currentId && pId === currentId) return false;

    if (currentTier === "class") {
      return pTier === "empresario" || pAmount >= 500;
    }

    if (currentAmount != null && !isNaN(currentAmount)) {
      return pAmount > currentAmount;
    }

    return pTier === "empresario";
  });
}

export function isEmpresarioTier(planRef) {
  return planTierFromRef(planRef) === "empresario";
}
