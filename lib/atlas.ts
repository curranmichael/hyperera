// The atlas model: curated cities, each with a stack of georeferenced historic
// maps. Today these are hand-picked placeholder arrays; like `lib/stories.ts`,
// the accessors are async so a later swap to Neon is a query change, not a
// refactor.
//
// Every era references maps georeferenced through Allmaps (allmaps.org), which
// warps IIIF scans from the holding institutions onto the modern web-mercator
// grid and serves them as standard XYZ raster tiles. Curation workflow:
// find candidates with the Allmaps API's spatial search (note: lat,lng order)
//   https://annotations.allmaps.org/maps.geojson?intersects={s},{w},{n},{e}
// then verify each id before adding it here:
//   curl -sf https://annotations.allmaps.org/maps/{id}        -> annotation
//   curl -sf https://allmaps.xyz/maps/{id}/tiles.json         -> TileJSON whose
//   bounds must cover the city center. Prefer single-sheet, city-wide maps;
// multi-sheet maps work by listing every sheet id in `mapIds`.

export interface AtlasEra {
  id: string; // stable slug, unique across all locations (used as layer id)
  year: number; // slider ordering + tick label
  label: string; // short label shown on the slider, usually the year
  title: string; // the map's title as catalogued
  mapIds: string[]; // Allmaps map ids; more than one for multi-sheet maps
  // Self-hosted Georeference Annotations (public/annotations/*.json) for maps
  // we georeferenced ourselves because nobody had done them in Allmaps yet.
  // The tile server warps any annotation it can fetch, not just its own
  // database — so these serve exactly like mapIds.
  annotationUrls?: string[];
  attribution: string; // the credit line the institution requests
  license: string; // "Public domain" | "CC BY-NC-SA 3.0" | ...
  sourceHref: string; // institution catalog page for the map
}

export interface AtlasLocation {
  slug: string;
  name: string;
  center: [number, number]; // [lng, lat]
  zoom: number; // initial zoom
  eras: AtlasEra[]; // ascending by year; the "Today" stop is implicit
}

// Single home for the Allmaps endpoints. The tile server (a community-run
// Cloudflare Worker) warps IIIF tiles into XYZ on the fly; if it ever proves
// flaky the fallback is client-side warping via @allmaps/maplibre's
// WarpedMapLayer fed with `annotationUrl(mapId)` (requires maxPitch: 0, which
// AtlasMap already sets).
export function tileJsonUrl(mapId: string): string {
  return `https://allmaps.xyz/maps/${mapId}/tiles.json`;
}

export function annotationUrl(mapId: string): string {
  return `https://annotations.allmaps.org/maps/${mapId}`;
}

// Every TileJSON endpoint an era draws from: Allmaps-database maps by id,
// plus any self-hosted georeference annotations.
export function eraTileJsonUrls(era: AtlasEra): string[] {
  return [
    ...era.mapIds.map(tileJsonUrl),
    ...(era.annotationUrls ?? []).map(
      (url) => `https://allmaps.xyz/tiles.json?url=${encodeURIComponent(url)}`,
    ),
  ];
}

// Most eras come from the David Rumsey Map Collection, whose scans are
// CC BY-NC-SA 3.0 with the credit line below; Berlin adds two public-domain
// plans from the Zentral- und Landesbibliothek Berlin. Ids verified against
// annotations.allmaps.org and allmaps.xyz on 2 July 2026.
const RUMSEY_CREDIT =
  "David Rumsey Map Collection, David Rumsey Map Center, Stanford University Libraries";
const RUMSEY_LICENSE = "CC BY-NC-SA 3.0";
const ZLB_CREDIT = "Zentral- und Landesbibliothek Berlin";
const ZLB_LICENSE = "Public domain";

