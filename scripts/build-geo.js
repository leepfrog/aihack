// Regenerates geo-data.js. Usage: npm i us-atlas@3.0.1 topojson-client@3.1.0 topojson-simplify@3.0.3 all-the-cities@3.1.0 d3@7.9.0 && node scripts/build-geo.js ./node_modules
const fs = require('fs');
const topo = require(process.argv[2] + '/topojson-client'), simp = require(process.argv[2] + '/topojson-simplify');
const d3 = require(process.argv[2] + '/d3');
let t = JSON.parse(fs.readFileSync(process.argv[2] + '/us-atlas/states-albers-10m.json'));
t = simp.presimplify(t); t = simp.simplify(t, 1.5);
const fips = {"01":"AL","02":"AK","04":"AZ","05":"AR","06":"CA","08":"CO","09":"CT","10":"DE","11":"DC","12":"FL","13":"GA","15":"HI","16":"ID","17":"IL","18":"IN","19":"IA","20":"KS","21":"KY","22":"LA","23":"ME","24":"MD","25":"MA","26":"MI","27":"MN","28":"MS","29":"MO","30":"MT","31":"NE","32":"NV","33":"NH","34":"NJ","35":"NM","36":"NY","37":"NC","38":"ND","39":"OH","40":"OK","41":"OR","42":"PA","44":"RI","45":"SC","46":"SD","47":"TN","48":"TX","49":"UT","50":"VT","51":"VA","53":"WA","54":"WV","55":"WI","56":"WY","72":"PR"};
const path = d3.geoPath();
const r = v => Math.round(v*10)/10;
const fc = topo.feature(t, t.objects.states);
const states = fc.features.filter(f => fips[f.id]).map(f => {
  const d = path(f).replace(/-?\d+\.\d+/g, m => String(r(+m)));
  const [cx, cy] = path.centroid(f);
  return { code: fips[f.id], name: f.properties.name, d, cx: r(cx), cy: r(cy) };
});

const proj = d3.geoAlbersUsa().scale(1300).translate([487.5, 305]);
const cities = require(process.argv[2] + '/all-the-cities').filter(c => c.country === 'US' && (c.population >= 12000 || /PPLA$|PPLC/.test(c.featureCode)));
const seen = new Set(); const rows = [];
for (const c of cities.sort((a,b)=>b.population-a.population)) {
  const p = proj(c.loc.coordinates); if (!p) continue;
  const k = c.name.toUpperCase()+'|'+c.adminCode; if (seen.has(k)) continue; seen.add(k);
  rows.push(`${c.name}|${c.adminCode}|${Math.round(p[0])}|${Math.round(p[1])}`);
}
const out = `/* Map data for Where It Went.
   State shapes: US Census Bureau cartographic boundaries via us-atlas (ISC), pre-projected Albers USA, simplified.
   City locations: GeoNames (CC BY 4.0) via all-the-cities, US places with 12,000+ people, projected to the same frame. */
window.WIW_GEO = ${JSON.stringify({ width: 975, height: 610, states, cities: rows.join(';') })};
`;
fs.writeFileSync(require('path').join(__dirname, '..', 'geo-data.js'), out);
console.log(states.length, rows.length, (out.length/1024).toFixed(0)+'KB');
