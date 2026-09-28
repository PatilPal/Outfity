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
    clothingIds: ["1", "3"],
  },
  {
    id: "2",
    name: "Office Wear",
    coverImage: Blazer,
    clothingIds: ["2"],
  },
  {
    id: "3",
    name: "Winter Essentials",
    coverImage: Sweater,
    clothingIds: ["2"],
  },
  {
    id: "4",
    name: "Shoe Collection",
    coverImage: Loafers,
    clothingIds: ["2"],
  },
];