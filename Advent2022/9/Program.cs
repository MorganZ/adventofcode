using System;
using System.Collections.Generic;
using System.IO;

namespace RopeSimulation
{
    class RopeSegment
    {
        public int X { get; set; }
        public int Y { get; set; }
    }

    class Program
    {
        static Dictionary<char, (int x, int y)> dirToVector = new Dictionary<char, (int x, int y)>
        {
            { 'U', (x: 0, y: 1) },
            { 'D', (x: 0, y: -1) },
            { 'L', (x: -1, y: 0) },
            { 'R', (x: 1, y: 0) }
        };

        static void Main(string[] args)
        {
            var instructions = File.ReadAllText("./input.txt").Split('\n');
            var moves = new List<((int x, int y) direction, int distance)>();
            foreach (var instruction in instructions)
            {
                var direction = dirToVector[instruction[0]];
                var distance = int.Parse(instruction.Substring(1));
                moves.Add((direction, distance));
            }

            foreach (var ropeSize in new int[] { 2, 10 })
            {
                var rope = new List<RopeSegment>();
                for (int i = 0; i < ropeSize; i++)
                {
                    rope.Add(new RopeSegment { X = 0, Y = 0 });
                }

                var visited = new HashSet<string> { "0,0" };

                foreach (var move in moves)
                {
                    var (direction, distance) = move;
                    for (int i = 0; i < distance; i++)
                    {
                        var head = rope[0];
                        head.X += direction.x;
                        head.Y += direction.y;
                        for (int index = 1; index < rope.Count; index++)
                        {
                            head = rope[index - 1];
                            var tail = rope[index];
                            var x = head.X - tail.X;
                            var y = head.Y - tail.Y;
                            if (Math.Abs(x) > 1 || Math.Abs(y) > 1)
                            {
                                tail.X += Math.Sign(x);
                                tail.Y += Math.Sign(y);
                                if (index == rope.Count - 1)
                                    visited.Add($"{tail.X},{tail.Y}");

                            }
                            else break;
                        }
                    }
                }

                Console.WriteLine(visited.Count);
            }
        }
    }
}
