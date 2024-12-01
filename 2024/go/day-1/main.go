package main

import (
	"fmt"
	"os"
	"sort"
	"strings"
)

func abs(x int) int {
	if x < 0 {
		return -x
	}
	return x
}

func main() {
	input, _ := os.ReadFile("input.txt")

	var left, right []int
	counts := make(map[int]int)

	lines := strings.Split(strings.TrimSpace(string(input)), "\n")
	for _, s := range lines {
		var a, b int
		_, _ = fmt.Sscanf(s, "%d %d", &a, &b)
		left, right = append(left, a), append(right, b)
		counts[b]++
	}

	sort.Ints(left)
	sort.Ints(right)

	part1, part2 := 0, 0
	for i := range left {
		part1 += abs(right[i] - left[i])
		part2 += left[i] * counts[left[i]]
	}

	fmt.Printf("1: %d\n", part1)
	fmt.Printf("2: %d\n", part2)
}
