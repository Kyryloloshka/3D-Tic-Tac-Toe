import { Button } from "./ui/button"

const Header = () => {
  
  return (
    <div className="z-10 min-h-[50px] shadow-primary bg-dark-2 flex justify-between items-center px-6 py-3">
      <h2 className="text-primary-500 text-xl font-semibold">3D Tic tac toe</h2>
      <Button variant="neon">biba</Button>
    </div>
  )
}

export default Header