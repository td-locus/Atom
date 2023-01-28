/**
 * OnBoard Page
 */

// Dependencies
import React, { useEffect, useState, useContext } from 'react';
import { Container } from "reactstrap"
import { useHistory } from 'react-router-dom';
import { GetRole } from "../Auth/helper/Auth";
import DispatchContext from "../../context/DispatchContext";
import { showLoading, hideLoading } from "../../reducer/actions";
import '../../css/OnBoard/OnBoard.css';

const OnBoard = () => {
    const history = useHistory();
    const { dispatch } = useContext(DispatchContext);
    const [role, setRole] = useState('');

    const fetchRole = async () => {
        const response = await GetRole();
        setRole(response);
        dispatch(hideLoading());
        if (response !== 'registered') history.push('my-space');
    };

    useEffect(() => {
        dispatch(showLoading());
        fetchRole();
    }, [])

    return (
        <Container fluid className="auth-layout py-3">
            <div className="heading d-flex justify-content-between mb-2">
                <h3>OnBoarding</h3>
            </div>
        </Container>
    )
}

export default OnBoard