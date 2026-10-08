#!/usr/bin/env python3
"""Draw the six figures of the Agentic Delivery Workflow paper (v1.10).

Usage:  python3 scripts/figures/agentic_delivery_workflow.py <dark_svg_dir> [<light_svg_dir>]

Each figure is defined once, as data, and rendered in two palettes: dark for
the site (which is always dark, and an <img> SVG cannot read the page's CSS),
light for the Google Doc / .docx export. Labels are taken from the v1.10 text —
the PNGs embedded in the source .docx predate it (HRN-01..10, "BIO", Feng
levels) and must not be reused.
"""
import os
import sys
from html import escape

PALETTES = {
    'dark': {
        'bg': '#0a0a0a', 'arrow': '#a1a1aa', 'muted': '#a1a1aa', 'rule': '#27272a', 'band': '#111113',
        'std': ('#1b1b3a', '#818cf8', '#e0e7ff', '#a5b4fc'),
        'sdd': ('#06281e', '#34d399', '#d1fae5', '#6ee7b7'),
        'hrn': ('#2a1608', '#fb923c', '#ffedd5', '#fdba74'),
        'neu': ('#18181b', '#71717a', '#f4f4f5', '#a1a1aa'),
    },
    'light': {
        'bg': '#ffffff', 'arrow': '#52525b', 'muted': '#52525b', 'rule': '#d4d4d8', 'band': '#f4f4f5',
        'std': ('#eef0ff', '#5b54c9', '#2e2a7a', '#4b44b8'),
        'sdd': ('#e3f5ee', '#13795b', '#0b4a37', '#13795b'),
        'hrn': ('#fbece4', '#a2441c', '#6b2a0f', '#a2441c'),
        'neu': ('#f2f0eb', '#71717a', '#3f3f46', '#52525b'),
    },
}
FONT = "Inter, 'Helvetica Neue', Helvetica, Arial, sans-serif"


class Fig:
    def __init__(self, w, h, pal, title):
        self.w, self.h, self.p, self.parts = w, h, PALETTES[pal], []
        self.title = title

    def box(self, x, y, w, h, kind, head, sub='', dashed=False):
        fill, stroke, htxt, stxt = self.p[kind]
        dash = ' stroke-dasharray="7 5"' if dashed else ''
        self.parts.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="10" fill="{fill}" stroke="{stroke}" stroke-width="1.6"{dash}/>')
        cy = y + h / 2
        if sub:
            self.text(x + w / 2, cy - 6, head, htxt, 17, 700)
            self.text(x + w / 2, cy + 18, sub, stxt, 13.5)
        else:
            self.text(x + w / 2, cy + 6, head, htxt, 17, 700)

    def text(self, x, y, s, color, size=14, weight=400, anchor='middle'):
        self.parts.append(f'<text x="{x}" y="{y}" fill="{color}" font-size="{size}" font-weight="{weight}" text-anchor="{anchor}">{escape(s)}</text>')

    def path(self, d, dashed=False, head=True):
        dash = ' stroke-dasharray="6 5"' if dashed else ''
        marker = ' marker-end="url(#ah)"' if head else ''
        self.parts.append(f'<path d="{d}" fill="none" stroke="{self.p["arrow"]}" stroke-width="1.6"{dash}{marker}/>')

    def legend(self, y, items):
        x = 40
        for kind, label in items:
            fill, stroke, _, _ = self.p[kind]
            self.parts.append(f'<rect x="{x}" y="{y - 13}" width="18" height="18" rx="4" fill="{fill}" stroke="{stroke}" stroke-width="1.4"/>')
            self.text(x + 28, y + 1, label, self.p['muted'], 13.5, anchor='start')
            x += 40 + len(label) * 7.6

    def svg(self):
        p = self.p
        return (
            f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {self.w} {self.h}" width="{self.w}" height="{self.h}" '
            f'font-family="{FONT}" role="img"><title>{escape(self.title)}</title>'
            f'<defs><marker id="ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">'
            f'<path d="M0,0 L10,5 L0,10 z" fill="{p["arrow"]}"/></marker></defs>'
            f'<rect width="{self.w}" height="{self.h}" rx="14" fill="{p["bg"]}"/>'
            + ''.join(self.parts) + '</svg>\n'
        )


