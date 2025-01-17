import React from 'react';
import ContentLoader from 'react-content-loader';

const CardSceleton = (props) => (
    <ContentLoader
    speed={1}
    width="100%"
    height="100%"
    viewBox="0 0 260 470"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    preserveAspectRatio="xMinYMin meet" 
    style={{
        maxWidth: '350px', 
        width: '100%', 
        height: 'auto', 
    }}
    {...props}
>
    <circle cx="50%" cy="25%" r="30%" />
    <rect x="0" y="54%" rx="10" ry="10" width="100%" height="7%" />
    <rect x="0" y="65%" rx="10" ry="10" width="100%" height="15%" />
    <rect x="60%" y="82%" rx="20" ry="20" width="40%" height="8%" />
    <rect x="0" y="84%" rx="10" ry="10" width="30%" height="5%" />
</ContentLoader>
);

export default CardSceleton;
