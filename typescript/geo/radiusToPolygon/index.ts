import {
  degreesToRadians,
  getRelativePointByDistance,
  pointToLongLatArray,
} from "./helpers";
import { Point } from "./point";

/**
 *
 */
const options = {
  /**
   * IERS Equatorial Radius of the earth
   * https://en.wikipedia.org/wiki/Earth_ellipsoid
   */
  equatorialRadiusInMeters: 6378136.6,

  /**
   * Number of edges to create in the polygon
   * Use 360 to get a true circle
   */
  numberOfEdges: 64,
};

const input = {
  center: { latitude: 51.7543453, longitude: 5.5526647 } as Point,
  radius: 2000,
};

const coordinates = [];
for (var i = 0; i < options.numberOfEdges; ++i) {
  const newPoint = getRelativePointByDistance(
    {
      latitude: degreesToRadians(input.center.latitude),
      longitude: degreesToRadians(input.center.longitude),
    },
    input.radius / options.equatorialRadiusInMeters,
    // find bearing https://www.igismap.com/formula-to-find-bearing-or-heading-angle-between-two-points-latitude-longitude/
    (2 * Math.PI * -i) / options.numberOfEdges
  );
  coordinates.push(pointToLongLatArray(newPoint));
}
// make sure the circle is closed by pushing a copy of the first element
coordinates.push(coordinates[0]);

console.log(
  JSON.stringify(
    {
      type: "Polygon",
      coordinates: [coordinates],
    },
    null,
    2
  )
);
