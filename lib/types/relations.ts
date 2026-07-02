export const RelationType = {
  PARENT: "PARENT",
  SPOUSE: "SPOUSE",
  SIBLING: "SIBLING",
  FRIEND: "FRIEND",
  COLLEAGUE: "COLLEAGUE",
  OTHER: "OTHER",
} as const;

export type RelationType = (typeof RelationType)[keyof typeof RelationType];
