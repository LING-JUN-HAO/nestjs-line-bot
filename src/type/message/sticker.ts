export const stickerData = [
  {
    packageId: '446',
    title: 'Moon: Special Edition',
    stickerIds: ['1988', '1989', '1990', '1991', '1992'],
  },
  {
    packageId: '789',
    title: 'Sally: Special Edition',
    stickerIds: ['10855', '10856', '10857', '10858', '10859'],
  },
  {
    packageId: '1070',
    title: 'Moon: Special Edition',
    stickerIds: ['17839', '17840', '17841', '17842', '17843'],
  },
  {
    packageId: '6136',
    title: 'LINE Characters: Making Amends',
    stickerIds: ['10551376', '10551377', '10551378', '10551379', '10551380'],
  },
  {
    packageId: '6325',
    title: 'Brown and Cony Fun Size Pack',
    stickerIds: ['10979904', '10979905', '10979906', '10979907', '10979908'],
  },
  {
    packageId: '6359',
    title: 'Brown and Cony Fun Size Pack',
    stickerIds: ['11069848', '11069849', '11069850', '11069851', '11069852'],
  },
  {
    packageId: '6362',
    title: 'Brown and Cony Fun Size Pack',
    stickerIds: ['11087920', '11087921', '11087922', '11087923', '11087924'],
  },
  {
    packageId: '6370',
    title: 'Brown and Cony Fun Size Pack',
    stickerIds: ['11088016', '11088017', '11088018', '11088019', '11088020'],
  },
  {
    packageId: '6632',
    title: 'LINE Characters: Making Amends',
    stickerIds: ['11825374', '11825375', '11825376', '11825377', '11825378'],
  },
  {
    packageId: '8515',
    title: 'LINE Characters: Pretty Phrases',
    stickerIds: ['16581242', '16581243', '16581244', '16581245', '16581246'],
  },
  {
    packageId: '8522',
    title: 'LINE Characters: Pretty Phrases',
    stickerIds: ['16581266', '16581267', '16581268', '16581269', '16581270'],
  },
  {
    packageId: '8525',
    title: 'LINE Characters: Pretty Phrases',
    stickerIds: ['16581290', '16581291', '16581292', '16581293', '16581294'],
  },
  {
    packageId: '11537',
    title: 'Brown & Cony & Sally: Animated Special',
    stickerIds: ['52002734', '52002735', '52002736', '52002737', '52002738'],
  },
  {
    packageId: '11538',
    title: 'CHOCO & Friends: Animated Special',
    stickerIds: ['51626494', '51626495', '51626496', '51626497', '51626498'],
  },
  {
    packageId: '11539',
    title: 'UNIVERSTAR BT21: Animated Special',
    stickerIds: ['51626500', '51626501', '51626502', '51626503', '51626504'],
  },
] as const;

export type StickerMap = {
  [K in (typeof stickerData)[number]['packageId']]: Extract<
    (typeof stickerData)[number],
    { packageId: K }
  >['stickerIds'][number][];
};

export type StickerMessageReq = {
  [K in keyof StickerMap]: {
    packageId: K;
    stickerId: StickerMap[K][number];
  };
}[keyof StickerMap];
