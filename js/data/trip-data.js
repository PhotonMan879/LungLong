export const DEFAULT_TRIP_TEMPLATE = {
  info: {
    title: "Kansai Trip 2026",
    traveler: "Awirut Som",
    base: "Shin-Osaka Base",
    window: "20-26 พฤศจิกายน 2026",
    flightOut: "JL728 BKK -> KIX",
    flightBack: "JL727 KIX -> BKK",
    railPass: "JR Kansai Wide Area Pass 5 วัน",
    startDate: "2026-11-20"
  },
  days: [
    { id: 1, date: "ศุกร์ 20 พ.ย.", city: "Osaka", pass: false, theme: "Arrival day + Minoo + Umeda + Shinsekai", color: "#b8342f", activities: [
      { id: "d1-a1", time: "08:10", icon: "🛬", title: "ถึงสนามบิน KIX", desc: "ผ่าน immigration, รับกระเป๋า, เตรียมพร้อมเริ่มทริป", tags: ["arrival"] },
      { id: "d1-a2", time: "08:30", icon: "📱", title: "เปิด eSIM + ซื้อ ICOCA", desc: "เตรียม data และบัตรเดินทางสำหรับวันแรก", tags: ["setup", "transport"] },
      { id: "d1-a3", time: "09:00", icon: "🚄", title: "Haruka ไป Shin-Osaka", desc: "ยังไม่เปิด pass ใช้ตั๋ว HARUKA หรือ ICOCA", tags: ["transport"] },
      { id: "d1-a4", time: "10:30", icon: "🍁", title: "น้ำตกมิโนะ + วัดคัตสึโอจิ", desc: "เดินเที่ยวใบไม้แดง กิน momiji tempura และชมวัด daruma", tags: ["highlight", "nature"] },
      { id: "d1-a5", time: "15:30", icon: "🌇", title: "Umeda Sky Building", desc: "ขึ้นจุดชมวิว 360 องศาช่วง sunset", tags: ["view"] },
      { id: "d1-a6", time: "18:00", icon: "🍢", title: "Shinsekai + Kushikatsu", desc: "ปิดวันแรกด้วยบรรยากาศ retro และของกินโอซาก้า", tags: ["food"] }
    ]},
    { id: 2, date: "เสาร์ 21 พ.ย.", city: "Himeji / Kobe", pass: true, theme: "เปิด pass + Himeji + Kobe full day", color: "#3d6ec9", activities: [
      { id: "d2-a1", time: "08:00", icon: "🎫", title: "เปิดใช้ JR Pass", desc: "แลก e-ticket และจอง reserved seat สำหรับวันใช้งานจริง", tags: ["pass"] },
      { id: "d2-a2", time: "08:30", icon: "🚄", title: "Shin-Osaka -> Himeji", desc: "นั่ง Hikari หรือ Kodama ไปปราสาทฮิเมจิ", tags: ["transport"] },
      { id: "d2-a3", time: "09:30", icon: "🏯", title: "Himeji Castle + Koko-en", desc: "ถ่ายรูปปราสาทนกกระสาและเดินสวนญี่ปุ่น", tags: ["highlight", "culture"] },
      { id: "d2-a4", time: "12:30", icon: "🥩", title: "เที่ยว Kobe เต็มช่วงบ่าย", desc: "Kitano, Kobe Beef, Chinatown และ Harborland", tags: ["highlight", "food"] }
    ]},
    { id: 3, date: "อาทิตย์ 22 พ.ย.", city: "Okayama / Kurashiki", pass: true, theme: "Okayama + Kurashiki day trip", color: "#259a61", activities: [
      { id: "d3-a1", time: "08:30", icon: "🚄", title: "Shin-Osaka -> Okayama", desc: "ใช้ pass ให้คุ้มด้วย shinkansen ไป-กลับ", tags: ["transport"] },
      { id: "d3-a2", time: "09:30", icon: "🌿", title: "Korakuen Garden", desc: "เดินสวนระดับ top 3 ของญี่ปุ่นและดูวิวปราสาท Okayama", tags: ["nature"] },
      { id: "d3-a3", time: "11:30", icon: "🍑", title: "กลางวันแบบ Okayama", desc: "ลอง demi-katsu don และผลไม้ท้องถิ่น", tags: ["food"] },
      { id: "d3-a4", time: "13:30", icon: "🏚️", title: "Kurashiki Bikan District", desc: "เดินเมืองเก่าริมคลอง แวะพิพิธภัณฑ์หรือชอปยีนส์ Kojima", tags: ["highlight", "culture"] }
    ]},
    { id: 4, date: "จันทร์ 23 พ.ย.", city: "Kyoto", pass: true, theme: "Kyoto highlights from west to east", color: "#8a45b0", activities: [
      { id: "d4-a1", time: "08:00", icon: "🚃", title: "JR ไป Kyoto", desc: "ใช้ JR Special Rapid แทน shinkansen ช่วงนี้", tags: ["transport"] },
      { id: "d4-a2", time: "08:45", icon: "🎋", title: "Arashiyama", desc: "Bamboo Grove, Togetsukyo และวัด Tenryu-ji", tags: ["highlight", "nature"] },
      { id: "d4-a3", time: "13:00", icon: "⛩️", title: "Fushimi Inari", desc: "เดินผ่าน torii หลายพันต้น เลือกขึ้นครึ่งทางหรือเต็มทาง", tags: ["culture"] },
      { id: "d4-a4", time: "15:30", icon: "🏯", title: "Kiyomizudera + ถนนเก่า", desc: "Ninenzaka, Sannenzaka และ light-up ตอนค่ำ", tags: ["highlight", "shopping"] },
      { id: "d4-a5", time: "18:30", icon: "🍜", title: "Nishiki Market + Teramachi", desc: "หาอาหารเย็นและซื้อของฝากเกียวโต", tags: ["food", "shopping"] }
    ]},
    { id: 5, date: "อังคาร 24 พ.ย.", city: "Nara / Uji / Osaka", pass: true, theme: "Nara deer + Uji matcha + Osaka night", color: "#db7c21", activities: [
      { id: "d5-a1", time: "08:00", icon: "🚃", title: "ไป Nara ตอนเช้า", desc: "ต่อ JR Yamatoji Rapid แบบใช้ pass ได้เต็มทาง", tags: ["transport"] },
      { id: "d5-a2", time: "09:00", icon: "🦌", title: "Nara Park + Todai-ji", desc: "เจอกวาง ซื้อ shika senbei และแวะศาลเจ้าใกล้ๆ", tags: ["highlight", "culture"] },
      { id: "d5-a3", time: "13:00", icon: "🍵", title: "Uji เมืองมัทฉะ", desc: "Byodoin, Omotesando และร้านมัทฉะระดับตำนาน", tags: ["highlight", "food"] },
      { id: "d5-a4", time: "15:30", icon: "🦁", title: "Namba Yasaka Shrine", desc: "แวะถ่ายรูปศาลเจ้าหัวสิงโตยักษ์", tags: ["photo", "culture"] },
      { id: "d5-a5", time: "16:00", icon: "🛍️", title: "Shinsaibashi + Namba", desc: "ชอป Uniqlo, Donki, depachika และโซนสตรีท", tags: ["shopping"] },
      { id: "d5-a6", time: "20:00", icon: "🍢", title: "Dotonbori dinner", desc: "ทาโกยากิ โอโคโนมิยากิ และป้าย Glico ตอนกลางคืน", tags: ["food", "highlight"] }
    ]},
    { id: 6, date: "พุธ 25 พ.ย.", city: "Kinosaki / KIX", pass: true, theme: "Long day trip + airport transfer", color: "#178d82", activities: [
      { id: "d6-a1", time: "08:00", icon: "🧳", title: "ฝากกระเป๋าแล้วออกทริป", desc: "ฝากที่โรงแรมหรือล็อกเกอร์ก่อนออกเดินทางไกล", tags: ["logistics"] },
      { id: "d6-a2", time: "08:30", icon: "♨️", title: "Kinosaki Onsen", desc: "day trip ออนเซ็น, yukata, crab season และ pass ใช้คุ้มมาก", tags: ["highlight", "onsen"] },
      { id: "d6-a3", time: "19:00", icon: "🌙", title: "กลับ Shin-Osaka รับกระเป๋า", desc: "เผื่อเวลาเดินทางกลับและหยิบของก่อนเข้า KIX", tags: ["logistics"] },
      { id: "d6-a4", time: "20:00", icon: "🚄", title: "Haruka ไป KIX", desc: "เช็กขบวนสุดท้ายและสำรองเวลาไว้เผื่อ delay", tags: ["transport"] },
      { id: "d6-a5", time: "21:00", icon: "🛍️", title: "Duty Free ที่สนามบิน", desc: "เก็บของฝากและชอปปิดท้ายก่อนขึ้นเครื่อง", tags: ["shopping"] }
    ]},
    { id: 7, date: "พฤหัส 26 พ.ย.", city: "KIX / BKK", pass: false, theme: "Flight home", color: "#7a8898", activities: [
      { id: "d7-a1", time: "00:45", icon: "🛫", title: "KIX -> BKK", desc: "กลับไทยด้วย JL727 และจบทริปคันไซ", tags: ["flight", "highlight"] }
    ]}
  ],
  backupRegions: [
    { region: "Osaka เติมวันเบาๆ", spots: [
      { id: "bk-os-1", name: "Osaka Aquarium Kaiyukan", cat: "สนุก", cost: "¥2,700", time: "2-3 ชม.", pass: "ICOCA", indoor: true, desc: "พิพิธภัณฑ์สัตว์น้ำระดับ flagship ของโอซาก้า" },
      { id: "bk-os-2", name: "Abeno Harukas", cat: "วิว", cost: "¥1,500", time: "1 ชม.", pass: "JR ถึง Tennoji", indoor: true, desc: "วิวสูงคนละมุมกับ Umeda เหมาะกับ sunset หรือกลางคืน" },
      { id: "bk-os-3", name: "Asahi Beer Museum", cat: "กินดื่ม", cost: "ฟรี", time: "1.5 ชม.", pass: "ใช้ pass ได้", indoor: true, desc: "ทัวร์โรงเบียร์และชิมสด เหมาะกับวันชิล" }
    ]},
    { region: "Kyoto เพิ่มเติม", spots: [
      { id: "bk-ky-1", name: "Tofuku-ji", cat: "ธรรมชาติ", cost: "¥600", time: "1 ชม.", pass: "JR ได้", indoor: false, desc: "จุดชมใบไม้แดงสายฮาร์ดคอร์ใกล้ Fushimi Inari" },
      { id: "bk-ky-2", name: "Gion ยามเย็น", cat: "วัฒนธรรม", cost: "ฟรี", time: "1-2 ชม.", pass: "เดินหรือใช้ ICOCA", indoor: false, desc: "โซนถ่ายรูปสวยตอนฟ้าเริ่มมืด" },
      { id: "bk-ky-3", name: "Sagano Scenic Railway", cat: "วิว", cost: "¥880", time: "25 นาที", pass: "ตั๋วแยก", indoor: false, desc: "รถไฟชมวิวสำหรับฤดูใบไม้แดง" }
    ]}
  ],
  defaultChecklist: [
    { id: "cl-sim-1", cat: "Internet", text: "ซื้อ eSIM หรือ data plan ให้พร้อมก่อนออกเดินทาง" },
    { id: "cl-sim-2", cat: "Internet", text: "ดาวน์โหลด Google Maps และ Google Translate แบบ offline" },
    { id: "cl-tk-1", cat: "Tickets", text: "ซื้อ JR Kansai Wide Area Pass และเก็บ e-voucher" },
    { id: "cl-tk-2", cat: "Tickets", text: "ตรวจว่าตั๋ว JAL ขาไปและขากลับอยู่ในเครื่องเรียบร้อย" },
    { id: "cl-doc-1", cat: "Documents", text: "กรอก Visit Japan Web และเตรียม passport ให้พร้อม" }
  ],
  defaultPacking: [
    { id: "pk-14-1", phase: "T-14", cat: "Documents", text: "เช็ก passport, e-ticket, hotel booking และประกันเดินทางให้ครบ" },
    { id: "pk-14-2", phase: "T-14", cat: "Money", text: "แลกเงินเยนก้อนแรก และเตรียมบัตรที่ใช้ต่างประเทศได้" },
    { id: "pk-7-1", phase: "T-7", cat: "Internet", text: "เปิด eSIM, โหลดแผนที่ offline และปักหมุดจุดสำคัญใน Google Maps" },
    { id: "pk-7-2", phase: "T-7", cat: "Health", text: "เตรียมยา personal, พลาสเตอร์, หน้ากาก และเอกสารแพ้ยา" },
    { id: "pk-2-1", phase: "T-2", cat: "Packing", text: "แพ็กเสื้อผ้า, adaptor, power bank, สายชาร์จ และรองเท้าเดิน" },
    { id: "pk-2-2", phase: "T-2", cat: "Airport", text: "เช็กวิธีไปสนามบิน, เวลาเช็กอิน, และโหลด boarding app ให้พร้อม" },
    { id: "pk-0-1", phase: "Day Of", cat: "Documents", text: "พก passport, wallet, มือถือ, power bank และเอกสารขึ้นเครื่องไว้ในกระเป๋าหยิบง่าย" },
    { id: "pk-0-2", phase: "Day Of", cat: "Airport", text: "ออกจากบ้านเผื่อเวลา, เช็กเกต/เทอร์มินัลอีกครั้ง, และกินข้าวก่อนขึ้นเครื่อง" }
  ],
  japaneseScripts: [
    { cat: "สนามบิน / JR", items: [
      { title: "แลก JR Pass", jp: "JRパスの引き換えをお願いします。これが引換証です。", reading: "เจอาร์พาสึ โนะ ฮิคิคาเอะ โอ เนไกชิมัส", th: "ขอแลก JR Pass ครับ นี่คือ voucher" },
      { title: "ซื้อ ICOCA", jp: "ICOCAカードを1枚ください。", reading: "ICOCA kaado wo ichimai kudasai", th: "ขอ ICOCA card 1 ใบครับ" }
    ]}
  ],
  defaultBudgetPlan: { 1: 8000, 2: 9000, 3: 10000, 4: 7000, 5: 9000, 6: 8000, 7: 2000 },
  defaultRoutes: [
    { dayId: 1, city: "Osaka", legs: [
      { from: "KIX", to: "Shin-Osaka", line: "Haruka Express", icon: "🚄", durationMin: 80, passOk: false, tip: "ซื้อตั๋ว HARUKA ล่วงหน้าหรือที่เครื่อง — ยังไม่ใช้ JR Pass วันนี้", transitUrl: "https://www.google.com/maps/dir/Kansai+Airport/Shin-Osaka?travelmode=transit" },
      { from: "Shin-Osaka", to: "Minoo (Minoh)", line: "Osaka Metro + Hankyu", icon: "🚃", durationMin: 40, passOk: false, tip: "ลง Osaka Metro สาย Midosuji ถึง Umeda แล้วต่อ Hankyu Mino Line ถึง Minoh", transitUrl: "https://www.google.com/maps/dir/Shin-Osaka/Minoh+Park?travelmode=transit" },
      { from: "Minoo", to: "Umeda Sky Building", line: "Hankyu → เดิน", icon: "🚶", durationMin: 15, passOk: false, tip: "จาก Umeda Station เดินประมาณ 10-15 นาที", transitUrl: "https://www.google.com/maps/dir/Minoh/Umeda+Sky+Building?travelmode=transit" },
      { from: "Umeda", to: "Shinsekai", line: "Osaka Metro Midosuji", icon: "🚇", durationMin: 20, passOk: false, tip: "ลง Dobutsuen-mae แล้วเดิน 5 นาทีไป Shinsekai", transitUrl: "https://www.google.com/maps/dir/Umeda/Shinsekai+Osaka?travelmode=transit" }
    ]},
    { dayId: 2, city: "Himeji / Kobe", legs: [
      { from: "Shin-Osaka", to: "Himeji", line: "Shinkansen Hikari/Kodama", icon: "🚄", durationMin: 35, passOk: true, tip: "เปิดใช้ JR Pass วันนี้ — จอง reserved seat ล่วงหน้าแนะนำ", transitUrl: "https://www.google.com/maps/dir/Shin-Osaka/Himeji+Station?travelmode=transit" },
      { from: "Himeji", to: "Shin-Kobe", line: "Shinkansen", icon: "🚄", durationMin: 15, passOk: true, tip: "ใช้ pass ได้ สั้นมาก แต่จาก Shin-Kobe ต้องเดินหรือต่อ subway ลงเมือง", transitUrl: "https://www.google.com/maps/dir/Himeji/Shin-Kobe?travelmode=transit" },
      { from: "Shin-Kobe → Kobe City", to: "Shin-Osaka", line: "Shinkansen กลับ", icon: "🚄", durationMin: 15, passOk: true, tip: "เดินทางกลับช่วงค่ำ เช็กขบวนสุดท้ายจาก Shin-Kobe ก่อนเที่ยวดึก", transitUrl: "https://www.google.com/maps/dir/Shin-Kobe/Shin-Osaka?travelmode=transit" }
    ]},
    { dayId: 3, city: "Okayama / Kurashiki", legs: [
      { from: "Shin-Osaka", to: "Okayama", line: "Shinkansen Hikari/Nozomi", icon: "🚄", durationMin: 45, passOk: true, tip: "Nozomi เร็วกว่าแต่ JR Pass ใช้ไม่ได้ — ใช้ Hikari แทน", transitUrl: "https://www.google.com/maps/dir/Shin-Osaka/Okayama+Station?travelmode=transit" },
      { from: "Okayama", to: "Kurashiki", line: "JR Sanyo Line (Local)", icon: "🚃", durationMin: 18, passOk: true, tip: "รถธรรมดา 2 ป้าย ใช้ JR Pass ได้ — เที่ยวบ่ายก่อนกลับ", transitUrl: "https://www.google.com/maps/dir/Okayama/Kurashiki+Station?travelmode=transit" },
      { from: "Kurashiki / Okayama", to: "Shin-Osaka", line: "Shinkansen Hikari", icon: "🚄", durationMin: 50, passOk: true, tip: "กลับช่วงเย็น อย่าลืมเปรียบ Hikari กับ Kodama (ช้ากว่าแต่มีที่นั่งมากกว่า)", transitUrl: "https://www.google.com/maps/dir/Okayama/Shin-Osaka?travelmode=transit" }
    ]},
    { dayId: 4, city: "Kyoto", legs: [
      { from: "Shin-Osaka", to: "Kyoto", line: "JR Special Rapid", icon: "🚃", durationMin: 15, passOk: true, tip: "ไม่ต้องใช้ Shinkansen — JR Special Rapid ถึง Kyoto Station เร็วพอและฟรีกับ pass", transitUrl: "https://www.google.com/maps/dir/Shin-Osaka/Kyoto+Station?travelmode=transit" },
      { from: "Kyoto Station", to: "Arashiyama", line: "JR Sagano Line", icon: "🚃", durationMin: 25, passOk: true, tip: "ลงที่ Saga-Arashiyama — ใช้ pass JR ได้ตลอด", transitUrl: "https://www.google.com/maps/dir/Kyoto+Station/Arashiyama?travelmode=transit" },
      { from: "Arashiyama", to: "Fushimi Inari", line: "JR Sagano → JR Nara Line", icon: "🚃", durationMin: 35, passOk: true, tip: "กลับ Kyoto แล้วต่อ JR Nara Line ลง Inari Station — ตรงหน้าทางเข้าเลย", transitUrl: "https://www.google.com/maps/dir/Arashiyama/Fushimi+Inari+Shrine?travelmode=transit" },
      { from: "Fushimi Inari", to: "Kiyomizudera", line: "Bus 207 / Keihan + เดิน", icon: "🚌", durationMin: 30, passOk: false, tip: "ใช้ ICOCA ขึ้น bus หรือ Keihan สาย Kiyomizu-Gojo แล้วเดินขึ้นเขา", transitUrl: "https://www.google.com/maps/dir/Fushimi+Inari/Kiyomizudera?travelmode=transit" }
    ]},
    { dayId: 5, city: "Nara / Uji / Osaka", legs: [
      { from: "Shin-Osaka", to: "Nara", line: "JR Yamatoji Rapid", icon: "🚃", durationMin: 40, passOk: true, tip: "ใช้ JR Pass ได้ตลอด — ลงที่ Nara Station แล้วเดินไป Nara Park ประมาณ 10 นาที", transitUrl: "https://www.google.com/maps/dir/Shin-Osaka/Nara+Station?travelmode=transit" },
      { from: "Nara", to: "Uji", line: "JR Yamatoji → JR Nara Line", icon: "🚃", durationMin: 55, passOk: true, tip: "เปลี่ยน train ที่ Nara Station ไป Uji — ใช้ pass ได้ตลอด", transitUrl: "https://www.google.com/maps/dir/Nara/Uji+Station?travelmode=transit" },
      { from: "Uji", to: "Osaka Namba", line: "Kintetsu Kyoto Line", icon: "🚃", durationMin: 50, passOk: false, tip: "Kintetsu ไม่รับ JR Pass — ใช้ ICOCA แทน, ออกที่ Osaka Namba", transitUrl: "https://www.google.com/maps/dir/Uji/Namba+Osaka?travelmode=transit" }
    ]},
    { dayId: 6, city: "Kinosaki / KIX", legs: [
      { from: "Shin-Osaka", to: "Kinosaki Onsen", line: "Limited Express Kounotori", icon: "🚄", durationMin: 150, passOk: true, tip: "ต้องจอง reserved seat (ฟรีกับ pass) — เช็กขบวนแรกตอนเช้าล่วงหน้า", transitUrl: "https://www.google.com/maps/dir/Shin-Osaka/Kinosaki+Onsen?travelmode=transit" },
      { from: "Kinosaki Onsen", to: "Shin-Osaka", line: "Limited Express Kounotori", icon: "🚄", durationMin: 150, passOk: true, tip: "เช็กขบวนสุดท้ายก่อนออกจาก onsen — ต้องถึง Shin-Osaka ก่อน 20:00", transitUrl: "https://www.google.com/maps/dir/Kinosaki+Onsen/Shin-Osaka?travelmode=transit" },
      { from: "Shin-Osaka", to: "KIX", line: "Haruka Express", icon: "🚄", durationMin: 80, passOk: true, tip: "ใช้ JR Pass ได้วันสุดท้าย — เผื่อเวลา 30 นาทีก่อน check-in", transitUrl: "https://www.google.com/maps/dir/Shin-Osaka/Kansai+Airport?travelmode=transit" }
    ]},
    { dayId: 7, city: "KIX / BKK", legs: [
      { from: "KIX", to: "BKK (Suvarnabhumi)", line: "JAL 727", icon: "🛫", durationMin: 360, passOk: false, tip: "เช็กอินก่อน 2 ชั่วโมง — ปิด JR Pass วันนี้และคืน ICOCA ที่เหลือ", transitUrl: "https://www.google.com/maps/dir/Kansai+Airport/Suvarnabhumi+Airport?travelmode=transit" }
    ]}
  ],
  recommendedPlaces: [
    // ── OSAKA ──────────────────────────────────────────────
    { id: "rec-os-1",  name: "Dotonbori",                    lat: 34.6687, lng: 135.5021, category: "food",     desc: "ถนนอาหารและ neon light สุดฮิตของโอซาก้า — กุ้งยักษ์ Kani Doraku, Ichiran Ramen, ป้าย Glico ไฟสวยกลางคืน",   estimatedTime: "2 ชม.",    tags: ["มีชื่อ", "กลางคืนสวย", "กินอร่อย"] },
    { id: "rec-os-2",  name: "Kuromon Ichiba Market",         lat: 34.6654, lng: 135.5073, category: "food",     desc: "ตลาดสดใจกลาง Osaka ที่ขายอาหารทะเลสด ชิมได้ทันที — เปิดเช้ามืด ปลาหมึกย่าง หอยนางรม ทาโกยากิ",               estimatedTime: "1.5 ชม.", tags: ["ตลาด", "อาหารทะเล", "เช้า"] },
    { id: "rec-os-3",  name: "Shinsekai & Tsutenkaku",        lat: 34.6525, lng: 135.5061, category: "culture",  desc: "ย่านย้อนยุคสไตล์โชวะ หอคอย Tsutenkaku วิวเมือง kushikatsu ราคาประหยัด บิลลิเคนรูปปั้นนำโชค",                   estimatedTime: "2 ชม.",    tags: ["ย้อนยุค", "ถ่ายรูป", "ราคาถูก"] },
    { id: "rec-os-4",  name: "Osaka Castle & Park",           lat: 34.6873, lng: 135.5262, category: "culture",  desc: "ปราสาทโอซาก้าสัญลักษณ์ของเมือง สวนรอบข้างสวยมากช่วงใบไม้แดง พิพิธภัณฑ์ประวัติศาสตร์ Toyotomi",               estimatedTime: "2.5 ชม.", tags: ["ประวัติศาสตร์", "ใบไม้แดง", "สวน"] },
    { id: "rec-os-5",  name: "Umeda Sky Building",            lat: 34.7051, lng: 135.4896, category: "view",     desc: "หอคอยดาดฟ้าเปิดโล่ง Floating Garden Observatory วิว 360° วิวกลางคืน Osaka สวยที่สุดในเมือง",                   estimatedTime: "1 ชม.",    tags: ["วิว", "กลางคืน", "โรแมนติก"] },
    { id: "rec-os-6",  name: "Namba Yasaka Shrine",           lat: 34.6610, lng: 135.4966, category: "temple",   desc: "ศาลเจ้าหน้าสิงโตยักษ์ Instagram worthy มากที่สุดใน Osaka เดินได้จาก Namba สะดวกมาก",                           estimatedTime: "30 นาที", tags: ["ศาลเจ้า", "ถ่ายรูป", "ฟรี"] },
    { id: "rec-os-7",  name: "Shinsaibashi Shopping Arcade",  lat: 34.6717, lng: 135.5011, category: "shopping", desc: "อาเคดช้อปปิ้งกลางแจ้งยาว 600 ม. — fashion, cosmetics, Uniqlo, ร้านแบรนด์และ street food",                       estimatedTime: "1.5 ชม.", tags: ["ช้อปปิ้ง", "อาเคด", "cosmetics"] },
    { id: "rec-os-8",  name: "Osaka Aquarium Kaiyukan",       lat: 34.6549, lng: 135.4294, category: "indoor",   desc: "พิพิธภัณฑ์สัตว์น้ำขนาดใหญ่ระดับ flagship ปลาฉลามวาฬ, ray ยักษ์ — เหมาะฝนตกหรือวันพัก",                    estimatedTime: "2.5 ชม.", tags: ["ในร่ม", "สัตว์น้ำ", "ครอบครัว"] },
    { id: "rec-os-9",  name: "Universal Studios Japan (USJ)", lat: 34.6654, lng: 135.4323, category: "indoor",   desc: "สวนสนุก Harry Potter, Super Nintendo World, Jaws — ซื้อ Express Pass ล่วงหน้าสำคัญมาก",                         estimatedTime: "ทั้งวัน",  tags: ["สวนสนุก", "ในร่ม", "ต้องจอง"] },
    { id: "rec-os-10", name: "Minoo Park (Minoh Falls)",       lat: 34.8333, lng: 135.4706, category: "nature",   desc: "น้ำตก Minoo สูง 33 ม. ท่ามกลางป่าใบไม้แดง momiji tempura ชื่อดัง เส้นทางเดิน 2.7 กม.",                        estimatedTime: "2.5 ชม.", tags: ["ธรรมชาติ", "ใบไม้แดง", "เดินป่า"] },
    { id: "rec-os-11", name: "Abeno Harukas (Top of Harukas)", lat: 34.6464, lng: 135.5135, category: "view",    desc: "ตึกสูงที่สุดในญี่ปุ่น 300 ม. วิว 360° มองเห็น Osaka ทั้งเมือง เหมาะ sunset หรือกลางคืน",                      estimatedTime: "1 ชม.",    tags: ["วิว", "ตึกสูง", "กลางคืน"] },
    { id: "rec-os-12", name: "Sumiyoshi Taisha Shrine",        lat: 34.6139, lng: 135.4941, category: "temple",   desc: "ศาลเจ้าเก่าแก่กว่า 1,800 ปี สะพานโค้งสีแดงสวยงาม สถาปัตยกรรม Sumiyoshi-zukuri หายากมาก",                    estimatedTime: "1 ชม.",    tags: ["ศาลเจ้า", "โบราณ", "ฟรี"] },
    { id: "rec-os-13", name: "Den Den Town (Nipponbashi)",      lat: 34.6603, lng: 135.5033, category: "shopping", desc: "ย่านออตาคุ อิเล็กทรอนิกส์ ฟิกเกอร์ มังงะ อนิเมะ cosplay คล้าย Akihabara Tokyo แต่เล็กกว่า",                  estimatedTime: "1.5 ชม.", tags: ["อนิเมะ", "ช้อปปิ้ง", "ออตาคุ"] },
    { id: "rec-os-14", name: "Amerika Mura",                   lat: 34.6697, lng: 135.4993, category: "culture",  desc: "ย่านวัยรุ่น streetwear vintage และ subculture ของ Osaka สัญลักษณ์ Three Stars อยู่กลางย่าน",                   estimatedTime: "1 ชม.",    tags: ["วัยรุ่น", "วินเทจ", "streetwear"] },
    { id: "rec-os-15", name: "Tenjinbashisuji Shopping Street", lat: 34.6930, lng: 135.5093, category: "shopping", desc: "ถนนช้อปปิ้งมีหลังคายาวที่สุดในญี่ปุ่น 2.6 กม. ร้านอาหาร เบเกอรี่ ของชำ ชีวิตชาวบ้าน",                     estimatedTime: "1.5 ชม.", tags: ["ช้อปปิ้ง", "ยาวที่สุด", "ชีวิตจริง"] },
    { id: "rec-os-16", name: "Nakanoshima Park & Roses",       lat: 34.6930, lng: 135.5008, category: "nature",   desc: "เกาะกลางแม่น้ำ Dojima สวนกุหลาบสวยงาม พิพิธภัณฑ์ศิลปะ ตึกเก่าสไตล์ยุโรป เดินเล่นชิล",                        estimatedTime: "1 ชม.",    tags: ["สวน", "กุหลาบ", "ชิล"] },
    { id: "rec-os-17", name: "Tempozan Marketplace & Ferris Wheel", lat: 34.6545, lng: 135.4298, category: "view", desc: "ชิงช้าสวรรค์ยักษ์ริมท่าเรือ Osaka มองเห็น Akashi bridge วันฟ้าดี วิวไปไกลถึง Rokko-san",                  estimatedTime: "1 ชม.",    tags: ["ชิงช้าสวรรค์", "วิว", "ริมน้ำ"] },
    { id: "rec-os-18", name: "Osaka Tenmangu Shrine",          lat: 34.6964, lng: 135.5109, category: "temple",   desc: "ศาลเจ้าเทพเจ้าแห่งการเรียน Tenjin เก่าแก่กว่า 1,350 ปี เทศกาล Tenjin Matsuri ยิ่งใหญ่ที่สุด",               estimatedTime: "45 นาที", tags: ["ศาลเจ้า", "เทนจิน", "ประวัติศาสตร์"] },
    { id: "rec-os-19", name: "Spa World Osaka",                lat: 34.6501, lng: 135.5069, category: "onsen",    desc: "สปาออนเซ็นขนาดใหญ่ ธีมยุโรปและเอเชีย แช่ได้นานทั้งวัน อยู่ใกล้ Shinsekai เปิด 24 ชม.",                       estimatedTime: "3-4 ชม.", tags: ["ออนเซ็น", "สปา", "ในร่ม"] },

    // ── KYOTO ──────────────────────────────────────────────
    { id: "rec-ky-1",  name: "Fushimi Inari Taisha",          lat: 34.9671, lng: 135.7727, category: "temple",   desc: "โทริอิสีแดงพันๆ ต้น ขึ้นภูเขา Inari ใช้เวลาเต็มทาง 2-3 ชม. — เช้าตรู่คนน้อยที่สุด ฟรีตลอด",               estimatedTime: "2-3 ชม.", tags: ["ขึ้นเขา", "โทริอิ", "เช้าดีที่สุด"] },
    { id: "rec-ky-2",  name: "Arashiyama Bamboo Grove",       lat: 35.0169, lng: 135.6710, category: "nature",   desc: "ป่าไผ่ที่สวยที่สุดในญี่ปุ่น — ไปเช้ามากก่อน 8:00 เพื่อหลีกเลี่ยงฝูงชน แสงดีช่วงเช้าสาย",                  estimatedTime: "1.5 ชม.", tags: ["ป่าไผ่", "ธรรมชาติ", "ถ่ายรูป"] },
    { id: "rec-ky-3",  name: "Kinkaku-ji (Golden Pavilion)",  lat: 35.0394, lng: 135.7292, category: "temple",   desc: "วัดทองคำอันเลื่องชื่อ สะท้อนในสระ Kyoko-chi ช่วงหิมะตกในฤดูหนาวสวยที่สุด",                                   estimatedTime: "1 ชม.",    tags: ["วัด", "ทอง", "มีชื่อ"] },
    { id: "rec-ky-4",  name: "Kiyomizudera Temple",           lat: 34.9948, lng: 135.7850, category: "temple",   desc: "วัดบนเนินเขา ระเบียงไม้ลอยฟ้าไม่ใช้ตะปูแม้แต่ตัวเดียว วิว Kyoto ช่วงใบไม้แดงสวยมาก",                        estimatedTime: "2 ชม.",    tags: ["วัด", "ใบไม้แดง", "ขึ้นเขา"] },
    { id: "rec-ky-5",  name: "Nishiki Market",                lat: 35.0050, lng: 135.7649, category: "food",     desc: "'ครัวของ Kyoto' ตลาดแคบยาว 400 ม. ชิม yuba, tsukemono, dashi tamagoyaki, matcha ของฝาก",                    estimatedTime: "1.5 ชม.", tags: ["ตลาด", "ชิม", "ของฝาก"] },
    { id: "rec-ky-6",  name: "Philosopher's Path",            lat: 35.0210, lng: 135.7963, category: "nature",   desc: "ทางเดินริมคลองยาว 2 กม. เชื่อม Nanzen-ji, Ginkaku-ji ร่มรื่น ใบไม้แดงช่วงพฤศจิกายน",                       estimatedTime: "1 ชม.",    tags: ["เดินเล่น", "ธรรมชาติ", "ชิล"] },
    { id: "rec-ky-7",  name: "Gion District (Hanamikoji)",   lat: 35.0037, lng: 135.7750, category: "culture",  desc: "ย่าน Geisha ถนน Hanamikoji ช่วงเย็น 17:00-18:30 โอกาสเจอ Geiko/Maiko เดินบนถนนกรวดเก่า",                    estimatedTime: "1 ชม.",    tags: ["Geisha", "เย็น", "วัฒนธรรม"] },
    { id: "rec-ky-8",  name: "Tenryu-ji Temple & Garden",    lat: 35.0151, lng: 135.6726, category: "temple",   desc: "วัดมรดกโลกใน Arashiyama สวน Zen ที่ออกแบบโดย Muso Soseki มองเห็น Arashiyama เป็นฉากหลัง",                   estimatedTime: "1 ชม.",    tags: ["วัด", "สวน Zen", "มรดกโลก"] },
    { id: "rec-ky-9",  name: "Nijo Castle (Nijo-jo)",        lat: 35.0141, lng: 135.7481, category: "culture",  desc: "ปราสาทโชกุน Tokugawa พื้นไม้ 'นกไนติงเกล' เสียงดัง ป้องกันมือสังหาร สวนญี่ปุ่นสวยงาม",                    estimatedTime: "2 ชม.",    tags: ["ปราสาท", "โชกุน", "ประวัติศาสตร์"] },
    { id: "rec-ky-10", name: "Ginkaku-ji (Silver Pavilion)", lat: 35.0270, lng: 135.7985, category: "temple",   desc: "วัดเงิน Higashiyama สวน Zen ทราย Ginshadan รูปแบบ Kogetsudai ต่างจากทองอย่างสิ้นเชิง",                       estimatedTime: "1 ชม.",    tags: ["วัด", "เงิน", "สวน Zen"] },
    { id: "rec-ky-11", name: "Nanzen-ji Temple",              lat: 35.0116, lng: 135.7932, category: "temple",   desc: "วัดเซนขนาดใหญ่ ท่อน้ำอิฐแดง Suirokaku กลางป่า เป็นฉากหลังถ่ายรูปสุดฮิต เข้าฟรี",                           estimatedTime: "1.5 ชม.", tags: ["วัด", "ท่อน้ำ", "ฟรี"] },
    { id: "rec-ky-12", name: "Ryoan-ji Temple (Rock Garden)", lat: 35.0345, lng: 135.7186, category: "temple",   desc: "สวนหินนิ่งที่โด่งดังที่สุดในโลก 15 ก้อน Karesansui เงียบสงบ ความหมายลึกซึ้ง",                               estimatedTime: "1 ชม.",    tags: ["สวนหิน", "เซน", "นิ่งงัน"] },
    { id: "rec-ky-13", name: "Tofuku-ji Temple",              lat: 34.9754, lng: 135.7723, category: "temple",   desc: "จุดชมใบไม้แดงที่คนญี่ปุ่นรู้กันเอง สะพาน Tsuten-kyo มองทะเลใบไม้แดง อยู่ใกล้ Fushimi Inari",               estimatedTime: "1 ชม.",    tags: ["ใบไม้แดง", "สะพาน", "ซ่อนอยู่"] },
    { id: "rec-ky-14", name: "Heian Shrine",                  lat: 35.0164, lng: 135.7824, category: "temple",   desc: "ศาลเจ้าใหญ่สีแดงอันโอ่อ่า สร้างปี 1895 ฉลอง 1100 ปีของ Kyoto สวนน้ำสวยช่วงใบไม้แดง",                      estimatedTime: "1.5 ชม.", tags: ["ศาลเจ้า", "สีแดง", "สวนน้ำ"] },
    { id: "rec-ky-15", name: "Kyoto Imperial Palace",         lat: 35.0251, lng: 135.7620, category: "culture",  desc: "พระราชวังหลวงอดีตที่ประทับของจักรพรรดิ เดินชมฟรี สวนรอบข้างร่มรื่นมาก",                                     estimatedTime: "1.5 ชม.", tags: ["พระราชวัง", "ฟรี", "สวน"] },
    { id: "rec-ky-16", name: "Pontocho Alley",                lat: 35.0057, lng: 135.7706, category: "food",     desc: "ซอยแคบแบบ Kyoto เต็มไปด้วยร้านอาหารญี่ปุ่น kaiseki ราคาถูก-แพง ยาม 18:00-21:00 บรรยากาศดีมาก",             estimatedTime: "1.5 ชม.", tags: ["ซอยแคบ", "อาหารค่ำ", "บรรยากาศ"] },
    { id: "rec-ky-17", name: "Maruyama Park & Yasaka Shrine", lat: 35.0036, lng: 135.7783, category: "nature",   desc: "สวนรอบ Yasaka Shrine เดินเล่นยามค่ำ ร้านขายของ yatai เปิดตลอด เดินจาก Gion ได้ทันที",                      estimatedTime: "1 ชม.",    tags: ["สวน", "ศาลเจ้า", "ยามค่ำ"] },
    { id: "rec-ky-18", name: "Higashiyama Walking District",  lat: 34.9997, lng: 135.7804, category: "culture",  desc: "ถนนหิน Ninenzaka + Sannenzaka ร้านของฝาก ชา matcha เดินจาก Kiyomizudera ลงมา ใบไม้แดงสวยมาก",              estimatedTime: "1.5 ชม.", tags: ["ถนนหิน", "ของฝาก", "ใบไม้แดง"] },
    { id: "rec-ky-19", name: "Sagano Scenic Railway (Torokko)", lat: 35.0197, lng: 135.6667, category: "nature",  desc: "รถไฟวิวทิวทัศน์ Arashiyama ผ่านหุบเขา Hozu แน่นมาก จองล่วงหน้า! ใบไม้แดงสวยที่สุด",                        estimatedTime: "1 ชม.",    tags: ["รถไฟวิว", "ใบไม้แดง", "จองก่อน"] },
    { id: "rec-ky-20", name: "Kibune & Kurama",               lat: 35.1259, lng: 135.7620, category: "nature",   desc: "หมู่บ้านภูเขา Kibune ขึ้นเขา Kurama Onsen บนยอด กินอาหารริมลำธาร kawadoko ฤดูร้อน",                        estimatedTime: "ทั้งวัน",  tags: ["ภูเขา", "ออนเซ็น", "ลำธาร"] },
    { id: "rec-ky-21", name: "Ohara (Sanzen-in Temple)",      lat: 35.1095, lng: 135.8014, category: "temple",   desc: "หมู่บ้านชนบท Ohara ห่างจาก Kyoto 1 ชม. วัด Sanzen-in สวนมอสสีเขียว สงบงดงามมาก",                          estimatedTime: "3 ชม.",    tags: ["ชนบท", "มอส", "สงบ"] },
    { id: "rec-ky-22", name: "Daitoku-ji Temple Complex",     lat: 35.0484, lng: 135.7460, category: "temple",   desc: "วัดเซนขนาดใหญ่ มีวัดย่อย 24 แห่ง Zuiho-in สวน Zen ลับที่รู้จักกันน้อยมาก",                                  estimatedTime: "2 ชม.",    tags: ["วัด", "เซน", "ซ่อนอยู่"] },

    // ── NARA ──────────────────────────────────────────────
    { id: "rec-nr-1",  name: "Nara Park & Deer",              lat: 34.6851, lng: 135.8430, category: "nature",   desc: "กวางเดินอิสระในสวนสาธารณะ ซื้อ shika senbei ¥200 ให้กวาง กวางจะก้มหัวขอได้จริง!",                          estimatedTime: "2 ชม.",    tags: ["กวาง", "สวน", "ฟรี"] },
    { id: "rec-nr-2",  name: "Todai-ji Temple (Great Buddha)", lat: 34.6890, lng: 135.8398, category: "temple",  desc: "วิหารไม้ใหญ่ที่สุดในโลก ภายในมีหลวงพ่อโต Daibutsu สูง 15 ม. มีรูลอดเสาแก้ว เชื่อว่าได้บุญ",               estimatedTime: "1.5 ชม.", tags: ["วัด", "พระพุทธ", "ประวัติศาสตร์"] },
    { id: "rec-nr-3",  name: "Kasuga Taisha Shrine",          lat: 34.6814, lng: 135.8451, category: "temple",   desc: "ศาลเจ้ามรดกโลก มีโคมไฟหินและโคมทองแดงกว่า 3,000 ดวง เทศกาลไฟ Mantoro สวยงามมาก",                            estimatedTime: "1 ชม.",    tags: ["ศาลเจ้า", "โคมไฟ", "มรดกโลก"] },
    { id: "rec-nr-4",  name: "Naramachi Historic Quarter",    lat: 34.6773, lng: 135.8366, category: "culture",  desc: "ย่านเก่าบ้านพ่อค้าสไตล์ Edo ร้านกาแฟ ร้านคราฟต์ ซื้อของฝาก sake ท้องถิ่น",                               estimatedTime: "1.5 ชม.", tags: ["ย่านเก่า", "คราฟต์", "ของฝาก"] },
    { id: "rec-nr-5",  name: "Nigatsudo & Sangatudo Hall",    lat: 34.6901, lng: 135.8413, category: "temple",   desc: "ห้องโถงเก่าแก่บนเขาเหนือ Todai-ji วิว Nara ทั้งเมือง เทศกาลน้ำศักดิ์สิทธิ์เดือนมีนาคม",                   estimatedTime: "1 ชม.",    tags: ["วิว", "วัด", "ขึ้นเขา"] },
    { id: "rec-nr-6",  name: "Horyu-ji Temple",               lat: 34.6145, lng: 135.7344, category: "temple",   desc: "วัดไม้เก่าแก่ที่สุดในโลก สร้างปี ค.ศ. 607 มรดกโลก UNESCO อยู่ห่างจาก Nara ประมาณ 30 นาที",               estimatedTime: "2 ชม.",    tags: ["เก่าแก่ที่สุด", "มรดกโลก", "ไม้"] },

    // ── KOBE ──────────────────────────────────────────────
    { id: "rec-kb-1",  name: "Kobe Harborland & Mosaic",      lat: 34.6791, lng: 135.1822, category: "view",     desc: "ท่าเรือสวย ร้านอาหาร วิวสะพาน Akashi-Kaikyo ตอนกลางคืน Umie Mall และ Mosaic Garden ริมน้ำ",               estimatedTime: "2 ชม.",    tags: ["ท่าเรือ", "กลางคืน", "อาหาร"] },
    { id: "rec-kb-2",  name: "Kobe Kitano Ijinkan",           lat: 34.7001, lng: 135.1913, category: "culture",  desc: "ย่านบ้านชาวต่างชาติสไตล์ยุโรปกว่า 20 หลัง จากยุคเมจิ เดินถ่ายรูปฟรี บางหลังเปิดให้เข้าชม ¥500-700",     estimatedTime: "1.5 ชม.", tags: ["ยุโรป", "ถ่ายรูป", "ประวัติศาสตร์"] },
    { id: "rec-kb-3",  name: "Nankinmachi (Kobe Chinatown)",  lat: 34.6871, lng: 135.1862, category: "food",     desc: "ไชน่าทาวน์ขนาดกะทัดรัด butaman (หมั่นโถวหมู) ชื่อดัง อาหารจีนราคาย่อมเยาว์ บรรยากาศดีมาก",                 estimatedTime: "1 ชม.",    tags: ["ไชน่าทาวน์", "หมั่นโถว", "อาหาร"] },
    { id: "rec-kb-4",  name: "Kobe Port Tower",               lat: 34.6793, lng: 135.1876, category: "view",     desc: "หอคอยสีแดงสัญลักษณ์ของ Kobe ปรับปรุงใหม่ปี 2023 มีดาดฟ้าเปิดโล่ง วิว Harborland แบบ 360°",              estimatedTime: "1 ชม.",    tags: ["วิว", "สีแดง", "สัญลักษณ์"] },
    { id: "rec-kb-5",  name: "Nunobiki Falls",                lat: 34.7098, lng: 135.1941, category: "nature",   desc: "น้ำตก 4 ชั้นเดินขึ้นจากสถานี Shin-Kobe ประมาณ 20 นาที ต้นน้ำผ่อนคลาย แวะก่อนขึ้น Rokko-san",             estimatedTime: "1 ชม.",    tags: ["น้ำตก", "เดินป่า", "ใกล้เมือง"] },
    { id: "rec-kb-6",  name: "Mt. Rokko & Rokko Garden Terrace", lat: 34.7613, lng: 135.2477, category: "view",  desc: "วิว Kobe และ Osaka Bay สวยที่สุดจาก Rokko-san ช่วงกลางคืน Night View อันดับ top 3 ของญี่ปุ่น",          estimatedTime: "2 ชม.",    tags: ["วิวยอดเขา", "กลางคืน", "ต้องนั่งกระเช้า"] },

    // ── HIMEJI ──────────────────────────────────────────────
    { id: "rec-hj-1",  name: "Himeji Castle",                 lat: 34.8394, lng: 134.6939, category: "culture",  desc: "ปราสาทมรดกโลก UNESCO สวยที่สุดในญี่ปุ่น สีขาวบริสุทธิ์ ยังสมบูรณ์สภาพดีที่สุดในบรรดาปราสาท",              estimatedTime: "2.5 ชม.", tags: ["ปราสาท", "มรดกโลก", "ขาว"] },
    { id: "rec-hj-2",  name: "Koko-en Garden (Himeji)",       lat: 34.8384, lng: 134.6917, category: "nature",   desc: "สวนญี่ปุ่น 9 สวนสไตล์ต่างๆ ติดปราสาท Himeji ร้านชา ในฤดูใบไม้แดงสวยมาก เข้าได้ด้วยตั๋วปราสาท",           estimatedTime: "1 ชม.",    tags: ["สวนญี่ปุ่น", "ชาย่า", "ใบไม้แดง"] },

    // ── UJI ──────────────────────────────────────────────
    { id: "rec-uji-1", name: "Byodo-in Temple (Uji)",         lat: 34.8893, lng: 135.8077, category: "temple",   desc: "วัดบนธนบัตร ¥10 Phoenix Hall สะท้อนในสระน้ำ อยู่ใน Uji เมืองชาเขียวชื่อดัง",                              estimatedTime: "1.5 ชม.", tags: ["วัด", "Uji", "ชาเขียว"] },
    { id: "rec-uji-2", name: "Uji Tea Street (Omotesando)",   lat: 34.8905, lng: 135.8057, category: "food",     desc: "ถนนชาเขียวสำหรับเดินชิม ร้านชา Tsuen (เก่าแก่กว่า 800 ปี) matcha soft cream ของฝาก Uji ชา",               estimatedTime: "1.5 ชม.", tags: ["ชาเขียว", "matcha", "ของฝาก"] },
    { id: "rec-uji-3", name: "Ujigami Shrine",                lat: 34.8878, lng: 135.8099, category: "temple",   desc: "ศาลเจ้าไม้เก่าแก่ที่สุดในญี่ปุ่น มรดกโลก UNESCO อยู่ฝั่งตรงข้ามแม่น้ำจาก Byodo-in",                      estimatedTime: "30 นาที", tags: ["ศาลเจ้า", "เก่าแก่", "มรดกโลก"] },

    // ── OKAYAMA / KURASHIKI ──────────────────────────────────────────────
    { id: "rec-ok-1",  name: "Korakuen Garden (Okayama)",     lat: 34.6646, lng: 133.9367, category: "nature",   desc: "สวนญี่ปุ่น Top 3 ของประเทศ วิวปราสาท Okayama สีดำ 'Crow Castle' เป็นฉากหลัง",                             estimatedTime: "2 ชม.",    tags: ["สวน", "Top 3", "ปราสาทดำ"] },
    { id: "rec-ok-2",  name: "Okayama Castle (Crow Castle)",  lat: 34.6622, lng: 133.9337, category: "culture",  desc: "ปราสาทสีดำ 'Ujo' หรือ Crow Castle เรียกขาน ตรงข้ามกับ Himeji ขาว ชมวิวจากดาดฟ้า",                       estimatedTime: "1.5 ชม.", tags: ["ปราสาท", "สีดำ", "วิว"] },
    { id: "rec-ks-1",  name: "Kurashiki Bikan Historic Quarter", lat: 34.5925, lng: 133.7751, category: "culture", desc: "เมืองเก่าริมคลองสีขาว บ้านพ่อค้าข้าวยุค Edo พิพิธภัณฑ์ศิลปะ Ohara ร้านยีนส์ชื่อดัง Kojima",             estimatedTime: "2 ชม.",    tags: ["เมืองเก่า", "คลอง", "พิพิธภัณฑ์"] },

    // ── KINOSAKI & ONSEN ──────────────────────────────────────────────
    { id: "rec-kn-1",  name: "Kinosaki Onsen Town",           lat: 35.6225, lng: 134.8186, category: "onsen",    desc: "เมืองออนเซ็นสุดคลาสสิกบนฝั่งทะเลญี่ปุ่น เดินใส่ yukata แช่ Sotoyu 7 แห่ง ช่วงหน้าปูเป็น Matsuba Crab", estimatedTime: "ทั้งวัน",  tags: ["ออนเซ็น", "yukata", "ปู"] },
    { id: "rec-ar-1",  name: "Arima Onsen",                   lat: 34.7977, lng: 135.2461, category: "onsen",    desc: "น้ำพุร้อนดำ Kinsen หายากที่สุดในญี่ปุ่น ใกล้ Kobe เพียง 30 นาที ถนนเก่าน่าเดิน ขนม tansan sembei",       estimatedTime: "3-4 ชม.", tags: ["ออนเซ็น", "น้ำดำ", "ใกล้ Kobe"] },

    // ── WAKAYAMA / KOYA-SAN ──────────────────────────────────────────────
    { id: "rec-wy-1",  name: "Koyasan (Mt. Koya)",            lat: 34.2131, lng: 135.5857, category: "temple",   desc: "เมืองวัดบนยอดเขาศักดิ์สิทธิ์ ป่าสุสาน Okunoin ประทับใจมาก ค้างคืนในวัดบนเขา Shukubo",               estimatedTime: "ทั้งวัน",  tags: ["ศักดิ์สิทธิ์", "ค้างวัด", "สุสาน"] },

    // ── SHIGA / BIWAKO ──────────────────────────────────────────────
    { id: "rec-sh-1",  name: "Hikone Castle",                 lat: 34.8691, lng: 136.2567, category: "culture",  desc: "หนึ่งในปราสาทไม่กี่แห่งที่ไม่ใช่ replica ริมทะเลสาบ Biwa สวนญี่ปุ่น Genkyu-en สวยช่วงใบไม้แดง",        estimatedTime: "2 ชม.",    tags: ["ปราสาทจริง", "ทะเลสาบ", "สวน"] },
    { id: "rec-sh-2",  name: "Lake Biwa (Biwako) Lakeside",   lat: 35.3267, lng: 136.0645, category: "nature",   desc: "ทะเลสาบน้ำจืดใหญ่ที่สุดในญี่ปุ่น พายเรือ ล่องเรือ พระอาทิตย์ตก ดอกไม้ป่า ในฤดูหนาวมีหงส์ขาว",          estimatedTime: "2 ชม.",    tags: ["ทะเลสาบ", "ธรรมชาติ", "วิว"] }
  ]
};

