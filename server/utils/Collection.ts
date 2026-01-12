import _ from "lodash";
import { mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import SuperJSON from "superjson";

type Where<Element> = Partial<Element> | ((element: Element) => boolean);

export default class Collection<Element extends {}> {
  private list: Element[] = [];
  constructor(public filePath: string, public seed: Element[] = []) {
    this.filePath = path.join(process.cwd(), filePath);
    try {
      statSync(this.filePath);
      const json = readFileSync(this.filePath, "utf-8");
      this.list = SuperJSON.parse(json);
    } catch (error: any) {
      if (!("code" in error && error.code === "ENOENT")) throw error;
      mkdirSync(path.dirname(this.filePath), { recursive: true });
      this.list = this.seed;
      this.save();
    }
  }
  private save() {
    const json = SuperJSON.stringify(this.list);
    writeFileSync(this.filePath, json, "utf-8");
  }

  find<Omitted extends keyof Element>({
    where,
    skip = 0,
    omit,
    take,
  }: {
    where?: Where<Element>;
    take?: number;
    skip?: number;
    omit?: Omitted[];
  } = {}) {
    let elements = this.list;
    if (where) {
      elements = _.filter(elements, where) as any;
    }
    if (take) {
      elements = _.slice(this.list, skip, take + skip);
    }

    if (omit) return elements.map((element) => _.omit(element, omit));
    return elements;
  }
  findOne<Omitted extends keyof Element>({
    where,
    omit,
  }: {
    where: Where<Element>;

    omit?: Omitted[];
  }) {
    const element = _.find(this.list, where) as Element | undefined;
    if (!element) return null;

    if (omit) return _.omit(element, omit);
    return element;
  }
  count(where?: Where<Element>) {
    return _.filter(this.list, where).length;
  }
  create(newElement: Element) {
    this.list.push(newElement);
    this.save();
    return newElement;
  }
  update(where: Where<Element>, newEntries: Partial<Element>) {
    const element = _.find(this.list, where) as Element | undefined;
    if (!element) return null;
    for (const [key, value] of Object.entries(newEntries))
      (element as any)[key] = value;
    this.save();
    return element;
  }
  delete(where: Where<Element>) {
    const index = _.findIndex(this.list, where as any);
    if (index === -1) return null;
    const element = _.pullAt(this.list, index);
    this.save();
    return element;
  }
}
