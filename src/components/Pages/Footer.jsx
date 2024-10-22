import React from "react";
import { Link } from "react-router-dom"; // Import Link if using React Router

export default function Footer() {
  return (
    <footer className="bg-secondary text-foreground px-auto bottom-0 z-50">
      <div className="container mx-auto flex flex-col md:flex-row justify-between py-10 lg:px-20">
        <div className="flex items-center mb-4 md:mb-0">
          <img
            src="/images/logo-muted-2.png"
            alt="Starbucks Logo"
            className="max-h-32 max-w-32 sm:max-h-52 sm:max-w-52" // Adjust max height and width
          />
        </div>
        <div className="flex flex-col md:flex-row">
          <div className="mr-10">
            <h3 className="font-semibold text-primary-foreground mb-2">About Us</h3>
            <ul>
              <li>
                <Link to="/heritage" className="text-muted-foreground hover:text-primary">
                  Our Heritage
                </Link>
              </li>
              <li>
                <Link to="/coffeehouse" className="text-muted-foreground hover:text-primary">
                  Coffeehouse
                </Link>
              </li>
              <li>
                <Link to="/company" className="text-muted-foreground hover:text-primary">
                  Our Company
                </Link>
              </li>
            </ul>
          </div>
          <div className="mr-10">
            <h3 className="font-semibold mb-2 text-primary-foreground">Responsibility</h3>
            <ul>
              <li>
                <Link to="/diversity" className="text-muted-foreground hover:text-primary">
                  Diversity
                </Link>
              </li>
              <li>
                <Link to="/community" className="text-muted-foreground hover:text-primary">
                  Community
                </Link>
              </li>
              <li>
                <Link to="/ethical-sourcing" className="text-muted-foreground hover:text-primary">
                  Ethical Sourcing
                </Link>
              </li>
              <li>
                <Link to="/environment" className="text-muted-foreground hover:text-primary">
                  Environmental Stewardship
                </Link>
              </li>
              <li>
                <Link to="/learn-more" className="text-muted-foreground hover:text-primary">
                  Learn More
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2 text-primary-foreground">Quick Links</h3>
            <ul>
              <li>
                <Link to="/privacy-policy" className="text-muted-foreground hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/faqs" className="text-muted-foreground hover:text-primary">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/customer-service" className="text-muted-foreground hover:text-primary">
                  Customer Service
                </Link>
              </li>
              <li>
                <Link to="/delivery" className="text-muted-foreground hover:text-primary">
                  Delivery
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-4 md:mt-0">
          <h3 className="font-semibold mb-2 text-primary-foreground">Social Media</h3>
          <div className="flex space-x-4">
            <Link to="/instagram" className="text-muted-foreground hover:text-primary">
              Instagram
            </Link>
            <Link to="/facebook" className="text-muted-foreground hover:text-primary">
              Facebook
            </Link>
            <Link to="/twitter" className="text-muted-foreground hover:text-primary">
              Twitter
            </Link>
          </div>
        </div>
      </div>
      <div className="text-center mt-10 text-sm text-muted-foreground">
        <p>Web Accessibility | Privacy Statement | Terms of Use | Contact Us</p>
        <p>© 2024 Java Heaven Coffee Company. All rights reserved. Developed by Smit Parekh and Preet Patel.</p>
      </div>
    </footer>
  );
}
