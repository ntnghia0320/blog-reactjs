import React, { useState } from 'react';

interface Props {
    addTag: AddTag;
}

const AddTag: React.FC<Props>= ({ addTag }) => {
    const tagDefault: Tag = {name: ''};
    const [tag, setTag] = useState(tagDefault);

    const submit = (event: any) => {
        event.preventDefault();
        addTag(tag);
        setTag({...tag, name: ''});
    }

    const onChangeTagName = (event: any) =>{
        setTag({...tag, name: event.target.value});
    }
    return (
        <>
            <input
                type="text"
                value={tag.name}
                placeholder="Tag name"
                onChange={(event) => onChangeTagName(event)}
            />
            <button
                type="submit"
                onClick={(event) => submit(event)}
            >
            Add Tag
            </button>
        </>
    );
};

export default AddTag;