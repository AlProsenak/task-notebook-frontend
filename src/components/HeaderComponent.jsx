import React from 'react';
import { Link } from 'react-router-dom';


const HeaderComponent = () => {
  return (
    <div>
      <header>
        <h2>Task Notebook</h2>
          <nav>
            <Link to="/">
              <button>Home</button>
            </Link>
            
            <Link to="/about">
              <button>About</button>
            </Link>
            
            <button>
              <a 
                href="https://github.com/ProsenakAljaz/task-notebook-frontend"
                target="_blank"
              >GitHub</a>
            </button>
          </nav>
      </header>
      <br/>
    </div>
  );
}

export default HeaderComponent;
