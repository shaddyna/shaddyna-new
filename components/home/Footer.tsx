export default function Footer() {
  return (
    <footer className="bg-[#0f1c47] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">
              <span className="text-[#bf2c7e]">Shaddyna</span>
             
            </h3>
            <p className="text-gray-300">
              Connecting buyers and sellers in a modern marketplace.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/about" className="text-gray-300 hover:text-[#bf2c7e] transition-colors">About Us</a></li>
              <li><a href="/contact" className="text-gray-300 hover:text-[#bf2c7e] transition-colors">Contact</a></li>
              <li><a href="/privacy" className="text-gray-300 hover:text-[#bf2c7e] transition-colors">Privacy Policy</a></li>
              <li><a href="/terms" className="text-gray-300 hover:text-[#bf2c7e] transition-colors">Terms of Service</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Categories</h4>
            <ul className="space-y-2">
              <li><a href="/shops" className="text-gray-300 hover:text-[#bf2c7e] transition-colors">Shops</a></li>
              <li><a href="/hub" className="text-gray-300 hover:text-[#bf2c7e] transition-colors">Hub</a></li>
              <li><a href="/shelves" className="text-gray-300 hover:text-[#bf2c7e] transition-colors">Shelves</a></li>
              <li><a href="/events" className="text-gray-300 hover:text-[#bf2c7e] transition-colors">Events</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-[#bf2c7e] transition-colors">
                <span className="sr-only">Facebook</span>
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-[#bf2c7e] transition-colors">
                <span className="sr-only">Twitter</span>
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-[#bf2c7e] transition-colors">
                <span className="sr-only">Instagram</span>
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-[#bf2c7e] transition-colors">
                <span className="sr-only">LinkedIn</span>
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Shaddyna. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}