// ──────────────────────────────────────────────
// Onsen Retreat Template (4 days)
// ──────────────────────────────────────────────
const ONSEN_TEMPLATE = {
  info: {
    title: "Onsen Retreat",
    traveler: "",
    base: "Osaka / Kyoto Base",
    window: "กำหนดวันเอง",
    flightOut: "",
    flightBack: "",
    railPass: "JR Kansai Pass หรือ IC Card",
    startDate: ""
  },
  days: [
    { id: 1, date: "วันที่ 1", city: "Osaka", pass: false, theme: "เดินทางถึง + เตรียมตัว", color: "#b8342f", activities: [
      { id: "on-d1-a1", time: "09:00", icon: "🛬", title: "เดินทางถึง + Check-in", desc: "เช็กอินโรงแรม เตรียมกระเป๋าและพักผ่อนก่อนออกเที่ยว", tags: ["arrival"] },
      { id: "on-d1-a2", time: "14:00", icon: "♨️", title: "ออนเซ็นในเมือง", desc: "ลองออนเซ็นสาธารณะหรือ sento ใกล้ที่พักเป็นการอุ่นเครื่อง", tags: ["onsen"] },
      { id: "on-d1-a3", time: "18:00", icon: "🍜", title: "อาหารเย็น + เดินชม", desc: "เดินย่านเก่า ลองอาหารญี่ปุ่นท้องถิ่น", tags: ["food"] }
    ]},
    { id: 2, date: "วันที่ 2", city: "Arima Onsen", pass: false, theme: "Arima Onsen day trip", color: "#178d82", activities: [
      { id: "on-d2-a1", time: "09:00", icon: "🚌", title: "ไป Arima Onsen", desc: "ต่อรถหรือ limited express ไป Arima — น้ำพุร้อนดำ (Kinsen) และน้ำพุเงิน (Ginsen)", tags: ["transport"] },
      { id: "on-d2-a2", time: "10:30", icon: "♨️", title: "แช่น้ำพุร้อน Arima", desc: "ลอง Kinsen (น้ำดำ) ที่หายากที่สุดในญี่ปุ่น แช่ยาวๆ ผ่อนคลาย", tags: ["highlight", "onsen"] },
      { id: "on-d2-a3", time: "13:00", icon: "🍡", title: "เดิน Arima ถนนเก่า", desc: "ซื้อ tansan sembei (ขนมชื่อดัง), ถ่ายรูป, แวะร้านของฝาก", tags: ["culture", "shopping"] },
      { id: "on-d2-a4", time: "16:00", icon: "🚌", title: "กลับ + พักผ่อน", desc: "กลับโรงแรม นวดหรือพักผ่อนก่อนอาหารเย็น", tags: ["transport"] }
    ]},
    { id: 3, date: "วันที่ 3", city: "Kinosaki Onsen", pass: true, theme: "Kinosaki — onsen town ริมแม่น้ำ", color: "#3d6ec9", activities: [
      { id: "on-d3-a1", time: "08:30", icon: "🚄", title: "ไป Kinosaki ด้วย Kounotori", desc: "นั่ง limited express ข้ามไปฝั่งทะเลญี่ปุ่น ผ่านภูเขาสวยงาม", tags: ["transport"] },
      { id: "on-d3-a2", time: "11:00", icon: "👘", title: "สวม Yukata เดินเมือง", desc: "ยืม yukata จากโรงแรม เดินแช่ Sotoyu (7 แห่ง) ตามสไตล์เมือง onsen", tags: ["highlight", "onsen", "culture"] },
      { id: "on-d3-a3", time: "13:00", icon: "🦀", title: "กุ้งมังกร / ปูทะเล Tajima", desc: "ถ้าเป็นหน้าปู (ต.ค.–มี.ค.) อย่าพลาด Matsuba crab ท้องถิ่น", tags: ["food", "highlight"] },
      { id: "on-d3-a4", time: "20:00", icon: "🌙", title: "ออนเซ็นกลางคืน", desc: "เดินชมไฟ โคมไฟริมน้ำ และแช่น้ำพุร้อนรอบค่ำ", tags: ["onsen"] }
    ]},
    { id: 4, date: "วันที่ 4", city: "กลับบ้าน", pass: false, theme: "วันสุดท้าย + เดินทางกลับ", color: "#7a8898", activities: [
      { id: "on-d4-a1", time: "09:00", icon: "♨️", title: "ออนเซ็นเช้า", desc: "แช่ครั้งสุดท้ายตอนเช้าตรู่ก่อนอาหารเช้า บรรยากาศเงียบสงบ", tags: ["onsen"] },
      { id: "on-d4-a2", time: "11:00", icon: "🛍️", title: "ซื้อของฝาก + Checkout", desc: "ซื้อของฝาก onsen สบู่ เกลือ snack ท้องถิ่น", tags: ["shopping"] },
      { id: "on-d4-a3", time: "14:00", icon: "🏠", title: "เดินทางกลับ", desc: "นั่งรถไฟกลับสู่ฐาน", tags: ["transport"] }
    ]}
  ],
  backupRegions: [
    { region: "Onsen สำรอง", spots: [
      { id: "on-bk-1", name: "Kurama Onsen (Kyoto)", cat: "ธรรมชาติ", cost: "¥1,500", time: "2-3 ชม.", pass: "Eizan Railway", desc: "ออนเซ็นกลางป่าเขาบนเส้นทาง Kibune-Kurama" },
      { id: "on-bk-2", name: "Nanki-Shirahama", cat: "ทะเล", cost: "ฟรี (หาด)", time: "ทั้งวัน", pass: "JR Kinokuni Line", desc: "ออนเซ็นริมทะเล + หาดทราย ใต้สุดของ Kansai" }
    ]}
  ],
  defaultChecklist: [
    { id: "on-cl-1", cat: "Onsen", text: "เตรียมผ้าเช็ดตัวส่วนตัวและ toiletry bag ขนาดเล็ก" },
    { id: "on-cl-2", cat: "Onsen", text: "ตรวจสอบ tattoo policy ของแต่ละ onsen ก่อน" },
    { id: "on-cl-3", cat: "Documents", text: "ตรวจสอบ passport + ตั๋วเดินทางให้ครบ" }
  ],
  defaultPacking: [
    { id: "on-pk-1", phase: "T-7", cat: "Onsen", text: "เตรียม onsen bag — ผ้าขนหนูเล็ก, สบู่ส่วนตัว, หวี" },
    { id: "on-pk-2", phase: "T-2", cat: "Packing", text: "แพ็กเสื้อผ้าสบายๆ ที่หยิบง่ายสำหรับ yukata" },
    { id: "on-pk-3", phase: "Day Of", cat: "Documents", text: "พก passport, wallet, มือถือ, power bank" }
  ],
  japaneseScripts: [
    { cat: "ออนเซ็น", items: [
      { title: "ถามว่ามี tattoo ได้ไหม", jp: "タトゥーがあっても入浴できますか？", reading: "ทาทูกะ อาตเตโมะ นิวโยกุ เดกิมัสกะ", th: "มีรอยสักเข้าได้ไหมครับ" },
      { title: "ขอผ้าเช็ดตัว", jp: "タオルを一枚いただけますか？", reading: "ทาโอรุ โอ อิจิมาอิ อิตาดาเกมัสกะ", th: "ขอผ้าเช็ดตัว 1 ผืนได้ไหมครับ" }
    ]}
  ],
  defaultBudgetPlan: { 1: 6000, 2: 9000, 3: 12000, 4: 5000 },
  defaultRoutes: [],
  recommendedPlaces: []
};

