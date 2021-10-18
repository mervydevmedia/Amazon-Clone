import { Link } from 'react-router-dom'
import { 
  HeaderStyled,
  HeaderSearch,
  HeaderNav,
  HeaderOption,
  HeaderOptionLineOne,
  HeaderOptionLineTwo,
  HeaderOptionBasket
} from "./Header.styled"
import SearchIcon from '@material-ui/icons/Search'
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket'
// Use the context
import { useStateValue } from '../stateProvider/StateProvider'
import { auth } from '../firebase/firebase'

const Header = () => {
  const [{ basket, user }, dispatch] = useStateValue()

  // Déconneter correctement l'utilisateur
  const handleAuthentication = () => {
    if(user) {
      auth.signOut()
    }
  }

  return (
    <HeaderStyled>
      {/* Logo */}
      <Link to='/'>
        <img 
          src="https://pngimg.com/uploads/amazon/amazon_PNG11.png" 
          alt="Amazon clone" 
        />
      </Link>

      {/* Search Box */}
      <HeaderSearch>
        <input type="text" />
        <SearchIcon className="search__icon" />
      </HeaderSearch>

      {/* Header Nav */}
      <HeaderNav>
        <Link to={!user && '/login'} style={{ textDecoration: 'none' }}>
          <HeaderOption onClick={handleAuthentication}>
            <HeaderOptionLineOne>
              Hello {!user ? '' : user.email}
            </HeaderOptionLineOne>
            <HeaderOptionLineTwo>
              {user ? 'Sign Out' : 'Sign In'}
            </HeaderOptionLineTwo>
          </HeaderOption>
        </Link>

        <Link to='/' style={{ textDecoration: 'none' }}>
          <HeaderOption>
            <HeaderOptionLineOne>Retuns</HeaderOptionLineOne>
            <HeaderOptionLineTwo>& Order</HeaderOptionLineTwo>
          </HeaderOption>
        </Link>

        <Link to='/' style={{ textDecoration: 'none' }}>
          <HeaderOption>
            <HeaderOptionLineOne>Your</HeaderOptionLineOne>
            <HeaderOptionLineTwo>Prime</HeaderOptionLineTwo>
          </HeaderOption>
        </Link>

        <Link to='/checkout' style={{ textDecoration: 'none' }}>
          <HeaderOptionBasket>
            {/* Basket Icon */}
            <ShoppingBasketIcon />
            {/* Number items in the basket */}
            <span>{basket?.length}</span>
          </HeaderOptionBasket>
        </Link>
      </HeaderNav>
    </HeaderStyled>
  )
}

export default Header
