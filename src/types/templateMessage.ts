import {
  TemplateButtons,
  TemplateConfirm,
  TemplateCarousel,
  TemplateImageCarousel,
} from '@line/bot-sdk';

export type TemplateType =
  | 'buttons'
  | 'confirm'
  | 'carousel'
  | 'image_carousel';

export type TemplateMap = {
  buttons: TemplateButtons;
  confirm: TemplateConfirm;
  carousel: TemplateCarousel;
  image_carousel: TemplateImageCarousel;
};
