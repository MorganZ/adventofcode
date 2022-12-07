const input = require('fs').readFileSync('./7/input.txt', 'utf-8').split("\r\n");

const root = { dir: "@", children: [] };

const AnalyseConsoleOutput = (currentDir, input) => {
  if (input.length === 0 && currentDir.dir === "@") return;
  if (input.length === 0) input.push("$ cd ..");
  
  const data = input.shift().split(" ");
  const command = data[0] === "$" ? data[1] : data[0];
  
  switch (command) {
    case "cd":
      const dirName = data[2];
      switch (dirName) {
        case "/":
          currentDir = { dir: dirName, children: [], parent: currentDir };
          root.children.push(currentDir);
          break;
        case "..":
          currentDir.size = currentDir.children.reduce((p, child) => p + child.size, 0);
          currentDir = currentDir.parent;
          break;
        default:
          currentDir = currentDir.children.find(child => child.dir === dirName);
      }
      break;
    case "ls": break;
    case "dir":
      currentDir.children.push({ dir: data[1], children: [], parent: currentDir });
      break;
    default:
      currentDir.children.push({ file: data[1], size: parseInt(data[0]), parent: currentDir });
  }
  AnalyseConsoleOutput(currentDir, input);
}

AnalyseConsoleOutput(root, input);

// 1
const sumDirLowerThan100000 = dir => 
  dir.children.reduce((p, child) => p + (child.dir ? sumDirLowerThan100000(child) : 0), dir.size <= 100000 ? dir.size : 0);
console.log(sumDirLowerThan100000(root.children[0]));

// 2
const space = Math.abs(70000000 - 30000000 - root.children[0].size);
const findAll = dir => 
  dir.children.reduce((p, child) => (child.dir ? p.push(...findAll(child)) : p, p), dir.size > space ? [dir] : []);

console.log(findAll(root.children[0]).sort((a, b) => a.size - b.size)[0].size);