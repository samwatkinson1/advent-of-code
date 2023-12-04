import { readFile } from "fs/promises"

const adjacent = (line: string, index: number, length: number) => {
    const start = index
    const end = start + (length - 1)
    return [...line.matchAll(/[^\d\.]/g)].some(
        symbol => symbol.index! >= start - 1 && symbol.index! <= end + 1
    )
}

const ratio = (line: string, index: number) => {
    return [...line.matchAll(/\d+/g)].filter(number => {
        const start = number.index!
        const end = start + (number[0].length - 1)
        return index >= start - 1 && index <= end + 1
    })
}

async function main() {
    const input = (await readFile('input.txt')).toString()

    const one = input
        .split("\n")
        .reduce((acc, cur, index, arr) => {
            const before = arr[index - 1] ?? ""
            const after = arr[index + 1] ?? ""
            for (const match of cur.matchAll(/\d+/g)) {
                if (adjacent(before, match.index!, match[0].length))
                    acc += parseInt(match[0])
                if (adjacent(cur, match.index!, match[0].length))
                    acc += parseInt(match[0])
                if (adjacent(after, match.index!, match[0].length))
                    acc += parseInt(match[0])
            }
            return acc
        }, 0)
    console.log(`1: ${one}`)

    const two = input
        .split("\n")
        .reduce((acc, cur, index, arr) => {
            const before = arr[index - 1] ?? ""
            const after = arr[index + 1] ?? ""
            for (const match of cur.matchAll(/\*/g)) {
                const arr = []
                if (ratio(before, match.index!).length)
                    arr.push(...ratio(before, match.index!)!.map(item => parseInt(item[0])))
                if (ratio(cur, match.index!).length)
                    arr.push(...ratio(cur, match.index!)!.map(item => parseInt(item[0])))
                if (ratio(after, match.index!).length)
                    arr.push(...ratio(after, match.index!)!.map(item => parseInt(item[0])))
                if (arr.length > 1) acc += arr.reduce((acc, cur) => acc ? acc * cur : cur, 0)
            }
            return acc
        }, 0)
    console.log(`2: ${two}`)
}

main()
