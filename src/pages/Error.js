import React from "react";
import { Link } from "react-router-dom";
import '../styles/pages/Error.css';

export default function Error(props) {
    switch (props.error) {
        case 'response':
            return (
                <div className="errorContainer">
                    <p className="errorText">Oups... Une erreur s'est produite</p>
                </div>
            )
        case 'request':
            return (
                <div className="errorContainer">
                    <p className="errorText">Service indisponible.</p>
                </div>
            )
        case '404':
                return (
                    <div className="errorContainer">
                        <h1 className="errorTitle">404</h1>
                        <p className="errorText">La page que vous demandez n'existe pas.</p>
                        <Link to="/">
                            <p className="errorLink">Retourner sur la page d'acceuil</p>
                        </Link>
                    </div>
                )
        default:
            return '';
    }
    
}