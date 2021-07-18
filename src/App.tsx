import React, { useEffect, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme, Theme, createStyles, alpha } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';
import { BrowserRouter, NavLink, Redirect, Route, Switch } from 'react-router-dom';
import Login from './components/pages/login/login';
import NotFound from './components/pages/not-found/NotFound';
import PostManagement from './components/pages/post-management/PostManagement';
import Profile from './components/pages/profile/Profile';
import Register from './components/pages/register/Register';
import UserManagement from './components/pages/user-management/UserManagement';
import VerifyPost from './components/pages/verify-post/VerifyPost';
import AllPost from './components/pages/home/posts/AllPost';
import PostListOrderByCategory from './components/pages/home/posts/PostListOrderByCategory';
import PostDetail from './components/pages/home/posts/PostDetail';
import userService from './services/user.service';
import { Button } from '@material-ui/core';
import history from './helpers/history';
import Category from './components/drawer/category/Category';
import AddPost from './components/pages/post-management/add-post/AddPost';
import EditPostDetail from './components/pages/post-management/edit-post/EditPostDetail';
import EditPostList from './components/pages/post-management/edit-post/EditPostList';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexGrow: 1,
    },
    grow: {
      flexGrow: 1,
    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      [theme.breakpoints.up('sm')]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    highlighted: {
      color: 'red'
    }
  }),
);

export default function App() {
  const [isUser, setIsUser] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const userFromLocalStorage = localStorage.getItem('user');
  const currentUser =  userFromLocalStorage ? JSON.parse(userFromLocalStorage) : null;

  useEffect(() => {
    if (currentUser) {
      setIsAdmin(currentUser.role.includes("ROLE_ADMIN"));
      setIsUser(currentUser.role.includes("ROLE_USER"));
    }
    console.log('main header');
    
  }, [currentUser]);

  const logOut = () => {
    userService.logOut();
    history.push('/home');
    window.location.reload();
  }
  
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {isUser && (
              <>
              <MenuItem>
                <Button
                  color="inherit"
                  component={NavLink}
                  to="/post-management"
                >
                  Post Management
                </Button>
              </MenuItem>
              <MenuItem>
                <Button
                  color="inherit"
                  component={NavLink}
                  to="/profile"
                >
                  Profile
                </Button>
              </MenuItem>
              </>
            )}

            {isAdmin && (
              <>
              <MenuItem>
                <Button
                  color="inherit"
                  component={NavLink}
                  to="/user-management"
                >
                  User Management
                </Button>
              </MenuItem>
              <MenuItem>
                <Button
                  color="inherit"
                  component={NavLink}
                  to="/verify-post"
                >
                  Verify Post
                </Button>
              </MenuItem>
              </>
            )}

            {currentUser ? (
              <MenuItem>
                <Button
                  color="inherit"
                  onClick={logOut}
                >
                  Logout
                </Button>
              </MenuItem>
            ) : (
                <>
                <MenuItem>
                  <Button
                    color="inherit"
                    component={NavLink}
                    to="/login"
                  >
                    Login
                  </Button>
                </MenuItem>
                  <MenuItem>
                  <Button
                    color="inherit"
                    component={NavLink}
                    to="/register"
                  >
                    Register
                  </Button>
                  </MenuItem>
                </>
            )}
    </Menu>
  );
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <Switch>
        <Route path={['/home', '/category', '/post']}>
          <Category />
        </Route>
        <Route path='/post-management'>
          <header>
              <nav>
                  <ul>
                      <li>
                          <NavLink to='/post-management/add-post'>Add post</NavLink>
                      </li>
                      <li>
                          <NavLink to='/post-management/edit-post'>Edit post</NavLink>
                      </li>
                  </ul>
              </nav>
          </header>
        </Route>
      </Switch>
    </div>
  );

  const container = window !== undefined ? () => window.document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <IconButton
            color="inherit"
            component={NavLink}
            activeClassName={classes.highlighted}
            to="/home"
          >
            <HomeIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            Material-UI
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {isUser && (
              <>
                <Button
                  color="inherit"
                  component={NavLink}
                  activeClassName={classes.highlighted}
                  to="/post-management/add-post"
                >
                  Post Management
                </Button>
                <Button
                  color="inherit"
                  component={NavLink}
                  activeClassName={classes.highlighted}
                  to="/profile"
                >
                  Profile
                </Button>
              </>
            )}

            {isAdmin && (
              <>
                <Button
                  color="inherit"
                  component={NavLink}
                  activeClassName={classes.highlighted}
                  to="/user-management"
                >
                  User Management
                </Button>
                <Button
                  color="inherit"
                  component={NavLink}
                  activeClassName={classes.highlighted}
                  to="/verify-post"
                >
                  Verify Post
                </Button>
              </>
            )}

            {currentUser ? (
                <Button
                  color="inherit"
                  onClick={logOut}
                >
                  Logout
                </Button>
            ) : (
                <>
                  <Button
                    color="inherit"
                    component={NavLink}
                    activeClassName={classes.highlighted}
                    to="/login"
                  >
                    Login
                  </Button>
                  <Button
                    color="inherit"
                    component={NavLink}
                    activeClassName={classes.highlighted}
                    to="/register"
                  >
                    Register
                  </Button>
                </>
            )}
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
          <Route path='/' exact>
            <Redirect to='/home'/>
          </Route>
          <Route exact path='/home'>
            <AllPost />
          </Route>
          <Route path='/category/:categoryId'>
            <PostListOrderByCategory />
          </Route>
          <Route path='/post/:postId'>
            <PostDetail />
          </Route>
          <Route path='/register'>
            <Register />
          </Route>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/post-management/add-post'>
              <AddPost />
          </Route>
          <Route path='/post-management/edit-post'>
              <EditPostList />
          </Route>
          <Route path='/post-management/edit-post-detail/:postId'>
              <EditPostDetail />
          </Route>
          <Route path='/user-management'>
            <UserManagement />
          </Route>
          <Route path='/verify-post'>
            <VerifyPost />
          </Route>
          <Route path='/profile'>
            <Profile />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </main>
    </div>
  );
}
