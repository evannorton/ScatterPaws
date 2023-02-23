interface Destructible {
  readonly destructibleID: string;
  readonly tileID: number;
  readonly audioSourceSlug: string | null;
}

export default Destructible;