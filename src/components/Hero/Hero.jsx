import WidgetOffer from './WidgetOffer'
import TypeMenu from './TypeMenu'
import Recommend from '../Pages/Recommend'
import Footer from '../Pages/Footer'
import About from '../Pages/About'
export default function Hero() {
  return (
    <div className="bg-primary-foreground font-spartan">
    

     <div className="relative isolate px-8 lg:px-8 py-16 ">
   
      
        
          <WidgetOffer />
         
          <TypeMenu />
          <Recommend />
        <About />
       
     </div>
    <Footer  />
   </div>  )
}
