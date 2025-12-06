import { makeStyles } from '@mui/styles'

export const AppBarStyle = makeStyles(theme => ({
  appBar: {
    transition: 'font-size 200ms ease-in-out, width 200ms ease-in-out, padding-block 200ms ease-in-out, color 100ms ease',
    '& *': {
      transition: 'font-size 200ms ease-in-out, width 200ms ease-in-out, padding-block 200ms ease-in-out, color 100ms ease',
    },
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.secondary.dark,
  },

  logoImage: {
    width: '13vh',
  },
  linksList: {
    listStyle: 'none',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    textTransform: 'uppercase',
    // marginLeft: theme.spacing(4)
  },
  linkItem: {
    marginInline: theme.spacing(2),
    textDecoration: 'none',
    marginTop: theme.spacing(2),
    color: theme.palette.secondary.dark,
    '& li': {
      fontSize: 18,
      paddingInline: theme.spacing(1),
      '&:hover': {
        color: theme.palette.primary.main
      },
    },
  },
  iconLink: {
    textDecoration: 'none',
    color: theme.palette.secondary.dark,
    '& svg': {
      fontSize: 35,
    },
    '& button': {
      '&:hover': {
        color: theme.palette.primary.main
      }
    }
  },

  avatar: {
    width: theme.spacing(6.5),
    height: theme.spacing(6.5),
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.background.paper,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    '&:hover': {
      //   backgroundColor: colors.yellow['A700'],
      cursor: 'pointer',
      opacity: 0.7
    }
  },
  avatar2: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    backgroundColor: theme.palette.primary.main,
    // color: colors.yellow['A700'],
    fontWeight: 'bold',
  },
  profile: {
    minWidth: 300,
    userSelect: 'none',
    // cursor: 'pointer',
    transition: theme.transitions.create(['background'], {
      duration: theme.transitions.duration.short
    })
  },
  rootpaper: {
    position: 'relative',
    // paddingInline: theme.spacing(2),
    // paddingBlock: theme.spacing(2)
  },
  content: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: theme.spacing(1),
    paddingInline: theme.spacing(2),
    '& h6': {
      paddingInline: theme.spacing(1),
      paddingTop: theme.spacing(0),
      fontWeight: '600',
      fontSize: 18
    },
    '& p': {
      paddingInline: theme.spacing(1),
      fontSize: 15
    }
  },
  info: {
    display: 'block',
    // paddingBlock: theme.spacing(1)
  },
  btnlog: {
    display: 'flex',
    justifyContent: 'space-between',
    // paddingBottom: theme.spacing(1)
  },
  btn: {
    color: theme.palette.primary.main,
    fontWeight: 600,
    padding: '10px',
    marginTop: -9
  },
  account: {
    padding: theme.spacing(2)
  },
  linkaccount: {
    color: theme.palette.primary.main,
    fontWeight: 600,
    fontSize: 18,
    '&:hover': {
      // color: colors.yellow['A700']
    }
  },
  trancEmail: {
    fontSize: 17,
    paddingInline: theme.spacing(1),
    cursor: 'default'
  },
  items: {
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  notification: {
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  }
}))