# ---------------------------------------------------------------- figure 1
def fig1(pal):
    f = Fig(1120, 560, pal, 'Figure 1 — The eight stages, W0 to W7, and the change gate')
    W, H, c = 230, 80, [40, 310, 580, 850]
    f.box(c[0], 40, W, H, 'hrn', 'W0 Intake and classify', 'Gate 0 · worksheet')
    f.box(c[1], 40, W, H, 'std', 'W1 Hub', 'H0–H14 · completeness test')
    f.box(c[2], 40, W, H, 'sdd', 'W2 SDD specification', 'Gate 1 · contracts · invariants')
    f.box(c[2], 160, W, H, 'std', 'W3 Eval spec and M', 'S2 · M · reader test')
    f.box(c[3], 100, W, H, 'hrn', 'W4 Harness binding', 'Gate 2 · HRN-01..12')
    f.box(c[3], 300, W, H, 'hrn', 'W5 Build under harness', 'HRN-05 auditor · ledgers')
    f.box(c[2], 300, W, H, 'hrn', 'W6 Eval and red team', 'Gate 3 · specified → demonstrated')
    f.box(c[1], 300, W, H, 'hrn', 'W7 Deploy and monitor', 'Gate 4 · SLOs · drift')
    f.box(c[0], 300, W, H, 'neu', 'Change gate', 'trigger → spec delta', dashed=True)
    f.path(f'M{c[0]+W},80 H{c[1]-4}')
    f.path(f'M{c[1]+W},80 H{c[2]-4}')
    f.path(f'M{c[1]+W/2},120 V200 H{c[2]-4}')                       # W1 → W3 (parallel branch)
    f.text(c[1] + W / 2 + 70, 194, 'W2 ∥ W3', f.p['muted'], 12.5)
    f.path(f'M{c[2]+W},80 H{c[2]+W+20} V125 H{c[3]-4}')             # W2 → W4
    f.path(f'M{c[2]+W},200 H{c[2]+W+20} V155 H{c[3]-4}')            # W3 → W4 (needs both)
    f.path(f'M{c[3]+W/2},180 V296')                                 # W4 → W5
    f.path(f'M{c[3]},340 H{c[2]+W+4}')                              # W5 → W6
    f.path(f'M{c[2]},340 H{c[1]+W+4}')                              # W6 → W7
    f.path(f'M{c[1]},340 H{c[0]+W+4}')                              # W7 → change gate
    # returns: code / behavior → W5; configuration only → W7
    f.path(f'M{c[0]+W/2},380 V440 H{c[3]+W/2} V384', dashed=True)
    f.path(f'M{c[0]+W/2+30},380 V420 H{c[1]+W/2} V384', dashed=True)
    f.text(c[2] + W / 2, 458, 'code or behavior change → W5', f.p['muted'], 12.5)
    f.text(c[1] + W / 2 - 12, 412, 'configuration only → W7', f.p['muted'], 12.5, anchor='end')
    f.legend(515, [('std', 'Agentic PRD Standard gate'), ('sdd', 'SDD / Gate 1'), ('hrn', 'Harness Specification gate')])
    return f.svg()


# ---------------------------------------------------------------- figure 2 (Appendix A, verbatim)
RACI = [
    ('AI Governance Board',     ['C', 'C', 'A', '—', 'C', '—', 'A*', 'A']),
    ('AI Product Owner',        ['R', 'R/A', 'C', 'C', 'C', 'C', 'C', 'R']),
    ('Business Line Owner',     ['C', 'C', '—', '—', '—', '—', '—', 'A']),
    ('AI Risk Officer',         ['A', 'A', 'R:S4', 'C', 'C', '—', 'A', 'C']),
    ('Architect',               ['C', 'C', 'R', 'C', 'C', 'C', 'C', 'C']),
    ('Eval Owner',              ['C', 'A', 'C', 'R/A', 'C', 'C', 'R', 'C']),
    ('AI Security Reviewer',    ['C', 'C', 'R:S3', '—', 'A', '—', 'R', 'C']),
    ('Data Protection Officer', ['A:T5', 'C', 'R:S4', '—', 'C', '—', 'C', 'C']),
    ('Harness Engineer',        ['—', '—', 'C', 'C', 'R', 'R', 'C', 'R']),
    ('Legal',                   ['C/A:DAS', 'C', 'C', '—', '—', '—', '—', 'C']),
    ('Vendor Control Owner',    ['C', '—', 'C', '—', '—', '—', '—', 'C']),
    ('Product engineering',     ['—', '—', 'C', 'R:M', 'C', 'R', 'C', 'C']),
]


