Dictionary<char, (int x, int y)> dirToVector = new Dictionary<char, (int x, int y)>
 {{ 'U', (x: 0, y: 1) },{ 'D', (x: 0, y: -1) },{ 'L', (x: -1, y: 0) },{ 'R', (x: 1, y: 0) }};
var ropeSize = 10;
var visited = new HashSet<string> { "0,0" };
var rope = new RopeSegment[ropeSize];
for (int i = 0; i < ropeSize; i++) rope[i] = new RopeSegment { X = 0, Y = 0 };

foreach (var instruction in File.ReadAllLines("./input.txt"))
{
    var direction = dirToVector[instruction[0]];
    var distance = int.Parse(instruction.Substring(2));
    for (int _ = 0; _ < distance; _++)
    {
        var head = rope[0];
        head.X += direction.x; head.Y += direction.y;
        for (int ropeIndex = 1; ropeIndex < rope.Length; ropeIndex++)
        {
            head = rope[ropeIndex - 1];
            var tail = rope[ropeIndex];
            var x = head.X - tail.X; var y = head.Y - tail.Y;
            if (Math.Abs(x) > 1 || Math.Abs(y) > 1)
            {
                tail.X += Math.Sign(x); tail.Y += Math.Sign(y);
                if (ropeIndex == rope.Length - 1)
                    visited.Add($"{tail.X},{tail.Y}");
            }
            else break;
        }
    }
}
Console.WriteLine(visited.Count);
class RopeSegment { public int X; public int Y; }