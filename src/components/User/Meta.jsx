/**
 * User Helmet - User information in Meta Tags
 */

// Dependencies
import React from 'react'
import Helmet from 'react-helmet';

function Meta({ user }) {
    console.log(user);
    return (
        <Helmet>
            {/* <!-- Primary Meta Tags --> */}
            <title>{user?.name || 'Profile'}</title>
            <meta name="title" content={`${user?.name || 'Profile'} ${'• ' && user?.title}`} />
            <meta name="description" content={`${user?.bio || 'Member at Think-Digital'}`} />

            {/* <!-- Open Graph / Facebook --> */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={window.location.href} />
            <meta property="og:title" content={`${user?.name || 'Profile'} ${'• ' && user?.title}`} />
            <meta property="og:description" content={`${user?.bio || 'Member at Think-Digital'}`} />
            <meta property="og:image" content={user?.avatar || user?.defaultAvatar} />

            {/* <!-- Twitter --> */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={window.location.href} />
            <meta property="twitter:title" content={`${user?.name || 'Profile'} ${'• ' && user?.title}`} />
            <meta property="twitter:description" content={`${user?.bio || 'Member at Think-Digital'}`} />
            <meta property="twitter:image" content={user?.avatar || user?.defaultAvatar} />

        </Helmet>
    )
}

export default Meta