// ──────────────────────────────────────────────
// Food & Street Template (3 days)
// ──────────────────────────────────────────────
const FOOD_TEMPLATE = {
  info: {
    title: "Osaka Food & Street",
    traveler: "",
    base: "Namba / Shinsaibashi Base",
    window: "กำหนดวันเอง",
    flightOut: "",
    flightBack: "",
    railPass: "ICOCA / Osaka Metro Pass",
    startDate: ""
  },
  days: [
    { id: 1, date: "วันที่ 1", city: "Osaka Street Food", pass: false, theme: "Dotonbori + Namba + ตลาดกลางคืน", color: "#db7c21", activities: [
      { id: "fd-d1-a1", time: "10:00", icon: "🍢", title: "Dotonbori ช่วงสาย", desc: "เริ่มจากสะพาน Ebisu-bashi ไล่กินตามร้านดัง — Ichiran, Kani Doraku, Takoyaki Juhachiban", tags: ["food", "highlight"] },
      { id: "fd-d1-a2", time: "13:00", icon: "🏪", title: "Kuromon Ichiba Market", desc: "ตลาดสดของคน Osaka มีทั้ง seafood สด, ผลไม้, ขนม หาอาหารกลางวันจากร้านในตลาด", tags: ["food", "culture"] },
      { id: "fd-d1-a3", time: "16:00", icon: "🛍️", title: "Shinsaibashi + Amerikamura", desc: "ช้อป vintage, street wear, แวะร้านขนมและ bubble tea สายเก๋", tags: ["shopping"] },
      { id: "fd-d1-a4", time: "19:00", icon: "🍜", title: "Namba ยามค่ำ", desc: "เดินกิน street food รอบ Namba — ทาโกยากิ, โอโคโนมิยากิ, kushikatsu", tags: ["food", "highlight"] }
    ]},
    { id: 2, date: "วันที่ 2", city: "Kyoto Food", pass: false, theme: "Nishiki Market + Gion + Tofu", color: "#8a45b0", activities: [
      { id: "fd-d2-a1", time: "09:00", icon: "🚃", title: "ไป Kyoto เช้า", desc: "ไปเช้าก่อนฝูงชน ใช้ metro หรือ JR Special Rapid", tags: ["transport"] },
      { id: "fd-d2-a2", time: "10:00", icon: "🐟", title: "Nishiki Market", desc: "\"ครัวของ Kyoto\" — ลอง tsukemono, yatsuhashi, ปลาอบ, และขนมโบราณ", tags: ["food", "highlight"] },
      { id: "fd-d2-a3", time: "12:30", icon: "🍱", title: "กลางวัน Tofu Kaiseki", desc: "ลอง Yudofu (เต้าหู้ต้มน้ำพุร้อน) ย่าน Nanzen-ji — อาหารสไตล์พระ", tags: ["food", "culture"] },
      { id: "fd-d2-a4", time: "15:00", icon: "🍵", title: "ร้านมัทฉะ Gion", desc: "ชิม matcha parfait, wagashi, และเครื่องดื่มมัทฉะระดับ premium ย่าน Gion", tags: ["food", "highlight"] },
      { id: "fd-d2-a5", time: "19:00", icon: "🍣", title: "อาหารเย็น Kyoto style", desc: "ลอง kaiseki ร้านเล็ก หรือ Pontocho izakaya ริมน้ำ Kamo", tags: ["food"] }
    ]},
    { id: 3, date: "วันที่ 3", city: "Osaka + Shinsekai", pass: false, theme: "Depachika + Shinsekai + ของฝาก", color: "#b8342f", activities: [
      { id: "fd-d3-a1", time: "10:00", icon: "🏬", title: "Depachika Umeda", desc: "ชั้นใต้ดิน department store — ขนมรอบโลก, ของฝาก, ร้าน bento จัดเต็ม", tags: ["food", "shopping"] },
      { id: "fd-d3-a2", time: "13:00", icon: "🍢", title: "Shinsekai กิน Kushikatsu", desc: "ย่าน retro เก่า กิน kushikatsu — ห้ามซุ้มซ้ำ! (กฎร้านดัง)", tags: ["food", "highlight", "culture"] },
      { id: "fd-d3-a3", time: "16:00", icon: "🎁", title: "ซื้อของฝากปิดทริป", desc: "ขนมโอซาก้า — Baumkuchen, Pocky special edition, Shiroi Koibito และ Kit Kat สีท้องถิ่น", tags: ["shopping"] }
    ]}
  ],
  backupRegions: [
    { region: "ร้านอาหารสำรอง", spots: [
      { id: "fd-bk-1", name: "Ichiran Ramen Dotonbori", cat: "กินดื่ม", cost: "¥1,000-1,500", time: "45 นาที", pass: "เดิน", desc: "ราเมนสไตล์ solo booth ที่ดังที่สุดในโอซาก้า" },
      { id: "fd-bk-2", name: "Endo Sushi (Osaka Central Market)", cat: "กินดื่ม", cost: "¥1,500-2,000", time: "30 นาที", pass: "เดิน + metro", desc: "ซูชิเช้าตรู่ เปิดตั้งแต่ตี 5 ของสดจากตลาด" }
    ]}
  ],
  defaultChecklist: [
    { id: "fd-cl-1", cat: "Food", text: "เซฟร้านที่อยากไปใน Google Maps ล่วงหน้า" },
    { id: "fd-cl-2", cat: "Food", text: "ตรวจสอบเวลาเปิด-ปิด โดยเฉพาะร้านดังที่ต้องคิวยาว" },
    { id: "fd-cl-3", cat: "Money", text: "เตรียมเงินสด — ร้านเล็กในตลาดมักไม่รับบัตร" }
  ],
  defaultPacking: [
    { id: "fd-pk-1", phase: "T-7", cat: "Food", text: "ดูรีวิวร้านและเซฟ shortlist ใน Google Maps" },
    { id: "fd-pk-2", phase: "T-2", cat: "Packing", text: "แพ็กกระเป๋าเปล่าสำหรับของฝาก ซื้อขนมกลับเยอะ" },
    { id: "fd-pk-3", phase: "Day Of", cat: "Money", text: "แลกเงินสด เพราะตลาดส่วนใหญ่ไม่รับบัตร" }
  ],
  japaneseScripts: [
    { cat: "ร้านอาหาร", items: [
      { title: "ขอเมนูภาษาอังกฤษ", jp: "英語のメニューはありますか？", reading: "เอโกะ โนะ เมนิว วะ อาริมัสกะ", th: "มีเมนูภาษาอังกฤษไหมครับ" },
      { title: "ไม่กินหมู", jp: "豚肉は食べられません。", reading: "บุตะนิคุ วะ ทาเบราเรมาเซน", th: "ผมกินเนื้อหมูไม่ได้ครับ" },
      { title: "อร่อยมาก", jp: "とても美味しいです！", reading: "โตเตโมะ โอะอิชิอิ เดิส!", th: "อร่อยมากเลยครับ!" }
    ]}
  ],
  defaultBudgetPlan: { 1: 8000, 2: 9000, 3: 7000 },
  defaultRoutes: [],
  recommendedPlaces: []
};

