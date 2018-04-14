export interface IAppSettings {
  name: string;
  identifier: string;
  version: string;
  types: {
    [key: string]: "read" | "write";
  };
}

/* Db Schema */
export interface IFieldSchema {
  type: string;
  required?: boolean;
}

export interface IForeignKey {
  foreignKey: string;
  table: string;
}

export interface ITableSchema {
  encrypted?: boolean;
  fields: {
    [key: string]: IFieldSchema;
  };
  foreignKeys?: IForeignKey[];
  indexes?: {
    field: string;
    ascending: boolean;
  }[];
}

export interface IDatabaseSchema {
  tables: {
    [key: string]: ITableSchema;
  };
}
