import { StoriesImg1 } from "../images/svg/mocks/StoriesImg1";
import { StoriesImg2 } from "../images/svg/mocks/StoriesImg2";
import { StoriesImg3 } from "../images/svg/mocks/StoriesImg3";
import { StoriesImg4 } from "../images/svg/mocks/StoriesImg4";
import { StoriesImg5 } from "../images/svg/mocks/StoriesImg5";

const defaultWidth = 75;
const defaultHeight = 75;

export const stories = [
  {
    id: 1,
    pic: <StoriesImg1 width={defaultWidth} height={defaultHeight} />,
    title: "Stories",
  },
  {
    id: 2,
    pic: <StoriesImg2 width={defaultWidth} height={defaultHeight} />,
    title: "Depoimentos",
  },
  {
    id: 3,
    pic: <StoriesImg3 width={defaultWidth} height={defaultHeight} />,
    title: "Dia a dia",
  },
  {
    id: 4,
    pic: <StoriesImg4 width={defaultWidth} height={defaultHeight} />,
    title: "Sobre nós",
  },
  {
    id: 5,
    pic: <StoriesImg5 width={defaultWidth} height={defaultHeight} />,
    title: "Nossos produtos",
  },
];
