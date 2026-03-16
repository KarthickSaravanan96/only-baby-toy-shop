import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({
    title = 'Only Baby | Premium Baby Toys & Care Products',
    description = 'Discover the best quality toys, feeding bottles, and baby care products in India. 100% safe, BPA-free, and loved by parents.',
    name = 'Only Baby',
    type = 'website',
    image = 'https://onlybaby.in/assets/og-image.jpg',
    url = 'https://onlybaby.in/',
    jsonLd = null
}) => {
    // Generate default Organization JSON-LD if none is provided
    const defaultJsonLd = jsonLd || {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Only Baby",
        "url": "https://onlybaby.in",
        "logo": "https://onlybaby.in/logo.png",
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+91-9876543210",
            "contactType": "customer service",
            "areaServed": "IN",
            "availableLanguage": "en"
        }
    };

    return (
        <Helmet>
            {/* Standard metadata tags */}
            <title>{title}</title>
            <meta name='description' content={description} />
            <link rel="canonical" href={url} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:url" content={url} />
            <meta property="og:site_name" content={name} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />

            {/* Structured Data JSON-LD */}
            <script type="application/ld+json">
                {JSON.stringify(defaultJsonLd)}
            </script>
        </Helmet>
    );
};

export default SEO;
