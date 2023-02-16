class List<T> {
  private readonly _values: T[];

  public constructor(values: T[]) {
    this._values = [...values];
  }

  public append(value: T): void {
    this._values.push(value);
  }

  public every(predicate: (value: T, index: number) => boolean): boolean {
    return this._values.every((innerValue: T, innerIndex: number): boolean => predicate(innerValue, innerIndex));
  }

  public forEach(predicate: (value: T, index: number) => void): void {
    this._values.forEach((innerValue: T, innerIndex: number): void => {
      predicate(innerValue, innerIndex);
    });
  }

  public getClonedList(): List<T> {
    return new List(this._values);
  }

  public getFilteredList(filterer: (value: T, index: number) => boolean): List<T> {
    return new List(this._values.filter((innerValue: T, innerIndex: number): boolean => filterer(innerValue, innerIndex)));
  }

  public getFirstMatchedIndex(predicate: (value: T, index: number) => boolean): number {
    const matches: List<number> = new List([]);
    this.forEach((value: T, index: number): void => {
      if (predicate(value, index)) {
        matches.append(index);
      }
    });
    if (matches.getLength() > 0) {
      return matches.getValue(0);
    }
    throw new Error(`List does not have a match.`);
  }

  public getFirstMatchedValue(predicate: (value: T, index: number) => boolean): T {
    const index: number = this.getFirstMatchedIndex(predicate);
    return this.getValue(index);
  }

  public getFoldedList<U>(folder: (previousValue: U, currentValue: T, currentIndex: number) => U, initialValue: U): U {
    return this._values.reduce((previousValue: U, currentValue: T, currentIndex: number): U => folder(previousValue, currentValue, currentIndex), initialValue);
  }

  public getJoinedString(separator: string): string {
    return this._values.join(separator);
  }

  public getIndexOfValue(value: T): number {
    if (this.includes(value)) {
      const index: number = this._values.indexOf(value);
      return index;
    }
    throw new Error(`List does not include value ${value}.`);
  }

  public getLastMatchedIndex(predicate: (value: T, index: number) => boolean): number {
    const matches: List<number> = new List([]);
    this.getReversedList().forEach((value: T, index: number): void => {
      if (predicate(value, index)) {
        matches.append(this.getLength() - 1 - index);
      }
    });
    return matches.getValue(0);
  }

  public getLastMatchedValue(predicate: (value: T, index: number) => boolean): T {
    const index: number = this.getLastMatchedIndex(predicate);
    return this.getValue(index);
  }

  public getLength(): number {
    return this._values.length;
  }

  public getListOfValuesInRange(index: number, amount: number): List<T> {
    const values: List<T> = new List([]);
    for (let i: number = index; i < index + amount; i++) {
      if (this.hasValue(i)) {
        const value: T = this.getValue(i);
        values.append(value);
      }
    }
    return values;
  }

  public getLowestNumber(): number {
    const numbers: List<number> = new List([]);
    this.forEach((value: T): void => {
      if (typeof value === "number") {
        numbers.append(value);
      }
    });
    return numbers.getFoldedList((a: number, b: number): number => Math.min(a, b), Infinity);
  }

  public getMappedList<U>(mapper: (value: T, index: number) => U): List<U> {
    return new List(this._values.map((innerValue: T, innerIndex: number): U => mapper(innerValue, innerIndex)));
  }

  public getRelativeOffsetEntry(value: T, offset: number): T {
    const length: number = this.getLength();
    const index: number = this.getIndexOfValue(value);
    return this.getValue((index + offset % length + length) % length);
  }

  public getReversedList(): List<T> {
    return new List(this.getClonedList()._values.reverse());
  }

  public getSortedList(sorter: (value1: T, value2: T) => number): List<T> {
    return new List(this.getClonedList()._values.sort((innerValue1: T, innerValue2: T): number => sorter(innerValue1, innerValue2)));
  }

  public getSumOfNumbers(): number {
    const numbers: List<number> = new List([]);
    this.forEach((value: T): void => {
      if (typeof value === "number") {
        numbers.append(value);
      }
    });
    return numbers.getFoldedList((a: number, b: number): number => a + b, 0);
  }

  public getValue(index: number): T {
    if (this.hasValue(index)) {
      return this._values[index];
    }
    throw new Error(`List does not have value at index ${index}.`);
  }

  public getValues(): T[] {
    return [...this._values];
  }

  public hasValue(index: number): boolean {
    return Number.isInteger(index) && index >= 0 && index <= this.getLength() - 1;
  }

  public includes(value: T): boolean {
    return this._values.includes(value);
  }

  public removeValue(index: number): void {
    this._values.splice(index, 1);
  }

  public removeValuesInRange(index: number, amount: number): void {
    this._values.splice(index, amount);
  }

  public setValue(index: number, value: T): void {
    this._values[index] = value;
  }

  public swapValues(indexA: number, indexB: number): void {
    const valueA: T = this.getValue(indexA);
    const valueB: T = this.getValue(indexB);
    if (valueA !== null && valueB !== null) {
      this.setValue(indexA, valueB);
      this.setValue(indexB, valueA);
    }
  }

  public some(predicate: (value: T, index: number) => boolean): boolean {
    return this._values.some((innerValue: T, innerIndex: number): boolean => predicate(innerValue, innerIndex));
  }
}

export default List;