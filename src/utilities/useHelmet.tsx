import React from 'react';
import { Helmet } from 'react-helmet';

export const useHelmet = (
    title: string,
    description: string,
) => {
    return (
        <Helmet>
            <meta charSet='utf-8' />
            <title>{title}</title>
            <meta name='description' content={description} />
        </Helmet>
    )
}