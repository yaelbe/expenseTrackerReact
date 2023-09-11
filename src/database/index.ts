import SQLite, {SQLiteDatabase} from 'react-native-sqlite-storage';

let db: SQLiteDatabase | null = null;

// Open or create the SQLite database
export const openDatabase = async (): Promise<SQLiteDatabase> => {
  return new Promise<SQLiteDatabase>((resolve, reject) => {
    if (db) {
      // If the database is already open, resolve with it
      resolve(db);
    } else {
      // Otherwise, open a new database instance
      db = SQLite.openDatabase(
        {name: 'expenses', location: 'default'},
        () => {
          resolve(db!);
        },
        error => {
          reject(error);
        },
      );
    }
  });
};

export const initDatabase = async () => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const db = await openDatabase();

      // Now you can use the 'db' object to execute transactions
      db.transaction(
        tx => {
          tx.executeSql(
            'CREATE TABLE IF NOT EXISTS expenses (id INTEGER PRIMARY KEY AUTOINCREMENT, user Text, name TEXT, amount REAL, date STRING)',
            [],
            () => {
              console.log('Table expenses created successfully.');
              resolve(); // Resolve the promise when the table is created
            },
            (_, error) => {
              console.error('Error creating table expenses:', error);
              reject(error); // Reject the promise if there's an error
            },
          );
        },
        error => {
          console.error('Error opening database transaction:', error);
          reject(error); // Reject the promise if there's an error
        },
      );
    } catch (error) {
      console.error('Error opening database: ', error);
      reject(error); // Reject the promise if there's an error
    }
  });
};
