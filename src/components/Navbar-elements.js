import styled from 'styled-components';

export const NavbarContainer = styled.div`
    width: 100%;
    height: 80px;
    position: sticky;
    top: 0;
    z-index: 99;
    background-color: #0b6aa5;
`;

export const NavbarWrapper = styled.div`
    margin: auto;
    width: 100%;
    max-width: 1300px;
    height: 100%;
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

export const IconLogo = styled.div`
    display:flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
    font-family: "Oswald";
    font-size: 1.2rem;
    color: #fff;
    padding-left: 1rem;
`;

export const Menu = styled.ul`
    height:100%;
    display:flex;
    justify-content: center;
    align-items: center;

    @media screen and (max-width: 960px){
        width: 100%;
        height:98vh;
        position: absolute;
        top: 80px;
        left: ${({click}) => click ? 0 : "-100%"};
        flex-direction: column;
        transition:0.5s all ease-in;
        background-color: #0b6aa5;
    }
`;

export const MenuItem = styled.li`
    height:100%;
    padding: 0.5rem 1.5rem;
    display:flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2rem;
    font-family: "Oswald";
    font-weight: 400;

    &:hover {
        background-color: #343257;
        border-bottom: 0.3rem solid #ebc08b;
        transition: 0.45 ease-in;
    }

    @media screen and (max-width: 960px){
        width: 100%;
        height: 70px;
    }

`;

export const MenuItemLink = styled.a`
    text-decoration: none;
    color: #fff;
`;

export const IconLogoMobile = styled.div`
    display: none;

    @media screen and (max-width:969px) {
        display: flex;
        color: #ebc08b;
        font-size: 2rem;
        padding-right: 1rem;

    }
`;