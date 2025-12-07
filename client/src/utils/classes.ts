export default {
  join(...cls: any[]) {
    const onlyClasses = cls
      .filter((cls) => typeof cls === "string")
      .map((cls) => cls.trim());
    const uniqueClasses = [...new Set(onlyClasses)];
    return uniqueClasses.join(" ");
  },

  toggle(state: boolean, cls: string, alt: string = "") {
    return state ? cls : alt;
  },

  switch(state: string, clsObj: Record<string, string>, alt: string = "") {
    if (clsObj[state]) return clsObj[state];
    return clsObj[state] || alt;
  },
};
