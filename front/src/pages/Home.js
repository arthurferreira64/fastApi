import React from 'react';
import { showToastMessage } from '../utils/common';

const Home = () => {
    return (
        <div>
            voici l'accueil
            <button onClick={()=>showToastMessage("test", "success")}>show toast</button>
        </div>
    );
};

export default Home;