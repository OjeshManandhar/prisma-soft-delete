# Prisma soft delete code generator

### Points to note

- If there is a `is` or `isNot` field in a model, then for `<Model>RelationFilter` pass the required `<Model>WhereInput` inside `is` or `isNot`
- `_count` in `select` and `include` will include soft deleted records too
