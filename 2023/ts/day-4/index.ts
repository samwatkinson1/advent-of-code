import { readFile } from "fs/promises"

async function main() {
    const input = (await readFile("input.txt")).toString()

    const one = input
        .split("\n")
        .reduce((acc, cur) => {
            const [first, rest] = cur.split("|")
            const [_, card] = first.split(":")
            const winning = card.split(/\s/).map(Number).filter(v => !!v)
            const results = rest.split(/\s/).map(Number).filter(v => !!v)
            const matches = results.filter(v => winning.includes(v)).length
            if (matches > 0) acc += 2 ** (matches - 1)
            return acc
        }, 0)
    console.log(`1: ${one}`)

    const lines = input.split("\n")
    const n: number[] = Array(lines.length).fill(0)
    lines.forEach((line, i) => {
        const [first, rest] = line.split("|")
        const [_, card] = first.split(":")
        const winning = card.split(/\s/).map(Number).filter(v => !!v)
        const results = rest.split(/\s/).map(Number).filter(v => !!v)
        const matches = results.filter(v => winning.includes(v)).length

        n[i] += 1
        for (let j = 0; j < matches; j++) {
            n[i + 1 + j] += n[i]
        }

    })
    const two = n.reduce((a, b) => a + b)
    console.log(`2: ${two}`)

}

main()