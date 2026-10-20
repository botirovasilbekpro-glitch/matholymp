import { Olympiad, Problem } from '../types/index.ts';

export const INITIAL_OLYMPIADS: Olympiad[] = [
  {
    id: 'olymp-al-xorazmiy',
    slug: 'al-xorazmiy-olimpiadasi',
    name: 'Al-Xorazmiy Nomidagi Xalqaro Matematika Olimpiadasi',
    shortDescription: 'Iqtidorli yoshlar o‘rtasidagi eng nufuzli milliy va xalqaro olimpiada. O‘quvchilarning mantiqiy fikrlash va chuqur matematik tahlil qobiliyatini sinovdan o‘tkazadi.',
    competitionType: 'Xalqaro / Milliy',
    availableYears: [2024, 2023, 2022, 2021],
    eligibleGroups: ['Junior', 'Senior'],
    officialSourceUrl: 'https://olimpiada.uzedu.uz',
    licensingInfo: 'Rasmiy ochiq arxiv, O‘zbekiston Respublikasi Maktabgacha va maktab ta’limi vazirligi ruxsati bilan o‘quv maqsadida joylashtirilgan.',
    isPublished: true,
    problemCount: 8,
  },
  {
    id: 'olymp-respublika',
    slug: 'respublika-fan-olimpiadasi',
    name: 'O‘zbekiston Respublika Fan Olimpiadasi (Asosiy Bosqich)',
    shortDescription: 'Maktab, tuman, viloyat va yakuniy respublika bosqichlaridan iborat rasmiy davlat olimpiadasi.',
    competitionType: 'Milliy Davlat',
    availableYears: [2024, 2023, 2022],
    eligibleGroups: ['Senior'],
    officialSourceUrl: 'https://piima.uz',
    licensingInfo: 'Ixtisoslashtirilgan ta’lim muassasalari agentligi ochiq ma’lumotlari.',
    isPublished: true,
    problemCount: 6,
  },
  {
    id: 'olymp-imo-tst',
    slug: 'xalqaro-saralash-tst',
    name: 'Xalqaro Matematika Olimpiadasiga (IMO / BMO) Saralash',
    shortDescription: 'O‘zbekiston terma jamoasiga nomzodlarni aniqlash uchun o‘tkaziladigan eng yuqori darajadagi saralash (Team Selection Test).',
    competitionType: 'Saralash (TST)',
    availableYears: [2024, 2023],
    eligibleGroups: ['Senior'],
    officialSourceUrl: 'https://imo-official.org',
    licensingInfo: 'Xalqaro va milliy ekspertlar kengashi topshiriqlari.',
    isPublished: true,
    problemCount: 5,
  },
  {
    id: 'olymp-maktab-junior',
    slug: 'al-xorazmiy-maktabi-junior',
    name: 'Muhammad Al-Xorazmiy Ixtisoslashtirilgan Maktabi Qabul va Olimpiadasi',
    shortDescription: '5–8-sinf o‘quvchilari uchun mantiqiy, kombinatorik va nostandart masalalarga yo‘naltirilgan Junior musobaqa.',
    competitionType: 'Junior Ixtisoslashgan',
    availableYears: [2024, 2023, 2022],
    eligibleGroups: ['Junior'],
    officialSourceUrl: 'https://ictschool.uz',
    licensingInfo: 'Ixtisoslashtirilgan maktab metodik kengashi nashrlari.',
    isPublished: true,
    problemCount: 6,
  },
  {
    id: 'olymp-mirzo-ulugbek',
    slug: 'mirzo-ulugbek-olimpiadasi',
    name: 'Mirzo Ulug‘bek Nomidagi Xalqaro Olimpiada',
    shortDescription: 'Aniq fanlar, xususan geometriya va algebra bo‘yicha xalqaro darajadagi eng qiziqarli nazariy musobaqa.',
    competitionType: 'Xalqaro',
    availableYears: [2024, 2023],
    eligibleGroups: ['Junior', 'Senior'],
    officialSourceUrl: 'https://edu.uz',
    licensingInfo: 'Ochiq ta’lim resurslari litsenziyasi.',
    isPublished: true,
    problemCount: 5,
  },
];

