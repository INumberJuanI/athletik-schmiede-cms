export const validateCategoryType =
  (expected: 'posts' | 'pages' | 'training-times') =>
  async (value: unknown, { req }: any) => {
    if (!value) return true;
    const ids = Array.isArray(value) ? value : [value];
    const payload = req.payload;

    for (const id of ids) {
      const cat = await payload.findByID({ collection: 'categories', id });
      if (!cat || cat.type !== expected) {
        return `Kategorie "${cat?.title ?? id}" hat den Typ "${cat?.type ?? 'unbekannt'}", erwartet: "${expected}".`;
      }
    }
    return true;
  };
