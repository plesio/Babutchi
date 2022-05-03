import Dexie, { Table } from "dexie";

export interface PostUrl {
  id?: number;
  url: string;
}

export class PostUrlDexie extends Dexie {
  // 'friends' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  postUrl!: Table<PostUrl>;

  constructor() {
    super("posturldb");
    this.version(1).stores({
      postUrl: "++id, url", // Primary key and indexed props
    });
  }
}

export const db = new PostUrlDexie();

// db.on("populate", populate);

// const populate = async () => {
//     await db.items.bulkAdd([{ name: "dummy-A" }, { name: "dummy-B" }]);
// }
