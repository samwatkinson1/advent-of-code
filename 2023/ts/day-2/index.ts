import { readFile } from "fs/promises"

function convert(cur: string) {
    return [...cur.matchAll(/(\d+)\s(blue|green|red)/g)].reduce((acc, cur) => {
        if (acc[cur[2]] <= Number(cur[1])) acc[cur[2]] = Number(cur[1])
        return acc
    }, { red: 0, green: 0, blue: 0 } as Record<string, number>)
}

async function main() {
    const input = (await readFile('input.txt')).toString().split("\n").map(convert)

    const one = input.reduce((acc, cur, index) => {
        if (cur.red > 12 || cur.green > 13 || cur.blue > 14) return acc
        return acc + (index + 1)
    }, 0)
    console.log(`1: ${one}`)

    const two = input.reduce((acc, cur) => {
        return acc + cur.red * cur.green * cur.blue
    }, 0)
    console.log(`2: ${two}`)
}

main()