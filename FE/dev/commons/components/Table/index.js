import React from 'react';
//export {default} from './Table';
/*

<Table headerColumns = {[
    {content: 'content'},
    {content: 'content 2'},
]} bodyRows = {[
    {id: 1,
        columns:[
            {content: 'content A 1'},
            {content: 'content A 2'},
            {content: 'content A 3'},
        ]
    },
]} />

Table
    Table.Header
        Table.Row
            Table.Column
            Table.Column
    Table.Body
        Table.Row
            Table.Column
            Table.Column
        Table.Row
            Table.Column
            Table.Column

*/

export {default as Header} from './Header';
export {default as Body} from './Body';
export {default as Row} from './Row';
export {default as Column} from './Column';

export {default} from './Table';