const locations: AtlasLocation[] = [
  {
    slug: "san-francisco",
    name: "San Francisco",
    center: [-122.43, 37.77],
    zoom: 12,
    eras: [
      {
        id: "sf-1857-coast-survey",
        year: 1857,
        label: "1857",
        title: "U.S. Coast Survey: City of San Francisco and Its Vicinity",
        mapIds: ["efeb161660a33a01"],
        attribution: RUMSEY_CREDIT,
        license: RUMSEY_LICENSE,
        sourceHref:
          "https://www.davidrumsey.com/luna/servlet/detail/RUMSEY~8~1~239938~5512085",
      },
      {
        id: "sf-1873-latest-surveys",
        year: 1873,
        label: "1873",
        title: "San Francisco from Latest Surveys",
        mapIds: ["36d6e1b4b2b303c2"],
        attribution: RUMSEY_CREDIT,
        license: RUMSEY_LICENSE,
        sourceHref:
          "https://www.davidrumsey.com/luna/servlet/detail/RUMSEY~8~1~29343~112085",
      },
      {
        id: "sf-1891-map-of-sf",
        year: 1891,
        label: "1891",
        title: "Map of San Francisco",
        mapIds: ["3c4a03b297075b2a"],
        attribution: RUMSEY_CREDIT,
        license: RUMSEY_LICENSE,
        sourceHref:
          "https://www.davidrumsey.com/luna/servlet/detail/RUMSEY~8~1~261012~5523153",
      },
      {
        id: "sf-1911-chevalier",
        year: 1911,
        label: "1911",
        title: "The “Chevalier” Commercial, Pictorial and Tourist Map of San Francisco",
        mapIds: ["e1e779d2086106b4"],
        attribution: RUMSEY_CREDIT,
        license: RUMSEY_LICENSE,
        sourceHref:
          "https://www.davidrumsey.com/luna/servlet/detail/RUMSEY~8~1~3334~330001",
      },
      {
        id: "sf-1938-city-county",
        year: 1938,
        label: "1938",
        title: "City and County of San Francisco",
        mapIds: ["fbf5ae8466dd6c9f"],
        attribution: RUMSEY_CREDIT,
        license: RUMSEY_LICENSE,
        sourceHref:
          "https://www.davidrumsey.com/luna/servlet/detail/RUMSEY~8~1~248515~5515941",
      },
    ],
  },
  {
    slug: "new-york",
    name: "New York",
    center: [-73.985, 40.735],
    zoom: 12,
    eras: [
      {
        id: "nyc-1782-british-hq",
        year: 1782,
        label: "1782",
        title: "British Headquarters Map of New York & Environs (Stevens facsimile)",
        mapIds: ["c9f94420d2341fe6"],
        attribution: RUMSEY_CREDIT,
        license: RUMSEY_LICENSE,
        sourceHref:
          "https://www.davidrumsey.com/luna/servlet/detail/RUMSEY~8~1~243023~5513279",
      },
      {
        id: "nyc-1852-dripps",
        year: 1852,
        label: "1852",
        title: "City of New York Extending Northward to Fiftieth St.",
        mapIds: ["20c5d23f91d89a0c"],
        attribution: RUMSEY_CREDIT,
        license: RUMSEY_LICENSE,
        sourceHref:
          "https://www.davidrumsey.com/luna/servlet/detail/RUMSEY~8~1~3018~90020002",
      },
      {
        id: "nyc-1865-viele",
        year: 1865,
        label: "1865",
        title: "Sanitary & Topographical Map of the City and Island of New York",
        mapIds: ["af0820fab62d7b60"],
        attribution: RUMSEY_CREDIT,
        license: RUMSEY_LICENSE,
        sourceHref:
          "https://www.davidrumsey.com/luna/servlet/detail/RUMSEY~8~1~2289~180029",
      },
      {
        id: "nyc-1880-guide",
        year: 1880,
        label: "1880",
        title: "New-York City Guide Map",
        mapIds: ["12b5b2aa3df12077"],
        attribution: RUMSEY_CREDIT,
        license: RUMSEY_LICENSE,
        sourceHref:
          "https://www.davidrumsey.com/luna/servlet/detail/RUMSEY~8~1~235924~5510661",
      },
      {
        id: "nyc-1939-complete",
        year: 1939,
        label: "1939",
        title: "The Complete Map of New York (Manhattan)",
        mapIds: ["9ab5c3a94a94dc73"],
        attribution: RUMSEY_CREDIT,
        license: RUMSEY_LICENSE,
        sourceHref:
          "https://www.davidrumsey.com/luna/servlet/detail/RUMSEY~8~1~340591~90108842",
      },
    ],
  },
  {
    slug: "london",
    name: "London",
    center: [-0.106, 51.512],
    zoom: 12,
    eras: [
      {
        id: "lon-1746-rocque",
        year: 1746,
        label: "1746",
        title: "A Contracted Sketch of the Plan of London (index to Rocque’s survey)",
        mapIds: ["7b3c6a9851d596a6"],
        attribution: RUMSEY_CREDIT,
        license: RUMSEY_LICENSE,
        sourceHref:
          "https://www.davidrumsey.com/luna/servlet/detail/RUMSEY~8~1~287815~90041733",
      },
      {
        id: "lon-1843-sduk",
        year: 1843,
        label: "1843",
        title: "London, 1843",
        mapIds: ["f29898ce00adbc8b"],
        attribution: RUMSEY_CREDIT,
        license: RUMSEY_LICENSE,
        sourceHref:
          "https://www.davidrumsey.com/luna/servlet/detail/RUMSEY~8~1~21022~530114",
      },
      {
        id: "lon-1866-stanford",
        year: 1866,
        label: "1866",
        title: "Stanford’s Library Map of London and Its Suburbs",
        mapIds: ["2623edf672ef32d4"],
        attribution: RUMSEY_CREDIT,
        license: RUMSEY_LICENSE,
        sourceHref:
          "https://www.davidrumsey.com/luna/servlet/detail/RUMSEY~8~1~298922~90070234",
      },
      {
        id: "lon-1889-booth",
        year: 1889,
        label: "1889",
        title: "Charles Booth’s Descriptive Map of London Poverty",
        mapIds: ["821d772ebf210bfe"],
        attribution: RUMSEY_CREDIT,
        license: RUMSEY_LICENSE,
        sourceHref:
          "https://www.davidrumsey.com/luna/servlet/detail/RUMSEY~8~1~291617~90063152",
      },
      {
        id: "lon-1901-london",
        year: 1901,
        label: "1901",
        title: "London",
        mapIds: ["89da0d56a05e122d"],
        attribution: RUMSEY_CREDIT,
        license: RUMSEY_LICENSE,
        sourceHref:
          "https://www.davidrumsey.com/luna/servlet/detail/RUMSEY~8~1~273894~90047265",
      },
    ],
  },
  {
    slug: "berlin",
    name: "Berlin",
    center: [13.4, 52.517],
    zoom: 12,
    eras: [
      {
        id: "ber-1748-ville",
        year: 1748,
        label: "1748",
        title: "Plan de la ville de Berlin",
        mapIds: ["69f9096e9e4f1824"],
        attribution: RUMSEY_CREDIT,
        license: RUMSEY_LICENSE,
        sourceHref:
          "https://www.davidrumsey.com/luna/servlet/detail/RUMSEY~8~1~315673~90084475",
      },
      {
        id: "ber-1798-grundriss",
        year: 1798,
        label: "1798",
        title: "Grundriss der Königl. Residenzstädte Berlin",
        mapIds: ["b7ecb55e1c48ae64"],
        attribution: ZLB_CREDIT,
        license: ZLB_LICENSE,
        sourceHref: "https://digital.zlb.de/viewer/image/15452831/1/",
      },
      {
        id: "ber-1849-plan",
        year: 1849,
        label: "1849",
        title: "Plan von Berlin",
        mapIds: ["faf24bee8b6ecf4e"],
        attribution: RUMSEY_CREDIT,
        license: RUMSEY_LICENSE,
        sourceHref:
          "https://www.davidrumsey.com/luna/servlet/detail/RUMSEY~8~1~327192~90095831",
      },
      {
        id: "ber-1883-berlin",
        year: 1883,
        label: "1883",
        title: "Berlin",
        mapIds: ["604fb95fe2565065"],
        attribution: RUMSEY_CREDIT,
        license: RUMSEY_LICENSE,
        sourceHref:
          "https://www.davidrumsey.com/luna/servlet/detail/RUMSEY~8~1~31403~1150350",
      },
      {
        // Replaces the 1917 Karte von Gross-Berlin (5983e1a92c9f1cbd), whose
        // four control points disagree by ~2.2 km — visibly misregistered.
        // This plan's ten points agree to well under 250 m.
        id: "ber-1900-verkehrsplan",
        year: 1900,
        label: "1900",
        title: "Grosser Verkehrs-Plan von Berlin mit seinen Vororten",
        mapIds: ["0ee6bbb145596831"],
        attribution: ZLB_CREDIT,
        license: ZLB_LICENSE,
        sourceHref: "https://digital.zlb.de/viewer/image/15453873/1/",
      },
    ],
  },
  {
    slug: "munich",
    name: "Munich",
    center: [11.575, 48.137],
    zoom: 12,
    eras: [
      {
        id: "muc-1812-umgebungen",
        year: 1812,
        label: "1812",
        title: "Umgebungen von München",
        mapIds: ["d9574560319b9efe"],
        attribution: RUMSEY_CREDIT,
        license: RUMSEY_LICENSE,
        sourceHref:
          "https://www.davidrumsey.com/luna/servlet/detail/RUMSEY~8~1~332207~90100727",
      },
      {
        id: "muc-1832-sduk",
        year: 1832,
        label: "1832",
        title: "Munich (München)",
        mapIds: ["37241843630633b5"],
        attribution: RUMSEY_CREDIT,
        license: RUMSEY_LICENSE,
        sourceHref:
          "https://www.davidrumsey.com/luna/servlet/detail/RUMSEY~8~1~21023~530120",
      },
      {
        id: "muc-1869-fuehrer",
        year: 1869,
        label: "1869",
        title: "Führer durch München und dessen Ausstellungen",
        mapIds: ["a6d526a2b62c0ee3"],
        attribution: "Bayerische Staatsbibliothek",
        license: "No known copyright (non-commercial)",
        sourceHref: "https://www.digitale-sammlungen.de/en/view/bsb10373426",
      },
      {
        id: "muc-1898-vororte",
        year: 1898,
        label: "1898",
        title: "München mit den Vororten",
        mapIds: ["504f8420f8507979"],
        attribution: "Princeton University Library",
        license: "No known copyright",
        sourceHref:
          "https://figgy.princeton.edu/concern/scanned_maps/ecd06a05-ca2f-4e51-aab7-dfb219c42f6c/manifest",
      },
      {
        id: "muc-1917-city-map",
        year: 1917,
        label: "1917",
        title: "City Map of München",
        mapIds: ["e029a5ebda08f007"],
        attribution: RUMSEY_CREDIT,
        license: RUMSEY_LICENSE,
        sourceHref:
          "https://www.davidrumsey.com/luna/servlet/detail/RUMSEY~8~1~381580~90147373",
      },
    ],
  },
  {
    // Allmaps' crowd-sourced database holds only two georeferenced maps over
    // central Singapore (and one of them, Gallica-hosted, serves blank tiles
    // because the BnF blocks the tile server). The 1888 and 1893 eras are
    // Rumsey scans we georeferenced ourselves — annotations under
    // public/annotations/, control points on stable landmarks (bridges,
    // St Andrew's, the Istana, Fort Canning, the old Race Course), affine
    // residuals under ~120 m.
    slug: "singapore",
    name: "Singapore",
    center: [103.85, 1.29],
    zoom: 12,
    eras: [
      {
        id: "sgp-1888-ports",
        year: 1888,
        label: "1888",
        title: "Singapore, Atlas des ports étrangers",
        mapIds: [],
        annotationUrls: [
          "https://www.hyperera.news/annotations/singapore-1888.json",
        ],
        attribution: RUMSEY_CREDIT,
        license: RUMSEY_LICENSE,
        sourceHref:
          "https://www.davidrumsey.com/luna/servlet/detail/RUMSEY~8~1~333963~90102160",
      },
      {
        id: "sgp-1893-bartholomew",
        year: 1893,
        label: "1893",
        title: "City of Singapore, Constable’s Hand Atlas of India",
        mapIds: [],
        annotationUrls: [
          "https://www.hyperera.news/annotations/singapore-1893.json",
        ],
        attribution: RUMSEY_CREDIT,
        license: RUMSEY_LICENSE,
        sourceHref:
          "https://www.davidrumsey.com/luna/servlet/detail/RUMSEY~8~1~312816~90081949",
      },
      {
        id: "sgp-1958-city-map",
        year: 1958,
        label: "1958",
        title: "Map of the City of Singapore",
        mapIds: ["79c33793a637bed2"],
        attribution: "University of Hawaiʻi at Mānoa Library",
        license: "Public domain",
        sourceHref:
          "https://evols.library.manoa.hawaii.edu/items/e3e1c38a-4fbe-41a3-bca6-0e1e7f459d66",
      },
    ],
  },
];

export async function getAtlasLocations(): Promise<AtlasLocation[]> {
  // Alphabetical by display name, so the picker reads predictably no matter
  // what order cities were curated in above.
  return [...locations].sort((a, b) => a.name.localeCompare(b.name));
}

export async function getAtlasLocation(
  slug: string,
): Promise<AtlasLocation | null> {
  return locations.find((location) => location.slug === slug) ?? null;
}
