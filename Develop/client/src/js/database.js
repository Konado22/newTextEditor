import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (body) => {
  console.log("Post to the database");

  const JATEDb = await openDB("JATE", 1);

  const tx = JATEDb.transaction("JATE", "readwrite");

  const store = tx.objectStore("JATE");

  const request = store.add({
  id:"1",
  value: body
  });

  const result = await request;
  if (!result) {
    console.error("putDb not implemented");
  } else {
    console.log("🚀 - data saved to the database", result);
  }

  // TODO: Add logic for a method that gets all the content from the database
  export const getDb = async () => {
    console.log("GET from the database");

    const JATEDb = await openDB("JATE", 1);

    const tx = JATEDb.transaction("JATE", "readonly");

    const store = tx.objectStore("JATE");

    const request = store.getAll();

    const result = await request;

    console.log("result.value", result);
    if (!result) {
      console.error("getDb not implemented");
    }

    return result;
  };
};

initdb();
