function maze_solver(maze, portals) {
  const rows = maze.length;
  const cols = maze[0].length;

  const inBounds = (r, c) => r >= 0 && r < rows && c >= 0 && c < cols;
  const keyOf = (r, c) => `(${r}, ${c})`;

  // Parses: "(r, c)" or "r,c" -> [r,c]
  function parseCoordString(s) {
    if (typeof s !== "string") return null;
    const m = s.match(/-?\d+/g);
    if (!m || m.length < 2) return null;
    return [parseInt(m[0], 10), parseInt(m[1], 10)];
  }

  // Parses: [r,c] -> [r,c]
  function parseCoordArray(a) {
    if (!Array.isArray(a) || a.length !== 2) return null;
    if (typeof a[0] !== "number" || typeof a[1] !== "number") return null;
    return [a[0], a[1]];
  }

  // Convert ANY portal value into an array of destinations [[r,c], ...]
  // Supports:
  // - [r,c]
  // - "(r,c)"
  // - [[r,c],[r2,c2]]
  // - ["(r,c)","(r2,c2)"]
  // - [r1,c1,r2,c2,...]   (flat numeric list)
  function parseDestinations(val) {
    const dests = [];

    // single string "(r,c)"
    if (typeof val === "string") {
      const p = parseCoordString(val);
      if (p) dests.push(p);
      return dests;
    }

    // single coord [r,c]
    const single = parseCoordArray(val);
    if (single) {
      dests.push(single);
      return dests;
    }

    // array of something
    if (Array.isArray(val)) {
      // flat numeric list [r1,c1,r2,c2,...]
      const allNums = val.every(x => typeof x === "number");
      if (allNums && val.length % 2 === 0) {
        for (let i = 0; i < val.length; i += 2) {
          dests.push([val[i], val[i + 1]]);
        }
        return dests;
      }

      // list of coords / strings
      for (const item of val) {
        const p1 = parseCoordArray(item);
        if (p1) { dests.push(p1); continue; }
        const p2 = parseCoordString(item);
        if (p2) { dests.push(p2); continue; }
      }
      return dests;
    }

    // unsupported type
    return dests;
  }

  // Normalize portals into Map "(r,c)" -> [[r,c], ...]
  const portalAdj = new Map();
  if (portals && typeof portals === "object") {
    for (const rawKey of Object.keys(portals)) {
      const from = parseCoordString(rawKey);
      if (!from) continue;
      const fromKey = keyOf(from[0], from[1]);
      portalAdj.set(fromKey, parseDestinations(portals[rawKey]));
    }
  }

  // Find S and E
  let start = null, end = null;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (maze[r][c] === "S") start = [r, c];
      if (maze[r][c] === "E") end = [r, c];
    }
  }
  if (!start || !end) return [-1, []];

  // BFS
  const INF = 1e15;
  const dist = Array.from({ length: rows }, () => Array(cols).fill(INF));
  const parent = Array.from({ length: rows }, () => Array(cols).fill(null));
  const visited = Array.from({ length: rows }, () => Array(cols).fill(false));

  const queue = [];
  let qIdx = 0;

  dist[start[0]][start[1]] = 0;
  queue.push(start);

  const dirs = [[-1,0],[1,0],[0,-1],[0,1]];

  while (qIdx < queue.length) {
    const [r, c] = queue[qIdx++];

    if (visited[r][c]) continue;
    visited[r][c] = true;

    for (const [dr, dc] of dirs) {
      const nr = r + dr, nc = c + dc;
      if (!inBounds(nr, nc) || maze[nr][nc] === "#") continue;

      const nd = dist[r][c] + 1;
      
      // If neighbor is a portal, walk to it and then teleport
      if (maze[nr][nc] === "P") {
        const dests = portalAdj.get(keyOf(nr, nc)) || [];
        for (const [tr, tc] of dests) {
          if (!inBounds(tr, tc) || maze[tr][tc] === "#") continue;

          // Path includes the portal and the destination
          if (nd < dist[tr][tc]) {
            dist[tr][tc] = nd;
            parent[tr][tc] = [nr, nc, r, c]; // destination parent is portal, and portal's parent is current cell
            if (!visited[tr][tc]) queue.push([tr, tc]);
          }
        }
      } else {
        // Normal cell
        if (nd < dist[nr][nc]) {
          dist[nr][nc] = nd;
          parent[nr][nc] = [r, c];
          if (!visited[nr][nc]) queue.push([nr, nc]);
        }
      }
    }
  }

  if (dist[end[0]][end[1]] === INF) return [-1, []];

  // Reconstruct path
  const path = [];
  let cur = end;
  while (cur) {
    path.push(cur);
    const p = parent[cur[0]][cur[1]];
    if (!p) break;
    // Check if parent has 4 elements (portal case)
    if (p.length === 4) {
      // p = [portalR, portalC, prevR, prevC]
      path.push([p[0], p[1]]);
      cur = [p[2], p[3]];
    } else {
      cur = p;
    }
  }
  path.reverse();

  return [dist[end[0]][end[1]], path];
}

// Export in both styles
module.exports = maze_solver;
module.exports.maze_solver = maze_solver


/* =========================
   Quick tests from prompt
   ========================= */
let maze = [
  ['S', '.', '.', 'P'],
  ['#', '#', '.', '#'],
  ['P', '.', '.', 'E'],
  ['#', '#', '#', '#']
];

let portals = {
  '(0, 3)': [2, 0],
  '(2, 0)': [0, 3]
};

const [distance, path] = maze_solver(maze, portals);
console.log(`Distance: ${distance}, Path:`, path);


let maze2 = [
  ['S', '.', '#', 'P', '#', 'P'],
  ['#', '.', '#', '.', '#', '.'],
  ['#', '.', 'P', '.', '.', 'E'],
  ['P', '#', '#', '#', '#', '#'],
  ['#', '.', '.', 'P', '.', '.']
];

let portals2 = {
  '(0, 3)': [3, 0],
  '(3, 0)': [0, 3],
  '(0, 5)': [2, 2],
  '(2, 2)': [0, 5]
};

const [distance1, path1] = maze_solver(maze2, portals2);
console.log(`Distance: ${distance1}, Path:`, path1);


let maze3 = [
  ['S', 'P', '.', '.', 'E'],
  ['#', '#', '#', '#', '#'],
  ['P', '.', '.', '.', 'P']
];

let portals3 = {
  '(0, 1)': [2, 0],
  '(2, 0)': [0, 1],
  '(2, 4)': [0, 1]
};

const [distance2, path2] = maze_solver(maze3, portals3);
console.log(`Distance: ${distance2}, Path:`, path2);