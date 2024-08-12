import React from 'react';
import { Helmet } from 'react-helmet-async';

const Title = ({
    title = "BST's ChatApp",
    description = "A Chat App made by BST",
}) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
        </Helmet>
    );
};

export default Title;