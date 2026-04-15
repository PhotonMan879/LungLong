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
    { id: "rec-os-1", name: "Dotonbori", lat: 34.6687, lng: 135.5021, category: "food", desc: "ถนนอาหารและ neon light สุดฮิตของโอซาก้า — กุ้งยักษ์ Kani Doraku, Ichiran Ramen", estimatedTime: "2 ชม.", tags: ["มีชื่อ", "กลางคืนสวย", "กินอร่อย"] },
    { id: "rec-os-2", name: "Kuromon Ichiba Market", lat: 34.6654, lng: 135.5073, category: "food", desc: "ตลาดสดใจกลาง Osaka ที่ขายอาหารทะเลสด ชิมได้ทันที", estimatedTime: "1.5 ชม.", tags: ["ตลาด", "อาหารทะเล", "เช้า"] },
    { id: "rec-os-3", name: "Shinsekai & Tsutenkaku", lat: 34.6525, lng: 135.5061, category: "culture", desc: "ย่านย้อนยุคสไตล์โชวะ หอคอย Tsutenkaku วิวเมืองกลาง Osaka", estimatedTime: "2 ชม.", tags: ["ย้อนยุค", "ถ่ายรูป", "ราคาถูก"] },
    { id: "rec-os-4", name: "Osaka Castle & Park", lat: 34.6873, lng: 135.5262, category: "nature", desc: "ปราสาทโอซาก้าสัญลักษณ์ของเมือง สวนรอบข้างสวยมากช่วงใบไม้แดง", estimatedTime: "2.5 ชม.", tags: ["ประวัติศาสตร์", "ใบไม้แดง", "สวน"] },
    { id: "rec-os-5", name: "Umeda Sky Building", lat: 34.7051, lng: 135.4896, category: "view", desc: "หอคอลดาดฟ้าเปิดโล่ง วิว 360° วิวกลางคืน Osaka สวยที่สุดในเมือง", estimatedTime: "1 ชม.", tags: ["วิว", "กลางคืน", "โรแมนติก"] },
    { id: "rec-os-6", name: "Namba Yasaka Shrine", lat: 34.6610, lng: 135.4966, category: "temple", desc: "ศาลเจ้าหน้าสิงโตยักษ์ Instagram worthy มากที่สุดใน Osaka", estimatedTime: "30 นาที", tags: ["ศาลเจ้า", "ถ่ายรูป", "ฟรี"] },
    { id: "rec-ky-1", name: "Fushimi Inari Taisha", lat: 34.9671, lng: 135.7727, category: "temple", desc: "โทริอิสีแดงพันๆ ต้น ขึ้นภูเขา Inari — เช้าตรู่คนน้อยที่สุด", estimatedTime: "2-3 ชม.", tags: ["ขึ้นเขา", "โทริอิ", "เช้าดีที่สุด"] },
    { id: "rec-ky-2", name: "Arashiyama Bamboo Grove", lat: 35.0169, lng: 135.6710, category: "nature", desc: "ป่าไผ่ที่สวยที่สุดในญี่ปุ่น — ไปเช้ามากเพื่อหลีกเลี่ยงฝูงชน", estimatedTime: "1.5 ชม.", tags: ["ป่าไผ่", "ธรรมชาติ", "ถ่ายรูป"] },
    { id: "rec-ky-3", name: "Kinkaku-ji (Golden Pavilion)", lat: 35.0394, lng: 135.7292, category: "temple", desc: "วัดทองคำอันเลื่องชื่อ สะท้อนในสระน้ำ — ซื้อตั๋วล่วงหน้าได้", estimatedTime: "1 ชม.", tags: ["วัด", "ทอง", "มีชื่อ"] },
    { id: "rec-ky-4", name: "Kiyomizudera Temple", lat: 34.9948, lng: 135.7850, category: "temple", desc: "วัดบนเนินเขา ระเบียงไม้ลอยฟ้า วิว Kyoto ช่วงใบไม้แดงสวยดี", estimatedTime: "2 ชม.", tags: ["วัด", "ใบไม้แดง", "ขึ้นเขา"] },
    { id: "rec-ky-5", name: "Nishiki Market", lat: 35.0050, lng: 135.7649, category: "food", desc: "ตลาดแคบยาวที่เรียกว่า 'ครัวของ Kyoto' — ชิมอาหารท้องถิ่น", estimatedTime: "1.5 ชม.", tags: ["ตลาด", "ชิม", "ของฝาก"] },
    { id: "rec-ky-6", name: "Philosopher's Path", lat: 35.0210, lng: 135.7963, category: "nature", desc: "ทางเดินริมคลอง ร่มรื่น เชื่อมวัดหลักๆ ของ Kyoto ฝั่งตะวันออก", estimatedTime: "1 ชม.", tags: ["เดินเล่น", "ธรรมชาติ", "ชิล"] },
    { id: "rec-nr-1", name: "Nara Park & Deer", lat: 34.6851, lng: 135.8430, category: "nature", desc: "กวางเดินอิสระในสวนสาธารณะ — ซื้อ senbei แผ่น ¥200 ให้กวาง", estimatedTime: "2 ชม.", tags: ["กวาง", "สวน", "ฟรี"] },
    { id: "rec-nr-2", name: "Todai-ji Temple (Great Buddha)", lat: 34.6890, lng: 135.8398, category: "temple", desc: "วิหารไม้ใหญ่ที่สุดในโลก ภายในมีหลวงพ่อโตสูง 15 เมตร", estimatedTime: "1.5 ชม.", tags: ["วัด", "พระพุทธ", "ประวัติศาสตร์"] },
    { id: "rec-hj-1", name: "Himeji Castle", lat: 34.8394, lng: 134.6939, category: "culture", desc: "ปราสาทระดับมรดกโลก สวยที่สุดในญี่ปุ่น — ขาวและสมบูรณ์ที่สุด", estimatedTime: "2.5 ชม.", tags: ["ปราสาท", "มรดกโลก", "ขาว"] },
    { id: "rec-kb-1", name: "Kobe Harborland", lat: 34.6791, lng: 135.1822, category: "view", desc: "ท่าเรือสวย ร้านอาหาร วิวสะพาน Akashi Kaikyo ตอนกลางคืน", estimatedTime: "2 ชม.", tags: ["ท่าเรือ", "กลางคืน", "อาหาร"] },
    { id: "rec-kb-2", name: "Kobe Kitano Ijinkan", lat: 34.7001, lng: 135.1913, category: "culture", desc: "ย่านบ้านตะวันตกสไตล์ยุโรป ถ่ายรูปย้อนยุค เดินเล่นได้ฟรี", estimatedTime: "1 ชม.", tags: ["ยุโรป", "ถ่ายรูป", "ฟรี"] },
    { id: "rec-uji-1", name: "Byodo-in Temple (Uji)", lat: 34.8893, lng: 135.8077, category: "temple", desc: "วัดบนธนบัตร ¥10 สะท้อนในสระ — ชาเขียว Uji ชิมได้แถวนั้น", estimatedTime: "1.5 ชม.", tags: ["วัด", "Uji", "ชาเขียว"] },
    { id: "rec-os-7", name: "Shinsaibashi Shopping Arcade", lat: 34.6717, lng: 135.5011, category: "shopping", desc: "อาเคดช้อปปิ้งกลางแจ้งยาว 600 ม. — fashion, cosmetics, กินเล่น", estimatedTime: "1.5 ชม.", tags: ["ช้อปปิ้ง", "อาเคด", "cosmetics"] },
    { id: "rec-ky-7", name: "Gion District (Hanamikoji)", lat: 35.0037, lng: 135.7750, category: "culture", desc: "ย่าน Geisha ประตูต้นช่วงเย็น ถ่ายรูปสวยมาก — ยุค Edo", estimatedTime: "1 ชม.", tags: ["Geisha", "เย็น", "วัฒนธรรม"] }
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

