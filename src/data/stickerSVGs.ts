// SVG line-art outlines for each sticker type
// All SVGs are 400x400, black outlines only (no fill) so kids can color them in

export const stickerSVGs: Record<string, string> = {
  // ─── GIRL STICKERS – Unicorn / Fantasy ───────────────────────────────────
  g1: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" fill="none" stroke="#1e1e1e" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">
    <!-- Body -->
    <ellipse cx="200" cy="260" rx="110" ry="80"/>
    <!-- Neck -->
    <path d="M160 195 Q155 240 160 260"/>
    <path d="M200 185 Q210 230 200 260"/>
    <!-- Head -->
    <ellipse cx="180" cy="165" rx="50" ry="45"/>
    <!-- Horn -->
    <polygon points="180,80 165,125 195,125"/>
    <!-- Ear -->
    <path d="M215,140 L230,115 L220,145"/>
    <!-- Eye -->
    <circle cx="168" cy="158" r="7"/>
    <circle cx="168" cy="158" r="2" fill="#1e1e1e"/>
    <!-- Nostril -->
    <ellipse cx="158" cy="180" rx="5" ry="3"/>
    <!-- Mane strands -->
    <path d="M215,130 Q260,145 250,185 Q255,210 230,220"/>
    <path d="M218,140 Q270,160 255,200 Q258,225 234,238"/>
    <path d="M210,155 Q255,175 240,215"/>
    <!-- Tail -->
    <path d="M305,255 Q340,220 330,270 Q340,300 310,290 Q320,320 290,310"/>
    <path d="M305,255 Q350,240 345,285 Q348,310 320,305"/>
    <!-- Legs -->
    <path d="M140,330 L130,370 M165,335 L160,375"/>
    <path d="M235,330 L240,370 M260,325 L268,365"/>
    <!-- Hooves -->
    <rect x="123" y="368" width="18" height="10" rx="4"/>
    <rect x="152" y="372" width="18" height="10" rx="4"/>
    <rect x="232" y="368" width="18" height="10" rx="4"/>
    <rect x="260" y="362" width="18" height="10" rx="4"/>
    <!-- Stars around -->
    <path d="M60,80 L64,92 L76,92 L66,100 L70,112 L60,104 L50,112 L54,100 L44,92 L56,92 Z" stroke-width="2.5"/>
    <path d="M320,60 L322,68 L330,68 L324,73 L326,81 L320,76 L314,81 L316,73 L310,68 L318,68 Z" stroke-width="2.5"/>
    <path d="M350,150 L352,158 L360,158 L354,163 L356,171 L350,166 L344,171 L346,163 L340,158 L348,158 Z" stroke-width="2.5"/>
  </svg>`,

  g2: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" fill="none" stroke="#1e1e1e" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">
    <!-- Rainbow arch -->
    <path d="M50,300 Q200,60 350,300" stroke-width="12"/>
    <path d="M75,302 Q200,90 325,302" stroke-width="10"/>
    <path d="M100,304 Q200,120 300,304" stroke-width="8"/>
    <!-- Clouds on left -->
    <circle cx="60" cy="295" r="28"/>
    <circle cx="90" cy="282" r="22"/>
    <circle cx="45" cy="282" r="18"/>
    <!-- Clouds on right -->
    <circle cx="340" cy="295" r="28"/>
    <circle cx="310" cy="282" r="22"/>
    <circle cx="355" cy="282" r="18"/>
    <!-- Stars above rainbow -->
    <path d="M200,50 L204,64 L218,64 L207,73 L211,87 L200,78 L189,87 L193,73 L182,64 L196,64 Z"/>
    <path d="M140,80 L143,90 L153,90 L145,96 L148,106 L140,100 L132,106 L135,96 L127,90 L137,90 Z" stroke-width="3"/>
    <path d="M260,80 L263,90 L273,90 L265,96 L268,106 L260,100 L252,106 L255,96 L247,90 L257,90 Z" stroke-width="3"/>
  </svg>`,

  g3: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" fill="none" stroke="#1e1e1e" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">
    <!-- Fairy body -->
    <ellipse cx="200" cy="250" rx="45" ry="65"/>
    <!-- Head -->
    <circle cx="200" cy="155" r="50"/>
    <!-- Hair wavy -->
    <path d="M155,140 Q145,100 160,80 Q175,60 200,75 Q225,60 240,80 Q255,100 245,140"/>
    <path d="M152,165 Q130,180 140,210"/>
    <path d="M248,165 Q270,180 260,210"/>
    <!-- Eyes -->
    <path d="M182,148 Q190,142 198,148"/>
    <path d="M202,148 Q210,142 218,148"/>
    <circle cx="190" cy="152" r="4" fill="#1e1e1e"/>
    <circle cx="210" cy="152" r="4" fill="#1e1e1e"/>
    <!-- Smile -->
    <path d="M188,172 Q200,182 212,172"/>
    <!-- Crown -->
    <path d="M165,112 L175,90 L185,110 L200,88 L215,110 L225,90 L235,112"/>
    <circle cx="200" cy="88" r="6"/>
    <circle cx="175" cy="90" r="4"/>
    <circle cx="225" cy="90" r="4"/>
    <!-- Wings left -->
    <path d="M158,230 Q100,195 110,255 Q118,290 160,270"/>
    <path d="M158,240 Q95,220 108,270 Q115,300 155,285"/>
    <!-- Wings right -->
    <path d="M242,230 Q300,195 290,255 Q282,290 240,270"/>
    <path d="M242,240 Q305,220 292,270 Q285,300 245,285"/>
    <!-- Wand -->
    <line x1="250" y1="200" x2="330" y2="120"/>
    <path d="M330,120 L320,105 L335,108 L324,96 L338,102 L332,88 L342,100 L340,85 L348,98 L350,83 L352,98 L360,86 L356,100 L368,98 L358,108 L370,112 L356,114 L360,126 L348,118 L346,132 L338,120 Z" stroke-width="3"/>
    <!-- Sparkles -->
    <path d="M80,80 L82,88 L90,88 L84,93 L86,101 L80,96 L74,101 L76,93 L70,88 L78,88 Z" stroke-width="2.5"/>
    <path d="M330,300 L332,308 L340,308 L334,313 L336,321 L330,316 L324,321 L326,313 L320,308 L328,308 Z" stroke-width="2.5"/>
  </svg>`,

  g4: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" fill="none" stroke="#1e1e1e" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">
    <!-- Big heart -->
    <path d="M200,320 Q80,240 80,160 Q80,100 130,90 Q165,85 200,120 Q235,85 270,90 Q320,100 320,160 Q320,240 200,320 Z"/>
    <!-- Inner heart detail -->
    <path d="M200,290 Q110,225 110,165 Q110,125 140,118 Q165,113 200,140 Q235,113 260,118 Q290,125 290,165 Q290,225 200,290 Z"/>
    <!-- Sparkles around heart -->
    <path d="M55,100 L58,112 L70,112 L60,120 L63,132 L55,124 L47,132 L50,120 L40,112 L52,112 Z" stroke-width="3"/>
    <path d="M345,100 L348,112 L360,112 L350,120 L353,132 L345,124 L337,132 L340,120 L330,112 L342,112 Z" stroke-width="3"/>
    <path d="M200,50 L203,60 L213,60 L205,67 L208,77 L200,70 L192,77 L195,67 L187,60 L197,60 Z" stroke-width="3"/>
    <path d="M80,300 L83,310 L93,310 L85,317 L88,327 L80,320 L72,327 L75,317 L67,310 L77,310 Z" stroke-width="3"/>
    <path d="M320,300 L323,310 L333,310 L325,317 L328,327 L320,320 L312,327 L315,317 L307,310 L317,310 Z" stroke-width="3"/>
    <!-- Small hearts -->
    <path d="M120,60 Q104,48 104,36 Q104,26 114,24 Q120,23 126,30 Q132,23 138,24 Q148,26 148,36 Q148,48 120,60 Z" stroke-width="3"/>
    <path d="M280,60 Q264,48 264,36 Q264,26 274,24 Q280,23 286,30 Q292,23 298,24 Q308,26 308,36 Q308,48 280,60 Z" stroke-width="3"/>
  </svg>`,

  g5: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" fill="none" stroke="#1e1e1e" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">
    <!-- Swan body -->
    <ellipse cx="220" cy="280" rx="120" ry="70"/>
    <!-- Long neck -->
    <path d="M145,250 Q130,190 155,155 Q170,130 185,140"/>
    <path d="M165,252 Q155,195 175,158 Q188,133 200,143"/>
    <!-- Head -->
    <ellipse cx="195" cy="135" rx="30" ry="25"/>
    <!-- Beak -->
    <path d="M168,130 L140,125 L145,135 Z"/>
    <!-- Eye -->
    <circle cx="188" cy="128" r="5"/>
    <circle cx="188" cy="128" r="2" fill="#1e1e1e"/>
    <!-- Crown on head -->
    <path d="M178,112 L183,95 L190,110 L197,92 L204,110 L211,95 L216,112"/>
    <!-- Wing left -->
    <path d="M135,255 Q80,210 95,270 Q105,310 155,300"/>
    <!-- Wing right feathers -->
    <path d="M280,235 Q340,200 360,250 Q365,290 320,295"/>
    <path d="M275,250 Q335,225 348,270 Q350,300 308,300"/>
    <!-- Ripples on water -->
    <path d="M100,340 Q200,330 300,340" stroke-width="3"/>
    <path d="M80,358 Q200,345 320,358" stroke-width="3"/>
    <!-- Stars -->
    <path d="M60,80 L63,92 L75,92 L65,100 L68,112 L60,104 L52,112 L55,100 L45,92 L57,92 Z" stroke-width="3"/>
    <path d="M340,80 L343,92 L355,92 L345,100 L348,112 L340,104 L332,112 L335,100 L325,92 L337,92 Z" stroke-width="3"/>
  </svg>`,

  // ─── BOY STICKERS – Cars & Vehicles ──────────────────────────────────────
  b1: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" fill="none" stroke="#1e1e1e" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">
    <!-- Race car body -->
    <path d="M60,230 Q70,200 110,195 Q140,175 200,170 Q260,175 290,195 Q330,200 340,230 L340,270 Q320,280 200,282 Q80,280 60,270 Z"/>
    <!-- Cockpit/windshield -->
    <path d="M145,195 Q160,165 200,158 Q240,165 255,195"/>
    <!-- Front splitter -->
    <path d="M55,240 L30,245 L35,260 L60,255"/>
    <!-- Rear diffuser -->
    <path d="M340,240 L365,245 L360,260 L335,258"/>
    <!-- Wheels -->
    <circle cx="125" cy="278" r="38"/>
    <circle cx="125" cy="278" r="22"/>
    <circle cx="275" cy="278" r="38"/>
    <circle cx="275" cy="278" r="22"/>
    <!-- Wheel spokes -->
    <line x1="125" y1="256" x2="125" y2="300"/>
    <line x1="103" y1="278" x2="147" y2="278"/>
    <line x1="109" y1="262" x2="141" y2="294"/>
    <line x1="141" y1="262" x2="109" y2="294"/>
    <line x1="275" y1="256" x2="275" y2="300"/>
    <line x1="253" y1="278" x2="297" y2="278"/>
    <line x1="259" y1="262" x2="291" y2="294"/>
    <line x1="291" y1="262" x2="259" y2="294"/>
    <!-- Racing stripes -->
    <line x1="160" y1="200" x2="160" y2="270" stroke-width="3"/>
    <line x1="200" y1="195" x2="200" y2="270" stroke-width="3"/>
    <line x1="240" y1="200" x2="240" y2="270" stroke-width="3"/>
    <!-- Exhaust pipes -->
    <path d="M60,240 L40,238 L38,248 L60,250"/>
    <!-- Number on car -->
    <text x="190" y="245" font-size="36" font-weight="bold" stroke="#1e1e1e" fill="none">1</text>
    <!-- Speed lines -->
    <path d="M30,180 L80,182" stroke-width="3"/>
    <path d="M20,195 L75,197" stroke-width="3"/>
    <path d="M25,210 L78,212" stroke-width="3"/>
  </svg>`,

  b2: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" fill="none" stroke="#1e1e1e" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">
    <!-- Police car body -->
    <rect x="50" y="220" width="300" height="80" rx="12"/>
    <!-- Roof / cabin -->
    <path d="M110,220 Q120,175 150,168 L250,168 Q280,175 290,220"/>
    <!-- Windscreen -->
    <path d="M130,220 Q138,182 155,175 L245,175 Q262,182 270,220"/>
    <!-- Light bar on roof -->
    <rect x="155" y="145" width="90" height="23" rx="6"/>
    <circle cx="175" cy="157" r="9"/>
    <circle cx="200" cy="157" r="9"/>
    <circle cx="225" cy="157" r="9"/>
    <!-- Wheels -->
    <circle cx="115" cy="300" r="36"/>
    <circle cx="115" cy="300" r="20"/>
    <circle cx="285" cy="300" r="36"/>
    <circle cx="285" cy="300" r="20"/>
    <!-- Wheel spokes -->
    <line x1="115" y1="280" x2="115" y2="320"/>
    <line x1="95" y1="300" x2="135" y2="300"/>
    <line x1="101" y1="286" x2="129" y2="314"/>
    <line x1="129" y1="286" x2="101" y2="314"/>
    <line x1="285" y1="280" x2="285" y2="320"/>
    <line x1="265" y1="300" x2="305" y2="300"/>
    <line x1="271" y1="286" x2="299" y2="314"/>
    <line x1="299" y1="286" x2="271" y2="314"/>
    <!-- Door lines -->
    <line x1="195" y1="220" x2="195" y2="298" stroke-width="3"/>
    <circle cx="185" cy="260" r="5"/>
    <!-- Rear wing/trunk detail -->
    <path d="M340,220 L355,215 L358,235 L340,238"/>
    <!-- Front bumper detail -->
    <path d="M60,225 L45,222 L43,238 L60,240"/>
    <!-- POLICE text area -->
    <rect x="100" y="242" width="200" height="30" rx="5" stroke-width="3"/>
    <text x="200" y="263" text-anchor="middle" font-size="18" font-weight="bold" stroke="#1e1e1e" fill="none">POLICE</text>
  </svg>`,

  b3: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" fill="none" stroke="#1e1e1e" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">
    <!-- Monster truck body -->
    <rect x="80" y="185" width="240" height="100" rx="15"/>
    <!-- Cab roof -->
    <path d="M115,185 Q120,145 150,138 L250,138 Q280,145 285,185"/>
    <!-- Windows -->
    <path d="M132,185 Q136,152 155,145 L245,145 Q264,152 268,185"/>
    <!-- HUGE Wheels -->
    <circle cx="115" cy="308" r="60"/>
    <circle cx="115" cy="308" r="35"/>
    <circle cx="285" cy="308" r="60"/>
    <circle cx="285" cy="308" r="35"/>
    <!-- Monster wheel tread marks -->
    <path d="M60,270 Q55,308 60,346" stroke-width="8"/>
    <path d="M170,248 Q175,308 170,368" stroke-width="8"/>
    <path d="M230,248 Q225,308 230,368" stroke-width="8"/>
    <path d="M340,270 Q345,308 340,346" stroke-width="8"/>
    <!-- Exhaust stacks on roof -->
    <rect x="155" y="100" width="16" height="38" rx="4"/>
    <rect x="229" y="100" width="16" height="38" rx="4"/>
    <path d="M150,100 Q163,90 171,100"/>
    <path d="M224,100 Q237,90 245,100"/>
    <!-- Grill at front -->
    <rect x="303" y="200" width="30" height="55" rx="5"/>
    <line x1="303" y1="215" x2="333" y2="215" stroke-width="3"/>
    <line x1="303" y1="228" x2="333" y2="228" stroke-width="3"/>
    <line x1="303" y1="241" x2="333" y2="241" stroke-width="3"/>
    <!-- Door handle -->
    <path d="M170,225 L175,225 L175,235 L170,235" stroke-width="3"/>
    <!-- Flames -->
    <path d="M338,185 Q350,165 345,145 Q360,158 355,135 Q370,150 365,128 Q378,145 370,120 Q385,140 375,115" stroke-width="3"/>
  </svg>`,

  b4: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" fill="none" stroke="#1e1e1e" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">
    <!-- Fire truck body -->
    <rect x="30" y="205" width="340" height="95" rx="10"/>
    <!-- Cabin on left -->
    <path d="M30,205 L30,165 Q35,150 55,147 L140,147 L140,205"/>
    <!-- Cabin window -->
    <rect x="42" y="158" width="85" height="40" rx="5"/>
    <!-- Ladder on top -->
    <rect x="145" y="185" width="195" height="20" rx="3"/>
    <line x1="175" y1="185" x2="175" y2="205" stroke-width="3"/>
    <line x1="205" y1="185" x2="205" y2="205" stroke-width="3"/>
    <line x1="235" y1="185" x2="235" y2="205" stroke-width="3"/>
    <line x1="265" y1="185" x2="265" y2="205" stroke-width="3"/>
    <line x1="295" y1="185" x2="295" y2="205" stroke-width="3"/>
    <!-- Hose reel -->
    <circle cx="320" cy="175" r="25"/>
    <circle cx="320" cy="175" r="15"/>
    <circle cx="320" cy="175" r="5"/>
    <!-- Water cannon -->
    <rect x="190" y="160" width="80" height="25" rx="6"/>
    <path d="M270,167 L300,155 L305,165 L272,175"/>
    <!-- Light bar on cab -->
    <rect x="38" y="140" width="95" height="18" rx="5"/>
    <circle cx="60" cy="149" r="7"/>
    <circle cx="85" cy="149" r="7"/>
    <circle cx="110" cy="149" r="7"/>
    <!-- Wheels -->
    <circle cx="88" cy="300" r="37"/>
    <circle cx="88" cy="300" r="20"/>
    <circle cx="200" cy="300" r="37"/>
    <circle cx="200" cy="300" r="20"/>
    <circle cx="312" cy="300" r="37"/>
    <circle cx="312" cy="300" r="20"/>
    <!-- FIRE text -->
    <text x="85" y="265" text-anchor="middle" font-size="18" font-weight="bold" stroke="#1e1e1e" fill="none">FIRE</text>
    <!-- Hose at front -->
    <path d="M30,250 Q10,250 8,265 Q8,280 30,278"/>
    <!-- Panels / storage doors -->
    <rect x="145" y="215" width="55" height="72" rx="5" stroke-width="3"/>
    <rect x="210" y="215" width="55" height="72" rx="5" stroke-width="3"/>
  </svg>`,

  b5: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" fill="none" stroke="#1e1e1e" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">
    <!-- Rocket body -->
    <path d="M200,40 Q240,70 250,180 L250,310 Q200,330 150,310 L150,180 Q160,70 200,40 Z"/>
    <!-- Nose cone detail lines -->
    <path d="M180,100 Q200,75 220,100"/>
    <!-- Windows -->
    <circle cx="200" cy="160" r="28"/>
    <circle cx="200" cy="160" r="18"/>
    <!-- Side wings / fins -->
    <path d="M150,280 Q100,295 90,340 L150,320"/>
    <path d="M250,280 Q300,295 310,340 L250,320"/>
    <!-- Bottom fins -->
    <path d="M165,310 Q150,340 140,355 L175,335"/>
    <path d="M235,310 Q250,340 260,355 L225,335"/>
    <!-- Exhaust nozzles -->
    <ellipse cx="185" cy="330" rx="14" ry="8"/>
    <ellipse cx="215" cy="330" rx="14" ry="8"/>
    <!-- Flames from exhausts -->
    <path d="M175,338 Q180,360 185,380 Q190,360 195,338"/>
    <path d="M205,338 Q210,360 215,380 Q220,360 225,338"/>
    <!-- Stars / space elements -->
    <path d="M60,80 L62,88 L70,88 L64,93 L66,101 L60,96 L54,101 L56,93 L50,88 L58,88 Z" stroke-width="3"/>
    <path d="M340,100 L342,108 L350,108 L344,113 L346,121 L340,116 L334,121 L336,113 L330,108 L338,108 Z" stroke-width="3"/>
    <path d="M70,200 L72,206 L78,206 L73,210 L75,216 L70,212 L65,216 L67,210 L62,206 L68,206 Z" stroke-width="2.5"/>
    <path d="M330,200 L332,206 L338,206 L333,210 L335,216 L330,212 L325,216 L327,210 L322,206 L328,206 Z" stroke-width="2.5"/>
    <circle cx="80" cy="300" r="6" stroke-width="3"/>
    <circle cx="320" cy="280" r="8" stroke-width="3"/>
    <circle cx="350" cy="160" r="5" stroke-width="3"/>
    <!-- Panel lines on rocket -->
    <line x1="175" y1="185" x2="175" y2="295" stroke-width="3"/>
    <line x1="225" y1="185" x2="225" y2="295" stroke-width="3"/>
    <line x1="155" y1="240" x2="245" y2="240" stroke-width="3"/>
  </svg>`,
};

// Map any sticker ID that doesn't have a unique SVG to a generic one by gender
export function getStickerSVG(stickerId: string, gender: 'boy' | 'girl'): string {
  if (stickerSVGs[stickerId]) return stickerSVGs[stickerId];
  // Fall back to the first of that gender
  return gender === 'girl' ? stickerSVGs['g1'] : stickerSVGs['b1'];
}
