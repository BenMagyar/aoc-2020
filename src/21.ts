import path from 'path';
import fs from 'fs-extra';

interface Item { ingredients: string[], allergens: string[] };
interface Tracked { maybe: Set<string>, not: Set<string> }

export async function read(input: string) : Promise<Item[]> {
    return (await fs.readFile(path.resolve(__dirname, '../inputs/', input)))
        .toString()
        .trim()
        .split('\n')
        .map(line => {
            const parts = line.split(' (contains');
            return {
                ingredients: parts[0].split(' ').map(s => s.trim()),
                allergens: parts[1].substring(0, parts[1].length - 1).split(',').map(s => s.trim()),
            }
        });
}

export function run(input: Item[], isPartOne = true) {
    const possible: { [ingredient: string]: Tracked } = {};
    const allergens = new Set<string>([...input.map(item => item.allergens).flat()]);
    const ingredients = new Set([...input.map(item => item.ingredients).flat()]);
    [...ingredients].forEach(i => possible[i] = { maybe: new Set(), not: new Set() });
    input.forEach(item => {
        const notIngredient = [...ingredients].filter(i => !item.ingredients.includes(i));
        item.ingredients.forEach(ingredient => {
            item.allergens.forEach(allergen => {
                possible[ingredient].maybe.add(allergen);                
            })
        })
        item.allergens.forEach(allergen => 
            notIngredient.forEach(i => possible[i].not.add(allergen)));
    })

    const noAllergens = Object.keys(possible).filter(p =>
        [...possible[p].maybe]
            .filter(m => !possible[p].not.has(m)).length === 0
    );

    if (isPartOne) {
        return [...input.map(item => item.ingredients).flat()]
            .filter(i => noAllergens.includes(i))
            .length;
    }

    const withAllergens = [...ingredients].filter(i => !noAllergens.includes(i));
    const mapping = new Map<string,string>();
    const allergiesUsed = new Set<string>();
    const notFound = new Set<string>([...withAllergens]);
    while (notFound.size > 0) {
        notFound.forEach(nf => {
            const maybe = [...possible[nf].maybe].filter(allergen => 
                !(possible[nf].not.has(allergen) || allergiesUsed.has(allergen)));
            if (maybe.length === 1) {
                notFound.delete(nf);
                mapping.set(maybe[0], nf);
                allergiesUsed.add(maybe[0]);
            }
        })
    }

    return [...mapping.keys()].sort().map(a => mapping.get(a)).join(',');
}