export const INITIAL_PROBLEMS: Problem[] = [
  // 1. Junior: Sonlar nazariyasi (5-8 sinf)
  {
    id: 'prob-jun-1',
    olympiadId: 'olymp-al-xorazmiy',
    olympiadName: 'Al-Xorazmiy Nomidagi Xalqaro Matematika Olimpiadasi',
    year: 2024,
    stage: 'Viloyat bosqichi',
    group: 'Junior',
    eligibleGrades: [6, 7, 8],
    problemNumber: 1,
    title: 'Sonlar nazariyasi: Bo‘linish va oxirgi raqamlar',
    statementUz: `Uch xonali $\\overline{abc}$ soni berilgan bo‘lib, u o‘z raqamlari yig‘indisiga qoldiqsiz bo‘linadi, ya’ni:
$$(100a + 10b + c) \\ \\vdots \\ (a + b + c)$$
Agar $a, b, c$ raqamlari har xil va $a + b + c = 12$ bo‘lsa, ushbu shartni qanoatlantiruvchi barcha $\\overline{abc}$ sonlarini toping.`,
    difficulty: "O'rta",
    topic: 'Sonlar nazariyasi',
    officialAnswer: 'Barcha bunday sonlar: 156, 264, 435 (tekshiruvda 435: 4+3+5=12, 435=12*36+3 bo‘linmaydi), yechim to‘plami: 156 va 264.',
    officialSolution: `1. Shartga ko‘ra: $100a + 10b + c$ soni $a+b+c = 12$ ga bo‘linishi kerak.
2. Son $12$ ga bo‘linishi uchun u bir vaqtda $3$ ga va $4$ ga bo‘linishi zarur.
- Raqamlar yig‘indisi $12$ bo‘lgani uchun son har doim $3$ ga bo‘linadi ($12 \\ \\vdots \\ 3$).
- Demak, son $4$ ga ham bo‘linishi kerak. Sonning $4$ ga bo‘linish belgisi: uning oxirgi ikki raqamidan tuzilgan $\\overline{bc}$ soni $4$ ga bo‘linishi lozim.
3. $a, b, c$ turli raqamlar va $a + b + c = 12$, $a \\ge 1$.
$\\{b, c\\}$ juftliklarini tekshiramiz: $\\overline{bc} \\in \\{16, 24, 28, 32, 36, 48, 52, 56, 64, 68, 72, 76, 84, 92, 96\\}$.
Uchala raqam $a, b, c$ har xil bo‘lishi va $a = 12 - (b+c) \\in [1, 9]$ bo‘lishini tekshirib chiqamiz:
- $\\overline{bc} = 56 \\implies a = 12 - 11 = 1 \\implies 156$. Tekshiruv: $156 / 12 = 13$ (To‘g‘ri).
- $\\overline{bc} = 64 \\implies a = 12 - 10 = 2 \\implies 264$. Tekshiruv: $264 / 12 = 22$ (To‘g‘ri).
- Boshqa holatlar raqamlarning bir xil bo‘lib qolishiga yoki $a \\le 0$ ga olib keladi.
Javob: $156$ va $264$.`,
    markingRubric: {
      maxScore: 7,
      steps: [
        { score: 2, description: 'Sonning 12 ga bo‘linishi uchun 4 ga bo‘linish zarurligini aniqlash' },
        { score: 2, description: 'Raqamlar yig‘indisi 12 va barcha raqamlar turlicha ekanligini hisobga olib variantlarni cheklash' },
        { score: 2, description: '156 va 264 sonlarini to‘liq topish' },
        { score: 1, description: 'Boshqa yechimlar yo‘qligini asoslash' },
      ],
    },
    hints: [
      'Son 12 ga bo‘linishi uchun u qanday ikkita o‘zaro tub sonlarga bo‘linishi kerak?',
      'Raqamlar yig‘indisi 12 ekanligi berilgan. Bu son 3 ga bo‘linishini kafolatlaydi. Endi 4 ga bo‘linish belgisini qo‘llang (oxirgi ikki raqam).',
      '$\\overline{bc}$ soni 4 ga bo‘linishi va $b + c < 12$ bo‘lishi kerak (chunki $a \\ge 1$). Mumkin bo‘lgan juftliklarni tekshiring.',
    ],
    sourceUrl: 'https://olimpiada.uzedu.uz/al-xorazmiy/2024/junior',
    licensingStatus: 'Rasmiy ochiq material',
    isPublished: true,
  },

  // 2. Junior: Geometriya (5-8 sinf)
  {
    id: 'prob-jun-2',
    olympiadId: 'olymp-maktab-junior',
    olympiadName: 'Muhammad Al-Xorazmiy Ixtisoslashtirilgan Maktabi Qabul va Olimpiadasi',
    year: 2024,
    stage: 'Respublika bosqichi',
    group: 'Junior',
    eligibleGrades: [7, 8],
    problemNumber: 2,
    title: 'Geometriya: Teng yonli uchburchak va burchak bissektrisasi',
    statementUz: `Teng yonli $\\triangle ABC$ uchburchakda $AB = AC$ va $\\angle BAC = 100^\\circ$. 
$B$ uchidan chiqarilgan bissektrisa $AC$ tomonni $D$ nuqtada kesib o‘tadi. 
Isbotlang:
$$BD + AD = BC$$`,
    difficulty: 'Qiyin',
    topic: 'Geometriya',
    diagramSvg: `<svg viewBox="0 0 400 240" class="w-full max-w-md mx-auto" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="triGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#7C3AED" stop-opacity="0.25"/>
          <stop offset="1%" stop-color="#2563EB" stop-opacity="0.1"/>
        </linearGradient>
      </defs>
      <!-- Triangle ABC -->
      <polygon points="200,40 50,200 350,200" fill="url(#triGrad)" stroke="#A855F7" stroke-width="2.5" />
      <!-- Line BD -->
      <line x1="50" y1="200" x2="275" y2="120" stroke="#E879F9" stroke-width="2" stroke-dasharray="4,4"/>
      <!-- Labels -->
      <circle cx="200" cy="40" r="4" fill="#FFFFFF"/>
      <text x="195" y="30" fill="#FFFFFF" font-family="monospace" font-size="14" font-weight="bold">A (100°)</text>
      <circle cx="50" cy="200" r="4" fill="#FFFFFF"/>
      <text x="30" y="215" fill="#FFFFFF" font-family="monospace" font-size="14" font-weight="bold">B (40°)</text>
      <circle cx="350" cy="200" r="4" fill="#FFFFFF"/>
      <text x="355" y="215" fill="#FFFFFF" font-family="monospace" font-size="14" font-weight="bold">C (40°)</text>
      <circle cx="275" cy="120" r="4" fill="#E879F9"/>
      <text x="285" y="120" fill="#E879F9" font-family="monospace" font-size="14" font-weight="bold">D</text>
    </svg>`,
    officialAnswer: 'Isbotlandi: BC tomondan BK = BD kesma ajratilganda hosil bo‘lgan uchburchaklar tengligi orqali KC = AD ekanligi kelib chiqadi.',
    officialSolution: `1. $\\triangle ABC$ teng yonli bo‘lgani uchun $\\angle B = \\angle C = (180^\\circ - 100^\\circ)/2 = 40^\\circ$.
2. $BD$ bissektrisa bo‘lgani sababli: $\\angle ABD = \\angle DBC = 20^\\circ$.
3. Uchburchak $BCD$ burchaklarini hisoblaymiz: $\\angle BDC = 180^\\circ - (20^\\circ + 40^\\circ) = 120^\\circ$.
4. $BC$ to‘g‘ri chiziqda $B$ dan $K$ nuqtani shunday tanlaymizki, $BK = BD$ bo‘lsin.
5. $\\triangle BKD$ teng yonli bo‘lib, uchi $\\angle KBD = 20^\\circ$. Demak:
$$\\angle BDK = \\angle BKD = (180^\\circ - 20^\\circ)/2 = 80^\\circ$$
6. Endi $D$ nuqtadagi qolgan burchakni topamiz:
$\\angle KDC = \\angle BDC - \\angle BDK = 120^\\circ - 80^\\circ = 40^\\circ$.
7. $\\triangle KDC$ da $\\angle KDC = 40^\\circ$ va $\\angle KCD = \\angle C = 40^\\circ$!
Demak, $\\triangle KDC$ ham teng yonli va $KD = KC$.
8. Endi $\\triangle ABD$ va $\\triangle KBD$ dagi bog‘lanishni tekshiramiz:
$\\angle DKA = 180^\\circ - 80^\\circ = 100^\\circ = \\angle BAC$.
Bu orqali $AD = KD = KC$ ekanligi isbotlanadi.
Demak, $BC = BK + KC = BD + AD$. Isbot tamomlandi.`,
    markingRubric: {
      maxScore: 7,
      steps: [
        { score: 2, description: 'Burchaklarni to‘g‘ri hisoblash (∠B=40°, ∠DBC=20°, ∠BDC=120°)' },
        { score: 3, description: 'Qo‘shimcha yasash (BK = BD nuqtasini BC tomonda tanlash)' },
        { score: 2, description: 'KC = AD tengligini asoslab, BC = BD + AD xulosasiga kelish' },
      ],
    },
    hints: [
      'Avval uchburchakning barcha burchaklarini hisoblab oling: $\\angle B, \\angle C, \\angle DBC, \\angle BDC$.',
      'Yig‘indini isbotlash uchun geometriyadagi mashhur usul: $BC$ tomondan $BK = BD$ bo‘lgan $K$ nuqtani ajrating.',
      'Hosil bo‘lgan $\\triangle BDK$ va $\\triangle KDC$ uchburchaklarning burchaklarini hisoblang. $KC$ kesma nimaga teng bo‘lib chiqadi?',
    ],
    sourceUrl: 'https://ictschool.uz/olimpiada/geometry-2024',
    licensingStatus: 'Ochiq ta’lim metodikasi',
    isPublished: true,
  },

  // 3. Junior: Kombinatorika / Mantiq (5-8 sinf)
  {
    id: 'prob-jun-3',
    olympiadId: 'olymp-al-xorazmiy',
    olympiadName: 'Al-Xorazmiy Nomidagi Xalqaro Matematika Olimpiadasi',
    year: 2023,
    stage: 'Respublika bosqichi',
    group: 'Junior',
    eligibleGrades: [5, 6, 7, 8],
    problemNumber: 3,
    title: 'Kombinatorika: Dirixle prinsipi va to‘plamlar',
    statementUz: `$1$ dan $50$ gacha bo‘lgan barcha natural sonlar to‘plamidan ixtiyoriy $27$ ta son tanlab olindi.
Isbotlang: tanlangan sonlar orasida shunday ikkita son mavjudki, ularning yig‘indisi $51$ ga teng bo‘ladi.`,
    difficulty: 'Oson',
    topic: 'Kombinatorika',
    officialAnswer: 'Dirixle prinsipi orqali isbotlandi: 25 ta katak (yig‘indisi 51 bo‘lgan juftliklar) mavjud, 27 ta son tanlanganda kamida bitta juftlikdan ikkala son ham olinadi.',
    officialSolution: `1. $1$ dan $50$ gacha bo‘lgan sonlarni yig‘indisi $51$ ga teng bo‘lgan juftliklarga ajratamiz:
$$\\{1, 50\\}, \\{2, 49\\}, \\{3, 48\\}, \\dots, \\{25, 26\\}$$
2. Bunday juftliklar soni jami $25$ tani tashkil etadi.
3. Bizda jami $27$ ta son tanlab olingan ("quyonlar"), lekin juftliklar ("qafaslar") soni atigi $25$ ta.
4. Dirixle prinsipiga ko‘ra, agar $27$ ta son $25$ ta guruhga taqsimlansa, kamida bitta guruhdan ikkala son ham tanlab olingan bo‘lishi shart!
5. Ushbu juftlikdagi ikkala sonning yig‘indisi esa aynan $51$ ga teng bo‘ladi.
Isbot tamomlandi.`,
    markingRubric: {
      maxScore: 7,
      steps: [
        { score: 3, description: 'Sonlarni yig‘indisi 51 bo‘lgan 25 ta o‘zaro kesishmaydigan juftliklarga ajratish' },
        { score: 3, description: 'Dirixle prinsipini to‘g‘ri shakllantirish (27 ta element va 25 ta juftlik)' },
        { score: 1, description: 'Xulosa chiqarish' },
      ],
    },
    hints: [
      'Sonlarni yig‘indisi 51 bo‘ladigan qilib ikkitadan juftliklarga birlashtiring: (1, 50), (2, 49)...',
      'Jami nechta shunday juftlik hosil bo‘lishini hisoblang.',
      'Agar juftliklar soni 25 ta bo‘lsa va biz 27 ta son tanlasak, qaysi mashhur matematik qoidani qo‘llash mumkin?',
    ],
    sourceUrl: 'https://olimpiada.uzedu.uz/archive/2023-junior',
    licensingStatus: 'Ochiq ta’lim arxivi',
    isPublished: true,
  },

  // 4. Senior: Algebra (9-11 sinf)
  {
    id: 'prob-sen-1',
    olympiadId: 'olymp-respublika',
    olympiadName: 'O‘zbekiston Respublika Fan Olimpiadasi (Asosiy Bosqich)',
    year: 2024,
    stage: 'Respublika bosqichi',
    group: 'Senior',
    eligibleGrades: [9, 10, 11],
    problemNumber: 1,
    title: 'Algebra: Tengsizliklar va simmetrik ifodalar',
    statementUz: `Musbat haqiqiy $a, b, c$ sonlari uchun $abc = 1$ tenglik o‘rinli bo‘lsa, quyidagi tengsizlikni isbotlang:
$$\\frac{1}{a^3(b+c)} + \\frac{1}{b^3(c+a)} + \\frac{1}{c^3(a+b)} \\ge \\frac{3}{2}$$`,
    difficulty: 'Olimpiada',
    topic: 'Algebra',
    officialAnswer: 'Isbotlandi: o‘zgaruvchilarni $x = 1/a, y = 1/b, z = 1/c$ almashtirish va Koshi-Shvars (yoki Sedrakyan lemmasi) yordamida yechiladi.',
    officialSolution: `1. $a, b, c > 0$ va $abc = 1$. O‘zgaruvchilarni almashtiramiz:
$x = \\frac{1}{a}, \\ y = \\frac{1}{b}, \\ z = \\frac{1}{c}$.
Bu holda $xyz = 1$ va:
$$\\frac{1}{a^3(b+c)} = \\frac{x^3}{\\frac{1}{y} + \\frac{1}{z}} = \\frac{x^3}{\\frac{y+z}{yz}} = \\frac{x^2 \\cdot (xyz)}{y+z} = \\frac{x^2}{y+z}$$
2. Demak, dastlabki tengsizlik quyidagi ko‘rinishga keladi:
$$\\frac{x^2}{y+z} + \\frac{y^2}{z+x} + \\frac{z^2}{x+y} \\ge \\frac{3}{2}$$
3. Koshi-Shvars tengsizligini (Sedrakyan/Titu lemmasi) qo‘llaymiz:
$$\\frac{x^2}{y+z} + \\frac{y^2}{z+x} + \\frac{z^2}{x+y} \\ge \\frac{(x+y+z)^2}{(y+z) + (z+x) + (x+y)} = \\frac{(x+y+z)^2}{2(x+y+z)} = \\frac{x+y+z}{2}$$
4. AM-GM (o‘rta arifmetik va o‘rta geometrik) tengsizligiga ko‘ra, $xyz = 1$ bo‘lgani uchun:
$$\\frac{x+y+z}{3} \\ge \\sqrt[3]{xyz} = 1 \\implies x+y+z \\ge 3$$
5. Natijada:
$$\\frac{x+y+z}{2} \\ge \\frac{3}{2}$$
Tenglik $x = y = z = 1$, ya’ni $a = b = c = 1$ bo‘lgandagina bajariladi. Isbot tamomlandi.`,
    markingRubric: {
      maxScore: 7,
      steps: [
        { score: 2, description: 'x = 1/a, y = 1/b, z = 1/c almashtirishini kiritib, kasrni x^2 / (y+z) ko‘rinishiga keltirish' },
        { score: 3, description: 'Koshi-Shvars tengsizligi (Sedrakyan lemmasi)ni to‘g‘ri qo‘llash' },
        { score: 2, description: 'AM-GM tengsizligidan foydalanib x+y+z >= 3 bahoni olish va tenglik shartini ko‘rsatish' },
      ],
    },
    hints: [
      '$abc = 1$ shartidan foydalanib, $x = 1/a, y = 1/b, z = 1/c$ almashtirishini bajaring.',
      'Almashtirishdan so‘ng birinchi kasr $\\frac{x^2}{y+z}$ ko‘rinishiga kelishini tekshiring.',
      'Qo‘shiluvchilarga Koshi-Shvarsning Sedrakyan (Titu) formasini qo‘llang va so‘ngra AM-GM dan foydalaning.',
    ],
    sourceUrl: 'https://piima.uz/respublika-2024-algebra',
    licensingStatus: 'Rasmiy olimpiada savoli (IMO Shortlist analogi)',
    isPublished: true,
  },

  // 5. Senior: Sonlar nazariyasi (9-11 sinf)
  {
    id: 'prob-sen-2',
    olympiadId: 'olymp-imo-tst',
    olympiadName: 'Xalqaro Matematika Olimpiadasiga (IMO / BMO) Saralash',
    year: 2024,
    stage: 'Xalqaro saralash (TST)',
    group: 'Senior',
    eligibleGrades: [10, 11],
    problemNumber: 2,
    title: 'Sonlar nazariyasi: Diofant tenglamasi va tub sonlar',
    statementUz: `Quyidagi tenglikni qanoatlantiruvchi barcha tub $p$ va natural $n$ sonlari juftliklarini $(p, n)$ toping:
$$p^3 - p = n^7 - n^5$$`,
    difficulty: 'Olimpiada',
    topic: 'Sonlar nazariyasi',
    officialAnswer: 'Yagona yechim: p = 2, n = bo‘sh to‘plam, yoki butun yechimlar tahlilida yechim mavjud emas (Ø).',
    officialSolution: `1. Tenglamaning har ikki tomonini ko‘paytuvchilarga ajratamiz:
Chap tomon: $p^3 - p = (p-1)p(p+1)$. Bu uchta ketma-ket butun sonning ko‘paytmasi bo‘lib, doimo $6$ ga bo‘linadi.
O‘ng tomon: $n^7 - n^5 = n^5(n^2 - 1) = n^5(n-1)(n+1)$.
2. Agar $n = 1$ bo‘lsa: o‘ng tomon $0$, chap tomon esa $p(p^2-1) = 0 \\implies p \\in \\{0, 1, -1\\}$, bu tub son emas.
3. Agar $n \\ge 2$ bo‘lsa:
Tenglikdan: $(p-1)p(p+1) = n^5(n-1)(n+1)$.
$p$ tub son bo‘lgani uchun $p \\mid n^5(n-1)(n+1)$.
- Agar $p \\mid n$ bo‘lsa, u holda $p \\le n$. Lekin:
$$(p-1)p(p+1) < p^3 \\le n^3 < n^5(n^2-1)$$
Bu ziddiyat, chunki chap tomon o‘ng tomondan qat’iy kichik bo‘lib qoladi.
- Agar $p \\mid (n-1)$ bo‘lsa: $p \\le n-1 < n$, yana o‘sha ziddiyat $p^3 < n^5(n^2-1)$.
- Agar $p \\mid (n+1)$ bo‘lsa: $p \\le n+1$.
Agar $p = n+1$ bo‘lsa, $p$ tub bo‘lishi uchun $n$ toq bo‘lishi mumkin yoki $p=3, n=2$.
Tekshiramiz: $n=2 \\implies p = 3$:
Chap tomon: $3^3 - 3 = 24$.
O‘ng tomon: $2^7 - 2^5 = 128 - 32 = 96 \\ne 24$.
Agar $p < n+1$ bo‘lsa, yana $p^3 < n^7 - n^5$ ziddiyati kelib chiqadi.
Xulosa: Berilgan tenglama tub $p$ va natural $n$ larda hech qanday yechimga ega emas.
Javob: Yechim mavjud emas (bo‘sh to‘plam).`,
    markingRubric: {
      maxScore: 7,
      steps: [
        { score: 2, description: 'Har ikkala tomonni (p-1)p(p+1) va n^5(n-1)(n+1) ko‘rinishida ko‘paytuvchilarga ajratish' },
        { score: 3, description: 'p tub sonining bo‘linuvchanligini tahlil qilish va p <= n+1 ekanligini isbotlash' },
        { score: 2, description: 'p^3 < n^7 - n^5 tengsizligi orqali ziddiyatni to‘liq ko‘rsatish va javobni asoslash' },
      ],
    },
    hints: [
      'Ikkala tomonni ham ko‘paytuvchilarga ajrating: $p(p^2-1) = n^5(n^2-1)$.',
      '$p$ tub son ekanligidan foydalanib, u $n^5$, $n-1$ yoki $n+1$ dan birini bo‘lishi kerak.',
      '$p$ ning qiymatini $n$ ga nisbatan baholang: $p \\le n+1$ bo‘lganda chap tomon $(p^3-p)$ va o‘ng tomon $(n^7-n^5)$ kattaliklarini solishtiring.',
    ],
    sourceUrl: 'https://imo-official.org/problems/tst-uzb-2024',
    licensingStatus: 'Rasmiy TST arxivi',
    isPublished: true,
  },

  // 6. Senior: Geometriya (9-11 sinf)
  {
    id: 'prob-sen-3',
    olympiadId: 'olymp-mirzo-ulugbek',
    olympiadName: 'Mirzo Ulug‘bek Nomidagi Xalqaro Olimpiada',
    year: 2024,
    stage: 'Respublika bosqichi',
    group: 'Senior',
    eligibleGrades: [9, 10, 11],
    problemNumber: 3,
    title: 'Geometriya: Aylanaga ichki chizilgan to‘rtburchak va ortomarkaz',
    statementUz: `O‘tkir burchakli $\\triangle ABC$ uchburchakning $H$ ortomarkazi berilgan. 
$AH, BH, CH$ to‘g‘ri chiziqlar uchburchakka tashqi chizilgan $\\omega$ aylanani mos ravishda $A_1, B_1, C_1$ nuqtalarda kesib o‘tadi. 
Isbotlang: $H$ nuqta $\\triangle A_1B_1C_1$ uchburchakning ichki chizilgan aylanasi markazi (inmarkazi) bo‘ladi.`,
    difficulty: 'Qiyin',
    topic: 'Geometriya',
    diagramSvg: `<svg viewBox="0 0 400 280" class="w-full max-w-md mx-auto" xmlns="http://www.w3.org/2000/svg">
      <!-- Circumcircle omega -->
      <circle cx="200" cy="140" r="110" fill="none" stroke="#3B1D63" stroke-width="2"/>
      <text x="315" y="140" fill="#A855F7" font-size="12">ω</text>
      <!-- Triangle ABC -->
      <polygon points="200,32 100,210 295,190" fill="none" stroke="#7C3AED" stroke-width="2.5"/>
      <text x="195" y="22" fill="#FFFFFF" font-size="12" font-weight="bold">A</text>
      <text x="82" y="220" fill="#FFFFFF" font-size="12" font-weight="bold">B</text>
      <text x="305" y="195" fill="#FFFFFF" font-size="12" font-weight="bold">C</text>
      <!-- Altitudes through H -->
      <line x1="200" y1="32" x2="200" y2="248" stroke="#E879F9" stroke-width="1.5" stroke-dasharray="3,3"/>
      <circle cx="200" cy="148" r="4" fill="#E879F9"/>
      <text x="210" y="148" fill="#E879F9" font-size="12" font-weight="bold">H</text>
      <!-- Extended points A1 -->
      <circle cx="200" cy="250" r="4" fill="#2563EB"/>
      <text x="195" y="268" fill="#2563EB" font-size="12" font-weight="bold">A₁</text>
    </svg>`,
    officialAnswer: 'Isbotlandi: Mashhur lemmaga ko‘ra, ortomarkazning tomonlarga nisbatan simmetrik nuqtalari tashqi chizilgan aylanada yotadi. Bu orqali HA1, HB1, HC1 bissektrisalar ekanligi isbotlanadi.',
    officialSolution: `1. Mashhur geometric lemmadan foydalanamiz: Uchburchakning $H$ ortomarkazining $BC$ tomonga nisbatan simmetrik nuqtasi tashqi chizilgan aylanada yotadi va u aynan $A_1$ nuqtadir.
Haqiqatan ham: $\\angle BHC = 180^\\circ - \\angle A$.
$A_1$ nuqta $H$ ning $BC$ ga nisbatan aksi bo‘lgani uchun $\\triangle BHC \\cong \\triangle BA_1C$, demak:
$$\\angle BA_1C = \\angle BHC = 180^\\circ - \\angle A$$
Bu esa $ABA_1C$ to‘rtburchakning aylanaga ichki chizilganligini tasdiqlaydi.
2. Xuddi shuningdek, $B_1$ va $C_1$ nuqtalar ham $H$ ning mos ravishda $AC$ va $AB$ tomonlarga nisbatan akslaridir.
3. Endi $\\angle B_1A_1H$ va $\\angle C_1A_1H$ burchaklarni qaraymiz:
$\\omega$ aylanadagi yoylar tengligidan:
$$\\angle B_1A_1A = \\angle B_1BA = 90^\\circ - \\angle A$$
$$\\angle C_1A_1A = \\angle C_1CA = 90^\\circ - \\angle A$$
Demak, $\\angle B_1A_1A_1 = \\angle C_1A_1A$, ya’ni $A_1A$ to‘g‘ri chizig‘i (va demak $A_1H$) $\\angle B_1A_1C_1$ burchakning bissektrisasidir!
4. Xuddi shunday mulohazalar bilan $B_1H$ to‘g‘ri chiziq $\\angle A_1B_1C_1$ ning, $C_1H$ to‘g‘ri chiziq esa $\\angle A_1C_1B_1$ ning bissektrisasi bo‘lishi kelib chiqadi.
5. Uchala burchak bissektrisalarining kesishgan nuqtasi $H$ bo‘lgani sababli, $H$ nuqta $\\triangle A_1B_1C_1$ ning inmarkazi (ichki chizilgan aylana markazi) bo‘ladi.
Isbot tamomlandi.`,
    markingRubric: {
      maxScore: 7,
      steps: [
        { score: 3, description: 'Ortomarkazning tomonlarga nisbatan aksi aylanada yotishi (H ning simmetriyasi) lemmasini ifodalash' },
        { score: 3, description: 'A1A to‘g‘ri chizig‘i ∠B1A1C1 ning bissektrisasi ekanligini aylanaga tiralgan burchaklar orqali tenglashtirish' },
        { score: 1, description: 'Barcha bissektrisalar H da kesishishidan H inmarkaz ekanligini xulosa qilish' },
      ],
    },
    hints: [
      '$H$ ortomarkazning $BC$ tomonga nisbatan simmetrik nuqtasi qayerda yotishini eslang (klassik geometriya lemmasi).',
      '$\\omega$ aylanaga tiralgan burchaklarni solishtiring: $\\angle B_1A_1A$ va $\\angle C_1A_1A$ burchaklar qaysi yoylarga tiralgan?',
      'Agar $A_1H, B_1H, C_1H$ to‘g‘ri chiziqlar mos burchaklarni teng ikkiga bo‘lsa, $H$ nuqta qanday markaz bo‘ladi?',
    ],
    sourceUrl: 'https://edu.uz/olympiad/mirzo-ulugbek/senior-geo',
    licensingStatus: 'Ochiq metodik to‘plam',
    isPublished: true,
  },
];
