// Central definition of every calculator in the app.
// Each entry: id, title, short description, list of input fields, and a compute(values) -> [{label, value}] function.
// Keeping everything data-driven means adding a new calculator later is just adding one object to this array.

const round = (n, d = 2) => {
  const f = Math.pow(10, d);
  return Math.round((n + Number.EPSILON) * f) / f;
};
const ceil = (n) => Math.ceil(n);

export const CALCULATORS = [
  {
    id: "concrete",
    title: "Concrete Calculator",
    description: "Slabs, footings & posts — cubic yards and bags needed",
    icon: "\u{1F9F1}",
    fields: [
      { key: "length", label: "Length (ft)", placeholder: "e.g. 10" },
      { key: "width", label: "Width (ft)", placeholder: "e.g. 10" },
      { key: "depth", label: "Depth (in)", placeholder: "e.g. 4" },
    ],
    compute: (v) => {
      const L = parseFloat(v.length) || 0;
      const W = parseFloat(v.width) || 0;
      const D = (parseFloat(v.depth) || 0) / 12;
      const cubicFt = L * W * D;
      const cubicYd = cubicFt / 27;
      const bags80lb = ceil(cubicFt / 0.6);
      const bags60lb = ceil(cubicFt / 0.45);
      return [
        { label: "Cubic feet", value: round(cubicFt) },
        { label: "Cubic yards", value: round(cubicYd) },
        { label: "80lb bags needed", value: bags80lb },
        { label: "60lb bags needed", value: bags60lb },
      ];
    },
  },
  {
    id: "paint",
    title: "Paint Calculator",
    description: "How many gallons for your walls",
    icon: "\u{1F3A8}",
    fields: [
      { key: "area", label: "Total wall area (sq ft)", placeholder: "e.g. 400" },
      { key: "coats", label: "Number of coats", placeholder: "e.g. 2" },
      { key: "coverage", label: "Coverage per gallon (sq ft)", placeholder: "350" },
    ],
    compute: (v) => {
      const area = parseFloat(v.area) || 0;
      const coats = parseFloat(v.coats) || 1;
      const coverage = parseFloat(v.coverage) || 350;
      const gallonsExact = (area * coats) / coverage;
      const gallonsToBuy = ceil(gallonsExact);
      return [
        { label: "Gallons needed (exact)", value: round(gallonsExact) },
        { label: "Gallons to buy", value: gallonsToBuy },
      ];
    },
  },
  {
    id: "tile",
    title: "Tile Calculator",
    description: "Floor or wall tiles with waste allowance",
    icon: "\u{1F9F1}",
    fields: [
      { key: "roomLength", label: "Room length (ft)", placeholder: "e.g. 12" },
      { key: "roomWidth", label: "Room width (ft)", placeholder: "e.g. 10" },
      { key: "tileWidth", label: "Tile width (in)", placeholder: "e.g. 12" },
      { key: "tileLength", label: "Tile length (in)", placeholder: "e.g. 12" },
      { key: "waste", label: "Waste allowance (%)", placeholder: "10" },
    ],
    compute: (v) => {
      const roomArea = (parseFloat(v.roomLength) || 0) * (parseFloat(v.roomWidth) || 0);
      const tileAreaSqFt = ((parseFloat(v.tileWidth) || 1) * (parseFloat(v.tileLength) || 1)) / 144;
      const waste = (parseFloat(v.waste) || 0) / 100;
      const tilesExact = tileAreaSqFt > 0 ? roomArea / tileAreaSqFt : 0;
      const tilesWithWaste = ceil(tilesExact * (1 + waste));
      return [
        { label: "Room area (sq ft)", value: round(roomArea) },
        { label: "Tiles needed (with waste)", value: tilesWithWaste },
      ];
    },
  },
  {
    id: "drywall",
    title: "Drywall Calculator",
    description: "Sheets of drywall for walls & ceilings",
    icon: "\u{1F6D6}",
    fields: [
      { key: "area", label: "Total wall + ceiling area (sq ft)", placeholder: "e.g. 600" },
      { key: "waste", label: "Waste allowance (%)", placeholder: "10" },
    ],
    compute: (v) => {
      const area = parseFloat(v.area) || 0;
      const waste = (parseFloat(v.waste) || 0) / 100;
      const sheetArea = 32; // standard 4x8 sheet
      const sheets = ceil((area * (1 + waste)) / sheetArea);
      return [{ label: "4x8 sheets needed", value: sheets }];
    },
  },
  {
    id: "mulch",
    title: "Mulch & Soil Calculator",
    description: "Cubic yards for beds, gardens & landscaping",
    icon: "\u{1F33F}",
    fields: [
      { key: "area", label: "Area (sq ft)", placeholder: "e.g. 200" },
      { key: "depth", label: "Depth (in)", placeholder: "e.g. 3" },
    ],
    compute: (v) => {
      const area = parseFloat(v.area) || 0;
      const depth = (parseFloat(v.depth) || 0) / 12;
      const cubicYd = (area * depth) / 27;
      const bags2cf = ceil((area * depth) / 2);
      return [
        { label: "Cubic yards needed", value: round(cubicYd) },
        { label: "2 cu ft bags needed", value: bags2cf },
      ];
    },
  },
  {
    id: "wallpaper",
    title: "Wallpaper Calculator",
    description: "Rolls needed for a room",
    icon: "\u{1F4DC}",
    fields: [
      { key: "area", label: "Total wall area (sq ft)", placeholder: "e.g. 300" },
      { key: "coverage", label: "Usable coverage per roll (sq ft)", placeholder: "30" },
    ],
    compute: (v) => {
      const area = parseFloat(v.area) || 0;
      const coverage = parseFloat(v.coverage) || 30;
      const rolls = ceil(area / coverage);
      return [{ label: "Rolls needed", value: rolls }];
    },
  },
  {
    id: "flooring",
    title: "Flooring Calculator",
    description: "Laminate, hardwood or vinyl — boxes needed",
    icon: "\u{1FAB5}",
    fields: [
      { key: "area", label: "Room area (sq ft)", placeholder: "e.g. 250" },
      { key: "waste", label: "Waste allowance (%)", placeholder: "10" },
      { key: "boxCoverage", label: "Coverage per box (sq ft)", placeholder: "20" },
    ],
    compute: (v) => {
      const area = parseFloat(v.area) || 0;
      const waste = (parseFloat(v.waste) || 0) / 100;
      const boxCoverage = parseFloat(v.boxCoverage) || 20;
      const totalArea = area * (1 + waste);
      const boxes = ceil(totalArea / boxCoverage);
      return [
        { label: "Total sq ft (with waste)", value: round(totalArea) },
        { label: "Boxes needed", value: boxes },
      ];
    },
  },
  {
    id: "fencing",
    title: "Fencing Calculator",
    description: "Posts and panels for a perimeter",
    icon: "\u{1F6A7}",
    fields: [
      { key: "perimeter", label: "Total fence length (ft)", placeholder: "e.g. 150" },
      { key: "spacing", label: "Post spacing (ft)", placeholder: "8" },
    ],
    compute: (v) => {
      const perimeter = parseFloat(v.perimeter) || 0;
      const spacing = parseFloat(v.spacing) || 8;
      const panels = ceil(perimeter / spacing);
      const posts = panels + 1;
      return [
        { label: "Panels needed", value: panels },
        { label: "Posts needed", value: posts },
      ];
    },
  },
  {
    id: "boardfeet",
    title: "Board Feet Calculator",
    description: "Lumber volume and cost for woodworking",
    icon: "\u{1FAB5}",
    fields: [
      { key: "thickness", label: "Thickness (in)", placeholder: "e.g. 1" },
      { key: "width", label: "Width (in)", placeholder: "e.g. 6" },
      { key: "length", label: "Length (ft)", placeholder: "e.g. 8" },
      { key: "qty", label: "Quantity (pieces)", placeholder: "1" },
      { key: "price", label: "Price per board foot ($)", placeholder: "e.g. 4.50" },
    ],
    compute: (v) => {
      const thickness = parseFloat(v.thickness) || 0;
      const width = parseFloat(v.width) || 0;
      const length = parseFloat(v.length) || 0;
      const qty = parseFloat(v.qty) || 1;
      const price = parseFloat(v.price) || 0;
      const bfEach = (thickness * width * length) / 12;
      const bfTotal = bfEach * qty;
      const cost = bfTotal * price;
      return [
        { label: "Board feet (each)", value: round(bfEach) },
        { label: "Total board feet", value: round(bfTotal) },
        { label: "Estimated cost", value: `$${round(cost)}` },
      ];
    },
  },
  {
    id: "roofing",
    title: "Roofing Calculator",
    description: "Shingle squares and bundles needed",
    icon: "\u{1F3E0}",
    fields: [
      { key: "area", label: "Roof area (sq ft)", placeholder: "e.g. 2000" },
      { key: "waste", label: "Waste allowance (%)", placeholder: "10" },
    ],
    compute: (v) => {
      const area = parseFloat(v.area) || 0;
      const waste = (parseFloat(v.waste) || 0) / 100;
      const squares = (area * (1 + waste)) / 100;
      const bundles = ceil(squares * 3); // 3 bundles per square, standard
      return [
        { label: "Roofing squares", value: round(squares) },
        { label: "Bundles needed", value: bundles },
      ];
    },
  },
];
