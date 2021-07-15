import { Point } from "./point";

/**
 * Converts an angle in radians to an angle in degrees by multiplying with 180 and dividing by 180
 * @param angleInRadians
 */
export const radiansToDegrees = (angleInRadians: number) => {
  return (angleInRadians * 180) / Math.PI;
};

/**
 * Convert an angle in degrees to an angle in radians by multiplying by PI and dividing the result by 180
 * https://www.mathwarehouse.com/trigonometry/radians/convert-degee-to-radians.php
 * @param angleInDegrees
 */
export const degreesToRadians = (angleInDegrees: number) => {
  return (angleInDegrees * Math.PI) / 180;
};

/**
 * Convert a point object to an array of longitude,latitude
 * @param point
 */
export const pointToLongLatArray = (point: Point) => {
  return [point.longitude, point.latitude];
};

/**
 * Get a new point given a point, distance and bearing
 * https://www.igismap.com/formula-to-find-bearing-or-heading-angle-between-two-points-latitude-longitude/#:~:text=Here%20is%20the%20formula%20to,%E2%80%93%20sin%20la1%20*%20sin%20la2)
 */
export const getRelativePointByDistance = (
  point: Point,
  distance: number,
  bearing: number
): Point => {
  const latitude = Math.asin(
    Math.sin(point.latitude) * Math.cos(distance) +
      Math.cos(point.latitude) * Math.sin(distance) * Math.cos(bearing)
  );
  const longitude =
    point.longitude +
    Math.atan2(
      Math.sin(bearing) * Math.sin(distance) * Math.cos(point.latitude),
      Math.cos(distance) - Math.sin(point.latitude) * Math.sin(latitude)
    );

  return {
    latitude: radiansToDegrees(latitude),
    longitude: radiansToDegrees(longitude),
  };
};
