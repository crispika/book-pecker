/**
 * insert 
 * update
 * delete
 * select
 */

let db = window.localStorage;

export function db_init_table(table_name, type) {
    if (!db[table_name]) {
        switch (type) {
            case "MAP":
                db[table_name] = "{}"
                return;
            case "LIST":
                db[table_name] = "[]"
                return;
            default:
                db[table_name] = "{}"
                return;
        }
    }
}

export function db_select_table(table_name) {
    return JSON.parse(db[table_name]);
}

export function db_select_MapItem(table_name, key) {
    let table = JSON.parse(db[table_name]);
    return table[key];
}

export function db_insert_tableMapItem(table_name, key, data) {
    // console.log(db[table_name]);
    let table = JSON.parse(db[table_name]);

    table[key] = data;

    db[table_name] = JSON.stringify(table)
}

// export function db_insert_tableListItem(table_name, data) {
//     if (!db[table_name]) db[table_name] = "[]";
//     let table = JSON.parse(db[table_name]);
//     table.push(data)
//     db[table_name] = JSON.stringify(table)
// }

export function db_update_tableItem(table_name, key, data) {
    let old_data = db[table_name][key];
    db[table_name][key] = Object.assign({}, old_data, data);
}

export function db_delete_tableItem(table_name, key) {
    delete db[table_name][key];
}


/** for trolley table */
export function db_insert_trolleyItem(table_name, key) {
    if (!db[table_name]) db[table_name] = "{}";
    let table = JSON.parse(db[table_name]);
    if (table[key]) table[key] += 1;
    else table[key] = 1;
    db[table_name] = JSON.stringify(table)
}

export function db_update_trolleyItem(table_name, key, value) {
    let table = JSON.parse(db[table_name]);
    table[key] = value;
    db[table_name] = JSON.stringify(table)
    // console.log("trolley_upadated: " + db[table_name])
}

export function db_delete_trolleyItem(table_name, key){
    let table = JSON.parse(db[table_name]);
    delete table[key];
    db[table_name] = JSON.stringify(table)
}


