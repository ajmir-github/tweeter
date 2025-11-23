import fs from "fs";
import path from "path";
import { v4 } from "uuid";

const fileEncoding = "utf-8";
function relatePath(name: string) {
  return path.join(process.cwd(), "../data", `${name}.json`);
}

function clone<D extends object>(data: D): D {
  return JSON.parse(JSON.stringify(data));
}

export class Collection<Document extends { id: string }> {
  private filePath: string;
  private cache: Document[] | null = null;

  constructor(collectionName: string) {
    this.filePath = relatePath(collectionName);
  }

  private async read() {
    if (this.cache) return clone(this.cache);
    try {
      const data = await fs.promises.readFile(this.filePath, fileEncoding);
      this.cache = JSON.parse(data);
    } catch (error: any) {
      if (error.code !== "ENOENT") throw error;
      await fs.promises.writeFile(this.filePath, "[]", fileEncoding);
      this.cache = [];
    }
    return clone(this.cache as Document[]);
  }

  private async write(documents?: Document[]) {
    if (documents) this.cache = documents;
    const json = JSON.stringify(this.cache);
    await fs.promises.writeFile(this.filePath, json, fileEncoding);
    return this;
  }

  // CRUD methods
  async find(where: (doc: Document) => boolean | undefined) {
    const documents = await this.read();
    const found = documents.find(where);
    return found ? clone(found) : null;
  }

  async findMany(where?: (doc: Document) => boolean | undefined) {
    const documents = await this.read();
    const result = where ? documents.filter(where) : documents;
    return result.map(clone);
  }

  async insert(entry: Omit<Document, "id">) {
    const documents = await this.read();
    const newDocument = { ...entry, id: v4() } as Document;
    await this.write([...documents, newDocument]);
    return clone(newDocument);
  }

  async insertMany(entries: Omit<Document, "id">[]) {
    const documents = await this.read();
    const newDocs = entries.map((entry) => ({
      ...entry,
      id: v4(),
    })) as Document[];
    await this.write([...documents, ...newDocs]);
    return newDocs.map(clone);
  }

  async update(id: string, changes: Partial<Document>) {
    const documents = await this.read();
    const index = documents.findIndex((doc) => doc.id === id);
    if (index === -1) return null;

    const updated = { ...documents[index], ...changes };
    documents[index] = updated;
    await this.write(documents);
    return clone(updated);
  }

  async updateMany(
    where: (doc: Document) => boolean | undefined,
    changes: Partial<Document>
  ) {
    const documents = await this.read();
    const updatedDocs = documents.map((doc) =>
      where(doc) ? { ...doc, ...changes } : doc
    );
    await this.write(updatedDocs);
    return updatedDocs.filter(where).map(clone);
  }

  async delete(id: string) {
    const documents = await this.read();
    const index = documents.findIndex((doc) => doc.id === id);
    if (index === -1) return false;

    documents.splice(index, 1);
    await this.write(documents);
    return true;
  }

  async deleteMany(where: (doc: Document) => boolean | undefined) {
    const documents = await this.read();
    const remaining = documents.filter((doc) => !where(doc));
    const deletedCount = documents.length - remaining.length;
    await this.write(remaining);
    return deletedCount;
  }
}
export function createDatabase<Schema extends Record<string, { id: string }[]>>(
  initialData?: Partial<Schema>
) {
  const db = {} as {
    [K in keyof Schema]: Collection<Schema[K][number]>;
  };

  for (const key of Object.keys(initialData || {}) as (keyof Schema)[]) {
    const collection = new Collection<Schema[typeof key][number]>(
      key as string
    );
    db[key] = collection;

    // Seed if initial data exists
    const seed = initialData?.[key];
    if (seed && seed.length > 0) {
      void collection.insertMany(
        seed.map((doc) => {
          const { id, ...rest } = doc;
          return rest as Omit<Schema[typeof key][number], "id">;
        })
      );
    }
  }

  // Ensure all collections exist even if not seeded
  return new Proxy(db, {
    get(target, prop: string) {
      if (!(prop in target)) {
        target[prop as keyof Schema] = new Collection<any>(prop);
      }
      return target[prop as keyof Schema];
    },
  }) as {
    [K in keyof Schema]: Collection<Schema[K][number]>;
  };
}