def fig2(pal):
    rowh, top, x0, colw = 44, 80, 270, 102
    f = Fig(1120, top + rowh * len(RACI) + 110, pal, 'Figure 2 — Unified RACI by stage (Appendix A)')
    p = f.p
    _, std_stroke, std_head, _ = p['std']
    f.text(40, 58, 'Role', p['muted'], 14, 600, 'start')
    for i in range(8):
        f.text(x0 + colw * i + colw / 2, 58, f'W{i}', std_head, 16, 700)
    for r, (role, cells) in enumerate(RACI):
        y = top + r * rowh
        if r % 2 == 0:
            f.parts.append(f'<rect x="30" y="{y}" width="1060" height="{rowh}" fill="{p["band"]}"/>')
        f.text(40, y + 28, role, p['neu'][2], 14.5, anchor='start')
        for i, cell in enumerate(cells):
            cx, cy = x0 + colw * i + colw / 2, y + rowh / 2
            label, _, note = cell.partition(':')
            if label == '—':
                continue
            if label == 'C':
                f.parts.append(f'<circle cx="{cx}" cy="{cy}" r="5" fill="{p["muted"]}" opacity="0.7"/>')
                continue
            approves = 'A' in label
            bw = 30 + 9 * len(label)
            fill = std_stroke if approves else p['std'][0]
            color = p['bg'] if approves else std_head
            f.parts.append(f'<rect x="{cx-bw/2}" y="{cy-13}" width="{bw}" height="26" rx="6" fill="{fill}" stroke="{std_stroke}" stroke-width="1.4"/>')
            f.text(cx, cy + 5, label, color, 13.5, 700)
            if note:
                f.text(cx + bw / 2 + 3, cy + 5, note, p['muted'], 10.5, 600, 'start')
    ly = top + rowh * len(RACI) + 40
    f.parts.append(f'<rect x="40" y="{ly-14}" width="26" height="22" rx="5" fill="{std_stroke}"/>')
    f.text(53, ly + 2, 'A', p['bg'], 12.5, 700)
    f.text(76, ly + 2, 'approves the gate', p['muted'], 13.5, anchor='start')
    f.parts.append(f'<rect x="250" y="{ly-14}" width="26" height="22" rx="5" fill="{p["std"][0]}" stroke="{std_stroke}"/>')
    f.text(263, ly + 2, 'R', std_head, 12.5, 700)
    f.text(286, ly + 2, 'responsible', p['muted'], 13.5, anchor='start')
    f.parts.append(f'<circle cx="420" cy="{ly-3}" r="5" fill="{p["muted"]}" opacity="0.7"/>')
    f.text(434, ly + 2, 'consulted', p['muted'], 13.5, anchor='start')
    f.text(40, ly + 34, 'A* Annex III agents only · DAS: Legal approves DAS rows with a legal source · T5, S3, S4, M: the trigger or artifact in scope',
           p['muted'], 12.5, anchor='start')
    return f.svg()


# ---------------------------------------------------------------- figure 3
def fig3(pal):
    f = Fig(1120, 560, pal, 'Figure 3 — Three frameworks, one document set per agentic system')
    W, H, c = 320, 78, [40, 400, 760]
    f.box(c[0], 30, W, H, 'std', 'Agentic PRD Standard v3.10.2', 'hub H0–H14 · spokes S1–S6 · M')
    f.box(c[1], 30, W, H, 'sdd', 'SDD v1.0.3', 'four layers · contracts · IDs')
    f.box(c[2], 30, W, H, 'hrn', 'Harness Specification v1.3', 'Gates 0–4 · HRN-01..12')
    for x in c:
        f.path(f'M{x+W/2},{30+H} V176')
    f.box(40, 180, 1040, 200, 'neu', '', dashed=True)
    f.text(64, 212, 'Product document set (one per agentic system)', f.p['neu'][2], 16, 700, 'start')
    bw, bx = 236, [64, 316, 568, 820]
    f.box(bx[0], 236, bw, 76, 'std', 'Hub', 'claims · boundaries')
    f.box(bx[1], 236, bw, 76, 'sdd', 'Spokes S1–S6', 'S1, S3, S4 in SDD form')
    f.box(bx[2], 236, bw, 76, 'std', 'M', 'specs · deltas')
    f.box(bx[3], 236, bw, 76, 'hrn', 'Harness binding', 'permissions · hooks · ledgers')
    f.text(560, 354, 'Every artifact cites the others by ID; only the hub makes claims', f.p['muted'], 14)
    for x in c:
        f.path(f'M{x+W/2},380 V436')
    f.box(c[0], 440, W, H, 'neu', 'Registry entry', 'identity · sponsor · tier')
    f.box(c[1], 440, W, H, 'neu', 'Ledgers and traces', 'HRN-06 · HRN-07 · trace ID')
    f.box(c[2], 440, W, H, 'neu', 'Deployed agent', 'Gate 4 · SLOs')
    return f.svg()


