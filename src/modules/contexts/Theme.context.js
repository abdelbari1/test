import React from 'react'
import { ThemeProvider, createTheme } from "@mui/material/styles";

export const ThemeContext = React.createContext()

export function ThemeContextProvider(props) {

    const [animationLogin, setAnimationLogin] = React.useState(true)

    const defaultTheme = {
        overrides: {
            '#m--table--filter--row': {
                background: 'red'
            },
            MuiTableHead: {
                root: {
                    '& th': {
                        background: '#2980b9',
                        paddingRight: '12px !important',
                        fontWeight: 600,
                        fontSize: 16,
                    }
                }
            },
            // MuiTableCell: {
            //     root: {
            //         '& > div': {
            //             width: '100%',
            //         }
            //     }
            // },
            MuiTableBody: {
                root: {
                    '& tr td:last-child > div': {
                        justifyContent: 'center',
                    }
                }
            },
            MuiTableSortLabel: {
                root: {
                    color: '#fff',
                    '&:hover': {
                        color: '#fbff8a',
                    },
                },
                active: {
                    color: '#fbff8a !important',
                },
                icon: {
                    color: '#fbff8a !important',
                },
            },
        },
        palette: {
            type: 'light',
            primary: {
                main: '#BF9B30',
                dark: '#2980b9',
                hover: '#A67C00',
                outlineHover: '#3498db1a',
                contrastText: '#fff',
                light: '#A67C00'
            },
            secondary: {
                main: '#2c3e50',
                light: '#95a5a6',
                hover: '#95a5a6',
                dark: '#2c3e50',
                outlineHover: '#2c3e501a',
                contrastText: '#fff',
            },
            background: {
                default: '#f9f9f9',
                paper: '#fff',
            },
            warning: {
                main: '#e67e22',
                contrastText: '#fff',
                outlineHover: '#e67e221a',
            },
            info: {
                main: '#2980b9',
                contrastText: '#fff',
                outlineHover: '#2980b91a',
            },
            error: {
                main: '#e74c3c',
                contrastText: '#fff',
                outlineHover: '#e74c3c1a',
            }
            // divider: 'rgba(255, 255, 255, 0.5)',
        },
        typography: {
            fontFamily: [
                'Palatino Linotype'
            ]
        }
    }

    return (
        <ThemeContext.Provider value={{animationLogin, setAnimationLogin}}>
            <ThemeProvider theme={createTheme(defaultTheme)}>
                {props.children}
            </ThemeProvider>
        </ThemeContext.Provider>
    )
}