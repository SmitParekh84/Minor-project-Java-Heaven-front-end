import Navbar from '../Navbar/Navbar'
import WidgetOffer from './WidgetOffer'
import TypeMenu from './TypeMenu'
import Recommend from '../Pages/Recommend'
export default function Hero() {
  return (
    <div className="bg-primary-foreground">
    <Navbar/>

     <div className="relative isolate px-6 lg:px-8">
   
      
        
          <WidgetOffer />
         
          <TypeMenu />
          <Recommend />
       
       
     </div>
    
   </div>  )
}
