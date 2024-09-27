import { FaGithub, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

const Links = () => {
    return (
        <div className="flex items-center space-x-4">
            <a href="https://github.com/your-github-profile" target="_blank" rel="noopener noreferrer">
                <FaGithub className="text-gray-500 hover:text-gray-700 transition-colors duration-300" size={24} />
            </a>
            <a href="https://twitter.com/your-twitter-profile" target="_blank" rel="noopener noreferrer">
                <FaTwitter className="text-blue-500 hover:text-blue-700 transition-colors duration-300" size={24} />
            </a>
            <a href="https://linkedin.com/in/your-linkedin-profile" target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="text-blue-600 hover:text-blue-800 transition-colors duration-300" size={24} />
            </a>
            <a href="https://instagram.com/your-instagram-profile" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="text-pink-500 hover:text-pink-700 transition-colors duration-300" size={24} />
            </a>
        </div>
    );
};

export default Links;