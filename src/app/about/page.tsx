import Image from 'next/image';
import { ArrowUpRight, Mail } from 'lucide-react';
import { SiDiscord, SiGithub, SiInstagram, SiTelegram, SiX } from 'react-icons/si';

export const metadata = {
  title: 'About',
  description: '關於 HYJBLOG。',
};

export default function AboutPage() {
  const socialLinks = [
    { label: 'Email', href: 'mailto:charie960906@gmail.com', icon: Mail },
    { label: 'Instagram', href: 'https://www.instagram.com/hyjcharlie960906/?hl=zh-tw', icon: SiInstagram },
    { label: 'Discord', href: 'https://discord.com/users/hyjcharlie960906', icon: SiDiscord },
    { label: 'Telegram', href: 'https://t.me/HYJcharlie960906', icon: SiTelegram },
    { label: 'X', href: 'https://x.com/charie960906', icon: SiX },
    { label: 'GitHub', href: 'https://github.com/Charie960906', icon: SiGithub },
  ];

  const competitionGroups: Array<{ category: string; entries: Array<{ name: string; year: string }> }> = [
    {
      category: '競賽程式',
      entries: [
        { name: '第九屆 YTP 少年圖靈競賽', year: '2024' },
        { name: '113 資訊月資訊應用技能競賽－中區團體組第三名', year: '2024' },
        { name: '113 資訊月資訊應用技能競賽－中區個人組優勝', year: '2024' },
        { name: 'BPCEI 四校學生聯合學科能力培訓營－資訊組第二名', year: '2024' },
        { name: '第十屆成大高中生程式競賽', year: '2024' },
        { name: '嘉義高中資訊學科能力競賽選拔賽－第 10 名', year: '2025' },
      ],
    },
    {
      category: '財經',
      entries: [{ name: '第十九屆大葉財金全國高中職股王爭霸賽－15／1500', year: '2025' }],
    },
    {
      category: '數學',
      entries: [
        { name: '嘉義縣市 114 年旭日東昇盃－個人第三名', year: '2025' },
        { name: '2025 中等學校數學建模競賽－佳作', year: '2025' },
      ],
    },
  ];

  return (
    <main id="main-content" className="flex-1 bg-neutral-50 dark:bg-neutral-950">
      <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[260px_1fr] lg:gap-20">
          <aside className="flex flex-col items-center text-center lg:sticky lg:top-28 lg:h-fit">
            <div className="rounded-full border-8 border-white bg-white shadow-xl dark:border-neutral-900 dark:bg-neutral-900">
              <Image
                src="/images/me.webp"
                alt="HYJBLOG 頭像"
                width={192}
                height={192}
                className="h-44 w-44 rounded-full object-cover sm:h-48 sm:w-48"
              />
            </div>
            <h1 className="mt-6 text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
              HYJ
            </h1>
            <p className="mt-2 text-sm font-medium uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">
              Developer · Blogger
            </p>
            <div className="mt-6 flex items-center justify-center gap-4">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto:') ? undefined : '_blank'}
                  rel={href.startsWith('mailto:') ? undefined : 'noreferrer'}
                  aria-label={label}
                  title={label}
                  className="text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </aside>

          <div className="min-w-0 space-y-14">
            <section className="space-y-5">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">
                About
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-4xl">
                關於我
              </h2>
            
              <p className="max-w-3xl text-lg leading-8 text-neutral-600 dark:text-neutral-300">
                嗨，我是老黃。
              </p>
              <p className="max-w-3xl text-lg leading-8 text-neutral-600 dark:text-neutral-300">
                這是我的個人部落格，我熱愛網頁開發、投資、參與社群，正在寫區塊鏈相關研究文章、股票研究文章等，然後也會在這分享我的生活!!!
              </p>
            </section>

            <section className="border-t border-neutral-200 pt-10 dark:border-neutral-800">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">
                Education
              </p>
              <h2 className="mt-2 text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                學校歷程
              </h2>
              <div className="mt-6 space-y-4">
                {[
                  ['中興大學資管系', 'NCHU_MIS'],
                  ['嘉義高中', 'CYSH'],
                  ['大林國中', 'TLJH'],
                  ['平林國小', 'PLES'],
                ].map(([school, code]) => (
                  <div key={code} className="flex items-center justify-between gap-4 border-l-2 border-neutral-300 pl-4 dark:border-neutral-700">
                    <span className="font-medium text-neutral-800 dark:text-neutral-200">{school}</span>
                    <span className="text-sm font-mono text-neutral-500 dark:text-neutral-400">{code}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="border-t border-neutral-200 pt-10 dark:border-neutral-800">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">Experience</p>
              <h2 className="mt-2 text-2xl font-bold text-neutral-900 dark:text-neutral-100">工作經驗</h2>
              <div className="mt-6 space-y-6">
                {[
                  ['機動組', '2024', '嘉義高中聖誕晚會'],
                  ['副社長', '2024 - 2025', '嘉義高中資研社'],
                  ['學測生', '2025 - 2026', '115 學科能力測驗'],
                  ['剪輯及攝影', '2026', '第 79 屆嘉義高中畢聯會', '頻道', 'https://www.youtube.com/@%E5%98%89%E7%BE%A9%E9%AB%98%E4%B8%AD%E7%AC%AC79%E5%B1%86%E7%95%A2%E8%81%AF%E6%9C%83'],
                  ['編劇、監製與剪輯', '2026', '第 79 屆嘉義高中畢業歌', '嘉義高中第 79 屆畢業歌《未完待旭》Official Music', 'https://www.youtube.com/watch?v=PskDmFLpdhQ'],
                  ['視訊及燈光', '2026', '嘉義高中第 79 屆畢業典禮'],
                  ['助教', '2026', '嘉義縣 115 年度福利化社區旗艦型計畫－暑期兒童陪讀營'],
                ].map(([role, year, description, linkText, href]) => (
                  <div key={`${role}-${year}`}>
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">{role}</h3>
                      <span className="text-sm text-neutral-500 dark:text-neutral-400">{year}</span>
                    </div>
                    <p className="mt-2 leading-7 text-neutral-600 dark:text-neutral-300">{description}</p>
                    {href ? (
                      <a href={href} target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-neutral-600 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white">
                        {linkText}
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                    ) : linkText ? (
                      <p className="mt-2 break-all text-sm text-neutral-600 dark:text-neutral-300">{linkText}</p>
                    ) : null}
                  </div>
                ))}
              </div>
            </section>

            <section className="border-t border-neutral-200 pt-10 dark:border-neutral-800">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">Presentations</p>
              <h2 className="mt-2 text-2xl font-bold text-neutral-900 dark:text-neutral-100">發表經驗</h2>
              <div className="mt-6">
                <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">研討會／年會</h3>
                <div className="mt-4 flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-medium text-neutral-900 dark:text-neutral-100">學生計算機年會 SITCON</h3>
                  <span className="text-sm text-neutral-500 dark:text-neutral-400">2025-03-08</span>
                </div>
                <a href="https://sitcon.org/2025/agenda/3ce961/" target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-1 text-neutral-600 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white">
                  開放式議程【AI X 考古：解密千年文字】<ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </section>

            <section className="border-t border-neutral-200 pt-10 dark:border-neutral-800">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">Community</p>
              <h2 className="mt-2 text-2xl font-bold text-neutral-900 dark:text-neutral-100">社群 &amp; 研討會</h2>
              <div className="mt-6 space-y-5">
                {[
                  ['助教', '2024', '嘉聯合資訊探索營'],
                  ['活動組組長', '2024', '南十校聯合茶會'],
                  ['活動組組長', '2024', '南七校聯合迎新'],
                  ['S5 行政組－剪輯', '2024 - 2025', 'SCIST 南臺灣學生資訊社群'],
                  ['活動組場控及規劃', '2025', '[資深玩家] SCIST 2025 聯合寒訓'],
                  ['組員', '2027', '2027 SITCON 學生計算機年會製播組'],
                ].map(([role, year, description]) => (
                  <div key={`${role}-${year}-${description}`} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <div>
                      <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">{role}</h3>
                      <p className="mt-1 text-neutral-600 dark:text-neutral-300">{description}</p>
                    </div>
                    <span className="text-sm text-neutral-500 dark:text-neutral-400">{year}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="border-t border-neutral-200 pt-10 dark:border-neutral-800">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">Certificates</p>
              <h2 className="mt-2 text-2xl font-bold text-neutral-900 dark:text-neutral-100">證照</h2>
              <div className="mt-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">APCS 大學程式設計先修檢定</h3>
                  <span className="text-sm text-neutral-500 dark:text-neutral-400">2025-01-05</span>
                </div>
                <p className="mt-2 leading-7 text-neutral-600 dark:text-neutral-300">觀念題：第四級　實作題：第三級</p>
              </div>
            </section>

            <section className="border-t border-neutral-200 pt-10 dark:border-neutral-800">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">Competitions</p>
              <h2 className="mt-2 text-2xl font-bold text-neutral-900 dark:text-neutral-100">比賽經歷</h2>
              <div className="mt-6 space-y-8">
                {competitionGroups.map(({ category, entries }, categoryIndex) => (
                  <div key={category} className={categoryIndex > 0 ? 'border-t border-neutral-200 pt-8 dark:border-neutral-800' : ''}>
                    <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">{category}</h3>
                    <div className="mt-5 space-y-6">
                      {entries.map(({ name, year }) => (
                        <div key={name}>
                          <div className="flex flex-wrap items-baseline justify-between gap-2">
                          <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">{name}</h3>
                          <span className="text-sm text-neutral-500 dark:text-neutral-400">{year}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </div>
        </div>
      </section>
    </main>
  );
}
