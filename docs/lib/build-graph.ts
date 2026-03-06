import type { Root, Node as TreeNode } from 'fumadocs-core/page-tree';

export interface GraphNode {
  id: string;
  text: string;
  description?: string;
  url: string;
  neighbors?: string[];
}

export interface GraphLink {
  source: string;
  target: string;
}

export interface Graph {
  nodes: GraphNode[];
  links: GraphLink[];
}

export function buildGraph(tree: Root): Graph {
  const nodes: GraphNode[] = [];
  const links: GraphLink[] = [];
  const seen = new Set<string>();

  function walk(items: TreeNode[], parentId?: string) {
    for (const item of items) {
      if (item.type === 'separator') continue;

      if (item.type === 'page') {
        const id = item.url;
        if (seen.has(id)) continue;
        seen.add(id);

        nodes.push({
          id,
          text: typeof item.name === 'string' ? item.name : String(item.name),
          description: item.description
            ? String(item.description)
            : undefined,
          url: item.url,
        });

        if (parentId) {
          links.push({ source: parentId, target: id });
        }
      }

      if (item.type === 'folder') {
        const folderId = item.index?.url ?? `folder-${item.name}`;

        if (item.index && !seen.has(item.index.url)) {
          seen.add(item.index.url);
          nodes.push({
            id: item.index.url,
            text:
              typeof item.name === 'string'
                ? item.name
                : String(item.name),
            description: item.index.description
              ? String(item.index.description)
              : undefined,
            url: item.index.url,
          });
        }

        if (parentId && folderId !== parentId) {
          links.push({ source: parentId, target: folderId });
        }

        walk(item.children, folderId);
      }
    }
  }

  walk(tree.children);
  return { nodes, links };
}
