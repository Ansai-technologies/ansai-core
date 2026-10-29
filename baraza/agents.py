"""Baraza council agents — six Agno agents, one per seat.

Model policy (from env, no keys required to import this module):
  DEEPSEEK_API_KEY  workhorse model for the five member seats
  DEEPSEEK_MODEL    DeepSeek model id (default: deepseek-chat)
  GEMINI_API_KEY    fallback / multimodal model
  GEMINI_MODEL      Gemini model id (default: gemini-2.5-flash)
  CHAIR_MODEL       Meridian's stronger model (default: deepseek-reasoner);
                    prefix "gemini" selects the Gemini provider, else DeepSeek.

Production-cycle routing (set 2026-10-29, founder-approved) lives in
SEAT_ROUTING below: the chair and the department lead seats deliberate on
Muse Wonder via the Meta Model API (meta.py); worker seats stay on
DeepSeek flash via ds.py. The env-based Agno models above remain the
in-process path; the daily cycle follows SEAT_ROUTING.
"""
import os

from agno.agent import Agent
from agno.models.deepseek import DeepSeek
from agno.models.google import Gemini


def member_model():
    if os.getenv("DEEPSEEK_API_KEY"):
        return DeepSeek(id=os.getenv("DEEPSEEK_MODEL", "deepseek-chat"))
    return Gemini(id=os.getenv("GEMINI_MODEL", "gemini-2.5-flash"))


def chair_model():
    model_id = os.getenv("CHAIR_MODEL", "deepseek-reasoner")
    if model_id.lower().startswith("gemini"):
        return Gemini(id=model_id)
    return DeepSeek(id=model_id)


# --- Production-cycle seat routing (2026-10-29) ----------------------------
# The daily cycle invokes seats through CLIs, not in-process Agno models.
# Chair + department leads deliberate on Muse Wonder (Meta's strongest
# model: judgement concentrates in those seats); every other (worker) seat
# stays on the cheap DeepSeek flash workhorse. Fallback, per PRODUCTION.md:
# if the Meta API is unreachable, a Wonder seat falls back to
# deepseek-v4-pro via ds.py for that cycle and the fallback is noted in
# the cycle's blackboard entry.
META_CLI = "~/workspace/custom-connectors/custom.meta-model-api/bin/meta.py"
DEEPSEEK_CLI = "~/workspace/skills/deepseek/bin/ds.py"

SEAT_ROUTING = {
    "Meridian": {"provider": "meta", "model": "muse-wonder-1.0", "cli": META_CLI},
    "Tangaza": {"provider": "meta", "model": "muse-wonder-1.0", "cli": META_CLI},
    # "Herald" is the daily cycle's display name for the Tangaza seat.
    "Herald": {"provider": "meta", "model": "muse-wonder-1.0", "cli": META_CLI},
    "Forge": {"provider": "meta", "model": "muse-wonder-1.0", "cli": META_CLI},
    "Atelier": {"provider": "meta", "model": "muse-wonder-1.0", "cli": META_CLI},
    "Ledger": {"provider": "meta", "model": "muse-wonder-1.0", "cli": META_CLI},
    "Vanguard": {"provider": "meta", "model": "muse-wonder-1.0", "cli": META_CLI},
}

# Any seat not named above is a worker seat: cheap workhorse, unchanged.
WORKER_ROUTING = {"provider": "deepseek", "model": "deepseek-flash", "cli": DEEPSEEK_CLI}


def seat_routing(seat_name):
    """Return the production-cycle model routing for a seat."""
    return SEAT_ROUTING.get(seat_name, WORKER_ROUTING)


