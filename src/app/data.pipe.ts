import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'data'
})

export class DataPipe implements PipeTransform {
    transform(data: any) {
        // let data = [];
    // for (const entry of databaseInfo) {
        let entryProps = Object.keys(data.properties);
        let dataObj: any = {};
        entryProps.forEach((prop) => {
            let propType = data.properties[prop].type;
            let value = data.properties[prop][propType];
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
    console.log('data: ', dataObj);
    return dataObj;
    }
}