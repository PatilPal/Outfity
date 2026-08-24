import type { Collection } from "../types/collection";

import Shirt from "../assets/images/shirt.png";
import Blazer from "../assets/images/blazer.png";
import Sweater from "../assets/images/sweater.png";
import Loafers from "../assets/images/loafers.png";

export const DUMMY_COLLECTIONS: Collection[] = [
  {
    id: "1",
    name: "Summer Fits",
    coverImage: Shirt,
    clothesCount: 12,
  },
  {
    id: "2",
    name: "Office Wear",
    coverImage: Blazer,
    clothesCount: 8,
  },
  {
    id: "3",
    name: "Winter Essentials",
    coverImage: Sweater,
    clothesCount: 10,
  },
  {
    id: "4",
    name: "Shoe Collection",
    coverImage: Loafers,
    clothesCount: 6,
  },
];