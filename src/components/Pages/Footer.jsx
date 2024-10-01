import React from "react"

export default function Footer() {
  return (
    <footer className="bg-secondary text-foreground px-auto  bottom-0 z-50">
      <div className="container mx-auto flex flex-col md:flex-row justify-between  py-10 lg:px-20">
        <div className="flex items-center mb-4 md:mb-0">
          <img
            src="/images/logo-muted-2.png"
            alt="Starbucks Logo"
            className="max-h-52 max-w-52"
          />
        </div>
        <div className="flex flex-col md:flex-row">
          <div className="mr-10">
            <h3 className="font-semibold text-primary-foreground mb-2">
              About Us
            </h3>
            <ul>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  Our Heritage
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  Coffeehouse
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  Our Company
                </a>
              </li>
            </ul>
          </div>
          <div className="mr-10">
            <h3 className="font-semibold mb-2 text-primary-foreground">
              Responsibility
            </h3>
            <ul>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  Diversity
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  Community
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  Ethical Sourcing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  Environmental Stewardship
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  Learn More
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2 text-primary-foreground">
              Quick Links
            </h3>
            <ul>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  FAQs
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  Customer Service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  Delivery
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-4 md:mt-0 ">
          <h3 className="font-semibold mb-2 text-primary-foreground">
            Social Media
          </h3>
          <div className="flex space-x-4">
            <a href="#" className="text-muted-foreground hover:text-primary">
              Instagram
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary">
              Facebook
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary">
              Twitter
            </a>
          </div>
        </div>
      </div>
      <div className="text-center mt-10 text-sm text-muted-foreground bottom-0">
        <p>Web Accessibility | Privacy Statement | Terms of Use | Contact Us</p>
        <p>© 2024 Java Heaven Coffee Company. All rights reserved.</p>
      </div>
    </footer>
  )
}
