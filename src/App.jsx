import Title from './Title'
import menu from './data'
import { useState } from 'react'
import Menu from './Menu'
import Categories from './Categories'
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react'

const allCategories = ['all', ...new Set(menu.map((item) => item.category))]
const App = () => {
  const [menuItems, setMenuItems] = useState(menu)
  const [categories, setCategories] = useState(allCategories)
  const filterItems = (category) => {
    if (category === 'all') {
      setMenuItems(menu)
      return
    }

    const newMenu = menu.filter((item) => item.category === category)
    setMenuItems(newMenu)
  }
  const { user, loginWithRedirect, logout, isAuthenticated } = useAuth0()
  return (
    <div className="App">
      <header className="App-header">
        {/* {
          isAuthenticated ? (<h2> Hello {user.name} </h2>) : ()
        } */}
        {isAuthenticated ? (
          <main>
            <section className="menu">
              <Title title="our menu" />
              <Categories categories={categories} filterItems={filterItems} />
              <Menu items={menuItems} />
            </section>
            <button
              className="btn"
              onClick={() =>
                logout({ logoutParams: { returnTo: window.location.origin } })
              }
            >
              Logout
            </button>
          </main>
        ) : (
          <>
            <div class="App4">
              <div class="login">
                <form>
                  <h1>Login</h1>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    value="a1234@gmail.com"
                  />
                  <p class="error"></p>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    value="123456"
                  />
                  <p class="error"></p>
                  <button
                    className="button_common"
                    onClick={() => loginWithRedirect()}
                  >
                    Log In
                  </button>
                </form>
                <a class="" href="/signup">
                  Not yet registered? Register Now
                </a>
              </div>
            </div>
          </>
        )}
      </header>
    </div>
  )
}
export default App