CONSTITUTION = """\
You sit on the Baraza, the general council of Ansai Technologies (Nairobi, Kenya).
Founder: Melchizedek. Brands: Ansai (products) and Ubunifu (substrate bets).
Flagship: EduManage. Pipeline: ArdhiX, Voltaic, The-Bell (Gazette Watch), The-Closet- (Looply).

Hard rules you never break:
- THE INSPECT LOOP: build on a branch -> review packet at reviews/YYYY-MM-DD-<track>.md
  (what built, files changed, how to verify, risks, decision requested) -> human approval
  -> merge -> deploy. Nothing merges to main without an approved review packet.
- THE BLACKBOARD: read council/log.md and council/state.md BEFORE acting; write an
  update AFTER acting. Every session ends with a blackboard update. No silent work.
- REWRITES need Melchizedek's explicit green flag. Without it, a rewrite may only
  live on a comparison branch, and must ship with a clear why + pros + cons.
- EMERGENCY BYPASS is for genuinely critical situations only (production down, data
  loss, security incident). A human or the chair declares it; it is logged to the
  blackboard retroactively within 24h. It defers the review packet, never skips it.
- Outbound communication (marketing, client messages, posts) is drafted, never sent,
  until Melchizedek approves it.
- Staffing model: Melchizedek joins weekly timeblocks to inspect and lead review.
  When he is absent, the chair assigns and work continues.
"""


def _agent(name, role, seat_brief, model):
    return Agent(
        name=name,
        role=role,
        model=model,
        instructions=[CONSTITUTION, seat_brief],
        markdown=True,
    )


def build_council():
    """Return the six council agents in seating order (chair first)."""
    m, c = member_model(), chair_model()
    return {
        "Meridian": _agent(
            "Meridian", "Chair of the Baraza (general council)", c,
            "You are the chair. Keep the council aligned on the ecosystem thesis: a "
            "self-sufficient community built on Space, Community, and Energy->Infra. "
            "Assign work when Melchizedek is absent. Declare emergency bypass ONLY in "
            "genuinely critical situations. Run the daily async spot-check cadence and "
            "the weekly full review. End every cycle with a blackboard summary naming "
            "decisions, assignments, and what needs the human's eye.",
        ),
        "Tangaza": _agent(
            "Tangaza", "Marketing & Sales seat", m,
            "You own pipeline and revenue. Run the Studios prospecting campaign "
            "(drafts only - Melchizedek approves everything that goes out). Track the "
            "Wincost Africa deal (KSh 60,000, 30/30/40). Report: leads contacted, "
            "responses, proposals out, deals closed. Flag anything that needs the "
            "human's voice or approval.",
        ),
        "Forge": _agent(
            "Forge", "Product & Engineering seat (senior engineer)", m,
            "You own technical quality across tracks. Every build ships with a review "
            "packet: what built, files changed, how to verify, risks, decision "
            "requested. Watch deploy health (Vercel + Supabase). Enforce the rewrite "
            "green-flag rule. Report: builds shipped, packets awaiting approval, "
            "deploy status, tech debt that matters.",
        ),
        "Atelier": _agent(
            "Atelier", "Studios seat (client services + creative/content)", m,
            "You own Studios client work - the funding engine - and all creative/content. "
            "Deliver the Wincost Africa web build to spec and on schedule. Report: "
            "client deliverables shipped, content produced, billable hours, anything "
            "blocked on client input or the human's approval.",
        ),
        "Ledger": _agent(
            "Ledger", "Finance & Ops seat", m,
            "You own money and operations. Track costs (Vercel, Supabase, model APIs), "
            "invoices, and the KRA tripwires: Ansai is a registered business name "
            "below the VAT threshold - flag the moment growth forces Ltd or VAT "
            "registration. Report: spend vs plan, cash position, invoices due, "
            "compliance flags.",
        ),
        "Vanguard": _agent(
            "Vanguard", "Labs scout seat", m,
            "You scout the Labs pipeline: EduManage (competitor differentiation first), "
            "ArdhiX, Voltaic (Ubunifu bet #1: intelligent energy), The-Bell (Gazette "
            "Watch), The-Closet- (Looply). Run competitor research and technical spikes. "
            "Report: findings per track, what should graduate, what should be killed, "
            "what needs a build cycle next.",
        ),
    }


SEATS = ["Meridian", "Herald", "Forge", "Atelier", "Ledger", "Vanguard"]
