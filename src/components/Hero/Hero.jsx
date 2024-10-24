import WidgetOffer from './WidgetOffer';
import TypeMenu from './TypeMenu';
import Recommend from '../Pages/Recommend';
import AboutCard from '../Pages/AboutCard';

export default function Hero() {
  return (
    <div className="bg-primary-foreground font-spartan">
      <div className="relative isolate px-8 lg:px-8 py-16">
        {/* You could use a header or section for better semantics */}
        <section aria-labelledby="hero-section">
          <h2 id="hero-section" className="sr-only">Welcome to Our Coffee Shop</h2>

          <WidgetOffer />
          <TypeMenu />
          <Recommend />
          <AboutCard />
        </section>
      </div>
    </div>
  );
}
