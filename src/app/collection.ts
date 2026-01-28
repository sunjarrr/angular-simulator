const games: string[] = ['GTA', 'MAFIA 2', 'WARCRAFT 3', 'SERIOUS SAM', 'ELDEN RING'];
const movies: string[] = ['Transformers', 'Inglourious Basterds', 'Green Book', 'Iron Man', 'IT'];

export class Collection<T> {

  private items: T[] = [];

  constructor(items: T[]) {
    this.items = items;
  }

  getAllElements(): T[] {
    return this.items;
  }

  getElement(index: number): T {
    return this.items[index];
  }

  cleanCollection(): void {
    this.items = [];
  }

  deleteElement(index: number): void {
    this.items.splice(index, 1);
  }

  replaceElement(index: number, newItem: T): void {
    this.items.splice(index, 1, newItem);
  }
}

const gamesCollection: Collection<string> = new Collection<string>(games);
gamesCollection.replaceElement(0, 'The Witcher 3');

const moviesCollection: Collection<string> = new Collection<string>(movies);
moviesCollection.getAllElements();