# ---------------------------------------------------------------- figure 4 (§7.1 compile rules)
BINDINGS = [
    ('H8 DAS · H9 · S3.2', 'PROHIBITED, HITL-REQUIRED, “No” cells', 'HRN-01 permission model', 'deny · ask · allow, each citing its boundary'),
    ('H8 DAS positions', 'HUMAN-ONLY · HITL-REQUIRED', 'HRN-04 unattended profile', 'prepares; never executes a consequential act'),
    ('S3.5 audit · S6 change record', 'append-only · correlation ID', 'HRN-06 ledgers', 'off-host · write-once'),
    ('S5.1 observability', 'one span per agent call', 'HRN-07 telemetry', 'GenAI semantic conventions'),
    ('H14 honest-claims matrix', 'specified vs demonstrated', 'HRN-05 claim auditor', '“demonstrated” only with a run ID'),
    ('S6.2 change control', 'one publisher · no local edits', 'HRN-09 distribution', 'manifest · checksum · resync'),
]


def fig4(pal):
    f = Fig(1120, 40 + 100 * len(BINDINGS) + 50, pal, 'Figure 4 — Six PRD sections and the harness controls they compile into')
    for i, (lh, ls, rh, rs) in enumerate(BINDINGS):
        y = 30 + i * 100
        f.box(40, y, 420, 78, 'std', lh, ls)
        f.box(660, y, 420, 78, 'hrn', rh, rs)
        f.path(f'M468,{y+39} H652')
    f.legend(40 + 100 * len(BINDINGS) + 18, [('std', 'PRD document-set section'), ('hrn', 'Harness control')])
    return f.svg()


# ---------------------------------------------------------------- figures 5 & 6 (two-row snakes)
def snake(pal, title, row1, row2, footer=None, link_last=True):
    f = Fig(1120, 330 if footer else 300, pal, title)
    W, H, c = 320, 80, [40, 400, 760]
    for i, (kind, head, sub, *dash) in enumerate(row1):
        f.box(c[i], 30, W, H, kind, head, sub, dashed=bool(dash))
    for i, (kind, head, sub, *dash) in enumerate(row2):
        f.box(c[i], 180, W, H, kind, head, sub, dashed=bool(dash))
    f.path(f'M{c[0]+W},70 H{c[1]-4}')
    f.path(f'M{c[1]+W},70 H{c[2]-4}')
    f.path(f'M{c[2]+W/2},110 V145 H{c[0]+W/2} V176')
    f.path(f'M{c[0]+W},220 H{c[1]-4}')
    if link_last:
        f.path(f'M{c[1]+W},220 H{c[2]-4}')
    if footer:
        f.text(560, 300, footer, f.p['muted'], 14)
    return f.svg()


def fig5(pal):
    return snake(pal, 'Figure 5 — The change gate',
                 [('neu', 'Trigger', 'drift · request · standards · size'),
                  ('std', 'Spec delta', 'M/changes/<name> · predicted risk'),
                  ('hrn', 'Suites pass', 'regression + adversarial boundary')],
                 [('std', 'Owners approve', 'spoke owners · AI Risk Officer'),
                  ('std', 'Archive', 'folds into specs/ · version advances'),
                  ('neu', 'Re-run worksheet', '↻ back to W5 or W7', True)])


def fig6(pal):
    return snake(pal, 'Figure 6 — The assembling agent: propose-only',
                 [('neu', 'Inputs', 'source · Standard · kit'),
                  ('hrn', 'Assembling agent', 'Claude Code · HARNESS_UNATTENDED=1'),
                  ('std', 'Change branch', 'set · ledgers · trace ID')],
                 [('std', 'Human review', 'completeness · reader test'),
                  ('neu', 'Human merges', 'archive · version advances'),
                  ('hrn', 'Never', 'merge · edit specs/ · act')],
                 footer='Propose-only · Full form (T7) · every DAS action PROHIBITED or HITL-REQUIRED · HRN-05 audits every “done”',
                 link_last=False)


FIGURES = {
    'fig-1-spine': fig1, 'fig-2-raci': fig2, 'fig-3-artifact-flow': fig3,
    'fig-4-binding-map': fig4, 'fig-5-change-gate': fig5, 'fig-6-assembling-agent': fig6,
}

if __name__ == '__main__':
    for pal, out in zip(('dark', 'light'), sys.argv[1:3]):
        os.makedirs(out, exist_ok=True)
        for name, fn in FIGURES.items():
            with open(os.path.join(out, f'{name}.svg'), 'w') as fh:
                fh.write(fn(pal))
            print(os.path.join(out, f'{name}.svg'))
