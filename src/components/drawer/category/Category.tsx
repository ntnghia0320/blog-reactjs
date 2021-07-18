import { List, ListItem, createStyles, ListItemText, makeStyles, Theme } from "@material-ui/core";
import { useState } from "react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom"
import categoryService from "../../../services/category.service";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    highlighted: {
      color: 'red'
    }
  }),
);

const Category = () => {
    const classes = useStyles();
    let categoriesDefalut: Category[] = [];
    const [categories, setCategories] = useState(categoriesDefalut);

    useEffect(()=>{
        categoryService.getCategories().then(
            (res) => {
                setCategories(res);
            },
            (error) => {
                alert(error.message)
            }
        );
        console.log('categoriy bar');
        
    }, []);

    return(
        <List>
            {categories.map(category => (
            <ListItem
                button
                key={category.id}
                component={NavLink}
                activeClassName={classes.highlighted}
                to={`/category/${category.id}`}
            >
                <ListItemText primary={category.name} />
            </ListItem>
            ))}
        </List>
    );
}

export default Category;