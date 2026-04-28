import React, { useState } from 'react'
import TreeNode from './TreeNode';

const data = [
    {
        "id": 1,
        "name": "README.md"
    },
    {
        "id": 2,
        "name": "Documents",
        "children": [
            {
                "id": 3,
                "name": "Word.doc"
            },
            {
                "id": 4,
                "name": "Powerpoint.ppt"
            }
        ]
    },
    {
        "id": 5,
        "name": "Downloads",
        "children": [
            {
                "id": 6,
                "name": "unnamed.txt"
            },
            {
                "id": 7,
                "name": "Misc",
                "children": [
                    {
                        "id": 8,
                        "name": "foo.txt"
                    },
                    {
                        "id": 9,
                        "name": "bar.txt"
                    }
                ]
            }
        ]
    }
]

const FileExporer = () => {

    return (
        <div className='pl-5 pt-7'>
           {data.map((node) => (
            <TreeNode key={node?.id} node={node} />
           ))}
        </div>
    )
}

export default FileExporer;
