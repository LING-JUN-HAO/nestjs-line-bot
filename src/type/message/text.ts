import { messagingApi } from '@line/bot-sdk';
type Emojis = ['001', '002', '003', '004', '005', '006', '007', '008', '009'];

type ProjectIds = [
  '670e0cce840a8236ddd4ee4c',
  '5ac2213e040ab15980c9b447',
  '5ac21a8c040ab15980c9b43f',
  '5ac21c4e031a6752fb806d5b',
  '5ac21e6c040ab15980c9b444',
];

export interface TextMessageReq {
  text: string;
  emoji?: [
    {
      index: number;
      productId: ProjectIds[number];
      emojiId: Emojis[number];
    },
  ];
  quickReplyItems?: { imageUrl?: string; action: messagingApi.Action }[];
}
