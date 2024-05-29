import BurgerMenu from "./_components/BurgerMenu"
import HeaderLinks from "./_components/HeaderLinks"
import Settings from "./_components/Settings"
import Logo from "./_components/Logo"


const Header = () => {
  return (
    <header className="z-[500] fade-in top-0 sticky min-h-[40px] md:min-h-[54px] shadow-primary bg-dark-2 gap-3 flex justify-between items-center px-3 md:px-6 py-1 md:py-3">
      <BurgerMenu />
      <Logo />
      <HeaderLinks/>
      <Settings />
    </header>
  )
}

export default Header