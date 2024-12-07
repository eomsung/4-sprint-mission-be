const products = [
  {
    name: "string",
    description: "string",
    price: 10,
    tags: ["string"],
    images: ["string"],
    favoriteCount: 1,
  },
  {
    name: "새 상품",
    description: "이것은 새 상품입니다",
    price: 100,
    tags: ["태그1", "태그2"],
    images: ["이미지_주소"],
    favoriteCount: 3,
  },
  {
    name: "새 상품",
    description: "이것은 새 상품입니다. 맞습니다",
    price: 100,
    tags: ["태그1", "태그2", ""],
    images: ["이미지_주소", " "],
    favoriteCount: 4,
  },
  {
    name: "test1",
    description: "test2",
    price: 20,
    tags: ["string2"],
    images: ["string"],
    favoriteCount: 5,
  },
  {
    name: "test1",
    description: "test2",
    price: 20,
    tags: ["string2"],
    images: ["string"],
    favoriteCount: 0,
  },
  {
    name: "test1",
    description: "test2",
    price: 20,
    tags: ["test3"],
    images: ["test4"],
    favoriteCount: 0,
  },
  {
    name: "11111111111",
    description: "2222222222",
    price: 44,
    tags: ["tag1", "tag2"],
    images: ["img1.png", "img2.png"],
    favoriteCount: 0,
  },
  {
    name: "11111111111",
    description: "2222222222",
    price: 44,
    tags: ["tag1", "tag2"],
    images: ["img1.png", "img2.png"],
    favoriteCount: 0,
  },
  {
    name: "test1",
    description: "test2",
    price: 123,
    tags: ["test3"],
    images: ["test4"],
    favoriteCount: 0,
  },
  {
    name: "test1",
    description: "test2",
    price: 345,
    tags: ["test3"],
    images: ["test4"],
    favoriteCount: 0,
  },
  {
    name: "test1",
    description: "test2",
    price: 12334,
    tags: ["test3"],
    images: ["test4"],
    favoriteCount: 0,
  },
  {
    name: "test1",
    description: "test2",
    price: 567,
    tags: ["test3"],
    images: ["test4"],
    favoriteCount: 0,
  },
  {
    name: "새 상품",
    description: "이것은 새 상품입니다",
    price: 100,
    tags: ["태그"],
    images: ["이미지_주소"],
    favoriteCount: 0,
  },
  {
    name: "초콜릿",
    description: "두바이 초콜릿",
    price: 100000,
    tags: ["초콜릿", "간식"],
    images: ["url"],
    favoriteCount: 0,
  },
  {
    name: "보스헤드셋",
    description: "string",
    price: 1,
    tags: ["ㅇㅇ"],
    images: ["ㅋㅋ"],
    favoriteCount: 0,
  },
  {
    name: "string",
    description: "string",
    price: 12,
    tags: ["string"],
    images: ["string"],
    favoriteCount: 0,
  },
  {
    name: "새 상품",
    description: "이것은 새 상품입니다",
    price: 100,
    tags: ["태그1", "태그2"],
    images: ["이미지_주소"],
    favoriteCount: 0,
  },
  {
    name: "고디바 초콜릿",
    description: "이것은 고디바입니다",
    price: 100,
    tags: ["초콜릿", "달달"],
    images: ["이미지_주소"],
    favoriteCount: 0,
  },
  {
    name: "아이폰 16pro",
    description: "막 출시된 핸드폰 입니다.",
    price: 100000,
    tags: ["c타입", "라이트닝"],
    images: ["16pro.png"],
    favoriteCount: 0,
  },
  {
    name: "새 상품",
    description: "이것은 새 상품입니다",
    price: 100,
    tags: ["태그1", "태그2"],
    images: ["이미지_주소"],
    favoriteCount: 0,
  },
  {
    name: "초콜릿",
    description: "두바이 초콜릿",
    price: 100000,
    tags: ["초콜릿", "간식"],
    images: ["url"],
    favoriteCount: 0,
  },
  {
    name: "초콜릿",
    description: "두바이 초콜릿",
    price: 100000,
    tags: ["초콜릿", "간식"],
    images: ["url"],
    favoriteCount: 0,
  },
  {
    name: "string",
    description: "string",
    price: 12,
    tags: ["string"],
    images: ["string"],
    favoriteCount: 0,
  },
  {
    name: "string",
    description: "string",
    price: 12,
    tags: ["string"],
    images: ["string"],
    favoriteCount: 0,
  },
  {
    name: "string",
    description: "string",
    price: 12,
    tags: ["string"],
    images: ["string"],
    favoriteCount: 0,
  },
  {
    name: "string",
    description: "string",
    price: 12,
    tags: ["string"],
    images: ["string"],
    favoriteCount: 0,
  },
  {
    name: "초콜릿",
    description: "두바이 초콜릿",
    price: 100000,
    tags: ["초콜릿", "간식"],
    images: ["url"],
    favoriteCount: 0,
  },
  {
    name: "초콜릿",
    description: "두바이 초콜릿",
    price: 100000,
    tags: ["초콜릿", "간식"],
    images: ["url"],
    favoriteCount: 0,
  },
  {
    name: "피데기",
    description: "포항 구룡포 피데기",
    price: 20000,
    tags: ["해산물", "포항", "구룡포"],
    images: ["https://imagecdn.skstoa.com/goods/422/26466422_g.jpg"],
    favoriteCount: 0,
  },
  {
    name: "랍스타",
    description: "캐나다산 랍스타",
    price: 80000,
    tags: ["해산물", "캐나다"],
    images: ["https://sitem.ssgcdn.com/99/24/95/item/1000081952499_i1_750.jpg"],
    favoriteCount: 0,
  },
  {
    name: "wolverene ver3",
    description: "marvel hot toy",
    price: 480000,
    tags: ["X-MAN", "wolverene", "Logan"],
    images: ["https://telegra.ph/file/58226d9dd211ecb20c665.jpg"],
    favoriteCount: 0,
  },
  {
    name: "test",
    description: "test",
    price: 12345,
    tags: ["test1", "test2"],
    images: ["test.jpg"],
    favoriteCount: 0,
  },
  {
    name: "하늘",
    description: "푸른 하늘",
    price: 5000,
    tags: ["nature"],
    images: ["sky.jpg"],
    favoriteCount: 0,
  },
];

export default products;
