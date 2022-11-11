import { Client } from "@notionhq/client"
// import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
// require('dotenv').config();

// const notion = new Client({ auth: process.env["NOTION_KEY"] })

// const databaseId = process.env["NOTION_DATABASE_ID"];
// NOTION_KEY: string ="secret_LYOku8UK7G5JSfL5UCxuQx1TWJ1uMzSRY8SY4PjsqtL"
// NOTION_DATABASE_ID: string ="83efc70a776e4b50adbe430cce9a6f9a"

const notionApiKey = 'secret_LYOku8UK7G5JSfL5UCxuQx1TWJ1uMzSRY8SY4PjsqtL';
const notion = new Client({ auth: notionApiKey });
const databaseId = '83efc70a776e4b50adbe430cce9a6f9a';

console.log('db id: ', databaseId);

// async function readDb() {
//     console.log('readin')
//     try {
//         const res = await notion.databases.query({
//             database_id: databaseId
//         });
//         console.log('res', res);
//         return res.results;
//     } catch (error) {
//         console.error(error.body);
//         return;
//     }
// }



(async () => {
    const response = await notion.databases.retrieve({ database_id: databaseId });
    console.log('response: ', response);
    return response;
  })();

// const dbresults = readDb();

const generateData = (databaseInfo) => {
    let data = [];
    for (const entry of databaseInfo) {
        let entryProps = Object.keys(entry.properties);
        let dataObj = {};
        entryProps.forEach((prop) => {
            let propType = entry.properties[prop].type;
            let value = entry.properties[prop][propType];
            if (typeof value === 'object' && value) {
                if (propType === 'title' || propType === 'rich_text') {
                    if (value.length) {
                        value = value[0].plain_text;
                    } else {
                        value = '';
                    }
                } else if (propType === 'date') {
                    value = value.start;
                }
            }
            dataObj[prop] = value;
        })
        data.push(dataObj);
    }
    console.log('data: ', data);
    return data;
}   
console.log('db results: ', dbresults);
export {};
export const notionData = generateData(dbresults);

