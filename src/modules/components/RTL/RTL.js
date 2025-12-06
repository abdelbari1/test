import React from 'react'
import { create } from 'jss'
import rtl from 'jss-rtl'
import { StylesProvider, createGenerateClassName, jssPreset } from '@mui/styles'
import { StyledEngineProvider } from '@mui/material/styles'
// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] })
const generateClassName = createGenerateClassName()

// Custom mui class name generator.

function RTL(props) {
    return (
        <StyledEngineProvider injectFirst>
            <StylesProvider jss={jss} generateClassName={generateClassName}  >
                {props.children}
            </StylesProvider >
        </StyledEngineProvider>
    )
}

export default RTL


// yarn add jss jss-rtl @mui/styles

