import { readFile } from 'fs/promises'

const numbers: Record<string, number> = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9
}

async function main() {
    const input = (await readFile(`input.txt`)).toString()

    const one = input
        .split('\n')
        .reduce((acc, cur) => {
            const item = cur.replace(/\D/g, "")
            const first = item[0]
            const second = item.length == 1 ? first : item[item.length - 1]
            return acc + parseInt(`${first}${second}`)
        }, 0)
    console.log(`1: ${one}`)

    const two = input
        .split('\n')
        .reduce((acc, cur) => {
            const matches = cur.matchAll(/(?=((\d)|one|two|three|four|five|six|seven|eight|nine))/gim);
            const hits = [...matches].map(match => match[1]);

            const firstDigit = hits[0];
            const lastDigit = hits[hits.length - 1];

            const converted = `${isNaN(parseInt(firstDigit)) ? numbers[firstDigit] : firstDigit}${isNaN(parseInt(lastDigit)) ? numbers[lastDigit] : lastDigit}`;
            return acc + parseInt(converted);
        }, 0)
    console.log(`2: ${two}`)
}

main()