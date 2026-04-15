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
      { id: "bk-os-1", name: "Osaka Aquarium Kaiyukan", cat: "สนุก", cost: "¥2,700", time: "2-3 ชม.", pass: "ICOCA", desc: "พิพิธภัณฑ์สัตว์น้ำระดับ flagship ของโอซาก้า" },
      { id: "bk-os-2", name: "Abeno Harukas", cat: "วิว", cost: "¥1,500", time: "1 ชม.", pass: "JR ถึง Tennoji", desc: "วิวสูงคนละมุมกับ Umeda เหมาะกับ sunset หรือกลางคืน" },
      { id: "bk-os-3", name: "Asahi Beer Museum", cat: "กินดื่ม", cost: "ฟรี", time: "1.5 ชม.", pass: "ใช้ pass ได้", desc: "ทัวร์โรงเบียร์และชิมสด เหมาะกับวันชิล" }
    ]},
    { region: "Kyoto เพิ่มเติม", spots: [
      { id: "bk-ky-1", name: "Tofuku-ji", cat: "ธรรมชาติ", cost: "¥600", time: "1 ชม.", pass: "JR ได้", desc: "จุดชมใบไม้แดงสายฮาร์ดคอร์ใกล้ Fushimi Inari" },
      { id: "bk-ky-2", name: "Gion ยามเย็น", cat: "วัฒนธรรม", cost: "ฟรี", time: "1-2 ชม.", pass: "เดินหรือใช้ ICOCA", desc: "โซนถ่ายรูปสวยตอนฟ้าเริ่มมืด" },
      { id: "bk-ky-3", name: "Sagano Scenic Railway", cat: "วิว", cost: "¥880", time: "25 นาที", pass: "ตั๋วแยก", desc: "รถไฟชมวิวสำหรับฤดูใบไม้แดง" }
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
  defaultBudgetPlan: { 1: 8000, 2: 9000, 3: 10000, 4: 7000, 5: 9000, 6: 8000, 7: 2000 }
};

export function cloneDefaultTripTemplate() {
  return structuredClone(DEFAULT_TRIP_TEMPLATE);
}