// ──────────────────────────────────────────────
// Blank Template
// ──────────────────────────────────────────────
const BLANK_TEMPLATE = {
  info: {
    title: "ทริปใหม่",
    traveler: "",
    base: "",
    window: "",
    flightOut: "",
    flightBack: "",
    railPass: "",
    startDate: ""
  },
  days: [],
  backupRegions: [],
  defaultChecklist: [
    { id: "bl-cl-1", cat: "Documents", text: "เตรียม passport และเอกสารการเดินทางให้ครบ" },
    { id: "bl-cl-2", cat: "Internet", text: "เตรียม eSIM หรือ SIM ท้องถิ่น" }
  ],
  defaultPacking: [
    { id: "bl-pk-1", phase: "T-7", cat: "Packing", text: "วางแผน packing list ตามสภาพอากาศปลายทาง" },
    { id: "bl-pk-2", phase: "Day Of", cat: "Documents", text: "พก passport, wallet, มือถือ, power bank" }
  ],
  japaneseScripts: [],
  defaultBudgetPlan: {},
  defaultRoutes: [],
  recommendedPlaces: []
};

// ──────────────────────────────────────────────
// Template catalog
// ──────────────────────────────────────────────
export const TRIP_TEMPLATES = [
  {
    id: "kansai-2026",
    emoji: "🍁",
    label: "Kansai Nov 2026",
    desc: "7 วัน Osaka–Himeji–Kyoto–Nara ใบไม้แดง",
    color: "#b8342f",
    days: 7,
    data: DEFAULT_TRIP_TEMPLATE
  },
  {
    id: "onsen-retreat",
    emoji: "♨️",
    label: "Onsen Retreat",
    desc: "4 วัน Arima + Kinosaki เน้นแช่น้ำพุร้อน",
    color: "#178d82",
    days: 4,
    data: ONSEN_TEMPLATE
  },
  {
    id: "food-street",
    emoji: "🍜",
    label: "Food & Street",
    desc: "3 วัน กิน Osaka–Kyoto ตลาด StreetFood Depachika",
    color: "#db7c21",
    days: 3,
    data: FOOD_TEMPLATE
  },
  {
    id: "blank",
    emoji: "📋",
    label: "Blank Trip",
    desc: "เริ่มเปล่า วาง itinerary เองทั้งหมด",
    color: "#6f655e",
    days: 0,
    data: BLANK_TEMPLATE
  }
];

export function cloneDefaultTripTemplate() {
  return structuredClone(DEFAULT_TRIP_TEMPLATE);
}

export function cloneTemplate(templateId) {
  const tpl = TRIP_TEMPLATES.find((t) => t.id === templateId);
  return structuredClone(tpl ? tpl.data : DEFAULT_TRIP_TEMPLATE);
}

