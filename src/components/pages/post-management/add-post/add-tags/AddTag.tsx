import { createStyles, makeStyles, Theme } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import React, { useState } from 'react';

interface Props {
    addTag: AddTag;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
        display: 'flex',
        alignItems: 'center',
    },
    btnSubmit:{
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(2),
    }
  }),
);

const AddTag: React.FC<Props>= ({ addTag }) => {
    const classes = useStyles();
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
        <div className={classes.formControl}>
            <TextField
                id="standard-basic"
                label="Add tag"
                type="text"
                value={tag.name}
                placeholder="Tag name"
                onChange={(event) => onChangeTagName(event)}
            />
            <button
            className={classes.btnSubmit}
                type="submit"
                onClick={(event) => submit(event)}
            >
            Add Tag
            </button>
        </div>
    );
};

export default AddTag;