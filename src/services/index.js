import {openDatabase} from 'react-native-sqlite-storage';
import {isArrayCheck} from '../util/Utils';

export function getSounds() {
  const db = openDatabase({name: 'musicapp.db', createFromLocation: 1});

  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM sounds', [], function (tx, results) {
        resolve(results);
      });
    });
  });
}

export function getCategories() {
  const db = openDatabase({name: 'musicapp.db', createFromLocation: 1});

  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM categories', [], function (tx, results) {
        resolve(results);
      });
    });
  });
}
export function getFavourites() {
  const db = openDatabase({name: 'musicapp.db', createFromLocation: 1});

  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM favourite', [], function (tx, results) {
        resolve(results);
      });
    });
  });
}
// export function updateFavourites(id, value) {
//   return new Promise((resolve, reject) => {
//     db.transaction(tx => {
//       tx.executeSql(
//         'UPDATE sounds SET favourite=? WHERE id=?',
//         [value, id],
//         (tx, results) => {
//           console.log(results.rowsAffected, ' Rows Updated');
//           resolve(results.rowsAffected);
//         },
//         err => {
//           reject(err);
//         },
//       );
//     });
//   });
// }

export function setFavouriteSounds(id) {
  const db = openDatabase({name: 'musicapp.db', createFromLocation: 1});

  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM favourite where sid=?',
        [id],
        function (tx, results) {
          console.log('HOHO===>', results.rows.length);
          if (results.rows.length === 0) {
            db.transaction(tx => {
              tx.executeSql(
                'INSERT INTO favourite (sid) Values (?)',
                [id],
                (tx, results) => {
                  console.log(results.rowsAffected, ' Rows Inserted');
                  resolve(results.rowsAffected);
                },
                err => {
                  reject(err);
                },
              );
            });
          }
        },
      );
    });
  });
}

export function deleteFavouriteSounds(id) {
  const db = openDatabase({name: 'musicapp.db', createFromLocation: 1});

  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE from favourite where sid=?',
        [id],
        (tx, results) => {
          console.log(results.rowsAffected, ' Rows Deleted');
          resolve(results.rowsAffected);
        },
        err => {
          reject(err);
        },
      );
    });
  });
}

export const _FavouriteCategoryCheck = (id, favourites) => {
  if (isArrayCheck(favourites)) {
    let favourite = favourites.filter(i => i.id === id);
    return favourite.length > 0 ? true : false;
  } else {
    return false;
  }
};

export const _checkCurrentCategoryPlaying = (
  SelectedCategory,
  PlayingCategory,
) => {
  if (
    SelectedCategory !== null &&
    PlayingCategory !== null &&
    PlayingCategory !== undefined
  ) {
    return SelectedCategory.id === PlayingCategory.id
      ? PlayingCategory.tracks
      : SelectedCategory.tracks;
  } else {
    return SelectedCategory.tracks;
  }
};
