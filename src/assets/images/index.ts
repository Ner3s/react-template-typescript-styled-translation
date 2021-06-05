/**
 * @howToUse use the example below
 *
 * 1º Step
 * - Delete export function imageExample(){}
 *
 * 2º Step
 * - Import all images like this example
 * export { default as ImageName } from './imageName.png';
 *
 */

export { default as ReactImage } from './React.png';

export function imageExample(data: string): string {
  return data;
}
