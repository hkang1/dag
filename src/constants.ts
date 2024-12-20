import { faker } from '@faker-js/faker';

import { Node } from './lib/data';

faker.seed(108);

export const NODE_COUNT = 10;

export const NODES: Node[] = new Array(NODE_COUNT).fill(null).map(() => ({
  depth: NaN,
  key: faker.string.uuid().substring(0, 8),
  title: faker.person.fullName(),
}));

NODES[0].links = [ NODES[1].key, NODES[2].key, NODES[3].key ];
NODES[1].links = [ NODES[4].key, NODES[5].key ];
NODES[2].links = [ NODES[5].key, NODES[7].key ];
NODES[3].links = [ NODES[7].key ];
// NODES[4].links = [ NODES[8].key ];
NODES[5].links = [ NODES[7].key ];
// Change between 1, 2, 5, 7, 8
NODES[6].links = [ NODES[1].key ];
NODES[7].links = [ NODES[9].key ];
NODES[8].links = [ NODES[1].key ];

console.log('NODES', NODES);
