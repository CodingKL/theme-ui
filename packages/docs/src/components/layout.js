/** @jsx jsx */
import {
  jsx,
  Styled,
  Layout,
  Main,
  Box,
  Container,
  useColorMode,
} from 'theme-ui'
import { useState, useRef } from 'react'
import { Global } from '@emotion/core'

import { useContext } from './context'
import SkipLink from './skip-link'
import Header from './header'
import Footer from './footer'
import Sidebar from './sidebar'
import Pagination from './pagination'
import MenuButton from './menu-button'
import NavLink from './nav-link'
import Button from './button'

const modes = [
  'light',
  'dark',
]

const themes = [
  'default',
  'spicy',
]

export default props => {
  const [ menuOpen, setMenuOpen ] = useState(false)
  const [ mode, setMode ] = useColorMode()
  const { theme, setTheme } = useContext()
  const nav = useRef(null)

  const cycleMode = e => {
    const i = modes.indexOf(mode)
    const next = modes[(i + 1) % modes.length]
    setMode(next)
  }

  const cycleTheme = e => {
    const i = themes.indexOf(theme)
    const next = themes[(i + 1) % themes.length]
    setTheme(next)
  }

  return (
    <Styled.root>
      <Global
        styles={{
          '*': {
            boxSizing: 'border-box'
          },
          body: {
            margin: 0,
          }
        }}
      />
      <SkipLink>
        Skip to content
      </SkipLink>
      <Layout>
        <Header>
          <MenuButton
            onClick={e => {
              setMenuOpen(!menuOpen)
              if (!nav.current) return
              const navLink = nav.current.querySelector('a')
              if (navLink) navLink.focus()
            }}
          />
          <NavLink to='/'>Theme UI</NavLink>
          <Box mx='auto' />
          <NavLink href='https://github.com/system-ui/theme-ui'>GitHub</NavLink>
          <label>
            Theme
            <select
              value={theme}
              onChange={e => {
                setTheme(e.target.value)
              }}>
              {themes.map(t => (
                <option
                  key={t}
                  children={t}
                />
              ))}
            </select>
          </label>
          <Button
            title='Next theme'
            onClick={cycleTheme}>
            ➜
          </Button>
          <Button
            css={{
              ml: 2,
            }}
            onClick={cycleMode}>
            {mode}
          </Button>
        </Header>
        <Main>
          <Container
            css={{
              p: 0,
              display: 'flex',
            }}>
            <Sidebar
              ref={nav}
              open={menuOpen}
              onFocus={e => {
                setMenuOpen(true)
              }}
              onBlur={e => {
                setMenuOpen(false)
              }}
              onClick={e => {
                setMenuOpen(false)
              }}
            />
            <Box
              id='content'
              width={1}
              px={3}>
              {props.children}
              <Pagination />
            </Box>
          </Container>
        </Main>
        <Footer />
      </Layout>
    </Styled.root>
  )
}
