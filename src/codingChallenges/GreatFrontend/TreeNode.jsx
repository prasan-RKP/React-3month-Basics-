import React, { useState } from 'react'

const TreeNode = ({ node }) => {

    const [open, setOpen] = useState(false);

    return (
        <div className='ml-4 mt-2'>
            <span>
                {node?.name}
                {node.children && (
                    <span
                        onClick={() => setOpen(!open)}
                        style={{ cursor: "pointer", marginLeft: "5px" }}
                    >
                        {open ? "[-]" : "[+]"}
                    </span>
                )}
            </span>

            {node.children && open && (
                <div>
                    {node.children.map((child) => (
                        <TreeNode key={child.id} node={child} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default TreeNode;
