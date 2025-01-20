export type Theme = {
  id: number;
  color: string;
  text: string;
  name: string;
  shopBox: string;
  hover: string;
  linkStyle: string;
  embosedBox: boolean;
  embosedBoxColor: string;
  boxColor: string;
  tabColor: string;
  selectedShareLinkBackgroundIndex: 0 | 1 | 2 | 3 | 4;
  shareLink_background: { background: string; textColor: string }[];
};
