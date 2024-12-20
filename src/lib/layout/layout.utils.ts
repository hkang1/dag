import { Coord } from '../dag.types';

import { CSSProperties } from './layout.types';

export function addElement<E extends HTMLElement>(
  id: string,
  addTarget: HTMLElement,
  options: Partial<{
    appendAfter: boolean;
    prepend: boolean;
    prependBefore: boolean;
    className?: string | string[];
    content?: string | HTMLElement;
    style: CSSProperties;
    tagName?: string;
  }> = {},
): E {
  // Create the element if it doesn't already exist.
  let element = document.getElementById(id);
  if (!element) {
    element = document.createElement(options.tagName ?? 'div');
    element.id = id;

    // Place element based on options.
    options.prependBefore
      ? addTarget.before(element)
      : options.appendAfter
        ? addTarget.after(element)
        : options.prepend
          ? addTarget.prepend(element)
          : addTarget.append(element);
  }

  // Apply class name if applicable.
  setElementClass(element, options.className);

  // Optionally style the element in advanced.
  setElementStyle(element, options.style);

  // Set element content if applicable.
  setElementContent(element, options.content);

  return element as E;
}

export function camelToKebab(text: string): string {
  return /-/.test(text)
    ? text
    : text
        .trim()
        .split('')
        .map((char, index) => {
          return /[a-z]/i.test(char) && char === char.toUpperCase()
            ? `${index !== 0 ? '-' : ''}${char.toLowerCase()}`
            : char;
        })
        .join('');
}

export function getArrowKey(coord0: Coord, coord1: Coord): string {
  return `${getCoordKey(coord0)}:${getCoordKey(coord1)}`;
}

export function getClassName(...args: unknown[]): string {
  return args.reduce((acc: string, arg) => {
    return !arg ? acc : [acc, Array.isArray(arg) ? arg.join(' ') : String(arg)].join(' ');
  }, '');
}

export function getContext(canvas: HTMLCanvasElement): CanvasRenderingContext2D {
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Unable to get canvas context!');
  return ctx;
}

export function getCoordKey(coord: Coord): string {
  return `${coord.x}-${coord.y}`;
}

export function getElement(target: string | HTMLElement): HTMLElement | null {
  return typeof target === 'string' ? document.getElementById(target) : target;
}

export function setElementClass(target: string | HTMLElement, className?: ClassName) {
  if (!className) return;

  const element = getElement(target);
  if (!element) return;

  element.className = getClassName(className);
}

export function setElementContent(target: string | HTMLElement, content?: string | HTMLElement) {
  if (!content) return;

  const element = getElement(target);
  if (!element) return;

  /**
   * Fastest known way to clear content from element.
   * https://stackoverflow.com/a/519280/5402432
   */
  element.innerHTML = '';

  if (typeof content === 'string') {
    element.textContent = content;
  } else if (content) {
    element.appendChild(content);
  }
}

export function setElementStyle(target: string | HTMLElement, style?: CSSProperties) {
  if (!style) return;

  const element = getElement(target);
  if (!element) return;

  for (const [key, value] of Object.entries(style)) {
    let stringValue = value == null ? null : String(value);

    // Automaticaly convert number to pixels except for some props.
    if (typeof value === 'number' && !/(zIndex|fontWeight)/i.test(key)) stringValue = `${value}px`;

    element.style.setProperty(camelToKebab(key), stringValue);
  }
}

export function sharp(px: number): number {
  return Math.round(px - 0.5) + 0.5;
}
