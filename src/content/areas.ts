/**
 * Areas shown on the "Areas we cover" page and in the search-engine data (areaServed).
 *
 * CFA is based in Birmingham and is currently recruiting foster carers across the East and West Midlands.
 * These are the standard local-authority areas of those two regions. CONFIRM WITH THE AGENCY: set `covered`
 * to false for any area where it is not recruiting yet (they all start as covered).
 */
export type Region = "West Midlands" | "East Midlands";

export const regions: Region[] = ["West Midlands", "East Midlands"];

export const areas: { name: string; region: Region; covered: boolean }[] = [
  // West Midlands
  { name: "Birmingham", region: "West Midlands", covered: true },
  { name: "Coventry", region: "West Midlands", covered: true },
  { name: "Dudley", region: "West Midlands", covered: true },
  { name: "Herefordshire", region: "West Midlands", covered: true },
  { name: "Sandwell", region: "West Midlands", covered: true },
  { name: "Shropshire", region: "West Midlands", covered: true },
  { name: "Solihull", region: "West Midlands", covered: true },
  { name: "Staffordshire", region: "West Midlands", covered: true },
  { name: "Stoke-on-Trent", region: "West Midlands", covered: true },
  { name: "Telford and Wrekin", region: "West Midlands", covered: true },
  { name: "Walsall", region: "West Midlands", covered: true },
  { name: "Warwickshire", region: "West Midlands", covered: true },
  { name: "Wolverhampton", region: "West Midlands", covered: true },
  { name: "Worcestershire", region: "West Midlands", covered: true },
  // East Midlands
  { name: "Derby", region: "East Midlands", covered: true },
  { name: "Derbyshire", region: "East Midlands", covered: true },
  { name: "Leicester", region: "East Midlands", covered: true },
  { name: "Leicestershire", region: "East Midlands", covered: true },
  { name: "Lincolnshire", region: "East Midlands", covered: true },
  { name: "Northamptonshire", region: "East Midlands", covered: true },
  { name: "Nottingham", region: "East Midlands", covered: true },
  { name: "Nottinghamshire", region: "East Midlands", covered: true },
  { name: "Rutland", region: "East Midlands", covered: true },
];
