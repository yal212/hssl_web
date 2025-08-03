'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/Card'
import { MemberModal } from '@/components/ui/MemberModal'
import Image from 'next/image'
import {
  floating
} from '@/lib/animations'

export default function OurTeamPage() {
  const [selectedMember, setSelectedMember] = useState<typeof allMembers[0] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openMemberModal = (member: typeof allMembers[0]) => {
    setSelectedMember(member)
    setIsModalOpen(true)
  }

  const closeMemberModal = () => {
    setIsModalOpen(false)
    setSelectedMember(null)
  }

  // Advisor (teacher)
  const advisor = {
    name: '施朱娟',
    school: '指導老師',
    introduction: ' - ',
    color: 'bg-green-500'
  }

  // All student members in the new order
  const allMembers = [
    {
      name: '許翀瑋',
      school: '成功高中',
      introduction: '我對手作很有興趣，因此在這個社團中我無論是製皂或者是製作其他品項我都玩的很開心！在這個社團中，我希望能更加提升我教導方面的口條，所以我選擇了教學組，也希望將來這個社團能夠將我們的理念傳達給更多人！',
      color: 'bg-green-500'
    },
    {
      name: '謝采葳',
      school: '中山女高',
      introduction: '大家好我是2021年暑假就參與在這個社團的成員，在這裡我學到很多有關肥皂的知識與製作的技巧，去年也送了很多肥皂到醫院，很有成就感，希望之後可以幫助更多人！',
      color: 'bg-green-600'
    },
    {
      name: '李婕妤',
      school: '薇閣高中',
      introduction: '從一開始創起手工皂活動到現在經歷了很多困境，很高興我們同心協力秉持著助人精神堅持到現在，製作手工皂讓我深刻感覺到助人為快樂之本的含義，每次的送皂或教學活動都讓我感到很開心，希望我們團隊能繼續將我們一開始創社的熱忱傳承下去，將溫暖散播到每個角落！',
      color: 'bg-green-700'
    },
    {
      name: '黃昱勳',
      school: '成功高中',
      introduction: '大家好我是在今年的學期初才加入這個社團，在加入之後收穫比我預想中的多。我們都會去各種活動宣傳以及幫忙，也教導如何做手工皂，把這個既環保又簡單的作品分享給大家。也希望我們可以繼續把這份心意傳下去，讓大家都可以體驗到打皂的成就感！',
      color: 'bg-green-800'
    },
    {
      name: '廖文燦',
      school: '成功高中',
      introduction: '大家好我是最近才加入HSSL的新成員。雖然是新人，但透過暑假緊密安排的活動和練習，現在我也可以穩重的教導民眾或小朋友打皂、認識手工皂。',
      color: 'bg-green-900'
    },
    {
      name: '林秉用',
      school: '成功高中',
      introduction: '我是林秉用，2024年高一升高二成功高中的學生，參加社團的目的在於製作肥皂以供自己使用，能夠盡微薄之力為團隊獻上一份力，也是我的榮幸。',
      color: 'bg-emerald-500',
      profileImage: '/members_profiles/林秉用.png'
    },
    {
      name: '蔡佾彤',
      school: '中正高中',
      introduction: '我會參加此社團是因認同社團理念，在瞭解到手工皂對身體及環境的益處後，自己也有利用課餘時間進行打皂，希望藉由加入團隊學習到如何與人合作，及推廣友善環境，讓手工皂的優點讓更多人知道。',
      color: 'bg-emerald-600'
    },
    {
      name: '蔡元誠',
      school: '成功高中',
      introduction: '當初加入到HSSL是因為剛好高一的班導正好遇到了發起人的媽媽，原本我只是覺得似乎很好玩所以才加入的，但下學期因為也覺得真的學到了很多東西也感到很有興趣，雖然還有自己另外在做一個研究但也就繼續跟著做了，現在跟著參加過很多活動還有培訓課程也更了解我們在教學的理念。',
      color: 'bg-emerald-700'
    },
    {
      name: '林咨邑',
      school: '成功高中',
      introduction: '大家好,我是個外向開朗的人，喜歡到處交朋友，平時喜歡打打籃球、唱唱歌，當然，我也很會做肥皂呦，請大家多多指教。',
      color: 'bg-emerald-800'
    },
    {
      name: '林霂昀',
      school: '薇閣高中',
      introduction: '平常的興趣是打球，看書，畫畫等等。一開始接觸手工皂是因為看到學姊在做，之後也慢慢地對此感到興趣，並且加入了做手工皂的行列。',
      color: 'bg-emerald-900'
    },
    {
      name: '楊詠絮',
      school: '薇閣高中',
      introduction: '自從與施老師學習打皂，後來與又凝一起玩調色，對手工皂產生極大的興趣。隨後組成了五人小組，到現在將近30人。能夠有更多夥伴一同做有意義的事，我打從心裡感到開心，期望我們能夠在未來的活動上都更順遂，帶給更多人正面的影響力！',
      color: 'bg-teal-500'
    },
    {
      name: '張育綾',
      school: '延平高中',
      introduction: '我是在2021年暑假底加入這個社團的，因為國中學過皂化反應覺得很有趣就跟朋友們一起參加，也捐肥皂去醫院過，覺得很有意義還可以學習很多知識，打肥皂很好玩，希望我們能越來越好！',
      color: 'bg-teal-600'
    },
    {
      name: '余茂榮',
      school: '成功高中',
      introduction: '老師常帶我們班做手工皂，引起我濃厚的興趣，而活動越做越大，連校外參與也越來越多，逐漸組織成社團，到處教學或益賣，我也想一起參與這些活動，因而加入此社群。我在這社團擔任助教，負責部分幕後準備工作及人員補充，並了解成員需求協助處理，讓活動可以更順利，使團隊可以專注在自己的任務上。',
      color: 'bg-teal-700'
    },
    {
      name: '郭庭愷',
      school: '薇閣高中',
      introduction: '我是一個非常喜歡化學與動手做實驗的學生，因實驗中可以看出許多分子間的變化產生不同的現象，而分子間的皂化反應被運用在做肥皂中，所以在做肥皂中讓我產生了興趣。',
      color: 'bg-teal-800'
    },
    {
      name: '莊又凝',
      school: '薇閣高中',
      introduction: '很高興能有機會在2021年的暑假和一群同學及朋友們創立 HIGH SCHOOL SOAP LAB 這個團隊，在這一年裡同心協力利用我們的能力、秉持我們的理念，透過手工皂發揮我們的影響力！',
      color: 'bg-teal-900'
    },
    {
      name: '洪皓禎',
      school: '薇閣高中',
      introduction: '自從我在學校國二理化課做過皂化反應的實驗後，我就喜歡上做實驗了，而參加這個活動既可以做肥皂，也可以對環境造成好的影響。',
      color: 'bg-cyan-500'
    },
    {
      name: '伍致勳',
      school: '成功高中',
      introduction: '在國中時期就對化學抱有高度熱情，因此一聽到有打皂課程就立馬參加了，在摸索打皂的過程中我學到許多化學跟手作的技巧，也讓我深深的被製作肥皂這門工藝所吸引。',
      color: 'bg-cyan-600'
    },
    {
      name: '莊又晰',
      school: '秀岡康橋',
      introduction: '2021年和姊姊和朋友們一起成立 HSSL，開始皂顧人&地球。至今學會了好多關於環保永續的理念，以及如何籌劃活動。希望可以把這份心帶入學校！邀約更多夥伴一起努力。',
      color: 'bg-cyan-700'
    },
    {
      name: '游翔皓',
      school: '成功高中',
      introduction: '2021年，高一整年以手工皂製作為自主學習，參與校內手工皂展覽及贈皂100校慶代表，同時也協助老師管理皂室。',
      color: 'bg-cyan-800'
    },
    {
      name: '謝舒安',
      school: '金華國中',
      introduction: '2021年疫情爆發的暑假，我跟著姐姐一起學習手工皂的製作，認識了手工皂的美好，參與了 HSSL皂顧醫護的送皂活動覺得非常有意義！期待跟著大家繼續皂顧地球！',
      color: 'bg-cyan-900'
    },
    {
      name: '江家慶',
      school: '薇閣高中',
      introduction: '在2022年參與HSSL的單車環島贈手工皂活動，對這個組織有了更深的了解，並加入了HSSL。在HSSL中，我在資訊組工作，且有時會擔任活動的攝影。過程中學到了很多東西，不只是在製作肥皂方面，還有如何讓團隊更好的運作、與別人合作、更細心的教小朋友知識等。希望未來可以與大家一起繼續努力！',
      color: 'bg-sky-500'
    },
    {
      name: '劉柏甫',
      school: '建國高中',
      introduction: '將課本上的知識實際動手做出來，除了過程中的歡樂，還有製作完成的喜悅。我很開心這不但是對地球的環保盡一份心力，而且還結合了公益活動的推廣，讓我可以盡自己綿薄之力發揮這個手工皂的最大效益。',
      color: 'bg-sky-600'
    },
    {
      name: '林雋書',
      school: '政大附中',
      introduction: '嗨大家好，我是2022年加入HSSL的成員。我很認同團隊的理念，去各式不同的團體服務之際，不僅帶給孩子歡樂更是宣揚環保愛地球的理念。雖然打皂過程累人，但看到漂亮的成品時我總覺得一切都是值得的，期望今天在百人打皂活動能帶您一同體驗親手製作手工皂的樂趣。',
      color: 'bg-sky-700'
    },
    {
      name: '陳君睿',
      school: '成功高中',
      introduction: '我從國中開始就十分喜歡化學，在2022年上課時聽到老師有開設這樣一個又結合我喜歡的化學實驗和環保愛地球的團隊時馬上就選擇加入。',
      color: 'bg-sky-800'
    },
    {
      name: '林傑思',
      school: '成功高中',
      introduction: '在2022年，高一的時候因緣際會下接觸到了打皂的活動，並發現自己對動手作實驗很有興趣，也希望能透過自己微薄的力量對環境跟社會做出貢獻。',
      color: 'bg-sky-900'
    },
    {
      name: '林俊祥',
      school: '成功高中',
      introduction: '我從高一加入HSSL，到現在過了一年，我參加過喜樂園活動還有大大小小的義賣活動，對於製作肥皂有一定的熟練度，對於任何新事物具有好奇心，有意願挑戰。',
      color: 'bg-blue-500'
    },
    {
      name: '林楷哲',
      school: '成功高中',
      introduction: '一年級在林秉用的介紹下接觸了HIGH SCHOOL SOAP LAB，認識了很多很有能力的學長姐和學弟妹，希望我在未來能持續進步，為這個團隊貢獻、付出，讓更多人知道如何守護我們僅有的地球，皂顧全世界！',
      color: 'bg-blue-600'
    },
    {
      name: '饒子儀',
      school: '秀岡康橋',
      introduction: '2024年寒假的時候接觸到了HIGH SCHOOL SOAP LAB，體驗了做肥皂也了解了這個社團的初衷。我非常享受做肥皂的過程，也很開心可以做公益幫助更多人，希望之後能在這個社團學習到更多東西。',
      color: 'bg-blue-700'
    },
    {
      name: '蔡昕恩',
      school: '秀岡康橋',
      introduction: '在參加了一場以海洋生物為主題的活動後，我對HIGH SCHOOL SOAP LAB有了更多的了解，皂化背後的化學反應以及組織對回收廢油的想法深深吸引我。我相信，透過製作肥皂，我們可以讓地球更美好。',
      color: 'bg-blue-800'
    },
    {
      name: '謝奇祐',
      school: '林口康橋',
      introduction: 'Since 2023 I have contributed in several events from community soap selling events to raise funds for the Hualien earthquake to in-school promotion of making soap. I have learned so much from this organization and I hope that new members could continue this tradition of making soap!',
      color: 'bg-blue-900'
    },
    {
      name: '林祐安',
      school: '秀岡康橋',
      introduction: '身為一位對插畫非常有興趣的人，我很高興能被邀請參與此社團的繪本製作。在製作繪本的過程中，我不僅學到了製作肥皂的步驟，更被這個社團的環保精神打動，意識到了愛護地球的重要性！',
      color: 'bg-indigo-500'
    },
    {
      name: '黃謙如',
      school: '北一女中',
      introduction: '小時候有做過肥皂，但不算有太多經驗，是因為喜歡手作所以決定加入這個社團。希望可以透過這個社團能夠發揮自己身為社會一分子的影響力，幫助更多人，也保護大自然的生態。',
      color: 'bg-indigo-600'
    },
    {
      name: '江新泉',
      school: '林口康橋',
      introduction: '我經由家人的介紹而來到HSSL。我以前就有接觸過SDGs相關的志工課程，因此希望能夠藉由這次製作肥皂的活動幫助他人和環境。並且學習有關肥皂製作的知識和累積自己的志工經驗。',
      color: 'bg-indigo-700'
    },
    {
      name: '謝伊林',
      school: '松山高中',
      introduction: '第一次接觸HIGH SCHOOL SOAP LAB是在別的團體當志工的時候，那時覺得這個團體很特別，利用回收油製皂；後來參加青志獎再次遇到時，受到學長姐邀請決定加入。',
      color: 'bg-indigo-800'
    },
    {
      name: '史承以',
      school: '成功高中',
      introduction: '大家好，我是2023暑假加入的成員。希望能用在HSSL學習到手工肥皂的做法去教導其他學生，帶他們認識手工肥皂。我特別常在服務過程中陪伴與安撫特殊服務對象，讓他們能安穩參與製皂學習。',
      color: 'bg-indigo-900'
    },
    {
      name: '張育瑄',
      school: '中山女高',
      introduction: '國一時因為姊姊加入這個團隊，我也跟著接觸打皂，覺得很有趣，也因看著姐姐跟著這個團體學到很多東西，就希望自己也能在高中加入，一起學習透過手工皂做公益，並豐富我的高中生活。',
      color: 'bg-purple-500'
    },
    {
      name: '林芸安',
      school: '康橋高中',
      introduction: '寒假的時候在ANNA的帶領下認識了HIGH SCHOOL SOAP LAB並實際體驗了製作肥皂的過程。也因此希望能夠在這段時間透過做工藝的方式幫助更多需要的人並且也了解更多關於肥皂的意義！',
      color: 'bg-purple-600'
    },
    {
      name: '陳品蓁',
      school: '北一女中',
      introduction: '經由家人的介紹加入HSSL的團隊，在加入團隊之前就有打皂的經驗，而我也希望能藉由在HSSL學到的知識幫助我們的環境，並透過HSSL辦的各種公益活動，幫助到需要的人。',
      color: 'bg-purple-700'
    },
    {
      name: '黃冠傑',
      school: '林口康橋',
      introduction: '在學校經由同學的介紹，我認識了HSSL這個志工團體，由於我很少聽說有志工團體是透過製造肥皂來幫助社會，所以聽到同學的介紹就滿感興趣的，希望未來也能繼續透過作肥皂來幫助需要幫助的人。',
      color: 'bg-purple-800'
    },
    {
      name: '郭芃妘',
      school: '靜心高中',
      introduction: '由家人在網路上發現這個志工團體，加入團隊後希望能透過自己小小的力量幫助到需要的人，並在其中學習、累積各種經驗。',
      color: 'bg-purple-900'
    },
    {
      name: '龔筠晴',
      school: '靜心高中',
      introduction: '在疫情期間，我就有參加過HSSL舉辦的皂顧醫護的活動，也對藉由做手工皂來幫助有需要的人感興趣，在2025加入HSSL，希望之後在這個團隊中能幫助到在社會上有需要的人。',
      color: 'bg-pink-500'
    },
    {
      name: '賴秉宸',
      school: '成功高中',
      introduction: '經過我高一的班導介紹HSSL後，就有興趣參加這個團隊，一部分是為了充實高中生活，也是希望透過這個志工團體認識到不同領域的人。期望透過這一次次的付出累積自己的經驗。',
      color: 'bg-pink-600'
    },
    {
      name: '劉峻成',
      school: '康橋秀岡',
      introduction: '我是來自康橋秀岡的劉峻成。在同學的邀請下，我加入了HIGH SCHOOL SOAP LAB，也了解到這個組織成立的初衷和重要性。我希望自己可以對於皂化反應更加熟悉，並透過製作肥皂來幫助有需要的人，並在團隊中貢獻一分心力。',
      color: 'bg-pink-700'
    },
    {
      name: '江乙嫣',
      school: '康橋秀岡',
      introduction: '最初我是從同學的貼文上關注到HSSL。之前就有參加過手工皂的社團，對這個領域很感興趣。後來才發現竟然可以將打皂變成公益活動，幫助他人。希望可以在這個社團中貢獻一分自己的力量。',
      color: 'bg-pink-800'
    },
    {
      name: '陳語欣',
      school: '康橋秀岡',
      introduction: '在朋友的邀請下我加入了HSSL，我希望在接下來的活動中，能更投入其中，不只是學習新的東西，也希望能多認識一些人，並幫助一些有需要幫助的人。也希望透過這個團隊，讓更多人一起關注和支持那些面對困難的人。',
      color: 'bg-pink-900'
    },
    {
      name: '陳博軒',
      school: '和平高中',
      introduction: '我從國小時就非常喜歡自然科學也喜歡動手做小實驗，尤其是觀察化學變化。在2025的6月我加入了HSSL這個團隊，希望可以做環保貢獻社會，也希望能學習到化學方面的知識。',
      color: 'bg-rose-500'
    },
    {
      name: '李曜安',
      school: '建國中學',
      introduction: '我會加入HIGH SCHOOL SOAP LAB，是因為家人的推薦，加入後發現這個團體很適合我。不僅能手作肥皂，還能為環保與公益盡一份心力。我很期待能和大家一起努力，推廣環保理念，透過行動帶來正面的影響。',
      color: 'bg-rose-600'
    },
    {
      name: '黃翊棠',
      school: '高中',
      introduction: ' - ',
      color: 'bg-rose-700'
    },
    {
      name: '張呈瑞',
      school: '康橋秀岡',
      introduction: '我是來自康橋秀岡的張呈瑞，在同學的邀請下，我加入了HIGH SCHOOL SOAP LAB。我期許自己能夠在團隊中學習製皂技術與化學原理，積極參與公益行動，與大家一起在每一塊肥皂中實踐理念，為團隊貢獻一份心力。',
      color: 'bg-rose-800'
    },
    {
      name: '鄭嵐霙',
      school: '北一女中',
      introduction: '加入HSSL是因為對化學以及實作製作肥皂的過程很感興趣，也希望能將這份興趣應用在服務社區的行動中。很期待能和大家一起學習、合作，在這段過程中成長、累積經驗！',
      color: 'bg-rose-900'
    },
    {
      name: '侯柏任',
      school: '薇閣高中',
      introduction: '平常喜歡打籃球、健身、聽音樂。加入HSSL的目的是為了擴張自己的影響力，並且在薇閣持續這個團體。希望能為大家贏得青志獎第一名。',
      color: 'bg-red-500'
    },
    {
      name: '陳宇頡',
      school: '成功高中',
      introduction: '我透過高一的班導介紹，讓我知道HSSL這個團體。參加這個團體後，希望能對公共議題有更多的了解，更希望能透過自己的一小份心力影響他人。',
      color: 'bg-red-600'
    },
    {
      name: '蔡昀恩',
      school: '高中',
      introduction: ' - ',
      color: 'bg-red-700'
    },
    {
      name: '林祖妤',
      school: 'NIC',
      introduction: '我是在我媽的介紹下認識這個社團，看到這個社團在疫情時做的貢獻時讓我也想加入這社團為這社會做一點付出和幫助其他人。',
      color: 'bg-red-800'
    }
  ]

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-600 via-green-700 to-green-800"></div>
        <div className="absolute inset-0 bg-black/20"></div>

        <div className="relative max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <motion.h1
              className="text-4xl md:text-6xl font-bold text-white mb-6"
              variants={floating}
              initial="initial"
              animate="animate"
            >
              我們的團隊
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              HSSL 團隊成員，共同推動環保教育使命
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Advisor Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-cream">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-16">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">指導老師</h3>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                提供專業指導與學術支持，引領團隊朝向永續發展目標前進
              </p>
            </div>

            <div className="flex justify-center">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                viewport={{ once: true }}
              >
                <Card
                  hover
                  className="w-80 shadow-lg cursor-pointer transition-all duration-200 hover:shadow-xl"
                  onClick={() => openMemberModal(advisor)}
                >
                  <CardContent className="p-8 text-center">
                    {/* Avatar */}
                    <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-6 shadow-md">
                      <Image
                        src="/hssl_profile.jpg"
                        alt={advisor.name}
                        width={128}
                        height={128}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Info */}
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {advisor.name}
                    </h3>

                    {/* Click hint */}
                    <p className="text-gray-500 text-sm">
                      查看詳細介紹
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Student Members Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-cream">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-16">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">學生成員</h3>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                認識我們的每一位學生成員
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {allMembers.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.02 }}
                  viewport={{ once: true }}
                >
                  <Card
                    hover
                    className="h-full shadow-md cursor-pointer transition-all duration-200 hover:shadow-lg"
                    onClick={() => openMemberModal(member)}
                  >
                    <CardContent className="p-6 text-center">
                      {/* Avatar */}
                      <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-4 shadow-sm">
                        <Image
                          src={member.profileImage || "/hssl_profile.jpg"}
                          alt={member.name}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Info */}
                      <h3 className="text-lg font-bold text-gray-900 mb-1">
                        {member.name}
                      </h3>
                      <p className="text-sm text-green-600 font-medium mb-2">
                        {member.school}
                      </p>

                      {/* Click hint */}
                      <p className="text-gray-500 text-sm">
                        查看詳細介紹
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Member Modal */}
      {selectedMember && (
        <MemberModal
          isOpen={isModalOpen}
          onClose={closeMemberModal}
          member={selectedMember}
          borderColor="border-green-200"
        />
      )}
    </div>
  )
}