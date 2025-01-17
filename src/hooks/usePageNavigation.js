import { useNavigate } from 'react-router-dom';

const usePageNavigation = () => {
    const navigate = useNavigate();

    const returnToPreviousPage = () => {
        navigate(-1);
    };

    const goToHomePage = () => {
        navigate('/');
    };

    return { returnToPreviousPage, goToHomePage };
};

export default usePageNavigation;