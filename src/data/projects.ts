export interface Project {
  slug: string;
  title: string;
  latin: string;
  category: string;
  cover: string;
  background: string;
  color: string;
  thumb: string;
  intro: string[];
  introEn: string[];
  tagsEn: string[];
  tagsCn: string[];
  overviewBg: string;
  overviewColor: string;
  gallery: string[];
  allowWide: boolean;
  wideLast?: boolean;
  wideAt?: number[];
  posterGrid?: boolean;
}

const galleryOf = (slug: string, images: string[]) =>
  images.map((name) => `/images/projects/${slug}/${name}.webp`);

export const projects: Project[] = [
  {
    slug: 'xianxiaofang',
    title: '鲜小方',
    latin: 'FAYO',
    category: 'Branding',
    cover: '/images/projects/xianxiaofang/cover.webp',
    background: '#f4efe7',
    color: '#2b2723',
    thumb: '/images/projects/xianxiaofang/thumb.webp',
    intro: [
      '鲜小方是一款面向婴幼儿辅食的调味品品牌，产品根据宝宝不同成长阶段进行划分。',
      '设计以自然、清新的风格为主，通过不同的颜色区分产品阶段与口味，并将品牌元素延伸到产品包装及相关视觉物料中，让整体风格保持统一，也方便消费者识别不同系列。',
    ],
    introEn: [
      'FAYO is a seasoning brand for infant and toddler food, with the range divided by the different stages of a baby’s growth.',
      'The visual direction is natural and fresh: colour separates product stages and flavours, while brand elements extend across packaging and related collateral — keeping the system consistent and making each series easy to recognise.',
    ],
    tagsEn: ['Logo', 'Visual Identity', 'Packaging'],
    tagsCn: ['品牌视觉', '包装设计', '视觉延展'],
    overviewBg: '#141414',
    overviewColor: '#ffffff',
    gallery: galleryOf(
      'xianxiaofang',
      [
        '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14',
        '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26',
        '27', '28', '29',
      ],
    ),
    allowWide: true,
  },
  {
    slug: 'rosi-roli',
    title: 'RosiRoli',
    latin: '',
    category: 'Branding',
    cover: '/images/projects/rosi-roli/01.webp',
    background: '#20130a',
    color: '#ffffff',
    thumb: '/images/projects/rosi-roli/01.webp',
    intro: [
      'RosiRoli 是一个专注天然木质厨具的生活方式品牌，以自然、工艺与可持续发展为核心理念，通过统一的品牌视觉与包装语言，传递天然木材的质感与生活美学。',
    ],
    introEn: [
      'RosiRoli is a lifestyle brand devoted to natural wooden kitchenware. With nature, craft and sustainability at its core, a unified identity and packaging language carry the texture of natural timber and a considered way of living.',
    ],
    tagsEn: ['Logo', 'Visual Identity', 'Packaging', 'Amazon Visual'],
    tagsCn: ['品牌视觉', '包装设计', '电商视觉'],
    overviewBg: '#20130a',
    overviewColor: '#ffffff',
    gallery: galleryOf(
      'rosi-roli',
      ['03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14'],
    ),
    allowWide: true,
  },
  {
    slug: 'zenstorage',
    title: 'ZenStorage',
    latin: '',
    category: 'Branding',
    cover: '/images/projects/zenstorage/01.webp',
    background: '#f5f1ea',
    color: '#2b2723',
    thumb: '/images/projects/zenstorage/01.webp',
    intro: [
      'ZENSTORAGE 是一个家居收纳品牌，整体以简约、现代的风格为主，强调空间的整洁感与实用性。',
      '设计以米白、浅木色等自然色调为基础，结合简洁的版式和家居场景，延伸至品牌视觉、产品目录、包装及展示物料，让不同应用保持统一的风格，同时突出产品本身的设计与质感。',
    ],
    introEn: [
      'ZENSTORAGE is a home storage brand with a minimal, modern character, emphasising order and practicality.',
      'Grounded in natural tones such as off-white and pale wood, the design pairs clean layouts with domestic scenes and extends to identity, catalogues, packaging and display materials — consistent across applications while foregrounding the products’ own design and material quality.',
    ],
    tagsEn: ['Logo', 'Visual Identity', 'Packaging', 'Amazon Visual'],
    tagsCn: ['品牌视觉', '包装设计', '电商视觉'],
    overviewBg: '#f5f1ea',
    overviewColor: '#2b2723',
    gallery: galleryOf(
      'zenstorage',
      ['03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13'],
    ),
    allowWide: true,
    wideAt: [0, 5, 8],
  },
  {
    slug: 'green-loop',
    title: '绿行循环',
    latin: 'GREEN LOOP',
    category: 'Event Visual Design',
    cover: '/images/projects/green-loop/03.webp',
    background: '#21ad38',
    color: '#ffffff',
    thumb: '/images/work/greenloop-hover.jpg',
    intro: [
      '绿行循环是一个专注于二手闲置流通与可持续生活方式的循环品牌，通过寄卖、回收、循环商店及线下市集，让闲置物品重新进入使用循环。',
      '「绿行循环市集」以“普通人的真闲置”为核心，汇集来自不同家庭与个人的闲置好物，为旧物与新主人创造相遇的机会。通过二手交易、旧物故事分享及趣味互动，让闲置物品重新流动起来。',
    ],
    introEn: [
      'Green Cycle is a circular brand centred on second-hand goods and sustainable living. Through consignment, recycling, circular stores and offline markets, it returns idle items to use.',
      'The Green Cycle Market is built around “real second-hand goods from ordinary people”. Gathering pre-loved items from households and individuals, it creates encounters between old objects and new owners, keeping things moving through resale, story-sharing and playful interaction.',
    ],
    tagsEn: ['Visual Collateral Design', 'KV Design'],
    tagsCn: ['活动视觉设计', '宣传物料延展'],
    overviewBg: '#21ad38',
    overviewColor: '#ffffff',
    gallery: galleryOf('green-loop', ['01', '02', '04', '05', '06']),
    allowWide: true,
    wideLast: false,
  },
  {
    slug: 'sweat-beautiful',
    title: '把汗流漂亮',
    latin: 'SWEAT BEAUTIFUL',
    category: 'Event Visual Design',
    cover: '/images/projects/sweat-beautiful/01.webp',
    background: '#de385f',
    color: '#ffffff',
    thumb: '/images/work/sweat-hover.jpg',
    intro: [
      '安德玛响应疫情后的运动需求，号召女性运动爱好者回归户外。活动设置了3公里环城跑、灵动塑形、大腿腿挑战等课程，并打造飞盘、腰旗橄榄球、团体舞蹈等团队运动体验区。',
      '通过多样化的运动形式，将专业运动与休闲生活相结合，进一步加深大众对品牌的认知。',
    ],
    introEn: [
      'Answering the post-pandemic appetite for movement, Under Armour called women back outdoors. The programme staged a 3 km city run plus mobility, sculpting and thigh-challenge classes, alongside team-sport zones for frisbee, flag football and group dance.',
      'By pairing professional training with everyday leisure across varied formats, it deepened the public’s understanding of the brand.',
    ],
    tagsEn: ['Visual Collateral Design', 'KV Design'],
    tagsCn: ['活动视觉设计', '宣传物料延展'],
    overviewBg: '#141414',
    overviewColor: '#ffffff',
    gallery: galleryOf(
      'sweat-beautiful',
      ['02', '03', '04', '05', '06', '07'],
    ),
    allowWide: true,
  },
  {
    slug: 'posters',
    title: '海报设计',
    latin: 'POSTER DESIGN',
    category: 'Poster Design',
    cover: '/images/projects/posters/01.webp',
    background: '#000000',
    color: '#ffffff',
    thumb: '/images/projects/posters/02.webp',
    intro: [],
    introEn: [],
    tagsEn: [],
    tagsCn: [],
    overviewBg: '#141414',
    overviewColor: '#ffffff',
    gallery: galleryOf(
      'posters',
      [
        '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12',
        '13', '14',
      ],
    ),
    allowWide: false,
    posterGrid: true,
  },
];

export const otherProjects = (slug: string, count = 3) =>
  projects.filter((project) => project.slug !== slug).slice(0, count);
